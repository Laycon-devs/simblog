const login = document
  .getElementById("login")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      e.preventDefault();
      alert("Please fill in both fields.");
    } else {
      const loginData = {
        email: email,
        password: password,
      };
      const json = JSON.stringify(loginData);
      //   console.log(json);
      const method = "POST";
      const url = "backend/login.php";

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
            // console.log(res);
          if (res.success) {
            if (res.pass) {
              localStorage.setItem("TFVD", btoa(res.data.admin_id));
              window.location = "admin_dashboard.html";
            } else {
              alert(res.error);
            }
          } else {
            alert(res.failed);
          }
        }
      };
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(json);
    }
  });
