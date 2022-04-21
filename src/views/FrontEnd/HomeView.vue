<template>
  <Loading :active="isLoading" />
  <div
    class="leading-img d-flex justify-content-center bg-cover2 position-relative"
  >
    <div
      class="text-primary align-self-center bg-dark bg-opacity-25 p-3 leading-title leading-text"
    >
      <p class="h3">工作與咖啡有各種組合</p>
      <p class="h3 leading-text-indent">找到專屬於你的最佳搭配</p>
    </div>
    <div class="position-absolute bottom-0 start-50 translate-middle-x">
      <div class="d3 down-animation"></div>
    </div>
  </div>
  <!-- 產品 -->
  <div class="bg-light bg-opacity-50 py-5">
    <div class="container">
      <h2 class="text-center mb-5">我們的產品</h2>
      <Swiper
        :loop="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false
        }"
        :modules="modules"
        :breakpoints="breakpoints"
        :navigation="navigation"
      >
        <SwiperSlide v-for="product in coffeeProducts" :key="product.id">
          <CardComponent :item="product" />
        </SwiperSlide>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </Swiper>
    </div>
  </div>
  <!-- 知識 -->
  <div class="container my-3">
    <div class="row">
      <div class="col-md-7 d-none d-md-block">
        <div class="bg-image1"></div>
      </div>
      <div class="col-md-5 d-flex flex-column justify-content-center">
        <h3 class="coffee-header">咖啡品種</h3>
        <div class="text-start text-lg-center text-coffee">
          <p>咖啡豆的產地主要來自非洲、南美洲及亞洲地區</p>
          <p>非洲產出的咖啡豆大多帶有水果酸味及香氣</p>
          <p>南美洲整體平衡感佳，口感明亮清爽</p>
          <p>亞洲則是酸度低並帶有香料風味</p>
        </div>
        <div class="d-flex justify-content-end">
          <RouterLink class="btn coffee-btn" to="/KnowledgeView">
            查看咖啡品種
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-5 d-flex flex-column justify-content-center">
        <h3 class="coffee-header">咖啡烘焙</h3>
        <div class="text-start text-lg-center text-coffee">
          <p>烘焙咖啡使咖啡生豆通過烘炒轉變為已烘焙的咖啡製品。</p>
          <p>
            烘炒的過程使得生豆膨脹並改變其顏色、口感、氣味與密度，因而產生了咖啡的特殊風味。
          </p>
          <p>
            未烘焙的咖啡豆與已烘焙的含有相似的酸度、蛋白質與咖啡因，但缺少其美好滋味。
          </p>
          <p>
            最簡單的判斷方式是，豆子烘烤的時間越長，酸味越淡，咖啡因含量也越少。
          </p>
        </div>
        <div class="d-flex justify-content-end">
          <RouterLink
            class="btn coffee-btn"
            :to="{ path: '/KnowledgeView', query: { state: 'coffeeRoast' } }"
          >
            查看咖啡烘焙
          </RouterLink>
        </div>
      </div>
      <div class="col-md-7 d-none d-md-block">
        <div class="bg-image2"></div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-7 d-none d-md-block">
        <div class="bg-image3"></div>
      </div>
      <div class="col-md-5 d-flex flex-column justify-content-center">
        <h3 class="coffee-header">手沖咖啡</h3>
        <div class="text-start text-lg-center text-coffee">
          <p>手沖咖啡一點也不難！</p>
          <p>
            而它最有趣的地方是，即使咖啡粉是同一包，也可以因為水溫、咖啡粉的粉量、手沖的速度、沖煮的方法，而讓每一次泡的味道有所不同！
          </p>
        </div>
        <div class="d-flex justify-content-end">
          <RouterLink
            class="btn coffee-btn"
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
import { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'

import 'swiper/swiper.scss'
import 'swiper/modules/navigation/navigation.scss'

import axios from 'axios'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import CardComponent from '@/components/common/CardComponent.vue'
import titleMixin from '@/mixins/titleMixin'
const url = process.env.VUE_APP_API
const path = process.env.VUE_APP_PATH

export default {
  mixins: [titleMixin],
  data () {
    return {
      isLoading: false,
      title: 'Coffee Roast',
      modules: [Autoplay, Navigation],
      coffeeProducts: [],
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 60
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 40
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    CardComponent,
    Loading
  },
  methods: {
    async getCoffeeProducts () {
      try {
        const { data } = await axios.get(`${url}/api/${path}/products/all`)
        this.coffeeProducts = data.products.filter(
          (item) => item.classification === '咖啡豆'
        )
      } catch (err) {
        this.isLoading = false
        this.$swal({
          icon: 'error',
          text: err.response.data.message
        })
      }
      this.isLoading = false
    }
  },
  mounted () {
    this.isLoading = true
    this.getCoffeeProducts()
  }
}
</script>

<style lang="scss">
.leading-img {
  min-height: calc(100vh - 68px);
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
}

@media screen and (max-width: 390px) {
  .leading-img {
    background-position: left;
  }
}

.leading-text {
  padding: 1rem;
  letter-spacing: 0.25rem;
  text-shadow: white 0.1em 0.1em 0.2em;
  &-indent {
    text-indent: 10vmin;
  }
}

.leading-title {
  transform: translate(100%, -40%);
}

@media screen and (max-width: 575.98px) {
  .leading-img {
    background-position: left;
  }
  .leading-title {
    writing-mode: vertical-rl;
    transform: translate(-80%, -40%);
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

.bg-cover1 {
  background-image: url('~@/assets/img/cover01.jpg');
}

.bg-cover2 {
  background-image: url('~@/assets/img/cover04.jpg');
}

.bg-image1 {
  background-image: url('~@/assets/img/image01.jpg');
  height: 400px;
  background-size: cover;
  background-position: center;
}

.bg-image2 {
  background-image: url('~@/assets/img/image02.jpg');
  height: 400px;
  background-size: cover;
}

.bg-image3 {
  background-image: url('~@/assets/img/image03.jpg');
  height: 400px;
  background-size: cover;
}

.d3 {
  margin-left: 10px;
  float: left;
  width: 0;
  height: 0;
  border-width: 50px;
  border-style: solid;
  border-color: rgb(255, 255, 255) transparent transparent transparent;
}

.down-animation {
  position: relative;
  animation: down-ani 2s ease infinite;
}

@keyframes down-ani {
  25% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(0.6rem * 8) scale(0.5);
  }
}
</style>
