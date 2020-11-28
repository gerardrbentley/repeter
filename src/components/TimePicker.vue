<template>
  <div class="bg-gray-800 text-white">
    <div class="flex">
      <select
        v-model="hourChoice"
        name="hours"
        class="bg-gray-800 text-right text-lg appearance-none outline-none"
      >
        <option
          v-for="(hour, index) in hourDivisions"
          :key="index"
          :value="hour"
        >
          {{ hour }}
        </option>
      </select>
      <span class="text-lg">:</span>
      <select
        v-model="minuteChoice"
        name="minutes"
        class="bg-gray-800 text-lg appearance-none outline-none"
      >
        <option
          v-for="(minute, index) in minuteDivisions"
          :key="index"
          :value="minute"
        >
          {{ formatTwoDigits(minute) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";

interface TimePickerProps {
  propA: string;
}

export default defineComponent({
  name: "TimePicker",
  props: {
    duration: {
      type: Number,
      default: 10 * 60,
    },
  },
  emits: ["update:duration"],
  setup(props, { emit }) {
    let minuteDivisions = [];
    let hourDivisions = [];
    for (let i = 0; i < 12; i++) {
      minuteDivisions.push(i * 5);
      if (i < 10) {
        hourDivisions.push(i);
      }
    }

    const hourChoice = ref(Math.floor(props.duration / (60 * 60)));
    const minuteChoice = ref(Math.floor((props.duration % (60 * 60)) / 60));
    watch([hourChoice, minuteChoice], () => {
      console.log(hourChoice.value, minuteChoice);
      emit(
        "update:duration",
        hourChoice.value * 60 * 60 + minuteChoice.value * 60
      );
    });

    const formatTwoDigits = (input: number) => {
      return ("0" + input).slice(-2);
    };

    return {
      hourChoice,
      minuteChoice,
      minuteDivisions,
      hourDivisions,
      formatTwoDigits,
    };
  },
});
</script>

<style scoped>
</style>