<template>
	<transition name="fade" @after-leave="isTransitioning = false">
		<div class="main-container" v-if="!isTransitioning">
			<!-- Show the main stuff -->
			<!-- FIXME: Background's backup color (i.e. white is not linked to master.scss) -->
			<main class="panel stack panel-container horizontal">
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
			<disconnection-toast :value="$socket.disconnected" />
		</div>
	</transition>
</template>

<script>
import ChargesPanel from "@/components/ChargesPanel";
import StatsPanel from "@/components/StatsPanel";
import DisconnectionToast from "@/components/DisconnectionToast";

const SLIDESHOW = "slideshow";
// eslint-disable-next-line no-unused-vars
const SPLIT = "split";

export default {
	name: "Profile",
	components: {
		"charges-panel": ChargesPanel,
		"stats-panel": StatsPanel,
		"disconnection-toast": DisconnectionToast
	},
	props: {
		interval: {
			type: Number,
			default: 10000 // 10 seconds per profile + fade
		}
	},
	data: () => ({
		error: null,
		profiles: [],
		_mode: SLIDESHOW,
		currentProfile: 0,

		lastTimestamp: Number.MIN_VALUE,
		isTransitioning: false
	}),
	computed: {
		profile() {
			return this.profiles[this.currentProfile] || {};
		},
		mode: {
			get() {
				return this._mode;
			},
			set(value) {
				let prevMode = this._mode;

				this._mode = value.toLowerCase();

				if (this._mode === SLIDESHOW && prevMode !== this._mode)
					this.StartSlideshowCycle();
			}
		}
	},
	methods: {
		StartSlideshowCycle() {
			setInterval(() => {
				this.isTransitioning = true; // Start transition

				setTimeout(() => {
					// Increment the current profile index and wrap it
					if (++this.currentProfile >= this.profiles.length) {
						this.currentProfile = 0;
					}
				}, 1000); // Update UI halfway through the transition

				// this.PingServer(); // Get updated data which would hopefully come within 1 second
			}, this.interval);
		},
		PingServer() {
			this.$socket.client.emit("stream ping");
		}
	},
	mounted() {
		this.PingServer();
		if (this.mode === SLIDESHOW) this.StartSlideshowCycle();
	},
	sockets: {
		stream(response) {
			console.log("stream object");
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

.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s ease-in;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
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
		margin: 32px 32px;
		padding: 8px 16px;
		justify-self: center;
		font-size: 12px;
		background: color(card);
		color: color(text-primary);
		text-align: center;
		max-width: 500px;

		@media (min-width: 1024px) {
			margin: 32px;
			text-align: left;
			justify-self: left;
		}
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
