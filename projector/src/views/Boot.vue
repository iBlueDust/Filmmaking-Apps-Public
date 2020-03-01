<template>
	<div class="main-container">
		<p v-html="content" class="console"></p>
		<p v-html="progress" class="progress"></p>
	</div>
</template>

<script>
import bootAnim from "!raw-loader!@/assets/boot-anim.txt";

export default {
	name: "Boot",
	props: {
		autoPlay: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		isConsoleShow: true,
		content: "",
		progress: ""
	}),
	methods: {
		sleep: ms => new Promise(resolve => setTimeout(resolve, ms)),
		async boot() {
			console.log("BOOT!");
			await this.parseAnim(bootAnim);
			this.content = "";
			await this.progressAnim();
			this.$router.push({ name: "blank" });
		},
		async parseAnim(animation) {
			// Keywords
			const COMMENT = "#";
			const SLEEP = "~~";
			const CLEAR = "//CLEAR//";
			const PERLINE = "!!";

			// State
			let perLineDelay = 0;

			let bootLines = animation.split("\n");

			for (let index = 0; index < bootLines.length; index++) {
				let line = bootLines[index];

				// Comment
				if (line.startsWith(COMMENT)) {
					continue;

					// Sleep Command
				} else if (line.startsWith(SLEEP)) {
					try {
						await this.sleep(
							parseFloat(
								line.substring(SLEEP.length, line.length)
							)
						);
					} catch {
						console.log(`Error parsing sleep time (:${index + 1}`);
					}

					// Per Line delay
				} else if (line.startsWith(PERLINE)) {
					try {
						perLineDelay = parseFloat(
							line.substring(PERLINE.length, line.length)
						);
					} catch {
						console.log(
							`Error parsing per line delay time (:${index + 1})`
						);
					}
					// Clear command
				} else if (line === CLEAR) {
					this.content = "";

					// Write text
				} else {
					this.content += line;
					if (perLineDelay >= 0) await this.sleep(perLineDelay);
				}
			}
		},
		async progressAnim() {
			const DELAYS = [
				100,
				200,
				500,
				50,
				250,
				100,
				1000,
				20,
				100,
				500,
				500,
				200,
				100,
				50,
				10,
				200,
				1500,
				300,
				200,
				10,
				10,
				25,
				500,
				200
			];
			const LENGTH = DELAYS.length;

			const updateProgress = progress =>
				(this.progress =
					"Booting up MS-DORKS\n" +
					`+===${"=".repeat(LENGTH)}===+\n` +
					`| +-${"-".repeat(LENGTH)}-+ |\n` +
					`| | ${"&#9608;".repeat(progress)}${" ".repeat(
						LENGTH - progress
					)} | |\n` +
					`| +-${"-".repeat(LENGTH)}-+ |\n` +
					`+===${"=".repeat(LENGTH)}===+`);

			updateProgress(0);
			for (let i = 0; i < DELAYS.length; i++) {
				await this.sleep(DELAYS[i]);
				updateProgress(i);
			}
		}
	},
	mounted() {
		if (this.autoPlay) setTimeout(this.boot, 1000);
		else {
			// Listen to an enter keypress
			window.addEventListener("keyup", event => {
				if (event.keyCode == 13)
					// If enter key is pressed
					this.boot();
			});
			alert("Press ENTER to start the booting");
		}
	}
};
</script>

<style lang='scss' scoped>
.main-container > * {
	position: absolute;
}

p {
	font-family: "Courier New", Courier, monospace;
	font-size: 1.25em;
	color: white;
	background: black;
	margin: 0;
	white-space: pre-wrap;

	&.console {
		position: absolute;
		bottom: 0;
		overflow-y: hidden;
		width: 100%;
		min-height: 100%;
	}

	&.progress {
		margin: 50vh 0 0 50vw;
		transform: translate(-50%, -50%);
	}
}
</style>