<template>
  <div class="container main py-3">
    <div class="row row-cols-3 row-cols-md-3 gx-5 text-center p-3">
      <div class="col">
        <div class="p-4 bg-primary text-secondary">STEP1 確認訂單</div>
      </div>
      <div class="col">
        <div class="p-4 bg-secondary text-primary">STEP2 建立訂單</div>
      </div>
      <div class="col">
        <div class="p-4 bg-secondary text-primary">STEP3 完成訂單</div>
      </div>
    </div>

    <div class="row py-3">
      <div class="col-md-8">
        <ShoppingCart></ShoppingCart>
      </div>
      <div class="col-md-4 bg-light bg-opacity-50">
        <ValidateForm class="my-3"></ValidateForm>
      </div>
    </div>
  </div>
</template>
<script>
import ValidateForm from "@/components/FrontEnd/ClientValidateForm.vue";
import ShoppingCart from "@/components/FrontEnd/ShoppingCart.vue";

export default {
  components: {
    ShoppingCart,
    ValidateForm,
  },
};
</script>
<style>
.main {
  min-height: calc(100vh - (66px + 120px));
}
</style>
