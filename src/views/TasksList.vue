<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$axios.get('/get-tasks')
      .then(res => {
        console.log(res)
      })
  }
}
</script>

<style lang="scss" scoped>
</style>