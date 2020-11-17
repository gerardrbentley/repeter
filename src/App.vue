<template>
  <Day :dayName="todayDisplay" :tasks="tasks" @set-tasks="setTasks" />
</template>

<script lang="ts">
import { ref, defineComponent, reactive, readonly, toRefs } from "vue";
import Day from "./components/Day.vue";

export interface Store {
  checkins: string[];
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const STORAGE_KEY = "daily-list";
const source: Store = JSON.parse(
  localStorage.getItem(STORAGE_KEY) || '{"checkins": [], "tasks": []}'
);

const saveStorage = (newStore: Store) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newStore));
};

const makeDummyTasks = () => {
  let dummyTasks: Array<Task> = [];
  for (let i = 5; i > 0; i--) {
    let newT: Task = { id: i, title: `Task Num ${i}`, completed: false };
    dummyTasks.push(newT);
  }
  return dummyTasks;
};

export default defineComponent({
  name: "App",
  components: {
    Day,
  },
  setup() {
    const today = new Date();
    const todayDisplay = today.toLocaleDateString();
    const store = reactive<Store>(source);
    let { tasks, checkins } = toRefs(store);

    if (tasks.value.length === 0) {
      tasks.value = makeDummyTasks();
    }

    let resetTasks = true;
    for (let i = checkins.value.length - 1; i >= 0; i--) {
      console.log(checkins.value[i]);
      if (checkins.value[i] == todayDisplay) {
        resetTasks = false;
        break;
      }
    }

    if (resetTasks) {
      console.log("reset Tasks!");
      let newCheckins = Array.from(checkins.value);
      newCheckins.push(todayDisplay);
      checkins.value = newCheckins;
      let newTasks = tasks.value.map((task) => ({ ...task, completed: false }));
      tasks.value = newTasks;
      saveStorage(store);
    }

    const setTasks = (newTasks: Array<Task>) => {
      tasks.value = newTasks;
      let checkedTasks = newTasks
        .filter((task) => task.completed)
        .map((task) => task.id);

      saveStorage(store);
    };
    return { todayDisplay, tasks, setTasks };
  },
});
</script>

<style>
#app {
  @apply w-full flex justify-center bg-cool-gray-700 h-full;
}

@screen md {
  #app {
    @apply pt-6;
  }
}

.dog-ear {
  @apply rounded-tr-md rounded-b-md;
}

html,
body {
  @apply h-auto flex flex-grow min-h-full;
}
</style>