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
  font-size: 6px;
  margin-top: 48px;
}
</style>
