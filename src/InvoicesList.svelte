<script>
	import { onMount } from 'svelte';
  import format from 'date-format';

  import {store} from './methods';

  let invoices = [];

  async function getAllInvoices(){
    invoices = [];
    invoices = await store.getAllInvoices();
  }

  async function getInvoicesKey(key){
    invoices = [];
    invoices = await store.getInvoicesKey(key);
  }
  
onMount(() => {
	getAllInvoices()
});
</script>

<h1>Счета</h1>

<div>
<button on:click={getAllInvoices} class="btn btn-link">все</button>
<button on:click={() => getInvoicesKey(1)} class="btn btn-link">оплаченые</button>
<button on:click={() => getInvoicesKey(0)} class="btn btn-link">не оплаченые</button>
</div>

<table class="table">
  <thead>
    <tr>
      <th>Создан</th>
      <th>Наименование</th>
      <th>Описание</th>
      <th>Цена</th>
      <th>Статус</th>
      <th>Дата оплаты</th>
    </tr>
  </thead>
  <tbody>
    {#each invoices as invoice (invoice.is)}
      <tr>
        <td>{format('dd.MM.yy hh:mm:ss', new Date(invoice.datecreate))}</td>
        <td>{invoice.title}</td>
        <td>{invoice.description}</td>
        <td>{store.digital(parseInt(invoice.cost))}</td>
        <td
          class:text-success={invoice.paid === 1}
          >{invoice.paid === 1 ? 'Оплачен' : 'Не оплачен'}</td>
        <td>{#if invoice.paid === 1} {format('dd.MM.yy hh:mm:ss', new Date(invoice.datepaid))}{/if}</td>
      </tr>
      {:else}
        <div>not result</div>
    {/each}
  </tbody>
</table>
