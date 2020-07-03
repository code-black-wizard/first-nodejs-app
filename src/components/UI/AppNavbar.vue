<template>
  <nav class="navbar navbar-expand-lg navbar-dark app-navbar mb-5">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" exact class="nav-link">Create task</router-link>
          </li>
          <li class="nav-item">
            <router-link to="tasks-list" class="nav-link">Tasks</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .app-navbar {
    background: #6f42c1;
  }
</style>