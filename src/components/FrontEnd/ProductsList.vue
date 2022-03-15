<template>
  <Loading :active="isLoading"></Loading>
  <div class="d-flex flex-nowrap my-3">
    <div class="me-auto">共有 {{ products.length }} 個產品</div>
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
  <template class="table align-middle" v-if="state === 'list'">
    <ul class="list-unstyled">
      <li
        class="d-flex flex-column mb-3 product-effect"
        v-for="product in products"
        :key="product?.id"
      >
        <router-link class="d-flex" :to="`/product/${product?.id}`">
          <div
            class="me-3"
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
            style="width: 130px; height: 130px; background-size: cover; background-position: center"
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
                  class="btn btn-danger align-self-center"
                  @click.prevent="addToCart(product.id)"
                  :disabled="isLoadingItem === product.id"
                >
                  <span
                    class="spinner-grow spinner-grow-sm"
                    v-show="isLoadingItem === product.id"
                  ></span>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </template>
  <template v-if="state === 'grid'">
    <div class="row row-cols-md-3 gy-3">
      <div class="col" v-for="product in products" :key="product.id">
        <router-link :to="`/product/${product.id}`">
          <div class="card border-0 h-100 product-effect">
            <img :src="product.imageUrl" class="card-img-top card-img" />
            <div class="card-body">
              <h5 class="card-title fw-bold">{{ product.title }}</h5>
            </div>
            <div class="modal-footer border-top-0">
              <button
                type="button"
                class="btn btn-danger align-self-center"
                @click.prevent="addToCart(product.id)"
                :disabled="isLoadingItem === product.id"
              >
                <span
                  class="spinner-grow spinner-grow-sm"
                  v-show="isLoadingItem === product.id"
                ></span>
                加到購物車
              </button>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </template>
  <ProductModal :id="productId" @close-modal="hideModal"></ProductModal>
</template>

<script>
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
    };
  },

  methods: {
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
      axios.post(`${url}/api/${path}/cart`, { data }).then((res) => {
        console.log(res);
        this.isLoadingItem = "";
      });
    },
    hideModal() {
      this.productModal.hide();
    },
  },
  mounted() {
    this.isLoading = true;
    axios.get(`${url}/api/${path}/products/all`).then((res) => {
      this.products = res.data.products;
      this.isLoading = false;
    });
    this.productModal = new modal(document.getElementById("productModal"), {
      keyboard: false,
    });
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

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
</style>
