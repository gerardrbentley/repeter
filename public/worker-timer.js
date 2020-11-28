let timer;
let timeSpent = 0.0;
onmessage = (event) => {
  const updateTime = () => {
    timeSpent += 0.1;
    postMessage(timeSpent);
  };

  switch (event.data) {
    case "start":
      timeSpent = 0.0;
      startTime = new Date().valueOf();
    case "unpause":
      timer = setInterval(() => updateTime(), 100);
      break;
    case "pause":
      clearInterval(timer);
  }
};
