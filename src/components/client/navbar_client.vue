<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand bg-dark" to="/"><i class="fas fa-film"></i></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav m-auto">
          <li class="nav-item">
          </li>
        </ul>
        <router-link class="nav-link text-dark" to="/login"><i class="fas fa-user"></i> 登入管理</router-link>
      </div>
    </nav>
  </div>  
</template>


<style scoped>
  .navbar-light .navbar-brand:hover, .navbar-light .navbar-brand:focus {
    color: #f1f1f1
  }
  .navbar-collapse {
    opacity: .8;
  }
  .navbar-brand {
    color: #f7f7f7;
    padding: .75rem;
    box-shadow: none; 
  }
</style>

