<script>
  import PageHeader from './PageHeader.svelte';
  import { slide } from 'svelte/transition';

  // näihin asetetaan formista saadut tiedot
  let name = '';
  let type = 'chill';
  let participants = '';
  let activity = 0.5;

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
      .catch((err) => console.error(err));
  };
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
        <label for="name"
          >Name of the suggestion<br /><input
            type="text"
            id="name"
            class="input"
            bind:value="{name}"
          /></label
        >

        <!--Select kenttä, jossa valitaan mihin kategoriaan ehdotettava aktiviteetti kuuluu-->
        <label for="type"
          >What category does the suggestion fall in<br />
          <select id="type" name="type" class="input" bind:value="{type}">
            <option value="chill">Chill</option>
            <option value="active">Active</option>
            <option value="social">Social</option>
          </select>
        </label>

        <!--Input valinta kuinka monelle ihmisille aktiviteetti on tarkoitettu. Minimi on 1 ja maksimi on 5-->
        <label for="participants"
          >For how many people is the activity<br />
          <input id="participants" type="number" class="input" min="1" max="5" bind:value="{participants}" />
        </label>

        <!--Input kenttä ehdotuksen aktiivisuudelle-->
        <label for="activity">
          How active to do the suggestion<br />
          <div class="activity">
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
        </label>

        <button class="submit-button" type="submit" raised color="blue"
          >Submit idea</button
        >
      </form>
    </div>
  </div>
</div>

<style>
  .container {
    background-color: rgb(234, 234, 245);
    height: 100%;
    overflow: hidden;
    contain: content;
  }

  .activity {
    padding: 5%;
    display: grid;
  }

  form {
    width: 90%;
    max-width: 800px;
    text-align: center;
    background-color: rgb(159, 180, 253);
    border-radius: 50px;
    padding: 2%;
    margin-bottom: 40px;
    box-shadow: -2px 5px 15px -7px rgba(83, 83, 83, 0.32);
    display: grid;
  }
  .submit-button {
    background-color: blue;
    margin: auto;
    border: none;
    padding: 2px;
    width: max-content;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 10px;
  }

  #name {
    width: 150%;
    height: 50%;
    border-radius: 5px;
  }

  #type {
    width: 20%;
    height: 50%;
  }

  #participants {
    width: 15%;
  }

  .flex {
    margin: auto;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    max-width: 800px;
  }

  label {
    justify-self: left;
    text-align: left;
    padding-right: 3em;
    margin: 5px;
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
