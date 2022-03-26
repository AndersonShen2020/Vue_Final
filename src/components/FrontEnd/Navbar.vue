<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-secondary bg-opacity-50">
    <div class="container">
      <a class="navbar-brand text-primary" href="#">Coffee 專賣店</a>

      <!-- cart -->
      <router-link class="nav-link ms-auto text-primary order-lg-3" to="/CheckOrder">
        <div class="position-relative">
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >{{ cartData.length }}</span
          >
          <i class="bi bi-cart"></i>
        </div>
      </router-link>
      <!-- 漢堡選單 -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- 摺疊 -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link text-primary" to="/about"> 關於本店 </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-primary" to="/KnowledgeView"> 咖啡知識 </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-primary" to="/products"> 產品列表 </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-primary" to="/Login">
              <i class="bi bi-person-circle"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from "@/api/mitt.js";

import axios from "axios";
const url = process.env.VUE_APP_API; // 請加入站點
const path = process.env.VUE_APP_PATH; // 請加入個人 API path

export default {
  data() {
    return {
      cartData: [],
    };
  },
  methods: {
    getCartNum() {
      axios.get(`${url}/api/${path}/cart`).then((res) => {
        this.cartData = res.data.data.carts;
      });
    },
  },
  mounted() {
    this.getCartNum();
    const vm = this;
    emitter.on("getCartNum", () => {
      vm.getCartNum();
    });
  },
};
</script>

<style lang="scss">
.nav-item {
  padding: 5px;
}
</style>
