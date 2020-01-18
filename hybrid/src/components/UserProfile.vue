<template>
  <div class="container">
    <ion-thumbnail :class="{ 'img': true, 'opaque': imgLoaded }">
      <ion-img :src="image" @ionImageLoaded="ionImgDidLoad = true" />
    </ion-thumbnail>
    <ion-text>
      <h1 class="name">{{ name }}</h1>
    </ion-text>
    <ion-row class="buttons">
      <ion-button
        shape="round"
        class="button"
        expand="block"
        :color="state == true ? 'success' : 'medium'"
        fill="clear"
        size="large"
        @click="state = true"
      >
        <ion-ripple-effect></ion-ripple-effect>
        <ion-icon slot="icon-only" class="icon" name="heart"></ion-icon>
      </ion-button>
      <ion-button
        shape="round"
        class="button"
        expand="block"
        :color="state == false ? 'danger' : 'medium'"
        fill="clear"
        size="large"
        @click="state = false"
      >
        <ion-ripple-effect></ion-ripple-effect>
        <ion-icon slot="icon-only" class="icon" name="heart-dislike"></ion-icon>
      </ion-button>
    </ion-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "UserProfile",
  props: {
    name: String,
    image: String
  },
  data: () => ({
    state: null,
    imgLoaded: false
  })
});
</script>

<style scoped>
.container {
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 3.5rem;
  margin: 32px 32px 0 32px;
  animation: slidein 1.5s;
}

.buttons {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 64px;
  animation: slidein 1.5s;
}

.button {
  width: 128px;
  height: 128px;
}

.icon {
  width: 75px;
  height: 75px;
}

.img {
  width: 100%;
  object-fit: cover;
  flex: 1;
  animation: fadein 2s;
}

.img.opaque {
  opacity: 1;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slidein {
  0% {
    opacity: 0;
    transform: translateY(64px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
