window.addEventListener("load", function () {
  const localSession = localStorage.getItem("TFVD");
  const admin_id = atob(localSession);
  // console.log(admin_id);

  const method = "POST";
  const url = "backend/admin_dashboard.php";
  const params = `admin_id=${admin_id}`;

  const xhhtps = new XMLHttpRequest();
  xhhtps.onreadystatechange = function () {
    if (xhhtps.readyState === 4 && xhhtps.status === 200) {
      // console.log(xhhtps.responseText);
      const res = JSON.parse(xhhtps.responseText);
      if (res.success) {
        const success_msg = `<div class="alert alert-success mt-5 mx-5 text-center" role="alert">Welcome back ${res.data.username}</div>`;
        document.getElementById("welcome_msg").innerHTML = success_msg;
        setTimeout(() => {
          document.getElementById("welcome_msg").innerHTML = "";
        }, 3000);
        document.getElementById("username").innerHTML = res.data.username;
        document.getElementById("email").innerHTML = res.data.email;
        //display option
        const categorySelect = document.getElementById("postCategory");
        res.categories.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.category_id;
          option.textContent = category.category_name;
          categorySelect.appendChild(option);
        });
      } else {
        alert(res.failed);
      }
    }
  };
  xhhtps.open(method, url, true);
  xhhtps.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhhtps.send(params);
});
