<template>
	<div class="wrapper">
		<scale-loader v-if="isLoading" class="loader" color="#0657a3"></scale-loader>
		<div class="container" v-else>
			<header>
				<img src="@/assets/drawable/hospital_named.svg" alt="St. Pachomius Hospital" />

				<nav>
					<a>Home</a>
					<a>Services</a>
					<a>Gallery</a>
					<a>Associates</a>
					<a>Career</a>
					<a>About Us</a>
				</nav>
			</header>

			<main>
				<h1>Medical Records</h1>
				<article>
					<section>
						<p class="id">UJ81839</p>
						<h2>Henry Lang</h2>

						<img class="profile" src="@/assets/photos/medical/henry.jpg" alt="Henry Lang's Picture" />

						<table>
							<tr>
								<td>Name:</td>
								<td>
									<strong>Henry Lang</strong>
								</td>
							</tr>
							<tr>
								<td>Date of Birth:</td>
								<td>19 March 1969</td>
							</tr>
							<tr>
								<td>Address:</td>
								<td>55 Westeros Ave., Salt Lake City</td>
							</tr>
							<tr>
								<td>Notes:</td>
							</tr>
						</table>

						<hr />

						<h3 ref="injuries">Injuries</h3>
						<ol>
							<li>Minor cuts</li>
							<li>Minor bruises</li>
							<li>Fractured upper right arm</li>
							<li>Light bleeding</li>
						</ol>
					</section>
					<section>
						<p class="id">UJ817741</p>
						<h2>Bill Walters</h2>

						<img class="profile" src="@/assets/photos/medical/bill.jpg" alt="Bill Walter's Picture" />

						<table>
							<tr>
								<td>Name:</td>
								<td>
									<strong>Bill Walters</strong>
								</td>
							</tr>
							<tr>
								<td>Date of Birth:</td>
								<td>5 October 1978</td>
							</tr>
							<tr>
								<td>Address:</td>
								<td>10 Higgins Road, Salt Lake City</td>
							</tr>
							<tr>
								<td>Notes:</td>
								<td>Under investigation</td>
							</tr>
						</table>

						<hr />

						<h3>Injuries</h3>
						<ol>
							<li>Minor cuts</li>
							<li>Minor bruises</li>
							<li>Broken left hand distal phalanges</li>
							<li>Broken left hand intermediate phalanges</li>
							<li>Disjointed left hand carpals</li>
							<li>Broken right hand metacarpals</li>
							<li>Broken right hand carpals</li>
							<li>Broken lower right arm</li>
							<li>Torn right wrist tendons</li>
							<li>Broken lower rib</li>
							<li>Moderate bleeding</li>
						</ol>
					</section>
				</article>
			</main>
		</div>
	</div>
</template>

<script>
import VueScrollTo from "vue-scrollto";
import ScaleLoader from "vue-spinner/src/ScaleLoader";

export default {
	name: "Medical",
	components: {
		"scale-loader": ScaleLoader
	},
	data: () => ({
		isLoading: true
	}),
	methods: {
		sleep(delay) {
			return new Promise(response => setTimeout(response, delay));
		}
	},
	async mounted() {
		await this.sleep(3000);
		this.isLoading = false;

		await this.sleep(5000);
		const options = {
			container: "#app",
			easing: "ease-in-out",
			offset: -50,
			force: true,
			cancelable: true,
			x: false,
			y: true
		};

		VueScrollTo.scrollTo(this.$refs.injuries, 3000, options);
	}
};
</script>

<style lang='scss' scoped>
@import "@/master.scss";

h1,
h2,
h3,
h4,
h5 {
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.wrapper {
	width: 100%;
	height: 100%;
	overflow-y: auto;
	background-color: color(secondary);
}

.loader {
	display: flex;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100%;
}

header {
	height: 5em;
	padding: 1em;
	box-shadow: 0px 10px 32px -32px rgba(0, 0, 0, 0.75);

	img {
		height: 100%;
		margin-left: 32px;
	}

	nav {
		float: right;
		display: flex;
		flex-flow: row nowrap;
		align-content: center;

		a {
			margin: 1em;
		}
	}
}

main {
	padding: 32px 64px 64px 64px;

	h1 {
		font-weight: 700;
		font-size: 4em;
	}

	article {
		display: grid;
		grid-template-columns: repeat(2, minmax(300px, 1fr));
		gap: 2em;

		section {
			background: #e3e4eb;
			padding: 2em;

			h2 {
				font-weight: 400;
				font-size: 4em;
				margin: 0 0 16px 0;
			}

			p.id {
				font-style: italic;
				font-weight: 200;
				margin-top: 6px;
			}

			img.profile {
				width: 100%;
				height: auto;
			}

			table {
				margin: 32px 0;
				width: 100%;

				td {
					vertical-align: top;
					padding: 0.25em;

					&:nth-child(2) {
						text-align: right;
					}
				}
			}

			h3 {
				font-size: 3em;
				margin-bottom: 8px;
			}

			li {
				padding: 0.25em 0;
			}
		}
	}
}
</style>