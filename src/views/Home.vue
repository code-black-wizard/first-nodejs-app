<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <form @submit.prevent="createTask">
          <div class="mb-3">
            <label for="inputText" class="form-label">Task title</label>
            <input v-model.trim="task.title" type="text" id="inputText" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="FormControlTextarea1" class="form-label">Description task</label>
            <textarea v-model.trim="task.description" class="form-control" id="FormControlTextarea1" rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-dark custom-btn">Create task</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    createTask() {
      if (this.task.title && this.task.description) {
        this.$axios.post('/create-task', this.task)
          .then(res => {
            this.task.title = ''
            this.task.description = ''
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
      }
    }
  }
}
</script>

<style lang="scss">
  .custom-btn {
    background: #6f42c1;
  }
</style>
