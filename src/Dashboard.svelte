<script>
	import { onMount } from 'svelte';
  import {store} from './methods';
  import Chart from './components/Chart.svelte';

let invoices = [];

let obj = getMonth()


async function get() {
  invoices = await store.getAllInvoices();
}

async function getMonth(){

  const data =  await store.getAllInvoices();

function getFormatedDate(dateStr){
  let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let date = new Date(dateStr);
  return month[date.getMonth()];
}

let rows = data.forEach((item) => {
  let d = getFormatedDate(item.datecreate);

    if(obj[d]){
      obj[d].push(item)
    }else{
      obj[d] = [item]
    }
});

  let keys = Object.keys(obj)

  let label = [];
  let create = [];
  let paid = [];

  for (let i = 0; i < keys.length; i++) {
    label.push(keys[i])
    create.push(Object.values(obj[keys[i]]).filter(f => f.paid === 0).reduce((a, b) => +a + +b.cost, 0))
    paid.push(Object.values(obj[keys[i]]).filter(f => f.paid === 1).reduce((a, b) => +a + +b.cost, 0))
  }

  return {label, create, paid}

}

// Формирование отчета
$: total = invoices.reduce((a, c) => +a + +c.cost, 0);
$: paid = invoices.filter(f => f.paid === 1).reduce((a, c) => +a + +c.cost, 0);
$: nopaid = invoices.filter(f => f.paid === 0).reduce((a, c) => +a + +c.cost, 0);

onMount(() => {
  get();
});
</script>

<h1>Информация</h1>

<div class="flex">
  <div class="col">
    <h1>{store.digital(nopaid)}</h1>
    <b>Не оплачено:</b>
  </div>
  <div class="col">
    <h1>{store.digital(total)}</h1>
    <b>Запланировано:</b>
  </div>
  <div class="col">
    <h1>{store.digital(paid)}</h1>
    <b>Оплачено:</b>
  </div>
</div>

<Chart {obj}/>