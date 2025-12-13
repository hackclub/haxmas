<script lang="ts">
  import ChristmasAnimationNoPresents from "$lib/ChristmasAnimationNoPresents.svelte";
  import Button from "$lib/Button.svelte";

  function goBack() {
    window.location.href = '/';
  }
</script>

<ChristmasAnimationNoPresents />

<div class="container">
  <h1>404</h1>
  <p>Page not found</p>
  
  <div class="back-button">
    <Button on:click={goBack}>Back to Home</Button>
  </div>
</div>

<style>
  .container {
    position: relative;
    z-index: 100;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  h1 {
    color: #fff;
    font-size: 8rem;
    margin: 0;
    text-align: center;
    font-family: "Luckiest Guy", cursive;
  }

  p {
    color: #f0f7ff;
    font-size: 2rem;
    margin: 1rem 0 2rem;
    text-align: center;
  }

  .back-button {
    margin-top: 2rem;
  }
</style>
