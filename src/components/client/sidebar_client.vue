<template>
  <div class="col-md-3 mt-4">
    <ul class="list-group sticky-top">
      <a class="list-group-item list-group-item-light" href="#" 
        @click.prevent="toCategoryPage('', 1)" :class="{'active': isActive == 1}">所有類型</a>
      <a class="list-group-item list-group-item-light" href="#" 
        @click.prevent="toCategoryPage('科幻與奇幻', 2)" :class="{'active': isActive == 2}">科幻與奇幻</a>
      <a class="list-group-item list-group-item-light" href="#" 
        @click.prevent="toCategoryPage('動作與歷險', 3)" :class="{'active': isActive == 3}">動作與歷險</a>
      <a class="list-group-item list-group-item-light" href="#" 
        @click.prevent="toCategoryPage('兒童與家庭', 4)" :class="{'active': isActive == 4}">兒童與家庭</a>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isActive: 1,
      }
    },
    methods: {
      toCategoryPage(category, n) {
        this.isActive = n;
        this.$bus.$emit('category-search', category);
      }
    }
  }
</script>

