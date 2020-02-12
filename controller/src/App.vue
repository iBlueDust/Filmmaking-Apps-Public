<template>
	<main id="app">
		<header>
			<h1>Projector Controller v0.1</h1>Status:
			<strong
				id="connection-status"
				:class="{ 'online': $socket.connected }"
			>{{ $socket.connected ? 'ONLINE' : 'OFFLINE' }}</strong>
		</header>
		<ConsolePanel ref="console" id="console" :max-lines="20" :lines="[]" />
		<article id="profile-list">
			<ProfilePanel
				v-for="profile in profiles"
				:key="profile.id"
				:profile="profile"
				:projectorCount="projectorCounts[profile.id]"
				@console-log="consoleLog"
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
	projectors: Map<string, string>;
}

@Component({
	components: {
		ProfilePanel,
		ConsolePanel
	}
})
export default class App extends Vue {
	profiles: Profile[] = [];
	projectorCounts = new Map<string, number>();

	consoleLog(message: string) {
		console.log(message);
		(this.$refs.console as ConsolePanel).log(message);
	}

	consoleError(message: string) {
		console.log(message);
		(this.$refs.console as ConsolePanel).error(message);
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

		if (data.projectors) {
			this.projectorCounts.clear();

			// Iterate over each element and add it to the Map
			for (const prop in data.projectors) {
				const profileId = data.projectors[prop];
				if (this.projectorCounts[profileId])
					this.projectorCounts[profileId]++;
				else this.projectorCounts[profileId] = 1;
			}
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

strong {
	color: red;
	background: transparent;

	&.online {
		color: green;
	}
}

#app {
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-rows: $console-height 1fr;
	grid-template-areas:
		"header console"
		"main main";

	header {
		grid-area: header;
		margin-left: 2em;
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
		grid-template-rows: $console-height auto auto;
		grid-template-areas:
			"console"
			"header"
			"main";
	}
}
</style>
