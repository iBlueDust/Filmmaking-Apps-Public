<template>
  <div id="app" class="panel-container horizontal">
    <div class="stack-container panel panel-container vertical">
      <img :src="image" class="img stack" />
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
</template>

<script lang='ts'>
import Vue from "vue";
import ChargesPanel from "./components/ChargesPanel.vue";
import StatsPanel from "./components/StatsPanel.vue";

export default Vue.extend({
  name: "app",
  components: {
    "charges-panel": ChargesPanel,
    "stats-panel": StatsPanel
  },
  data: () => ({
    name: "Lorem Ipsum",
    biography:
      "Id aliquip ut eiusmod do sit. Consequat dolor velit non pariatur consectetur et. Ut pariatur cupidatat dolor qui est nulla velit labore elit. Sunt non laboris consectetur qui amet magna laboris. Cupidatat eiusmod aliqua tempor pariatur occaecat excepteur nulla culpa dolor. Et deserunt sunt sit ex sunt aliqua commodo aute esse laboris aute. Mollit aute culpa reprehenderit cupidatat.",
    charges: ["Fraud", "Theft", "Murder", "Assault", "Manslaughter"]
  }),
  computed: {
    image() {
      return "https://images.pexels.com/photos/3552948/pexels-photo-3552948.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
    }
  }
});
</script>

<style>
@import "./assets/fonts/fonts.css";

body {
  height: 100vh;
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

<style scope>
#app {
  height: 100vh;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

.panel-container {
  display: grid;
}

.panel-container.horizontal {
  grid-template-columns: 3fr 2fr;
  grid-template-rows: auto;
}

.panel-container.vertical {
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  align-content: space-between;
}

.stack-container {
  position: relative;
}

.stack-container > .stack {
  position: absolute;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -10;
}

.name {
  margin: 32px;
  font-size: 5rem;
}

article.biography {
  margin: 64px;
  padding: 8px 16px;
  font-size: 10px;
  background: #c7d0d8be;
  text-align: center;
}

main.panel {
  display: flex;
  flex-flow: column nowrap;
}

.charges {
  flex: 4 1 auto;
}

.stats {
  flex: 1 0 auto;
}
</style>
