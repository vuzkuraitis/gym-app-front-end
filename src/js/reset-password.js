const baseUrl = "http://localhost:8080/v1";

const resetPassword = async (userData) => {
  const res = await fetch(`${baseUrl}/users/reset-password`, {
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
  location.replace("new-password.html");
};

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();

  const email = e.target.elements.email.value.trim().toLowerCase();

  resetPassword({ email });
});
