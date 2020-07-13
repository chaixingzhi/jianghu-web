<template>
  <el-container>
    <el-header 
      class="main-header"
      height="130px"
    >
      <h2>仗剑走天涯</h2>
      <el-tabs v-if="tabNames.length"  v-model="activeName" class="main-tab">
        <el-tab-pane v-for="(item,i) in tabNames" :label="item.label" :name="item.name" :key="i"></el-tab-pane>
        <!-- <el-tab-pane label="用户管理" name="first" ></el-tab-pane>
        <el-tab-pane label="配置管理" name="second"></el-tab-pane>
        <el-tab-pane label="角色管理" name="third"></el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane> -->
      </el-tabs>
    </el-header>
    <el-main class="main-two">
      <slot name="content"></slot>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'Main',
})

export default class extends Vue {
  private activeName:string=""
  @Prop({
    type: Array,
    default() {
        return []
    }
  }) private tabNames:any;
  @Prop({default: 'type1'}) private activeTempName:any;

  created() {
    console.log('tabNames: ', this.tabNames)
    this.activeName = this.activeTempName
  };
  mounted() {
    console.log(this.tabNames)
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
    background-image: url("https://files.dbnuo.com/wallpaper/wallhaven-4gj334.webp");
    // line-height: 130px;
    text-align: left;
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
    
    // border-top: 2px solid #fff;

  }
  
</style>