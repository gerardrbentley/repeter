import { reactive, toRefs, ref, watch } from 'vue';

export interface Store {
    checkins: string[];
    tasks: Task[];
}

export interface Task {
    id: number;
    title: string;
    duration: number;
    completed: boolean;
}

const STORAGE_KEY = "daily-list";
const source: Store = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '{"checkins": [], "tasks": []}'
);

const store = reactive<Store>(source);

export const saveStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
};

const makeDummyTasks = () => {
    let dummyTasks: Array<Task> = [];
    for (let i = 5; i > 0; i--) {
        let newT: Task = { id: i, title: `Task Num ${ i }`, completed: false, duration: 60 * 10 };
        dummyTasks.push(newT);
    }
    return dummyTasks;
};

watch(store, () => { saveStorage(); });

const { tasks, checkins } = toRefs(store);

if (tasks.value.length === 0) {
    tasks.value = makeDummyTasks();
}

const setTasks = (newTasks: Array<Task>) => {
    tasks.value = newTasks;
    saveStorage();
};

const focusedTaskId = ref(tasks.value[0].id);
const swapFocus = (direction: String) => {
    let currIndex = tasks.value.findIndex((task) => {
        return task.id === focusedTaskId.value;
    });
    if (direction === "previous") {
        let nextIndex = currIndex > 0 ? currIndex - 1 : tasks.value.length - 1;
        focusedTaskId.value = tasks.value[nextIndex].id;
    } else {
        let nextIndex = currIndex < tasks.value.length - 1 ? currIndex + 1 : 0;
        focusedTaskId.value = tasks.value[nextIndex].id;
    }
};

let secondsFormat = (totalSeconds: number) => {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    let hourString = hours > 0 ? `${ hours }:${ minutes < 10 ? "0" : "" }` : "";
    let minuteString = `${ minutes }:${ seconds < 10 ? "0" : "" }`;
    let timeString = `${ hourString }${ minuteString }${ seconds }`;

    return timeString;
};

export { tasks, checkins, setTasks, focusedTaskId, swapFocus, secondsFormat };
