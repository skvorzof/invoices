<script>
import db from '../db';
import Dexie from 'dexie';
import "dexie-export-import";
import FileSaver from 'file-saver';
import notifier from 'codex-notifier';


let file;
	
const changed = (e) =>{
  file = e.target.files[0];
}

async function importDatabase(){
  try {
    if (!file) throw new Error(`Only files can be dropped here`);
    await db.delete();
    await new Dexie.import(file);
    notifier.show({
        message: 'База импортирована успешно',
        style: 'success',
        time: 5000 
    });
  } catch (error) {
    notifier.show({
        message: `importDatabase ${error}`,
        style: 'error',
        time: 5000 
    });
  }
}


async function exportDatabase() {
  try {
    const blob = await db.export({prettyJson: true});
    FileSaver.saveAs(blob, "dexie-export.json", "application/json");
  } catch (error) {
    notifier.danger(`Export from file db.js ${error}`);
  }
}

</script>

<section class="flex">

  <div class="col1">
    <h2>Экспорт</h2>
    <button class="btn btn-primary" on:click={exportDatabase}>Сохранить</button>
  </div>

  <div class="col1">
    <h2>Импорт</h2>
    <form on:submit|preventDefault={importDatabase}>
      <div class="input-group">
        <input
          class="form-input" 
          on:change={changed}
          type="file" bind:files={file}>
        <button class="btn btn-primary">Импортировать</button>
      </div>
    </form>
  </div>

</section>