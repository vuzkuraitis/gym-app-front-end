const baseUrl = "http://localhost:8080/v1";

const token = localStorage.getItem("token");

document.getElementById("navMenu").addEventListener("click", () => {
  const dropdown = document.querySelector(".dropdown");
  dropdown.classList.toggle("active");
});

const changePassword = async (userData) => {
  const res = await fetch(`${baseUrl}/users/change-password`, {
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
  location.replace("index.html");
};

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();

  const oldPassword = e.target.elements.oldPassword.value.trim();
  const newPassword = e.target.elements.newPassword.value.trim();

  changePassword({ oldPassword, newPassword });
});

if (!token) {
  location.replace("index.html");
}
