<template>
  <router-link :to="`/product/${product.id}`">
    <div class="card h-100">
      <img :src="product.imageUrl" class="card-img-top card-img" />
      <div class="card-body">
        <h5 class="card-title fw-bold">{{ product.title }}</h5>
      </div>
      <div class="modal-footer border-top-0">
        <button
          type="button"
          class="btn btn-danger align-self-center"
          @click.prevent="addToCart(product.id)"
        >
          <i class="bi bi-cart"></i>
        </button>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      product: {},
    };
  },
  mounted() {
    this.product = this.item;
  },
};
</script>
<style lang="scss">
.card {
  height: 250px;
  .card-img {
    height: 100px;
  }
}
</style>
