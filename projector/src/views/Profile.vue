<template>
  <div class="main-container">
    <loader v-if="loading" />

    <!-- Show error message if failed to start profile stream -->
    <p v-else-if="error != null" class="stack error panel">
      An error occured
      <br />
      {{error.message}}
    </p>

    <!-- Show the main stuff -->
    <!-- FIXME: Background's backup color (i.e. white is not linked to master.scss) -->
    <main v-else class="panel stack panel-container horizontal">
      <div
        class="image-panel panel panel-container vertical"
        :style="{ backgroundImage: `url(${image})` }"
      >
        <h1 class="panel name">{{ name }}</h1>
        <article class="panel biography" v-if="biography != null && biography !== ''">
          <p>{{ biography }}</p>
        </article>
      </div>
      <aside class="panel">
        <charges-panel class="charges" :charges="charges" />
        <stats-panel class="stats" :likes="likes" :dislikes="dislikes" />
      </aside>
    </main>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";

import ChargesPanel from "@/components/ChargesPanel";
import StatsPanel from "@/components/StatsPanel";
import Loader from "@/components/Loader";

export default Vue.extend({
  name: "Profile",
  components: {
    "charges-panel": ChargesPanel,
    "stats-panel": StatsPanel,
    loader: Loader
  },
  props: {
    id: String
  },
  data: () => ({
    loading: true,
    error: null,
    name: "",
    biography: "",
    charges: [],
    likes: 0,
    dislikes: 0,
    image: null, // Current image being displayed

    lastTimestamp: Number.MIN_VALUE
  }),
  created() {
    if (this.id == null) {
      this.error = { msg: "No id was specified" };
      return;
    }

    // Request for a profile stream
    this.sockets.subscribe("profile stream", response => {
      this.loading = false;

      if (response.error) {
        // Handle the error
        this.error = response.error;
        console.error(response.error);

        // Check if the timestamp is newer than last update
        // (Default to last value for state)
      } else if (this.lastTimestamp < response.timestamp) {
        this.name = response.name || this.name;
        this.biography = response.biography || this.biography;
        this.charges = response.charges || this.charges;

        this.likes = response.likes || this.likes;
        this.dislikes = response.dislikes || this.dislikes;
        this.image = response.image || this.image;
      }
    });
    this.$socket.emit("profile stream start", { profileId: this.id });

    setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.error = { message: "Timed out connecting to the server" };
      }
    }, 15000);
  },
  destroyed() {
    this.sockets.unsubscribe("profile stream");
  }
});
</script>

<style scoped lang='scss'>
@import "@/master.scss";

.main-container {
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
}

.panel-container {
  display: grid;

  &.horizontal {
    grid-template-columns: 1fr 400px;
    grid-template-rows: auto;
  }
  &.vertical {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    align-content: space-between;
  }
}

.stack-container {
  position: absolute;
  .stack {
    position: relative;
  }
}

p.error {
  width: 100%;
  height: 100%;
  padding: 5em;
  color: color(error);
  text-align: center;
  vertical-align: middle;
}

main.panel {
  width: 100%;
  height: 100%;

  div.image-panel {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .name {
    margin: 32px;
    font-size: 5rem;
    color: color(text-title);
  }

  article.biography {
    margin: 32px auto;
    padding: 8px 16px;
    font-size: 12px;
    background: color(card);
    color: color(text-primary);
    text-align: center;
    max-width: 40vw;
  }

  aside.panel {
    height: 100%;
    display: grid;
    grid-template-rows: 1fr auto;
    flex-direction: column;

    background: color(primary);
    color: color(text-primary);
  }
}
</style>
