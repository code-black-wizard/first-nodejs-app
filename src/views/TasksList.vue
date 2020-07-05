<template>
  <div class="container">
    <div class="row justify-content-center">
      <div v-for="task in tasks" :key="task._id" class="col-sm-12 col-md-6 mb-4">
        <div class="card position-relative">
          <div class="card-body">
            <h5 class="card-title">{{ task.title }}</h5>
            <p class="card-text">{{ task.description.length > 100 ? `${task.description.slice(0, 100)}...` : task.description }}</p>
            <a href="#" class="btn btn-primary">Go details</a>
          </div>
          <div class="card-footer text-muted">
            {{ `${new Date(task.date).getFullYear()}/${new Date(task.date).getMonth() + 1}/${new Date(task.date).getDate()}` }}
          </div>
          <svg @click="removeTask(task._id)" width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x text-danger delete-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
            <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    removeTask(id) {
      this.$axios.delete(`/remove-task/${id}`)
        .then(res => {
          this.getTasks()
          this.$notify({
            group: 'success',
            title: res.data,
            type: 'success'
          })
        })
        .catch(err => {
          this.$notify({
            group: 'error',
            title: err.response.data.message,
            type: 'error' 
          })
        })
    },
    getTasks() {
      this.$axios.get('/get-tasks')
        .then(res => {
          this.tasks = res.data
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    }
  },
  created() {
    this.getTasks()
  }
}
</script>

<style lang="scss" scoped>

  .delete-icon {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

</style>