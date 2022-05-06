<script>
  import PageHeader from './PageHeader.svelte'
  import Email from './Email.svelte'
  import { fly } from 'svelte/transition'
  import { onDestroy } from 'svelte'

  // näihin asetetaan formista saadut tiedot
  let name = ''
  let type = 'chill'
  let participants = 1
  let activity = 0.5

  let show = false

  $: valid = (participants > 0) & (name.length >= 3)

  // addActivity lisää aktiviteetin tietokantaan
  const submitForm = () => {
    const newActivity = {
      accessibility: activity,
      activity: name,
      participants: participants,
      type: type,
    }
    console.log(newActivity)
    // fetch(
    //   'https://bored-svelte-default-rtdb.europe-west1.firebasedatabase.app/.json',
    //   {
    //     method: 'POST',
    //     body: JSON.stringify(newActivity),
    //   }
    // )
      // .then((response) => console.log(response))
      // .catch((err) => console.error(err))
    reset()
    show = true
  }

  const reset = () => {
    name = ''
    type = 'chill'
    participants = ''
    activity = 0.5
  }

  // ei toiminnassa vielä
  // const capitalizeSentence = (sentence) => {
  //   const trimmed = sentence.trim().toLowerCase()
  //   let firstLetter = trimmed.charAt(0)
  //   return firstLetter.toUpperCase().concat(trimmed.slice(trimmed.charAt(1), trimmed.charAt(-1)))
  // }

  onDestroy(() => {
    show = false
    reset()
  })
</script>

<div class="container" in:fly={{ duration: 700, x: 100 }}>
  {#if !show}
    <PageHeader pageName="Form"
      ><p slot="info">
        Submit your own idea on what to do here to be featured in the
        recommendations!
      </p></PageHeader
    >

    <div class="content">
      <!--Input kenttä johon kirjoitetaan ehdotettava aktiviteetti-->
      <div class="flex">
        <form on:submit|preventDefault={submitForm}>
          <div class="name">
            <label for="name">Suggestion</label>
            <input
              id="name"
              class="input"
              bind:value={name}
              autocomplete="off"
              placeholder="Clean your bathroom"
            />
          </div>

          <!--Select kenttä, jossa valitaan mihin kategoriaan ehdotettava aktiviteetti kuuluu-->
          <div class="type">
            <label for="type">Category </label>
            <select id="type" name="type" class="input" bind:value={type}>
              <option value="chill">Chill</option>
              <option value="active">Active</option>
              <option value="social">Social</option>
            </select>
          </div>
          <!--Input valinta kuinka monelle ihmisille aktiviteetti on tarkoitettu. Minimi on 1 ja maksimi on 5-->
          <div class="participants">
            <label for="participants">Amount of people </label>
            <input
              id="participants"
              type="number"
              class="input"
              min="1"
              max="5"
              bind:value={participants}
            />
          </div>
          <!--Input kenttä ehdotuksen aktiivisuudelle-->
          <div class="activity">
            <label for="activity"> Activity level </label>
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
            <button
              disabled={!valid}
              class="submit-button"
              type="submit"
              raised
              color="blue">Submit idea</button
            >
          </div>
        </form>
      </div>
    </div>
  {/if}
  {#if show}
    <Email />
  {/if}
</div>

<style>
  .flex {
    margin: auto;
    display: flex;
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
    margin: auto;
  }
  form {
    width: 90%;
    max-width: 800px;
    text-align: center;
    /* background-color: rgb(159, 180, 253); */
    border-radius: 50px;
    padding: 0 2vh 5%;
    margin-bottom: 40px;
    /* box-shadow: -2px 5px 15px -7px rgba(83, 83, 83, 0.32); */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1.4fr 1.2fr 1fr;
    gap: 1em;
  }

  .submit-button {
    background-color: blue;
    color: whitesmoke;
    margin: auto;
    border: none;
    padding: 1em;
    width: max-content;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 10px;
  }

  .submit-button:disabled {
    background-color: rgb(244, 244, 250);
    color: lightslategray;
  }

  .submit-button:disabled:hover {
    background-color: rgb(198, 198, 209);
  }

  .type {
    grid-column: 4/5;
  }

  .name {
    grid-column: 1/4;
    grid-row: 1;
  }
  .participants {
    grid-column: 1;
    grid-row: 2;
    width: fit-content;
  }
  .activity {
    grid-column: 2/5;
    grid-row: 2;
  }

  .type,
  .activity,
  .participants,
  .name {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  label {
    text-align: left;
  }
  input {
    /* border-radius: 10px; */
    outline: none;
    border: none;
    background-color: rgb(159, 180, 253);
    padding: 2vh;
  }

  select, option {
    border: none;
    outline: none;
    border-radius: 0px;
    background-color: rgb(159, 180, 253);
    padding: 2vh;
  }

  .submit {
    text-align: right;
    grid-column: 1 / 5;
    display: flex;
  }
  

  @media (max-width: 500px) {
    form {
      width: 90%;
      display: flex;
      flex-direction: column;
      grid-template-columns: none;
      grid-template-rows: none;
    }

    .participants, .type, .name{
      width: 100%;
    }
    label {
      padding-right: 1px;
    }
  }
</style>
