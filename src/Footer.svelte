<script>
  import { fade } from 'svelte/transition'
</script>

<footer out:fade={{ duration: 1000 }}>
  <p id="credit">Made possible by boredapi.com</p>
</footer>

<style>
  #credit {
    position: absolute;
    display: block;
    width: 100%;
    bottom: 0;
    margin:0;
    height: 5%;
    padding-top: 0.5em;
    color: lightgrey;
    background-color: rgb(254, 254, 254);
  }
  @media (max-width: 400px) {
    #credit {
      margin-top: 0;
      padding-top: 0.6em;
      font-size: 0.9em;
    }
  }
</style>
