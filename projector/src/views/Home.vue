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
		</main>
		<section id="toast" :class="{ 'visible': !isConnected }">The server is disconnected</section>
	</div>
</template>

<script>
export default {
	name: "Home",
	data: () => ({
		socket: {},
		isConnected: false,
		profiles: []
	}),
	sockets: {
		connect: function() {
			console.log("socket connected");
			this.isConnected = true;
		},
		disconnect() {
			console.warn("socket disconnected");
			this.isConnected = false;
		}
	},
	mounted() {
		this.sockets.subscribe("response profile list", data => {
			this.isLoading = false;
			this.profiles = data;

			this.sockets.unsubscribe("profile list");
		});
		this.$socket.emit("profile list");

		// Set a timeout for profile listing
		setTimeout(() => {
			this.isLoading = false;

			this.sockets.unsubscribe("profile list");
		}, 15000);
	},
	destroyed() {
		// Prevent memory leaks and calls after lifecycle
		this.sockets.unsubscribe("profile list");
	}
};
</script>

<style lang='scss' scoped>
@import "@/master.scss";

$card-width: 400px;

#toast {
	position: absolute;
	bottom: -5em;
	right: 1em;
	background: color(error);
	border-radius: 4px;
	color: white;
	padding: 0.5em 0.75em;

	transition: bottom 0.5s;

	&.visible {
		bottom: 1em;
	}
}

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
