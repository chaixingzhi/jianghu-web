<template>
  <div>
    <el-container style="height: 100vh">
      <!-- <transition name="fade"> -->
        <el-aside width="250px" v-if="asideVisible">
          <div class="aside-header">
            <div class="user-wrap">
              <div class="user-avatar">
                <img src="../assets/lufei.jpg" alt="" class="user-image">
              </div>
              <div class="user-info">
                <span class="user-name">{{user.username}}</span>
                <span class="user-email">{{user.email}}</span>
              </div>
            </div>
          </div>
                

          <div class="menu-warpper">
            <ul class="menu-ul" id="menuSelf">
              <li 
                v-for="(item, index) in menus"
                :key="index"
                class="menu-item"
                @click="handleLiClick(index, $event)"

              >
                <router-link :to="item.path">
                  <div>
                    <i :class="item.icon"></i>
                    <span style="margin-left: 20px">{{item.name}}</span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </el-aside>
      <!-- </transition> -->
      <transition name="fade1">
        <el-container>
          <el-header class="header" height="50px">
            <div style="widht: 30px;height: 50px; line-height: 50px">
              <i 
                :class="asideVisible ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
                style="font-size: 25px;cursor:pointer"
                @click="hideShowMenu()"
              >
              </i>
            </div>
            <div style="height: 50px; line-height: 50px;position: relative;">
              <transition name="fade">
                <input type="text" class="search-input" placeholder="请输入关键字进行搜索" v-show="inputVisible">
              </transition>
              <i 
                class="el-icon-search"
                style="font-size: 25px;cursor:pointer;position: relative;left: -30px;bottom:-5px"
                @click="showHideSearchInput"
              >
              </i>

              <i 
                class="el-icon-share"
                style="font-size: 25px;cursor:pointer;margin-left: 20px;"
              >
              </i>
            </div>
          </el-header>
          <el-main class="main" style="padding: 0">
            <transition
              name="fade-transform"
              mode="out-in"
            >
              <keep-alive>
                <router-view key="/home"/>
              </keep-alive>
            </transition>
          </el-main>
          <el-footer class="footer">
            <span>Chai © 2019 - 2010  Power by Hexo Theme indigo</span>
          </el-footer>
        </el-container>
      </transition>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Layout extends Vue{
  private user: object =  {
    username: 'Chai',
    email: '13213352672@163.com'
  }
  private asideVisible:boolean = true
  private inputVisible:boolean = false
  private menus = [
    {
      icon: 'el-icon-s-home',
      name: '主页',
      path: '/home'
    },
    {
      icon: 'el-icon-s-cooperation',
      name: '归档',
      path: '/archives'
    },
    {
      icon: 'el-icon-s-promotion',
      name: '标签',
      path: '/tag'
    },
    {
      icon: 'el-icon-menu',
      name: '分类',
      path: '/type'
    }
  ]
  private handleLiClick(index:number, event:any) {
    let doms:any = document.getElementById('menuSelf')
    
    Array.from(doms.children).forEach((dom:any) => {
      dom.className = 'menu-item'
    })
    doms.children[index].className += " active-item";
  }
  private hideShowMenu() {
    this.asideVisible = !this.asideVisible
  }
  private showHideSearchInput() {
    this.inputVisible = !this.inputVisible
  }
}
</script>

<style lang="scss">
  a,
  a:focus,
  a:hover {
    color: inherit;
    outline: none;
    text-decoration: none;
  }
  .router-link {
     text-decoration: none;
     color:#fff;
  }
  .router-link-active {
      text-decoration: none;
      // color:#fff;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .search-input {
    height: 25px;
    width: 200px;
    outline-style: none;
    border: none ;
  }
  .aside-header {
    height: 150px;
    background-image: url('../assets/headBack.jpg');
    background-size: contain;
    padding: 30px 0 0 20px;
    // box-sizing: border-box;
    .user-wrap {
      height: 100px;
      width: 100px;
      // margin-left: 20px;
      // margin-right: 35px;
      // background-color: red;
      .user-avatar {
        height:70px;
        width: 70px;
        .user-image {
          width: 70px;
          // border-radius:50px;
        }
      }
      .user-info {
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        .user-name {
          font-family: "Helvetica Neue";
          font-size: 20px;
          font-weight: 500;
        }
        .user-email {
          margin-top: 5px;
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }
  .menu-warpper {
    .menu-ul{
      padding: 0;
      .menu-item {
        padding: 0 0 0 10px;
        height: 35px;
        line-height: 35px;
        width: 100%;
        list-style-type: none;
        font-size: 18px;
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        -ms-transform: translateZ(0);
        -o-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-mask-image: -webkit-radial-gradient(circle, white 100%, black 100%);
      }
      .menu-item:hover {
        background-color: #eaeaea;
        cursor: pointer;
        
      }
      
      // .menu-item:active {
      //   // background-color: #208FC1;
      //   animation: showBtn 0.5s 1;
      // }
      // @keyframes showBtn {
      //   0% {
      //     background:-webkit-radial-gradient(Circle,#eee 28%, #eaeaea 30%, #eaeaea 48%,#aaa 60%); 
      //     background:radial-gradient(Circle,#eee 0%, #eaeaea 0%, #eaeaea 0%,#aaa 0%); 
      //   }
      //   20% {
      //     background:-webkit-radial-gradient(Circle,#eee 28%, #eaeaea 30%, #eaeaea 48%,#aaa 60%); 
      //     background:radial-gradient(Circle,#eee 1%, #eaeaea 1%, #eaeaea 1%,#aaa 1%); 
      //   }
      //   40% {
      //     background:-webkit-radial-gradient(Circle,#eee 28%, #eaeaea 30%, #eaeaea 48%,#aaa 60%); 
      //     background:radial-gradient(Circle,#eee 18%, #eaeaea 10%, #eaeaea 18%,#aaa 10%); 
      //   }
      //   80% {
      //     background:-webkit-radial-gradient(Circle,#eee 68%, #eaeaea 60%, #eaeaea 68%,#aaa 60%);
      //     background:radial-gradient(Circle,#eee 38%, #eaeaea 40%, #eaeaea 58%,#aaa 60%);
      //   }
      //   100% {
      //     background:-webkit-radial-gradient(Circle,#eee 100%, #eaeaea 100%, #eaeaea 100%,#aaa 100%);
      //     background:radial-gradient(Circle,#eee 100%, #eaeaea 100%, #eaeaea 100%,#aaa 100%);
      //   }
      // }
    }
  }
  .header {
    display: flex;
    background: #363636;
    justify-content: space-between;
    color: white;
  }
  .main {
    background-color: #aaaa;
    
  }
  .footer {
    background-color: #333;
    color: #aaa;
    text-align: center;
    line-height: 70px;
  }
  .active-item {
    background-color: #eaeaea;
    color: #000;
  }
</style>