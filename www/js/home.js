window.addEventListener("load", function () {
    const method = "GET";
    const url = "backend/home.php";
    const xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                try {
                    const posts = JSON.parse(xhttp.responseText);
                    console.log(posts);
                    if (posts.success) {
                        displayPosts(posts.data); 
                    } else {
                        console.error('Response fail');
                    }
                } catch (e) {
                    console.error('Something went wrong');
                }
            } else {
                console.error("Something went wrong");
            }
        }
    };

    function displayPosts(posts) {
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = ''; 

        posts.forEach(post => {
            const postPreview = document.createElement('div');
            postPreview.className = 'post-preview';

            const titleElement = document.createElement('h2');
            titleElement.className = 'post-title';
            titleElement.innerText = post.post_title;

            const contentElement = document.createElement('p');
            contentElement.className = 'post-content';
            contentElement.innerText = post.post_content;

            const authorElement = document.createElement('p');
            authorElement.className = 'post-author';
            authorElement.innerText = `By: ${post.post_author}`;

            const dateElement = document.createElement('p');
            dateElement.className = 'post-date';
            dateElement.innerText = `Posted on: ${post.date_created} at ${post.time_created}`;

            postPreview.appendChild(titleElement);
            postPreview.appendChild(contentElement);
            postPreview.appendChild(authorElement);
            postPreview.appendChild(dateElement);

            postsContainer.appendChild(postPreview);
        });
    }

    xhttp.open(method, url, true);
    xhttp.send();
});