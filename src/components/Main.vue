<template>
  <el-container>
    <el-header 
      class="main-header"
      height="130px"
    >
      <h2>header</h2>
      <el-tabs v-model="activeName" class="main-tab">
        <el-tab-pane label="用户管理" name="first"></el-tab-pane>
        <el-tab-pane label="配置管理" name="second"></el-tab-pane>
        <el-tab-pane label="角色管理" name="third"></el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main class="main-two">
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
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Main',
})

export default class extends Vue {
  private activeName: string = 'first';

  mounted() {
    console.log(this)
  };
}
</script>

<style lang="scss"> 
  $bg-color: #363636;
  @mixin div-padding {
    padding: 0 150px 0 150px;
  }

  .main-header {
    background-color: $bg-color;
    // line-height: 130px;
    text-align: letf;
    color: white;
    // padding: 0 150px 0 150px;
    @include div-padding;
    position: relative;
    .main-tab {
      position: absolute;
      bottom: -14px;
      padding: 0;
      .el-tabs__item {
        color: #fff;
      }
      .el-tabs__nav-wrap::after {
        background-color:  $bg-color;
      }
    }
  }
  .main-two {
    text-align: center;
    padding: 40px 150px 40px 150px;
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
    // border-top: 2px solid #fff;

  }
  
</style>