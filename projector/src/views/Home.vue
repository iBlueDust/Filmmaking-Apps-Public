<template>
	<div class="main-container">
		<main>
			<a @click="$router.push({ name: 'boot' })">
				<h2>Boot</h2>
				<p>Display the Boot sequence</p>
			</a>

			<a @click="$router.push({ name: 'profile' })">
				<h2>Profile</h2>
				<p>Jump to the profiles page</p>
			</a>

			<a @click="$router.push({ name: 'medical' })">
				<h2>Medical</h2>
				<p>The medical records of Bill and the Father</p>
			</a>
		</main>
		<disconnection-toast :value="$socket.disconnected" />
	</div>
</template>

<script>
import DisconnectionToast from "@/components/DisconnectionToast";

export default {
	name: "Home",
	components: {
		"disconnection-toast": DisconnectionToast
	}
};
</script>

<style lang='scss' scoped>
@import "@/master.scss";

$card-width: 400px;

main {
	color: color(text-primary);
	padding: 2em;
	margin: 0 auto;
	width: 100%;
	height: 100vh;
	position: relative;
	overflow: hidden;

	display: grid;
	gap: 16px;
	align-content: center;
	grid-template-columns: auto;
	justify-items: center;

	a {
		text-decoration: none;
		cursor: pointer;

		background: color(card);
		border-radius: 1em;
		color: inherit;
		padding: 1.5em;
		width: 100%;
		max-width: $card-width;

		display: grid;
		grid-template-rows: auto auto;
		grid-template-columns: auto;
		grid-template-areas: "title" "subtitle";

		h2 {
			margin: 0 0 16px 0;
			grid-area: title;
		}

		p {
			color: #aaa;
			font-style: italic;
			margin: 0;
			grid-area: subtitle;
		}
	}
}
</style>
