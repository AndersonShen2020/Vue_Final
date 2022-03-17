<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-3">
        <div class="sticky-top pt-3">
          <h2>產品分類</h2>
          <div class="filter-all">
            <router-link :to="{ path: '/products', query: { category: '全部' } }">
              全站商品
            </router-link>
          </div>

          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                >
                  咖啡豆
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
              >
                <div class="accordion-body ms-2">
                  <div v-for="item in categorys[1]" :key="item" class="d-flex">
                    <router-link :to="{ path: '/products', query: { category: item } }">
                      {{ item }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                >
                  周邊器材
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
              >
                <div class="accordion-body ms-2">
                  <div v-for="item in categorys[2]" :key="item" class="d-flex">
                    <router-link :to="{ path: '/products', query: { category: item } }">
                      {{ item }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-9">
        <ProductsList></ProductsList>
      </div>
    </div>
  </div>
</template>
<script>
import ProductsList from "@/components/FrontEnd/ProductsList.vue";
import Collapse from "bootstrap/js/dist/collapse";

export default {
  components: {
    ProductsList,
  },
  data() {
    return {
      categorys: ["全部", ["淺焙", "中焙", "深焙"], ["馬克杯", "磨豆機", "咖啡機"]],
    };
  },
  mounted() {
    new Collapse(document.getElementById("accordionFlushExample"), {
      toggle: false,
    });
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.filter-all {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  background-color: #fff;
  border-bottom-color: rgba(0, 0, 0, 0.125);
  border-bottom-style: solid;
  border-bottom-width: 1px;
}
</style>
