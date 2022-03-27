<template>
  <div class="container main py-3">
    <div class="row row-cols-3 row-cols-md-3 gx-5 text-center p-3">
      <div class="col">
        <div class="p-4 bg-secondary text-primary">STEP1 確認訂單</div>
      </div>
      <div class="col">
        <div class="p-4 bg-primary text-secondary">STEP2 建立訂單</div>
      </div>
      <div class="col">
        <div class="p-4 bg-secondary text-primary">STEP3 完成訂單</div>
      </div>
    </div>

    <div class="row py-3 justify-content-between gx-0">
      <div class="col-md-6">
        <ul class="list-unstyled p-3">
          <p class="d-flex fs-3 fw-bold">
            訂單內容
            <span :class="{ 'text-danger': !is_paid, 'text-success': is_paid }">(未付款)</span>
          </p>
          <li class="py-3 border-bottom" v-for="product in order.products" :key="product.id">
            <div class="d-flex justify-content-between">
              <div>{{ product.product.title }}</div>
              <div>$ {{ product.final_total }} NTD</div>
            </div>
            <div>數量：{{ product.product.num }}</div>
          </li>
          <li>
            總計金額：$
            <span
              class="fs-5 fw-bold"
              :class="{ 'text-danger': !is_paid, 'text-success': is_paid }"
              >{{ order.total }}</span
            >
            NTD
          </li>
        </ul>
      </div>
      <div class="col-md-5 bg-light bg-opacity-50 p-3">
        <p class="fs-3 fw-bold">訂購資訊</p>
        <ul class="list-unstyled">
          <li class="row">
            <p class="col-4">訂單金額：</p>
            <p class="col">
              $
              <span
                class="fs-5 fw-bold"
                :class="{ 'text-danger': !is_paid, 'text-success': is_paid }"
                >{{ order.total }}</span
              >
              NTD
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
            <div class="btn coffee-btn p-4" style="letter-spacing: 2px">信用卡付款</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const url = process.env.VUE_APP_API; // 請加入站點
const path = process.env.VUE_APP_PATH; // 請加入個人 API path

export default {
  data() {
    return {
      id: this.$route.params.id,
      order: {},
      is_paid: false,
    };
  },
  methods: {
    async getOrder() {
      try {
        const { data } = await axios.get(`${url}/api/${path}/order/${this.id}`);
        this.order = data.order;
      } catch (err) {
        console.dir(err);
      }
    },
  },
  mounted() {
    this.getOrder();
  },
};
</script>
<style>
.main {
  min-height: calc(100vh - (66px + 120px));
}
</style>
