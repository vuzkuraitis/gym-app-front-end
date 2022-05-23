const baseUrl = "http://localhost:8080/v1";
const table = document.querySelector("tbody");

const token = localStorage.getItem("token");

document.getElementById("navMenu").addEventListener("click", () => {
  const dropdown = document.querySelector(".dropdown");
  dropdown.classList.toggle("active");
});

const getData = async (token) => {
  const res = await fetch(`${baseUrl}/sets`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log(data);

  if (data.err) {
    return alert(data.err);
  }
  table.innerHTML = "";
  data.forEach((set) => {
    const tr = table.insertRow();

    const td1 = tr.insertCell();
    td1.textContent = set.id;

    const td2 = tr.insertCell();
    td2.textContent = set.weight + "kg";

    const td3 = tr.insertCell();
    td3.textContent = set.reps;

    const td4 = tr.insertCell();
    td4.textContent = set.sets;

    const td5 = tr.insertCell();
    td5.textContent = set.exercise_id;
  });
};

if (!token) {
  location.replace("index.html");
} else {
  getData(token);
}
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  location.replace("index.html");
});
