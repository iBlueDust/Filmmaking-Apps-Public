<template>
	<section :class="{ 'panel': true, 'disabled': profile.disabled }">
		<div class="status">
			<div>
				<h2>{{ profile.name }}</h2>

				<h4 class="likes-display">
					Likes:
					{{ profile.likes || 0 }}
				</h4>
				<h4 class="likes-display">
					Dislikes:
					{{ profile.dislikes || 0 }}
				</h4>
			</div>
			<img :src="image" alt :title="image" class="image" @click="showImageSelection" />
		</div>

		<LikeRow
			class="row"
			label="Likes:"
			:inputTitle="`Set likes for ${profile.name}`"
			v-model="targetLikes"
			@set-click="setLikes"
		/>

		<LikeRow
			class="row"
			label="Dislikes:"
			:inputTitle="`Set dislikes for ${profile.name}`"
			v-model="targetDislikes"
			@set-click="setDislikes"
		/>

		<div id="disabled">
			<label for="disabled">Disable Profile</label>
			<input name="disabled" type="checkbox" v-model="disabled" />
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LikeRow from "./LikeRow.vue";
import ImageSelector from "./ImageSelector.vue";

import Profile from "../classes/Profile";
import { UpdateRequest, UpdateResponse } from "@/classes/Server";

@Component({
	components: {
		LikeRow
	}
})
export default class ProfilePanel extends Vue {
	@Prop() private profile!: Profile;

	private _targetLikes = 0;
	private _targetDislikes = 0;

	get targetLikes() {
		return this.profile.likes || 0;
	}

	set targetLikes(value: number) {
		this.$data._targetLikes = value;
	}

	get targetDislikes() {
		return this.profile.dislikes || 0;
	}

	set targetDislikes(value: number) {
		this.$data._targetDislikes = value;
	}

	setLikes() {
		console.log(`Set likes to ${this.$data._targetLikes}`);

		this.profile.likes = this.$data._targetLikes;
		this.sendUpdate()
			.then((response: UpdateResponse) =>
				this.$emit(
					"console-error",
					`Error: Likes wasn't set to ${
						response.request && response.request.data
							? response.request.data.likes
							: undefined
					}\n(${response.error.message})`
				)
			)
			.catch((response: UpdateResponse) =>
				this.$emit(
					"console-success",
					`Success: Likes set to ${
						response.request && response.request.data
							? response.request.data.likes
							: undefined
					}`
				)
			);
	}

	setDislikes() {
		console.log(`Set dislikes to ${this.$data._targetDislikes}`);

		this.profile.dislikes = this.$data._targetDislikes;
		this.sendUpdate()
			.then((response: UpdateResponse) =>
				this.$emit(
					"console-error",
					`Error: Dislikes wasn't set to ${response.request.data.dislikes}\n(${response.error.message})`
				)
			)
			.catch((response: UpdateResponse) =>
				this.$emit(
					"console-success",
					`Success: Dislikes set to ${response.request.data.dislikes}`
				)
			);
	}

	showImageSelection() {
		this.$modal.show(
			ImageSelector,
			{
				images: this.profile.images
			},
			{
				height: "auto",
				adaptive: true
			},
			{
				selected: (index: number) => {
					if (this.profile.imageIndex == index) {
						this.$emit("console-log", "Image will not change");
						return;
					}

					if (index >= 0 && index < this.profile.images.length) {
						this.profile.imageIndex = index;

						this.sendUpdate()
							.then(() =>
								this.$emit(
									"console-error",
									`Error: Changing image of ${this.profile.name})`
								)
							)
							.catch(() =>
								this.$emit(
									"console-success",
									`Changed image of ${this.profile.name}`
								)
							);
					} else {
						this.$emit("console-error", "Invalid image index");
					}
				}
			}
		);
	}

	get image() {
		return this.profile.images[this.profile.imageIndex];
	}

	get disabled() {
		return this.profile.disabled;
	}

	set disabled(newValue: boolean) {
		console.log(
			`${newValue ? "Disabling" : "Enabling"} profile ${
				this.profile.name
			}`
		);

		const oldValue = this.profile.disabled;
		this.profile.disabled = newValue;

		this.sendUpdate()
			.then(() => {
				this.$emit(
					"console-success",
					`Success: ${this.profile.name} was ${
						newValue ? "disabled" : "enabled"
					}`
				);
				this.profile.disabled = newValue;
			})
			.catch((response: UpdateResponse) => {
				this.$emit(
					"console-error",
					`Error: ${this.profile.name} failed to be ${
						newValue ? "disabled" : "enabled"
					} (${response.error ? response.error.message : undefined})`
				);
			});

		// Use this.profile to just send the data but don't actually mutate it just yet until the server responds
		this.profile.disabled = oldValue;
	}

	async sendUpdate() {
		setTimeout(() => this.$socket.$unsubscribe("response update"), 30_000);

		return new Promise<UpdateResponse>((resolve, error) => {
			this.$socket.$subscribe(
				"response update",
				(response: UpdateResponse) => {
					this.$socket.$unsubscribe("response update");

					if (response.error) {
						error(response);
					} else resolve(response);
				}
			);
			this.$socket.client.emit("update", {
				profileId: this.profile.id,
				timestamp: Date.now(),
				data: this.profile
			} as UpdateRequest);
		});
	}
}
</script>

<style scoped lang="scss">
section.panel {
	border: gray 0.5px solid;
	padding: 2em;
	width: auto;

	.status {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		margin-bottom: 1em;
	}

	img {
		float: right;
		width: 100%;
		height: 100%;
		object-fit: cover;
		overflow: hidden;
		cursor: pointer;
	}

	#disabled {
		float: right;
	}

	&.disabled {
		background: gray;
	}

	h2 {
		margin-top: 0.25em;
	}
}

.row {
	display: grid;
	grid-template-columns: 5em 4fr auto auto auto auto;
}
</style>
