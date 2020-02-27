<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "app",
	sockets: {
		route(data) {
			console.log(data);
			if (data) this.$router.push(data);
		}
	}
};
</script>

<style lang='scss'>
@import "./assets/fonts/fonts.css";
@import "master.scss";

html,
body {
	height: 100%;
	overflow: hidden;
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

#app {
	font-family: "Open Sans", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	overflow: hidden;
	height: 100%;
	background: color(primary);
}
</style>
