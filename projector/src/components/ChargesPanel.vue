<template>
  <div class="container">
    <h3>Charges - {{ charges.length }}</h3>
    <Hooper
      class="panel"
      :vertical="true"
      :autoPlay="true"
      :playSpeed="2000"
      :itemsToShow="5"
      :centerMode="true"
      :infiniteScroll="true"
    >
      <Slide class="panel-item" v-for="charge in charges" :key="charge">{{ charge }}</Slide>
    </Hooper>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";

export default Vue.extend({
  name: "ChargesPanel",
  components: {
    Hooper,
    Slide
  },
  props: {
    charges: Array
  }
});
</script>

<style>
.hooper.panel .panel-item {
  text-align: center;
  font-size: 1.75rem;
  padding: 8px 64px 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style scoped>
.container {
  display: grid;
  grid-template-rows: auto 1fr;
}

h3 {
  font-size: 2.5rem;
  margin: 64px 32px 8px;
}

.panel {
  list-style-type: none;
  margin: 16px 0 16px 32px;
  background: #c7d0d8be;
  height: auto;
}
</style>
