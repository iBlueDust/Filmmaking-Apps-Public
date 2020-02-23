<template>
	<section>
		<div>
			<p
				v-for="(line, index) in $data._lines"
				:key="index"
				:class="{'error': line.type == ERROR, 'success': line.type == SUCCESS}"
			>{{ line.message }}</p>
		</div>
	</section>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

class Line {
	message: string;
	type: number;

	constructor(message: string, type = 0) {
		this.message = message;
		this.type = type;
	}
}

@Component({})
export default class ConsolePanel extends Vue {
	@Prop() private lines: Line[] = [];
	@Prop() private maxLines = 20;

	private LOG = 0x0;
	private ERROR = 0x10;
	private SUCCESS = 0x100;

	_lines = this.lines;

	private _log(line: string, type: number) {
		const lines = this.$data._lines;

		lines.push(new Line(line, type));
		if (lines.length > this.maxLines)
			this.$data._lines = lines.slice(
				lines.length - this.maxLines,
				lines.length
			);
	}

	public log(line: string) {
		this._log(line, this.LOG);
	}

	public error(line: string) {
		this._log(line, this.ERROR);
	}

	public success(line: string) {
		this._log(line, this.SUCCESS);
	}
}
</script>

<style lang='scss' scoped>
section {
	background: black;
	position: relative;
	width: 100%;
	height: auto;
	overflow: hidden;

	$padding: 0.5em;

	& > div {
		position: absolute;
		bottom: $padding;
		left: $padding * 2;
		right: $padding * 2;
	}

	p {
		font-family: "Courier New", Courier, monospace;
		color: white;
		margin: 0.1em 0;

		&.error {
			background: darkred;
		}

		&.success {
			color: green;
		}
	}
}
</style>