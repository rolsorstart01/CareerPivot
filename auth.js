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
const googleProvider = new GoogleAuthProvider();

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

    try {
        const adminEmail = "reyhansingh01@gmail.com";
        const isHardcodedAdmin = user.email.toLowerCase() === adminEmail.toLowerCase();

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const data = userDoc.data();
            window.state.userPlan = data.userPlan || 'starter';
            window.state.analysesUsed = data.analysesUsed || 0;
            window.state.isAdmin = data.role === 'admin' || isHardcodedAdmin;

            if (isHardcodedAdmin && data.role !== 'admin') {
                console.log("CareerPivot: Promoting hardcoded admin in Firestore...");
                await setDoc(userDocRef, { role: 'admin' }, { merge: true });
            }
        } else {
            console.log("CareerPivot: Creating new user document...");
            await setDoc(userDocRef, {
                email: user.email,
                userPlan: 'starter',
                analysesUsed: 0,
                role: isHardcodedAdmin ? 'admin' : 'user',
                createdAt: new Date()
            });
            window.state.userPlan = 'starter';
            window.state.analysesUsed = 0;
            window.state.isAdmin = isHardcodedAdmin;
        }
    } catch (error) {
        console.error("Firestore sync error:", error);
        window.state.userPlan = 'starter';
        window.state.analysesUsed = 0;
        window.state.isAdmin = user.email === "reyhansingh01@gmail.com";
    }

    window.state.user = user;
    updateAuthUI(user);

    if (document.body.classList.contains('dashboard-active') && window.state.analysis) {
        window.renderDashboard(window.state.analysis);
    }
}

// UI Updates
function updateAuthUI(user) {
    const loginBtn = document.getElementById('loginBtn');
    const profile = document.getElementById('userProfile');
    const avatar = document.getElementById('userAvatar');
    const name = document.getElementById('userName');
    const navLinks = document.querySelector('.nav-links');

    // Clean up any old admin links first
    document.querySelectorAll('#nav-admin-btn').forEach(el => el.remove());

    if (user) {
        // Atomic UI Toggle
        if (loginBtn) loginBtn.classList.add('hidden');
        if (profile) profile.classList.remove('hidden');

        if (profile) {
            if (avatar) {
                // Set a placeholder while loading to avoid broken image icons
                if (!avatar.src || avatar.src.includes('localhost') || avatar.src === window.location.href) {
                    avatar.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                }
                const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=667eea&color=fff`;
                avatar.src = user.photoURL || fallbackAvatar;
            }
            if (name) name.innerText = user.displayName || user.email.split('@')[0];

            // Re-inject Admin Panel if admin
            if (window.state.isAdmin && navLinks) {
                const adminLink = document.createElement('a');
                adminLink.href = "#";
                adminLink.className = "nav-link admin-glow";
                adminLink.id = "nav-admin-btn";
                adminLink.textContent = "Admin Panel";
                adminLink.style.color = "var(--accent-gold)";
                adminLink.style.marginRight = "1rem";
                navLinks.insertBefore(adminLink, profile.parentElement);

                adminLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (window.showAdminDashboard) window.showAdminDashboard();
                });
            }
        }
    } else {
        // Atomic UI Toggle
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (profile) profile.classList.add('hidden');
    }
}

// Auth Lifecycle
onAuthStateChanged(auth, async (user) => {
    try {
        await syncUserToState(user);
    } catch (error) {
        console.error("Auth state change error:", error);
    }
});

// Persistence Helper
window.saveUserDataToCloud = async function () {
    if (window.state.user) {
        const userDocRef = doc(db, "users", window.state.user.uid);
        await setDoc(userDocRef, {
            userPlan: window.state.userPlan,
            analysesUsed: window.state.analysesUsed
        }, { merge: true });
    }
};

// UI Initialization & Event Binding
function initAuthUI() {
    console.log("CareerPivot: Initializing Auth UI...");
    const loginBtn = document.getElementById('loginBtn');
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const authModal = document.getElementById('authModal');
    const closeAuth = document.getElementById('closeAuth');
    const authForm = document.getElementById('emailAuthForm');
    const showSignIn = document.getElementById('showSignIn');
    const showSignUp = document.getElementById('showSignUp');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const authSubmit = document.getElementById('authSubmit');
    const termsGroup = document.getElementById('signup-terms-group');

    console.log("CareerPivot: Elements found:", {
        loginBtn: !!loginBtn,
        authModal: !!authModal,
        googleLoginBtn: !!googleLoginBtn
    });

    let isSigningUp = false;

    // Modal Controls
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            console.log("CareerPivot: Login button clicked!");
            e.preventDefault();
            authModal?.classList.remove('hidden');
            authModal?.classList.add('active');
        });
    } else {
        console.warn("CareerPivot: loginBtn not found in DOM!");
    }

    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.showSettings) window.showSettings();
        });
    }

    const closeSettings = document.getElementById('closeSettings');
    if (closeSettings) {
        closeSettings.addEventListener('click', () => {
            document.getElementById('settingsModal')?.classList.add('hidden');
            document.getElementById('settingsModal')?.classList.remove('active');
        });
    }

    closeAuth?.addEventListener('click', () => {
        authModal?.classList.add('hidden');
        authModal?.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.add('hidden');
            authModal.classList.remove('active');
        }
    });

    // Toggle logic for Login / Sign Up
    showSignIn?.addEventListener('click', () => {
        isSigningUp = false;
        showSignIn.classList.add('active');
        showSignUp?.classList.remove('active');
        if (authTitle) authTitle.innerText = "Welcome Back";
        if (authSubtitle) authSubtitle.innerText = "Continue your career transformation";
        if (authSubmit) authSubmit.innerText = "Sign In";
        if (termsGroup) termsGroup.style.display = 'none';
        const termsInput = document.getElementById('register-terms');
        if (termsInput) termsInput.required = false;
    });

    showSignUp?.addEventListener('click', () => {
        isSigningUp = true;
        showSignUp.classList.add('active');
        showSignIn?.classList.remove('active');
        if (authTitle) authTitle.innerText = "Create Account";
        if (authSubtitle) authSubtitle.innerText = "Set up your personalized escape plan";
        if (authSubmit) authSubmit.innerText = "Sign Up";
        if (termsGroup) termsGroup.style.display = 'block';
        const termsInput = document.getElementById('register-terms');
        if (termsInput) termsInput.required = true;
    });

    // Google Login Action
    googleLoginBtn?.addEventListener('click', async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            authModal?.classList.add('hidden');
        } catch (error) {
            console.error("Google Auth error:", error);
            alert(error.message);
        }
    });

    // Email/Password Action
    authForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;

        if (isSigningUp) {
            const termsBox = document.getElementById('register-terms');
            if (termsBox && !termsBox.checked) {
                alert("Please agree to the Terms and Privacy Policy to create an account.");
                return;
            }
        }

        try {
            if (isSigningUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            authModal?.classList.add('hidden');
        } catch (error) {
            console.error("Email Auth error:", error);
            alert(error.message);
        }
    });

    // Logout Action
    logoutBtn?.addEventListener('click', async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout error:", error);
        }
    });
}

// Start listener
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthUI);
} else {
    initAuthUI();
}
