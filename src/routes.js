import Index from './Index.svelte';
import Dashboard from './Dashboard.svelte';
import Main from './Main.svelte';
import Client from './Client.svelte';
import InvoicesList from './InvoicesList.svelte';
import Tools from './Tools.svelte';


export const routes = {
  '/': Dashboard,
  '/invoices': InvoicesList,
  '/clients': Main,
  '/client/:id': Client,
  '/tools': Tools,
  '*': Index,
}