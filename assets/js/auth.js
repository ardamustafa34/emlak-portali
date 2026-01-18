/**
 * Global Emlak - Shared Authentication & UI Logic
 */

function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const fullName = localStorage.getItem('fullName');

    // Desktop Elements
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    const userNameDisplay = document.getElementById('userName');

    // Mobile Elements
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const mobileAuthSection = document.getElementById('mobileAuthSection');
    const mobileUserProfile = document.getElementById('mobileUserProfile'); // New: will add to HTML
    const mobileUserName = document.getElementById('mobileUserName'); // New: will add to HTML

    if (isLoggedIn) {
        // Desktop Fix
        if (loginBtn) loginBtn.classList.add('hidden');
        if (userProfile) {
            userProfile.classList.remove('hidden');
            userProfile.classList.add('flex');
        }
        if (userNameDisplay) userNameDisplay.textContent = fullName || 'Kullanıcı';

        // Mobile Fix - Hide Giriş Yap and Show User Info
        if (mobileLoginBtn) {
            mobileLoginBtn.classList.add('hidden');
            if (mobileLoginBtn.parentElement.id === 'mobileAuthSection') {
                mobileLoginBtn.parentElement.classList.add('hidden');
            }
        }

        if (mobileUserProfile) {
            mobileUserProfile.classList.remove('hidden');
            mobileUserProfile.classList.add('flex');
            if (mobileUserName) mobileUserName.textContent = fullName || 'Kullanıcı';
        }
    } else {
        // Desktop Reset
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (userProfile) userProfile.classList.add('hidden');

        // Mobile Reset
        if (mobileLoginBtn) mobileLoginBtn.classList.remove('hidden');
        if (mobileAuthSection) mobileAuthSection.classList.remove('hidden');
        if (mobileUserProfile) mobileUserProfile.classList.add('hidden');
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('fullName');
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('translate-x-full');
}

// Auto-run checkAuth on load
document.addEventListener('DOMContentLoaded', checkAuth);
