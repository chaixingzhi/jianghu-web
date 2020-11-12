<template>
  <div id="blog-detail">
    <div class="mark-content">
      <h3 style="text-align: center">{{blogTitle}}</h3>
      <div v-html="blogContent">

      </div>
    </div>
<!--    <vue-markdown class="article-content"></vue-markdown>-->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// import VueMarkdown from 'vue-markdown';
import Api from '../../api/commonApi';
@Component({
  name: 'blog-detail',
  components: {
    // VueMarkdown
  }
})
export default class extends Vue {
  private blogContent: any = null;
  private blogTitle: string = '';

  private getBlogContent() {
    let blogId = this.$route.query.blogId
    Api.get('blog/getOne/'+blogId).then(res => {
      console.log('获取博客详情：', res)
      this.blogContent = res.data.content_html;
      this.blogTitle = res.data.title;
    })
  }

  created() {
    this.getBlogContent()
    console.log('this: ',this)
  }
}
</script>

<style lang="scss">
  #blog-detail {
    padding: 0 280px;
    min-height: 100vh;
    background-image: url("http://chaiserver.cn:9526/img/bg5.4cf8e523.jpg");
    background-size: cover;
    opacity: 1;
    .mark-content {
      height: 100%;
      background-color: #fff;
      padding: 20px;
      opacity: 0.9;
      box-shadow: 0 0 1px 2px rgba(0,0,0,0.06);
    }
  }
</style>
