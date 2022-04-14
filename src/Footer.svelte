<script>
import {fade} from 'svelte/transition'
</script>
<footer out:fade={{duration:1000}}>
<p>Made possible by boredapi.com</p>
</footer>
<style>
p{
  height: 5%;
  padding-top: 0.2em;
  color:lightgrey;
}
@media(max-width:400px){
  p{
    margin: 0;
    padding-top: 0.5em;
    font-size: 0.7em;
  }
  
}
</style>