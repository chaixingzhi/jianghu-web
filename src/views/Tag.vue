<template>
  <Main />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Main from '@/components/Main.vue';

@Component({
  name: 'Home',
  components: {
    Main
  }
})
export default class extends Vue {
  created() {
    console.log('this: ',this)
  }
}
</script>