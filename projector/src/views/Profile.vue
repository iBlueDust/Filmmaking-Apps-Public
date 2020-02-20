<template>
	<div class="main-container">
		<loader v-if="isLoading" />

		<!-- Show error message if failed to start profile stream -->
		<p v-else-if="error != null" class="stack error panel">
			An error occured
			<br />
			{{error.message}}
		</p>

		<!-- Show the main stuff -->
		<!-- FIXME: Background's backup color (i.e. white is not linked to master.scss) -->
		<main v-else class="panel stack panel-container horizontal">
			<div
				class="image-panel panel panel-container vertical"
				:style="{ backgroundImage: `url(${profile.image})` }"
			>
				<h1
					class="panel name"
					:style="profile.imageTextColor ? { 'color': profile.imageTextColor } : ''"
				>{{ profile.name }}</h1>
				<article class="panel biography" v-if="profile.biography != null && profile.biography !== ''">
					<p>{{ profile.biography }}</p>
				</article>
			</div>
			<aside class="panel">
				<charges-panel class="charges" :charges="profile.charges ||  []" />
				<stats-panel class="stats" :likes="profile.likes || 0" :dislikes="profile.dislikes || 0" />
			</aside>
		</main>
	</div>
</template>

<script>
import ChargesPanel from "@/components/ChargesPanel";
import StatsPanel from "@/components/StatsPanel";
import Loader from "@/components/Loader";

const SLIDESHOW = "slideshow";
// eslint-disable-next-line no-unused-vars
const SPLIT = "split";

export default {
	name: "Profile",
	components: {
		"charges-panel": ChargesPanel,
		"stats-panel": StatsPanel,
		loader: Loader
	},
	data: () => ({
		isLoading: true,
		error: null,
		profiles: [],
		mode: SLIDESHOW,
		currentProfile: 0,

		lastTimestamp: Number.MIN_VALUE
	}),
	computed: {
		profile() {
			return this.profiles[this.currentProfile] || {};
		}
	},
	sockets: {
		stream(response) {
			this.isLoading = false;

			if (response.error) {
				// Handle the error
				this.error = response.error;
				console.error(response.error);

				// Check if the timestamp is newer than last update
				// (Default to last value for state)
			} else if (this.lastTimestamp < response.timestamp) {
				this.mode = (response.mode || this.mode).toLowerCase();
				this.profiles = response.profiles || this.profiles;
			}
		}
	}
};
</script>

<style scoped lang='scss'>
@import "@/master.scss";

.main-container {
	width: 100%;
	height: 100%;
	display: grid;
	justify-items: center;
	align-items: center;
}

.panel-container {
	display: grid;

	&.horizontal {
		grid-template-columns: 1fr 400px;
		grid-template-rows: auto;
	}
	&.vertical {
		grid-template-columns: auto;
		grid-template-rows: auto auto;
		align-content: space-between;
	}
}

.stack-container {
	position: absolute;
	.stack {
		position: relative;
	}
}

p.error {
	width: 100%;
	height: 100%;
	padding: 5em;
	color: color(error);
	text-align: center;
	vertical-align: middle;
}

main.panel {
	width: 100%;
	height: 100%;

	div.image-panel {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	.name {
		margin: 32px;
		font-size: 5rem;
		color: color(text-title);
	}

	article.biography {
		margin: 32px auto;
		padding: 8px 16px;
		font-size: 12px;
		background: color(card);
		color: color(text-primary);
		text-align: center;
		max-width: 40vw;
	}

	aside.panel {
		height: 100%;
		display: grid;
		grid-template-rows: 1fr auto;
		flex-direction: column;

		background: color(primary);
		color: color(text-primary);
	}
}
</style>
