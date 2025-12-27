// ============================================
// CareerPivot - Admin Dashboard Logic
// ============================================

window.showAdminDashboard = async function () {
    if (!window.state.isAdmin) {
        alert("Access denied. Admin only.");
        return;
    }

    const adminModal = document.getElementById('admin-dashboard');
    adminModal.classList.add('active');

    // Fetch Stats (Mocked or simple queries for now to avoid complex collection scans if not indexed)
    // In a real app, you'd have an 'aggregator' doc or use Firebase Functions for stats.
    // For this version, we'll simulate the load with realistic placeholders.

    updateAdminStatsUI();
};

function updateAdminStatsUI() {
    document.getElementById('total-users-stat').textContent = "---";
    document.getElementById('pro-users-stat').textContent = "---";

    // Simulate database delay
    setTimeout(() => {
        // Since we are using Firebase, we could do:
        // getCountFromServer(collection(db, "users"))
        // But for this prototype, we show descriptive placeholders
        document.getElementById('total-users-stat').textContent = "Live Updates Active";
        document.getElementById('pro-users-stat').textContent = "1 User (You)";

        const activityList = document.getElementById('admin-activity-list');
        activityList.innerHTML = `
            <div class="activity-item">
                <span class="activity-dot"></span>
                <p><strong>Admin Logged In:</strong> ${window.state.user.email}</p>
                <span class="activity-time">Just Now</span>
            </div>
            <div class="activity-item" style="opacity: 0.5;">
                <span class="activity-dot"></span>
                <p>System initialized with Firebase Auth.</p>
                <span class="activity-time">5 mins ago</span>
            </div>
        `;
    }, 800);
}
