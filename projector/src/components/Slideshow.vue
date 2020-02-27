<template>
	<!-- Show the main stuff -->
	<!-- FIXME: Background's backup color (i.e. white is not linked to master.scss) -->
	<main class="panel stack panel-container horizontal">
		<transition name="fade" mode="out-in">
			<div
				:key="image"
				class="image-panel panel panel-container vertical"
				:style="{ backgroundImage: `url(${image})` }"
			>
				<h1
					class="panel name"
					:style="profile.imageTextColor ? { 'color': profile.imageTextColor } : ''"
				>{{ profile.name }}</h1>
				<article class="panel biography" v-if="profile.biography != null && profile.biography !== ''">
					<p>{{ profile.biography }}</p>
				</article>
			</div>
		</transition>
		<aside class="panel">
			<charges-panel class="charges" :charges="profile.charges ||  []" />
			<stats-panel class="stats" :likes="profile.likes || 0" :dislikes="profile.dislikes || 0" />
		</aside>
	</main>
</template>

<script>
import ChargesPanel from "@/components/ChargesPanel";
import StatsPanel from "@/components/StatsPanel";

export default {
	name: "Slideshow",
	components: {
		"charges-panel": ChargesPanel,
		"stats-panel": StatsPanel
	},
	props: {
		profile: {
			required: true,
			type: Object
		}
	},
	computed: {
		image() {
			return this.profile.images[this.profile.imageIndex];
		}
	}
};
</script>

<style scoped lang='scss'>
@import "@/master.scss";

main {
	width: 100%;
	height: 100%;
}

.panel-container {
	display: grid;

	&.horizontal {
		grid-template-columns: 2fr 1fr;
		grid-template-rows: auto;
	}
	&.vertical {
		grid-template-columns: auto;
		grid-template-rows: auto auto;
		align-content: space-between;
	}
}

.stack-container {
	position: absolute;
	.stack {
		position: relative;
	}
}

div.image-panel {
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}

.name {
	margin: 32px;
	font-size: 6em;
	color: color(text-title);
}

article.biography {
	margin: 32px 32px;
	padding: 8px 16px;
	justify-self: center;
	font-size: 12px;
	background: color(card);
	color: color(text-primary);
	text-align: center;
	max-width: 500px;

	@media (min-width: 1024px) {
		margin: 32px;
		text-align: left;
		justify-self: left;
	}
}

aside.panel {
	height: 100%;
	display: grid;
	grid-template-rows: 1fr auto;
	flex-direction: column;

	background: color(primary);
	color: color(text-primary);
}
</style>