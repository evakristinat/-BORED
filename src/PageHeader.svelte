<script>
  // tämä komponentti on puhtaasti esittävä, mutta monikäyttöinen
  export let pageName = 'Page name';
</script>
<div class="container">
<header class="headers">
  <slot name="eyebrowHeader">
    <h3>{pageName.toUpperCase()}</h3>
  </slot>
  <slot name="pageHeader">
  
  </slot>
  <slot name="info">
    <p>info slot - this tells you what happens here</p>
  </slot>
</header>
</div>

<style>
  .container{
    width: 100%;
  }
  .headers {
    text-align: left;
    padding-bottom:3em;
    padding-top: 1em;
    width: 90%;
    max-width: 800px;
    margin: auto;
  }
</style>
