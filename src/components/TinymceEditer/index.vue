<template>
    <tinymce-editor id="tinymce" v-model="tinymceHtml" :init="editorInit"></tinymce-editor>
</template>

<script lang="ts">
// api-key="ld2t78njl0a3nq8b218fvjvexpg1ql999h23ldmiyxwxz9hd"
import { Vue, Component } from 'vue-property-decorator';
import Editor from '@tinymce/tinymce-vue';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver/theme';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textcolor';
@Component({
  name: 'TinymceEditor',
  components: {
    'tinymce-editor': Editor,
  }
})
export default class extends Vue{
  private editorInit:any = {
    language_url: '/tinymce/zh_CN.js',
    language: 'zh_CN',
    skin_url: '/tinymce/skins/ui/oxide',
    height: '100%',
    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
    toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
    branding: false
  }
  private tinymceHtml:string='请输入内容'
 
  mounted() {
    tinymce.init({})
  }
}
</script>

<style lang="scss">
  #tinymec{

  }
</style>