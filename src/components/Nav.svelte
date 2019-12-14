<script>
  import {link} from 'svelte-spa-router';
</script>


<header class="navbar">
  <section class="navbar-section">
    <a href="/" class="btn btn-link" use:link>Инфо</a>
    <a href="/clients" class="btn btn-link" use:link>Клиенты</a>
    <a href="/invoices" class="btn btn-link" use:link>Счета</a>
  </section>
  <section class="navbar-center">
    <!-- centered logo or brand -->
  </section>
  <section class="navbar-section">
    <a href="/tools" class="btn btn-link" use:link>Инструметы</a>
  </section>
</header>