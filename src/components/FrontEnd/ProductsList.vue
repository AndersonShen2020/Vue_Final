<template>
  <Loading :active="isLoading"></Loading>
  <div class="d-flex flex-nowrap my-3">
    <div class="me-auto">共有 {{ filterProducts.length }} 個產品</div>
    <!-- 顯示分類 -->
    <div class="mx-2">
      <i
        class="icon-editor p-2 bi bi-list-ul"
        :class="{ 'bg-gray': state === 'list' }"
        @click="state = 'list'"
      ></i>
    </div>
    <div class="mx-2">
      <i
        class="icon-editor p-2 bi bi-grid"
        :class="{ 'bg-gray': state === 'grid' }"
        @click="state = 'grid'"
      ></i>
    </div>
  </div>
  <!-- list 樣式 -->
  <template class="table align-middle" v-if="state === 'list'">
    <ul class="list-unstyled">
      <li
        class="d-flex flex-column mb-3 product-effect p-2"
        v-for="product in filterProducts"
        :key="product?.id"
        style="min-width: 130px"
      >
        <RouterLink class="d-flex" :to="`/product/${product?.id}`">
          <div
            class="me-3"
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
            style="
              min-width: 130px;
              min-height: 130px;
              background-size: cover;
              background-position: center;
            "
          ></div>
          <div class="d-flex flex-column justify-content-between flex-fill">
            <div>{{ product.title }}</div>
            <div class="d-flex justify-content-between">
              <div v-if="product.price === product.origin_price" class="h5">
                {{ product.price }} 元
              </div>
              <div v-else>
                <del class="h6 text-gray">NT${{ product.origin_price }}</del>
                <div class="h5 text-danger">NT${{ product.price }}</div>
              </div>
              <div class="d-flex">
                <button
                  type="button"
                  class="btn align-self-center btn-cart"
                  @click="addToCart(product.id)"
                  :disabled="isLoadingItem === product.id"
                >
                  <span
                    class="spinner-grow spinner-grow-sm"
                    v-show="isLoadingItem === product.id"
                  ></span>
                  <i class="bi bi-cart"></i>
                </button>
              </div>
            </div>
          </div>
        </RouterLink>
      </li>
    </ul>
  </template>
  <!-- grid 樣式 -->
  <template v-if="state === 'grid'">
    <div class="row row-cols-md-3 row-cols-1 gy-3">
      <div class="col" v-for="product in filterProducts" :key="product.id">
        <RouterLink :to="`/product/${product.id}`">
          <div class="card border-0 h-100 product-effect p-1">
            <img :src="product.imageUrl" class="card-img-top card-img" :alt="product.title" />
            <div class="card-body">
              <h5 class="card-title fw-bold">{{ product.title }}</h5>
            </div>
            <div class="modal-footer border-top-0 justify-content-between">
              <div v-if="product.price === product.origin_price" class="h5">
                NT$ {{ product.price }}
              </div>
              <div v-else>
                <del class="h6 text-gray">NT$ {{ product.origin_price }}</del>
                <div class="h5 text-danger">NT$ {{ product.price }}</div>
              </div>
              <button
                type="button"
                class="btn btn-cart align-self-center"
                @click="addToCart(product.id)"
                :disabled="isLoadingItem === product.id"
              >
                <span
                  class="spinner-grow spinner-grow-sm"
                  v-show="isLoadingItem === product.id"
                ></span>
                <i class="bi bi-cart"></i>
              </button>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </template>
  <ProductModal :id="productId" @close-modal="hideModal"></ProductModal>
</template>

<script>
import emitter from "@/api/mitt.js";
import axios from "axios";
const url = process.env.VUE_APP_API; // 請加入站點
const path = process.env.VUE_APP_PATH; // 請加入個人 API path

import ProductModal from "@/components/FrontEnd/ProductModal.vue";
import modal from "bootstrap/js/dist/modal";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    ProductModal,
    Loading,
  },
  data() {
    return {
      products: [],
      productId: null,
      isLoadingItem: "",
      isLoading: false,
      state: "list",
      category: this.$route.query,
    };
  },

  methods: {
    getProducts() {
      axios.get(`${url}/api/${path}/products/all`).then((res) => {
        this.products = res.data.products;
        this.isLoading = false;
      });
    },
    openProductModal(id) {
      this.productId = id;
      this.productModal.show();
    },
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      this.isLoadingItem = id;
      axios.post(`${url}/api/${path}/cart`, { data }).then(() => {
        this.isLoadingItem = "";
        emitter.emit("getCartNum");
      });
    },
    hideModal() {
      this.productModal.hide();
    },
  },

  async mounted() {
    this.isLoading = true;
    await this.getProducts();
    this.productModal = new modal(document.getElementById("productModal"), {
      keyboard: false,
    });
    this.category = this?.$route?.query?.category;
  },

  watch: {
    $route(to) {
      this.category = to.query.category;
    },
  },

  computed: {
    filterProducts() {
      const vm = this;
      if (this.category === "全部" || this.category === undefined) {
        return this.products;
      } else {
        let filter = this.products.filter(function (item) {
          return item.category === vm.category;
        });
        return filter;
      }
    },
  },
};
</script>

<style scoped>
li {
  border-top: 1px solid #dbdbdb;
  padding-top: 5px;
}

li:first-child {
  border-top: 0px solid #dbdbdb;
}

.icon-editor {
  cursor: pointer;
}

.icon-editor:hover {
  background-color: #8d9297;
  color: white;
}

.product-effect {
  transition: all 0.1s ease-in;
  background-color: #fff;
}

.product-effect:hover {
  transform: scale(1.02);
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
}

.card-img {
  height: 200px;
  padding: -0.25rem;
}

.btn-cart:hover {
  background-color: red;
  color: white;
}
</style>
