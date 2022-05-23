const baseUrl = "http://localhost:8080/v1";

const register = async (userData) => {
  const res = await fetch(`${baseUrl}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

  const name = e.target.elements.name.value.trim();
  const email = e.target.elements.email.value.trim().toLowerCase();
  const password = e.target.elements.pass.value;

  register({ name, email, password });
});
