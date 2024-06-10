document.getElementById("post").addEventListener("click", function (e) {
    e.preventDefault();
    const postAuthor = document.getElementById("postAuthor").value;
    const postTitle = document.getElementById("postTitle").value;
    const postContent = document.getElementById("postContent").value;
    const postCategory = document.getElementById("postCategory").value;
  
    if (!postAuthor || !postTitle || !postContent || !postCategory) {
      const error_msg = `<div class="alert alert-danger mt-5 mx-5 text-center" role="alert">All inputs are required</div>`;
      document.getElementById("welcome_msg").innerHTML = error_msg;
      setTimeout(() => {
        document.getElementById("welcome_msg").innerHTML = "";
      }, 5000);
    } else {
      const postData = {
        postAuthor: postAuthor,
        postTitle: postTitle,
        postContent: postContent,
        postCategory: postCategory,
      };
  
      const json = JSON.stringify(postData);
      const method = "POST";
      const url = "backend/createpost.php";
  
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          if (res.success) {
            const success_msg = `<div class="alert alert-success mt-5 mx-5 text-center" role="alert">${res.success_msg}</div>`;
            document.getElementById("welcome_msg").innerHTML = success_msg;
            setTimeout(() => {
              document.getElementById("welcome_msg").innerHTML = "";
            }, 5000);
            document.getElementById("postAuthor").value = "";
            document.getElementById("postTitle").value = "";
            document.getElementById("postContent").value = "";
            document.getElementById("postCategory").value = "";
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
  