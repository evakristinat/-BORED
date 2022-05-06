<script>
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import { Button } from 'svelte-mui'

  const dispatch = createEventDispatcher()
</script>

<div class="container" in:fade={{ duration: 500 }}>
  <div class="welcome">
    <h1>Welcome</h1>
    <h2>
      Are you always bored? We have the answer! Whenever you’re feeling bored
      just click the random button or give us an idea for what you’re looking
      for and we’ll give you some ideas.
    </h2>

    <div class="cta">
      <Button on:click={() => dispatch('options')} raised color="blue"
        >Get something to do!</Button>
    </div>
  </div>

  <div class="custom-shape-divider-top-1639643395">
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
        class="shape-fill"
      />
    </svg>
  </div>

  <div class="content">
    <h3>Features</h3>
    <p>If you're up for anything try random or get ideas based on your preferences!</p>

    <div class="flexbox">
      <div id="optimized" on:click={() => dispatch('options')}>
        <span class="material-symbols-outlined"> clarify </span>
        <h2 id="optimizedHeader">OPTIMIZED</h2>
        <p>
          Get ideas based on your preferences and the amount of people you're with
        </p>
      </div>

      <div id="random" on:click={() => dispatch('random')}>
        <span class="material-symbols-outlined"> quiz </span>
        <h2 id="randomHeader">RANDOM</h2>
        <p>Get random suggestions on what to do until you find what you want</p>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    padding: 0px;
    height: 100%;
    overflow: hidden;
    contain: content;
    background-color: white;
  }

  .custom-shape-divider-top-1639643395 {
    /* position: absolute; */
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    /* transform: rotate(180deg); */
  }

  /*https://www.shapedivider.app/*/
  .custom-shape-divider-top-1639643395 svg {
    position: relative;
    display: block;
    width: calc(212% + 1.3px);
    height: 70px;
    background-color: rgb(234, 234, 245);
  }

  .custom-shape-divider-top-1639643395 .shape-fill {
    fill: white;
    outline: none !important;
    border: none !important;
    box-shadow: none;
  }

  .content {
    max-width: 800px;
    width: 89%;
    background-color: white;
    height: 50%;
    padding-bottom: 1%;
    margin: auto;
    min-height: 420px;
  }

  .welcome {
    /* color: rgb(255, 255, 255); */
    color: blue;
    margin-top: 0px;
    height: 38%;
    padding: 70px 0px 0px;
    background-color: rgb(234, 234, 245);
  }

  h1 {
    margin: 0px;
    padding-top: 3vh;
    padding-bottom: 2vh;
  }

  .welcome > h2 {
    font-size: 1.1em;
    font-weight: 400;
    width: 85vw;
    max-width: 800px;
    margin: auto;
    text-align: center;
    /* color: rgb(255, 255, 255); */
    color: blue;
  }
  h3 {
    padding-top: 4vh;
    padding-bottom: 1vh;
    margin: auto;
    font-size: 1.3em;
    font-weight: 500;
    color: darkgrey;
    text-align: left;
  }
  .content > p {
    font-size: 1em;
    color: grey;
    padding: 1vh, 0vh;
    width: 100%;
    text-align: left;
  }

  #optimized > p {
    background-color: rgba(231, 230, 230, 0.349);
  }
  #random > p {
    background-color: rgba(170, 166, 175, 0.363);
  }

  #optimized,
  #random {
    border-radius: 30px;
    contain: content;
    height: fit-content;
    border: none;
    outline: none;
  }

  #optimized > h2,
  #random > h2 {
    font-size: 1.1em;
    font-weight: 500;
    /* background-color: blue; */
    width: 100%;
    padding: 7% 0% 6%;
    margin-top: 0px;
    margin-bottom: 0px;
    cursor: pointer;
    color: blue;
  }

  #optimized > p,
  #random > p {
    font-size: 1em;
    width: auto;
    margin: auto;
    text-align: left;
    color: rgb(107, 105, 105);
    padding: 2vh 3vw 3vh 3vw;
    contain: content;
  }

  p {
    padding-top: 2vh;
    font-weight: 500;
    font-size: 1.4em;
    margin: auto;
    width: 90%;
  }

  .cta {
    margin-top: 4vh;
    margin-bottom: 1%;
  }

  .flexbox {
    margin-top: 3vh;
    display: flex;
    max-width: 800px;
    width: 100%;
    justify-content: space-around;
    gap: 2vw;
    contain: content;
  }

  .flexbox > div {
    outline: solid 1px rgba(141, 140, 140, 0.048);
    transition: 0.9s;
    cursor: pointer;
  }

  .flexbox > div:hover {
    box-shadow: -2px 5px 15px -1px rgba(83, 83, 83, 0.32);
  }

  @media (max-width: 600px) {
    h3 {
      padding-top: 2vh;
    }
    .container {
      height: 95%;
      margin: auto;
    }

    .content {
      min-height: fit-content;
    }

    .welcome {
      padding-top: 0;
      height: 40%;
      padding-bottom: 2vh;
      margin: auto;
    }
    h1 {
      font-size: 1.6em;
      padding: 6%;
      margin-bottom: 0;
    }

    h2 {
      padding: 0;
      margin: auto;
      font-size: 1em;
      width: 90%;
      font-weight: 600;
    }

    .flexbox {
      width: 100%;
      height: 50%;
      margin-top: 4vh;
      padding: 0;
      margin-left: 0;
      margin-right: 0;
    }
    #optimized > p,
    #random > p {
      font-size: 0.9em;
    }
  }

  @media (max-width: 400px) {
    h3 {
      padding-top: 2vh;
    }

    .welcome {
      min-height: 45vh;
      display: block;
    }
    .container {
      overflow: scroll;
    }
    .content {
      min-height: 80vh;
    }

    .flexbox {
      display: block;
      flex-direction: column;
      height: 70vh;
    }
    #random,
    #optimized {
      margin-top: 5vh;
      display: block;
    }
  }
</style>
