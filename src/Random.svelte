<script>
  import PageHeader from './PageHeader.svelte'
  import { createEventDispatcher } from 'svelte'
  import { fly } from 'svelte/transition'
  import { Firework } from 'svelte-loading-spinners'

  const dispatch = createEventDispatcher()
  export let promise
  export let header
  let selectedToDo

  /*selected päivitetään aina kun selectedToDo muuttuu.
    selectedToDo sisältää promisesta saatavan vastauksen 
    esittävän elementin. Se käsitellään app-komponentissa*/
  $: selected = selectedToDo
</script>

<div class="container" in:fly={{ duration: 500, x: 100 }}>
  <section>
    <slot name="header">
      <PageHeader pageName={header}>
        <p slot="info">
          Go through suggestions until you find something to do.
        </p>
      </PageHeader>
    </slot>
    <div class="suggestion-box">
      <!--Await-blocks tehty käyttäen pohjana
       https://svelte.dev/tutorial/await-blocks-->
      <p class="intro">You could...</p>
      <!--odotetaan lupausta, joka saadaan app-komponentilta
          odottaessamme näämme spinnerin-->
      {#await promise}
        <div class="loading" transiton:fade>
          <Firework color="grey" />
        </div>
      {:then todo}
        <span class="text-box">
          <h4 bind:this={selectedToDo}>{todo.activity}</h4>
        </span>
      {:catch error}
        <p class="error">{error.message}</p>
      {/await}
    </div>

    <div class="box">
      <div class="button-box">
        <button
          class="button"
          on:click={() => dispatch('new')}
          shaped
          raised
          color="rgb(159, 180, 253)"
        >
          Not happy?
        </button>
      </div>

      <div class="button-box">
        <!-- tähän tulee change preferences ja toiminnallisuus app.svelteen -->
        <button
          class="button"
          on:click={() => dispatch('change', selected)}
          color="rgb(159, 180, 253)">Change preferences?</button
        >
      </div>
      <div class="button-box">
        <!-- tähän tulee formiin siirtyminen ja logiikka sille löytyy app.sveltestä-->
        <button
          class="button"
          on:click={() => dispatch('form')}
          color="rgb(159, 180, 253)">Give us a suggestion!</button
        >
      </div>
    </div>
  </section>
</div>

<style>
  .container {
    height: 100%;
    overflow: hidden;
    contain: content;
    background-color: rgb(234, 234, 245);
  }
  section {
    height: 100%;
  }
  .suggestion-box {
    color: whitesmoke;
    width: 70%;
    min-width: 500px;
    max-width: 600px;
    min-height: 180px;
    margin: auto;
    padding-top: 2vh;
    background-color: rgb(54, 15, 197);
    border-radius: 30px;
    box-shadow: -2px 5px 15px -7px rgba(83, 83, 83, 0.32);
  }

  .text-box,
  .loading,
  .error {
    padding-bottom: 3vh;
    max-height: 4em;
    margin: 0;
    text-align: center;
  }

  .text-box {
    display: inline-block;
  }
  .intro{
    color: rgba(240, 248, 255, 0.711);
  }

  .loading {
    width: 50px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .box {
    display: flex;
    margin: auto;
    margin-top: 3vh;
    height: 5vh;
    width: 800px;
    justify-content: space-evenly;
    height: fit-content;
    contain: content;
  }

  .button-box {
    margin: 2vw;
    max-width: 60%;
    height: 100%;
  }

  .button {
    border: none;
    min-width: 100px;
    min-height: 100%;
    box-shadow: 1px 5px 10px 0 rgba(62, 104, 239, 0.022),
      1px 5px 10px 0 rgba(23, 28, 158, 0.09);
    border-radius: 30px;
    padding: 1.5em;
    text-align: center;
    background-color: rgb(159, 180, 253);
    cursor: pointer;
    color: aliceblue;
    contain: content;
    white-space: nowrap;
    font-weight: bold;
  }

  .button:focus {
    background-color: blue;
  }

  @media (max-width: 600px) {
    .suggestion-box {
      margin-top: 5%;
      padding: 5%;
      width: 80%;
      min-width: 200px;
    }

    .box {
      bottom: -80px;
      max-width: 90%;
      flex-wrap: wrap;
    }
  }
</style>
