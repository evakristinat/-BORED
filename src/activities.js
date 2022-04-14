/*Storea käyttää app ja browse. App täyttää sen sopivalla tiedolla ja 
browse näyttää tätä tietoa */
import { writable } from 'svelte/store';

const activities = writable([]);

const customActivities = {
  subscribe: activities.subscribe,
  add: (a) => {
    activities.set(a);
  },
};

export default customActivities;
