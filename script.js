document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
    updateVisitorCount();
    document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
    document.getElementById('feedback-form').addEventListener('submit', submitFeedback);
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

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function updateVisitorCount() {
    const visitorCountElement = document.getElementById('visitor-count');
    // Dummy implementation for visitor count update
    let visitorCount = parseInt(localStorage.getItem('visitorCount') || '0', 10);
    visitorCount += 1;
    localStorage.setItem('visitorCount', visitorCount);
    visitorCountElement.textContent = visitorCount;
}

function submitFeedback(event) {
    event.preventDefault();
    const name = document.getElementById('feedback-name').value;
    const message = document.getElementById('feedback-message').value;
    if (name && message) {
        alert('フィードバックありがとうございます！');
        document.getElementById('feedback-name').value = '';
        document.getElementById('feedback-message').value = '';
    } else {
        alert('名前とメッセージを入力してください。');
    }
}

function showRandomArticle() {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    if (articles.length > 0) {
        const randomIndex = Math.floor(Math.random() * articles.length);
        showArticleDetail(randomIndex);
    } else {
        alert('表示する記事がありません。');
    }
}

function login() {
    const password = prompt('パスワードを入力してください:');
    if (password === 'admin123') {
        document.getElementById('admin-section').style.display = 'block';
    } else {
        alert('パスワードが間違っています。');
    }
}
