<template>
  <div class="home">
    <PageMono />
  </div>
</template>

<script>
// @ is an alias to /src
import PageMono from '../router/PageMonochromatic.vue'

export default {
  name: 'Home',
  components: {
    PageMono
  }
}
</script>
