<template>
  <p :class="[decoration, weight]">Hi!</p>
</template>
<script>
export default {
  data() {
    return {
      decoration: 'underline',
      weight: 'weight',
    }
  }
}
</script>
<style>
.underline { text-decoration: underline; }
.weight { font-weight: bold; }
</style>