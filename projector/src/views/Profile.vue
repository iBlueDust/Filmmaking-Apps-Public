<template>
  <div id="app">
    <loader v-if="loading" />
    <div v-else class="panel-container horizontal">
      <div class="stack-container panel panel-container vertical">
        <img :src="image" class="main-img stack" />
        <h1 class="panel name">{{ name }}</h1>
        <article class="panel biography">
          <p>{{ biography }}</p>
        </article>
      </div>
      <main class="panel">
        <charges-panel class="charges" :charges="charges" />
        <stats-panel class="stats" :likes="88" :dislikes="88" />
      </main>
    </div>
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
    name: "",
    biography:
      "Id aliquip ut eiusmod do sit. Consequat dolor velit non pariatur consectetur et. Ut pariatur cupidatat dolor qui est nulla velit labore elit. Sunt non laboris consectetur qui amet magna laboris. Cupidatat eiusmod aliqua tempor pariatur occaecat excepteur nulla culpa dolor. Et deserunt sunt sit ex sunt aliqua commodo aute esse laboris aute. Mollit aute culpa reprehenderit cupidatat.",
    charges: ["Fraud", "Theft", "Murder", "Assault", "Manslaughter"]
  }),
  computed: {
    image() {
      return "https://images.pexels.com/photos/3380967/pexels-photo-3380967.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
    }
  },
  mounted() {}
});
</script>

<style lang='scss'>
html,
body {
  height: 100%;
  overflow: none;
  margin: 0;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: "Bebas Neue", Helvetica, Arial, sans-serif;
  font-weight: 200;
  text-transform: uppercase;
}
</style>

<style lang='scss' scoped>
@import "@/master.scss";

#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  height: 100%;
  background: color(primary);
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
  position: relative;
  .stack {
    position: absolute;
  }
}

.main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -10;
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

main.panel {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  flex-direction: column;

  background: color(primary);
  color: color(text-primary);
}
</style>
