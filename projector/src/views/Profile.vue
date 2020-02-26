<template>
	<div class="main-container">
		<transition name="fade" mode="out-in" :duration="2000">
			<component
				class="screen"
				v-if="!isTransitioning"
				:key="componentKey"
				:is="shownComponent"
				:profile="profile"
				:profiles="splitscreenProfiles"
			/>
		</transition>
		<disconnection-toast :value="$socket.disconnected" />
	</div>
</template>

<script>
import Slideshow from "@/components/Slideshow";
import Splitscreen from "@/components/Splitscreen";
import DisconnectionToast from "@/components/DisconnectionToast";

const SLIDESHOW = "slideshow";
// eslint-disable-next-line no-unused-vars
const SPLIT = "split";

export default {
	name: "Profile",
	components: {
		"disconnection-toast": DisconnectionToast,
		slideshow: Slideshow,
		splitscreen: Splitscreen
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

		SLIDESHOW: SLIDESHOW,
		SPLIT: SPLIT,
		MAX_SPLIT: 3,

		lastTimestamp: Number.MIN_VALUE,
		isTransitioning: false
	}),
	computed: {
		profile() {
			return this.profiles[this.currentProfile] || {};
		},
		mode: {
			get() {
				return this.$data._mode;
			},
			set(value) {
				let prevMode = this.$data._mode;

				this.$data._mode = value.toLowerCase();

				if (
					this.$data._mode === SLIDESHOW &&
					prevMode !== this.$data._mode
				)
					this.StartSlideshowCycle();
				else this.StopSlideshowCycle();
			}
		},
		shownComponent() {
			// if (this.isTransitioning) return null;
			// else {
			switch (this.mode) {
				case SLIDESHOW:
					return "slideshow";
				case SPLIT:
					return "splitscreen";
				default:
					return null;
			}
			// }
		},
		componentKey() {
			if (this.mode === SLIDESHOW) return this.profile.id;
			else {
				return this.splitscreenProfiles.reduce(
					(acc, val) => acc + val.id,
					""
				);
			}
		},
		splitscreenProfiles() {
			return this.profiles
				.filter(a => !a.disabled)
				.splice(0, this.MAX_SPLIT);
		}
	},
	methods: {
		StartSlideshowCycle() {
			console.log("Started slideshow cycle");

			this.slideshowCycle = setInterval(async () => {
				// Increment the current profile index and wrap it
				if (++this.currentProfile >= this.profiles.length) {
					this.currentProfile = 0;
				}

				// 	// Abort if not in slideshow mode
				// 	if (this.mode !== SLIDESHOW) return;

				// 	await this.Animate();

				// 	// Increment the current profile index and wrap it
				// 	if (++this.currentProfile >= this.profiles.length) {
				// 		this.currentProfile = 0;
				// 	}

				// 	// this.PingServer(); // Get updated data which would hopefully come within 1 second
			}, this.interval);
		},
		StopSlideshowCycle() {
			if (this.slideshowCycle != null) {
				clearInterval(this.slideshowCycle);
				this.slideshowCycle = null;

				console.log("Stopped slideshow cycle");
			}
		},
		onAddDeleteProfile() {
			// if (this.mode === SPLIT) {
			//     console.log('Animating splitscreen');
			//     await this.Animate();
			// }
			// this.Animate();
		},
		// Animate() {
		// 	return new Promise(resolve => {
		// 		this.isTransitioning = true;

		// 		// const animate = () => {
		// 		// 	this.isTransitioning = false;
		// 		// 	cancelAnimationFrame(animate);
		// 		// };
		// 		// requestAnimationFrame(animate);

		// 		// resolve();

		// 		setTimeout(() => {
		// 			this.isTransitioning = false;

		// 			resolve();
		// 		}, 1000); // Update UI halfway through the transition i.e. 1s
		// 	});
		// },
		PingServer() {
			this.$socket.client.emit("stream ping");
		}
	},
	mounted() {
		this.PingServer();
		// if (this.mode === SLIDESHOW && this.slideshowCycle == null)
		// 	this.StartSlideshowCycle();
	},
	sockets: {
		stream(response) {
			console.log("stream object", response);
			if (response.error) {
				// Handle the error
				this.error = response.error;
				console.error(response.error);

				// Check if the timestamp is newer than last update
				// (Default to last value for state)
			} else if (this.lastTimestamp < response.timestamp) {
				// Detect if a profile as enabled/disabled
				// const enabledProfiles = response.profiles.filter(
				// 	a => !a.disabled
				// );

				// if (
				// 	this.profiles.filter(a => !a.disabled).length !=
				// 	enabledProfiles.filter(a => !a.disabled).length
				// )
				// 	this.onAddDeleteProfile();

				this.profiles = response.profiles || this.profiles;
				this.mode = (response.mode || this.mode).toLowerCase();
			}
		}
	}
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s ease-in;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>

<style scoped lang='scss'>
@import "@/master.scss";

.main-container {
	width: 100%;
	height: 100%;
	display: grid;
	justify-items: center;
	align-items: center;
}

p.error {
	width: 100%;
	height: 100%;
	padding: 5em;
	color: color(error);
	text-align: center;
	vertical-align: middle;
}

.screen {
	position: absolute;
	width: 100%;
	height: 100%;
}
</style>
