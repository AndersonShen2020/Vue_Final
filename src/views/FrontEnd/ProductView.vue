<template>
  <div class="container">
    <nav class="py-2 border-bottom">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item">
          <router-link to="/"> 首頁 </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/products"> 產品列表 </router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>

    <div class="row align-items-center">
      <div class="col-sm-6">
        <div class="mb-2">
          <img class="img-fluid" :src="product.imageUrl" alt="" />
        </div>
      </div>
      <div class="col-sm-6">
        <div class="row">
          <div class="mb-3">
            <p class="badge bg-primary rounded-pill">{{ product.category }}</p>
            <p class="display-4 fw-bold">{{ product.title }}</p>
          </div>
          <div class="mb-3">
            <p class="pre">{{ product.description }}</p>
          </div>
          <div class="mb-3 text-end">
            <span class="fs-3 fw-bold">NT ${{ product.price }} 元</span>
            <span> / {{ product.unit }}</span>
          </div>
          <div class="d-flex">
            <select id="" class="form-select w-auto my-3 ms-auto" v-model="qty">
              <option :value="num" v-for="num in 20" :key="`${num}`">
                {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="d-flex justify-content-end">
            <span class="fs-3 fw-bold me-3">總計 $ {{ qty * product.price }} 元</span>
            <button type="button" class="btn btn-primary" @click="addToCart(id)">加入購物車</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-3">
      <div class="col-md-12">
        <h4 class="text-center py-3 fw-bold">你可能也會喜歡</h4>
        <swiper
          :slides-per-view="3"
          :space-between="50"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="item in products" :key="item.id">
            <router-link :to="`/product/${item.id}`">
              <div class="card">
                <img :src="item.imageUrl" class="card-img-top card-img" />
                <div class="card-body">
                  <h5 class="card-title fw-bold">{{ item.title }}</h5>
                </div>
                <div class="modal-footer border-top-0 justify-content-between">
                  <p>NT ${{ item.price }}</p>
                  <button
                    type="button"
                    class="btn btn-danger align-self-center"
                    @click.prevent="addToCart(item.id)"
                  >
                    加到購物車
                  </button>
                </div>
              </div>
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const url = process.env.VUE_APP_API; // 請加入站點
const path = process.env.VUE_APP_PATH; // 請加入個人 API path

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";

// Import Swiper styles
import "swiper/swiper.scss";

export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      id: this.$route.params.id,
      product: {},
      qty: 1,
      products: [],
    };
  },
  methods: {
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty: this.qty | qty,
      };
      axios.post(`${url}/api/${path}/cart`, { data }).then((res) => {
        alert(res.data.message);
      });
    },
    async getProduct() {
      await axios.get(`${url}/api/${path}/product/${this.id}`).then((res) => {
        this.product = res.data.product;
      });
    },
    async getProductsWithCategory() {
      await axios.get(`${url}/api/${path}/products/all`).then((res) => {
        const vm = this;
        this.products = res.data.products.filter((item) => {
          return item.classification === vm.product.classification;
        });
      });
    },
    onSwiper(swiper) {
      console.log("onSwiper", swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
  },
  async mounted() {
    await this.getProduct();
    await this.getProductsWithCategory();
  },
};
</script>
<style>
.pre {
  white-space: pre-wrap;
}

.card {
  height: 360px;
}

.card-img {
  height: 200px;
}
</style>
