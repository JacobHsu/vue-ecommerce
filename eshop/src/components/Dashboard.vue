<template>
  <div>
      <Navbar/>

      <div class="container-fluid">
        <div class="row">
          <Sidebar></Sidebar>
          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <h1 class="h2">Dashboard</h1>
            <router-view></router-view>
          </main>

        </div>
      </div>    
  </div>
</template>

<script>
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default {
  components: {
    Sidebar,
    Navbar,
  },
};
</script>
