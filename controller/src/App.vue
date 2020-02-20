<template>
	<main id="app">
		<header>
			<h1>Projector Controller v0.1</h1>Status:
			<strong
				id="connection-status"
				:class="{ 'online': $socket.connected }"
			>{{ $socket.connected ? 'ONLINE' : 'OFFLINE' }}</strong>
			<br />
			<br />
			<h3>Connected Projectors: {{ projectorCount }}</h3>
			<br />
			<form id="projector-mode-form">
				<strong>Projector Mode: {{ projectorMode || 'N/A' }}</strong>
				<br />
				<input
					type="button"
					v-for="mode in projectorModes"
					:key="mode"
					:name="mode"
					:value="mode"
					@click="updateProjectorMode(mode)"
				/>
			</form>
		</header>
		<ConsolePanel ref="console" id="console" :max-lines="20" :lines="[]" />
		<article id="profile-list">
			<ProfilePanel
				v-for="profile in profiles"
				:key="profile.id"
				:profile="profile"
				@console-log="consoleLog"
				@console-success="consoleSuccess"
				@console-error="consoleError"
			/>
		</article>
	</main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Socket } from "vue-socket.io-extended";

import ProfilePanel from "./components/ProfilePanel.vue";
import ConsolePanel from "./components/ConsolePanel.vue";

import Profile from "./classes/Profile";

interface StreamObject {
	data: Profile[];
	projectorMode: string;
	projectors: string[]; // <Projector ID, Profile ID>
}

@Component({
	components: {
		ProfilePanel,
		ConsolePanel
	}
})
export default class App extends Vue {
	projectorModes = ["Slideshow", "Split"];

	profiles: Profile[] = [];
	projectorCount = 0;
	projectorMode: string | undefined;

	consoleLog(message: string) {
		console.log(message);
		(this.$refs.console as ConsolePanel).log(message);
	}

	consoleSuccess(message: string) {
		console.log(message);
		(this.$refs.console as ConsolePanel).success(message);
	}

	consoleError(message: string) {
		console.log(message);
		(this.$refs.console as ConsolePanel).error(message);
	}

	updateProjectorMode(value: string) {
		value = value.toLowerCase();
		this.consoleLog(`Setting projector mode to ${value}`);

		this.$socket.client.emit("update projectormode", {
			mode: value,
			timestamp: Date.now()
		});
	}

	@Socket() // --> listens to the event by method name, e.g. `connect`
	connect() {
		this.consoleLog("Connected to server");
		this.$socket.client.emit("controller stream start");
	}

	@Socket()
	disconnect() {
		this.consoleError("Disconnected from server");
	}

	@Socket("stream")
	onStream(data: StreamObject) {
		this.profiles = data.data || [];

		// Process projector mode
		if (data.projectorMode) {
			this.projectorMode = data.projectorMode.toLowerCase();
			this.consoleSuccess(
				`Server: Projector mode was updated to ${this.projectorMode}`
			);
		}

		// Process projectors & ids list
		if (data.projectors) {
			this.projectorCount = data.projectors.length;
		}
	}
}
</script>

<style lang="scss">
* {
	box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
$console-height: 10em;

#connection-status {
	color: red;
	background: transparent;

	&.online {
		color: green;
	}
}

#app {
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-rows: minmax($console-height, auto) 1fr;
	grid-template-areas:
		"header console"
		"main main";

	header {
		grid-area: header;
		margin-left: 2em;
	}

	#projector-mode-form {
		margin: 0.5em 0;

		& > * {
			display: inline-block;
		}
	}

	#console {
		grid-area: console;
	}

	#profile-list {
		grid-area: main;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30em, 1fr));
		justify-content: center;
		gap: 1em;
		margin: 1em;
	}
}

@media screen and (max-width: 768px) {
	#app {
		grid-template-columns: auto;
		grid-template-rows: minmax($console-height, auto) auto auto;
		grid-template-areas:
			"console"
			"header"
			"main";
	}
}
</style>
