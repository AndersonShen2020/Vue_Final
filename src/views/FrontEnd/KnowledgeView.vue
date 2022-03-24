<template>
  <div class="container">
    <nav class="py-2 border-bottom">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item">
          <router-link to="/"> 首頁 </router-link>
        </li>
        <li class="breadcrumb-item active">咖啡知識</li>
      </ol>
    </nav>

    <div class="row mt-3">
      <div class="col-md-3">
        <div class="d-flex flex-md-column">
          <button
            class="btn"
            :class="{ 'btn-primary': state === 'coffeeKind' }"
            type="button"
            @click="(state = 'coffeeKind'), ($route.params.state = 'coffeeKind')"
          >
            咖啡品種
          </button>
          <button
            class="btn"
            :class="{ 'btn-primary': state === 'coffeeRoast' }"
            type="button"
            @click="(state = 'coffeeRoast'), ($route.params.state = 'coffeeRoast')"
          >
            咖啡豆烘焙
          </button>
          <button
            class="btn"
            :class="{ 'btn-primary': state === 'coffeeBrew' }"
            type="button"
            @click="(state = 'coffeeBrew'), ($route.params.state = 'coffeeBrew')"
          >
            手沖咖啡技巧
          </button>
        </div>
      </div>
      <div class="col-md-9">
        <CoffeeKind v-if="$route.params.state === 'coffeeKind'"></CoffeeKind>
        <CoffeeRoast v-if="$route.params.state === 'coffeeRoast'"></CoffeeRoast>
        <CoffeeBrew v-if="$route.params.state === 'coffeeBrew'"></CoffeeBrew>
      </div>
    </div>
  </div>
</template>
<script>
import CoffeeKind from "@/views/FrontEnd/Knowledge/CoffeeKind.vue";
import CoffeeRoast from "@/views/FrontEnd/Knowledge/CoffeeRoast.vue";
import CoffeeBrew from "@/views/FrontEnd/Knowledge/CoffeeBrew.vue";

export default {
  components: { CoffeeKind, CoffeeRoast, CoffeeBrew },
  data() {
    return {
      state: "coffeeKind",
    };
  },
  created() {
    this.$route.params.state = "coffeeKind";
  },
};
</script>
<style>
.coffee-header {
  margin-top: 0.25rem !important;
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
  padding-left: 0.5rem !important;
  --bs-text-opacity: 1;
  --bs-bg-opacity: 1;
  color: rgba(var(--bs-secondary-rgb), var(--bs-text-opacity)) !important;
  background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity)) !important;
  font-weight: 700 !important;
}
</style>
