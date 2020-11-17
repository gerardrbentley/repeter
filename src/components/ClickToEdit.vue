<template>
  <div class="click-to-edit cursor-pointer flex-grow" @click="startEditing">
    <input
      type="text"
      :name="inputId"
      :id="'input' + inputId"
      class="w-full"
      :class="{ hidden: !isEditing }"
      :value="title"
      @input="$emit('update:title', $event.target.value)"
      @blur="$emit('stop-edit')"
      @keyup.esc="$emit('stop-edit')"
      @keyup.enter="$emit('stop-edit')"
    />
    <label :for="inputId" class="w-full" :class="{ hidden: isEditing }">{{
      title
    }}</label>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, nextTick } from "vue";

export default defineComponent({
  props: {
    title: String,
    isEditing: Boolean,
    inputId: {
      type: String,
      default: function () {
        return Math.floor(Math.random() * 10000).toString();
      },
    },
  },
  emits: ["start-edit", "stop-edit", "update:title"],
  setup(props, { emit }) {
    const startEditing = async () => {
      emit("start-edit");

      let inputField = document.querySelector(`#input${props.inputId}`);
      if (inputField instanceof HTMLInputElement) {
        await nextTick();
        inputField.focus();
      }
    };
    return { startEditing };
  },
});
</script>
