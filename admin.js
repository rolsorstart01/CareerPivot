// ============================================
// CareerPivot - Admin Dashboard Logic
// ============================================

const { collection, getDocs, updateDoc, doc } = window.firestore;

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

    try {
        const querySnapshot = await getDocs(collection(window.db, "users"));
        tableBody.innerHTML = '';

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
        tableBody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: var(--danger);">Error loading users.</td></tr>';
    }
}

window.toggleUserPlan = async function (uid, currentPlan) {
    const newPlan = currentPlan === 'pro' ? 'starter' : 'pro';
    if (!confirm(`Change user plan to ${newPlan.toUpperCase()}?`)) return;

    try {
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
