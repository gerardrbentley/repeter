<template>
  <header class="h-20 flex-grow-0">
    <p
      class="text-5xl my-auto ml-2 font-hairline italic text-gray-50 shadow-md"
    >
      Répéter
    </p>
  </header>
  <Day
    class="w-full md:w-1/2 mx-auto shadow-md"
    :dayName="todayDisplay"
    :tasks="tasks"
    @set-tasks="setTasks"
  />
  <github-corner url="'https://github.com/gerardrbentley/repeter'" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Day from "./components/Day.vue";
import GithubCorner from "./components/GithubCorner.vue";

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
      if (checkins.value[i] == todayDisplay) {
        resetTasks = false;
        break;
      }
    }

    if (resetTasks) {
      checkins.value = [...checkins.value, todayDisplay];
      tasks.value = tasks.value.map((task) => ({ ...task, completed: false }));
      saveStorage(store);
    }

    const setTasks = (newTasks: Array<Task>) => {
      tasks.value = newTasks;
      saveStorage(store);
    };
    return { todayDisplay, tasks, setTasks };
  },
});
</script>

<style src="./assets/style.css"></style>