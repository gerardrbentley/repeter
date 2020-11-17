<template>
  <Day :dayName="todayDisplay" :tasks="tasks" @set-tasks="setTasks" />
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import Day from "./components/Day.vue";

export default defineComponent({
  name: "App",
  components: {
    Day,
  },
  setup() {
    const today = new Date();
    const todayDisplay = today.toLocaleDateString();

    const tasks = ref<Array<Task>>([]);
    const setTasks = (newTasks: Array<Task>) => {
      console.log("gettin new tasks", newTasks);
      tasks.value = newTasks;
    };

    let newTasks = [];
    for (let i = 5; i > 0; i--) {
      let newT: Task = { id: i, title: `Task Num ${i}`, completed: false };
      newTasks.push(newT);
    }
    setTasks(newTasks);

    return { todayDisplay, tasks, setTasks };
  },
});
</script>

<style>
#app {
  @apply w-full flex justify-center pt-6 bg-cool-gray-700 h-full;
}

.dog-ear {
  @apply rounded-tr-md rounded-b-md;
}

html,
body {
  @apply h-auto flex flex-grow min-h-full;
}
</style>