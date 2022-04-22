<template>
  <div class="container main">
    <nav class="py-2 border-bottom">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item">
          <RouterLink to="/"> 首頁 </RouterLink>
        </li>
        <li class="breadcrumb-item">產品列表</li>
      </ol>
    </nav>

    <div class="row mt-3 products">
      <div class="col-md-3 products-sidebar">
        <ProductsSidebar />
      </div>
      <div class="col-md-9 products-list" ref="ProductsList">
        <ProductsList />
      </div>
    </div>
  </div>
</template>

<script>
import ProductsList from '@/components/FrontEnd/ProductsList.vue'
import ProductsSidebar from '@/components/FrontEnd/ProductsSidebar.vue'
import titleMixin from '@/mixins/titleMixin'

export default {
  components: {
    ProductsSidebar,
    ProductsList
  },
  mixins: [titleMixin],
  data () {
    return {
      title: '產品列表',
      interval: null
    }
  },
  methods: {
    adjustLayout () {
      let height = 20
      const main = document.querySelector('.main')
      const productsList = document.querySelector('.products-list')

      if (screen.width <= 390) {
        height = 240
        main.style.height = productsList.clientHeight + height + 'px'
      } else {
        main.style.height = productsList.clientHeight + height + 'px'
      }
    }
  },
  mounted () {
    this.interval = setInterval(this.adjustLayout, 1000)
  },
  unmounted () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss">
@media screen and (max-width: 390px) {
  .products {
    position: relative;
    .products-sidebar {
      position: absolute;
      z-index: 2;
    }
    .products-list {
      position: relative;
      top: 222px;
      z-index: 1;
    }
  }
}
</style>
