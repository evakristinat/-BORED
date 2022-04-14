<script>
  import { Button } from 'svelte-mui';
  import { getContext } from 'svelte';
 

  //getContextin avulla setsetsetActivityType päivittyy suoraan app-komponenttiin.
  const setActivityType = getContext('setActivityType');

  const active =
    '&type=charity&type=music&type=diy&type=recreational';
  const chill = 'type=cooking&type=relaxation&type=busywork&type=educational';
  const social = 'type=social';
</script>

<div class="container">

  <div class="buttongroup">
    <div>
      <Button
        id="chill"
        on:click={() => {
          setActivityType(chill);
        }}
        raised
        fullWidth
        color="rgb(250, 252, 246)"
      >
        <img src="../glass.png" alt="glass" width="50" />
        <label for="chill">CHILL </label>
      </Button>
    </div>

    <div>
      <Button
        id="active"
        on:click={() => {
          setActivityType(active);
        }}
        raised
        fullWidth
        color="rgb(250, 252, 246)"
      >
        <img src="../basketball.png" alt="basketball" width="40" />
        <label for="active"> ACTIVE </label>
      </Button>
    </div>

    <div>
      <Button
        id="social"
        on:click={() => {
          setActivityType(social);
        }}
        raised
        fullWidth
        color="rgb(250, 252, 246)"
      >
        <img src="../speakers.png" alt="speaker" width="40" />
        <label for="social"> SOCIAL </label>
      </Button>
    </div>
  </div>
</div>

<style>
  .container {
    width: 91%;
    max-width: 813px;
    margin: auto;
    background-color: rgba(234, 234, 245, 0.87);
    overflow: hidden;
    contain: content;
  }
  .buttongroup {
    display: flex;
    justify-content: space-between;
    padding-top: 0px;
    width: 100%;
    height: 50px;
    align-content: flex-end;
  }

  .buttongroup > div {
    width: 40%;
    min-height: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1%;
  }
  img {
    justify-self: left;
    margin: 0px;
    padding: 0px;
  }

  label {
    padding-right: 20px;
    padding-left: 1%;
  }

  @media (max-width: 600px) {
    label {
      padding-right: 0px;
    }

    .buttongroup {
    display: flex;
    justify-content:space-between;
    padding-top: 0px;
    width: 90%;
    margin: auto;
    height: 50px;
  }
    .buttongroup > div {
    width: 32.5%;
    min-height: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px;
  }
 
  }

</style>
