<script>
  import Random from './Random.svelte';
  import Options from './Options.svelte';
  import Browse from './Browse.svelte';
  import Start from './Start.svelte';
  import Header from './Header.svelte';
  import Email from './Email.svelte';
  import customActivities from './activities';
  import Footer from './Footer.svelte';
  import { onMount, setContext } from 'svelte';
  import { Icon } from 'svelte-mui';

  import { Router, links, Route, navigate } from 'svelte-routing';

  export let url = '';
  const header = 'corona-bored';

  let promise = new Promise((res)=> {
    res(['activity'])
  })
  let promiseOptions;
  let options;

  //activityTypeen sijoitetaan valittu tyyppi (active,chill,social)
  let activityType ='chill';
 
  /*setContext välittää activityType muuttujan päivittävän funktion
  categories-komponentille*/
  setContext('setActivityType', (type) => (activityType = type));

  //selected saa arvon kun käyttäjä valitsee ehdotuksen Random-komponentissa.
  //tieto välitetään sitten Email-komponentille näytettäväksi.
  let selected;

  /*randomNumber kertoo vaihtoehtoja hyödyntävälle ehdotushaulle osallistujien 
  määrän 2-4, koska käyttöliittymä ei mahdollista tarkan lukumäärän antoa*/
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 3) + 2;
  };

  //getToDo hakee aktiviteetin API:sta
  const getToDo = async (option) => {
    const response = await fetch(
      `http://www.boredapi.com/api/activity?${option}`
    );
    if (!response.ok) {
      throw new Error('Fetch unsuccessful');
    }
    return await response.json();
  };

  /*tämä funktio hakee ja käsittelee lupaukset aktiviteeteista. 
    käsittelyn jälkeen data lisätään storeen*/
  const getMany = async (type) => {
    let toDos = [];
    /*haetaan 8 (kaksi ylimääräistä) promisea tupla-arvojen varalta.
      syötetään uusia lupauksia taulukkoon */
    while (toDos.length < 8) {
      const option = getToDo(type);
      toDos = [...toDos, option];
    }

    /*luvataan kaikki taulukon lupaukset. data on vastaus, joka saadaan.
    varmistetaan, että kaikki tulokset olivat uniikkeja ja poistetan ylimääräiset jos niitä on.*/
    Promise.all(toDos)
      .then((data) => {
        let unique = [...new Set(data.map((activity) => activity.activity))];
        while (unique.length > 6) {
          unique.pop();
        }
        return unique;
      })
      .then((data) => {
        customActivities.add(data);
        return data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  /*funktiota kutsutaan aina kun tyyppi muuttuu ja alustusvaiheessa.
  Tämä hidastaa hieman alustamista, mutta se on mielestäni tässä tapauksessa hyväksyttävää. */
  $: getMany(activityType);

  /* Funktio saa tiedon käyttäjän antamista tiedoista options-komponentissa ja kokoaa ne yhteen
  käsiteltäväksi ja kutsuu niiden avulla ehdtotuksen noutavaa funktiota ja navigoi tuloksiin. */
  const getOptions = (ce) => {
    let randomNumber = getRandomNumber();
    const participants = ce.detail.social ? randomNumber : 1;
    options = `minaccessibility=0.0&maxaccessibility=${ce.detail.activity}&participants=${participants}`;
    promiseOptions = getToDo(options);
    console.log(options);
    navigate('result');
  };

  /*promsise alkuarvo random-ehdotukselle.*/

 onMount(()=>{
  promise = getToDo();
 })

  //päivittää ehdotuksen valinnoilla. Käytössä Options-komponentin läpikäymisen jälkeen.
  const promiseop = () => {
    promiseOptions = getToDo(options);
  };

  //päivittää random-ehdotuksen
  const newIdea = () => {
    promise = getToDo();
  };

  //hakee hyväksytyn tekemisehdotuksen ja asettaa sen selected muuttujaan, joka välitetään Email-komponentille.
  const getSelected = (ce) => {
    selected = ce.detail.innerText;
    navigate('email');
  };

  //jakaa email-komponentin kanssa kotisivulle navigoivan funktion
  setContext('backHome', () => {
    navigate('/');
  });
</script>

<!-- märitetään, että kohdellaan perinteisiä linkkejä router-linkkeinä-->
<div id="app" use:links>
  <!--Router-osion hyvin yksinkertaistettu pohja täältä: https://www.npmjs.com/package/svelte-routing -->
  <div class="container">
    <!--Routerin on sijaittava juurikomponentissa, mutta niitä voi lisätä sen jälkeen myös muualle-->
    <Router {url}>
      <Header>
        <a href="/" slot="header">{header}</a>
        <a id="1" href="/options" slot="1">Options</a>
        <a id="2" href="/random" slot="2">Random</a>
        <a id="3" href="/browse" slot="3">Browse</a>
      </Header>

      <!-- Seuraavaksi määritetään url-polut komponenteille
          navigate() ohjaa parametrina annetulle polulle-->
      <Route path="/"
        ><Start
          on:options={() => navigate('options')}
          on:random={() => navigate('random')}
          on:browse={() => navigate('browse')}
        /></Route
      >
      <Route path="options"
        ><Options
          rangelabel="How active are you feeling?"
          buttonLabel="Would you like to do something alone or with people?"
          on:send={getOptions}
        >
          <div slot="iconButton1">
            <Icon
              ><svg
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4ZM6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8ZM8 18C6.34315 18 5 19.3431 5 21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21C3 18.2386 5.23858 16 8 16H16C18.7614 16 21 18.2386 21 21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21C19 19.3431 17.6569 18 16 18H8Z"
                  fill="#0D0D0D"
                />
              </svg></Icon
            >
          </div>
          <div slot="iconButton2">
            <Icon
              ><svg
                fill="none"
                viewBox="0 0 24 24"
                height="25"
                width="25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M10 4C7.79086 4 6 5.79086 6 8C6 10.2091 7.79086 12 10 12C12.2091 12 14 10.2091 14 8C14 5.79086 12.2091 4 10 4ZM4 8C4 4.68629 6.68629 2 10 2C13.3137 2 16 4.68629 16 8C16 11.3137 13.3137 14 10 14C6.68629 14 4 11.3137 4 8ZM16.8284 3.75736C17.219 3.36683 17.8521 3.36683 18.2426 3.75736C20.5858 6.1005 20.5858 9.8995 18.2426 12.2426C17.8521 12.6332 17.219 12.6332 16.8284 12.2426C16.4379 11.8521 16.4379 11.219 16.8284 10.8284C18.3905 9.26633 18.3905 6.73367 16.8284 5.17157C16.4379 4.78105 16.4379 4.14788 16.8284 3.75736ZM17.5299 16.7575C17.6638 16.2217 18.2067 15.8959 18.7425 16.0299C20.0705 16.3618 20.911 17.2109 21.3944 18.1778C21.8622 19.1133 22 20.1571 22 21C22 21.5523 21.5523 22 21 22C20.4477 22 20 21.5523 20 21C20 20.3429 19.8878 19.6367 19.6056 19.0722C19.339 18.5391 18.9295 18.1382 18.2575 17.9701C17.7217 17.8362 17.3959 17.2933 17.5299 16.7575ZM6.5 18C5.24054 18 4 19.2135 4 21C4 21.5523 3.55228 22 3 22C2.44772 22 2 21.5523 2 21C2 18.3682 3.89347 16 6.5 16H13.5C16.1065 16 18 18.3682 18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21C16 19.2135 14.7595 18 13.5 18H6.5Z"
                  fill="#0D0D0D"
                />
              </svg></Icon
            >
          </div>
        </Options></Route
      >
      <Route path="random"
        ><Random
          header="random"
          {promise}
          on:new={newIdea}
          on:ok={getSelected}
        /></Route
      >
      <Route path="result"
        ><Random
          header="result"
          promise={promiseOptions}
          on:new={promiseop}
          on:ok={getSelected}
        /></Route
      >
      <Route path="browse"
        ><Browse on:new={() => getMany(activityType)} /></Route
      >
      <Route path="email"><Email selectedToDo={selected} /></Route>
    </Router>
  </div>
  <Footer />
</div>

<style>
  #app {
    text-align: center;
    margin: 0;
    height: 100%;
  }
  .container {
    contain: content;
    height: 95%;
  }

  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    padding: 0.3em;
  }

  @media (min-width: 400px) {
  }
</style>
