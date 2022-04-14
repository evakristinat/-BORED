<script>
  import PageHeader from './PageHeader.svelte';
  import { Button } from 'svelte-mui';
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';

  //dispatch vastaa tapahtumien viennistä komponenttien välillä.
  const dispatch = createEventDispatcher();
  //paljastetaan rangelabel ja buttonlabel muiden komponenttien muuutettavaksi.
  export let rangelabel = '?';
  export let buttonLabel = '?';
  let activity = 0.5;
  let social = false;

  const toggle = () => {
    !social ? (social = true) : (social = false);
  };
</script>

<div class="container" transition:slide={{ duration: 900 }}>
  <PageHeader pageName="Options"
    ><p slot="info">
      Answer these questions to get customised suggestions on what to do
    </p></PageHeader
  >
  <section>
    <!--formin luonnollinen toiminta estetään ja korvataan omalla tapahtumankäsittelijällä
    tässä tapauksessa klikkauksen mukana kulkee activity ja social muuttujien arvot-->
    <form
      on:submit|preventDefault={() => dispatch('send', { activity, social })}
    >
    <!--inputin arvo sidotaan kaksisuuntaisesti activity muuttujaan.-->
      <div class="activity">
        <label for="range">{rangelabel}</label>
        <input
          name="range-input"
          id="range"
          type="range"
          min="0.0"
          max="1.0"
          step="0.1"
          bind:value={activity}
        />
      </div>
      <div class="quantity">
        <label for="one">{buttonLabel}</label>
        <span id="button1">
          <Button on:click={toggle} type="button" icon dense outlined={!social}>
            <slot name="iconButton1" />
          </Button>
        </span>
        <span id="button2">
          <Button on:click={toggle} type="button" icon dense outlined={social}>
            <slot name="iconButton2" />
          </Button>
        </span>
      </div>
      <div class="submit">
        <Button type="submit" raised color="blue">Let's go</Button>
      </div>
    </form>
  </section>
</div>

<style>
  .container {
    background-color: rgb(234, 234, 245);
    height: 100%;
    overflow: hidden;
    contain: content;
  }
  section {
    width: 90%;
    max-width: 800px;
    margin: auto;
  }
  form {
    width: 90%;
    max-width: 800px;
    text-align: center;
    background-color: white;
    padding: 2%;
    margin: 0;
    box-shadow: -2px 5px 15px -7px rgba(83, 83, 83, 0.32);
  }
  .quantity,
  .activity {
    padding: 5%;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
  }

  label {
    justify-self: left;
    text-align: left;
    padding-right: 3em;
  }
  input {
    grid-column: 2 / span 3;
  }

  .submit {
    text-align: right;
    padding-top: 4vh;
  }

  @media (max-width: 400px) {
    form {
      width: 90%;
    }
    label{
    padding-right: 1px;
    }
  }
</style>
