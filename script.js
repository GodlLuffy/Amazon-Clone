// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for "Back to top" button
    const backToTop = document.querySelector('.footer-top');
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Dynamic search suggestions
    const searchInput = document.querySelector('.search-input');
    const searchSelect = document.querySelector('.search-select');
    
    const suggestions = {
        'All': ['Amazon Basics', 'Amazon Fresh', 'Amazon Prime', 'Amazon Fashion'],
        'Electronics': ['Smartphones', 'Laptops', 'Headphones', 'Smart Home'],
        'Books': ['Fiction', 'Non-Fiction', 'Children Books', 'Textbooks'],
        'Fashion': ['Men', 'Women', 'Kids', 'Shoes']
    };

    // Create suggestion box
    const suggestionBox = document.createElement('div');
    suggestionBox.className = 'search-suggestions';
    searchInput.parentElement.appendChild(suggestionBox);

    // Search input handler
    searchInput.addEventListener('input', (e) => {
        const category = searchSelect.value;
        const value = e.target.value.toLowerCase();
        
        if (value.length > 0) {
            const filtered = suggestions[category].filter(item => 
                item.toLowerCase().includes(value)
            );
            
            displaySuggestions(filtered);
        } else {
            suggestionBox.style.display = 'none';
        }
    });

    function displaySuggestions(items) {
        if (items.length === 0) {
            suggestionBox.style.display = 'none';
            return;
        }

        suggestionBox.innerHTML = items
            .map(item => `<div class="suggestion-item">${item}</div>`)
            .join('');
        suggestionBox.style.display = 'block';
    }

    // Cart animation
    const cartButton = document.querySelector('.nav-cart');
    let cartCount = 0;

    cartButton.addEventListener('click', () => {
        cartCount++;
        animateCartAdd();
    });

    function animateCartAdd() {
        const cartText = cartButton.querySelector('p');
        cartText.textContent = `Cart (${cartCount})`;
        
        cartButton.classList.add('cart-bump');
        setTimeout(() => cartButton.classList.remove('cart-bump'), 300);
    }

    // Dynamic deal countdown timers
    const dealCards = document.querySelectorAll('.deal-card');
    
    dealCards.forEach(card => {
        const timeDisplay = document.createElement('div');
        timeDisplay.className = 'deal-timer';
        card.querySelector('.deal-info').appendChild(timeDisplay);
        
        // Random time between 1 and 24 hours
        let timeLeft = Math.floor(Math.random() * 24 * 60 * 60);
        
        updateTimer(timeDisplay, timeLeft);
        
        setInterval(() => {
            timeLeft--;
            updateTimer(timeDisplay, timeLeft);
        }, 1000);
    });

    function updateTimer(display, seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        display.textContent = `Ends in: ${hours}h ${minutes}m ${secs}s`;
        
        if (seconds < 3600) { // Less than 1 hour
            display.classList.add('urgent');
        }
    }

    // Lazy loading images
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });

    // Shop card hover effects
    const shopCards = document.querySelectorAll('.shop-card');
    
    shopCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });

    // Add to cart animation
    function createFloatingElement(x, y) {
        const elem = document.createElement('div');
        elem.className = 'floating-cart-item';
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        document.body.appendChild(elem);
        
        const cart = document.querySelector('.nav-cart');
        const cartRect = cart.getBoundingClientRect();
        
        elem.style.transform = `translate(${cartRect.left - x}px, ${cartRect.top - y}px)`;
        
        setTimeout(() => elem.remove(), 1000);
    }

    document.querySelectorAll('.shop-card a, .deal-card').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const rect = e.target.getBoundingClientRect();
            createFloatingElement(rect.left, rect.top);
            cartCount++;
            animateCartAdd();
        });
    });

    // Language selector
    const languageBtn = document.querySelector('.nav-language');
    const languages = ['EN', 'ES', 'FR', 'DE', 'IT'];
    let currentLang = 0;

    languageBtn.addEventListener('click', () => {
        currentLang = (currentLang + 1) % languages.length;
        const langSpan = languageBtn.querySelector('span');
        langSpan.textContent = languages[currentLang];
        
        langSpan.classList.add('lang-change');
        setTimeout(() => langSpan.classList.remove('lang-change'), 300);
    });

    // Add CSS for new animations
    const style = document.createElement('style');
    style.textContent = `
        .cart-bump {
            animation: bump 0.3s ease-out;
        }

        @keyframes bump {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }

        .search-suggestions {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 0 0 4px 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            z-index: 1000;
        }

        .suggestion-item {
            padding: 8px 12px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .suggestion-item:hover {
            background-color: #f5f5f5;
        }

        .deal-timer {
            margin-top: 8px;
            font-size: 12px;
            color: #565959;
        }

        .deal-timer.urgent {
            color: #cc0c39;
            font-weight: bold;
        }

        .floating-cart-item {
            position: fixed;
            width: 10px;
            height: 10px;
            background: #ff9900;
            border-radius: 50%;
            pointer-events: none;
            transition: transform 1s cubic-bezier(0.2, 1, 0.3, 1);
        }

        .lang-change {
            animation: bounce 0.3s ease-out;
        }

        @keyframes bounce {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }

        .fade-in {
            animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});
