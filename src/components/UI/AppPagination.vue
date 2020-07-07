<template>
  <div class="d-flex justify-content-center">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" @click.prevent="prevPage" href="#">Previous</a></li>
        <li v-for="(item, index) in pagination.totalPages" :key="index" class="page-item"><a class="page-link" href="#" @click.prevent="fetchData(index)">{{ index + 1 }}</a></li>
        <li class="page-item"><a class="page-link" @click.prevent="nextPage" href="#">Next</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    }
  },
  methods: {
    fetchData(index) {
      this.$emit('action', {
        page: index + 1
      })
    },
    prevPage() {
      if (this.pagination.page > 1) {
        let page = this.pagination.page - 1
        this.$emit('action', {
          page
        })
      }
    },
    nextPage() {
      if (this.pagination.page < this.pagination.totalPages) {
        let page = this.pagination.page + 1
        this.$emit('action', {
          page
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>