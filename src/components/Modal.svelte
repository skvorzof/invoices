<script>
	import { createEventDispatcher, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	let modal;

</script>


<div class="modal-background"></div>

<div class="modal">
	<slot name="header"></slot>
	<slot></slot>

	<button on:click={close}>отмена</button>
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: white;
	}

	.modal {
		position: absolute;
		left: 50%; top: 50%;
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%,-50%);
		padding: 1em;
		border-radius: 0.2em;
		background: white;
		opacity: 1;
		display: block;
	}

	button {
		display: block;
	}
</style>