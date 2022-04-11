<template>
  <Loading :active="isLoading"></Loading>
  <div class="container main py-3" v-if="products.length > 0">
    <div class="row text-center px-3">
      <div class="col-4 d-flex flex-column bg-primary text-secondary p-3">
        <span>STEP1</span>
        <span>確認訂單</span>
      </div>
      <div class="col-4 d-flex flex-column p-3 bg-secondary text-primary">
        <span>STEP2</span>
        <span>建立訂單</span>
      </div>
      <div class="col-4 d-flex flex-column p-3 bg-secondary text-primary">
        <span>STEP3</span>
        <span>完成訂單</span>
      </div>
    </div>

    <div class="row py-3 justify-content-between gx-0">
      <div class="col-md-6">
        <ShoppingCart @reset-page="getCart"></ShoppingCart>
      </div>
      <div class="col-md-5 bg-light bg-opacity-50">
        <p class="d-flex fs-3 fw-bold m-3">填寫訂購資訊</p>
        <ValidateForm class="p-3"></ValidateForm>
      </div>
    </div>
  </div>
  <div class="container main py-3" v-if="products.length === 0">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <i class="bi bi-cart-fill" style="font-size: 10rem"></i>
      <p>您的購物車中沒有商品</p>
      <RouterLink to="/products">
        <button type="button" class="btn coffee-btn">去購物</button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import ValidateForm from "@/components/FrontEnd/ClientValidateForm.vue";
import ShoppingCart from "@/components/FrontEnd/ShoppingCart.vue";

import axios from "axios";
const url = process.env.VUE_APP_API; // 請加入站點
const path = process.env.VUE_APP_PATH; // 請加入個人 API path

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import titleMixin from "@/mixins/titleMixin";

export default {
  mixins: [titleMixin],
  components: {
    ShoppingCart,
    ValidateForm,
    Loading,
  },
  data() {
    return {
      title: "確認訂單",
      products: [],
      isLoading: false,
    };
  },
  methods: {
    getCart(message) {
      axios.get(`${url}/api/${path}/cart`).then((res) => {
        this.products = res.data.data.carts;
        if (message === "delete") {
          this.products.pop();
        }

        this.isLoading = false;
      });
    },
    resetCart() {
      this.products = [];
    },
  },
  mounted() {
    this.isLoading = true;
    this.getCart();
  },
};
</script>

<style>
.main {
  min-height: calc(100vh - (66px + 120px));
}
</style>
