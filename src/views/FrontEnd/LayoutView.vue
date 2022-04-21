<template>
  <Navbar />
  <RouterView />
  <FooterBar class="mt-5" />
</template>

<script>
import Navbar from '@/components/FrontEnd/Navbar.vue'
import FooterBar from '@/components/common/FooterBarComponent.vue'

export default {
  components: {
    Navbar,
    FooterBar
  }
}
</script>
