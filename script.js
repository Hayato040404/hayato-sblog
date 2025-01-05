// Load articles from local storage and display them
document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
});

function saveArticle() {
    const title = document.getElementById('article-title').value;
    const content = document.getElementById('article-content').value;
    const image = document.getElementById('article-image').files[0];

    if (title && content) {
        const reader = new FileReader();
        reader.onloadend = function() {
            const articles = JSON.parse(localStorage.getItem('articles')) || [];
            articles.unshift({ title, content, image: reader.result }); // Add new article to the beginning
            localStorage.setItem('articles', JSON.stringify(articles));
            loadArticles();
            document.getElementById('article-title').value = '';
            document.getElementById('article-content').value = '';
            document.getElementById('article-image').value = '';
        };
        if (image) {
            reader.readAsDataURL(image);
        } else {
            reader.onloadend();
        }
    } else {
        alert('両方のフィールドを入力してください。');
    }
}

function loadArticles() {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const articlesContainer = document.getElementById('articles-container');
    articlesContainer.innerHTML = '';
    articles.forEach((article, index) => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article';
        articleElement.innerHTML = `<h3 class="article-title">${article.title}</h3><p class="article-content">${article.content.substring(0, 100)}...</p>`;
        if (article.image) {
            articleElement.innerHTML += `<img src="${article.image}" alt="${article.title}">`;
        }
        articleElement.onclick = function() {
            showArticleDetail(index);
        };
        articlesContainer.appendChild(articleElement);
    });
}

function showArticleDetail(index) {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const article = articles[index];
    const detailContainer = document.getElementById('article-detail');
    detailContainer.innerHTML = `<h3 class="article-title">${article.title}</h3><p class="article-content">${article.content}</p>`;
    if (article.image) {
        detailContainer.innerHTML += `<img src="${article.image}" alt="${article.title}">`;
    }
    detailContainer.innerHTML += `<button class="back-button" onclick="hideArticleDetail()">戻る</button>`;
    document.getElementById('articles-section').style.display = 'none';
    detailContainer.style.display = 'block';
}

function hideArticleDetail() {
    document.getElementById('article-detail').style.display = 'none';
    document.getElementById('articles-section').style.display = 'block';
}

function login() {
    const password = prompt('パスワードを入力してください:');
    if (password === 'admin123') {
        document.getElementById('admin-section').style.display = 'block';
    } else {
        alert('パスワードが間違っています。');
    }
}
