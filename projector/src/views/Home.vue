<template>
	<div class="main-container">
		<main>
			<router-link :to="{ name: 'boot' }">
				<h2>Boot</h2>
				<p>Display the Boot sequence</p>
			</router-link>

			<router-link :to="{ name: 'profile' }">
				<h2>Profile</h2>
				<p>Jump to the profiles page</p>
			</router-link>

			<router-link :to="{ name: 'profile.single', query: { id: singleProfileId }}">
				<h2>Single Profile</h2>
				<p>Go to a page:</p>
				<select name="single-profile" v-model="singleProfileId" @click="$event.preventDefault()">
					<option v-for="profile in profiles" :key="profile.id" :value="profile.id">{{ profile.name }}</option>
				</select>
			</router-link>

			<router-link :to="{ name: 'medical' }">
				<h2>Medical</h2>
				<p>The medical records of Bill and the Father</p>
			</router-link>
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
	},
	data: () => ({
		profiles: [],
		singleProfileId: null
	}),
	sockets: {
		connected() {
			this.mounted();
		},
		"response list"(data) {
			this.profiles = data;
		}
	},
	mounted() {
		this.$socket.client.emit("list");
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

		h2 {
			margin: 0 0 16px 0;
		}

		p {
			color: #aaa;
			font-style: italic;
			margin: 0 16px 0 0;
			display: inline-block;
		}

		select {
			display: inline-block;
			width: auto;
		}
	}
}
</style>
