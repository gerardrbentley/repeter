<template>
  <Day dayName="11/16/2020"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Day from './components/Day.vue'

export default defineComponent({
  name: 'App',
  components: {
    Day
  }
})
</script>

<style>
#app {
  @apply w-full flex justify-center pt-6 bg-cool-gray-700 h-full;
}
</style>