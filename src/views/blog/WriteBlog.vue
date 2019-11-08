<template>
  <div id="write">
    <div class="header">
      <el-button type="primary" icon="el-icon-back" circle ></el-button>
      <div class="btn-right">
        <el-button type="primary" size="small" @click="changeEditor">切换编辑器</el-button>
        <el-button type="primary" size="small">保存草稿</el-button>
        <el-button type="primary" size="small">发布文章</el-button>
      </div>
    </div>
    <div class="tinymec" v-if="isTinymec">
      <tinymec-editor

      ></tinymec-editor>
    </div>
    <div class="markdown" v-else>
      <markdown-editor
        ref="markdownEditor"
        v-model="content4"
        height="100%"
        :language="language"
      />
    </div>
  </div>
</template>

<script lang="ts">
// api-key="ld2t78njl0a3nq8b218fvjvexpg1ql999h23ldmiyxwxz9hd"
import { Vue, Component } from 'vue-property-decorator';
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'
import TinymecEditor from '@/components/TinymceEditer/index.vue'
import { AppModule } from '@/store/modules/app'
@Component({
  name: 'WriteBlog',
  components: {
    MarkdownEditor,
    TinymecEditor
  }
})
export default class extends Vue{
  private content4:string="请输入内容"
  private languageTypeList: { [key: string]: string } = {
    'en': 'en_US',
    'zh': 'zh_CN',
  }
  private html = ''
  private isTinymec:boolean = true
  get language() {
    return this.languageTypeList[AppModule.language]
  }

  private getHtml() {
    this.html = (this.$refs.markdownEditor as MarkdownEditor).getHtml()
  }
  private changeEditor() {
    this.isTinymec = !this.isTinymec
  }
  mounted() {

  }
}
</script>

<style lang="scss">
  #write {
    height: 100vh;
    .header {
      padding: 5px;
      height: 40px;
      background-color: #fff;
      .btn-right {
        display: flex;
        justify-content: flex-end;
      }
    }
    .markdown {
      height: calc(100% - 50px);
    }
    .tinymec {
      // height: 100vh;
      height: calc(100% - 50px);
    }
  }
</style>