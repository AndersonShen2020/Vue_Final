<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-secondary bg-opacity-50">
    <div class="container">
      <router-link class="navbar-brand" to="/" @click="closeNavHam()">
        <span class="logo">CoffeeRoast</span>
      </router-link>

      <!-- cart -->
      <router-link
        class="nav-link ms-auto text-primary order-lg-3"
        to="/CheckOrder"
        @click="closeNavHam()"
      >
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
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- 摺疊 -->
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
        ref="collapse"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="nav-link text-primary coffee-nav-item"
              to="/about"
              @click="closeNavHam()"
            >
              關於本店
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-primary coffee-nav-item"
              to="/KnowledgeView"
              @click="closeNavHam()"
            >
              咖啡知識
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-primary coffee-nav-item"
              to="/products"
              @click="closeNavHam()"
            >
              產品列表
            </router-link>
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

import collapseMixin from "@/mixins/collapseMixin";

export default {
  mixins: [collapseMixin],
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

.logo {
  font-family: "Carter One", cursive;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  --bs-text-opacity: 1;
  color: rgba(var(--bs-primary-rgb), var(--bs-text-opacity));
  &:hover {
    font-weight: 900;
  }
}

.coffee-nav-item:hover {
  font-weight: 700;
}
</style>
