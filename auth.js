import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBkWZi9yyEQQ4DZyHxpoN7zH2qflQra6V4",
    authDomain: "careerpivot-5938c.firebaseapp.com",
    projectId: "careerpivot-5938c",
    storageBucket: "careerpivot-5938c.firebasestorage.app",
    messagingSenderId: "340987700434",
    appId: "1:340987700434:web:78925f7b9cad721f0bf90b",
    measurementId: "G-79SPX2DRSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// State sync helper
async function syncUserToState(user) {
    if (!user) {
        window.state.user = null;
        window.state.userPlan = 'starter';
        window.state.analysesUsed = 0;
        window.state.isAdmin = false;
        updateAuthUI(null);
        return;
    }

    const adminEmail = "reyhansingh01@gmail.com";

    // Load from Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const data = userDoc.data();
        window.state.userPlan = data.userPlan || 'starter';
        window.state.analysesUsed = data.analysesUsed || 0;
        window.state.isAdmin = data.role === 'admin' || user.email === adminEmail;

        // Ensure admin role is persisted if email matches but role is missing
        if (user.email === adminEmail && data.role !== 'admin') {
            await setDoc(userDocRef, { role: 'admin' }, { merge: true });
        }
    } else {
        // Init new user in Firestore
        const isInitialAdmin = user.email === adminEmail;
        await setDoc(userDocRef, {
            email: user.email,
            userPlan: 'starter',
            analysesUsed: 0,
            role: isInitialAdmin ? 'admin' : 'user',
            createdAt: new Date()
        });
        window.state.userPlan = 'starter';
        window.state.analysesUsed = 0;
        window.state.isAdmin = isInitialAdmin;
    }

    window.state.user = user;
    updateAuthUI(user);

    // Refresh dashboard if active
    if (document.body.classList.contains('dashboard-active') && window.state.analysis) {
        window.renderDashboard(window.state.analysis);
    }
}

// UI Updates
function updateAuthUI(user) {
    const navLinks = document.querySelector('.nav-links');
    const loginBtn = document.getElementById('nav-login-btn');

    if (user) {
        if (loginBtn) loginBtn.remove();

        // Remove existing profile if any
        const existingProfile = document.querySelector('.user-profile');
        if (existingProfile) existingProfile.remove();

        const profileHTML = `
            <div class="user-profile" id="user-profile-toggle">
                <div class="user-avatar">${user.email[0].toUpperCase()}</div>
                <span class="user-email">${user.email}</span>
            </div>
        `;
        const profileContainer = document.createElement('div');
        profileContainer.innerHTML = profileHTML;
        const profileEl = profileContainer.firstElementChild;

        // Add to nav before "Start Your Pivot"
        const startBtn = document.getElementById('nav-start-btn');
        navLinks.insertBefore(profileEl, startBtn);

        // Add Admin Panel link if admin
        if (window.state.isAdmin) {
            const adminLink = document.createElement('a');
            adminLink.href = "#";
            adminLink.className = "nav-link admin-glow";
            adminLink.id = "nav-admin-btn";
            adminLink.textContent = "Admin Panel";
            adminLink.style.color = "var(--accent-gold)";
            navLinks.insertBefore(adminLink, profileEl);

            adminLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.showAdminDashboard) window.showAdminDashboard();
            });
        }

        profileEl.addEventListener('click', () => {
            if (confirm('Do you want to logout?')) {
                logout();
            }
        });
    } else {
        // Show Login button again
        if (!loginBtn && navLinks) {
            const newLoginBtn = document.createElement('a');
            newLoginBtn.href = "#";
            newLoginBtn.className = "nav-link";
            newLoginBtn.id = "nav-login-btn";
            newLoginBtn.textContent = "Sign In";

            const startBtn = document.getElementById('nav-start-btn');
            navLinks.insertBefore(newLoginBtn, startBtn);

            newLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showAuthModal();
            });
        }
    }
}

// Auth Lifecycle
onAuthStateChanged(auth, async (user) => {
    await syncUserToState(user);
});

// Auth Persistence Helper (to be called from script.js)
window.saveUserDataToCloud = async function () {
    if (window.state.user) {
        const userDocRef = doc(db, "users", window.state.user.uid);
        await setDoc(userDocRef, {
            userPlan: window.state.userPlan,
            analysesUsed: window.state.analysesUsed
        }, { merge: true });
    }
};

// Modal Logic
const modal = document.getElementById('auth-modal');
const closeBtn = document.getElementById('auth-close');
const googleBtn = document.getElementById('google-login-btn');
const tabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

function showAuthModal() {
    modal.classList.add('active');
}

function hideAuthModal() {
    modal.classList.remove('active');
}

closeBtn?.addEventListener('click', hideAuthModal);
window.addEventListener('click', (e) => { if (e.target === modal) hideAuthModal(); });

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.dataset.tab;
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        document.getElementById(`${target}-form`).classList.add('active');
    });
});

// Auth Actions
googleBtn?.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        hideAuthModal();
    } catch (error) {
        alert(error.message);
    }
});

loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        hideAuthModal();
    } catch (error) {
        alert(error.message);
    }
});

registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const pass = document.getElementById('register-password').value;
    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        hideAuthModal();
    } catch (error) {
        alert(error.message);
    }
});

async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Logout failed', error);
    }
}

// Initial binding for Login button
document.getElementById('nav-login-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    showAuthModal();
});
