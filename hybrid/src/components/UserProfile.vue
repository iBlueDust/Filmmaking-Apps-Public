<template>
  <div class="container">
    <ion-thumbnail class="img">
      <ion-img :src="image"></ion-img>
    </ion-thumbnail>
    <ion-text>
      <h1 class="name">{{ name }}</h1>
    </ion-text>
    <ion-row class="buttons">
      <ion-button
        class="button"
        expand="block"
        :color="state == true ? 'success' : 'medium'"
        fill="clear"
        size="large"
        @click="state = true"
      >
        <ion-icon slot="icon-only" class="icon" name="heart"></ion-icon>
      </ion-button>
      <ion-button
        class="button"
        expand="block"
        :color="state == false ? 'danger' : 'medium'"
        fill="clear"
        size="large"
        @click="state = false"
      >
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
    state: null
  })
});
</script>

<style scoped>
.container {
  width: 100%;
  background: black;
  color: white;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 3.5rem;
  margin: 32px 32px 0 32px;
}

.buttons {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 64px;
}

.button {
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
}
</style>
