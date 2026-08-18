document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('uricAcidChart');

  if (!ctx) {
    console.error("Canvas element #uricAcidChart not found!");
    return;
  }

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Uric Acid Level (mg/dL)',
        data: [6.2, 6.5, 7.1, 6.8, 7.5, 8.0, 7.3],
        borderColor: '#0B69B6',
        backgroundColor: 'rgba(11, 105, 182, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#064A8A',
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 4,
          max: 10,
          title: {
            display: true,
            text: 'mg/dL'
          }
        }
      }
    }
  });
});


/*Delete current js and uncomment the one below if real database*/

/* 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  query, 
  orderBy, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 1. Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. Initialize Empty Chart
const ctx = document.getElementById('uricAcidChart').getContext('2d');

const uricAcidChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Uric Acid Level (mg/dL)',
      data: [],
      borderColor: '#0B69B6',
      backgroundColor: 'rgba(11, 105, 182, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.3,
      pointBackgroundColor: '#064A8A',
      pointRadius: 5
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: false }
    }
  }
});

// 3. Listen to Firestore in Real Time
// Assumes a collection named 'uric_acid_logs' with 'date', 'level', and 'timestamp' fields
const q = query(collection(db, "uric_acid_logs"), orderBy("timestamp", "asc"));

onSnapshot(q, (snapshot) => {
  const labels = [];
  const dataValues = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    labels.push(data.date);    // e.g. "Mon" or "10/08"
    dataValues.push(data.level); // e.g. 6.8
  });

  // Update Chart
  uricAcidChart.data.labels = labels;
  uricAcidChart.data.datasets[0].data = dataValues;
  uricAcidChart.update();

  // Update Highest & Lowest stats if data exists
  if (dataValues.length > 0) {
    const highest = Math.max(...dataValues);
    const lowest = Math.min(...dataValues);

    const highestEl = document.querySelector('.record-card:nth-child(1) .info p');
    const lowestEl = document.querySelector('.record-card:nth-child(2) .info p');

    if (highestEl) highestEl.textContent = `${highest} mg/dL`;
    if (lowestEl) lowestEl.textContent = `${lowest} mg/dL`;
  }
});
*/