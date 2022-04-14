import App from './App.svelte';

const app = new App({
	//hydrate lisätty reitityksen mahdollistamiseksi svelte-routing -ohjeistuksen mukaisesti
	hydrate: true,
	target: document.body,
});

export default app;