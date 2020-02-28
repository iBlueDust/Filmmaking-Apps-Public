<template>
	<main id="app" :style="$socket.connected ? '' : 'background-color: #FDD'">
		<header>
			<h1>Projector Controller v0.1</h1>Status:
			<strong
				id="connection-status"
				:class="{ 'online': $socket.connected }"
			>{{ $socket.connected ? 'ONLINE' : 'OFFLINE' }}</strong>
			<br />
			<strong>Connected Projectors: {{ projectorCount }}</strong>
			<br />
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
			<br />
			<br />
			<form id="notification-form" @submit.prevent="sendNotification">
				Notification Templates:
				<select
					id="notification-template"
					v-model="notificationTemplate"
					@change="onNotificationTemplateChange"
				>
					<option
						v-for="(template, index) in notificationTemplates"
						:key="index"
						:value="template"
					>{{ template.name }}</option>
				</select>
				<br />Title:
				<input type="text" name="title" ref="notification-title" v-model="notificationTitle" />
				<br />Message:
				<textarea name="message" ref="notification-message" v-model="notificationMessage"></textarea>
				<br />
				<input type="submit" value="Send" />
				<input type="button" value="Hide" @click="hideNotification" />
			</form>
			<br />
			<br />Route:
			<button @click="sendRoute('home')">Home</button>
			<button @click="sendRoute('boot', { query: { auto: true }})">Boot</button>
			<button @click="sendRoute('profile')">Profile</button>
			<button @click="sendRoute('medical')">Medical Records</button>
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
		<modals-container />
	</main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Socket } from "vue-socket.io-extended";

import ProfilePanel from "./components/ProfilePanel.vue";
import ConsolePanel from "./components/ConsolePanel.vue";

import Profile from "./classes/Profile";
import Notification from "./classes/Notification";
import { ServerResponse } from "./classes/Server";
import NotificationTemplates from "./assets/notification-templates.json";

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
	notificationTemplates = NotificationTemplates;

	profiles: Profile[] = [];
	projectorCount = 0;
	projectorMode: string | undefined;

	notificationTemplate: Notification | undefined;
	notificationTitle = "";
	notificationMessage = "";

	created() {
		if (NotificationTemplates.length >= 1) {
			const defaultTemplate = NotificationTemplates[0];

			this.notificationTemplate = defaultTemplate;
			this.notificationTitle = defaultTemplate.title || "";
			this.notificationMessage = defaultTemplate.message || "";
		}
	}

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

	onNotificationTemplateChange() {
		if (this.notificationTemplate == null) return;

		this.notificationTitle =
			this.notificationTemplate.title || this.notificationTitle;
		this.notificationMessage =
			this.notificationTemplate.message || this.notificationMessage;
	}

	sendNotification() {
		this.$socket.$subscribe(
			"response notification show",
			(response: ServerResponse) => {
				if (response.error) {
					this.consoleError("Failed to send notification");
				} else this.consoleSuccess("Notification has been sent");

				this.$socket.$unsubscribe("response notification show");
			}
		);
		this.$socket.client.emit("notification show", {
			timestamp: Date.now(),
			title: this.notificationTitle,
			message: this.notificationMessage
		});
	}

	hideNotification() {
		this.$socket.client.emit("notification hide", {
			timestamp: Date.now(),
			title: this.notificationTitle,
			message: this.notificationMessage
		});

		this.$socket.$subscribe(
			"response notification hide",
			(response: ServerResponse) => {
				if (response.error) {
					this.consoleError("Failed to hide notification");
				} else
					this.consoleSuccess(
						"Notification has been hidden by server"
					);

				this.$socket.$unsubscribe("response notification hide");
			}
		);
	}

	sendRoute(routeName: string, params: object) {
		this.$socket.client.emit("route", {
			name: routeName,
			...params,
			timestamp: Date.now()
		});

		this.$socket.$subscribe(
			"response route",
			(response: ServerResponse) => {
				this.$socket.$unsubscribe("response route");
				if (response.error)
					this.consoleError(
						`Failed to send route to ${routeName} (${response.error.message})`
					);
				else
					this.consoleSuccess(
						`Successfully sent route to ${routeName}`
					);
			}
		);

		setTimeout(() => this.$socket.$unsubscribe("response route"), 30_000);
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
.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s ease-in;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
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
		"console main"
		"header main";

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
		grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
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
