<template>
	<main ref="splitscreen">
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
	},
	data: () => ({
		isAnimating: false
	})
	// methods: {
	// 	async animateList() {
	// 		this.isAnimating = true;
	// 		await this.sleep(2000);
	// 		this.isAnimating = false;
	// 	},
	// 	sleep(delay) {
	// 		return new Promise(resolve => setTimeout(resolve, delay));
	// 	}
	// },
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

	transition: all 2s ease-in-out;
}
</style>