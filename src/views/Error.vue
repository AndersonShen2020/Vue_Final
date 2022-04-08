<template>
  <div class="container main">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <i class="bi bi-emoji-frown" style="font-size: 10rem"></i>
      <h2>404 Not Found</h2>
      <p>不好意思，這頁面不存在</p>
      <router-link to="/">
        <button type="button" class="btn coffee-btn">回首頁</button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.main {
  min-height: calc(100vh - (66px + 120px));
}
</style>
