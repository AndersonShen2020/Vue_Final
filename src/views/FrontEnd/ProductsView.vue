<template>
  <div class="container">
    <nav class="py-2 border-bottom">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item">
          <router-link to="/"> 首頁 </router-link>
        </li>
        <li class="breadcrumb-item">產品列表</li>
      </ol>
    </nav>

    <div class="row mt-3">
      <div class="col-md-3">
        <ProductsSidebar></ProductsSidebar>
      </div>
      <div class="col-md-9">
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
