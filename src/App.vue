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
  // background-color: rgba(0, 0, 0, 0.1);
  // background-blend-mode: multiply;
  // background-image: url("https://images.unsplash.com/photo-1618105965240-9aa565e73a0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80");
  width: 100%;
  height: 100vh;
  // background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
  //   url("https://images.unsplash.com/photo-1618105965240-9aa565e73a0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80")
  //     no-repeat 0% 20% / cover;
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.9) 10%,
      rgba(255, 255, 255, 0.9) 20%,
      rgba(255, 255, 255, 0.9) 30%,
      rgba(255, 255, 255, 0.9) 40%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0.9) 60%,
      rgba(255, 255, 255, 0.9) 70%,
      rgba(255, 255, 255, 0.9) 80%,
      rgba(255, 255, 255, 0.9) 90%,
      rgba(255, 255, 255, 0.5) 100%
    ),
    url("https://images.unsplash.com/photo-1618105965240-9aa565e73a0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80")
      no-repeat 0% 20% / cover;
}
// 切版格線,切版完後要刪除
// * {
//   outline: 1px solid #000;
// }
</style>
