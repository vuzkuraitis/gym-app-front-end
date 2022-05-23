const baseUrl = "http://localhost:8080/v1";

const newPassword = async (userData) => {
  const res = await fetch(`${baseUrl}/users/new-password`, {
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

  const email = e.target.elements.email.value.trim();
  const token = e.target.elements.token.value.trim();
  const password = e.target.elements.password.value.trim();

  newPassword({ email, token, password });
});

if (!email || !token || !password) {
  alert("Some data is missing. Please fill in.");
}
