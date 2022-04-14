<script>
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import { Button } from 'svelte-mui';

  const dispatch = createEventDispatcher();


</script>

<div class="container" transition:slide={{ duration: 900 }}>
  <div class="welcome">
    <h1>Welcome</h1>
    <h2>
      During the pandemic figuring out what to do isn't always easy but by answering a few questions we can find you just the right thing
    </h2>

    <div class="cta">
      <Button on:click={() => dispatch('options')} raised color="blue"
        >Get something to do!</Button
      >
    </div>
  </div>

  <div class="content">
    <h3>Features</h3>
    <p>If you're up for anything try random or browse!</p>

    <div class="flexbox">
      <div id="browse" on:click={() => dispatch('browse')}>
        <h2 id="browseHeader">BROWSE</h2>
        <p>
          Browse on suggestions of different categories and decide for yourself
        </p>
      </div>

      <div id="random" on:click={() => dispatch('random')}>
        <h2 id="randomHeader">RANDOM</h2>
        <p>Get random suggestions on what to do until you find what you want</p>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    height: 100%;
    background-color: rgb(234, 234, 245);
    overflow: hidden;
    contain: content;
  }

  .content{
    bottom: 0px;
    background-color: rgba(46, 47, 51, 0.89);
    height: 50%;
    padding-bottom: 1%;
    margin: 0;
  }

  .welcome {
    height: 30vh;
    padding: 20px 0% 50px ;
    box-shadow: -2px 5px 15px -7px rgba(83, 83, 83, 0.32);
  }

  h1 {
    margin: 0px;
    padding-top: 3vh;
    padding-bottom: 2vh;
  }

  .welcome > h2 {
    font-size: 1.2em;
    font-weight: 400;
    max-width: 800px;
    margin: auto;
  } h3{
    width: 90%;
    padding-top: 4vh;
    padding-bottom: 1vh;
    margin: auto;
    font-size: 1.5em;
    font-weight: 500;
    color: white;
  }
  .content > p{
    font-size: 1em;
    color: rgba(255, 255, 255, 0.904);
    padding-top: 1vh;
    padding-bottom: 3vh;
  }

  #browse {
    background-color: rgba(177, 177, 177, 0.349);
  }
  #random {
    background-color: rgba(236, 232, 240, 0.363);
  }

  #browse > h2,
  #random > h2 {
    font-size: 1.1em;
    font-weight: 500;
    background-color: rgb(255, 255, 255);
    width: 100%;
    padding: 7% 0% 6%;
    margin-top: 0px;
    cursor: pointer;
  }

  #browse > p,
  #random > p {
    font-size: 1em;
    width: 90%;
    margin: auto;
    text-align: left;
    color: white;
    padding-top: 1%;
    padding-bottom: 4%;
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
    display: flex;
    max-width: 800px;
    margin: auto;
    width: 90%;
    padding-bottom: 1vh;
    justify-content: space-around;
  }

  .flexbox > div {
    outline: solid 1px rgba(141, 140, 140, 0.048);
    margin: 2%;
    box-shadow: -2px 5px 15px -7px rgba(83, 83, 83, 0.32);
    transition: 0.9s;
    border-radius: 3px;
    cursor: pointer;
  }

  .flexbox > div:hover {
    box-shadow: -2px 5px 15px -1px rgba(83, 83, 83, 0.32);
  }



  @media (max-width: 400px) {
    .container {
      padding-top: 5vh;
      height: 95%;
      margin: auto;
    }

    .welcome {
      padding-bottom: 2vh;
      margin: auto;
    }
    h1 {
      font-size: 1.2em;
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
      height: 30%;
      margin-top: 4vh;
      padding: 0;
      margin-left:0;
      margin-right: 0;
    }
    #browse > p,
    #random > p {
      font-size: 0.9em;
    }
  }
</style>
