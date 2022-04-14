<script>
  import PageHeader from './PageHeader.svelte';
  import Categories from './Categories.svelte';
  import customActivities from './activities';

  import { slide, fade } from 'svelte/transition';
  import { Button } from 'svelte-mui';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
</script>

<div class="container" transition:slide={{ duration: 900 }}>
  <PageHeader pageName="Browse">
    <p slot="info">Browse suggestions based on wanted category</p>
  </PageHeader>

  <Categories />
  <div class="content">
    <div class="grid">
      <!--näytetään kaikki storen aktiviteetit. Ei käytetty id:tä,
         koska arvot on varmistettu uniikeiksi jo aikaisemmin,
        eikä poistoja tehdä -->
      {#each $customActivities as activity}
        <div class="activity" in:fade={{duration: 500}}>
          <p>
            {activity}
          </p>
        </div>
      {/each}
      <div class="refresh">
        <Button
          on:click={() => dispatch('new')}
          raised
          shaped
          color="rgb(250, 252, 246)">Refresh</Button
        >
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    height: 100%;
    background-color: rgb(234, 234, 245);
    margin: auto;
    overflow: hidden;
    contain: content;
  }
  .content {
    width: 90%;
    max-width: 800px;
    margin: auto;
  }
  .grid {
    display: grid;
    width: 100%;
    height: 300px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 50% 50%;
    margin-top: 70px;
    gap: 1em;
    align-content: center;
  }

  .activity {
    background-color: rgb(250, 252, 246);
    padding: 7%;
    box-shadow: -2px 5px 15px -7px rgba(83, 83, 83, 0.32);
    transition: 0.2s;
    border-radius: 3px;
  }

  .activity > p {
    font-size: 1em;
  }

  .activity:hover {
    box-shadow: -2px 5px 15px -1px rgba(83, 83, 83, 0.32);
    transform: scale(1.1);
  }
  p {
    font-size: 0.8em;
    height: max-content;
    align-self: center;
  }
  .refresh {
    width: 20%;
    padding: 3%;
  }

  @media (max-width: 400px) {
    .grid {
      padding-top: 22%;
      width: 90%;
      max-width: 600px;
      max-height: 600px;
      margin: auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 15vh 15vh 15vh;
      gap: 0.5em;
    }
    .activity > p {
      font-size: 1em;
    }
  }
</style>
