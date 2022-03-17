<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-3">
        <ProductsSidebar></ProductsSidebar>
      </div>
      <div class="col-9">
        <ProductsList></ProductsList>
      </div>
    </div>
  </div>
</template>
<script>
import ProductsList from "@/components/FrontEnd/ProductsList.vue";
import ProductsSidebar from "@/components/FrontEnd/ProductsSidebar.vue";

export default {
  components: {
    ProductsSidebar,
    ProductsList,
  },
};
</script>
