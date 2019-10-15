<template>
  <div class="blog-wrapper">
    <div class="blog-header">
      <img src="../../assets/csdn-logo.png" alt="" class="blog-logo">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="blog-tab">
        <el-tab-pane label="博客" name="first"></el-tab-pane>
        <el-tab-pane label="个人博客" name="second"></el-tab-pane>
      </el-tabs>
      <div class="blog-header-right">
        <!-- <a href="">登录</a> -->
        <div class="header-right-login">
          <router-link to="login">{{Cookies.get('token') ? '注销' : '登录'}}</router-link>
        </div>
        
        <div class="header-right-write">
          写博客
        </div>
      </div>
    </div>
    <div class="blog-main">
      <div class="main-left">
        <ul id="mainleft">
          <li>推荐</li>
          <li>关注</li>
          <li>其他</li>
        </ul>
      </div>
      <div class="main-center">
        <el-carousel height="300px">
          <el-carousel-item v-for="(item,index) in imges" :key="index">
            <div style="display: flex" class="carousel-content">
              <img :src="require('../../assets/'+item)" alt="">
              <ul style="padding: 0">
                <li>菩提本无树，</li>
                <li>明镜亦非台。</li>
                <li>本来无一物，</li>
                <li>何处惹尘埃。</li>
              </ul>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="center-blog">
          <div class="center-blog-item" v-for="item in 6" :key="item">
            <h4>华为卖技术华为卖技术华为卖技术华为卖技术华为卖技术华为卖技术</h4>
            <p>多线程编程是一个优秀程序员必备的能力，多线程是解决项目中性能问题的一个重要技术利器，现在的计算机基...</p>
            <span>风筝人</span>
          </div>
        </div>
      </div>
      <div class="main-right">
        <div class="right-content">
          <span class="blog-rank">周排行榜</span>
          <div class="blog-rank-item" v-for="item in 6" :key="item">
            <div>
              <img :src="require('../../assets/'+'lufei.jpg')" alt="" style="width: 50px;">
            </div>
            <div style="display: flex; flex-direction: column;justify-content: space-around;margin-left: 20px">
              <span>路飞</span>
              <span>喜欢你</span>
            </div>
          </div>
        </div>
        <div class="right-bottom">
          <div class="ewm-wrapper">
            <div class="ewm">
              <img :src="require('../../assets/' + 'ewm1.png')" alt="">
              <span>CSDN学院</span>
            </div>
            <div class="ewm">
              <img :src="require('../../assets/' + 'ewm2.png')" alt="">
              <span>CSDN企业招聘</span>
            </div>
          </div>
          <div class="right-descript">
            <span>
              百度提供站内搜索 京ICP备19004658号<br/>©1999-2019 北京创新乐知网络技术有限公司
            </span>
          </div>
          <div class="right-descript">
              经营性网站备案信息 网络110报警服务<br/>
              北京互联网违法和不良信息举报中心<br/>
              中国互联网举报中心家长监护版权申诉
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Cookies from 'js-cookie';

@Component({
  name: 'Blog'
})
export default class extends Vue {
  private Cookies:any = Cookies;
  private activeName:string = 'first';
  private imges:any = [
    'csdn1.jpg',
    'csdn2.jpg',
    'csdn3.jpg'
  ]
  
  private handleClick() {
    // console.log('val: ', this)
    if(this.activeName === 'second') {
      this.$router.push('/home')
    }
  }
  created() {
    console.log('this: ',this)
  }
  mounted() {
    const mainLeftDemo = document.getElementById('mainleft');
    Array.from(mainLeftDemo.children)[0].className = 'item-active';
    mainLeftDemo.addEventListener('click', (event:any) => {
      Array.from(mainLeftDemo.children).forEach((demo:any) => {
        demo.className = '';
      })
      event.target.className = 'item-active'
    });
  }
}
</script>

<style lang="scss">
  .blog-wrapper {
    .blog-header {
      height: 50px;
      box-shadow: 0 3px 3px 0 #eee;
      display: flex;
      // justify-content: space-between;
      // align-content: flex-start;
      padding: 0 130px;
      .el-tabs__item {
        height: 50px;
        line-height: 50px;
      }
      .blog-logo {
        height: 50px;
        margin-right: 20px;
      }
      .blog-tab{
        // width: 90%;
        
      }
      .blog-header-right {
        // align-self: flex-end;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        @mixin buttonHover {
          height: 50px;
          line-height: 50px;
          text-align: center;
          transition: background-color 0.5s;
        }
        .header-right-login {
          @include buttonHover;
        }
        &:hover {
          background-color: #bbb;
        }
      }

    }
    .blog-main {
      margin-top: 30px;
      padding: 0 130px;
      display: flex;
      .main-left {
        width: 96px;
        height: 400px;
        box-shadow: 0 0 1px 1px rgba(0,0,0,0.06);
        .item-active {
          background-color: skyblue;
          color: white;
        }
        &>ul{
          list-style-type: none;
          padding: 0;
        }
        &>ul>li {
          text-align: center;
          height: 30px;
          margin-top:2px;
          line-height: 30px;
          font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
          font-size: 18px;
        }
        &>ul>li:hover {
          background-color: skyblue;
          color: white;
          cursor: pointer;
        }
      }
      .main-center {
        // flex-grow: 2;
         width: 50vw;
        background-color: #eee;
        margin-left: 20px;
        
        // min-height: 100px;
        .center-blog {
          margin-top: 15px;
          background-color: #fff;
          border: 1px solid #eee;
          .center-blog-item {
            padding: 8px 8px;
            height: 150px;
            border-bottom: 1px solid #eee;
          }
        }
        .carousel-content {
          display: flex;
          &>ul {
            padding: 0;
            width: 100%;
            li {
              text-align: center;
              list-style-type: none;
              height: 25px;
              line-height: 25px;
            }
          }
        }
        .el-carousel__item h3 {
          color: #475669;
          font-size: 14px;
          opacity: 0.75;
          line-height: 150px;
          margin: 0;
        }

        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }
        
        .el-carousel__item:nth-child(2n+1) {
          background-color: #99a9bf;
        }
      }
      .main-right {
        // width: 56%;
        // flex-grow: 1;
        width: 25vw;
        background-color: #fff;
        margin-left: 20px;
        .right-content {
          box-shadow: 0 0 1px 2px rgba(0,0,0,0.06);
          margin-bottom: 20px;
          padding: 15px 10px;
          .blog-rank-item {
            display: flex;
            padding: 10px;
            border-bottom: 1px solid #eee;
          }
          .blog-rank {
            font-size: 18px;
            display: block;
            margin-bottom: 15px;
          }
          .blog-rank:before {
            content: '';
            display: inline-block;
            vertical-align: top;
            height: 18px;
            width: 2px;
            background-color: #2920ae;
            margin-right: 5px;
          }
        }
        .right-bottom {
          box-shadow: 0 0 1px 2px rgba(0,0,0,0.06);
          padding: 15px 10px;
          .ewm-wrapper {
            padding-bottom: 10px;
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid #eee;
            .ewm {
              display: flex;
              flex-direction: column;
              // justify-content: center;
              align-items: center;
              img {
                margin-bottom: 5px;
              }
            }
          }
          .right-descript {
            text-align: left;
            height: 70px;
            padding: 8px;
            // vertical-align: center;
            // border-bottom: 1px solid #eee;
            display: table-cell;
            vertical-align:middle
          }
        }
        
      }
    }
  }
</style>