<script>
  import PageHeader from './PageHeader.svelte'
  import { Button } from 'svelte-mui'
  import { createEventDispatcher } from 'svelte'
  import { fly } from 'svelte/transition'
  import Categories from './Categories.svelte'

  //dispatch vastaa tapahtumien viennistä komponenttien välillä.
  const dispatch = createEventDispatcher()
  //paljastetaan rangelabel ja buttonlabel muiden komponenttien muuutettavaksi.
  export let rangelabel = '?'
  export let buttonLabel = '?'
  let activity = 0.5
  let social = false

  const toggle = () => {
    !social ? (social = true) : (social = false)
  }
</script>

<div class="container" in:fly={{ duration: 500, x: 100 }}>
  <PageHeader pageName="Options"
    ><p slot="info">
      Answer these questions to get customised suggestions on what to do or
      select suggestions based on category
    </p></PageHeader
  >

  <div class="flex">
    <section>
      <p class="option-p">Optimized suggestion</p>
      <!--formin luonnollinen toiminta estetään ja korvataan omalla tapahtumankäsittelijällä
    tässä tapauksessa klikkauksen mukana kulkee activity ja social muuttujien arvot-->
      <form
        on:submit|preventDefault={() => dispatch('send', { activity, social })}
      >
        <!--inputin arvo sidotaan kaksisuuntaisesti activity muuttujaan.-->

        <div class="quantity">
          <label for="one">{buttonLabel}</label>
          <span id="button1">
            <Button
              on:click={toggle}
              type="button"
              icon
              dense
              outlined={!social}
            >
              <slot name="iconButton1" />
            </Button>
          </span>
          <span id="button2">
            <Button
              on:click={toggle}
              type="button"
              icon
              dense
              outlined={social}
            >
              <slot name="iconButton2" />
            </Button>
          </span>
        </div>

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

        <div class="submit">
          <button class="submit-button" type="submit" raised color="blue"
            >Let's go</button
          >
        </div>
      </form>
    </section>
    <section class="categories">
      <p class="option-p">Categories</p>
      <!-- <h3>Categories</h3> -->
      <div on:click={() => dispatch('sendtype')}>
        <Categories />
        <!-- <Button on:click={() => dispatch('sendtype')}>Let's go</Button> -->
      </div>
    </section>
  </div>
</div>

<style>
  .flex {
    margin: auto;
    display: flex;
    /* justify-content: space-evenly; */
    align-items: flex-start;
    max-width: 800px;
    width: 90%;
    margin: auto;
  }
  .container {
    background-color: rgb(234, 234, 245);
    height: 100%;
    overflow: hidden;
    contain: content;
  }

  .option-p {
    text-align: left;
    padding-left: 5vh;
  }
  form {
    width: 90%;
    max-width: 800px;
    text-align: center;
    background-color: rgb(159, 180, 253);
    border-radius: 50px;
    padding: 10%;
    margin-bottom: 40px;
    box-shadow: -2px 5px 15px -7px rgba(83, 83, 83, 0.32);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .submit-button {
    transition: 900ms;
    background-color: rgba(0, 0, 255);
    color: whitesmoke;
    margin: auto;
    margin-bottom: 2vh;
    border: none;
    padding: 20%;
    width: max-content;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 10px;
  }

  .submit-button:hover {
    transition: 500ms;
    background-color: rgba(0, 13, 255, 0.588);
    box-shadow: 0px 3px 10px 2px rgba(0, 13, 109, 0.195);
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
    .container {
      overflow: scroll;
    }
    form {
      width: 90%;
    }
    label {
      padding-right: 1px;
    }

    .flex {
      flex-direction: column;
      align-items: center;
      contain: content;
      height: 80vh;
    }
  }
</style>
