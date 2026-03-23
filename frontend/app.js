const BACKEND_URL = window.BACKEND_URL || "http://localhost:5000";

async function fetchStudentDetails() {
  const card = document.getElementById("student-card");
  const btn  = document.getElementById("fetchBtn");

  btn.disabled = true;
  btn.textContent = "Fetching...";
  card.classList.remove("hidden");
  card.innerHTML = `<p style="color:#aaa;">Loading...</p>`;

  try {
    const response = await fetch(`${BACKEND_URL}/student-details`);
    if (!response.ok) throw new Error("Server responded with " + response.status);
    const data = await response.json();

    card.innerHTML = `
      <div class="detail-row">
        <span class="label">Name</span>
        <span class="value">${data.name}</span>
      </div>
      <div class="detail-row">
        <span class="label">Roll Number</span>
        <span class="value">${data.rollNumber}</span>
      </div>
      <div class="detail-row">
        <span class="label">Register Number</span>
        <span class="value">${data.registerNumber}</span>
      </div>
    `;

    btn.textContent = "Refresh";
  } catch (err) {
    card.innerHTML = `<p class="error">Error: Could not fetch student details.<br>Is the backend running?</p>`;
    btn.textContent = "Retry";
    console.error(err);
  } finally {
    btn.disabled = false;
  }
}