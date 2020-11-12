<template>
  <div class="blog-wrapper" id="blog-wrapper">
    <div class="bg-warp" id="bg-warp" >
      <button @click="specialPlay" class="music-button">{{controlTitle}}</button>
<!--      <el-button @click="showContent" style="color: #fff;font-size: 60px;position:absolute;bottom: 60px;right: 50%">-->
          <i @click="showContent"
             class="el-icon-arrow-down"
             style="color: #fff;font-size: 60px;position:absolute;bottom: 60px;right: 50%"
          ></i>
<!--      </el-button>-->
      <canvas id="rain-drop" width="1440px" height="877px" style="height: 100vh;width: 100%" v-show="showRain"></canvas>
    </div>
    <div class="blog-content" id="blog-content">
      <div class="blog-header">
        <img src="../../assets/jh-logo.png" alt="" class="blog-logo">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="blog-tab">
          <el-tab-pane label="博客" name="first"></el-tab-pane>
<!--          <el-tab-pane label="其他资讯" name="second"></el-tab-pane>-->
        </el-tabs>
        <div class="blog-header-right">
          <!-- <a href="">登录</a> -->
          <div class="header-right-login">
            <router-link to="login">{{Cookies.get('token') ? '注销' : '登录'}}</router-link>
          </div>
          <div class="header-right-write" @click="handleWriteBlog">
            写博客
          </div>
        </div>
      </div>
      <div class="blog-main">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script src="https://eqcn.ajz.miesnfu.com/wp-content/plugins/wp-3d-pony/live2dw/lib/L2Dwidget.min.js"></script>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Cookies from 'js-cookie';

@Component({
  name: 'Blog'
})
export default class extends Vue {
  private Cookies:any = Cookies;
  private activeName:string = 'first';
  private audioDom:any = null;
  private showRain:boolean = false;
  private controlTitle: string = '开启特效';
  private rainSpecial: any = null;
  private dynamicDemo:any = null;
  private handleClick() {
    // console.log('val: ', this)
    if(this.activeName === 'second') {
      this.$router.push('/home')
    }
  }
  private handleWriteBlog() {
    this.$router.push('/write')
  }
  private setDynamic() {
    const dynamicDemo:any = document.getElementById('rain-drop');
    this.dynamicDemo = dynamicDemo;
    const bgDom:any = document.getElementById('bg-warp');
    let context = dynamicDemo.getContext("2d");
    interface Circle {
        // members of your "class" go here
        x?:any,
        y?:any,
        width?:any,
        height?:any,
        paint?:any,
        step?:any
    }
    console.log('dynamicDemo: ', dynamicDemo)
    //构建构造函数 创建圆形
    const Circle = function(this: Circle){
      this.x = Math.random() * dynamicDemo.width;
      this.y = -10;
      this.width=Math.random()*2;
      this.height = Math.random()*30;
      this.paint = function(){
        context.beginPath();
        context.fillStyle="rgba(255,255,255,0.9)";
        context.fillRect(this.x,this.y,this.width,this.height);
        context.fill();
      }
      this.step = function(){
        this.y += 8;
      }
    } as any as { new (): Circle; };
    let circles:any = [];

    function createCircles(){
        let circle = new Circle();
        circles[circles.length] = circle;
    }

    function paintCircls(){
      for(let i=0;i<circles.length;i++){
        circles[i].paint();
      }
    }

    function stepCircles(){
      for(var i=0;i<circles.length;i++){
        circles[i].step();
      }
    }
    var myimg = new Image();
    myimg.src = "http://chaiserver.cn:9526/img/bg1.882fa649.jpg";

    let time = 0;
    // bgDom.style.backgroundImage = 'none'
    this.rainSpecial = setInterval(function(){
      context.drawImage(myimg,0,0,1440,900); //刷新背景图片
      time++;
      if(time % 3 == 0){
          createCircles(); //新生成一个圆
      }
      paintCircls(); //将当前页面所有圆绘出来
      stepCircles(); //圆向下走
    },10);
  };
  private playMusic() {
      const audioDom:any = document.createElement("AUDIO");
      audioDom.src = 'http://img.tukuppt.com/newpreview_music/09/04/11/5c8b06007c14c66088.mp3';
      audioDom.autoplay = true
      audioDom.controls = true
      audioDom.metud = true
      this.audioDom = audioDom;
  };

  private specialPlay() {
    if(this.controlTitle === '开启特效') {
        this.audioDom.play();
        this.showRain = true;
        this.setDynamic();
        // this.main();
        this.controlTitle = '关闭特效'
        this.openL2d(true)
    } else {
        this.audioDom.pause();
        this.showRain = false;
        clearInterval(this.rainSpecial)
        this.controlTitle = '开启特效'
        this.openL2d(false)
    }
  };
  private openL2d(flag) {
    if(flag) {
      L2Dwidget.init({
        "model": {
            jsonPath: "https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json",
            "scale": 1
        },
        "display": {
            "position": "right",
            "width": 150,
            "height": 300,
            "hOffset": 0,
            "vOffset": -20
        },
        "mobile": {
            "show": true,
            "scale": 0.5
        },
        "react": {
            "opacityDefault": 0.7,
            "opacityOnHover": 0.2
        }
      });
    } else {
        L2Dwidget.init({})
        console.log('L2Dwidget: ', L2Dwidget)
    }
  };

  private showContent() {
    let blogDom = document.getElementById('blog-wrapper');
    let blogContentDom = document.getElementById('blog-content');
    let point:any = blogContentDom.getBoundingClientRect();
    let offectTop = 0;
    let a = setInterval(() => {
        console.log(blogContentDom.getBoundingClientRect())
        if(offectTop <= -point.y) {
            blogDom.style.top = -point.y + 'px';
            clearInterval(a)
        } else {
            offectTop -= 1;
            blogDom.style.top = offectTop + 'px';
        }
    },10)
  };

  created() {
    console.log('this: ',this)
  }
  mounted() {
    this.playMusic();
    // this.main();
  }

}
</script>

<style lang="scss">
  .blog-wrapper {
    position: relative;
    .bg-warp {
      background-image: url("http://chaiserver.cn:9526/img/bg1.882fa649.jpg");
      background-size: cover;
      height: 100vh;
      position: relative;
      .music-button{
        position: absolute;
        top: 30px;
        right: 30px;
      }
    }
    .blog-content {
      height: 100vh;
      background-image: url("http://chaiserver.cn:9526/img/bg5.4cf8e523.jpg");
      background-size: cover;
      .blog-header {
        height: 50px;
        /*box-shadow: 0 3px 3px 0 #eee;*/
        display: flex;
        padding: 0 130px;
        background-color: rgba(255,255,255, 0.9);
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
            margin-right: 10px;
          }
          .header-right-write {
            @include buttonHover;
            cursor: pointer;
          }
          .header-right-login:hover{
            color:blue;
          }
          .header-right-write:hover{
            color:green;
          }
          // &:hover {
          //   background-color: #bbb;
          // }
        }

      }
      .blog-main {
        // margin-top: 30px;
        // padding: 0 130px;
      }
    }
  }
</style>
