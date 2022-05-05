<script>
  import PageHeader from './PageHeader.svelte'
  import { Button } from 'svelte-mui'
  import { createEventDispatcher } from 'svelte'
  import { slide } from 'svelte/transition'
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

<div class="container" transition:slide={{ duration: 900 }}>
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
      <p>You could...</p>
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
        <Button
          on:click={() => dispatch('new')}
          shaped
          raised
          color="rgb(159, 180, 253)"
        >
          Not happy?
        </Button>
      </div>

      <div class="button-box">
        <!-- tähän tulee change preferences ja toiminnallisuus app.svelteen -->
        <Button
          on:click={() => dispatch('change', selected)}
          shaped
          raised
          color="rgb(159, 180, 253)">Change preferences?</Button
        >
      </div>
      <div class="button-box">
        <!-- tähän tulee formiin siirtyminen ja logiikka sille löytyy app.sveltestä-->
        <Button
          on:click={() => dispatch('form')}
          shaped
          raised
          color="rgb(159, 180, 253)">Give us a suggestion!</Button
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

  .loading {
    width: 50px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .box {
    display: flex;
    margin: auto;
    margin-top: 3vh ;
    height: 5vh;
    width: 800px;
    justify-content: space-evenly;
  }

  .button-box {
    margin: 2vw;
    max-width: 60%;
    
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
