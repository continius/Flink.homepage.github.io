document.getElementById('create-post-button').addEventListener('click', function() {
    const formContainer = document.getElementById('form-container');
    formContainer.classList.remove('hidden');
});
document.getElementById('submit-post-button').addEventListener('click', function() {
    const imageInput = document.getElementById('image-input');
    const titleInput = document.getElementById('title-input').value;
    const descriptionInput = document.getElementById('description-input').value;
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;

            fetch('save_post.php', { // изменён URL для PHP-скрипта
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: titleInput,
                    description: descriptionInput,
                    image: imageData
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('post-image').src = imageData;
                    document.getElementById('post-image').style.display = 'block';
                    document.getElementById('post-title').textContent = titleInput;
                    document.getElementById('post-description').textContent = descriptionInput;
                    document.getElementById('form-container').classList.add('hidden');
                } else {
                    console.error('Ошибка при сохранении поста.');
                }
            })
            .catch(error => console.error('Ошибка', error));
        }
        reader.readAsDataURL(imageInput.files[0]);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('get_post.php') // URL к вашему PHP-скрипту для извлечения данных
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const postsContainer = document.getElementById('posts-container');
                data.posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.id = 'post-style';
                    postElement.innerHTML = `
                        <h2>${post.title}</h2>
                        <p>${post.description}</p>
                        <img src="${post.image}" alt="Post Image" style="max-width:375px;">
                    `;
                    postsContainer.appendChild(postElement);
                });
            } else {
                console.error('Ошибка при загрузке постов.');
            }
        })
        .catch(error => console.error('Ошибка:', error));
});