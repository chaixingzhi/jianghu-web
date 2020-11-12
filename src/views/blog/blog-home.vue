<template>
  <div id="blog-home">
    <div class="main-left">
        <ul id="mainleft">
          <li>推荐</li>
<!--          <li>关注</li>-->
<!--          <li>其他</li>-->
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
          <div class="center-blog-item" v-for="(item,index) in blogs" :key="index" @click="viewBlog(item)">
            <div>{{item.title}}</div>
            <div style="height: 80px;line-height: 28px;">{{item.content.substr(0,80)}}...</div>
            <div style="font-size: 12px">{{item.user.alias}}</div>
          </div>
        </div>
      </div>
      <div class="main-right" v-if="false">
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
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Cookie from 'js-cookie'
import Api from '../../api/commonApi';

@Component({
  name: 'BlogHome'
})
export default class extends Vue{
  private imges:any = [
    'csdn1.jpg',
    'csdn2.jpg',
    'csdn3.jpg'
  ];
  private blogs:any = [];

  private getBlogList() {
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
      console.debug('blogs: ', this.blogs)
    })
  };

  private viewBlog(val: any) {
      this.$router.push({
          name: 'detail',
          query: {
              blogId: val.id
          }
      })
  };
  mounted() {
    console.log('进入blog首页：')
    const mainLeftDemo = document.getElementById('mainleft');
    if(mainLeftDemo) {
      Array.from(mainLeftDemo.children)[0].className = 'item-active';
      mainLeftDemo.addEventListener('click', (event:any) => {
          Array.from(mainLeftDemo.children).forEach((demo:any) => {
              demo.className = '';
          })
          event.target.className = 'item-active'
      });
    }
  }
  created() {
    this.getBlogList();
  }
}
</script>

<style lang="scss">
  #blog-home {
    margin-top: 30px;
    padding: 0 130px;
    display: flex;
    .main-left {
      width: 96px;
      height: 600px;
      box-shadow: 0 0 1px 1px rgba(0,0,0,0.06);
      background-color: #fff;
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
      width: 50vw;
      /*background-color: #fff;*/
      margin-left: 20px;
        .center-blog {
          margin-top: 15px;
          background-color: #fff;
          border: 1px solid #eee;
          .center-blog-item {
            padding: 8px 8px;
            height: 150px;
            border-bottom: 1px solid #eee;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            cursor: pointer;
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
</style>
