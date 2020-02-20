<template>
	<section class="panel">
		<h2>{{ profile.name }}</h2>
		<h4 class="likes-display">
			Likes:
			{{ profile.likes }}
		</h4>
		<h4 class="likes-display">
			Dislikes:
			{{ profile.dislikes }}
		</h4>

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
		/>
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LikeRow from "./LikeRow.vue";
import Profile from "../classes/Profile";

interface UpdateRequest {
	profileId: string;
	timestamp: number;
	data: Profile;
}

interface UpdateResponse {
	request: UpdateRequest;
	error: {
		message: string;
	};
}

@Component({
	components: {
		LikeRow
	}
})
export default class ProfilePanel extends Vue {
	@Prop() private profile!: Profile;

	private targetLikes = 0;
	private targetDislikes = 0;

	setLikes() {
		console.log(`Set likes to ${this.targetLikes}`);

		this.profile.likes = this.targetLikes;
		this.$socket.client.emit("update", {
			profileId: this.profile.id,
			timestamp: Date.now(),
			data: {
				likes: this.profile.likes
			}
		} as UpdateRequest);

		this.$socket.$subscribe(
			"response update",
			(response: UpdateResponse) => {
				this.$socket.$unsubscribe("response update");

				if (response.error)
					this.$emit(
						"console-error",
						`Error: Likes wasn't set to ${response.request.data.likes}\n(${response.error.message})`
					);
				else
					this.$emit(
						"console-success",
						`Success: Likes set to ${response.request.data.likes}`
					);
			}
		);
	}
}
</script>

<style scoped lang="scss">
section.panel {
	border: gray 0.5px solid;
	padding: 2em;
	width: auto;

	h2 {
		margin-top: 0.25em;
	}
}

.row {
	display: grid;
	grid-template-columns: 5em 4fr auto auto auto auto;
}
</style>
