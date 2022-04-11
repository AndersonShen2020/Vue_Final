<template>
  <Loading :active="isLoading"></Loading>
  <!-- 開頭 Swiper -->
  <div class="container py-5">
    <Swiper
      :slidesPerView="1"
      :spaceBetween="10"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :modules="modules"
    >
      <SwiperSlide>
        <div
          class="leading-img d-flex"
          :style="{
            backgroundImage: `url('https://images.unsplash.com/photo-1563297871-fbbf4e345a04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80')`,
          }"
        >
          <p class="text-primary text-center fw-bold w-100 align-self-center leading-text">
            一天的起點，從咖啡開始
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          class="leading-img d-flex"
          :style="{
            backgroundImage: `url('https://images.unsplash.com/photo-1508984772106-f2a17812774c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,
          }"
        >
          <p class="text-secondary text-center w-100 align-self-center leading-text">
            工作與咖啡是最佳搭配
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
  <!-- 產品 -->
  <div class="bg-light bg-opacity-50 py-5">
    <div class="container">
      <h2 class="text-center mb-5">我們的產品</h2>
      <swiper
        :loop="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        :modules="modules"
        :breakpoints="breakpoints"
      >
        <SwiperSlide v-for="product in coffeeProducts" :key="product.id">
          <CardComponent :item="product"></CardComponent>
        </SwiperSlide>
      </swiper>
    </div>
  </div>
  <!-- 知識 -->
  <div class="container my-3">
    <div class="row">
      <div class="col-md-6 d-none d-md-block">
        <div
          style="
            background-image: url('https://images.unsplash.com/photo-1589646101665-d287dc7a9802?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
            height: 400px;
            background-size: cover;
            background-position: center;
          "
        ></div>
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-center">
        <h3 class="coffee-header">咖啡品種</h3>
        <div class="text-start text-lg-center text-coffee">
          <p>咖啡豆的產地主要來自非洲、南美洲及亞洲地區</p>
          <p>非洲產出的咖啡豆大多帶有水果酸味及香氣</p>
          <p>南美洲整體平衡感佳，口感明亮清爽</p>
          <p>亞洲則是酸度低並帶有香料風味</p>
        </div>
        <div class="d-flex justify-content-end">
          <RouterLink class="btn coffee-btn text-secondary" to="/KnowledgeView">
            查看咖啡品種
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6 d-flex flex-column justify-content-center">
        <h3 class="coffee-header">咖啡烘焙</h3>
        <div class="text-start text-lg-center text-coffee">
          <p>烘焙咖啡使咖啡生豆通過烘炒轉變為已烘焙的咖啡製品。</p>
          <p>烘炒的過程使得生豆膨脹並改變其顏色、口感、氣味與密度，因而產生了咖啡的特殊風味。</p>
          <p>未烘焙的咖啡豆與已烘焙的含有相似的酸度、蛋白質與咖啡因，但缺少其美好滋味。</p>
          <p>最簡單的判斷方式是，豆子烘烤的時間越長，酸味越淡，咖啡因含量也越少。</p>
        </div>
        <div class="d-flex justify-content-end">
          <RouterLink
            class="btn coffee-btn text-secondary"
            :to="{ path: '/KnowledgeView', query: { state: 'coffeeRoast' } }"
          >
            查看咖啡烘焙
          </RouterLink>
        </div>
      </div>
      <div class="col-md-6 d-none d-md-block">
        <div
          style="
            background-image: url('https://images.unsplash.com/photo-1537130508299-46ab547b4be3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80');
            height: 400px;
            background-size: cover;
          "
        ></div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6 d-none d-md-block">
        <div
          style="
            background-image: url('https://images.unsplash.com/photo-1545665613-29394cee622b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
            height: 400px;
            background-size: cover;
          "
        ></div>
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-center">
        <h3 class="coffee-header">手沖咖啡</h3>
        <div class="text-start text-lg-center text-coffee">
          <p>手沖咖啡一點也不難！</p>
          <p>
            而它最有趣的地方是，即使咖啡粉是同一包，也可以因為水溫、咖啡粉的粉量、手沖的速度、沖煮的方法，而讓每一次泡的味道有所不同！
          </p>
        </div>
        <div class="d-flex justify-content-end">
          <RouterLink
            class="btn coffee-btn text-secondary"
            :to="{ path: '/KnowledgeView', query: { state: 'coffeeBrew' } }"
          >
            查看手沖咖啡
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";

// Import Swiper styles
import "swiper/swiper.scss";

import axios from "axios";
const url = process.env.VUE_APP_API; // 請加入站點
const path = process.env.VUE_APP_PATH; // 請加入個人 API path

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import CardComponent from "@/components/common/CardComponent.vue";
import titleMixin from "@/mixins/titleMixin";

export default {
  mixins: [titleMixin],
  data() {
    return {
      isLoading: false,
      title: "Coffee Roast",
      modules: [Autoplay],
      coffeeProducts: [],
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
          spaceBetween: 60,
        }, // when window width is >= 640px
        640: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    CardComponent,
    Loading,
  },
  methods: {
    async getCoffeeProducts() {
      try {
        const { data: res } = await axios.get(`${url}/api/${path}/products/all`);
        this.coffeeProducts = res.products.filter((item) => item.classification === "咖啡豆");
      } catch (error) {
        this.isLoading = false;
      }
      this.isLoading = false;
    },
  },
  mounted() {
    this.isLoading = true;
    this.getCoffeeProducts();
  },
};
</script>

<style lang="scss">
.leading-img {
  min-height: 300px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

@media screen and (max-width: 390px) {
  .leading-img {
    min-height: 100px;
  }
}

.leading-text {
  letter-spacing: 0.25rem;
  text-shadow: white 0.1em 0.1em 0.2em;
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
  min-height: 200px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.swiper-slide {
  height: auto;
}
</style>
