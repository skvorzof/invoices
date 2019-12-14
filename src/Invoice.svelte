<script>
  import { createEventDispatcher } from 'svelte';
  import notifier from 'codex-notifier';
  import format from 'date-format';
  const dispatch = createEventDispatcher();
      
  import {store} from './methods';

  import Pdf from './tools/Pdf.svelte';
    
  export let invoice;

  let editable = false;

// При выборе значения {paid} из списка, устанавливается дата
  let setDatepaid = null;
  $: if(setDatepaid === 1){
    setDatepaid = new Date().toISOString();
    editInvoice();
  }
     
// Блокировка редактирования документа, после отправки счёта - ввременно PDF
function lock(){
  invoice.lock = true;
  editInvoice();
}

function editInvoice(){
  let editInvoice = {
    lock: invoice.lock,
    title: invoice.title,
    description: invoice.description,
    cost: invoice.cost,
    paid: invoice.paid,
    datepaid: setDatepaid
  }
  
  store.editInvoice(invoice.id, editInvoice);
  dispatch('updateInvoicesList', invoice.client);
  editable = false;
}

function deleteInvoice() {
  if(invoice.lock){
    notifier.show({
        message: 'Invoice locked',
        style: 'error',
        time: 5000 
    });
  } else {
    store.deleteInvoice(invoice.id)
    dispatch('updateInvoicesList', invoice.client);
    invoice.id = undefined;
    editable = false;
  }
}

</script>

{#if invoice.id !== undefined}

<div class="panel">
  <div class="panel-header">
    <div class="panel-title">
      {#if invoice.lock}<span class="label label-error">locked</span>{/if}
      {#if invoice.paid === 1}<span class="label label-success"><i class="icon icon-emoji"></i></span>{/if}
    </div>
  </div>

  <div class="panel-nav">
    <!-- navigation components: tabs, breadcrumbs or pagination -->
  </div>


  {#if editable}
    <div class="panel-body">
      {#if invoice.lock}
        <label class="form-switch">
          <input type="checkbox" bind:checked={invoice.lock}>
          <i class="form-icon"></i> lock
        </label>
      {/if}
      <input type="text" bind:value={invoice.title}>
      <input type="text" bind:value={invoice.description}>
      <input type="text" bind:value={invoice.cost}>
      <select bind:value={invoice.paid} on:change="{() => setDatepaid = invoice.paid}">
        <option value={0}>no paid</option>
        <option value={1}>paid</option>
      </select>
    </div>
    <div class="panel-footer">
      {#if invoice.lock || invoice.paid === 1}
        <button class="btn btn-link" on:click={() => editable = false}>cancel</button>
      {:else}
        <button class="btn btn-link" on:click={editInvoice}>save</button>
        <button class="btn btn-link" on:click={deleteInvoice}>del</button>
        <button class="btn btn-link" on:click={() => editable = false}>cancel</button>
      {/if}
  </div>
  {:else}
    <div class="panel-body">
      <h3>{invoice.title}</h3>
      <p>{format('dd.MM.yy hh:mm:ss', new Date(invoice.datecreate))}</p>
      <p>{invoice.description}</p>
      <h5>{store.digital(parseInt(invoice.cost))}</h5>
      <p><span class="label">{invoice.paid === 1 ? 'Paid' : 'No paid'}</span>
        {#if invoice.paid === 1} {format('dd.MM.yy', new Date(invoice.datepaid))}{/if}</p>
    </div>
    <div class="panel-footer">
      <Pdf {invoice} on:lock={lock}/>
      <button class="btn btn-link" on:click={() => editable = true}>edit</button>
    </div>
  {/if}
  
</div>
{/if}

