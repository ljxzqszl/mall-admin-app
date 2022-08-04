<template>
  <div class="product-list">
    <search-box @submit="searchSubmit" />
  </div>
</template>

<script>
import searchBox from '@/components/search.vue';

export default {
  components: {
    searchBox,
  },
  methods: {
    searchSubmit(form) {
      console.log(form);
    },
  },
};
</script>
