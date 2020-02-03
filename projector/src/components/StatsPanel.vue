<template>
  <div class="container">
    <h1 class="like">
      {{ likes }}
      <img src="../assets/drawable/_ionicons_svg_md-heart.svg" />
    </h1>
    <h1 class="dislike">
      <img src="../assets/drawable/_ionicons_svg_md-heart-dislike.svg" />
      {{ dislikes }}
    </h1>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";

export default Vue.extend({
  name: "StatsPanel",
  props: {
    likes: {
      type: Number,
      default: 0
    },
    dislikes: {
      type: Number,
      default: 0
    }
  }
});
</script>

<style scoped lang='scss'>
@import "@/master.scss";

.container {
  background: url("../assets/drawable/bumpy_circle.svg");
  background-position-x: 101%;
  background-position-y: 101%;
  background-repeat: no-repeat;
  position: relative;
  min-height: 35vh;
}

h1 {
  font-size: 7rem;
  margin: 0 0 16px 32px;
  align-items: center;
  display: flex;
}

h1 > img {
  display: inline-block;
  height: 70px;
  margin: 0 16px;
}

h1.dislike {
  background: color(dislike);
  color: color(text-dislike);
  text-align: right;
  position: absolute;
  border-top-left-radius: 64px;
  border-bottom-left-radius: 64px;
  padding-right: 32px;
  bottom: 0;
  right: 0;
}
</style>