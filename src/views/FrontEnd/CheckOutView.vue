<template>
  <Loading :active="isLoading"></Loading>
  <div class="container main py-3">
    <div class="row text-center px-3">
      <div class="col-4 d-flex flex-column bg-secondary text-primary p-3">
        <span>STEP1</span>
        <span>確認訂單</span>
      </div>
      <div
        class="col-4 d-flex flex-column p-3"
        :class="!isPaid ? 'bg-primary text-secondary' : 'bg-secondary text-primary'"
      >
        <span>STEP2</span>
        <span>建立訂單</span>
      </div>
      <div
        class="col-4 d-flex flex-column p-3"
        :class="isPaid ? 'bg-primary text-secondary' : 'bg-secondary text-primary'"
      >
        <span>STEP3</span>
        <span>完成訂單</span>
      </div>
    </div>

    <div class="row py-3 justify-content-between gx-0">
      <div class="col-md-6">
        <ul class="list-unstyled p-3">
          <p class="d-flex fs-3 fw-bold">
            訂單內容
            <span :class="{ 'text-danger': !isPaid, 'text-success': isPaid }"
              >({{ isPaid ? "付款成功" : "未付款" }})</span
            >
          </p>
          <li class="py-3 border-bottom" v-for="product in order.products" :key="product.id">
            <div class="d-flex justify-content-between">
              <div>{{ product.product.title }}</div>
              <div>NT$ {{ product.final_total }}</div>
            </div>
            <div>數量：{{ product.product.num }}</div>
          </li>
          <li>
            總計金額：NT$
            <span class="fs-5 fw-bold" :class="{ 'text-danger': !isPaid, 'text-success': isPaid }">
              {{ order.total }}</span
            >
          </li>
        </ul>
      </div>
      <div class="col-md-5 bg-light bg-opacity-50 p-3">
        <p class="fs-3 fw-bold">訂購資訊</p>
        <ul class="list-unstyled">
          <li class="row">
            <p class="col-4">訂單金額：</p>
            <p class="col">
              NT$
              <span
                class="fs-5 fw-bold"
                :class="{ 'text-danger': !isPaid, 'text-success': isPaid }"
              >
                {{ order.total }}</span
              >
            </p>
          </li>
          <li class="row">
            <p class="col-4">訂單編號：</p>
            <p class="col">{{ order.id }}</p>
          </li>
          <li class="row">
            <p class="col-4">訂購時間：</p>
            <p class="col">
              {{ new Date(order.create_at * 1000).toLocaleString() }}
            </p>
          </li>
          <li class="row">
            <p class="col-4">Email：</p>
            <p class="col">{{ order?.user?.email }}</p>
          </li>
          <li class="row">
            <p class="col-4">收件人姓名：</p>
            <p class="col">{{ order?.user?.name }}</p>
          </li>
          <li class="row">
            <p class="col-4">聯絡電話</p>
            <p class="col">{{ order?.user?.tel }}</p>
          </li>
          <li class="row">
            <p class="col-4">收件地址：</p>
            <p class="col">{{ order?.user?.address }}</p>
          </li>
          <li class="row">
            <p class="col-4">備註：</p>
            <p class="col">{{ order.message }}</p>
          </li>
          <li class="row mt-3 px-3">
            <div
              class="btn coffee-btn p-4"
              style="letter-spacing: 2px"
              @click="payBill"
              v-if="!isPaid"
            >
              信用卡付款
            </div>
            <RouterLink class="btn coffee-btn p-4" style="letter-spacing: 2px" to="/Products" v-else
              >繼續購物 ！</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from "@/api/mitt.js";

import axios from "axios";
const url = process.env.VUE_APP_API; // 請加入站點
const path = process.env.VUE_APP_PATH; // 請加入個人 API path

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import titleMixin from "@/mixins/titleMixin";

export default {
  mixins: [titleMixin],
  components: {
    Loading,
  },
  data() {
    return {
      title: "建立訂單",
      id: this.$route.params.id,
      order: {},
      isPaid: false,
      isLoading: false,
    };
  },
  methods: {
    async getOrder() {
      try {
        const { data } = await axios.get(`${url}/api/${path}/order/${this.id}`);
        this.order = data.order;
      } catch (err) {
        this.isLoading = false;
      }
      this.isLoading = false;
    },
    async payBill() {
      this.isLoading = true;
      try {
        await axios.post(`${url}/api/${path}/pay/${this.id}`);
      } catch (err) {
        this.isLoading = false;
      }
      document.title = "完成訂單";
      this.isPaid = true;
      this.isLoading = false;
      emitter.emit("getCartNum");
    },
  },
  mounted() {
    this.isLoading = true;
    this.getOrder();
  },
};
</script>

<style>
.main {
  min-height: calc(100vh - (66px + 120px));
}
</style>
