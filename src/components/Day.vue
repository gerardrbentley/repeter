<template>
  <div class="single-day flex-grow max-w-screen-sm rounded bg-gray-900 p-2">
    <div class="flex justify-between py-1">
      <h3 class="text-xl text-gray-50">{{ dayName }}</h3>
      <button
        class="bg-green-600 hover:bg-green-800 px-2 pb-1 text-2xl text-white font-bold ml-1 rounded-tr-md rounded-b-md"
        @click="addTask()"
      >
        +
      </button>
    </div>
    <div class="text-sm mt-2">
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <div
            class="p-2 rounded mt-1 border-b border-grey text-xl font-semibold flex flex-row gap-3"
            :class="
              task.completed
                ? cardColors[task.id % cardColors.length].dark
                : cardColors[task.id % cardColors.length].default
            "
          >
            <check-box v-model:isChecked="task.completed"></check-box>
            <click-to-edit
              v-model:title="task.title"
              :inputId="task.id.toString()"
              :isEditing="editId === task.id"
              @start-edit="editId = task.id"
              @stop-edit="editId = null"
            ></click-to-edit>
            <button
              class="bg-red-600 hover:bg-red-800 px-2 text-xl text-white font-bold ml-1 dog-ear"
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
import { reactive, ref, defineComponent, PropType } from "vue";
import CheckBox from "./CheckBox.vue";
import ClickToEdit from "./ClickToEdit.vue";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

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
    tasks: {
      type: Object as PropType<Array<Task>>,
      required: true,
    },
  },
  emits: ["set-tasks"],
  setup: (props, { emit }) => {
    let newTasks = [];

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

    const editId = ref<number | null>(null);
    const removeTask = (task: Task) => {
      newTasks = Array.from(props.tasks);
      newTasks.splice(newTasks.indexOf(task), 1);
      emit("set-tasks", newTasks);
    };
    const addTask = () => {
      let latestTask = props.tasks.reduce((taskA, taskB) => {
        return taskA.id > taskB.id ? taskA : taskB;
      });
      let newT: Task = {
        id: latestTask.id + 1,
        title: `Task Num ${latestTask.id + 1}`,
        completed: false,
      };

      newTasks = [newT].concat(props.tasks);
      emit("set-tasks", newTasks);
    };
    const updateEditId = (newId) => {
      editId.value = newId;
    };
    return {
      cardColors,
      editId,
      removeTask,
      addTask,
      updateEditId,
    };
  },
});
</script>
