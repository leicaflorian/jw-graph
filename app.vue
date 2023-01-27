<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script lang="ts">
import 'bootstrap'

export default {
  name: 'App',
  setup () {
    onBeforeMount(() => {
      document.querySelector('html').dataset.bsTheme = 'dark'
    })

    return {}
  }
}

</script>

<style lang="scss">
@import "assets/app";
</style>
