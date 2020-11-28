<template>
  <div
    class="task relative min-h-screen md:min-h-0 max-h-screen bg-gray-900 border-8 border-gray-900 shadow-md z-0"
  >
    <svg
      v-show="isRunning || timeSpent > 0"
      class="absolute w-full h-full z-10 transform rotate-180"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      id="rect"
    >
      <rect :fill="progressFill" x="0" y="0" height="100%" width="100%">
        <animateTransform
          id="transform"
          attributeName="transform"
          type="scale"
          from="1 0"
          to="1 1"
          begin="indefinite"
          :dur="animationDuration"
          repeatCount="1"
        />
      </rect>
    </svg>
    <div
      class="absolute content h-full w-full mx-auto flex flex-col gap-4 justify-center z-20"
    >
      <div class="header w-full text-lg text-gray-100 font-semibold">
        <span>{{ currentTask.title }} ({{ durationDisplay }})</span>
      </div>
      <div class="controls flex flex-row gap-2 justify-center w-full">
        <button
          @click="changeTask('previous')"
          class="dog-ear"
          :class="[isRunning ? 'pause-btn' : 'begin-btn']"
        >
          Prev
        </button>
        <button
          @click="setIsRunning(!isRunning)"
          class="dog-ear"
          :class="[isRunning ? 'pause-btn' : 'begin-btn']"
        >
          {{ isRunning ? "Pause" : "Begin" }}
        </button>
        <button
          @click="changeTask('next')"
          class="dog-ear"
          :class="[isRunning ? 'pause-btn' : 'begin-btn']"
        >
          Next
        </button>
      </div>
      <div class="time-spent w-full">
        <span
          class="text-lg text-gray-200"
          :class="[timeSpent > currentTask.duration ? 'font-bold text-xl' : '']"
          >{{ timeSpentDisplay }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, nextTick } from "vue";
import { focusedTaskId, swapFocus, tasks, secondsFormat } from "../global";

export default defineComponent({
  name: "TaskView",
  setup() {
    let currentTask = computed(() => {
      return (
        tasks.value.find((task) => task.id === focusedTaskId.value) ||
        tasks.value[0]
      );
    });
    const timeSpent = ref(0.0);
    const increment = () => {
      timeSpent.value += 0.1;
      if (timeSpent.value > currentTask.value.duration) {
        tasks.value = tasks.value.map((task) =>
          task.id === focusedTaskId.value ? { ...task, completed: true } : task
        );
      }
    };
    let stopWatch: NodeJS.Timeout;
    const progressFill = computed(() => {
      return timeSpent.value < currentTask.value.duration
        ? "#0e9f6e"
        : "#f98080";
    });
    const isRunning = ref(false);
    const isStarted = ref(false);
    const setIsRunning = (val: boolean) => {
      isRunning.value = val;
      let svgBackground = <SVGSVGElement>document.querySelector("#rect");
      let svgTransform = <SVGAnimateTransformElement>(
        document.querySelector("#transform")
      );
      if (val) {
        if (isStarted.value) {
          console.log("unpausing");
          try {
            svgTransform.getStartTime();
            svgBackground.unpauseAnimations();
          } catch (error) {
            console.log("e", error);
          }
        } else {
          console.log("starting");
          isStarted.value = true;
          svgTransform.beginElement();
        }
        stopWatch = setInterval(() => {
          increment();
        }, 100);
      } else {
        console.log("pausing");
        svgBackground.pauseAnimations();
        clearInterval(stopWatch);
      }
    };
    const changeTask = async (direction: String) => {
      let svgBackground = <SVGSVGElement>document.querySelector("#rect");
      swapFocus(direction);
      await nextTick();
      clearInterval(stopWatch);
      svgBackground.unpauseAnimations();
      timeSpent.value = 0.0;
      isStarted.value = false;
      setIsRunning(true);
    };

    const timeSpentDisplay = computed(() => {
      return secondsFormat(Math.floor(timeSpent.value));
    });
    const durationDisplay = computed(() => {
      return secondsFormat(currentTask.value.duration);
    });
    const animationDuration = computed(() => {
      return `${currentTask.value.duration}s`;
    });
    return {
      currentTask,
      durationDisplay,
      progressFill,
      timeSpentDisplay,
      timeSpent,
      isRunning,
      setIsRunning,
      animationDuration,
      changeTask,
    };
  },
});
</script>

<style scoped>
.begin-btn {
  @apply bg-blue-700 text-white font-semibold tracking-wider px-2 py-1 shadow-lg;
}

.pause-btn {
  @apply bg-blue-400 text-white tracking-wider px-2 py-1 shadow-lg;
}
</style>