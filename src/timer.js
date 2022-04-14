
import { tweened } from 'svelte/motion';

let time = 10;
const timer = tweened(time, { duration: time *1000 });


export default timer;
