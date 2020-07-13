<template>
    <div class="home-warp">
      <div class="cart-wrap" v-for="(blog,index) in blogs" :key="index" @click="goToDetail(blog)">
        <div class="cart-header">
          {{blog.user.alias}}&nbsp;{{moment(blog.createdAt).format('YYYY-MM-DD')}}
        </div>
        <div class="cart-title">
            <a class="post-title-link">{{blog.title}}</a>
        </div>
        <el-divider></el-divider>
        <div class="cart-tag">
          <button class="tag-style">angular</button>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '../store/modules/app'
import Cookie from 'js-cookie';
import Api from '../api/commonApi';
import moment from 'moment';

@Component({
  name: 'Home',
})
export default class extends Vue {
  private blogs:any = []
  private moment:any = moment
  private getData() {
    console.log('AppModule: ', AppModule)
    Api.post('blog/getAll',{
      limit: 10,
      // order: ['createdAt', 'desc'],
      where: {
        "author_id": Cookie.get('userId')
      },
      include: [
        {
          model: 'User',
        }
      ]
    }).then((res:any) => {
      this.blogs = res.data
    })
  };
  private goToDetail(val:any) {
    this.$router.push({
      name: 'detail',
      query: {
        blogId: val.id
      }
    })
  };
  created() {
    this.getData()
    console.log('this: ',this)
  }
}
</script>

<style lang="scss">
  .home-warp {
    padding: 20px;
    display: flex;
    justify-content: space-around;
    .cart-wrap {
      width: 40%;
      background-color: #fff;
      border-radius: 5px;
      min-height: 120px;
      padding: 15px 10px 10px 10px;
      box-sizing: border-box;
      margin-bottom: 15px;
      .el-divider--horizontal {
        margin: 18px 0;
      }
      // display: flex;
      // flex-direction: column;
      // justify-content: space-around;
      text-align: left;
      .cart-header {
        font-size: 13px;
        margin-bottom: 13px;
      }
      .cart-title {
        .post-title-link{
          color:#363636;
          position:relative;
          display:inline-block
        }
        .post-title-link::after{
          content:"";
          position:absolute;
          width:100%;
          height:2px;
          bottom:-3px;
          left:0;
          background-color:#363636;
          visibility:hidden;
          -webkit-transform:scaleX(0);
          transform:scaleX(0);
          -webkit-transition:.4s ease-in-out;
          transition:.4s ease-in-out
        }
        .post-title-link:hover{
          text-decoration:none
        }
        .post-title-link:hover::after,.post-title-link:active::after{
          visibility:visible;
          -webkit-transform:scaleX(1);
          transform:scaleX(1)
        }
      }
      .cart-tag {
        .tag-style {
          height: 25px;
          background-color: aqua;
          outline-style: none;
          border: none ;
        }
      }
    }
  }

</style>
