<script>
  import { getContext } from 'svelte'

  //getContextin avulla setActivityType päivittyy suoraan app-komponenttiin.
  const setActivityType = getContext('setActivityType')

  const active = '&type=charity&type=music&type=diy&type=recreational'
  const chill = 'type=cooking&type=relaxation&type=busywork&type=educational'
  const social = 'type=social'
</script>

<div class="container">
  <div class="buttongroup">
    <button
      class="icon-button"
      id="chill"
      on:click={() => {
        setActivityType(chill)
      }}
      raised
      fullWidth
      color="rgb(250, 252, 246)"
    >
    <span class="button-content">
      <span class="material-symbols-outlined"> self_improvement </span>
      CHILL </span>
    </button>

    <button
      class="icon-button"
      id="active"
      on:click={() => {
        setActivityType(active)
      }}
      raised
      fullWidth
      color="rgb(250, 252, 246)"
      ><span class="button-content"> 
      <span class="material-symbols-outlined"> sports_gymnastics </span>
      ACTIVE </span>
    </button>

    <button
      class="icon-button"
      id="social"
      on:click={() => {
        setActivityType(social)
      }}
    >
      <span class="button-content">
        <span class="material-symbols-outlined"> communication </span>
        SOCIAL</span
      >
    </button>
  </div>
</div>

<style>
  .container {
    width: 91%;
    max-width: 813px;
    margin: auto;
    min-height: fit-content;
    max-height: 400px;
  }
  .buttongroup {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    padding-top: 10px;
    height: 100%;
    width: 100%;
    min-width: 200px;
    contain: content;
  }

  .icon-button {
    border: none;
    width: 70%;
    min-width: 100px;
    box-shadow: 1px 5px 10px 0 rgba(20, 50, 150, 0.141),
      1px 5px 10px 0 rgba(23, 28, 158, 0.19);
    border-radius: 30px;
    padding: 1em;
    margin: 1em;
    text-align: center;
    background-color: rgb(159, 180, 253);
    cursor: pointer;
  }

  .icon-button:focus {
    background-color: blue;
  }

  .button-content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  @media (max-width: 600px) {
    .buttongroup {
      display: flex;
      justify-content: space-between;
      padding-top: 0px;
      width: 100%;
      margin: auto;
    }
  }
</style>
