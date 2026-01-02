// =========================================
// BROKEN BROWNIE - FRONTEND LOGIC (FINAL)
// =========================================

// --- 1. MENU DATA (The Database of Taste) ---
const defaultMenu = [
    // === BROWNIES ===
    { name: "Classic Brownie", desc: "The OG Crinkle Top.", cat: "brownie", img: "https://images.unsplash.com/photo-1610444582965-c3f25c786634?auto=format&fit=crop&w=600", badge: "BESTSELLER" },
    { name: "Nutella Brownie", desc: "Hazelnut swirl overload.", cat: "brownie", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=600", badge: "" },
    { name: "Biscoff Brownie", desc: "Caramelized biscuit bliss.", cat: "brownie", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600", badge: "MUST TRY" },
    { name: "KitKat Brownie", desc: "The perfect crunch.", cat: "brownie", img: "https://images.unsplash.com/photo-1616031026027-37df75790586?auto=format&fit=crop&w=600", badge: "" },
    { name: "Chunky Brownie", desc: "Loaded with chocolate chunks.", cat: "brownie", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=600", badge: "" },
    { name: "Brownie Jar", desc: "Big, Medium, or Small.", cat: "brownie", img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600", badge: "" },
    { name: "Custom Brownie", desc: "Your Masterpiece.", cat: "brownie", img: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&w=600", badge: "CUSTOM" },

    // === JAR CAKES ===
    { name: "Red Velvet Jar", desc: "With Cream Cheese.", cat: "jar", img: "https://images.unsplash.com/photo-1563539062369-21448dbd4986?auto=format&fit=crop&w=600", badge: "POPULAR" },
    { name: "Choco Fudge Jar", desc: "Gooey goodness.", cat: "jar", img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=600", badge: "" },
    { name: "Ferrero Jar", desc: "Hazelnut Luxury.", cat: "jar", img: "https://images.unsplash.com/photo-1588647573656-749f76a591e6?auto=format&fit=crop&w=600", badge: "LUXURY" },
    { name: "Biscoff Jar", desc: "Lotus Base.", cat: "jar", img: "https://images.unsplash.com/photo-1619158403521-ed919856610f?auto=format&fit=crop&w=600", badge: "MUST TRY" },
    { name: "Coffee Jar", desc: "Espresso infused.", cat: "jar", img: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=600", badge: "" },
    { name: "Butterscotch Jar", desc: "Crunchy praline.", cat: "jar", img: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=600", badge: "" },
    { name: "Oreo Jar", desc: "Cookies & Cream.", cat: "jar", img: "https://images.unsplash.com/photo-1533230620868-80df24479905?auto=format&fit=crop&w=600", badge: "" },

    // === CHEESECAKES ===
    { name: "Blueberry Cheesecake", desc: "Exotic topping.", cat: "cheesecake", img: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?auto=format&fit=crop&w=600", badge: "FRESH" },
    { name: "Biscoff Cheesecake", desc: "Lotus Base.", cat: "cheesecake", img: "https://images.unsplash.com/photo-1627054366367-789a647a74bb?auto=format&fit=crop&w=600", badge: "" },
    { name: "Classic NY", desc: "Original style.", cat: "cheesecake", img: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=600", badge: "" },
    { name: "Mango Cheesecake", desc: "Seasonal Special.", cat: "cheesecake", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600", badge: "" },

    // === BENTO CAKES ===
    { name: "Bento Vanilla", desc: "Cute Lunchbox Cake.", cat: "bento", img: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=600", badge: "" },
    { name: "Bento Chocolate", desc: "Mini Celebration.", cat: "bento", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600", badge: "" },
    { name: "Bento Red Velvet", desc: "Romantic Mini.", cat: "bento", img: "https://images.unsplash.com/photo-1586277779919-0df8f4c28c89?auto=format&fit=crop&w=600", badge: "" },
    { name: "Bento Black Forest", desc: "Classic.", cat: "bento", img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=600", badge: "" },
    { name: "Custom Bento", desc: "Your Design Here.", cat: "bento", img: "https://images.unsplash.com/photo-1562967667-366914619737?auto=format&fit=crop&w=600", badge: "CUSTOM" },

    // === TEA CAKES ===
    { name: "Classic Tea Cake", desc: "Soft & Spongy Vanilla.", cat: "tea", img: "https://images.unsplash.com/photo-1605807646983-377bc5a76493?auto=format&fit=crop&w=600", badge: "" },
    { name: "Banana Walnut", desc: "Moist & Crunchy.", cat: "tea", img: "https://images.unsplash.com/photo-1586788224331-947f68671038?auto=format&fit=crop&w=600", badge: "HEALTHY" },
    { name: "Marble Cake", desc: "Choco-Vanilla swirl.", cat: "tea", img: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=600", badge: "" },

    // === BEVERAGES ===
    { name: "Hot Chocolate", desc: "Belgian Cocoa Blend.", cat: "drink", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600", badge: "HOT" }
];

// --- 2. REVIEWS DATA ---
const defaultReviews = [
    { name: "Ananya R.", text: "The Red Velvet Jar is strictly addictive.", stars: 5 },
    { name: "Rahul K.", text: "Ordered a customized Bento cake. The detailing was insane.", stars: 5 },
    { name: "Sneha M.", text: "Best Fudgy Brownies in Chennai. Period.", stars: 5 }
];

// --- 3. STATE MANAGEMENT ---
let menuData = JSON.parse(localStorage.getItem('brokenBrownieMenu')) || defaultMenu;
let reviewsData = JSON.parse(localStorage.getItem('brokenBrownieReviews')) || defaultReviews;
let isAdmin = false;

// --- 4. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    renderReviews();
    setupEventListeners();
    trackVisitor(); // Starts the analytics tracking
    
    // Load saved theme
    const savedTheme = localStorage.getItem('brokenBrownieTheme');
    if(savedTheme) document.body.classList.add(`theme-${savedTheme}`);
});

// --- 5. MENU RENDERING ---
function renderMenu() {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = ''; 

    menuData.forEach((item, index) => {
        const card = document.createElement('div');
        // Default show 'brownie' tab on load
        card.className = `tilt-card ${item.cat} hover-trigger`;
        if(item.cat !== 'brownie') card.style.display = 'none';

        const badgeHTML = item.badge ? `<div class="badge">${item.badge}</div>` : '';
        const deleteBtn = `<button class="delete-btn" onclick="deleteItem(${index})">X</button>`;

        card.innerHTML = `
            ${badgeHTML}
            ${deleteBtn}
            <div class="card-visual" style="background-image: url('${item.img}');"></div>
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <button class="action-btn" onclick="openProductModal('${item.name}')">Order</button>
            </div>
        `;
        grid.appendChild(card);
    });
    applyTiltEffect();
}

// --- 6. MENU FILTERING ---
function filterMenu(cat) {
    // 1. Highlight the active button
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    // Find the button that was clicked OR match the category string
    const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick').includes(cat));
    if(activeBtn) activeBtn.classList.add('active');
    
    // 2. Show/Hide Cards with Animation
    document.querySelectorAll('.tilt-card').forEach(card => {
        if(card.classList.contains(cat)) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}

// --- 7. REVIEWS LOGIC ---
function renderReviews() {
    const grid = document.getElementById('reviews-grid');
    grid.innerHTML = '';
    
    reviewsData.forEach(rev => {
        const stars = "★".repeat(rev.stars) + "☆".repeat(5 - rev.stars);
        const card = document.createElement('div');
        card.className = "glass-review hover-trigger";
        card.innerHTML = `
            <div class="stars">${stars}</div>
            <p>"${rev.text}"</p>
            <cite>— ${rev.name}</cite>
        `;
        grid.appendChild(card);
    });
}

function openReviewModal() { document.getElementById('review-modal').classList.remove('hidden'); }

function submitReview() {
    const name = document.getElementById('review-name').value;
    const text = document.getElementById('review-text').value;
    const rating = document.getElementById('review-rating').value;

    if(name && text) {
        reviewsData.unshift({ name, text, stars: parseInt(rating) });
        localStorage.setItem('brokenBrownieReviews', JSON.stringify(reviewsData));
        renderReviews();
        closeModal('review-modal');
        alert("Thanks for your feedback!");
    } else {
        alert("Please fill in your name and review.");
    }
}

// --- 8. ADMIN LOGIC ---
function openAdminLogin() { document.getElementById('login-modal').classList.remove('hidden'); }

function checkLogin() {
    if(document.getElementById('admin-pass').value === 'brownie123') { 
        isAdmin = true;
        document.body.classList.add('admin-active');
        document.getElementById('admin-controls').classList.remove('hidden');
        closeModal('login-modal');
        alert("Welcome, Owner!");
    } else alert("Incorrect Passcode");
}

function adminLogout() {
    isAdmin = false;
    document.body.classList.remove('admin-active');
    document.getElementById('admin-controls').classList.add('hidden');
}

function openAddModal() { document.getElementById('add-modal').classList.remove('hidden'); }

function saveNewItem() {
    const name = document.getElementById('new-name').value;
    const desc = document.getElementById('new-desc').value;
    const img = document.getElementById('new-img').value || "https://images.unsplash.com/photo-1578985545062-69928b1d9587";
    const cat = document.getElementById('new-cat').value;
    const badge = document.getElementById('new-badge').value;

    if(name && desc) {
        menuData.push({ name, desc, img, cat, badge });
        localStorage.setItem('brokenBrownieMenu', JSON.stringify(menuData));
        renderMenu();
        closeModal('add-modal');
        filterMenu(cat); // Switch to the category of the new item
    } else alert("Please fill name and description");
}

function deleteItem(index) {
    if(confirm("Delete this item?")) {
        menuData.splice(index, 1);
        localStorage.setItem('brokenBrownieMenu', JSON.stringify(menuData));
        renderMenu();
    }
}

// --- 9. UTILITIES ---
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

function setTheme(theme) {
    document.body.className = ''; 
    if(theme !== 'midnight') document.body.classList.add(`theme-${theme}`);
    if(isAdmin) document.body.classList.add('admin-active');
    localStorage.setItem('brokenBrownieTheme', theme);
}

// --- 10. MOUSE & SCROLL EFFECTS ---
function setupEventListeners() {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');

    if(window.matchMedia("(pointer: fine)").matches) {
        let mouseX=0, mouseY=0, ringX=0, ringY=0;
        window.addEventListener('mousemove', e => { mouseX=e.clientX; mouseY=e.clientY; dot.style.left=`${mouseX}px`; dot.style.top=`${mouseY}px`; });
        
        const animate = () => {
            ringX += (mouseX - ringX) * 0.1; ringY += (mouseY - ringY) * 0.1;
            ring.style.left = `${ringX}px`; ring.style.top = `${ringY}px`;
            requestAnimationFrame(animate);
        };
        animate();
        
        document.body.addEventListener('mouseover', e => {
            if(e.target.closest('.hover-trigger')) document.body.classList.add('hovering');
            else document.body.classList.remove('hovering');
        });
    }

    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });
}

function applyTiltEffect() {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            const centerX = rect.width/2; 
            const centerY = rect.height/2;
            const rotateX = ((y - centerY)/centerY) * -10;
            const rotateY = ((x - centerX)/centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)');
    });
}

// --- 11. VISITOR TRACKING (The Brain Connection) ---
async function trackVisitor() {
    const deviceType = window.innerWidth < 768 ? 'Mobile' : 'Desktop';
    try {
        // Points to RENDER (Cloud) - Update this URL if your Render link is different!
        await fetch('https://broken-brownie-api.onrender.com/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device: deviceType })
        });
    } catch (err) { console.log("Tracking skipped."); }
}

// --- 12. SEARCH, CART & MODALS LOGIC ---

// Search Logic
function filterSearch() {
    const input = document.getElementById('spotlight-search').value.toLowerCase();
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        // If search has text, show matching cards regardless of category
        if (input.length > 0) {
            if (title.includes(input)) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
            }
        } else {
            // If search is cleared, reset to currently active tab (defaults to brownie)
            const activeBtn = document.querySelector('.tab-btn.active');
            // Extract category from onclick attribute: "filterMenu('brownie')" -> "brownie"
            const currentCat = activeBtn ? activeBtn.getAttribute('onclick').match(/'([^']+)'/)[1] : 'brownie';
            
            if (card.classList.contains(currentCat)) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Shopping Cart Logic
let cart = [];

function addToCart(itemName) {
    cart.push(itemName);
    updateCartUI();
    closeModal('product-modal');
    alert(`${itemName} added to bag! 👜`);
}

function updateCartUI() {
    const cartEl = document.getElementById('smart-bag');
    const countEl = document.querySelector('.cart-count');
    
    if (cart.length > 0) {
        cartEl.classList.remove('hidden');
        countEl.innerText = `${cart.length} Items`;
    } else {
        cartEl.classList.add('hidden');
    }
}

function checkoutWhatsApp() {
    if(cart.length === 0) return;
    
    const orderList = cart.map((item, index) => `${index + 1}. ${item}`).join('\n');
    const msg = `Hey Broken Brownie! I want to order from your website:\n\n${orderList}\n\nDo you deliver to my location?`;
    
    window.open(`https://wa.me/919789028598?text=${encodeURIComponent(msg)}`, '_blank');
}

// Cinematic Modal Logic
function openProductModal(itemName) {
    const item = menuData.find(i => i.name === itemName);
    if (!item) return;

    document.getElementById('view-img').src = item.img;
    document.getElementById('view-name').innerText = item.name;
    document.getElementById('view-desc').innerText = item.desc;
    document.getElementById('view-badge').innerText = item.badge || "FRESH";
    
    const btn = document.getElementById('view-add-btn');
    btn.onclick = function() { addToCart(item.name); };
    
    document.getElementById('product-modal').classList.remove('hidden');
}