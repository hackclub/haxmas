<script lang="ts">
	import ChristmasAnimationNoPresents from '$lib/ChristmasAnimationNoPresents.svelte';
	import Button from '$lib/Button.svelte';
	import Present from '$lib/Present.svelte';

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
		},
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
			username: 'William',
			url: 'https://github.com/WilliamPrime',
			desc: 'Day 6',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U089V3FL2EM-17dd06d8588d-512'
		},
		{
			username: 'Astra',
			url: 'https://astracelestine.nekoweb.org/',
			desc: 'Day 7',
			pfp: 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/b709a840207ec0c0_e09v59wqy1e-u089924lmk8-781361d188a9-512.png'
		},
		{
			username: 'Aditya',
			url: 'https://github.com/dragonsenseiguy',
			desc: 'Day 8',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U09H4M0523Z-0962acd8d44d-512'
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
			username: 'Mohammed Zaid',
			url: 'https://github.com/zaid45645',
			desc: 'Day 12',
			pfp: 'https://ca.slack-edge.com/E09V59WQY1E-U083VVA9M0W-09ec3a18b167-512'
		}
	];

	function goToPerson(url: string) {
		if (url === '#') {
		} else {
			window.location.href = url;
		}
	}

	function goBack() {
		window.location.href = '/';
	}

	function comingSoon() {
		alert('Coming very soon!');
	}

	function goToDays() {
		window.location.href = '/submit';
	}

	function faq() {
		window.location.href = '/faq';
	}
</script>


<div class="container">
	<h1>Organizers</h1>

	<div class="orgs-grid four">
		{#each orgs as org}
			<button class="org-card" on:click={() => goToPerson(org.url)}>
				<img src={org.pfp} alt={org.username} class="pfp" />
				<div class="org-info">
					<h3>{org.username}</h3>
					<p class="desc">{org.desc}</p>
				</div>
			</button>
		{/each}
	</div>

    	<h1>Ambassadors</h1>

	<div class="orgs-grid">
		{#each ambassadors as org}
			<button class="org-card" on:click={() => goToPerson(org.url)}>
				<img src={org.pfp} alt={org.username} class="pfp" />
				<div class="org-info">
					<h3>{org.username}</h3>
					<p class="desc">{org.desc}</p>
				</div>
			</button>
		{/each}
	</div>

	<footer>
		Haxmas is proudly 100% teen-organized.
	</footer>

</div>

<style>
	.container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
		padding-bottom: 100px;
		overflow: scroll;
        background-color: #4285f4;
	}

	footer {
		margin-top:3rem;
	}

	h1 {
		color: #fff;
		font-size: 2.5rem;
		margin-bottom: 2rem;
		text-align: center;
		padding: 0 1rem;
	}

	.orgs-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		max-width: 750px;
		width: 100%;
	}

	.four {
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}

	@media (max-width: 768px) {
		.orgs-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.orgs-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		h1 {
			font-size: 1.75rem;
			margin-bottom: 1.5rem;
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
			padding-top: 2rem;
			padding-bottom: 120px;
		}

		h1 {
			font-size: 2rem;
			margin-bottom: 2rem;
		}

		.orgs-grid {
			gap: 1.25rem;
			max-width: 100%;
		}
	}

	.org-card {
		background: rgba(255, 255, 255, 0.1);
		border: 3px solid #fff;
		border-radius: 5px;
		padding: 1rem 2rem;
		cursor: pointer;
		transition: transform 0.2s, background 0.2s;
		text-align: left;
		font-family: inherit;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.75rem;
	}

	.pfp {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
	}

	.org-info {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.org-card:hover {
		transform: translateY(-4px);
		background: rgba(255, 255, 255, 0.15);
	}

	.org-card h3 {
		color: #fff;
		margin: 0;
		font-size: 1.1rem;
        margin-bottom: 2px;
	}

	.org-card .desc {
		color: rgba(255, 255, 255);
		margin: 0;
		font-size: 0.9rem;
	}



</style>
