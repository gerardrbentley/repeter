<template>
  <header class="h-20 flex-grow-0">
    <p
      class="text-5xl my-auto ml-2 font-hairline italic text-gray-50 shadow-md"
    >
      Répéter
    </p>
  </header>
  <div class="flex flex-col md:flex-row gap-2 mx-2">
    <day class="w-full md:w-1/2 mx-auto shadow-md" :dayName="todayDisplay" />
    <task-view class="w-full md:w-1/2 mx-auto shadow-md" />
  </div>
  <github-corner url="https://github.com/gerardrbentley/repeter" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import Day from "./components/Day.vue";
import TaskView from "./components/TaskView.vue";
import GithubCorner from "./components/GithubCorner.vue";
import { tasks, checkins } from "./global";

export default defineComponent({
  name: "App",
  components: {
    Day,
    GithubCorner,
    TaskView,
  },
  setup() {
    const today = new Date();
    const todayDisplay = today.toLocaleDateString();

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
    }

    return { todayDisplay };
  },
});
</script>

<style src="./assets/style.css"></style>