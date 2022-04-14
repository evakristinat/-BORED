<script>
  import { Textfield, Checkbox } from 'svelte-mui';
  import { Button } from 'svelte-mui';
  import { fly, fade, slide } from 'svelte/transition';
  import { getContext, onDestroy } from 'svelte';
  import timer from './timer';

  //selectedTodo saadaan app-komponentilta, joka saa sen random-komponentilta.
  export let selectedToDo = '';
  let email = '';
  let show = false;
  let state;

  //backHome navigoi takaisin etusivulle. Saa kontekstinsa app-komponentilta.
  const backHome = getContext('backHome');
  let checked = false;

  /*reaktiivisia deklaraatioita; päivittyvät automaattisesti, kun niiden arvo muuttuu.
    tämä on tarpeen, jotta validointia suoritetaan jatkuvasti, niin kauan kuin syötettä
    käsitellään*/
  $: valid = email.length > 5 && dotCorrect && symbolCorrect;
  $: dotCorrect =
    email.charAt(email.length - 4) === '.' || email.charAt(-5) === '.';
  $: symbolCorrect = email.search('@') !== -1;

  //kun timer päätyy nollaan kutsutaan backhome()
  $: if ($timer === 0) {
    backHome();
  }

  /*näyttää viestin ja asettaa timerille uuden arvon.
    timer alkaa laskea nykyisestä arvostaan annettuun arvoon*/
  const done = () => {
    show = true;
    timer.set(0);
  };

  //timer palautetaan alkuarvoonsa kun komponentti poistuu
  onDestroy(() => {
    timer.set(10);
  });
</script>

<div class="container">
  <section transition:slide>
    <h2>
      <span class="bigger">Great!</span> Now go {selectedToDo.toLowerCase()} and
      come back for more suggestions if you're still bored
    </h2>
    <h3>Get daily suggestions!</h3>
    <p>Receive daily suggestions on what to do and never be bored again.</p>

    <!-- tämä osio näytetään jos checked on false-->
    {#if !checked}
      <div class="checkbox" out:fade={{ delay: 650 }}>
        <Checkbox bind:checked
          ><p>I would like to receive suggestions</p></Checkbox
        >
      </div>
    {:else}
      <div
        class="emailInput"
        transition:fly={{ y: 100, duration: 800, delay: 1000 }}
      >
        <!--blur viittaa tilaan, jossa email-kenttä ei ole fokuksessa.
          Kun kenttää on klikattu ja siitä on poistuttu on:blur muuttaa 
          state-muuttujan tilaa, joka puolestaan vaikuttaa virheilmoituksen
          näyttämiseen-->
        <Textfield
          label="email"
          type="email"
          on:blur={() => (state = 'visited')}
          bind:value={email}
          message="this is a demo. nothing will happen"
        />
        <span class="submit-button">
          <!--nappi ei ole käytössä, jos validointi ei onnistu-->
          <Button on:click={done} disabled={!valid} raised={valid} dense
            >submit</Button
          >
        </span>
      </div>
      {#if state === 'visited' && !valid}
        <p class="error">please fill in your email in format: me@mail.com</p>
      {/if}

      {#if show}
        <p>Thank you. Your suggestions will be sent to {email}.</p>
        <p>
          <!--täällä näytetään timerin arvo-->
          <small>
            You will be transported back to the homepage in {$timer.toFixed(0)} seconds.
          </small>
        </p>
      {/if}
    {/if}
  </section>
</div>

<style>
  .container {
    overflow: hidden;
    contain: content;
    height: 100%;
  }
  section {
    width: 90%;
    max-width: 800px;
    margin: auto;
    overflow: hidden;
    contain: content;
  }

  h2 {
    font-size: 1.3em;
    font-weight: 600;
    padding: 90px 100px 190px;
    margin: 0;
  }

  .bigger {
    font-size: 1.5em;
  }

  .emailInput {
    width: 70%;
    max-width: 600px;
    padding-left: 3em;
    display: flex;
    align-items: center;
    margin: auto;
  }
  .checkbox {
    margin: auto;
    width: 300px;
  }

  .submit-button {
    margin: 2%;
  }

  .error {
    color: darkred;
    font-size: 0.9em;
  }

  @media (max-width: 400px) {
    section {
      width: 90%;
    }
    h2 {
      padding: 15% 2%;
    }
  }
</style>
