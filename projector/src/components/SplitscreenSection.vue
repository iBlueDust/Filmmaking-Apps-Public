<template>
	<transition name="fade" mode="out-in">
		<section :style="{ 'background-image': `url(${urljoin(serverLocation, image)}` }" :key="image">
			<div class="overlay" v-show="show">
				<h1>{{ profile.name }}</h1>

				<h2 class="like">
					<tween-num :value="profile.likes || 0" :initial="0" easing="easeOutQuart"></tween-num>
					<img src="../assets/drawable/_ionicons_svg_md-heart.svg" />
				</h2>
				<h2 class="dislike">
					<tween-num :value="profile.dislikes || 0" :initial="0" easing="easeOutQuart"></tween-num>
					<svg
						version="1.1"
						x="0px"
						y="0px"
						viewBox="0 0 512 512"
						style="enable-background:new 0 0 512 512;"
						xml:space="preserve"
					>
						<path
							class="dislike-path"
							d="M256,448l-30.2-27.2C118.7,322.4,48,258.6,48,179.1C48,114.2,97.9,64,162.4,64c36.4,0,70.7,16.7,93.6,43.9
                    C278.9,80.7,313.2,64,349.6,64C414.1,64,464,114.2,464,179.1c0,79.5-70.7,143.3-177.8,241.7L256,448z"
						/>
						<line class="dislike-path" x1="71" y1="441" x2="485" y2="27" />
					</svg>
				</h2>
			</div>
		</section>
	</transition>
</template>

<script>
import TweenNumber from "vue-tween-number";
import { LikesTweenDuration } from "@/constants";
import serverLocation from "!raw-loader!@/assets/server-ip.txt";
import urljoin from "url-join";

export default {
	name: "SplitscreenSection",
	components: {
		"tween-num": TweenNumber
	},
	props: {
		profile: {
			type: Object,
			required: true
		},
		show: {
			type: Boolean,
			default: true
		}
	},
	data: () => ({
		tweenDuration: LikesTweenDuration,
		serverLocation
	}),
	methods: {
		urljoin
	},
	computed: {
		image() {
			return this.profile.images[this.profile.imageIndex];
		}
	}
};
</script>

<style scoped lang='scss'>
@import "@/master.scss";

section {
	width: auto;
	height: 100%;
	text-align: right;

	background: color(card);
	background-repeat: no-repeat;
	background-size: cover;

	.overlay {
		background: rgba(0, 0, 0, 0.7);
		width: 100%;
		height: 100%;
		padding: 2em;

		display: grid;
		grid-template-rows: 1fr auto auto;
		gap: 1em;
		justify-items: right;
	}

	h1 {
		color: color(text-title);
		font-size: 5em;
		margin: 32px;
	}

	svg .dislike-path {
		fill: none;
		stroke: #ffffff;
		stroke-width: 25;
		stroke-miterlimit: 10;
	}

	h2 {
		font-size: 7rem;
		margin: 0 0 16px 32px;
		text-align: right;
		align-items: center;
		display: flex;

		color: color(text-like);

		&.dislike {
			color: color(text-like);
			font-size: 5rem;
		}

		& > img,
		& > svg {
			display: inline-block;
			height: 70px;
			margin: 0 16px;
		}
	}
}
</style>