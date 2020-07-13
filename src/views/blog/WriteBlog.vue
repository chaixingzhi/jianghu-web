<template>
  <div id="write">
    <div class="header">
      <el-button type="primary" icon="el-icon-back" circle ></el-button>
      <div class="btn-right">
        <el-button type="primary" size="small" @click="changeEditor">切换编辑器</el-button>
        <el-button type="primary" size="small" @click="saveTempContent">保存草稿</el-button>
        <el-button type="primary" size="small">发布文章</el-button>
      </div>
    </div>
    <div class="form-wrap">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="标题:" class="form-item">
          <el-input v-model="formLabelAlign.title"></el-input>
        </el-form-item>
<!--         <el-form-item label="标签:" class="form-item">-->
<!--          <el-input v-model="formLabelAlign.region"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="分类:" class="form-item" prop="type">
          <el-select v-model="formLabelAlign.category" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in categorys"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="tinymec" v-if="isTinymec">
      <tinymec-editor
        v-if="isTinymec"
        v-model="tinymecValue"
        @change="editorChange"
      ></tinymec-editor>
    </div>
    <div class="markdown" v-else>
      <markdown-editor
        v-if="!isTinymec"
        ref="markdownEditor"
        v-model="markdownValue"
        height="100%"
        :language="language"
      />
    </div>
  </div>
</template>

<script lang="ts">
// api-key="ld2t78njl0a3nq8b218fvjvexpg1ql999h23ldmiyxwxz9hd"
import { Vue, Component } from 'vue-property-decorator';
import MarkdownEditor from '@/components/MarkdownEditor/index.vue';
import TinymecEditor from '@/components/TinymceEditer/index.vue';
import { AppModule } from '../../store/modules/app';
import Api from '../../api/commonApi';
import Cookie from 'js-cookie';
import Cookies from "js-cookie";
import moment from "moment";
@Component({
  name: 'WriteBlog',
  components: {
    MarkdownEditor, // Markdown 编辑器组件
    TinymecEditor // 富文本 编辑器组件
  }
})
export default class extends Vue{
  private markdownValue:string = "请输入内容"  // markdown v-model
  private languageTypeList: { [key: string]: string } = {
    'en': 'en_US',
    'zh': 'zh_CN',
  }
  private html = ''
  private isTinymec:boolean = true
  private tinymecValue:string = ''
  private htmlContent:string = ''
  private labelPosition:string = 'right'
  private formLabelAlign:any = {
    title: '',
    tag: '',
    category: ''
  }
  private categorys:any = []

  /**
   * @Description: 获取语言
   * @param {type} 
   * @Date: 2019-11-08 10:56:03
   */  
  get language() {
    return this.languageTypeList[AppModule.language]
  }
  /**
   * @Description: 得到markdown的内容
   * @param {type} 
   * @Date: 2019-11-08 10:56:11
   */  
  private getHtml() {
    if(!this.isTinymec && this.$refs.markdownEditor) {
      this.html = (this.$refs.markdownEditor as MarkdownEditor)['getHtml']();
    }
  }
  /**
   * @Description: 切换编辑器
   * @param {type} 
   * @Date: 2019-11-08 10:56:26
   */  
  private changeEditor() {
    this.isTinymec = !this.isTinymec
  }
  /**
   * @Description: 保存草稿
   * @param {type} 
   * @Date: 2019-11-08 10:56:33
   */  
  private saveTempContent() {
    if(this.formLabelAlign.title != '') {
      Api.post('blog/create', {
        title: this.formLabelAlign.title,
        content: this.tinymecValue,
        content_html: this.htmlContent,
        is_public: true,
        author_id: Cookie.get('userId'),
        category_id: this.formLabelAlign.category
      }).then((res:any) => {
        this.$message.success('保存成功')
        console.log('保存草稿成功返回：', res)
      })
    } else {
      this.$message.error('请输入博客标题！')
    }
  }
  /**
   * @Description: 监听富文本改变事件
   * @param {type} 
   * @Date: 2019-11-08 10:56:42
   */  
  private editorChange(val:any) {
    console.log('html: ',val.activeEditor.getContent({format: 'html'}))
    this.htmlContent = val.activeEditor.getContent({format: 'html'})
    this.tinymecValue = val.activeEditor.getContent({format: 'text'})
  }

  private getCategoryData() {
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
          this.categorys = res.data.map((item: any) => {
              return {
                  value: item.id,
                  label: item.name
              }
          })
      }).catch((e:any) => {
          this.$message.error('请求失败')
      })
  };

  created() {
    this.getCategoryData()
  }

  mounted() {

  }
}
</script>

<style lang="scss">
  #write {
    height: 100vh;
    .header {
      padding: 5px;
      height: 40px;
      background-color: #fff;
      .btn-right {
        display: flex;
        justify-content: flex-end;
      }
    }
    .form-wrap {
      border-top: 1px solid #bbb;
      border-left: 1px solid #bbb;
      border-right: 1px solid #bbb;
      .form-item {
        margin-bottom: 0;
        border-bottom: 1px solid #bbb;
        input {
          border: none;
        };
      }
      .form-item:nth-last-child(1) {
        border-bottom: none;
      }
    }
    .markdown {
      height: calc(100% - 50px);
    }
    .tinymec {
      // height: 100vh;
      height: calc(100% - 50px);
    }
  }
</style>