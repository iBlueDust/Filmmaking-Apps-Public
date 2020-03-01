<template>
	<div class="main-container">
		<transition name="fade" mode="out-in" :duration="2000">
			<component
				class="screen"
				v-if="profile != null"
				:key="componentKey"
				:is="shownComponent"
				:profile="profile"
				:profiles="splitscreenProfiles"
			/>
		</transition>
		<disconnection-toast :value="$socket.disconnected" />
		<modals-container />
	</div>
</template>

<script>
import Slideshow from "@/components/Slideshow";
import Splitscreen from "@/components/Splitscreen";
import DisconnectionToast from "@/components/DisconnectionToast";
import NotificationDialog from "@/components/NotificationDialog";

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
		isNotificationShowing: false,
		slideshowCycle: null
	}),
	computed: {
		profile() {
			return this.enabledProfiles[this.currentProfile] || {};
		},
		mode: {
			get() {
				return this.$data._mode;
			},
			set(value) {
				this.$data._mode = value.toLowerCase();

				if (this.$data._mode === SLIDESHOW) {
					if (this.slideshowCycle == null) this.StartSlideshowCycle();
				} else this.StopSlideshowCycle();
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
		},
		enabledProfiles() {
			return this.profiles.filter(a => !a.disabled);
		}
	},
	methods: {
		StartSlideshowCycle() {
			console.log("Started slideshow cycle");

			this.slideshowCycle = setInterval(() => {
				console.log("cycle");

				// Increment the current profile index and wrap it
				this.currentProfile++;
				if (
					this.currentProfile < 0 ||
					this.currentProfile >= this.enabledProfiles.length
				) {
					this.currentProfile = 0;
				}
			}, this.interval);
		},
		StopSlideshowCycle() {
			if (this.slideshowCycle != null) {
				clearInterval(this.slideshowCycle);
				this.slideshowCycle = null;

				console.trace("Stopped slideshow cycle");
			}
		},
		PingServer() {
			this.$socket.client.emit("stream ping");
		}
	},
	mounted() {
		this.PingServer();

		// Start slideshow if in slideshow mode and slideshow isn't already running
		if (this.mode === SLIDESHOW && this.slideshowCycle == null)
			this.StartSlideshowCycle();
	},
	sockets: {
		connected() {
			this.mounted();
		},
		stream(response) {
			console.log("stream object", response);
			if (response.error) {
				// Handle the error
				this.error = response.error;
				console.error(response.error);

				// Check if the timestamp is newer than last update
				// (Default to last value for state)
			} else if (this.lastTimestamp < response.timestamp) {
				this.profiles = response.profiles || this.profiles;
				this.mode = (response.mode || this.mode).toLowerCase();
			}
		},
		"notification show"({ title, message }) {
			if (!this.isNotificationShowing) {
				this.isNotificationShowing = true;

				// this is not being defined in the function call
				const component = this;

				this.$modal.show(
					NotificationDialog,
					{
						title,
						message
					},
					{
						/* modal parameters */
						height: "auto"
					},
					{
						"before-close"() {
							component.isNotificationShowing = false;
						}
					}
				);
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

.v--modal-overlay {
	background: rgba(0, 0, 0, 0.775);
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
