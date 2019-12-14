<script>
	import { onMount } from 'svelte';
	import {push} from 'svelte-spa-router';

  import {store} from './methods';


	import Modal from './components/Modal.svelte';
	import Invoice from './Invoice.svelte';


	let curClientActive, curInvoiceActiv;
	let clientModal = false;
	let invoiceModal = false;
	let currentClient = 0;
	let clients = [];
	let invoices = [];
	let invoice = {};

	let name = '', title = '', description = '', cost = '', paid;

onMount(() => {
	 getClients();
});

async function getClients(){
	clients = await store.getClients();
}

function addClient(){
	let newClient = {name: name}
	store.addClient(newClient);
	clientModal = false;
	name = '';
	getClients();
}

async function addInvoice(){
	let newInvoice = {
		client: currentClient,
		title: title,
		description: description,
		cost: cost,
		paid: 0,
		datecreate: new Date().toISOString(),
		datepaid: null
  }
	store.addInvoice(newInvoice)
	getClientInvoices(currentClient);
	invoiceModal = false;
	title = '';
	description = '';
	cost = '';
}

async function selectInvoice(id){
	invoice = await store.selectInvoice(id);
}

async function getClientInvoices(id){
	//Не очищать документы у текущего клиента
	if(currentClient !== id){
		invoice = {};
	}
	currentClient = id;
	invoices = await store.getClientInvoices(currentClient)
}

async function updateInvoicesList(e){
	// getClientInvoices(e.detail);
	invoices = await store.getClientInvoices(e.detail);
}

</script>

<h1>Клиенты</h1>

<section class="flex">

	<div class="col1">
	<ul class="menu">
			{#each clients as client (client.id)}
			<li class="menu-item">
				<div
					class:active={curClientActive === `c_${client.id}`}
					on:click={() => curClientActive = `c_${client.id}`}
					on:click={() => getClientInvoices(client.id)}>
					 {client.name}
				</div>
				<div 
					class="menu-badge"
					on:click={()=> {push(`/client/${client.id}`)}}>
					<i class="icon icon-more-vert"></i>
				</div>
			</li>
			{:else}
				<li class="menu-item">... not client</li>
			{/each}
			<li class="divider"></li>
			<button class="btn btn-link" on:click="{() => clientModal = true}">+ новый клиент</button>
		</ul>
	</div>

	<div class="col1">
	<ul class="menu">
		{#each invoices as invoice (invoice.id)}
			<li class="menu-item"
				class:active={curInvoiceActiv === `c${invoice.id}`}
				on:click={() => curInvoiceActiv = `c${invoice.id}`}
				on:click={() => selectInvoice(invoice.id)}>
				{invoice.title}
			</li>
			{:else}
			<li class="menu-item">... нет счетов</li>
		{/each}
			<li class="divider"></li>
			{#if currentClient !== 0}
				<button class="btn btn-link" on:click="{() => invoiceModal = true}">+ новый счёт</button>
			{/if}
		</ul>
	</div>

	<div class="col2">
		<Invoice {invoice} on:updateInvoicesList={updateInvoicesList}/>
	</div>

</section>

{#if clientModal}
	<Modal on:close="{() => clientModal = false}">
		<h2 slot="header">Add client</h2>
			<!-- svelte-ignore a11y-autofocus -->
			<input autofocus type="text" bind:value={name} placeholder="Client">
			<button on:click={addClient}>add</button>
	</Modal>
{/if}

{#if invoiceModal}
	<Modal on:close="{() => invoiceModal = false}">
		<h2 slot="header">Add invoice</h2>
		<!-- svelte-ignore a11y-autofocus -->
		<input autofocus type="text" bind:value={title} placeholder="Title">
		<input type="text" bind:value={description} placeholder="Description">
		<input type="text" bind:value={cost} placeholder="Cost">
		<button on:click={addInvoice}>add</button>
	</Modal>
{/if}