<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="row justify-content-between mb-4">
        <div class="col-md-6">
          <input @blur="fetchTasks(pagination = {})" placeholder="input title task..." v-model.trim="title" type="text" id="inputText" class="form-control" />
        </div>
        <div class="col-md-4">
          <select @change="changeLimit" class="form-select" aria-label="Default select example" v-model="pagination.limit">
            <option selected>Limit</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
      <div v-for="task in getTasks" :key="task._id" class="col-sm-12 col-md-6 mb-4">
        <div class="card position-relative">
          <div class="card-body">
            <h5 class="card-title">{{ task.title }}</h5>
            <p class="card-text">{{ task.description.length > 100 ? `${task.description.slice(0, 100)}...` : task.description }}</p>
            <router-link :to="`/task/${task._id}`" class="btn btn-primary">Go details</router-link>
          </div>
          <div class="card-footer text-muted">
            {{ `${new Date(task.date).getFullYear()}/${new Date(task.date).getMonth() + 1}/${new Date(task.date).getDate()}` }}
          </div>
        </div>
      </div>
      <Pagination @action="fetchTasks" :pagination="pagination" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/UI/AppPagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      tasks: [],
      pagination: {},
      title: ''
    }
  },
  methods: {
    fetchTasks (pagination = {}) {
      this.$axios.get('/tasks', {
        params: {
          ...this.pagination, ...pagination, title: this.title ? this.title : null
        }
      })
        .then(res => {
          this.tasks = res.data.data,
          this.pagination = res.data.pagination
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    changeLimit() {
      this.fetchTasks()
    }
  },
  computed: {
    getTasks() {
      return this.tasks
    }
  },
  created() {
    this.fetchTasks()
  }
}
</script>

<style lang="scss" scoped>
</style>