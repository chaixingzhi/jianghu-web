<template>
  <Main 
    :tabNames="tabNames"
    :activeName="activeName"
  >
    <div slot="content">
      <div class="cart-wrap">
        <div class="cart-header">
          2018-10-15 前端
        </div>
        <div class="cart-title">
            <a class="post-title-link">AngularJS踩坑之路(四)：商品展示案例</a>
        </div>
        <el-divider></el-divider>
        <div class="cart-tag">
          <button class="tag-style">angular</button>
        </div>
      </div>
    </div>
  </Main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Main from '@/components/Main.vue';
import Api from '../api/commonApi'

@Component({
  name: 'Home',
  components: {
    Main
  }
})
export default class extends Vue {
  private tabNames = []
  private activeName = ''
  private getData() {
    // Api.get('blogs/'+ this.userId).then(res => {

    // })
  };
  created() {
    this.getData()
    console.log('this: ',this)
  }
}
</script>

<style lang="scss">
  .cart-wrap {
      width: 300px;
      background-color: #fff;
      border-radius: 5px;
      min-height: 120px;
      padding: 15px 10px 10px 10px;
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
</style>
