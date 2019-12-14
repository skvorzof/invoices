<script>
  import { onMount } from 'svelte';
  import {push} from 'svelte-spa-router';
    
  import {store} from './methods';

  
  export let client = {};
  export let params = {};
  let id = parseInt(params.id);

function editClient(){
  let editClient = {
    name: client.name
  }
  store.editClient(client.id, editClient);
  push(`/clients`);    
}

function deleteClient() {
  store.deleteClient(client.id);
  push(`/clients`);
}

onMount(async () => {
  client = await store.getClient(id);
});

</script>
<div>
  <input type="text" bind:value={client.name}>
  <button on:click={editClient}>save</button>
  <button on:click={deleteClient}>del</button>
  <button on:click={() => push(`/clients`)}>cancel</button>
</div>