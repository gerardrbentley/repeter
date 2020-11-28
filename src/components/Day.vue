<template>
  <div class="rounded bg-gray-900 p-2">
    <div class="flex justify-between py-1">
      <h3 class="text-xl text-white">{{ dayName }}</h3>
      <button
        class="h-12 w-12 bg-green-600 hover:bg-green-800 px-2 pb-1 text-2xl text-white font-bold ml-1 rounded-tr-md rounded-b-md"
        @click="addTask()"
      >
        +
      </button>
    </div>
    <div class="text-sm mt-2">
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <div
            class="pl-2 px-1 py-1 dog-ear mb-1 border-b border-gray-700 text-xl font-semibold flex flex-row gap-3"
            :class="[
              task.completed
                ? cardColors[task.id % cardColors.length].dark
                : cardColors[task.id % cardColors.length].default,
              task.id === focusedTaskId ? 'md:h-28' : '',
            ]"
          >
            <check-box
              :isChecked="task.completed"
              @update:isChecked="
                updateTask({ ...task, completed: !task.completed })
              "
            ></check-box>
            <click-to-edit
              class="my-auto"
              :title="task.title"
              @update:title="updateTask({ ...task, title: $event })"
              :inputId="task.id.toString()"
              :isEditing="editId === task.id"
              @start-edit="editId = task.id"
              @stop-edit="editId = null"
            ></click-to-edit>
            <button
              class="h-12 w-12 bg-red-600 hover:bg-red-800 px-2 text-xl text-white font-bold ml-1 dog-ear my-auto"
              @click="removeTask(task)"
            >
              X
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, watch } from "vue";
import CheckBox from "./CheckBox.vue";
import ClickToEdit from "./ClickToEdit.vue";

import { Task, tasks, setTasks, swapFocus, focusedTaskId } from "../global";

const cardColors = [
  { default: "bg-red-500 hover:bg-red-800", dark: "bg-red-800" },
  { default: "bg-orange-500 hover:bg-orange-800", dark: "bg-orange-800" },
  { default: "bg-yellow-500 hover:bg-yellow-800", dark: "bg-yellow-800" },
  { default: "bg-green-500 hover:bg-green-800", dark: "bg-green-800" },
  { default: "bg-blue-500 hover:bg-blue-800", dark: "bg-blue-800" },
  { default: "bg-indigo-500 hover:bg-indigo-800", dark: "bg-indigo-800" },
  { default: "bg-purple-500 hover:bg-purple-800", dark: "bg-purple-800" },
  { default: "bg-pink-500 hover:bg-pink-800", dark: "bg-pink-800" },
];

export default defineComponent({
  name: "Day",
  components: {
    CheckBox,
    ClickToEdit,
  },
  props: {
    dayName: {
      type: String,
      required: true,
    },
  },
  emits: ["set-tasks"],
  setup: (props, { emit }) => {
    const editId = ref<number | null>(null);

    const removeTask = (toRemove: Task) => {
      if (tasks.value.length > 1) {
        if (focusedTaskId.value === toRemove.id) {
          swapFocus("next");
        }
        tasks.value = tasks.value.filter((task) => task.id !== toRemove.id);
      }
    };

    const addTask = () => {
      let latestTask =
        tasks.value.length > 0
          ? tasks.value.reduce((taskA, taskB) => {
              return taskA.id > taskB.id ? taskA : taskB;
            })
          : { id: 0 };
      let newT: Task = {
        id: latestTask.id + 1,
        title: `Task Num ${latestTask.id + 1}`,
        completed: false,
        duration: 60 * 10,
      };
      tasks.value = [newT].concat(tasks.value);
    };

    const updateTask = (newTask: Task) => {
      tasks.value = tasks.value.map((task) => {
        return task.id === newTask.id ? newTask : task;
      });
    };

    const updateEditId = (newId: number) => {
      editId.value = newId;
    };

    return {
      updateTask,
      tasks,
      cardColors,
      editId,
      removeTask,
      addTask,
      updateEditId,
    };
  },
});
</script>
