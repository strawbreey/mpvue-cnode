<template>
  <div class="loading visible fixed-top d-flex justify-content-center">
    <div class="load8 rounded-circle bg-white shadow-sm">
      <div class="loader">Loading...</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>

.load8 {
  margin-top: 48px;
  font-size: 12rpx;
}
</style>
