const baseUrl = "http://localhost:8080/v1";
const table = document.querySelector("tbody");
const token = localStorage.getItem("token");

document.getElementById("navMenu").addEventListener("click", () => {
  const dropdown = document.querySelector(".dropdown");
  dropdown.classList.toggle("active");
});

const getData = async (token) => {
  const res = await fetch(`${baseUrl}/exercises`, {
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
  data.forEach((exc) => {
    const tr = table.insertRow();

    const td1 = tr.insertCell();
    td1.textContent = exc.id;

    const td2 = tr.insertCell();
    td2.textContent = exc.name;

    const td3 = tr.insertCell();
    td3.textContent = exc.description;

    const td4 = tr.insertCell();
    const a = document.createElement("a");
    const play = document.createElement("div");
    play.classList.add("play");
    a.href = exc.video;
    a.appendChild(play);
    td4.append(a);
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
