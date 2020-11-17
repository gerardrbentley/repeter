<template>
  <input
    :id="checkboxId"
    class="toggle hidden"
    type="checkbox"
    :value="isChecked"
  />
  <label :for="checkboxId" @click="$emit('update:isChecked', !isChecked)"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-8 w-8 my-auto cursor-pointer"
      :class="{ 'text-gray-50': isChecked }"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        :d="
          isChecked
            ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            : 'M9 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
        "
      /></svg
  ></label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isChecked: Boolean,
    checkboxId: {
      type: String,
      default: function () {
        return Math.floor(Math.random() * 10000).toString();
      },
    },
  },
});
</script>

<style>
</style>