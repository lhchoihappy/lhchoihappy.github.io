<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enhanced Blog Layout</title>
    <style>
        /* Modern CSS Reset and Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --primary-color: #3498db;
            --secondary-color: #2c3e50;
            --accent-color: #e74c3c;
            --light-color: #ecf0f1;
            --dark-color: #2c3e50;
            --text-color: #333;
            --text-light: #777;
            --spacing: 1rem;
            --border-radius: 8px;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            --transition: all 0.3s ease;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background-color: #f9f9f9;
            padding: 0;
            margin: 0;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 var(--spacing);
        }
        
        /* Header Styles */
        header {
            background: linear-gradient(135deg, var(--secondary-color) 0%, var(--dark-color) 100%);
            color: white;
            padding: 2rem 0;
            margin-bottom: 2rem;
            box-shadow: var(--shadow);
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        }
        
        .site-title {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        
        .site-description {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        /* Navigation */
        nav {
            background-color: white;
            box-shadow: var(--shadow);
            margin-bottom: 2rem;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .nav-links {
            display: flex;
            list-style: none;
        }
        
        .nav-links li {
            margin-left: 1.5rem;
        }
        
        .nav-links a {
            text-decoration: none;
            color: var(--dark-color);
            font-weight: 500;
            padding: 1rem 0;
            display: block;
            position: relative;
            transition: var(--transition);
        }
        
        .nav-links a:hover {
            color: var(--primary-color);
        }
        
        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 3px;
            background-color: var(--primary-color);
            transition: var(--transition);
        }
        
        .nav-links a:hover::after {
            width: 100%;
        }
        
        /* Main Content Layout */
        .main-content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        @media (min-width: 768px) {
            .main-content {
                grid-template-columns: 2fr 1fr;
            }
        }
        
        /* Blog Posts List */
        .posts-list {
            list-style: none;
            background: white;
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: var(--shadow);
        }
        
        .post-item {
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
            transition: var(--transition);
        }
        
        .post-item:hover {
            background-color: #f5f5f5;
        }
        
        .post-item:last-child {
            border-bottom: none;
        }
        
        .post-title {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        .post-title a {
            color: var(--dark-color);
            text-decoration: none;
            transition: var(--transition);
        }
        
        .post-title a:hover {
            color: var(--primary-color);
        }
        
        .post-meta {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            color: var(--text-light);
        }
        
        .post-date {
            margin-right: 1rem;
        }
        
        .post-categories {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 1rem;
        }
        
        .category-tag {
            background-color: var(--light-color);
            color: var(--dark-color);
            padding: 0.2rem 0.6rem;
            border-radius: 20px;
            font-size: 0.8rem;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
        }
        
        .post-excerpt {
            margin-bottom: 1rem;
            color: var(--text-light);
        }
        
        .read-more {
            display: inline-block;
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 500;
            transition: var(--transition);
        }
        
        .read-more:hover {
            text-decoration: underline;
        }
        
        /* Sidebar */
        .sidebar {
            background: white;
            border-radius: var(--border-radius);
            padding: 1.5rem;
            box-shadow: var(--shadow);
        }
        
        .sidebar-section {
            margin-bottom: 2rem;
        }
        
        .sidebar-title {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid var(--light-color);
            color: var(--dark-color);
        }
        
        .about-content {
            line-height: 1.6;
        }
        
        .categories-list {
            list-style: none;
        }
        
        .categories-list li {
            margin-bottom: 0.5rem;
            display: flex;
            justify-content: space-between;
        }
        
        .categories-list a {
            color: var(--text-color);
            text-decoration: none;
            transition: var(--transition);
        }
        
        .categories-list a:hover {
            color: var(--primary-color);
        }
        
        .category-count {
            background-color: var(--light-color);
            color: var(--dark-color);
            padding: 0.1rem 0.5rem;
            border-radius: 10px;
            font-size: 0.8rem;
        }
        
        .subscribe-form input {
            width: 100%;
            padding: 0.8rem;
            margin-bottom: 0.5rem;
            border: 1px solid #ddd;
            border-radius: var(--border-radius);
        }
        
        .subscribe-btn {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: var(--transition);
            width: 100%;
        }
        
        .subscribe-btn:hover {
            background-color: var(--secondary-color);
        }
        
        .social-links {
            display: flex;
            gap: 1rem;
        }
        
        .social-link {
            display: inline-block;
            width: 40px;
            height: 40px;
            background-color: var(--light-color);
            color: var(--dark-color);
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            transition: var(--transition);
        }
        
        .social-link:hover {
            background-color: var(--primary-color);
            color: white;
            transform: translateY(-3px);
        }
        
        /* Pagination */
        .pagination {
            display: flex;
            justify-content: center;
            margin: 2rem 0;
        }
        
        .pagination-link {
            display: inline-block;
            padding: 0.5rem 1rem;
            margin: 0 0.2rem;
            background-color: white;
            color: var(--dark-color);
            text-decoration: none;
            border-radius: var(--border-radius);
            transition: var(--transition);
            box-shadow: var(--shadow);
        }
        
        .pagination-link:hover, .pagination-link.active {
            background-color: var(--primary-color);
            color: white;
        }
        
        /* Footer */
        footer {
            background-color: var(--dark-color);
            color: white;
            padding: 2rem 0;
            margin-top: 3rem;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        @media (min-width: 768px) {
            .footer-content {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        .footer-section h3 {
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        
        .footer-links {
            list-style: none;
        }
        
        .footer-links li {
            margin-bottom: 0.5rem;
        }
        
        .footer-links a {
            color: #ddd;
            text-decoration: none;
            transition: var(--transition);
        }
        
        .footer-links a:hover {
            color: var(--primary-color);
        }
        
        .copyright {
            text-align: center;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
                text-align: center;
            }
            
            .nav-container {
                flex-direction: column;
            }
            
            .nav-links {
                margin-top: 1rem;
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .nav-links li {
                margin: 0 0.5rem;
            }
        }
    </style>
</head>
<body>
    <!-- Header Section -->
    <header>
        <div class="container">
            <div class="header-content">
                <div>
                    <h1 class="site-title">My Blog</h1>
                    <p class="site-description">Sharing thoughts, ideas, and experiences</p>
                </div>
                <div>
                    <button style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 0.7rem 1.5rem; border-radius: var(--border-radius); cursor: pointer; transition: var(--transition);">Subscribe</button>
                </div>
            </div>
        </div>
    </header>

    <!-- Navigation -->
    <nav>
        <div class="container nav-container">
            <div class="logo">
                <a href="#" style="font-weight: bold; font-size: 1.2rem; color: var(--dark-color); text-decoration: none;">Blog Home</a>
            </div>
            <ul class="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Categories</a></li>
                <li><a href="#">Archives</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container">
        <div class="main-content">
            <!-- Blog Posts Section -->
            <main>
                <h2 style="margin-bottom: 1.5rem;">Latest Posts</h2>
                
                <ul class="posts-list">
                    <!-- Post 1 -->
                    <li class="post-item">
                        <h3 class="post-title"><a href="#">Getting Started with Jekyll: A Beginner's Guide</a></h3>
                        <div class="post-meta">
                            <span class="post-date">2023-10-15</span>
                            <span class="read-time">5 min read</span>
                        </div>
                        <div class="post-categories">
                            <span class="category-tag">Jekyll</span>
                            <span class="category-tag">Web Development</span>
                            <span class="category-tag">Tutorial</span>
                        </div>
                        <p class="post-excerpt">Learn how to set up your first Jekyll blog and customize it to fit your needs. This guide walks you through the entire process from installation to deployment.</p>
                        <a href="#" class="read-more">Continue reading →</a>
                    </li>
                    
                    <!-- Post 2 -->
                    <li class="post-item">
                        <h3 class="post-title"><a href="#">Optimizing Your GitHub Pages Site for Better Performance</a></h3>
                        <div class="post-meta">
                            <span class="post-date">2023-10-10</span>
                            <span class="read-time">7 min read</span>
                        </div>
                        <div class="post-categories">
                            <span class="category-tag">GitHub Pages</span>
                            <span class="category-tag">Performance</span>
                            <span class="category-tag">Web Development</span>
                        </div>
                        <p class="post-excerpt">Discover techniques to make your GitHub Pages site load faster and provide a better user experience. From image optimization to caching strategies.</p>
                        <a href="#" class="read-more">Continue reading →</a>
                    </li>
                    
                    <!-- Post 3 -->
                    <li class="post-item">
                        <h3 class="post-title"><a href="#">The Future of Static Site Generators</a></h3>
                        <div class="post-meta">
                            <span class="post-date">2023-10-05</span>
                            <span class="read-time">4 min read</span>
                        </div>
                        <div class="post-categories">
                            <span class="category-tag">Static Sites</span>
                            <span class="category-tag">Web Development</span>
                            <span class="category-tag">Trends</span>
                        </div>
                        <p class="post-excerpt">Exploring the growing popularity of static site generators and what the future holds for this approach to building websites and applications.</p>
                        <a href="#" class="read-more">Continue reading →</a>
                    </li>
                </ul>
                
                <!-- Pagination -->
                <div class="pagination">
                    <a href="#" class="pagination-link active">1</a>
                    <a href="#" class="pagination-link">2</a>
                    <a href="#" class="pagination-link">3</a>
                    <a href="#" class="pagination-link">Next →</a>
                </div>
            </main>
            
            <!-- Sidebar -->
            <aside class="sidebar">
                <!-- About Section -->
                <div class="sidebar-section">
                    <h3 class="sidebar-title">About</h3>
                    <div class="about-content">
                        <p>Welcome to my blog where I share my journey in web development, design, and technology. Join me as I explore new tools and techniques.</p>
                    </div>
                </div>
                
                <!-- Categories -->
                <div class="sidebar-section">
                    <h3 class="sidebar-title">Categories</h3>
                    <ul class="categories-list">
                        <li><a href="#">Jekyll <span class="category-count">5</span></a></li>
                        <li><a href="#">GitHub Pages <span class="category-count">3</span></a></li>
                        <li><a href="#">Web Design <span class="category-count">8</span></a></li>
                        <li><a href="#">Development <span class="category-count">12</span></a></li>
                        <li><a href="#">Tutorials <span class="category-count">7</span></a></li>
                    </ul>
                </div>
                
                <!-- Subscribe -->
                <div class="sidebar-section">
                    <h3 class="sidebar-title">Subscribe</h3>
                    <p>Get the latest posts delivered right to your inbox.</p>
                    <form class="subscribe-form">
                        <input type="email" placeholder="Your email address">
                        <button type="submit" class="subscribe-btn">Subscribe</button>
                    </form>
                </div>
                
                <!-- Social Links -->
                <div class="sidebar-section">
                    <h3 class="sidebar-title">Follow</h3>
                    <div class="social-links">
                        <a href="#" class="social-link">T</a>
                        <a href="#" class="social-link">F</a>
                        <a href="#" class="social-link">G</a>
                        <a href="#" class="social-link">L</a>
                    </div>
                </div>
            </aside>
        </div>
    </div>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>About This Blog</h3>
                    <p>A Jekyll-powered blog focused on web development, design, and technology insights.</p>
                </div>
                
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Categories</a></li>
                        <li><a href="#">Archives</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Legal</h3>
                    <ul class="footer-links">
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Use</a></li>
                        <li><a href="#">Disclaimer</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="copyright">
                <p>&copy; 2023 My Blog. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        // Simple script to toggle mobile menu (if needed)
        document.addEventListener('DOMContentLoaded', function() {
            // This is where you could add any interactive functionality
            console.log('Blog layout loaded');
        });
    </script>
</body>
</html>
