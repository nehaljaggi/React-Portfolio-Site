document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.getElementById('loading');
    const errorIndicator = document.getElementById('error');
    const postsContainer = document.getElementById('posts-container');

    async function fetchPostsAndUsers() {
        try {
            const [postsResponse, usersResponse] = await Promise.all([
                fetch('https://jsonplaceholder.typicode.com/posts'),
                fetch('https://jsonplaceholder.typicode.com/users')
            ]);

            if (!postsResponse.ok || !usersResponse.ok) {
                throw new Error('Failed to fetch data');
            }

            const posts = await postsResponse.json();
            const users = await usersResponse.json();

            displayPosts(posts, users);
        } catch (error) {
            console.error('Error fetching data:', error);
            errorIndicator.classList.remove('hidden');
        } finally {
            loadingIndicator.classList.add('hidden');
        }
    }

    function displayPosts(posts, users) {
        posts.forEach(post => {
            const user = users.find(u => u.id === post.userId);
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            postElement.innerHTML = `
                <div class="post-title">${post.title}</div>
                <div class="post-body">${post.body}</div>
                <div class="post-user">Posted by: ${user.name} (${user.email})</div>
                <div class="post-details" id="post-details-${post.id}"></div>
            `;

            postElement.addEventListener('click', () => displayPostDetails(post.id, postElement));

            postsContainer.appendChild(postElement);
        });
    }

    async function displayPostDetails(postId, postElement) {
        const detailsElement = postElement.querySelector('.post-details');
        if (detailsElement.style.display === 'block') {
            detailsElement.style.display = 'none';
            return;
        }

        try {
            const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
            if (!commentsResponse.ok) {
                throw new Error('Failed to fetch comments');
            }

            const comments = await commentsResponse.json();

            detailsElement.innerHTML = `
                <h3>Comments:</h3>
                ${comments.map(comment => `
                    <div class="comment">
                        <p><strong>${comment.name}</strong> (${comment.email})</p>
                        <p>${comment.body}</p>
                    </div>
                `).join('')}
            `;
            detailsElement.style.display = 'block';
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }

    fetchPostsAndUsers();

    document.addEventListener('DOMContentLoaded', () => {
        const loadingIndicator = document.getElementById('loading');
        const errorIndicator = document.getElementById('error');
        const postsContainer = document.getElementById('posts-container');
    
        async function fetchPostsAndUsers() {
            try {
                const [postsResponse, usersResponse] = await Promise.all([
                    fetch('https://jsonplaceholder.typicode.com/posts'),
                    fetch('https://jsonplaceholder.typicode.com/users')
                ]);
    
                if (!postsResponse.ok || !usersResponse.ok) {
                    throw new Error('Failed to fetch data');
                }
    
                const posts = await postsResponse.json();
                const users = await usersResponse.json();
    
                displayPosts(posts, users);
            } catch (error) {
                console.error('Error fetching data:', error);
                errorIndicator.classList.remove('hidden');
                errorIndicator.textContent = 'Error loading data. Please try again later.';
            } finally {
                loadingIndicator.classList.add('hidden');
            }
        }
    
        function displayPosts(posts, users) {
            posts.forEach(post => {
                const user = users.find(u => u.id === post.userId);
                const postElement = document.createElement('div');
                postElement.classList.add('post');
    
                postElement.innerHTML = `
                    <div class="post-title">${post.title}</div>
                    <div class="post-body">${post.body}</div>
                    <div class="post-user">Posted by: ${user.name} (${user.email})</div>
                    <div class="post-details" id="post-details-${post.id}"></div>
                `;
    
                postElement.addEventListener('click', () => displayPostDetails(post.id, postElement));
    
                postsContainer.appendChild(postElement);
            });
        }
    
        async function displayPostDetails(postId, postElement) {
            const detailsElement = postElement.querySelector('.post-details');
            if (detailsElement.style.display === 'block') {
                detailsElement.style.display = 'none';
                return;
            }
    
            try {
                const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
                if (!commentsResponse.ok) {
                    throw new Error('Failed to fetch comments');
                }
    
                const comments = await commentsResponse.json();
    
                detailsElement.innerHTML = `
                    <h3>Comments:</h3>
                    ${comments.map(comment => `
                        <div class="comment">
                            <p><strong>${comment.name}</strong> (${comment.email})</p>
                            <p>${comment.body}</p>
                        </div>
                    `).join('')}
                `;
                detailsElement.style.display = 'block';
            } catch (error) {
                console.error('Error fetching comments:', error);
                detailsElement.innerHTML = '<p>Error loading comments. Please try again later.</p>';
                detailsElement.style.display = 'block';
            }
        }
    
        fetchPostsAndUsers();
});
    
});
