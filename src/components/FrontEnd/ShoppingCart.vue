<template>
  <Loading :active="isLoading"></Loading>
  <div class="d-flex justify-content-around mb-3">
    <span class="fs-3 fw-bold">確認訂單內容</span>
    <button
      @click="clearAllCarts(), $emit('reset-page')"
      class="btn btn-outline-danger"
      type="button"
      :disabled="cartData.carts?.length === 0"
    >
      清空購物車
    </button>
  </div>
  <ul class="list-unstyled p-3">
    <li
      class="py-3 border-bottom d-flex align-items-center"
      v-for="product in cartData.carts"
      :key="product.id"
    >
      <div class="col-md-1">
        <button
          @click="removeCartItem(product.id), $emit('reset-page', 'delete')"
          type="button"
          class="btn btn-outline-danger btn-sm"
        >
          x
        </button>
      </div>
      <div class="col me-auto px-3">{{ product.product.title }}</div>
      <div class="col-md-4">
        <div class="input-group input-group-sm">
          <select
            id=""
            class="form-select"
            v-model="product.qty"
            @change="updateCartItem(product)"
            :disabled="isLoadingItem === product.id"
          >
            <option :value="num" v-for="num in 20" :key="`${num}${product.id}`">
              {{ num }}
            </option>
          </select>
          <span class="input-group-text" id="basic-addon2">
            {{ product.product.unit }}
          </span>
        </div>
      </div>
      <div class="col-md-2 text-end">$ {{ product.final_total }} NTD</div>
    </li>
    <li class="py-3">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          v-model="couponCode"
          placeholder="輸入 pay88 將享有 8 折優惠"
        />
        <button type="button" class="btn coffee-btn" @click="useCoupon">套用優惠卷</button>
      </div>
    </li>
    <li class="py-3 text-end">
      <p>總計 NT$ {{ cartData.total }}</p>
      <p class="text-success" v-if="isCoupon">折扣價 NT$ {{ cartData.final_total }}</p>
    </li>
  </ul>
</template>

<script>
import emitter from "@/api/mitt.js";

import axios from "axios";
const url = process.env.VUE_APP_API; // 請加入站點
const path = process.env.VUE_APP_PATH; // 請加入個人 API path

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  emits: ["reset-page"],
  components: {
    Loading,
  },
  data() {
    return {
      cartData: [],
      productId: null,
      isLoadingItem: "",
      isLoading: false,
      isEnableSend: false,
      couponCode: "",
      isCoupon: false,
    };
  },
  methods: {
    removeCartItem(id) {
      this.isLoadingItem = id;
      axios.delete(`${url}/api/${path}/cart/${id}`).then(() => {
        this.getCart();
        this.isLoadingItem = "";
        emitter.emit("getCartNum");
      });
    },
    getCart() {
      axios.get(`${url}/api/${path}/cart`).then((res) => {
        this.cartData = res.data.data;
        this.isLoading = false;
      });
    },
    updateCartItem(item) {
      let data = {
        product_id: item.id,
        qty: item.qty,
      };
      axios.put(`${url}/api/${path}/cart/${item.id}`, { data }).then(() => {
        this.getCart();
        this.isLoadingItem = "";
      });
    },
    clearAllCarts() {
      axios.delete(`${url}/api/${path}/carts`).then(() => {
        emitter.emit("getCartNum");
        this.getCart();
      });
    },
    useCoupon() {
      const coupon = { code: this.couponCode };
      axios.post(`${url}/api/${path}/coupon`, { data: coupon }).then(() => {
        this.isLoading = true;
        this.getCart();
        this.isCoupon = true;
      });
    },
  },
  watch: {
    cartData(newVal) {
      if (newVal.carts.length === 0) this.isEnableSend = false;
      else this.isEnableSend = true;
      const vm = this;
      emitter.emit("cartSend", vm.isEnableSend);
    },
  },
  created() {
    const vm = this;
    emitter.on("clearCart", () => {
      vm.getCart();
    });
  },
  mounted() {
    this.isLoading = true;
    this.getCart();
  },
  unmounted() {
    const vm = this;
    emitter.off("clearCart", () => {
      vm.getCart();
    });
  },
};
</script>
