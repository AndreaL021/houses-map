<template>
  <div class="row" :style="{
    display: 'flex',
    justifyContent :justify
  }">
    <slot />
  </div>
</template>
<script>
export default {
  props:{
    justify:{
      type:String,
      default: 'flex-start'
    }
  }
}
</script>
<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}
</style>
