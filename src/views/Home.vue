<template>
  <Main />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Main from '@/components/Main.vue';

@Component({
  components: {
    Main
  }
})
export default class Home extends Vue {}
</script>
