<script>
  export let header = 'Header';
  let clicked;
  let class1;
  let class2;
  let class3;

  /*getClicked asettaa asettaa clicked muuttujaan klikatun elementin id:n.
    ja muuttaa sitä vastaavan elementin luokan valituksi*/
  const getClicked = (e) => {
    clicked = e.target.id;
    class1 = clicked == 1 ? 'selected' : 'li';
    class2 = clicked == 2 ? 'selected' : 'li';
    class3 = clicked == 3 ? 'selected' : 'li';
  };
</script>

<div class="container">
  <div id="top-bar">
    <header>
      <h1 on:click={() => (clicked = 0)}>
        <slot name="header">{header}</slot>
      </h1>
      <slot name="option" />
    </header>
    <nav>
      <li id="1" on:click={getClicked} class={class1}><slot name="1" /></li>
      <li id="2" on:click={getClicked} class={class2}>
        <slot name="2" />
      </li>
      <li id="3" on:click={getClicked} class={class3}>
        <slot name="3" />
      </li>
    </nav>
  </div>
</div>

<style>
  .container {
    background-color: rgb(234, 234, 245);
  }
  #top-bar {
    width: 90%;
    max-width: 800px;
    margin: auto;
    display: flex;
    height: 10%;
    min-height: 90px;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
  }

  header {
    padding: 0;
    padding-right: 1.2em;
    font-size: 0.8em;
    text-align: left;
    min-width: 100px;
    max-width: 150px;
  }

  nav {
    margin-top: 1vh;
    background-color: rgb(234, 234, 245);
    color: rgb(59, 58, 58);
    width: 75%;
    display: flex;
    justify-content: space-evenly;
  }

  .li,
  li {
    width: 100%;
    font-size: 0.9em;
    font-weight: 600;
    display: inline-block;
    text-align: center;
    line-height: 40px;
    list-style: none;
  }
  li:hover {
    background-color: grey;
  }

  .selected {
    font-size: 1.2em;
    display: inline;
    list-style: none;
  }

  @media (max-width: 600px) {
    header {
      font-size: 0.6em;
      width: 25%;
    }
    nav {
      margin-bottom: 0.6em;
      list-style: none;
    }

    li {
      font-size: 1em;
      display: inline;
    }
  }

  @media (max-width: 400px) {
    header {
      padding-top: 2em;
      font-size: 0.6em;
      width: 25%;
    }
    li {
      font-size: 0.8em;
      display: inline;
    }
  }
</style>
