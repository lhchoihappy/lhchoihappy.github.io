/* Blog Styles */
.blog-header {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}

.blog-title {
    font-size: 2.2rem;
    color: #2c3e50;
    margin-bottom: 10px;
}

.blog-description {
    color: #7f8c8d;
    font-size: 1.1rem;
}

.posts-list {
    list-style: none;
}

.post-item {
    margin-bottom: 30px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.post-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.post-title a {
    color: #2c3e50;
    text-decoration: none;
}

.post-title a:hover {
    color: #3498db;
}

.post-date {
    color: #95a5a6;
    font-size: 0.9rem;
    margin-bottom: 15px;
    display: block;
}

.post-excerpt {
    color: #34495e;
    margin-bottom: 15px;
}

.read-more {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
}

.read-more:hover {
    text-decoration: underline;
}

@media (max-width: 600px) {
    .post-item {
        padding: 15px;
    }
    
    .post-title {
        font-size: 1.3rem;
    }
}
