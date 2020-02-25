<template>
	<div class="container">
		<h1 class="like">
			{{ likes }}
			<img src="../assets/drawable/_ionicons_svg_md-heart.svg" />
		</h1>
		<h1 class="dislike">
			{{ dislikes }}
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
		</h1>
	</div>
</template>

<script lang='ts'>
import Vue from "vue";

export default Vue.extend({
	name: "StatsPanel",
	props: {
		likes: {
			type: Number,
			default: 0
		},
		dislikes: {
			type: Number,
			default: 0
		}
	}
});
</script>

<style scoped lang='scss'>
@import "@/master.scss";

.container {
	background: url("../assets/drawable/bumpy_circle.svg");
	background-position-x: 101%;
	background-position-y: 101%;
	background-repeat: no-repeat;
	position: relative;
	min-height: 35vh;
}

svg .dislike-path {
	fill: none;
	stroke: #ffffff;
	stroke-width: 25;
	stroke-miterlimit: 10;
}

h1 {
	font-size: 7rem;
	margin: 0 0 16px 32px;
	align-items: center;
	display: flex;

	color: color(text-like);

	&.dislike {
		background: color(dislike);
		color: color(text-dislike);
		text-align: right;
		font-size: 5rem;

		border-top-left-radius: 64px;
		border-bottom-left-radius: 64px;
		padding-right: 8px;

		position: absolute;
		bottom: 0;
		right: 0;
	}

	& > img,
	& > svg {
		display: inline-block;
		height: 70px;
		margin: 0 16px;
	}
}
</style>