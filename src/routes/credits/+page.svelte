<script lang="ts">
	import Header from '$lib/Header.svelte';

	interface Person {
		username: string;
		url: string;
		desc: string;
		pfp: string;
	}

	const orgs: Person[] = [
		{
			username: 'Jenin',
			url: 'https://github.com/jeninh',
			desc: 'Lead Organizer',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U0926UASBJ7-7fa6be03e7cb-512'
		},
		{
			username: 'Charmunk',
			url: 'https://ivie.codes',
			desc: 'Lead Developer',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U07UV4R2G4T-61a467a806c5-512'
		},
		{
			username: 'David',
			url: 'https://www.fletchworks.dev/',
			desc: 'Shop/Budget',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U06LWHNLL3B-81181a884eb3-512'
		},
		{
			username: 'Ren',
			url: 'https://github.com/electricxangel',
			desc: 'Art/Design',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U081SNW7JUA-a855231b9e3d-512'
		}
	];

	const ambassadors: Person[] = [
		{
			username: 'Sahana',
			url: 'https://sahana.dev/',
			desc: 'Day 1',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U081C6XT885-33b2afdb56fb-512'
		},
		{
			username: 'Rudy',
			url: '#',
			desc: 'Day 2',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U079HV9PTC7-4c64c3b31d28-512'
		},
		{
			username: 'David',
			url: 'https://www.fletchworks.dev/',
			desc: 'Day 3',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U06LWHNLL3B-81181a884eb3-512'
		},
		{
			username: 'Deployor',
			url: 'https://deployor.dev/',
			desc: 'Day 4',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U078PH0GBEH-g1d45b4a4a73-512'
		},
		{
			username: 'Niko',
			url: 'https://nikoo.dev/',
			desc: 'Day 5',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U08SF8MVC82-6e245427b039-512'
		},
		{
			username: 'Arca',
			url: 'https://arcaege.dev/',
			desc: 'Day 6',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U09192704Q7-8275736cf9d9-512'
		},
		{
			username: 'Astra',
			url: 'https://astracelestine.nekoweb.org/',
			desc: 'Day 7',
			pfp: 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/b709a840207ec0c0_e09v59wqy1e-u089924lmk8-781361d188a9-512.png'
		},
		{
			username: 'Miguel',
			url: 'https://shymike.dev/',
			desc: 'Day 8',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U07VC9705D4-6113dfcf4805-512'
		},
		{
			username: 'Taggie',
			url: 'https://yip.cat',
			desc: 'Day 9',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U091NVAJA3F-e6a3dfb74715-512'
		},
		{
			username: 'Charmunk',
			url: 'https://ivie.codes',
			desc: 'Day 10',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U07UV4R2G4T-61a467a806c5-512'
		},
		{
			username: 'Raygen Rupe',
			url: 'https://github.com/lordbagel42/',
			desc: 'Day 11',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U08R4KDL6UF-68444436aa76-512'
		},
		{
			username: 'Aditya',
			url: 'https://github.com/dragonsenseiguy',
			desc: 'Day 12',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U09H4M0523Z-0962acd8d44d-512'
		}
	];

	function goToPerson(url: string) {
		if (url !== '#') {
			window.open(url, '_blank');
		}
	}
</script>

<svelte:head>
	<title>Credits | Haxmas</title>
</svelte:head>

<Header title="Credits" showBack={true} />

<div class="page-wrapper">
	<div class="container">
		<section class="section">
			<h2>Organizers</h2>
			<div class="people-grid organizers">
				{#each orgs as person}
					<button class="person-card" on:click={() => goToPerson(person.url)}>
						<img src={person.pfp} alt={person.username} class="avatar" />
						<div class="person-info">
							<h3>{person.username}</h3>
							<p>{person.desc}</p>
						</div>
					</button>
				{/each}
			</div>
		</section>

		<section class="section">
			<h2>Workshop Ambassadors</h2>
			<div class="people-grid ambassadors">
				{#each ambassadors as person}
					<button class="person-card compact" on:click={() => goToPerson(person.url)}>
						<img src={person.pfp} alt={person.username} class="avatar" />
						<div class="person-info">
							<h3>{person.username}</h3>
							<p>{person.desc}</p>
						</div>
					</button>
				{/each}
			</div>
		</section>

		<footer class="footer">
			<p>Haxmas is proudly 100% teen-organized.</p>
			<a href="https://hackclub.com" target="_blank" rel="noopener noreferrer">
				Learn more about Hack Club →
			</a>
		</footer>
	</div>
</div>

<style>
	.page-wrapper {
		min-height: 100vh;
		background-color: #4285f4;
		padding: 5rem 1.5rem 3rem;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
	}

	.section {
		margin-bottom: 2.5rem;
	}

	h2 {
		color: #fff;
		font-size: 1.5rem;
		margin: 0 0 1.25rem 0;
		font-weight: 500;
		text-align: center;
	}

	.people-grid {
		display: grid;
		gap: 0.75rem;
	}

	.people-grid.organizers {
		grid-template-columns: repeat(2, 1fr);
	}

	.people-grid.ambassadors {
		grid-template-columns: repeat(3, 1fr);
	}

	.person-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		background: rgba(0, 0, 0, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		cursor: pointer;
		text-align: left;
		font-family: inherit;
		transition:
			transform 0.2s,
			border-color 0.2s;
	}

	.person-card:hover {
		transform: translateY(-2px);
		border-color: rgba(255, 255, 255, 0.25);
	}

	.avatar {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
	}

	.person-card.compact .avatar {
		width: 36px;
		height: 36px;
	}

	.person-info {
		min-width: 0;
	}

	.person-card h3 {
		color: #fff;
		margin: 0;
		font-size: 0.95rem;
		font-weight: 500;
	}

	.person-card.compact h3 {
		font-size: 0.9rem;
	}

	.person-card p {
		color: rgba(255, 255, 255, 0.7);
		margin: 0.15rem 0 0 0;
		font-size: 0.8rem;
	}

	.person-card.compact p {
		font-size: 0.75rem;
	}

	.footer {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.footer p {
		color: rgba(255, 255, 255, 0.8);
		margin: 0 0 0.75rem 0;
		font-size: 1rem;
	}

	.footer a {
		color: #5bc0de;
		text-decoration: none;
		font-size: 0.95rem;
	}

	.footer a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.page-wrapper {
			padding: 4.5rem 1rem 2rem;
		}

		.people-grid.organizers {
			grid-template-columns: 1fr;
		}

		.people-grid.ambassadors {
			grid-template-columns: repeat(2, 1fr);
		}

		h2 {
			font-size: 1.35rem;
		}
	}

	@media (max-width: 480px) {
		.page-wrapper {
			padding: 4rem 0.75rem 1.5rem;
		}

		.people-grid.ambassadors {
			grid-template-columns: 1fr;
		}

		.person-card {
			padding: 0.6rem 0.75rem;
		}
	}
</style>
