<template>
  <div class="home">
    <left-menu :key="key"></left-menu>
    <div :class="{ 'main-app': true, 'extend-app': $store.state.collapsed }">
      <slider-nav></slider-nav>
    </div>
  </div>
</template>

<script>
import LeftMenu from '@/views/layout/components/menu.vue';
import SliderNav from '@/views/layout/components/sliderNav.vue';

export default {
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  components: {
    LeftMenu,
    SliderNav,
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");
</style>
