<template>
  <div class="row">
    <div class="col-8">
      <!--prikaz posts.vue -->
      <router-view/>
    </div>
    <div class="col-4"></div>
  </div>
</template>

<script>
import store from "@/store.js";

export default {
  data() {
    return store;
  },
  
};
</script>