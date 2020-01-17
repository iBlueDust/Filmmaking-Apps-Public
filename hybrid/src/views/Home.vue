<template>
  <ion-slides class="container" pager="true" :options="slideOpts">
    <ion-slide v-for="user in users" :key="user.name">
      <UserProfile :name="user.name" :image="user.image" />
    </ion-slide>
  </ion-slides>
</template>

<script lang='ts'>
import Vue from "vue";
import UserProfile from "@/components/UserProfile.vue";

export default Vue.extend({
  name: "home",
  components: {
    UserProfile
  },
  data: () => ({
    users: [
      {
        name: "Sawyer McCann",
        image:
          "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      },
      {
        name: "Bill Walters",
        image:
          "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      }
    ],
    slideOpts: {
      initialSlide: 1,
      speed: 400
    }
  })
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
