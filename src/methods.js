import db from './db';
import notifier from 'codex-notifier';


function base() {
		
return {
		//Форматирование цен
		digital: (num) => {
			return num.toLocaleString("ru-RU", {style:'currency', currency:'RUB', minimumFractionDigits:0})
		},
		addClient: async (item) => {
			await db.clients.add(item);
		},

		editClient: async (client, item) => {
			await db.clients.update(client, item);
		},

		deleteClient: async (client) => {
			let count = await db.invoices.where('client').equals(client).count();
			if(count === 0){
				await db.clients.delete(client);
			} else {
				notifier.show({
					message: `Client have ${count} invoice`,
					style: 'error',
					time: 5000 
				});
			}
		},

		getClient: async (client) => {
			return await db.clients.get(client);
		},

		getClients: async () => {
			return await db.clients.reverse().toArray();
		},

		getClientInvoices: async (client) => {
			return await db.invoices.where('client').equals(client).reverse().toArray();
		},

		addInvoice: async (item) => {
			await db.invoices.add(item);
		},

		selectInvoice: async (id) => {
			return await db.invoices.get(id);
		},

		editInvoice: async (id, item) => {
			await db.invoices.update(id, item);
		},

		deleteInvoice: async (id) => {
			await db.invoices.delete(id);
		},

		getAllInvoices: async () => {
			return await db.invoices.reverse().toArray();
		},

		getInvoicesKey: async (key) => {
			return await db.invoices.where('paid').equals(key).reverse().toArray();
		},

		//Подборки за промежутки времени
		getMonth: async (from, to) => {
			return await db.invoices.where('datecreate').between(from, to, true, true).toArray();
		}
	}
}

export const store = base()
