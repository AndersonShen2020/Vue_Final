<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <nav class="py-2 border-bottom">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item">
          <RouterLink to="/"> 首頁 </RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink to="/products"> 產品列表 </RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>

    <div class="row align-items-center">
      <div class="col-sm-6">
        <div class="mb-2">
          <img class="img-fluid" :src="product.imageUrl" :alt="product.title" />
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
              <option :value="num" v-for="num in 20" :key="num">
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
          :modules="modules"
          :loop="swiperOptions.loop"
          :breakpoints="swiperOptions.breakpoints"
          :autoplay="swiperOptions.autoplay"
        >
          <swiper-slide v-for="product in products" :key="product.id">
            <CardComponent :item="product"></CardComponent>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from "@/api/mitt.js";
import axios from "axios";
const url = process.env.VUE_APP_API; // 請加入站點
const path = process.env.VUE_APP_PATH; // 請加入個人 API path

// Import Swiper Vue.js components
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";

// Import Swiper styles
import "swiper/swiper.scss";

import CardComponent from "@/components/common/CardComponent.vue";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: { Swiper, SwiperSlide, CardComponent, Loading },
  data() {
    return {
      id: this.$route.params.id,
      isLoading: false,
      product: {},
      qty: 1,
      products: [],
      modules: [Autoplay],
      swiperOptions: {
        // Default parameters
        slidesPerView: 1,
        spaceBetween: 10,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        loop: true,
        // Responsive breakpoints
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        },
      },
    };
  },
  methods: {
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const data = {
        product_id: id,
        qty: this.qty | qty,
      };
      axios.post(`${url}/api/${path}/cart`, { data }).then(() => {
        emitter.emit("getCartNum");
        this.isLoading = false;
      });
    },
    async getProduct() {
      await axios.get(`${url}/api/${path}/product/${this.id}`).then((res) => {
        this.product = res.data.product;
        document.title = res.data.product.title;
      });
    },
    async getProductsWithCategory() {
      await axios.get(`${url}/api/${path}/products/all`).then((res) => {
        const vm = this;
        this.products = res.data.products.filter((item) => {
          return item.classification === vm.product.classification;
        });
      });
      this.isLoading = false;
    },
  },
  async mounted() {
    this.isLoading = true;
    await this.getProduct();
    await this.getProductsWithCategory();
  },
  watch: {
    $route(to) {
      this.id = to.params.id;
      this.getProduct();
    },
  },
};
</script>

<style>
.pre {
  white-space: pre-wrap;
}

@media screen and (min-width: 320px) {
  .card {
    height: 410px;
  }
}
@media screen and (min-width: 480px) {
  .card {
    height: 410px;
  }
}
@media screen and (min-width: 640px) {
  .card {
    height: 410px;
  }
}

.card > .card-img {
  min-height: 250px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
