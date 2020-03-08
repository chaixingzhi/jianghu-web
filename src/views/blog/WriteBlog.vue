<template>
  <div id="write">
    <div class="header">
      <el-button type="primary" icon="el-icon-back" circle ></el-button>
      <div class="btn-right">
        <el-button type="primary" size="small" @click="changeEditor">切换编辑器</el-button>
        <el-button type="primary" size="small" @click="saveTempContent">保存草稿</el-button>
        <el-button type="primary" size="small">发布文章</el-button>
      </div>
    </div>
    <div class="tinymec" v-if="isTinymec">
      <tinymec-editor
        v-if="isTinymec"
        v-model="tinymecValue"
        @change="editorChange"
      ></tinymec-editor>
    </div>
    <div class="markdown" v-else>
      <markdown-editor
        v-if="!isTinymec"
        ref="markdownEditor"
        v-model="markdownValue"
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
import { AppModule } from '../../store/modules/app'
import Api from '../../api/commonApi'
@Component({
  name: 'WriteBlog',
  components: {
    MarkdownEditor, // Markdown 编辑器组件
    TinymecEditor // 富文本 编辑器组件
  }
})
export default class extends Vue{
  private markdownValue:string = "请输入内容"  // markdown v-model
  private languageTypeList: { [key: string]: string } = {
    'en': 'en_US',
    'zh': 'zh_CN',
  }
  private html = ''
  private isTinymec:boolean = true
  private tinymecValue:string = ''

  /**
   * @Description: 获取语言
   * @param {type} 
   * @Date: 2019-11-08 10:56:03
   */  
  get language() {
    return this.languageTypeList[AppModule.language]
  }
  /**
   * @Description: 得到markdown的内容
   * @param {type} 
   * @Date: 2019-11-08 10:56:11
   */  
  private getHtml() {
    if(!this.isTinymec && this.$refs.markdownEditor) {
      this.html = (this.$refs.markdownEditor as MarkdownEditor)['getHtml']()
    }
  }
  /**
   * @Description: 切换编辑器
   * @param {type} 
   * @Date: 2019-11-08 10:56:26
   */  
  private changeEditor() {
    this.isTinymec = !this.isTinymec
  }
  /**
   * @Description: 保存草稿
   * @param {type} 
   * @Date: 2019-11-08 10:56:33
   */  
  private saveTempContent() {
   Api.create('blog/save', {
     a: 1,
     b:2
   }).then(res => {
      this.$message.success('保存成功')
      console.log('保存草稿成功返回：', res)
    })
  }
  /**
   * @Description: 监听富文本改变事件
   * @param {type} 
   * @Date: 2019-11-08 10:56:42
   */  
  private editorChange(val:string) {
    this.tinymecValue = val
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