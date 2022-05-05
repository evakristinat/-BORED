<script>
  import PageHeader from './PageHeader.svelte'
  import { slide } from 'svelte/transition'

  // näihin asetetaan formista saadut tiedot
  let name = ''
  let type = 'chill'
  let participants = ''
  let activity = 0.5

  // addActivity lisää aktiviteetin tietokantaan
  const submitForm = () => {
    const newActivity = {
      accessibility: activity,
      activity: name,
      participants: participants,
      type: type,
    }
    fetch(
      'https://bored-svelte-default-rtdb.europe-west1.firebasedatabase.app/.json',
      {
        method: 'POST',
        body: JSON.stringify(newActivity),
      }
    )
      .then((response) => console.log(response))
      .catch((err) => console.error(err))
  }
</script>

<div class="container" transition:slide={{ duration: 900 }}>
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
          <label for="name">Name of the suggestion</label>
          <input type="text" id="name" class="input" bind:value={name} />
        </div>

        <!--Select kenttä, jossa valitaan mihin kategoriaan ehdotettava aktiviteetti kuuluu-->
        <div class="type">
          <label for="type">Which category does the suggestion fall under </label>
          <select id="type" name="type" class="input" bind:value={type}>
            <option value="chill">Chill</option>
            <option value="active">Active</option>
            <option value="social">Social</option>
          </select>
        </div>
        <!--Input valinta kuinka monelle ihmisille aktiviteetti on tarkoitettu. Minimi on 1 ja maksimi on 5-->
        <div class="participants">
          <label for="participants">For how many people is the activity for </label>
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
          <label for="activity"> How much effort does the activity require </label>
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
            >Submit idea</button
          >
        </div>
      </form>
    </div>
  </div>
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
    background-color: rgb(159, 180, 253);
    border-radius: 50px;
    padding: 5%;
    margin-bottom: 40px;
    box-shadow: -2px 5px 15px -7px rgba(83, 83, 83, 0.32);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 2fr 1fr;
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

  .type {
    grid-column: 2;
  }

  .name {
    grid-column: 1;
    grid-row: 1;
  }
  .participants {
    grid-column: 1;
    grid-row: 2;
  }
  .activity {
    grid-column: 2;
    grid-row: 2;
  }

  .type,
  .activity,
  .participants,
  .name {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  label {
    justify-self: left;
    text-align: left;
  }
  input {
    border-radius: 10px;
    outline: none;
    border: none;
  }

  .submit {
    text-align: right;
    grid-column: 1 / 3;
    display: flex;
  }

  @media (max-width: 400px) {
    form {
      width: 90%;
    }
    label {
      padding-right: 1px;
    }
  }
</style>
