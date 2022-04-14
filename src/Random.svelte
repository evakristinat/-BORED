<script>
  import PageHeader from './PageHeader.svelte';
  import { Button } from 'svelte-mui';
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import { Firework } from 'svelte-loading-spinners';

  const dispatch = createEventDispatcher();
  export let promise;
  export let header;
  let selectedToDo;

  /*selected päivitetään aina kun selectedToDo muuttuu.
    selectedToDo sisältää promisesta saatavan vastauksen 
    esittävän elementin. Se käsitellään app-komponentissa*/
  $: selected = selectedToDo;
</script>

<div class="container" transition:slide={{ duration: 900 }}>
  <section>
    <slot name="header">
      <PageHeader pageName={header}>
        <p slot="info">Go through suggestions until you find something to do.</p>
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
          <Firework color="grey"/>
        </div>
      {:then todo}
        <span>
          <h4 bind:this={selectedToDo}>{todo.activity}</h4>
        </span>
      {:catch error}
        <p class="error">{error.message}</p>
      {/await}
      <div class="box">
      <Button on:click={() => dispatch('ok', selected)} raised color
        >OK</Button
      >
      <Button on:click={() => dispatch('new')} raised color
        >Maybe something else</Button
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
    background-color: rgb(194, 193, 230);
  }
  section{
    height: 100%;
  }
  .suggestion-box {
    width: 80%;
    max-width: 800px;
    margin: auto;
    padding-top:2vh;
    background-color: white;
    padding-bottom: 5%; 
    height: 20vh; 
    box-shadow: -2px 5px 15px -7px rgba(83, 83, 83, 0.32);
  }

  h4,
  .loading, .error {
    padding-top: 2vh;
    padding-bottom: 3vh;
    height: 4em;
    margin: 0;
    text-align: center;
  }

  span{
    display: inline-block;
    vertical-align: middle;
    line-height: 4em;
  }

  .loading {
    width: 1vh;
    margin-left: 47%;
  }
  .box{
    display: flex;
    justify-content: space-evenly;
    margin: auto;
    width: 42vw;
    max-width: 330px;
  }

  @media(max-width:600px){
    .suggestion-box {
    margin-top: 5%;
    padding-bottom: 5%;
    height: 30vh;
  }

  .box{
    bottom: -80px;
    width: 90%;
  }

  .loading {
    width: 1vh;
    margin-left: 47%;
  }

  }
</style>
