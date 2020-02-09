<template>
  <div class="loader">
    <bounce-loader :loading="true"></bounce-loader>Loading...
  </div>
</template>

<script>
import BounceLoader from "vue-spinner/src/BounceLoader";

export default {
  name: "Loader",
  components: {
    "bounce-loader": BounceLoader
  }
};
</script>

<style lang='scss' scoped>
@import "@/master.scss";

.loader {
  height: 100%;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  color: color(text-primary);
}
</style>