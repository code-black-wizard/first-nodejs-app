<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-12">
        <div class="card position-relative">
          <div class="card-body">
            <h5 class="card-title">{{ getTask.title }}</h5>
            <p
              v-if="!isEdit"
              class="card-text"
            >{{ getTask.description }}</p>
            <textarea v-else v-model.trim="description" @keypress.enter="updateTask(getTask._id)" class="form-control" id="FormControlTextarea1" rows="3"></textarea>
          </div>
          <div
            class="card-footer text-muted"
          >{{ `${new Date(getTask.date).getFullYear()}/${new Date(getTask.date).getMonth() + 1}/${new Date(getTask.date).getDate()}` }}</div>
          <div class="icon-cont">
            <svg
              @click="removeTask(getTask._id)"
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              class="bi bi-x text-danger"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
              />
              <path
                fill-rule="evenodd"
                d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
              />
            </svg>
            <svg @click="isEdit = !isEdit" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
              <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: {},
      isEdit: false,
      description: ''
    }
  },
  computed: {
    getTask() {
      return this.task
    }
  },
  methods: {
    removeTask(id) {
      this.$axios
        .delete(`/task/${id}`)
        .then(res => {
          this.$router.push({ name: 'TasksList' })
          this.$notify({
            group: 'success',
            title: res.data,
            type: 'success'
          })
        })
        .catch(err => {
          this.$notify({
            group: "error",
            title: err.response.data.message,
            type: "error"
          })
        })
    },
    updateTask(id) {
      if (this.description) {
        this.$axios.put(`/task/${id}`, { description: this.description })
          .then(res => {
            this.fetchTask()
            this.isEdit = !this.isEdit
            this.$notify({
              group: 'success',
              title: res.data,
              type: 'success'
            })
          })
          .catch(err => {
            this.$notify({
              group: "error",
              title: err.response.data.message,
              type: "error"
            })
          })
      }
    },
    fetchTask() {
      this.$axios
        .get(`/task/${this.$route.params.id}`)
        .then(res => {
          this.task = res.data;
          this.description = res.data.description
        })
        .catch(err => {
          console.log(err.response.data.message);
        })
    }
  },
  created() {
    this.fetchTask()
  }
}
</script>

<style lang="scss" scoped>

  .icon-cont {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

</style>