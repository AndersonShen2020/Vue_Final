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
      title: '產品列表'
    }
  },
  methods: {
    setHeight () {
      if (screen.width <= 390) {
        const main = document.querySelector('.main')
        main.style.height = 266 + this.$refs.ProductsList.clientHeight + 'px'
      }
    }
  },
  mounted () {
    if (screen.width <= 390) {
      const main = document.querySelector('.main')
      main.style.height = 266 + 163 * 14 + 'px'
      console.log(main.style.height)
    }
  },
  updated () {
    this.setHeight()
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 390px) {
  .main {
    position: relative;
    // height: 3721px;
  }
  .products {
    .products-sidebar {
      position: absolute;
      z-index: 2;
    }
    .products-list {
      position: absolute;
      top: 272px;
      z-index: 1;
    }
  }
}
</style>
