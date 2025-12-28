// ============================================
// CareerPivot - Admin Dashboard Logic
// ============================================

// const { collection, getDocs, updateDoc, doc } = window.firestore; // Moved inside functions to avoid startup race condition

window.showAdminDashboard = async function () {
    if (!window.state.isAdmin) {
        alert("Access denied. Admin only.");
        return;
    }

    const adminModal = document.getElementById('admin-dashboard');
    adminModal.classList.add('active');

    // Load Data
    updateAdminStatsUI();
    fetchUsers();
};

async function fetchUsers() {
    const tableBody = document.getElementById('admin-user-table-body');
    if (!tableBody) return;

    // Check DB Connection
    if (!window.db) {
        console.error("CareerPivot: DB not initialized.");
        tableBody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: var(--danger);">Database not connected. Try refreshing.</td></tr>';
        return;
    }

    tableBody.innerHTML = '<tr><td colspan="3" style="text-align: center;">Loading users...</td></tr>';

    try {
        const { collection, getDocs } = window.firestore;

        // Create a timeout promise
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 5000)
        );

        // Race fetching against timeout
        const querySnapshot = await Promise.race([
            getDocs(collection(window.db, "users")),
            timeout
        ]);

        tableBody.innerHTML = '';

        if (querySnapshot.empty) {
            tableBody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No users found.</td></tr>';
            return;
        }

        let totalUsers = 0;
        let proUsers = 0;

        querySnapshot.forEach((docSnap) => {
            const user = docSnap.data();
            const uid = docSnap.id;
            totalUsers++;
            if (user.userPlan === 'pro') proUsers++;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.email}</td>
                <td><span class="plan-badge-mini ${user.userPlan || 'starter'}">${(user.userPlan || 'starter').toUpperCase()}</span></td>
                <td>
                    <button class="btn-toggle-plan" onclick="toggleUserPlan('${uid}', '${user.userPlan || 'starter'}')">
                        Switch to ${user.userPlan === 'pro' ? 'Starter' : 'Pro'}
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        document.getElementById('total-users-stat').textContent = totalUsers;
        document.getElementById('pro-users-stat').textContent = proUsers;

    } catch (error) {
        console.error("Error fetching users:", error);
        let msg = "Error loading users.";
        if (error.message === "Request timed out") msg = "Connection timed out. Check internet.";
        if (error.code === 'permission-denied') msg = "Access Denied: Admins Only.";

        tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--danger);">${msg}</td></tr>`;
    }
}

window.toggleUserPlan = async function (uid, currentPlan) {
    const newPlan = currentPlan === 'pro' ? 'starter' : 'pro';
    if (!confirm(`Change user plan to ${newPlan.toUpperCase()}?`)) return;

    try {
        const { doc, updateDoc } = window.firestore;
        const userRef = doc(window.db, "users", uid);
        await updateDoc(userRef, {
            userPlan: newPlan
        });
        alert(`User plan updated to ${newPlan.toUpperCase()}`);
        fetchUsers(); // Refresh table
    } catch (error) {
        console.error("Error updating plan:", error);
        alert("Failed to update plan.");
    }
};

function updateAdminStatsUI() {
    const activityList = document.getElementById('admin-activity-list');
    activityList.innerHTML = `
        <div class="activity-item">
            <span class="activity-dot"></span>
            <p><strong>Admin Session Active:</strong> ${window.state.user.email}</p>
            <span class="activity-time">Just Now</span>
        </div>
    `;
}
