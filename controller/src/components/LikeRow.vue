<template>
	<div class="row">
		<strong class="label">{{ label }}</strong>
		<input
			type="number"
			min="0"
			ref="input"
			v-bind:title="inputTitle"
			:value="value"
			@focus="$event.target.select()"
			@input="updateInput"
			@keyup.enter="$emit('set-click')"
		/>
		<button class="set" @click="$emit('set-click')">Set</button>

		<button class="add" @click="$emit('add-click')">+1</button>
		<button class="subtract" @click="$emit('subtract-click')">-1</button>
	</div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

interface Input {
	value: number;
}

@Component({
	name: "LikeRow"
})
export default class LikeRow extends Vue {
	$refs!: {
		input: HTMLInputElement;
	};

	@Prop() private label: string | undefined;
	@Prop() private inputTitle: string | undefined;
	@Prop() private value: number | undefined;

	updateInput() {
		console.log(JSON.stringify(this.$refs.input.value));
		this.$emit("input", this.$refs.input.value);
	}
}
</script>

<style lang='scss' scoped>
</style>