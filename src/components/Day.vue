<template>
  <div class="single-day flex-grow max-w-screen-sm rounded bg-gray-900 p-2">
    <div class="flex justify-between py-1">
        <h3 class="text-xl text-gray-50">{{ dayName }}</h3>

    </div>
      <div class="text-sm mt-2">
        <div class="bg-red-600 p-2 rounded-sm mt-1 border-b border-grey cursor-pointer text-xl font-semibold">
        <div class="flex flex-row">  
          <input
              class="toggle hidden"
              type="checkbox"
            />
            <label
              ><svg
                xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 my-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="{2}"
                  :d="
                    true
                      ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                      : 'M9 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  "
                /></svg
            ></label>
            Task 1
            </div>

        </div>
        <div class="bg-orange-600 p-2 rounded mt-1 border-b border-grey cursor-pointer text-xl font-semibold">
          <div class="flex flex-row">
          <check-box v-model:isChecked="checked2"></check-box>
          Task 2
          </div>
        </div>
        <div class="bg-yellow-600 p-2 rounded mt-1 border-b border-grey cursor-pointer text-xl font-semibold">
          Task 3
        </div>
        <div class="bg-green-600 p-2 rounded mt-1 border-b border-grey cursor-pointer text-xl font-semibold">
          Task 3
        </div>
        <div class="bg-blue-600 p-2 rounded mt-1 border-b border-grey cursor-pointer text-xl font-semibold">
          Task 3
        </div>
        <div class="bg-indigo-600 p-2 rounded mt-1 border-b border-grey cursor-pointer text-xl font-semibold">
          Task 3
        </div>
        <div class="bg-purple-600 p-2 rounded mt-1 border-b border-grey cursor-pointer text-xl font-semibold">
          Task 3
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, defineComponent } from 'vue'
import CheckBox from './CheckBox.vue'
import {useState} from '../composables/state'

interface Task {
    id: number;
    title: string;
    completed: boolean;
};


export default defineComponent({
  name: 'Day',
  components: {
    CheckBox
  },
  props: {
    dayName: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const tasks = ref<Array<Task>>([]);
    const setTasks = (newTasks: Array<Task>) => {
        tasks.value = newTasks;
    };
    const newTasks = []
    for (let i=0; i < 7; i++) {
      let newT: Task = {id: i, title: `Task Num ${i}`, completed: false}
      newTasks.push(newT)
    }
    setTasks(newTasks)
    return { tasks, setTasks }
  }
})
</script>
