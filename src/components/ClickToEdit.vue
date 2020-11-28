<template>
  <div>
    <input
      type="text"
      :name="inputId"
      :id="'input' + inputId"
      class="w-full pl-1 my-auto"
      :class="{ hidden: !isEditing }"
      :value="title"
      @input="$emit('update:title', $event.target.value)"
      @blur="$emit('stop-edit')"
      @keyup.esc="$emit('stop-edit')"
      @keyup.enter="$emit('stop-edit')"
    />
    <label
      :for="inputId"
      class="w-full my-auto cursor-pointer"
      :class="{ hidden: isEditing }"
      >{{ title }}</label
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, watch } from "vue";

export default defineComponent({
  name: "ClickToEdit",
  props: {
    title: { type: String, required: true },
    isEditing: { type: Boolean, required: true },
    inputId: {
      type: String,
      default: () => Math.floor(Math.random() * 10000).toString(),
    },
  },
  emits: ["start-edit", "stop-edit", "update:title"],
  setup(props, { emit }) {
    watch(props, async () => {
      let inputField = document.querySelector(`#input${props.inputId}`);
      if (inputField instanceof HTMLInputElement) {
        await nextTick();
        inputField.focus();
      }
    });
    return {};
  },
});
</script>
