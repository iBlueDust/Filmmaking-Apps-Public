
<template>
	<main>
		<transition name="fade" mode="in-out">
			<!-- <div class="loader" v-if="profile == null">
				<scale-loader />Loading the profile
				<br />If this is taking too long, check the id
			</div>-->
			<slideshow :profile="profile" />
		</transition>
	</main>
</template>

<script>
// import ScaleLoader from "vue-spinner/src/ScaleLoader";
import Slideshow from "@/components/Slideshow";

export default {
	name: "SingleProfile",
	components: {
		slideshow: Slideshow
		// "scale-loader": ScaleLoader,
	},
	props: {
		profileId: {
			type: String,
			required: true
		}
	},
	data: () => ({
		lastTimestamp: Number.MIN_SAFE_INTEGER,
		profile: null
	}),
	methods: {
		PingServer() {
			this.$socket.client.emit("stream ping");
		}
	},
	mounted() {
		if (this.profileId == null) this.$router.push({ name: "home" });
		else this.PingServer();
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
				this.profile =
					response.profiles.find(p => p.id === this.profileId) ||
					this.profile;
				this.mode = (response.mode || this.mode).toLowerCase();
			}
		}
		// route(data) {
		//     // Intercept requests to same profile
		//     if (data.name === this.$router.name || data.path === this.$router.path) {
		//         this.profileId =
		//     }
		// }
	}
};
</script>

<style scoped lang='scss'>
@import "@/master.scss";

main {
	width: 100%;
	height: 100%;
}

.loader {
	color: color(text-primary);
	text-align: center;

	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
}
</style>