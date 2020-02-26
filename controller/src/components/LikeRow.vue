<template>
	<div class="row">
		<strong class="label">{{ label }}</strong>
		<input
			type="number"
			min="0"
			v-bind:title="inputTitle"
			v-model.number="$data._value"
			@focus="$event.target.select()"
			@input="updateInput"
		/>
		<button class="set" @click="$emit('set-click')">Set</button>
		<button class="animate" @click="$emit('animate-click')">Animate</button>

		<button class="add" @click="$emit('add-click')">+1</button>
		<button class="subtract" @click="$emit('subtract-click')">-1</button>
	</div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
	name: "LikeRow"
})
export default class LikeRow extends Vue {
	@Prop() private label: string | undefined;
	@Prop() private inputTitle: string | undefined;
	@Prop() private value: number | undefined;

	private _value = this.value;

	updateInput() {
		this.$emit("input", this.$data._value);
	}
}
</script>

<style lang='scss' scoped>
</style>