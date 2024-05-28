import { load, STORAGE_KEYS } from "../services/storage.js";

const ctx = document.getElementById("apiSpeedChart").getContext("2d");
const responseTimes = [];
let currentChart;

async function measureApiSpeed(e) {
  e.target.disabled = true;
  currentChart?.destroy();
  responseTimes.splice(0);

  const apiUrl = load(STORAGE_KEYS.url);

  for (let i = 0; i < 10; i++) {
    const start = performance.now();
    await fetch(apiUrl);
    const end = performance.now();
    responseTimes.push(end - start);
  }
  createChart();
  e.target.disabled = false;
}

function createChart() {
  currentChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: responseTimes.map((_, index) => `Request ${index + 1}`),
      datasets: [
        {
          label: "API Response Time (ms)",
          data: responseTimes,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

export default measureApiSpeed;
