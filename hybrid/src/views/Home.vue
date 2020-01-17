<template>
  <ion-slides class='container' pager="true" :options="slideOpts">
    <ion-slide>
      <h1>Slide 1</h1>
    </ion-slide>
    <ion-slide>
      <h1>Slide 2</h1>
    </ion-slide>
  </ion-slides>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'home',
  data: () => ({
    slideOpts: {
      initialSlide: 1,
      speed: 400
    },
  }),
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
