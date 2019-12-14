import Dexie from 'dexie';

const db = new Dexie("Invoices");
db.version(1).stores(
  {
    clients: '++id,name', 
    invoices: '++id,client,lock,title,description,cost,paid,datecreate,datesend,datepaid'
  }
);

export default db;