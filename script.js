// ============================================
// CareerPivot - Main Application
// Integrated with Custom AI Engine
// ============================================

// State Management
window.state = {
    currentStep: 1,
    totalSteps: 4,
    userData: {
        currentTitle: '',
        yearsExp: 0,
        industry: '',
        location: '',
        skills: [],
        monthlySalary: 0,
        monthlyExpenses: 0,
        savings: 0,
        emis: 0,
        dreamRole: '',
        pivotReason: '',
        riskTolerance: 3,
        upskillHours: 10,
        constraints: [],
        additionalNotes: ''
    },
    analysis: null,
    ai: null,
    user: null, // Logged in user info
    userPlan: localStorage.getItem('userPlan') || 'starter', // Fallback to local
    analysesUsed: parseInt(localStorage.getItem('analysesUsed')) || 0
};
const state = window.state;

// DOM Elements Cache
const elements = {};

// Initialize App
function init() {
    state.ai = new CareerAI();
    cacheElements();
    setupEventListeners();
    renderWizardContent();
}

function cacheElements() {
    elements.startBtn = document.getElementById('start-pivot-btn');
    elements.navStartBtn = document.getElementById('nav-start-btn');
    elements.wizardSection = document.getElementById('wizard');
    elements.dashboardSection = document.getElementById('dashboard');
}

function setupEventListeners() {
    elements.startBtn?.addEventListener('click', openWizard);
    elements.navStartBtn?.addEventListener('click', (e) => { e.preventDefault(); openWizard(); });

    document.addEventListener('input', (e) => {
        if (['monthly-salary', 'monthly-expenses', 'savings', 'emis'].includes(e.target.id)) {
            updateRunwayCalculation();
        }
    });
}

// ============================================
// WIZARD NAVIGATION
// ============================================
function openWizard() {
    document.body.classList.add('wizard-active');
    elements.wizardSection.classList.add('active');
    state.currentStep = 1;
    updateWizardUI();
}

function closeWizard() {
    document.body.classList.remove('wizard-active');
    elements.wizardSection.classList.remove('active');
}

function nextStep() {
    collectStepData();
    if (state.currentStep < state.totalSteps) {
        state.currentStep++;
        updateWizardUI();
    } else {
        generateAIRoadmap();
    }
}

function prevStep() {
    if (state.currentStep > 1) {
        state.currentStep--;
        updateWizardUI();
    }
}

function updateWizardUI() {
    const progress = (state.currentStep / state.totalSteps) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Step ${state.currentStep} of ${state.totalSteps}`;

    document.querySelectorAll('.wizard-step').forEach((step, index) => {
        step.classList.toggle('active', index + 1 === state.currentStep);
    });

    document.getElementById('wizard-prev').style.visibility = state.currentStep === 1 ? 'hidden' : 'visible';
    document.getElementById('wizard-next').innerHTML = state.currentStep === state.totalSteps
        ? '<span class="btn-loading-text">Generate My AI Roadmap</span> <span class="btn-arrow">🚀</span>'
        : 'Next Step <span class="btn-arrow">→</span>';
}

// ============================================
// DATA COLLECTION
// ============================================
function collectStepData() {
    const d = state.userData;
    switch (state.currentStep) {
        case 1:
            d.currentTitle = document.getElementById('current-title')?.value || '';
            d.yearsExp = parseInt(document.getElementById('years-exp')?.value) || 0;
            d.industry = document.getElementById('industry')?.value || '';
            d.location = document.getElementById('current-location')?.value || '';
            d.skills = [
                document.getElementById('skill-1')?.value,
                document.getElementById('skill-2')?.value,
                document.getElementById('skill-3')?.value
            ].filter(Boolean);
            break;
        case 2:
            d.monthlySalary = parseInt(document.getElementById('monthly-salary')?.value) || 0;
            d.monthlyExpenses = parseInt(document.getElementById('monthly-expenses')?.value) || 0;
            d.savings = parseInt(document.getElementById('savings')?.value) || 0;
            d.emis = parseInt(document.getElementById('emis')?.value) || 0;
            break;
        case 3:
            d.dreamRole = document.getElementById('dream-role')?.value || '';
            d.pivotReason = document.getElementById('pivot-reason')?.value || '';
            d.riskTolerance = parseInt(document.getElementById('risk-tolerance')?.value) || 3;
            d.upskillHours = parseInt(document.getElementById('upskill-hours')?.value) || 10;
            break;
        case 4:
            d.constraints = Array.from(document.querySelectorAll('.constraint-option input:checked')).map(i => i.value);
            d.additionalNotes = document.getElementById('additional-notes')?.value || '';
            break;
    }
}

function updateRunwayCalculation() {
    const salary = parseInt(document.getElementById('monthly-salary')?.value) || 0;
    const expenses = parseInt(document.getElementById('monthly-expenses')?.value) || 0;
    const savings = parseInt(document.getElementById('savings')?.value) || 0;
    const emis = parseInt(document.getElementById('emis')?.value) || 0;

    const monthlyBurn = expenses + emis;
    const runway = monthlyBurn > 0 ? Math.floor(savings / monthlyBurn) : 0;

    const runwayEl = document.getElementById('runway-months');
    if (runwayEl) {
        runwayEl.textContent = `${runway} months`;
        runwayEl.style.color = runway >= 6 ? 'var(--accent-emerald)' : runway >= 3 ? 'var(--accent-gold)' : 'var(--accent-rose)';
    }
}

// ============================================
// AI ANALYSIS & ROADMAP GENERATION
// ============================================
async function generateAIRoadmap() {
    // Plan Enforcement Check
    if (state.userPlan === 'starter' && state.analysesUsed >= 3) {
        alert("You've reached the limit of 3 analyses on the Starter plan. Please upgrade to Pro for unlimited access!");
        window.location.hash = 'pricing';
        return;
    }

    showLoadingOverlay();

    try {
        // Run AI analysis
        const analysis = await state.ai.analyzeCareerTransition(state.userData);
        state.analysis = analysis;

        // Increment usage and persist
        state.analysesUsed++;
        localStorage.setItem('analysesUsed', state.analysesUsed);
        if (window.saveUserDataToCloud) window.saveUserDataToCloud();

        // Simulate progressive loading for UX
        await simulateProgress();

        // Hide wizard, show dashboard
        closeWizard();
        document.body.classList.add('dashboard-active');
        elements.dashboardSection.classList.add('active');

        // Render the AI-generated dashboard
        renderDashboard(analysis);

    } catch (error) {
        console.error('AI Analysis Error:', error);
        hideLoadingOverlay();
        alert('Something went wrong. Please try again.');
    }
}

function showLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-brain">🧠</div>
            <h2>AI is Analyzing Your Profile</h2>
            <div class="loading-steps">
                <div class="loading-step active" id="load-step-1">
                    <span class="step-icon">📊</span>
                    <span class="step-text">Analyzing career feasibility...</span>
                </div>
                <div class="loading-step" id="load-step-2">
                    <span class="step-icon">🎯</span>
                    <span class="step-text">Detecting skill gaps...</span>
                </div>
                <div class="loading-step" id="load-step-3">
                    <span class="step-icon">💰</span>
                    <span class="step-text">Calculating financial runway...</span>
                </div>
                <div class="loading-step" id="load-step-4">
                    <span class="step-icon">🗺️</span>
                    <span class="step-text">Building your roadmap...</span>
                </div>
                <div class="loading-step" id="load-step-5">
                    <span class="step-icon">🔄</span>
                    <span class="step-text">Finding alternative paths...</span>
                </div>
            </div>
            <div class="loading-bar"><div class="loading-bar-fill" id="loading-bar-fill"></div></div>
        </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);
}

async function simulateProgress() {
    const steps = ['load-step-1', 'load-step-2', 'load-step-3', 'load-step-4', 'load-step-5'];
    const bar = document.getElementById('loading-bar-fill');

    for (let i = 0; i < steps.length; i++) {
        await new Promise(r => setTimeout(r, 400));
        document.getElementById(steps[i])?.classList.add('active');
        if (bar) bar.style.width = `${(i + 1) * 20}%`;
    }

    await new Promise(r => setTimeout(r, 300));
    hideLoadingOverlay();
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }
}

// ============================================
// LEGAL MODAL & COMPLIANCE
// ============================================
function openLegalDoc(docKey) {
    const contentArea = document.getElementById('legal-content-area');
    const legalModal = document.getElementById('legal-modal');

    if (window.legalDocs && window.legalDocs[docKey]) {
        contentArea.innerHTML = window.legalDocs[docKey];
        legalModal.classList.add('active');
    }
}

// Bind legal links
document.querySelectorAll('.legal-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const docKey = link.getAttribute('data-doc');
        openLegalDoc(docKey);
    });
});

// Update Registration logic to check T&C
const originalRegisterSubmit = document.getElementById('register-form');
if (originalRegisterSubmit) {
    originalRegisterSubmit.addEventListener('submit', (e) => {
        const termsCheckbox = document.getElementById('register-terms');
        if (termsCheckbox && !termsCheckbox.checked) {
            e.preventDefault();
            e.stopPropagation();
            alert("Please agree to the Terms and Conditions to proceed.");
        }
    }, true); // Use capture to intercept before auth.js
}

// Global modal close on background click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// ============================================
// DASHBOARD RENDERING
// ============================================
window.renderDashboard = function (analysis) {
    elements.dashboardSection.innerHTML = `
        <div class="dashboard-container">
            ${renderDashboardHeader(analysis)}
            ${renderCoachingMessage(analysis.coaching)}
            ${renderFeasibilityScore(analysis.feasibility)}
            ${renderQuickWinsSection(analysis.quickWins)}
            ${renderSummaryCards(analysis)}
            ${renderCompaniesSection(analysis.recommendedCompanies)}
            ${renderWeeklyPlanSection(analysis.weeklyPlan)}
            ${renderRoadmapSection(analysis.roadmap)}
            ${renderSkillGapSection(analysis.skillGap)}
            ${renderDailyHabitsSection(analysis.dailyHabits)}
            ${renderFinancialSection(analysis.financialAnalysis)}
            ${state.userPlan === 'pro' ? renderInterviewPrepSection(analysis.interviewPrep) : renderLockedFeature('Interview Preparation')}
            ${state.userPlan === 'pro' ? renderNetworkingSection(analysis.networkingTemplates) : renderLockedFeature('Networking Templates')}
            ${renderSuccessStoriesSection(analysis.successStories)}
            ${renderRiskSection(analysis.riskAssessment)}
            ${state.userPlan === 'pro' ? renderMistakesSection(analysis.commonMistakes) : ''}
            ${renderBackupPlansSection(analysis.backupPlans)}
            ${renderAlternativesSection(analysis.alternatives)}
            ${renderMotivationSection(analysis.motivation)}
            ${state.userPlan === 'pro' ? renderSalaryTipsSection(analysis.salaryTips) : ''}
            ${renderResourcesSection(analysis.resources)}
            ${renderProgressTrackerSection(analysis.progressTracker)}
            ${renderDashboardCTA()}
        </div>
    `;


    // Bind restart button
    document.getElementById('restart-btn')?.addEventListener('click', restart);

    // Animate elements on scroll
    observeElements();
}

function renderDashboardHeader(analysis) {
    return `
        < div class="dashboard-header" >
            <div class="dashboard-title-area">
                <h1>🎯 Your AI-Powered Escape Plan</h1>
                <p class="dashboard-subtitle">Personalized roadmap from <strong>${state.userData.currentTitle || 'Current Role'}</strong> to <strong>${state.userData.dreamRole || 'Dream Role'}</strong></p>
            </div>
            <button class="btn btn-outline" id="restart-btn">Start Over</button>
        </div >
        `;
}

function renderCompaniesSection(companies) {
    if (!companies || !companies.list || companies.list.length === 0) return '';

    return `
        < div class="companies-section animate-in" >
            <div class="section-header-inline">
                <h2>🏢 Top Companies Hiring in ${companies.city}</h2>
                <p>Based on your target role: <strong>${companies.roleCategory}</strong></p>
            </div>
            <div class="companies-grid">
                ${companies.list.map(c => `
                    <div class="company-card">
                        <div class="company-header">
                            <h4 class="company-name">${c.name}</h4>
                            <span class="company-tier">${c.tier}</span>
                        </div>
                        <div class="company-tags">
                            ${c.tags.map(t => `<span class="company-tag">${t}</span>`).join('')}
                        </div>
                        <a href="${c.url}" target="_blank" class="company-link">View Careers →</a>
                    </div>
                `).join('')}
            </div>
            ${companies.isGeneric ? `<p class="location-note">Note: Showing top tech companies globally as we refine matches for your specific location.</p>` : ''}
        </div >
        `;
}

// ============================================
// NEW: COACHING & SUPPORT SECTIONS
// ============================================
function renderCoachingMessage(coaching) {
    if (!coaching) return '';
    return `
        < div class="coaching-section animate-in" >
            <div class="coaching-card">
                <div class="coaching-emoji">${coaching.emoji}</div>
                <h2 class="coaching-headline">${coaching.headline}</h2>
                <p class="coaching-message">${coaching.message}</p>
                <div class="coaching-encouragement">
                    <span class="encouragement-icon">💫</span>
                    <p>${coaching.encouragement}</p>
                </div>
            </div>
        </div >
        `;
}

function renderQuickWinsSection(quickWins) {
    if (!quickWins || !quickWins.length) return '';
    return `
        < div class="quick-wins-section animate-in" >
            <div class="section-header-inline">
                <h2>⚡ Quick Wins - Start Today!</h2>
                <p>Small actions that create immediate momentum</p>
            </div>
            <div class="quick-wins-grid">
                ${quickWins.map((win, i) => `
                    <div class="quick-win-card" style="--delay: ${i * 0.1}s">
                        <div class="qw-header">
                            <span class="qw-time">${win.time}</span>
                            <span class="qw-number">${i + 1}</span>
                        </div>
                        <h4>${win.win}</h4>
                        <p class="qw-action">${win.action}</p>
                        <p class="qw-impact"><strong>Impact:</strong> ${win.impact}</p>
                    </div>
                `).join('')}
            </div>
        </div >
        `;
}

function renderWeeklyPlanSection(weeklyPlan) {
    if (!weeklyPlan) return '';
    return `
        < div class="weekly-plan-section animate-in" >
            <div class="section-header-inline">
                <h2>${weeklyPlan.thisWeek.title}</h2>
                <p>Total commitment: ${weeklyPlan.thisWeek.totalHours} hours</p>
            </div>
            <div class="weekly-schedule">
                ${weeklyPlan.thisWeek.days.map(day => `
                    <div class="day-card">
                        <div class="day-header">
                            <span class="day-name">${day.day}</span>
                            <span class="day-time">${day.time}</span>
                        </div>
                        <h4 class="day-task">${day.task}</h4>
                        <ul class="day-details">
                            ${day.details.map(d => `<li>${d}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            <div class="monthly-goals">
                <h4>🎯 This Month's Goals</h4>
                <div class="goals-list">
                    ${weeklyPlan.monthlyGoals.map(goal => `
                        <div class="goal-item">
                            <span class="goal-checkbox">☐</span>
                            <span>${goal}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div >
        `;
}

function renderDailyHabitsSection(dailyHabits) {
    if (!dailyHabits) return '';
    return `
        < div class="daily-habits-section animate-in" >
            <div class="section-header-inline">
                <h2>🌅 Daily Success Habits</h2>
                <p>Small daily actions that compound into massive results</p>
            </div>
            <div class="habits-timeline">
                <div class="habits-group">
                    <h4>🌅 Morning</h4>
                    ${dailyHabits.morning.map(h => `
                        <div class="habit-card">
                            <div class="habit-title">${h.habit}</div>
                            <p class="habit-desc">${h.description}</p>
                            ${h.science ? `<p class="habit-science">💡 ${h.science}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
                <div class="habits-group">
                    <h4>🚗 Commute</h4>
                    ${dailyHabits.commute.map(h => `
                        <div class="habit-card">
                            <div class="habit-title">${h.habit}</div>
                            <p class="habit-desc">${h.description}</p>
                            ${h.recommendations ? `
                                <div class="habit-recs">
                                    ${h.recommendations.map(r => `<span class="rec-tag">${r}</span>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
                <div class="habits-group">
                    <h4>🍽️ Lunch</h4>
                    ${dailyHabits.lunch.map(h => `
                        <div class="habit-card">
                            <div class="habit-title">${h.habit}</div>
                            <p class="habit-desc">${h.description}</p>
                            ${h.science ? `<p class="habit-science">💡 ${h.science}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
                <div class="habits-group">
                    <h4>🌙 Evening</h4>
                    ${dailyHabits.evening.map(h => `
                        <div class="habit-card">
                            <div class="habit-title">${h.habit}</div>
                            <p class="habit-desc">${h.description}</p>
                            ${h.rule ? `<p class="habit-rule">📌 ${h.rule}</p>` : ''}
                            ${h.template ? `<p class="habit-template"><em>${h.template}</em></p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div >
        `;
}

function renderInterviewPrepSection(interviewPrep) {
    if (!interviewPrep) return '';
    return `
        < div class="interview-prep-section animate-in" >
            <div class="section-header-inline">
                <h2>🎤 Interview Preparation</h2>
                <p>Common questions with frameworks and sample answers</p>
            </div>
            <div class="interview-questions">
                ${interviewPrep.commonQuestions?.map((q, i) => `
                    <div class="question-card">
                        <div class="question-header">
                            <span class="question-num">Q${i + 1}</span>
                            <h4>"${q.question}"</h4>
                        </div>
                        <div class="question-framework">
                            <strong>Framework:</strong> ${q.framework}
                        </div>
                        <div class="question-answer">
                            <strong>Sample Answer:</strong>
                            <p>${q.sampleAnswer}</p>
                        </div>
                        <div class="question-mistakes">
                            <strong>❌ Avoid:</strong>
                            <ul>
                                ${q.mistakes?.map(m => `<li>${m}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="interview-tips-grid">
                <div class="tips-panel">
                    <h4>🧠 Behavioral Tips</h4>
                    <ul>
                        ${interviewPrep.behavioralTips?.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>
                ${interviewPrep.technicalTips ? `
                    <div class="tips-panel">
                        <h4>💻 Technical Tips</h4>
                        <ul>
                            ${interviewPrep.technicalTips?.map(t => `<li>${t}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        </div >
        `;
}

function renderNetworkingSection(networkingTemplates) {
    if (!networkingTemplates) return '';
    return `
        < div class="networking-section animate-in" >
            <div class="section-header-inline">
                <h2>🤝 Networking Templates</h2>
                <p>Copy-paste messages that actually get responses</p>
            </div>
            <div class="templates-grid">
                ${Object.values(networkingTemplates).map(template => `
                    <div class="template-card">
                        <h4>${template.title}</h4>
                        <pre class="template-text">${template.template}</pre>
                        <div class="template-tips">
                            <strong>Tips:</strong>
                            <ul>
                                ${template.tips.map(t => `<li>${t}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div >
        `;
}

function renderSuccessStoriesSection(successStories) {
    if (!successStories || !successStories.length) return '';
    return `
        < div class="success-stories-section animate-in" >
            <div class="section-header-inline">
                <h2>🌟 Success Stories</h2>
                <p>Real people who made this exact transition</p>
            </div>
            <div class="stories-grid">
                ${successStories.map(story => `
                    <div class="story-card">
                        <div class="story-header">
                            <span class="story-avatar">👤</span>
                            <div>
                                <h4>${story.name}</h4>
                                <span class="story-timeline">Transitioned in ${story.timeline}</span>
                            </div>
                        </div>
                        <p class="story-text">"${story.story}"</p>
                        <div class="story-tip">
                            <strong>💡 Key Tip:</strong> ${story.keyTip}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div >
        `;
}

function renderMistakesSection(commonMistakes) {
    if (!commonMistakes) return '';
    return `
        < div class="mistakes-section animate-in" >
            <div class="section-header-inline">
                <h2>⚠️ Common Mistakes to Avoid</h2>
                <p>Learn from others' errors - so you don't repeat them</p>
            </div>
            <div class="mistakes-grid">
                ${commonMistakes.duringTransition?.map(m => `
                    <div class="mistake-card">
                        <div class="mistake-bad">
                            <span class="mistake-icon">❌</span>
                            <strong>${m.mistake}</strong>
                        </div>
                        <div class="mistake-good">
                            <span class="mistake-icon">✅</span>
                            <p>${m.fix}</p>
                        </div>
                        ${m.example ? `<p class="mistake-example"><em>Example: ${m.example}</em></p>` : ''}
                    </div>
                `).join('')}
            </div>
            ${commonMistakes.redFlagsInCompanies ? `
                <div class="red-flags">
                    <h4>🚩 Red Flags in Companies</h4>
                    <ul>
                        ${commonMistakes.redFlagsInCompanies.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            ` : ''
        }
        </div >
        `;
}

function renderBackupPlansSection(backupPlans) {
    if (!backupPlans) return '';
    return `
        < div class="backup-plans-section animate-in" >
            <div class="section-header-inline">
                <h2>🛡️ Backup Plans</h2>
                <p>Prepare for different scenarios - hope for the best, plan for everything</p>
            </div>
            <div class="backup-grid">
                <div class="backup-card">
                    <h4>${backupPlans.ifTimeTakesLonger.title}</h4>
                    <ul>
                        ${backupPlans.ifTimeTakesLonger.actions.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </div>
                <div class="backup-card">
                    <h4>${backupPlans.ifRejectedRepeatedly.title}</h4>
                    <ul>
                        ${backupPlans.ifRejectedRepeatedly.actions.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </div>
                <div class="backup-card">
                    <h4>${backupPlans.financialBackup.title}</h4>
                    <ul>
                        ${backupPlans.financialBackup.actions.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div >
        `;
}

function renderMotivationSection(motivation) {
    if (!motivation) return '';
    return `
        < div class="motivation-section animate-in" >
            <div class="section-header-inline">
                <h2>💪 Stay Motivated</h2>
                <p>Support for when things get tough</p>
            </div>
            <div class="affirmations">
                <h4>Daily Affirmations</h4>
                <div class="affirmations-list">
                    ${motivation.affirmations?.map(a => `<div class="affirmation">"${a}"</div>`).join('')}
                </div>
            </div>
            <div class="when-stuck">
                <h4>${motivation.whenStuck?.title}</h4>
                <div class="stuck-tips">
                    ${motivation.whenStuck?.tips?.map(t => `
                        <div class="stuck-card">
                            <div class="stuck-feeling">😔 ${t.feeling}</div>
                            <div class="stuck-action"><strong>Action:</strong> ${t.action}</div>
                            <div class="stuck-exercise"><strong>Exercise:</strong> ${t.exercise}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="milestones">
                <h4>🏆 Celebrate These Milestones</h4>
                <div class="milestones-list">
                    ${motivation.milestones?.map(m => `
                        <div class="milestone-item">
                            <span class="milestone-at">${m.at}</span>
                            <span class="milestone-celebration">${m.celebration}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div >
        `;
}

function renderSalaryTipsSection(salaryTips) {
    if (!salaryTips) return '';
    return `
        < div class="salary-tips-section animate-in" >
            <div class="section-header-inline">
                <h2>💰 Salary Negotiation</h2>
                <p>Get paid what you're worth</p>
            </div>
            <div class="salary-research">
                <h4>📊 Research First</h4>
                <div class="research-sources">
                    ${salaryTips.research?.sources?.map(s => `<span class="source-tag">${s}</span>`).join('')}
                </div>
                <p class="research-tip">${salaryTips.research?.tip}</p>
            </div>
            <div class="salary-scripts">
                <h4>🎯 Scripts That Work</h4>
                ${salaryTips.scripts?.map(s => `
                    <div class="script-card">
                        <div class="script-scenario">${s.scenario}</div>
                        <pre class="script-text">${s.script}</pre>
                        <p class="script-why"><strong>Why:</strong> ${s.why}</p>
                    </div>
                `).join('')}
            </div>
            <div class="salary-stats">
                <h4>📈 Did You Know?</h4>
                <ul>
                    ${salaryTips.statistics?.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
        </div >
        `;
}

function renderProgressTrackerSection(progressTracker) {
    if (!progressTracker) return '';
    return `
        < div class="progress-tracker-section animate-in" >
            <div class="section-header-inline">
                <h2>📊 Track Your Progress</h2>
                <p>What gets measured gets managed</p>
            </div>
            <div class="tracker-template">
                <h4>${progressTracker.template?.title}</h4>
                <div class="tracking-categories">
                    ${progressTracker.template?.categories?.map(c => `
                        <div class="tracking-category">
                            <h5>${c.category}</h5>
                            <ul>
                                ${c.metrics?.map(m => `<li>${m}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="tracker-tools">
                <h4>🛠️ Recommended Tools</h4>
                <div class="tools-list">
                    ${progressTracker.tools?.map(t => `
                        <div class="tool-item">
                            <strong>${t.name}</strong>
                            <span>${t.best}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div >
        `;
}

function renderFeasibilityScore(feasibility) {
    const angle = (feasibility.score / 100) * 180;
    return `
        < div class="feasibility-section animate-in" >
            <div class="feasibility-gauge">
                <div class="gauge-container">
                    <div class="gauge-bg"></div>
                    <div class="gauge-fill" style="--angle: ${angle}deg; --color: var(--accent-${feasibility.rating.color})"></div>
                    <div class="gauge-center">
                        <span class="gauge-score">${feasibility.score}</span>
                        <span class="gauge-label">Feasibility</span>
                    </div>
                </div>
                <div class="gauge-rating" style="color: var(--accent-${feasibility.rating.color})">${feasibility.rating.label}</div>
            </div>
            <div class="feasibility-details">
                <h3>Transition Analysis</h3>
                <p class="feasibility-summary">${feasibility.summary}</p>
                <div class="factors-list">
                    ${feasibility.factors.map(f => `
                        <div class="factor-item factor-${f.impact}">
                            <span class="factor-icon">${f.impact === 'positive' ? '✅' : f.impact === 'negative' ? '❌' : '⚠️'}</span>
                            <div class="factor-content">
                                <strong>${f.factor}</strong>
                                <p>${f.detail}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div >
        `;
}

function renderSummaryCards(analysis) {
    const { roadmap, financialAnalysis, riskAssessment } = analysis;
    return `
        < div class="summary-cards animate-in" >
            <div class="summary-card card-gradient-1">
                <div class="summary-card-icon">🎯</div>
                <div class="summary-card-content">
                    <span class="summary-card-label">Target Role</span>
                    <span class="summary-card-value">${state.userData.dreamRole || 'Not Specified'}</span>
                </div>
            </div>
            <div class="summary-card card-gradient-2">
                <div class="summary-card-icon">⏱️</div>
                <div class="summary-card-content">
                    <span class="summary-card-label">Estimated Timeline</span>
                    <span class="summary-card-value">${roadmap.totalMonths} Months</span>
                </div>
            </div>
            <div class="summary-card card-gradient-3">
                <div class="summary-card-icon">💰</div>
                <div class="summary-card-content">
                    <span class="summary-card-label">Bridge Fund Needed</span>
                    <span class="summary-card-value">${formatCurrency(financialAnalysis.bridgeFundNeeded)}</span>
                </div>
            </div>
            <div class="summary-card card-gradient-4">
                <div class="summary-card-icon">${riskAssessment.level.icon || '📊'}</div>
                <div class="summary-card-content">
                    <span class="summary-card-label">Risk Level</span>
                    <span class="summary-card-value" style="color: var(--accent-${riskAssessment.level.color})">${riskAssessment.level.label}</span>
                </div>
            </div>
        </div >
        `;
}

function renderRoadmapSection(roadmap) {
    return `
        < div class="roadmap-section animate-in" >
            <div class="section-header-inline">
                <h2>📍 Your ${roadmap.totalMonths}-Month Transition Roadmap</h2>
                <p>Week-by-week plan with ${roadmap.weeklyCommitment} hours/week commitment</p>
            </div>
            <div class="roadmap-timeline">
                ${roadmap.phases.map((phase, i) => `
                    <div class="phase-card ${i === 0 ? 'phase-current' : ''}" style="--phase-color: ${getPhaseColor(i)}">
                        <div class="phase-header-card">
                            <span class="phase-number">Phase ${phase.id}</span>
                            <span class="phase-duration">${phase.durationMonths} month${phase.durationMonths > 1 ? 's' : ''}</span>
                        </div>
                        <h3 class="phase-name">${phase.name}</h3>
                        <p class="phase-period">Month ${phase.startMonth} - ${phase.endMonth}</p>
                        
                        <div class="phase-objectives">
                            <h4>🎯 Objectives</h4>
                            <ul>
                                ${phase.objectives.map(obj => `<li>${obj}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="phase-tasks">
                            <h4>📋 Key Tasks</h4>
                            <div class="tasks-list">
                                ${phase.tasks.slice(0, 4).map(task => `
                                    <div class="task-item priority-${task.priority}">
                                        <span class="task-priority">${task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}</span>
                                        <span class="task-text">${task.task}</span>
                                        <span class="task-time">${task.estimated}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="phase-deliverables">
                            <h4>📦 Deliverables</h4>
                            <div class="deliverables-list">
                                ${phase.deliverables.map(d => `<span class="deliverable-tag">${d}</span>`).join('')}
                            </div>
                        </div>
                        
                        ${phase.tips ? `
                            <div class="phase-tips">
                                <h4>💡 Pro Tips</h4>
                                <ul>
                                    ${phase.tips.map(tip => `<li>${tip}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div >
        `;
}

function getPhaseColor(index) {
    const colors = ['var(--accent-gold)', 'var(--accent-purple)', 'var(--accent-blue)', 'var(--accent-emerald)', 'var(--accent-rose)'];
    return colors[index % colors.length];
}

function renderSkillGapSection(skillGap) {
    return `
        < div class="skill-section animate-in" >
            <div class="section-header-inline">
                <h2>🎓 Skill Gap Analysis</h2>
                <p>Gap: ${skillGap.gapPercentage}% • Estimated learning time: ${skillGap.estimatedLearningMonths} months</p>
            </div>
            <div class="skills-grid">
                <div class="skills-panel skills-have">
                    <h3>✅ Skills You Have (${skillGap.skillsYouHave.length})</h3>
                    <div class="skills-list">
                        ${skillGap.skillsYouHave.map(skill => `
                            <div class="skill-chip skill-have">
                                <span class="skill-name">${skill.name}</span>
                                <div class="skill-bar-mini">
                                    <div class="skill-bar-fill-mini" style="width: ${skill.proficiency}%; background: var(--accent-emerald)"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="skills-panel skills-need">
                    <h3>📚 Skills to Acquire (${skillGap.skillsToAcquire.length})</h3>
                    <div class="skills-list">
                        ${skillGap.skillsToAcquire.map(skill => `
                            <div class="skill-acquire-card priority-${skill.priority.toLowerCase()}">
                                <div class="skill-acquire-header">
                                    <span class="skill-name">${skill.name}</span>
                                    <span class="skill-priority-tag">${skill.priority}</span>
                                </div>
                                <div class="skill-acquire-meta">
                                    <span>⏱️ ${skill.learnTimeWeeks} weeks</span>
                                    <span>📊 ${skill.difficulty}</span>
                                </div>
                                ${skill.resources?.length ? `
                                    <div class="skill-resources">
                                        ${skill.resources.slice(0, 2).map(r => `<span class="resource-tag">${r}</span>`).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <p class="skill-summary">${skillGap.summary}</p>
        </div >
        `;
}

function renderFinancialSection(financial) {
    return `
        < div class="financial-section animate-in" >
            <div class="section-header-inline">
                <h2>💰 Financial Runway Analysis</h2>
                <p>Health Score: <span style="color: var(--accent-${financial.healthRating.color})">${financial.healthRating.icon} ${financial.healthRating.label}</span></p>
            </div>
            <div class="financial-grid">
                <div class="financial-panel">
                    <h3>Current Situation</h3>
                    <div class="financial-items">
                        <div class="financial-item">
                            <span class="fi-label">Monthly Burn</span>
                            <span class="fi-value">${formatCurrency(financial.monthlyBurn)}</span>
                        </div>
                        <div class="financial-item">
                            <span class="fi-label">Monthly Savings</span>
                            <span class="fi-value" style="color: ${financial.monthlySavings > 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">${formatCurrency(financial.monthlySavings)}</span>
                        </div>
                        <div class="financial-item highlight">
                            <span class="fi-label">Current Runway</span>
                            <span class="fi-value">${financial.currentRunway} months</span>
                        </div>
                        <div class="financial-item highlight">
                            <span class="fi-label">Bridge Fund Needed</span>
                            <span class="fi-value">${formatCurrency(financial.bridgeFundNeeded)}</span>
                        </div>
                    </div>
                </div>
                <div class="financial-panel">
                    <h3>Salary Trajectory</h3>
                    <div class="salary-trajectory">
                        ${financial.salaryTrajectory.map((item, i) => `
                            <div class="trajectory-item ${i === 0 ? 'current' : i === financial.salaryTrajectory.length - 1 ? 'target' : ''}">
                                <span class="traj-period">${item.period}</span>
                                <span class="traj-amount">${formatCurrency(item.amount)}/yr</span>
                            </div>
                        `).join('<div class="trajectory-arrow">→</div>')}
                    </div>
                    <div class="salary-change">
                        Expected change: <strong style="color: var(--accent-emerald)">${financial.projectedSalaryChange}</strong>
                    </div>
                </div>
            </div>
            ${financial.recommendations?.length ? `
                <div class="financial-recommendations">
                    <h3>📋 Recommendations</h3>
                    <div class="recommendations-list">
                        ${financial.recommendations.map(rec => `
                            <div class="recommendation-card priority-${rec.priority.toLowerCase()}">
                                <div class="rec-header">
                                    <span class="rec-priority">${rec.priority}</span>
                                    <strong>${rec.action}</strong>
                                </div>
                                <p>${rec.detail}</p>
                                <span class="rec-timeline">${rec.timeline}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''
        }
        </div >
        `;
}

function renderRiskSection(risk) {
    return `
        < div class="risk-section animate-in" >
            <div class="section-header-inline">
                <h2>🛡️ Risk Assessment</h2>
                <p style="color: var(--accent-${risk.level.color})">${risk.level.label} - ${risk.level.advice}</p>
            </div>
            <div class="risk-grid">
                ${risk.risks.map(r => `
                    <div class="risk-card risk-${r.level.toLowerCase()}">
                        <div class="risk-header">
                            <span class="risk-category">${r.category}</span>
                            <span class="risk-level">${r.level}</span>
                        </div>
                        <p class="risk-desc">${r.description}</p>
                        <div class="risk-mitigation">
                            <strong>Mitigation:</strong> ${r.mitigation}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div >
        `;
}

function renderAlternativesSection(alternatives) {
    return `
        < div class="alternatives-section animate-in" >
            <h2>🔄 Alternative Career Paths</h2>
            <p class="section-subtitle">Other feasible transitions based on your profile</p>
            <div class="alternatives-grid">
                ${alternatives.map(alt => `
                    <div class="alt-card">
                        <div class="alt-header">
                            <span class="alt-title">${alt.role}</span>
                            <span class="alt-match">${alt.matchScore}% Match</span>
                        </div>
                        <div class="alt-meta">
                            <span>📅 ${alt.timeline}</span>
                            <span>💰 ${alt.salaryChange}</span>
                            <span>📊 ${alt.difficulty} difficulty</span>
                        </div>
                        <p class="alt-why">${alt.whyConsider}</p>
                        <span class="alt-demand demand-${alt.demandLevel?.replace(' ', '-')}">${alt.demandLevel} demand</span>
                    </div>
                `).join('')}
            </div>
        </div >
        `;
}

function renderResourcesSection(resources) {
    const guidesHtml = resources.guides?.length ? `
        < div class="guides-section" >
            <h3>📖 Step-by-Step Guides</h3>
            <div class="guides-grid">
                ${resources.guides.slice(0, 4).map(guide => `
                    <div class="guide-card" onclick="toggleGuide('${guide.id}')">
                        <div class="guide-header">
                            <h4>${guide.title}</h4>
                            <span class="guide-meta">${guide.difficulty} • ${guide.timeRequired}</span>
                        </div>
                        <div class="guide-preview">
                            <span>Click to view ${guide.steps?.length || 0} steps →</span>
                        </div>
                        <div class="guide-content" id="guide-${guide.id}" style="display: none;">
                            ${guide.steps?.map((step, i) => `
                                <div class="guide-step">
                                    <div class="step-header">
                                        <span class="step-num">${step.step}</span>
                                        <strong>${step.title}</strong>
                                    </div>
                                    <p class="step-desc">${step.description}</p>
                                    ${step.actions ? `
                                        <ul class="step-actions">
                                            ${step.actions.map(a => `<li>${a}</li>`).join('')}
                                        </ul>
                                    ` : ''}
                                    ${step.template ? `
                                        <div class="step-template">
                                            <strong>Template:</strong>
                                            <pre>${step.template}</pre>
                                        </div>
                                    ` : ''}
                                    ${step.tips ? `
                                        <div class="step-tips">
                                            <strong>💡 Tips:</strong>
                                            <ul>${step.tips.map(t => `<li>${t}</li>`).join('')}</ul>
                                        </div>
                                    ` : ''}
                                    ${step.sampleQuestions ? `
                                        <div class="step-questions">
                                            <strong>Sample Questions:</strong>
                                            <ul>${step.sampleQuestions.map(q => `<li>${q}</li>`).join('')}</ul>
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('') || ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div >
        ` : '';

    const coursesHtml = resources.courses?.length ? `
        < div class="courses-section" >
            <h3>🎓 Recommended Courses</h3>
            <div class="courses-grid">
                ${resources.courses.slice(0, 8).map(course => `
                    <div class="course-card">
                        <div class="course-header">
                            <span class="course-skill">${course.skill || 'General'}</span>
                            <span class="course-level">${course.level || 'All Levels'}</span>
                        </div>
                        <h4 class="course-name">${course.name}</h4>
                        <p class="course-provider">${course.provider || ''}</p>
                        <div class="course-meta">
                            ${course.duration ? `<span>⏱️ ${course.duration}</span>` : ''}
                            ${course.rating ? `<span>⭐ ${course.rating}</span>` : ''}
                            ${course.certificate ? `<span>📜 Certificate</span>` : ''}
                        </div>
                        <div class="course-footer">
                            <span class="course-cost">${course.cost || 'Free'}</span>
                            ${course.url ? `<a href="${course.url}" target="_blank" class="course-link">View Course →</a>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div >
        ` : '';

    const booksHtml = resources.books?.length ? `
        < div class="books-section" >
            <h3>📚 Must-Read Books</h3>
            <div class="books-grid">
                ${resources.books.slice(0, 6).map(book => `
                    <div class="book-card">
                        <div class="book-info">
                            <h4>${book.name}</h4>
                            <p class="book-author">by ${book.author || 'Various'}</p>
                            ${book.skill ? `<span class="book-skill">${book.skill}</span>` : ''}
                        </div>
                        <div class="book-price">${book.cost || 'Check Price'}</div>
                    </div>
                `).join('')}
            </div>
        </div >
        ` : '';

    const communitiesHtml = `
        < div class="communities-section" >
            <h3>👥 Communities to Join</h3>
            <div class="communities-grid">
                ${resources.communities.map(c => `
                    <div class="community-card">
                        <h4>${c.name}</h4>
                        <p>${c.description}</p>
                        ${c.url ? `<a href="${c.url}" target="_blank">Join →</a>` : ''}
                    </div>
                `).join('')}
            </div>
        </div >
        `;

    const learningPathHtml = resources.learningPath ? `
        < div class="learning-path-section" >
            <h3>🗺️ Complete Learning Path: ${state.userData.dreamRole}</h3>
            <p class="path-meta">Duration: ${resources.learningPath.duration} • ${resources.learningPath.weeklyHours} hours/week</p>
            <div class="path-phases">
                ${resources.learningPath.phases?.map((phase, i) => `
                    <div class="path-phase">
                        <div class="path-phase-header">
                            <span class="path-phase-num">${i + 1}</span>
                            <div>
                                <h4>${phase.phase}</h4>
                                <span class="path-weeks">Weeks ${phase.weeks}</span>
                            </div>
                        </div>
                        ${phase.focus ? `<p class="path-focus">${phase.focus}</p>` : ''}
                        ${phase.courses ? `
                            <div class="path-courses">
                                ${phase.courses.map(c => `
                                    <span class="path-course ${c.priority === 'Required' ? 'required' : 'optional'}">${c.name}</span>
                                `).join('')}
                            </div>
                        ` : ''}
                        ${phase.projects ? `
                            <div class="path-projects">
                                <strong>Projects:</strong>
                                <ul>${phase.projects.map(p => `<li>${p}</li>`).join('')}</ul>
                            </div>
                        ` : ''}
                        ${phase.activities ? `
                            <div class="path-activities">
                                <strong>Activities:</strong>
                                <ul>${phase.activities.map(a => `<li>${a}</li>`).join('')}</ul>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div >
        ` : '';

    return `
        < div class="resources-section animate-in" >
            <h2>📚 Learning Resources & Guides</h2>
            <p class="section-subtitle">Everything you need to successfully make this transition</p>
            ${learningPathHtml}
            ${guidesHtml}
            ${coursesHtml}
            ${booksHtml}
            ${communitiesHtml}
        </div >
        `;
}

// Toggle guide expansion
function toggleGuide(guideId) {
    const guideContent = document.getElementById(`guide - ${guideId} `);
    if (guideContent) {
        const isVisible = guideContent.style.display !== 'none';
        guideContent.style.display = isVisible ? 'none' : 'block';
    }
}

function renderDashboardCTA() {
    return `
        < div class="dashboard-cta animate-in" >
            <div class="cta-content">
                <h3>Ready to take the first step?</h3>
                <p>Your personalized roadmap is ready. Start with Phase 1 this week!</p>
            </div>
            <div class="cta-buttons">
                <button class="btn btn-primary" onclick="window.print()">📥 Print/Save Plan</button>
                <button class="btn btn-secondary" onclick="shareResults()">📤 Share Plan</button>
            </div>
        </div >
        `;
}

// ============================================
// UTILITIES
// ============================================
function formatCurrency(amount) {
    if (!amount || amount === 0) return '₹0';
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)} K`;
    return `₹${amount.toLocaleString('en-IN')} `;
}

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}

function restart() {
    document.body.classList.remove('dashboard-active');
    elements.dashboardSection.classList.remove('active');
    elements.dashboardSection.innerHTML = '';
    state.currentStep = 1;
    state.analysis = null;
    document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => el.value = '');
    document.querySelectorAll('.constraint-option input').forEach(el => el.checked = false);
}

function shareResults() {
    if (navigator.share) {
        navigator.share({
            title: 'My CareerPivot Roadmap',
            text: `I'm transitioning from ${state.userData.currentTitle} to ${state.userData.dreamRole}. Check out my personalized roadmap!`,
            url: window.location.href
        });
    } else {
        alert('Sharing is not supported on this browser. Try copying the URL manually.');
    }
}

// ============================================
// WIZARD CONTENT RENDERING
// ============================================
function renderWizardContent() {
    elements.wizardSection.innerHTML = `
        <div class="wizard-container">
            <div class="wizard-header">
                <button class="wizard-close" id="wizard-close" onclick="closeWizard()">✕</button>
                <div class="wizard-progress">
                    <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
                    <span class="progress-text" id="progress-text">Step 1 of 4</span>
                </div>
            </div>
            <div class="wizard-content">
                <div class="wizard-step active" id="step-1">
                    <div class="step-icon">👤</div>
                    <h2>Let's start with where you are now</h2>
                    <p class="step-description">Tell us about your current professional situation</p>
                    <div class="form-group">
                        <label class="form-label">Current Job Title *</label>
                        <input type="text" class="form-input" id="current-title" placeholder="e.g. Software Engineer, Marketing Manager">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Years of Experience</label>
                        <input type="number" class="form-input" id="years-exp" placeholder="e.g. 5" min="0" max="50">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Current Location</label>
                        <input type="text" class="form-input" id="current-location" placeholder="e.g. Bengaluru, Mumbai, Remote">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Industry</label>
                        <select class="form-select" id="industry">
                            <option value="">Select your industry</option>
                            <option value="tech">Technology / IT</option>
                            <option value="finance">Finance / Banking</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="education">Education</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="retail">Retail / E-commerce</option>
                            <option value="consulting">Consulting</option>
                            <option value="media">Media / Entertainment</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Top 3 Skills (what you're good at)</label>
                        <div class="skills-input-container">
                            <input type="text" class="form-input skill-input" id="skill-1" placeholder="Skill 1">
                            <input type="text" class="form-input skill-input" id="skill-2" placeholder="Skill 2">
                            <input type="text" class="form-input skill-input" id="skill-3" placeholder="Skill 3">
                        </div>
                    </div>
                </div>
                <div class="wizard-step" id="step-2">
                    <div class="step-icon">💰</div>
                    <h2>Let's talk about your finances</h2>
                    <p class="step-description">This helps us calculate your transition runway</p>
                    <div class="form-group">
                        <label class="form-label">Monthly Salary (₹)</label>
                        <input type="number" class="form-input" id="monthly-salary" placeholder="e.g. 80000">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Monthly Expenses (₹)</label>
                        <input type="number" class="form-input" id="monthly-expenses" placeholder="e.g. 50000">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Current Savings (₹)</label>
                        <input type="number" class="form-input" id="savings" placeholder="e.g. 500000">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Monthly EMIs/Loans (₹)</label>
                        <input type="number" class="form-input" id="emis" placeholder="e.g. 15000" value="0">
                    </div>
                    <div class="financial-summary">
                        <div class="summary-item">
                            <span class="summary-label">Your Safety Runway</span>
                            <span class="summary-value" id="runway-months">-- months</span>
                        </div>
                    </div>
                </div>
                <div class="wizard-step" id="step-3">
                    <div class="step-icon">🎯</div>
                    <h2>What's your dream destination?</h2>
                    <p class="step-description">Tell us where you want to go</p>
                    <div class="form-group">
                        <label class="form-label">Dream Role / Target Position *</label>
                        <input type="text" class="form-input" id="dream-role" placeholder="e.g. Product Manager, Data Scientist, Startup Founder">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Primary reason for the pivot</label>
                        <select class="form-select" id="pivot-reason">
                            <option value="">Select primary reason</option>
                            <option value="growth">Limited growth in current role</option>
                            <option value="passion">Want to follow my passion</option>
                            <option value="salary">Need higher salary</option>
                            <option value="balance">Better work-life balance</option>
                            <option value="toxic">Toxic work environment</option>
                            <option value="automation">Role becoming obsolete</option>
                            <option value="location">Location/Remote work needs</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Risk Tolerance</label>
                        <div class="risk-slider-container">
                            <input type="range" class="risk-slider" id="risk-tolerance" min="1" max="5" value="3">
                            <div class="risk-labels">
                                <span>Very Conservative</span>
                                <span>Balanced</span>
                                <span>Aggressive</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Hours per week available for learning</label>
                        <input type="number" class="form-input" id="upskill-hours" placeholder="e.g. 10" min="1" max="40" value="10">
                    </div>
                </div>
                <div class="wizard-step" id="step-4">
                    <div class="step-icon">🔒</div>
                    <h2>Any constraints we should consider?</h2>
                    <p class="step-description">Select all that apply</p>
                    <div class="constraints-grid">
                        <label class="constraint-option"><input type="checkbox" value="family"><span class="constraint-box"><span class="constraint-icon">👨‍👩‍👧</span><span class="constraint-text">Family Responsibilities</span></span></label>
                        <label class="constraint-option"><input type="checkbox" value="location"><span class="constraint-box"><span class="constraint-icon">📍</span><span class="constraint-text">Cannot Relocate</span></span></label>
                        <label class="constraint-option"><input type="checkbox" value="education"><span class="constraint-box"><span class="constraint-icon">🎓</span><span class="constraint-text">No Formal Degree</span></span></label>
                        <label class="constraint-option"><input type="checkbox" value="age"><span class="constraint-box"><span class="constraint-icon">⏰</span><span class="constraint-text">Age Concerns (35+)</span></span></label>
                        <label class="constraint-option"><input type="checkbox" value="health"><span class="constraint-box"><span class="constraint-icon">❤️</span><span class="constraint-text">Health Limitations</span></span></label>
                        <label class="constraint-option"><input type="checkbox" value="visa"><span class="constraint-box"><span class="constraint-icon">📄</span><span class="constraint-text">Visa/Work Permit</span></span></label>
                    </div>
                    <div class="form-group" style="margin-top: 2rem;">
                        <label class="form-label">Anything else? (Optional)</label>
                        <textarea class="form-textarea" id="additional-notes" placeholder="Share any other important details that might affect your transition..."></textarea>
                    </div>
                </div>
            </div>
            <div class="wizard-footer">
                <button class="btn btn-secondary" id="wizard-prev" onclick="prevStep()" style="visibility: hidden;">← Back</button>
                <button class="btn btn-primary" id="wizard-next" onclick="nextStep()">Next Step <span class="btn-arrow">→</span></button>
            </div>
        </div>
    `;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);

// ============================================
// RAZORPAY & DONATIONS
// ============================================
function handleDonation(amountInINR) {
    const options = {
        "key": "rzp_live_RuaMsQ3mGUXGtH",
        "amount": amountInINR * 100, // Razorpay amount is in paise
        "currency": "INR",
        "name": "CareerPivot Support",
        "description": "Donation for CareerPivot Mission",
        "image": "logo.png",
        "handler": function (response) {
            alert("Thank you for your generous support! Payment ID: " + response.razorpay_payment_id);
        },
        "prefill": {
            "name": "",
            "email": ""
        },
        "theme": {
            "color": "#f59e0b"
        }
    };
    const rzp = new Razorpay(options);
    rzp.open();
}

function handleUpgrade() {
    const options = {
        "key": "rzp_live_RuaMsQ3mGUXGtH",
        "amount": 500 * 100, // ₹500 in paise
        "currency": "INR",
        "name": "CareerPivot Pro",
        "description": "Unlock Unlimited AI Career Analyses",
        "image": "logo.png",
        "handler": function (response) {
            state.userPlan = 'pro';
            localStorage.setItem('userPlan', 'pro');
            if (window.saveUserDataToCloud) window.saveUserDataToCloud();
            alert("Upgrade Successful! You now have unlimited access to CareerPivot Pro. Enjoy!");
            if (document.body.classList.contains('dashboard-active') && state.analysis) {
                renderDashboard(state.analysis);
            }
        },
        "prefill": {
            "name": "",
            "email": ""
        },
        "theme": {
            "color": "#f59e0b"
        }
    };
    const rzp = new Razorpay(options);
    rzp.open();
}

function handleCustomDonation() {
    const amount = prompt("Enter the amount you wish to donate (INR):", "500");
    if (amount && !isNaN(amount)) {
        handleDonation(parseFloat(amount));
    }
}

function renderLockedFeature(name) {
    return `
        <div class="locked-feature animate-in">
            <div class="locked-card">
                <div class="locked-icon">🔒</div>
                <h3>${name} is a Pro Feature</h3>
                <p>Upgrade to Pro to unlock deep career insights, interview preparation, and networking strategies.</p>
                <button class="btn btn-primary" onclick="window.location.hash='pricing'">View Pro Plan</button>
            </div>
        </div>
    `;
}

// Smooth scroll for nav links
document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

