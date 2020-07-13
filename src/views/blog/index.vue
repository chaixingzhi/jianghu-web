<template>
  <div class="blog-wrapper">
    <div class="bg-warp" id="bg-warp" >
      <button @click="specialPlay" class="music-button">{{controlTitle}}</button>
      <canvas id="rain-drop" width="1440px" height="877px" style="height: 100vh;width: 100%" v-show="showRain"></canvas>
<!--      <canvas id="canvas" style="position: absolute; height: 100%; width:100%;" v-show="showRain"></canvas>-->
    </div>
    <div class="blog-content">
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
  private main() {
      // 获取canvas元素
      var canvasEl = document.getElementById('canvas');
      var ctx = canvasEl.getContext('2d');
      // canvas画布的 背景颜色
      var backgroundColor = '#fafafa';


      // canvas画布的宽 等于 可视区域的宽
      canvasEl.width = canvasEl.clientWidth;
      // canvas画布的高 等于 可视区域的高
      canvasEl.height = canvasEl.clientHeight;

      // 保存小水珠的数组
      // 雨滴下落后散成小水珠，小水珠就是一些圆弧
      var dropList = [];

      // 重力
      // 雨滴下落后散成小水珠，小水珠会先上升后下降，主要是因为 gravity 这个变量的缘故
      var gravity = 0.5;

      // 保存雨滴的数组
      // 每个雨滴 都是 画的一条线
      var linelist = [];

      // 保存鼠标的坐标
      // mousePos[0] 代表x轴的值，mousePos[1] 代表y轴的值
      var mousePos = [0, 0];

      // 跟随鼠标， mouseDis 大小区域内的雨滴会消失，形成散落效果
      // 以mousePos为圆心，mouseDis为半径，这个范围内的雨滴 都会散开，形成许多小水珠
      var mouseDis = 35;

      // 更新一次动画，画lineNum 条雨滴，lineNum 值越大，下雨就越密集
      var lineNum = 3;

      // 跟随鼠标方向 变化下雨方向的 速度
      // 鼠标移动后，下雨的方向 会慢慢改变，主要靠speedx 这个变量
      var speedx = 0;

      // maxspeedx 为 speedx 可以取的最大值
      // 当 speedx = maxspeedx时，下雨方向 会 随鼠标移动方向立即改变
      var maxspeedx = 0;

      // 页面大小发生变化时，重置canvas画布大小
      window.onresize = function () {
          canvasEl.width = canvasEl.clientWidth;
          canvasEl.height = canvasEl.clientHeight;
      }

      //移动鼠标触发事件
      window.onmousemove = function (e) {
          //  设置mousePos 等于 鼠标坐标
          //  e.clientX 为距离 浏览器窗口可视区域 左边的距离
          //  e.clientY 为距离 浏览器窗口可视区域 上边的距离
          mousePos[0] = e.clientX;
          mousePos[1] = e.clientY;

          // 通过鼠标位置，设置 maxspeedx的值，取值范围是 -1 到 1
          // maxspeedx的值，关系到
          // 1、雨滴的方向
          // 2、雨滴下落的方向
          // 3、雨滴下落方向 跟随 鼠标移动方向变化的速度
          // 4、小水珠的移动方向
          // 值越接近1，表示方向越向右
          // 值越接近-1，表示方向越向左
          maxspeedx = (e.clientX - canvasEl.clientWidth / 2) / (canvasEl.clientWidth / 2);
      }

      // 根据参数，返回一个rgb颜色，用于给雨滴设置颜色
      function getRgb(r, g, b, a) {
          return "rgba(" + r + "," + g + "," + b + ","+ a +")";
      }

      // 画 一滴雨（一条线）
      function createLine(e) {
          // 随机生成 雨滴的长度
          var temp = 0.25 * (50 + Math.random() * 100);
          // 一个 line 对象，代表一个雨滴
          var line = {
              // 雨滴下落速度
              speed: 5.5 * (Math.random() * 6 + 3),
              // 判断是否删除，值为true就删除
              die: false,
              // 雨滴x坐标
              posx: e,
              // 雨滴y坐标
              posy: -50,
              // 雨滴的长度
              h: temp,
              // 雨滴的颜色
              // color: getRgb(Math.floor(temp * 255 / 75), Math.floor(temp * 255 / 75), Math.floor(temp * 255 / 75))
              color: getRgb(250,250,250, 0.5)
          };
          // 把创建好的line（雨滴）对象，添加到保存雨滴的数组
          linelist.push(line);
      }

      // 画一个小水珠（雨滴散开后的小水珠就是一个个的圆弧）
      function createDrop(x, y) {
          // 一个 drop 对象，代表一个圆弧
          var drop = {
              // 判断是否删除，值为true就删除
              die: false,
              // 圆弧圆心的x坐标
              posx: x,
              // 圆弧圆心的y坐标
              posy: y,
              // vx 表示 x轴的值 变化的速度
              vx: (Math.random() - 0.5) * 8,
              // vy 表示 y轴的值 变化的速度 取值范围：-3 到 -9
              vy: Math.random() * (-6) - 3,
              // 圆弧的半径
              radius: Math.random() * 1.5 + 1
          };
          return drop;
      }

      // 画一定数量的小水珠
      function madedrops(x, y) {
          // 随机生成一个数 maxi
          // maxi 代表要画小水珠的数量
          var maxi = Math.floor(Math.random() * 5 + 5);
          for (var i = 0; i < maxi; i++) {
              dropList.push(createDrop(x, y));
          }
      }

      // 开始调用update函数，更新动画
      window.requestAnimationFrame(update);
      // 更新动画
      function update() {
          // 如果保存小水珠的数组有内容
          if (dropList.length > 0) {
              // 遍历保存小水珠的数组
              dropList.forEach(function (e) {
                  //设置e.vx，vx表示x坐标变化的速度
                  // (speedx)/2 是为了，让小水珠 在x轴的移动距离短一点，看上去更真实点
                  // 也使 小水珠的移动方向 和 雨滴方向，雨滴下落方向，鼠标移动方向相同
                  e.vx = e.vx + (speedx / 2);
                  e.posx = e.posx + e.vx;

                  //设置e.vy，vy表示y坐标变化的速度
                  // e.vy的范围是-3 到 -9，而这时e.posy（y坐标）一定是正值，所以 e.posy的值会先减小后增大
                  // 也就是实现 雨滴散成小水珠，小水珠会先上升后下降的效果
                  e.vy = e.vy + gravity;
                  e.posy = e.posy + e.vy;

                  // 如果 小水珠y坐标 大于 可视区域的高度，设置die属性为true
                  // 小水珠如果超出可视区域就删除掉
                  if (e.posy > canvasEl.clientHeight) {
                      e.die = true;
                  }
              });
          }

          // 删除 die属性为ture 的数组成员
          // 可视区域外的小水珠删除掉
          for (var i = dropList.length - 1; i >= 0; i--) {
              if (dropList[i].die) {
                  dropList.splice(i, 1);
              }
          }

          // 设置下雨方向变换的速度，取值范围： -1 到 1
          // 当 speedx = maxspeedx时，下雨方向 会 随鼠标移动方向立即改变
          speedx = speedx + (maxspeedx - speedx) / 50;

          // 根据lineNum的值，画一定数量雨滴
          for (var i = 0; i < lineNum; i++) {
              // 调用createLine 函数，参数是雨滴x坐标
              createLine(Math.random() * 2 * canvasEl.width - (0.5 * canvasEl.width));
          }

          // 设置结束线，也就是雨滴散开 形成许多小水珠的位置
          var endLine = canvasEl.clientHeight - Math.random() * canvasEl.clientHeight / 5;

          // 遍历保存雨滴的数组
          linelist.forEach(function (e) {

              // 利用勾股定理 确定一个范围，在这个范围内雨滴会散开形成小水珠
              // e.posx + speedx * e.h 是雨滴x坐标
              // e.posy + e.h 是雨滴y坐标
              var dis = Math.sqrt(((e.posx + speedx * e.h) - mousePos[0]) * ((e.posx + speedx * e.h) - mousePos[0]) + (e.posy + e.h - mousePos[1]) * (e.posy + e.h - mousePos[1]));

              // 如果在mouseDis区域内，就删除雨滴，画一些小水珠（圆弧）
              // 实现鼠标碰到雨滴，雨滴散成小水珠的效果
              if (dis < mouseDis) {
                  // 删除 雨滴
                  e.die = true;
                  // 画一些小水珠（圆弧）
                  madedrops(e.posx + speedx * e.h, e.posy + e.h);
              }

              // 如果雨滴超过 结束线，删除雨滴，画一些小水珠（圆弧）
              if ((e.posy + e.h) > endLine) {
                  e.die = true;
                  madedrops(e.posx + speedx * e.h, e.posy + e.h);
              }

              // 如果 雨滴 y坐标 大于 可视区域的高度，设置die属性为true
              // 如果 雨滴 超出可视区域就删除掉
              if (e.posy >= canvasEl.clientHeight) {
                  e.die = true;
              } else {
                  // 逐渐增加 雨滴 y坐标的值
                  e.posy = e.posy + e.speed;

                  // 变化雨滴 x坐标
                  // * speedx 用来控制雨滴 下落 方向
                  // 使 雨滴下落方向 和 鼠标移动方向相同
                  e.posx = e.posx + e.speed * speedx;
              }
          });

          // 删除 die属性为ture 的数组成员
          // 鼠标区域内的，超过结束线的，可视区域外的雨滴删除掉
          for (var i = linelist.length - 1; i >= 0; i--) {
              if (linelist[i].die) {
                  linelist.splice(i, 1);
              }
          }

          // 渲染
          render();
          // 递归调用 update，实现动画效果
          window.requestAnimationFrame(update);
      }

      // 渲染
      function render() {
          // 画一个和可视区域一样大的矩形
          // ctx.fillStyle = backgroundColor;

          var myimg = new Image();
          myimg.src = "http://chaiserver.cn:9526/img/bg1.882fa649.jpg";

          ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
          ctx.drawImage(myimg,0,0,1440,800); //刷新背景图片

          // 画雨滴效果
          ctx.lineWidth = 5;
          linelist.forEach(function (line) {
              ctx.strokeStyle = line.color;
              ctx.beginPath();
              ctx.moveTo(line.posx, line.posy);

              // * speedx 用来控制雨滴方向
              // 使 雨滴方向 和 鼠标移动方向相同
              ctx.lineTo(line.posx + line.h * speedx, line.posy + line.h);
              ctx.stroke();
          });

          // 画雨滴散开形成小水珠效果
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#fff";
          dropList.forEach(function (e) {
              ctx.beginPath();
              ctx.arc(e.posx, e.posy, e.radius, Math.random() * Math.PI * 2, 1 * Math.PI);
              ctx.stroke();
          });

          // 解开注释，可看见鼠标范围

          ctx.beginPath();
          // ctx.arc(mousePos[0], mousePos[1], mouseDis, 0, 2 * Math.PI);
          ctx.stroke();

      }
  }
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
