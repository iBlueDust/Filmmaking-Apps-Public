<template>
  <div class="container">
    <loader v-if="isLoading" />
    <div v-else-if="profiles.length <= 0" class="empty">
      <h1>Uh oh!</h1>
      <h3>No profiles are available</h3>
    </div>
    <main v-else>
      <div class="header">
        <h1>Select a Profile</h1>
        <div id="boot-up">
          Show Boot Up
          <input
            type="checkbox"
            name="Show Boot Up"
            ref="boot-up-checkbox"
            v-model="isBootUpEnabled"
          />
        </div>
      </div>
      <section id="profile-list" title="Profiles List">
        <a
          v-for="profile in profiles"
          :key="profile.id"
          @click="onProfileSelect(profile)"
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

<script>
import Loader from "@/components/Loader";

export default {
  name: "Home",
  components: {
    loader: Loader
  },
  data: () => ({
    socket: {},
    isLoading: true,
    isBootUpEnabled: true,
    profiles: []
  }),
  methods: {
    onProfileSelect(profile) {
      this.$router.push({
        name: this.isBootUpEnabled ? "boot" : "profile",
        params: { id: profile.id }
      });
    }
  },
  mounted() {
    this.sockets.subscribe("profile list", data => {
      this.isLoading = false;
      this.profiles = data;
    });

    // Set a timeout for profile listing
    setTimeout(() => {
      this.isLoading = false;
    }, 15000);
  },
  destroyed() {
    // Prevent memory leaks and calls after lifecycle
    this.sockets.unsubscribe("profile list");
  }
};
</script>

<style lang='scss' scoped>
@import "@/master.scss";

$card-width: 400px;

.container {
  height: 100%;
  display: grid;
  align-items: center;
  overflow-y: auto;
  color: color(text-primary);
}

.header {
  display: grid;
  grid-template-columns: ($card-width - 100px) auto;
  justify-content: space-between;
  align-items: center;
}

.empty {
  font-size: 3em;
  text-align: left;
  padding: 10vh 10vw;

  h1 {
    color: color(primary-dark);
    font-size: 4em;
    margin: 0;
  }
}

main {
  color: color(text-primary);
  padding: 2em;
  display: grid;
  grid-template-columns: 100%;
  justify-items: center;
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
    max-width: $card-width;

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
