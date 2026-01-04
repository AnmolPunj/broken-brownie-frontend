// =========================================
// BROKEN BROWNIE - FRONTEND LOGIC (V2 - FULL UPGRADE)
// =========================================

// --- 1. MENU DATA (UPDATED IMAGES & INGREDIENTS) ---
// Using more stable Unsplash IDs where possible. Added 'ing' field.
const defaultMenu = [
    // === BROWNIES ===
    { name: "Classic Brownie", desc: "The OG Crinkle Top.", ing: "70% Belgian Dark Chocolate, Butter, Sugar, Cocoa Powder, Flour (Eggless).", cat: "brownie", img: "https://images.unsplash.com/photo-1589218436045-ee320057f469?w=600", badge: "BESTSELLER" },
    { name: "Nutella Brownie", desc: "Hazelnut swirl overload.", ing: "Classic Brownie base swirled with generous Nutella.", cat: "brownie", img: "https://images.unsplash.com/photo-1618410262862-9d1c51618017?w=600", badge: "" },
    { name: "Biscoff Brownie", desc: "Caramelized biscuit bliss.", ing: "Brownie base topped with Lotus Biscoff spread and biscuits.", cat: "brownie", img: "https://images.unsplash.com/photo-1605698802027-604b00839f4d?w=600", badge: "MUST TRY" },
    { name: "KitKat Brownie", desc: "The perfect crunch.", ing: "Baked with whole KitKat fingers inside.", cat: "brownie", img: "https://images.unsplash.com/photo-1628498922027-91771bfbc76b?w=600", badge: "" },
    { name: "Brownie Jar", desc: "Big, Medium, or Small.", ing: "Layers of crumbled brownie, chocolate ganache, and mousse.", cat: "brownie", img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600", badge: "" },
    
    // === JAR CAKES ===
    { name: "Red Velvet Jar", desc: "With Cream Cheese.", ing: "Red velvet sponge layered with signature cream cheese frosting.", cat: "jar", img: "https://images.unsplash.com/photo-1563539062369-21448dbd4986?w=600", badge: "POPULAR" },
    { name: "Choco Fudge Jar", desc: "Gooey goodness.", ing: "Moist chocolate cake with rich dark chocolate fudge.", cat: "jar", img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600", badge: "" },
    { name: "Ferrero Jar", desc: "Hazelnut Luxury.", ing: "Chocolate sponge, Nutella, roasted hazelnuts, Ferrero Rocher.", cat: "jar", img: "https://images.unsplash.com/photo-1588647573656-749f76a591e6?w=600", badge: "LUXURY" },

    // === CHEESECAKES ===
    { name: "Blueberry Cheesecake", desc: "Exotic topping.", ing: "Biscuit base, baked cream cheese filling, blueberry compote.", cat: "cheesecake", img: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=600", badge: "FRESH" },
    { name: "Biscoff Cheesecake", desc: "Lotus Base.", ing: "Biscoff biscuit base, creamy Biscoff cheesecake filling.", cat: "cheesecake", img: "https://images.unsplash.com/photo-1627054366367-789a647a74bb?w=600", badge: "" },

    // === BENTO CAKES ===
    { name: "Bento Vanilla", desc: "Cute Lunchbox Cake.", ing: "Soft vanilla sponge with buttercream frosting (4 inch).", cat: "bento", img: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600", badge: "" },
    { name: "Bento Chocolate", desc: "Mini Celebration.", ing: "Rich chocolate sponge with ganache (4 inch).", cat: "bento", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600", badge: "" },

    // === TEA CAKES ===
    { name: "Banana Walnut", desc: "Moist & Crunchy.", ing: "Ripe bananas, roasted walnuts, cinnamon, whole wheat flour.", cat: "tea", img: "https://images.unsplash.com/photo-1586788224331-947f68671038?w=600", badge: "HEALTHY" },
    { name: "Marble Cake", desc: "Choco-Vanilla swirl.", ing: "Classic vanilla and chocolate batters swirled together.", cat: "tea", img: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600", badge: "" },

    // === BEVERAGES ===
    { name: "Hot Chocolate", desc: "Belgian Cocoa Blend.", ing: "Whole milk, 70% dark chocolate, cocoa powder, sugar.", cat: "drink", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600", badge: "HOT" }
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
// CART IS NOW PERSISTENT
let cart = JSON.parse(localStorage.getItem('brokenBrownieCart')) || []; 
let isAdmin = false;

// --- 4. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    renderReviews();
    updateCartUI(); // Initialize floating cart button
    setupEventListeners();
    trackVisitor();
    
    const savedTheme = localStorage.getItem('brokenBrownieTheme');
    if(savedTheme) document.body.classList.add(`theme-${savedTheme}`);
});

// ================= NEW: TOAST NOTIFICATION SYSTEM (REPLACES ALERTS) =================
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    container.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
// ===================================================================================


// --- 5. MENU RENDERING (WITH EDIT BUTTONS & INGREDIENTS) ---
function renderMenu() {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = ''; 

    menuData.forEach((item, index) => {
        const card = document.createElement('div');
        // Default show 'brownie' tab on load unless a filter is active
        const activeTab = document.querySelector('.tab-btn.active');
        const currentFilter = activeTab ? activeTab.getAttribute('onclick').match(/'([^']+)'/)[1] : 'brownie';
        
        card.className = `tilt-card ${item.cat} hover-trigger`;
        if(item.cat !== currentFilter) card.style.display = 'none';

        const badgeHTML = item.badge ? `<div class="badge">${item.badge}</div>` : '';
        
        // ADMIN BUTTONS GROUP (Edit & Delete)
        const adminBtns = `
            <div class="admin-btn-group">
                <button class="edit-btn" onclick="openEditModal(${index})">✎</button>
                <button class="delete-btn" onclick="deleteItem(${index})">X</button>
            </div>`;

        card.innerHTML = `
            ${badgeHTML}
            ${adminBtns}
            <div class="card-visual" style="background-image: url('${item.img}');"></div>
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <p class="ingredients-preview">${item.ing ? item.ing.substring(0, 30) + '...' : ''}</p>
                <button class="action-btn" onclick="openProductModal('${item.name}')">Order</button>
            </div>
        `;
        grid.appendChild(card);
    });
    applyTiltEffect();
}

// --- 6. MENU FILTERING ---
function filterMenu(cat) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick').includes(cat));
    if(activeBtn) activeBtn.classList.add('active');
    
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
        card.innerHTML = `<div class="stars">${stars}</div><p>"${rev.text}"</p><cite>— ${rev.name}</cite>`;
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
        showToast("Thanks for your feedback!", "success"); // UPDATED
    } else {
        showToast("Please fill in name and review.", "error"); // UPDATED
    }
}

// --- 8. FULL ADMIN LOGIC (LOGIN, ADD, EDIT, DELETE) ---
function openAdminLogin() { document.getElementById('login-modal').classList.remove('hidden'); }

function checkLogin() {
    if(document.getElementById('admin-pass').value === 'brownie123') { 
        isAdmin = true;
        document.body.classList.add('admin-active');
        document.getElementById('admin-controls').classList.remove('hidden');
        closeModal('login-modal');
        showToast("Welcome, Owner!", "success"); // UPDATED
    } else {
        showToast("Incorrect Passcode", "error"); // UPDATED
    }
}

function adminLogout() {
    isAdmin = false;
    document.body.classList.remove('admin-active');
    document.getElementById('admin-controls').classList.add('hidden');
    showToast("Logged out successfully.");
}

// ADD NEW ITEM
function openAddModal() { 
    // Clear inputs first
    document.getElementById('new-name').value = '';
    document.getElementById('new-desc').value = '';
    document.getElementById('new-ing').value = '';
    document.getElementById('new-img').value = '';
    document.getElementById('add-modal').classList.remove('hidden'); 
}
function saveNewItem() {
    const name = document.getElementById('new-name').value;
    const desc = document.getElementById('new-desc').value;
    const ing = document.getElementById('new-ing').value;
    const img = document.getElementById('new-img').value || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600";
    const cat = document.getElementById('new-cat').value;
    const badge = document.getElementById('new-badge').value;

    if(name && desc) {
        menuData.push({ name, desc, ing, img, cat, badge });
        localStorage.setItem('brokenBrownieMenu', JSON.stringify(menuData));
        renderMenu();
        closeModal('add-modal');
        filterMenu(cat);
        showToast("New Masterpiece Added!", "success");
    } else showToast("Please fill name and description.", "error");
}

// == NEW: EDIT ITEM LOGIC ==
function openEditModal(index) {
    const item = menuData[index];
    // Populate the edit modal with existing data
    document.getElementById('edit-index').value = index;
    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-desc').value = item.desc;
    document.getElementById('edit-ing').value = item.ing || ''; // Handle older items without ing
    document.getElementById('edit-img').value = item.img;
    document.getElementById('edit-cat').value = item.cat;
    document.getElementById('edit-badge').value = item.badge;
    
    document.getElementById('edit-modal').classList.remove('hidden');
}

function saveEditedItem() {
    const index = document.getElementById('edit-index').value;
    const name = document.getElementById('edit-name').value;
    const desc = document.getElementById('edit-desc').value;
    const ing = document.getElementById('edit-ing').value;
    const img = document.getElementById('edit-img').value;
    const cat = document.getElementById('edit-cat').value;
    const badge = document.getElementById('edit-badge').value;

    if(name && desc && index !== '') {
        // Update the item in the array
        menuData[index] = { name, desc, ing, img, cat, badge };
        // Save to local storage
        localStorage.setItem('brokenBrownieMenu', JSON.stringify(menuData));
        // Re-render the menu
        renderMenu();
        closeModal('edit-modal');
        // Ensure the current category remains visible
        filterMenu(cat);
        showToast("Item Updated Successfully!", "success");
    } else {
        showToast("Please fill required fields.", "error");
    }
}

function deleteItem(index) {
    if(confirm("Delete this item permanently?")) {
        menuData.splice(index, 1);
        localStorage.setItem('brokenBrownieMenu', JSON.stringify(menuData));
        renderMenu();
        showToast("Item Deleted.", "error");
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

// --- 10. MOUSE & SCROLL EFFECTS (Mobile check included in CSS now) ---
function setupEventListeners() {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    // Only run custom cursor logic if the device supports fine pointing (mouse)
    if(window.matchMedia("(pointer: fine)").matches) {
        let mouseX=0, mouseY=0, ringX=0, ringY=0;
        window.addEventListener('mousemove', e => { mouseX=e.clientX; mouseY=e.clientY; dot.style.left=`${mouseX}px`; dot.style.top=`${mouseY}px`; });
        const animate = () => { ringX += (mouseX - ringX) * 0.1; ringY += (mouseY - ringY) * 0.1; ring.style.left = `${ringX}px`; ring.style.top = `${ringY}px`; requestAnimationFrame(animate); };
        animate();
        document.body.addEventListener('mouseover', e => { if(e.target.closest('.hover-trigger')) document.body.classList.add('hovering'); else document.body.classList.remove('hovering'); });
    }
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => { if(window.scrollY > 50) nav.classList.add('scrolled'); else nav.classList.remove('scrolled'); });
}

function applyTiltEffect() {
    // Only apply tilt on non-touch devices for better performance
    if(window.matchMedia("(pointer: fine)").matches) {
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; const y = e.clientY - rect.top;
                const centerX = rect.width/2; const centerY = rect.height/2;
                const rotateX = ((y - centerY)/centerY) * -10; const rotateY = ((x - centerX)/centerX) * 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            card.addEventListener('mouseleave', () => card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)');
        });
    }
}

// --- 11. VISITOR TRACKING ---
async function trackVisitor() {
    const deviceType = window.innerWidth < 768 ? 'Mobile' : 'Desktop';
    try { await fetch('https://broken-brownie-api.onrender.com/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ device: deviceType }) }); } catch (err) { console.log("Tracking skipped."); }
}

// --- 12. SEARCH, CART & MODALS LOGIC (UPDATED) ---

// Search Logic
function filterSearch() {
    const input = document.getElementById('spotlight-search').value.toLowerCase();
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        if (input.length > 0) {
            // If searching, show matches from ALL categories
            if (title.includes(input)) {
                card.style.display = 'block'; card.style.opacity = '1';
            } else {
                card.style.display = 'none';
            }
        } else {
            // If search cleared, revert to current active tab
            const activeBtn = document.querySelector('.tab-btn.active');
            const currentCat = activeBtn ? activeBtn.getAttribute('onclick').match(/'([^']+)'/)[1] : 'brownie';
            if (card.classList.contains(currentCat)) { card.style.display = 'block'; card.style.opacity = '1'; } else { card.style.display = 'none'; }
        }
    });
}

// == NEW: CART LOGIC (Persistent & Removable) ==

function addToCart(itemName) {
    cart.push(itemName);
    // Save to local storage immediately
    localStorage.setItem('brokenBrownieCart', JSON.stringify(cart));
    updateCartUI();
    closeModal('product-modal');
    showToast(`${itemName} added to bag! 👜`, "success"); // REPLACES ALERT
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

// Opens the new Cart Modal to view/remove items
function openCartModal() {
    const listContainer = document.getElementById('cart-items-list');
    listContainer.innerHTML = '';
    if(cart.length === 0) {
        listContainer.innerHTML = '<p>Your bag is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'cart-item-row';
            row.innerHTML = `
                <span class="cart-item-name">${index + 1}. ${item}</span>
                <button class="cart-remove-btn" onclick="removeFromCart(${index})">Remove</button>
            `;
            listContainer.appendChild(row);
        });
    }
    document.getElementById('cart-modal').classList.remove('hidden');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('brokenBrownieCart', JSON.stringify(cart));
    updateCartUI();
    openCartModal(); // Re-render the cart list
    showToast("Item removed from bag.");
}

function proceedToWhatsApp() {
    if(cart.length === 0) return;
    const orderList = cart.map((item, index) => `${index + 1}. ${item}`).join('\n');
    const msg = `Hey Broken Brownie! I want to order from your website:\n\n${orderList}\n\nDo you deliver to my location?`;
    
    // Clear cart after proceeding
    cart = [];
    localStorage.removeItem('brokenBrownieCart');
    updateCartUI();
    closeModal('cart-modal');

    window.open(`https://wa.me/919789028598?text=${encodeURIComponent(msg)}`, '_blank');
}

// Cinematic Modal Logic (with ingredients)
function openProductModal(itemName) {
    const item = menuData.find(i => i.name === itemName);
    if (!item) return;
    document.getElementById('view-img').src = item.img;
    document.getElementById('view-name').innerText = item.name;
    document.getElementById('view-desc').innerText = item.desc;
    // Show Ingredients in modal
    document.getElementById('view-ing').innerText = item.ing || "Ingredients unavailable.";
    document.getElementById('view-badge').innerText = item.badge || "FRESH";
    
    const btn = document.getElementById('view-add-btn');
    btn.onclick = function() { addToCart(item.name); };
    document.getElementById('product-modal').classList.remove('hidden');
}