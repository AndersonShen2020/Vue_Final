<template>
  <router-view />
</template>

<script></script>

<style lang="scss">
@import "@/assets/all.scss";

a {
  text-decoration: none;
}

#app {
  background-size: 100% 100%;
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.9) 10%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0.9) 90%,
      rgba(255, 255, 255, 0.5) 100%
    ),
    url("https://images.unsplash.com/photo-1618105965240-9aa565e73a0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80");
}
// 切版格線,切版完後要刪除
// * {
//   outline: 1px solid #000;
// }
</style>
