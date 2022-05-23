const baseUrl = "http://localhost:8080/v1";
const table = document.querySelector("tbody");
const select = document.querySelector("select");

const token = localStorage.getItem("token");

document.getElementById("navMenu").addEventListener("click", () => {
  const dropdown = document.querySelector(".dropdown");
  dropdown.classList.toggle("active");
});

const getData = async (exc) => {
  const res = await fetch(`${baseUrl}/exercises`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(exc),
  });
  const data = await res.json();
  console.log(data);

  if (data.err) {
    return alert(data.err);
  }
  select.innerHTML = "";
  data.forEach((exc) => {
    const option = document.createElement("option");
    option.textContent = `${exc.id}. ${exc.name}`;
    select.appendChild(option);
  });
};

getData();

const sendData = async (userData) => {
  const res = await fetch(`${baseUrl}/sets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  console.log(data);

  if (data.err) {
    return alert(data.err);
  }

  alert(data.msg);
  location.replace("stats.html");
};

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();

  const weight = Number(e.target.elements.weight.value);
  const reps = Number(e.target.elements.reps.value);
  const sets = Number(e.target.elements.sets.value);
  const exercise_id = e.target.elements.exc.value;

  sendData({ weight, reps, sets, exercise_id });
});

if (!token) {
  location.replace("index.html");
}
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  location.replace("index.html");
});
