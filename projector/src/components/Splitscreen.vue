<template>
	<main>
		<splitscreen-section v-for="profile in profiles" :key="profile.id" :profile="profile" />
	</main>
</template>

<script>
import SplitscreenSection from "@/components/SplitscreenSection";
export default {
	name: "splitscreen",
	components: {
		"splitscreen-section": SplitscreenSection
	},
	props: {
		profiles: Array
	}
};
</script>

<style scoped lang='scss'>
@import "@/master.scss";

main {
	$gap: 2em;

	width: 100%;
	height: 100%;
	padding: $gap;

	display: grid;
	grid-auto-columns: 1fr;
	grid-template-rows: 100%;
	grid-auto-flow: column;
	gap: $gap;
	justify-content: space-evenly;
	background: color(dislike);
}
</style>