<template>
	<div class="container">
		<div v-for="(image, index) in images" :key="index" @click="selectImage(index)">
			<img :src="image" :alt="`Image ${index}`" />

			<p>{{ image }}</p>
		</div>
	</div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class ImageSelector extends Vue {
	@Prop() private images!: string[];

	selectImage(index: number) {
		this.$parent.$emit("selected", index);
		this.$emit("close");
	}
}
</script>

<style lang='scss'>
.container {
	display: grid;
	grid-auto-rows: 100px;
	gap: 16px;

	padding: 16px;
	box-sizing: border-box;
	max-height: 80vh;
	overflow-x: auto;
	overflow-y: auto;

	& > div {
		display: flex;
		flex-flow: row nowrap;
		align-content: center;
		min-width: 300px;

		cursor: pointer;

		img {
			object-fit: cover;
			overflow: hidden;
			width: 200px;
			height: 100%;
		}

		p {
			margin: 16px 0 16px 16px;
		}
	}
}
</style>