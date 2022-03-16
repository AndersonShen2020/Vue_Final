<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-3">
        <h2>產品分類列表</h2>
        <router-link
          v-for="item in gategorys"
          :key="item"
          :to="{ path: '/products', query: { gategory: item } }"
        >
          {{ item }}
        </router-link>
      </div>
      <div class="col-9">
        <ProductsList></ProductsList>
      </div>
    </div>
  </div>
</template>
<script>
import ProductsList from "@/components/FrontEnd/ProductsList.vue";

export default {
  components: {
    ProductsList,
  },
  data() {
    return {
      gategorys: ["全部", `淺焙`, "中焙", "深焙", "馬克杯", "磨豆機", "咖啡機"],
    };
  },
};
</script>
<style></style>
