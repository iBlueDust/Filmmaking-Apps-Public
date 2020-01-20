<template>
  <div class="container">
    <h3>Charges - {{ charges.length }}</h3>
    <Hooper
      class="panel"
      :vertical="true"
      :autoPlay="true"
      :playSpeed="2000"
      :itemsToShow="4"
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
  font-size: 1.5rem;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 32px;
}

h3 {
  font-size: 2.75rem;
  margin: 0 32px 0 0;
  flex: 0 0 auto;
}

.panel {
  list-style-type: none;
  background: #c7d0d8be;
  flex: 1 0 auto;
}
</style>
