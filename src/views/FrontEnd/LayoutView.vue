<template>
  <Navbar></Navbar>
  <router-view />
  <FooterBar></FooterBar>
</template>

<script>
import Navbar from "@/components/FrontEnd/Navbar.vue";
import FooterBar from "@/components/common/FooterBarComponent.vue";

export default {
  components: {
    Navbar,
    FooterBar,
  },
};
</script>
