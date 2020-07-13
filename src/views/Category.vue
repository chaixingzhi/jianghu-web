<template>
    <div class="category-warp">
      <div class="button-warp">
          <el-button type="primary" size="middle" @click="visible = true">新建</el-button>
      </div>
      <div class="list-warp">
          <el-table
            :data="categoryData"
            style="width: 100%"
            border
            stripe
          >
            <el-table-column
              v-for="(column, index) in tableColumn" :key="index"
              :prop="column.prop"
              :label="column.label"
            >

            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button
                  @click="editRow(scope.row)"
                  type="text"
                  size="small">
                  修改
                </el-button>
                <el-button
                  @click="deleteRow(scope.row)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
      </div>
      <el-drawer
        title="操作分类"
        :visible.sync="visible"
        direction="rtl"
        custom-class="draw-warp"
        ref="drawer"
        destroy-on-close
      >
        <div class="draw-form-warp" style="padding: 20px">
          <el-form :model="category" ref="category">
            <el-form-item label="分类名称" prop="name" :rules="{
              required: true, message: '分类名称不能为空', trigger: 'blur'
            }">
              <el-input v-model="category.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div class="form-button-warp">
            <el-button @click="cancelForm" size="middle">取 消</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="loading" size="middle">确定</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Api from '@/api/commonApi';
import Cookies from 'js-cookie';
import moment from 'moment';

@Component({
  name: 'Home',
})
export default class extends Vue {
  private categoryData:Array<any> = [];

  private tableColumn:Array<any> = [
      {
          prop: 'name',
          label: '分类名称',
      },
      {
          prop: 'userName',
          label: '创建人',
      },
      {
          prop: 'createTime',
          label: '创建时间',
      }
  ];

  private category: any = {
      name: ''
  };

  private visible:Boolean = false;

  private loading:Boolean = false;


  private getCategoryData(){
    Api.post('category/getAll', {
        limit: 10,
        where: {
          user_id: Cookies.get('userId')
        },
        include: [
          {
            model: 'User',
          }
        ]
    }).then((res:any) => {
      console.log('获取到的数据：', res.data)
      this.categoryData = res.data.map((item: any) => {
        return {
          id: item.id,
          userName: item.user.user_name,
          createTime: moment(item.createdAt).format('YYYY-MM-DD'),
          name: item.name
        }
      })
    }).catch((e:any) => {
      this.$message.error('请求失败')
    })
  };

  // 删除数据
  private deleteRow(record:any) {
    this.$confirm('将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
      Api.delete('category/deleteOne/' + record.id).then((res: any) => {
        this.getCategoryData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    }).catch(() => {
        this.$message({
            type: 'info',
            message: '已取消删除'
        });
    });
    console.log('record: ', record)
  };

  //修改数据
  private editRow(record:any) {
    this.visible = true;
    this.category.name = record.name
    this.category.id = record.id
  };

  //抽屉关闭回调
  private cancelForm() {
    this.visible = false
  }

  // 提交表单
  private handleSubmit() {
    let formDemo:any = this.$refs['category']
    this.loading = true
    console.log('formDemo:', formDemo)
    formDemo.validate((notErr: Boolean, values: any) => {
      if(notErr) {
        console.log('values:', values)
        if(this.category.id) {
          Api.post('category/edit', {
            id: this.category.id,
            name: this.category.name,
          }).then((res: any) => {
            this.loading = false;
            this.getCategoryData()
            this.$message.success('修改成功');
            this.cancelForm()
          })
        } else {
          Api.post('category/create', {
            name: this.category.name,
            user_id: Cookies.get('userId'),
          }).then((res: any) => {
            this.loading = false
            this.$message.success('新建成功');
            this.cancelForm()
            this.getCategoryData()
          })
        }
      } else {
        this.loading = false
        this.cancelForm()
      }
    })
  }

  created() {
    console.log('this: ',this)
    this.getCategoryData();
  }
}
</script>

<style lang="scss">
  .category-warp {
    background-color: #fff;
    height: 100vh;
    padding: 30px;
    .button-warp{
      height: 50px;
      width: 100%;
      display: flex;
      padding: 5px 0;
      box-sizing: border-box;
    }
    .list-warp{
      padding: 15px 0;
    }
  }
  .draw-warp {
    .el-drawer__body {
      .draw-form-warp {
        height: 100%;
        position: relative;
        .form-button-warp {
          height: 50px;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding:5px 10px;
          box-sizing: border-box;
          display: flex;
          justify-content: flex-end;
          border-top: 1px solid #bababa;
        }
      }
    }
  }
</style>