<template>
  <RouterView />
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/all.scss';

#app {
  font-family: 'Noto Sans TC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.main {
  min-height: calc(100vh - (68px + 125px));
}

.text-coffee {
  padding: 10px 20px;
  line-height: 1.8;
  font-size: 18px;
  text-align: center;
  letter-spacing: 1px;
}

html {
  min-height: 100%;
  position: relative;
}

a {
  text-decoration: none;
}

.coffee-header {
  margin-top: 0.25rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  --bs-text-opacity: 1;
  --bs-bg-opacity: 1;
  color: rgba(var(--bs-secondary-rgb), var(--bs-text-opacity));
  background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity));
  font-weight: 700;
}

.coffee-btn {
  --bs-text-opacity: 1;
  --bs-bg-opacity: 1;
  color: rgba(var(--bs-primary-rgb), var(--bs-text-opacity));
  background-color: rgba(var(--bs-secondary-rgb), var(--bs-bg-opacity));
}

.coffee-btn:hover {
  --bs-text-opacity: 1;
  --bs-bg-opacity: 1;
  color: rgba(var(--bs-secondary-rgb), var(--bs-text-opacity));
  background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity));
}

#app {
  background-attachment: fixed;
  background-size: 100% 100%;
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.9) 10%,
      rgba(255, 255, 255, 1) 20%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 1) 80%,
      rgba(255, 255, 255, 0.9) 90%,
      rgba(255, 255, 255, 0.5) 100%
    ),
    url('https://images.unsplash.com/photo-1618105965240-9aa565e73a0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80');
}
// 切版格線,切版完後要刪除
// * {
//   outline: 1px solid #000;
// }
</style>
