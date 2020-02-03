<template>
  <div class="container">
    <div v-if="loading" class="loader">
      <bounce-loader :loading="true"></bounce-loader>Loading...
    </div>
    <main v-else>
      <h1>Select a Profile</h1>
      <section id="profile-list" title="Profiles List">
        <a
          v-for="profile in profiles"
          :key="profile.id"
          @click="$router.push({ name: 'profile', params: { id: profile.id } })"
          :title="profile.name"
        >
          <h2>{{ profile.name }}</h2>
          <p>{{ profile.id }}</p>
          <img v-if="profile.image != null" :src="profile.image" />
        </a>
      </section>
    </main>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
// import { db } from "@/main";

import BounceLoader from "vue-spinner/src/BounceLoader";

export default Vue.extend({
  name: "Home",
  components: {
    "bounce-loader": BounceLoader
  },
  data: () => ({
    loading: false,
    profiles: [
      {
        name: "Yes",
        id: "asdfasdf",
        image:
          "data:image/jpeg;base64,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"
      },
      {
        name: "Oh yes",
        id: "xccxcxc"
      }
    ]
  }),
  mounted() {}
});
</script>

<style lang='scss' scoped>
@import "@/master.scss";

.container {
  height: 100%;
  display: grid;
  align-items: center;
  overflow-y: auto;
}

.loader {
  height: 100%;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  color: color(text-primary);
}

main {
  color: color(text-primary);
  padding: 2em;
  display: grid;
  grid-template-columns: 100%;
  justify-content: center;

  h1 {
    text-align: center;
  }
}

#profile-list {
  display: grid;
  gap: 16px;
  grid-template-columns: auto;
  justify-items: center;
  width: 100%;
  margin: 0 auto;

  a {
    $image-size: 64px;

    text-decoration: none;
    cursor: pointer;

    background: color(card);
    border-radius: 1em;
    color: inherit;
    padding: 1.5em;
    width: 100%;
    max-width: 400px;

    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto $image-size;
    grid-template-areas: "title image" "subtitle image";

    h2 {
      margin: 0 0 16px 0;
      grid-area: title;
    }

    p {
      color: #aaa;
      font-style: italic;
      margin: 0;
      grid-area: subtitle;
    }

    img {
      width: $image-size;
      height: $image-size;
      grid-area: image;
      border-radius: 100000rem;
    }
  }
}
</style>
