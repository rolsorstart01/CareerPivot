// ============================================
// CareerPivot AI Engine - Core Intelligence
// Custom AI system for career analysis
// ============================================

class CareerAI {
    constructor() {
        this.kb = window.CareerKnowledgeBase;
        this.analysisCache = null;
    }

    // ============================================
    // MAIN ANALYSIS PIPELINE
    // ============================================
    async analyzeCareerTransition(userData) {
        const analysis = {
            timestamp: new Date().toISOString(),
            user: userData,
            feasibility: null,
            skillGap: null,
            financialAnalysis: null,
            roadmap: null,
            alternatives: null,
            riskAssessment: null,
            resources: null,
            // NEW: Comprehensive support content
            coaching: null,
            weeklyPlan: null,
            successStories: null,
            interviewPrep: null,
            networkingTemplates: null,
            dailyHabits: null,
            motivation: null,
            salaryTips: null,
            commonMistakes: null,
            backupPlans: null,
            quickWins: null,
            progressTracker: null,
            // NEW: Company recommendations
            recommendedCompanies: null
        };

        // Simulate AI thinking time for realism
        await this.simulateThinking(500);

        // Run all analyses
        analysis.feasibility = this.analyzeFeasibility(userData);
        analysis.skillGap = this.analyzeSkillGap(userData);
        analysis.financialAnalysis = this.analyzeFinancials(userData);
        analysis.roadmap = this.generateRoadmap(userData, analysis);
        analysis.alternatives = this.findAlternatives(userData);
        analysis.riskAssessment = this.assessRisks(userData, analysis);
        analysis.resources = this.recommendResources(userData, analysis.skillGap);

        // NEW: Get Company Recommendations
        if (window.CompanyDatabase) {
            analysis.recommendedCompanies = window.CompanyDatabase.getCompanies(
                userData.location || 'Remote',
                userData.dreamRole
            );
        }

        // NEW: Generate comprehensive support content
        const support = window.AISupport;
        if (support) {
            analysis.coaching = support.getPersonalizedMessage(userData, analysis);
            analysis.weeklyPlan = support.generateWeeklyPlan(userData, analysis);
            analysis.successStories = support.getSuccessStories(userData.currentTitle, userData.dreamRole);
            analysis.interviewPrep = support.getInterviewPrep(userData.dreamRole);
            analysis.networkingTemplates = support.getNetworkingTemplates(userData);
            analysis.dailyHabits = support.getDailyHabits(userData);
            analysis.motivation = support.getMotivationalContent(analysis);
            analysis.salaryTips = support.getSalaryNegotiationTips(userData.dreamRole, userData.monthlySalary * 12);
            analysis.commonMistakes = support.getCommonMistakes(userData.dreamRole);
            analysis.backupPlans = support.getBackupPlans(userData, analysis);
            analysis.quickWins = support.getQuickWins(userData, analysis);
            analysis.progressTracker = support.getProgressTracker();
        }

        this.analysisCache = analysis;
        return analysis;
    }

    async simulateThinking(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ============================================
    // FEASIBILITY ANALYSIS
    // ============================================
    analyzeFeasibility(userData) {
        const currentRole = this.normalizeRoleName(userData.currentTitle);
        const targetRole = this.normalizeRoleName(userData.dreamRole);

        let score = 50; // Base score
        const factors = [];

        // Check if we have data for roles
        const currentRoleData = this.findBestRoleMatch(currentRole);
        const targetRoleData = this.findBestRoleMatch(targetRole);

        // Direct transition pattern check
        const transitionKey = `${currentRole}->${targetRole}`;
        const directTransition = this.kb.transitionPatterns[transitionKey];

        if (directTransition) {
            score = directTransition.successRate;
            factors.push({
                factor: 'Known Transition Path',
                impact: 'positive',
                detail: `This is a well-documented career transition with ${directTransition.successRate}% success rate`
            });
        } else {
            // Calculate based on skill overlap
            const skillOverlap = this.calculateSkillOverlap(currentRoleData, targetRoleData);
            score = 40 + (skillOverlap * 50);
            factors.push({
                factor: 'Skill Transferability',
                impact: skillOverlap > 0.5 ? 'positive' : 'neutral',
                detail: `${Math.round(skillOverlap * 100)}% of your skills are relevant to the target role`
            });
        }

        // Experience adjustment
        if (userData.yearsExp >= 5) {
            score += 10;
            factors.push({
                factor: 'Experience Level',
                impact: 'positive',
                detail: `${userData.yearsExp} years of experience shows strong professional foundation`
            });
        } else if (userData.yearsExp < 2) {
            score -= 10;
            factors.push({
                factor: 'Experience Level',
                impact: 'negative',
                detail: 'Less experience means more to prove, but also more flexibility'
            });
        }

        // Upskill hours adjustment
        if (userData.upskillHours >= 15) {
            score += 10;
            factors.push({
                factor: 'Learning Commitment',
                impact: 'positive',
                detail: `${userData.upskillHours} hours/week for learning significantly accelerates transition`
            });
        } else if (userData.upskillHours < 5) {
            score -= 10;
            factors.push({
                factor: 'Learning Time',
                impact: 'negative',
                detail: 'Limited learning time will extend your transition timeline'
            });
        }

        // Constraint penalties
        if (userData.constraints.includes('family')) {
            score -= 5;
            factors.push({
                factor: 'Family Responsibilities',
                impact: 'caution',
                detail: 'Family commitments require careful timeline planning'
            });
        }
        if (userData.constraints.includes('location')) {
            score -= 5;
            factors.push({
                factor: 'Location Constraint',
                impact: 'caution',
                detail: 'Geographic limitations may reduce opportunities'
            });
        }

        // Industry transition bonus/penalty
        const sameIndustry = this.isSameIndustryTransition(currentRoleData, targetRoleData);
        if (sameIndustry) {
            score += 8;
            factors.push({
                factor: 'Industry Knowledge',
                impact: 'positive',
                detail: 'Staying in same industry leverages your domain expertise'
            });
        }

        score = Math.max(15, Math.min(95, Math.round(score)));

        return {
            score,
            rating: this.getFeasibilityRating(score),
            factors,
            summary: this.generateFeasibilitySummary(score, userData)
        };
    }

    getFeasibilityRating(score) {
        if (score >= 80) return { label: 'Highly Feasible', color: 'emerald' };
        if (score >= 60) return { label: 'Achievable', color: 'gold' };
        if (score >= 40) return { label: 'Challenging', color: 'orange' };
        return { label: 'Difficult', color: 'rose' };
    }

    generateFeasibilitySummary(score, userData) {
        const target = userData.dreamRole || 'your target role';
        if (score >= 80) {
            return `Your transition to ${target} is highly achievable. Your background provides a strong foundation, and with focused effort, you can make this transition successfully.`;
        } else if (score >= 60) {
            return `Transitioning to ${target} is definitely possible but will require dedicated effort. Focus on bridging skill gaps and building relevant experience.`;
        } else if (score >= 40) {
            return `This transition to ${target} is challenging but not impossible. Consider intermediate roles or extended timelines to build necessary credentials.`;
        }
        return `The path to ${target} is difficult from your current position. Consider alternative roles that bridge the gap, or be prepared for a longer journey.`;
    }

    // ============================================
    // SKILL GAP ANALYSIS
    // ============================================
    analyzeSkillGap(userData) {
        const targetRole = this.normalizeRoleName(userData.dreamRole);
        const targetRoleData = this.findBestRoleMatch(targetRole);
        const userSkills = userData.skills.map(s => s.toLowerCase().trim());

        const requiredSkills = targetRoleData?.skills || ['communication', 'problem solving', 'leadership'];

        const skillsYouHave = [];
        const skillsToAcquire = [];

        requiredSkills.forEach(skill => {
            const hasSkill = userSkills.some(us =>
                us.includes(skill) || skill.includes(us) || this.areSkillsSimilar(us, skill)
            );

            const skillData = this.kb.skills[skill] || {
                learnTime: 3,
                difficulty: 'medium',
                resources: ['Online courses', 'Books', 'Practice']
            };

            if (hasSkill) {
                skillsYouHave.push({
                    name: this.formatSkillName(skill),
                    proficiency: 60 + Math.random() * 30,
                    category: skillData.category || 'General'
                });
            } else {
                skillsToAcquire.push({
                    name: this.formatSkillName(skill),
                    importance: 'Required',
                    learnTimeWeeks: skillData.learnTime * 4,
                    difficulty: skillData.difficulty,
                    resources: skillData.resources || [],
                    priority: requiredSkills.indexOf(skill) < 3 ? 'High' : 'Medium'
                });
            }
        });

        // Add some adjacent skills that would help
        const bonusSkills = this.getAdjacentSkills(targetRole);
        bonusSkills.slice(0, 2).forEach(skill => {
            if (!skillsToAcquire.find(s => s.name.toLowerCase() === skill)) {
                skillsToAcquire.push({
                    name: this.formatSkillName(skill),
                    importance: 'Recommended',
                    learnTimeWeeks: 8,
                    difficulty: 'medium',
                    resources: this.kb.skills[skill]?.resources || ['Online learning'],
                    priority: 'Low'
                });
            }
        });

        const gapPercentage = Math.round((skillsToAcquire.length / (skillsYouHave.length + skillsToAcquire.length)) * 100);

        return {
            skillsYouHave,
            skillsToAcquire: skillsToAcquire.sort((a, b) => {
                const priorityOrder = { High: 0, Medium: 1, Low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }),
            gapPercentage,
            estimatedLearningMonths: Math.ceil(skillsToAcquire.reduce((sum, s) => sum + s.learnTimeWeeks, 0) / 4 / (userData.upskillHours / 10)),
            summary: this.generateSkillGapSummary(skillsYouHave.length, skillsToAcquire.length, gapPercentage)
        };
    }

    areSkillsSimilar(skill1, skill2) {
        const synonyms = {
            'programming': ['coding', 'development', 'software'],
            'communication': ['writing', 'speaking', 'presentation'],
            'data analysis': ['analytics', 'data', 'analysis'],
            'leadership': ['management', 'team lead', 'leading'],
            'problem solving': ['analytical', 'critical thinking', 'debugging']
        };

        for (const [key, values] of Object.entries(synonyms)) {
            if ((skill1.includes(key) || values.some(v => skill1.includes(v))) &&
                (skill2.includes(key) || values.some(v => skill2.includes(v)))) {
                return true;
            }
        }
        return false;
    }

    getAdjacentSkills(targetRole) {
        const adjacentMap = {
            'product manager': ['sql', 'user research', 'a/b testing'],
            'data scientist': ['cloud platforms', 'communication', 'business acumen'],
            'ux designer': ['front-end basics', 'analytics', 'copywriting'],
            'startup founder': ['financial modeling', 'marketing', 'legal basics']
        };
        return adjacentMap[targetRole] || ['communication', 'problem solving'];
    }

    generateSkillGapSummary(have, need, percentage) {
        if (percentage < 30) {
            return `Excellent! You already have ${have} relevant skills. Only ${need} skills to develop for a smooth transition.`;
        } else if (percentage < 60) {
            return `You have a solid foundation with ${have} relevant skills. Focus on acquiring the ${need} remaining skills systematically.`;
        }
        return `You'll need to develop ${need} new skills. Create a structured learning plan and consider courses or bootcamps to accelerate.`;
    }

    // ============================================
    // FINANCIAL ANALYSIS
    // ============================================
    analyzeFinancials(userData) {
        const monthlyBurn = userData.monthlyExpenses + userData.emis;
        const monthlySavings = userData.monthlySalary - monthlyBurn;
        const currentRunway = monthlyBurn > 0 ? Math.floor(userData.savings / monthlyBurn) : 999;

        const targetRole = this.normalizeRoleName(userData.dreamRole);
        const targetRoleData = this.findBestRoleMatch(targetRole);

        // Estimate salary during transition (might dip)
        const currentSalary = userData.monthlySalary * 12;
        const targetSalary = targetRoleData?.salaryRange?.median || currentSalary;
        const transitionSalary = Math.min(currentSalary, targetSalary * 0.85); // Often starts lower

        // Calculate bridge fund needed
        const safetyMonths = 6;
        const bridgeFundNeeded = Math.max(0, (safetyMonths - currentRunway) * monthlyBurn);

        // Salary trajectory
        const salaryTrajectory = [
            { period: 'Current', amount: currentSalary },
            { period: 'During Transition', amount: transitionSalary },
            { period: 'Year 1 in New Role', amount: targetSalary * 0.9 },
            { period: 'Year 2+ (Established)', amount: targetSalary * 1.1 }
        ];

        // Financial health score
        let healthScore = 50;
        if (currentRunway >= 12) healthScore += 30;
        else if (currentRunway >= 6) healthScore += 15;
        else if (currentRunway < 3) healthScore -= 20;

        if (monthlySavings > 0) healthScore += 10;
        if (userData.emis > userData.monthlySalary * 0.3) healthScore -= 15;

        healthScore = Math.max(20, Math.min(100, healthScore));

        return {
            currentRunway,
            monthlyBurn,
            monthlySavings,
            bridgeFundNeeded,
            salaryTrajectory,
            healthScore,
            healthRating: this.getHealthRating(healthScore),
            recommendations: this.getFinancialRecommendations(currentRunway, bridgeFundNeeded, userData),
            projectedSalaryChange: this.calculateSalaryChangePercent(currentSalary, targetSalary)
        };
    }

    getHealthRating(score) {
        if (score >= 80) return { label: 'Strong Position', color: 'emerald', icon: '💪' };
        if (score >= 60) return { label: 'Adequate Runway', color: 'gold', icon: '👍' };
        if (score >= 40) return { label: 'Needs Attention', color: 'orange', icon: '⚠️' };
        return { label: 'High Risk', color: 'rose', icon: '🚨' };
    }

    getFinancialRecommendations(runway, bridgeNeeded, userData) {
        const recs = [];

        if (runway < 6) {
            recs.push({
                priority: 'High',
                action: 'Build Emergency Fund',
                detail: `Accumulate ₹${this.formatCurrency(bridgeNeeded)} before transitioning`,
                timeline: `${Math.ceil(bridgeNeeded / (userData.monthlySalary * 0.2))} months if saving 20% of salary`
            });
        }

        if (userData.emis > userData.monthlySalary * 0.3) {
            recs.push({
                priority: 'High',
                action: 'Reduce Debt Burden',
                detail: 'EMIs consuming >30% of income limits flexibility',
                timeline: 'Prioritize high-interest debt payoff'
            });
        }

        recs.push({
            priority: 'Medium',
            action: 'Create Transition Budget',
            detail: 'Account for courses, certifications, and networking costs',
            timeline: `Budget ₹${this.formatCurrency(30000 + (userData.upskillHours * 1000))} for learning`
        });

        if (runway >= 12) {
            recs.push({
                priority: 'Low',
                action: 'Consider Aggressive Timeline',
                detail: 'Strong financial position allows faster transition',
                timeline: 'Could attempt transition in 6-9 months'
            });
        }

        return recs;
    }

    calculateSalaryChangePercent(current, target) {
        if (!current || current === 0) return '+0%';
        const change = ((target - current) / current) * 100;
        return change >= 0 ? `+${Math.round(change)}%` : `${Math.round(change)}%`;
    }

    // ============================================
    // ROADMAP GENERATION
    // ============================================
    generateRoadmap(userData, analysis) {
        const targetRole = this.normalizeRoleName(userData.dreamRole);
        const transitionKey = `${this.normalizeRoleName(userData.currentTitle)}->${targetRole}`;
        const knownTransition = this.kb.transitionPatterns[transitionKey];

        // Calculate timeline based on various factors
        let totalMonths = knownTransition?.timelineMonths || 12;

        // Adjust based on hours available
        if (userData.upskillHours >= 20) totalMonths = Math.round(totalMonths * 0.7);
        else if (userData.upskillHours < 5) totalMonths = Math.round(totalMonths * 1.5);

        // Adjust based on skill gap
        if (analysis.skillGap.gapPercentage > 60) totalMonths = Math.round(totalMonths * 1.3);
        else if (analysis.skillGap.gapPercentage < 30) totalMonths = Math.round(totalMonths * 0.8);

        // Adjust based on risk tolerance
        if (userData.riskTolerance >= 4) totalMonths = Math.round(totalMonths * 0.8);
        else if (userData.riskTolerance <= 2) totalMonths = Math.round(totalMonths * 1.2);

        totalMonths = Math.max(4, Math.min(36, totalMonths));

        const skillsToLearn = analysis.skillGap.skillsToAcquire;
        const phases = this.createPhases(userData, skillsToLearn, totalMonths, targetRole, knownTransition);

        return {
            totalMonths,
            startDate: new Date().toISOString(),
            targetDate: new Date(Date.now() + totalMonths * 30 * 24 * 60 * 60 * 1000).toISOString(),
            phases,
            weeklyCommitment: userData.upskillHours,
            keyMilestones: this.extractKeyMilestones(phases),
            successMetrics: this.defineSuccessMetrics(targetRole)
        };
    }

    createPhases(userData, skillsToLearn, totalMonths, targetRole, knownTransition) {
        const phases = [];
        const targetRoleData = this.findBestRoleMatch(targetRole);

        // Phase 1: Foundation & Research (20% of timeline)
        const phase1Duration = Math.max(1, Math.round(totalMonths * 0.2));
        phases.push({
            id: 1,
            name: 'Foundation & Research',
            durationMonths: phase1Duration,
            startMonth: 1,
            endMonth: phase1Duration,
            status: 'upcoming',
            objectives: [
                'Deep dive into target role requirements and day-to-day responsibilities',
                'Connect with 5+ professionals currently in the target role',
                'Join relevant online communities and follow thought leaders',
                'Assess and document your transferable skills'
            ],
            tasks: [
                { task: 'Conduct 5 informational interviews', priority: 'high', estimated: '2 weeks' },
                { task: 'Research top companies hiring for this role', priority: 'high', estimated: '1 week' },
                { task: 'Join 3 relevant LinkedIn groups or Slack communities', priority: 'medium', estimated: '1 week' },
                { task: 'Create skills inventory mapping current to required skills', priority: 'high', estimated: '1 week' }
            ],
            deliverables: ['Career transition document', 'Network of 5+ industry contacts', 'Learning plan'],
            tips: knownTransition?.tips?.slice(0, 2) || ['Talk to people already in the role', 'Understand the real challenges']
        });

        // Phase 2: Skill Building (40% of timeline)
        const phase2Duration = Math.max(2, Math.round(totalMonths * 0.4));
        const phase2Start = phase1Duration + 1;
        const highPrioritySkills = skillsToLearn.filter(s => s.priority === 'High').slice(0, 3);
        const mediumPrioritySkills = skillsToLearn.filter(s => s.priority === 'Medium').slice(0, 2);

        phases.push({
            id: 2,
            name: 'Intensive Skill Building',
            durationMonths: phase2Duration,
            startMonth: phase2Start,
            endMonth: phase2Start + phase2Duration - 1,
            status: 'upcoming',
            objectives: [
                `Master ${highPrioritySkills.length} critical skills for the role`,
                'Build 2-3 portfolio projects demonstrating new capabilities',
                'Earn relevant certifications or complete key courses',
                'Start contributing to industry conversations'
            ],
            tasks: highPrioritySkills.map(skill => ({
                task: `Learn ${skill.name}`,
                priority: 'high',
                estimated: `${skill.learnTimeWeeks} weeks`,
                resources: skill.resources
            })).concat(mediumPrioritySkills.map(skill => ({
                task: `Learn ${skill.name}`,
                priority: 'medium',
                estimated: `${skill.learnTimeWeeks} weeks`,
                resources: skill.resources
            }))),
            deliverables: [
                'Completed courses/certifications',
                '2-3 portfolio projects',
                'Blog posts or content demonstrating expertise'
            ],
            tips: ['Focus on projects, not just courses', 'Document everything you learn', 'Build in public when possible']
        });

        // Phase 3: Experience Building (25% of timeline)
        const phase3Duration = Math.max(2, Math.round(totalMonths * 0.25));
        const phase3Start = phase2Start + phase2Duration;

        phases.push({
            id: 3,
            name: 'Experience Building',
            durationMonths: phase3Duration,
            startMonth: phase3Start,
            endMonth: phase3Start + phase3Duration - 1,
            status: 'upcoming',
            objectives: [
                'Gain practical experience through side projects or freelancing',
                'Take on stretch assignments at current job that align with target role',
                'Build and refine portfolio with real-world examples',
                'Strengthen professional network in target field'
            ],
            tasks: [
                { task: 'Complete 1-2 freelance/volunteer projects in new field', priority: 'high', estimated: '6-8 weeks' },
                { task: 'Propose and lead a relevant initiative at current job', priority: 'high', estimated: '4 weeks' },
                { task: 'Attend 2-3 industry events or meetups', priority: 'medium', estimated: 'ongoing' },
                { task: 'Get testimonials/recommendations from project work', priority: 'medium', estimated: '2 weeks' }
            ],
            deliverables: ['Real-world project experience', 'Updated portfolio', '3+ recommendations'],
            tips: ['Freelance platforms like Upwork/Toptal for experience', 'Volunteer for nonprofits', 'Internal transfers can be stepping stones']
        });

        // Phase 4: Job Search & Transition (15% of timeline)
        const phase4Duration = Math.max(2, Math.round(totalMonths * 0.15));
        const phase4Start = phase3Start + phase3Duration;

        phases.push({
            id: 4,
            name: 'Job Search & Transition',
            durationMonths: phase4Duration,
            startMonth: phase4Start,
            endMonth: phase4Start + phase4Duration - 1,
            status: 'upcoming',
            objectives: [
                'Optimize resume and LinkedIn for target role',
                'Apply strategically to well-matched positions',
                'Ace interviews with thorough preparation',
                'Negotiate and transition successfully'
            ],
            tasks: [
                { task: 'Rewrite resume highlighting transferable skills and new expertise', priority: 'high', estimated: '1 week' },
                { task: 'Optimize LinkedIn with target role keywords', priority: 'high', estimated: '1 week' },
                { task: 'Apply to 10-15 carefully selected positions per week', priority: 'high', estimated: 'ongoing' },
                { task: 'Conduct 20+ mock interviews', priority: 'high', estimated: '3 weeks' },
                { task: 'Research salary benchmarks for negotiation', priority: 'medium', estimated: '1 week' }
            ],
            deliverables: ['Optimized resume', 'Active job applications', 'Job offer(s)'],
            tips: ['Quality over quantity in applications', 'Customize each application', 'Leverage network for referrals']
        });

        // Phase 5: First 90 Days (Post-Transition)
        phases.push({
            id: 5,
            name: 'First 90 Days in New Role',
            durationMonths: 3,
            startMonth: phase4Start + phase4Duration,
            endMonth: phase4Start + phase4Duration + 2,
            status: 'future',
            objectives: [
                'Establish yourself as a capable team member',
                'Build key relationships and understand team dynamics',
                'Deliver early wins to build credibility',
                'Identify areas for continued growth'
            ],
            tasks: [
                { task: 'Schedule 1:1s with all key stakeholders', priority: 'high', estimated: '2 weeks' },
                { task: 'Document learnings and create personal onboarding plan', priority: 'high', estimated: 'ongoing' },
                { task: 'Identify and deliver 1-2 quick wins', priority: 'high', estimated: '4-6 weeks' },
                { task: 'Find a mentor within the organization', priority: 'medium', estimated: '4 weeks' }
            ],
            deliverables: ['Strong relationships', 'Early wins documented', 'Clear development plan'],
            tips: ['Listen more than you speak initially', 'Ask lots of questions', 'Document everything']
        });

        return phases;
    }

    extractKeyMilestones(phases) {
        const milestones = [];
        phases.forEach(phase => {
            milestones.push({
                month: phase.startMonth,
                milestone: `Start: ${phase.name}`,
                type: 'phase-start'
            });
            if (phase.deliverables && phase.deliverables[0]) {
                milestones.push({
                    month: phase.endMonth,
                    milestone: phase.deliverables[0],
                    type: 'deliverable'
                });
            }
        });
        return milestones;
    }

    defineSuccessMetrics(targetRole) {
        return [
            { metric: 'Skills Acquired', target: 'Complete 80%+ of identified skill gaps', measurable: true },
            { metric: 'Portfolio Projects', target: 'Build 3+ demonstrable projects', measurable: true },
            { metric: 'Network Growth', target: 'Connect with 20+ professionals in target field', measurable: true },
            { metric: 'Interview Readiness', target: 'Complete 10+ mock interviews', measurable: true },
            { metric: 'Job Applications', target: 'Apply to 50+ relevant positions', measurable: true }
        ];
    }

    // ============================================
    // ALTERNATIVE PATHS
    // ============================================
    findAlternatives(userData) {
        const currentRole = this.normalizeRoleName(userData.currentTitle);
        const targetRole = this.normalizeRoleName(userData.dreamRole);
        const currentRoleData = this.findBestRoleMatch(currentRole);

        const alternatives = [];
        const userSkills = userData.skills.map(s => s.toLowerCase());

        // Get transitions from current role
        const possibleTransitions = currentRoleData?.transitionsTo || [];

        possibleTransitions.forEach(altRole => {
            if (altRole.toLowerCase() !== targetRole) {
                const altRoleData = this.findBestRoleMatch(altRole);
                if (altRoleData) {
                    const skillMatch = this.calculateSkillOverlap(currentRoleData, altRoleData);
                    const matchScore = Math.round(50 + skillMatch * 40 + Math.random() * 10);

                    alternatives.push({
                        role: this.formatSkillName(altRole),
                        matchScore: Math.min(95, matchScore),
                        timeline: this.estimateTransitionTime(currentRole, altRole, userData),
                        salaryChange: this.estimateSalaryChange(currentRoleData, altRoleData),
                        difficulty: skillMatch > 0.6 ? 'Low' : skillMatch > 0.3 ? 'Medium' : 'High',
                        whyConsider: this.generateWhyConsider(altRole, currentRole),
                        demandLevel: altRoleData.demandLevel || 'medium'
                    });
                }
            }
        });

        // Add some popular transitions if we don't have enough
        const popularRoles = ['product manager', 'data scientist', 'ux designer', 'consultant'];
        popularRoles.forEach(role => {
            if (!alternatives.find(a => a.role.toLowerCase() === role) && role !== targetRole) {
                const roleData = this.kb.roles[role];
                if (roleData) {
                    alternatives.push({
                        role: this.formatSkillName(role),
                        matchScore: 40 + Math.round(Math.random() * 30),
                        timeline: '12-18 months',
                        salaryChange: '+15-30%',
                        difficulty: 'Medium',
                        whyConsider: `High demand role with good growth prospects`,
                        demandLevel: roleData.demandLevel
                    });
                }
            }
        });

        return alternatives
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 4);
    }

    estimateTransitionTime(fromRole, toRole, userData) {
        const transitionKey = `${fromRole}->${toRole}`;
        const known = this.kb.transitionPatterns[transitionKey];
        if (known) {
            let months = known.timelineMonths;
            if (userData.upskillHours >= 15) months = Math.round(months * 0.8);
            return `${months - 2}-${months + 2} months`;
        }
        return '12-18 months';
    }

    estimateSalaryChange(fromRole, toRole) {
        if (!fromRole?.salaryRange || !toRole?.salaryRange) return 'Variable';
        const change = ((toRole.salaryRange.median - fromRole.salaryRange.median) / fromRole.salaryRange.median) * 100;
        if (change > 0) return `+${Math.round(change)}%`;
        if (change < 0) return `${Math.round(change)}%`;
        return 'Similar';
    }

    generateWhyConsider(altRole, currentRole) {
        const reasons = {
            'product manager': 'High demand, combines technical and business skills',
            'data scientist': 'Excellent growth, high salaries, intellectually stimulating',
            'ux designer': 'Creative + analytical, strong remote opportunities',
            'startup founder': 'Ultimate autonomy, unlimited upside potential',
            'consultant': 'Variety of projects, accelerated learning, prestigious',
            'engineering manager': 'Natural progression, leadership opportunity',
            'tech lead': 'Stay technical while leading, high impact',
            'devops engineer': 'Critical role, excellent compensation, always in demand'
        };
        return reasons[altRole] || 'Growing field with good opportunities';
    }

    // ============================================
    // RISK ASSESSMENT
    // ============================================
    assessRisks(userData, analysis) {
        const risks = [];
        let overallRiskScore = 30; // Base risk

        // Financial risk
        if (analysis.financialAnalysis.currentRunway < 6) {
            risks.push({
                category: 'Financial',
                level: 'High',
                description: 'Limited financial runway increases pressure and reduces flexibility',
                mitigation: 'Build 6+ months emergency fund before transitioning'
            });
            overallRiskScore += 20;
        } else if (analysis.financialAnalysis.currentRunway < 12) {
            risks.push({
                category: 'Financial',
                level: 'Medium',
                description: 'Moderate runway - transition is possible but needs careful planning',
                mitigation: 'Continue saving while upskilling to extend runway'
            });
            overallRiskScore += 10;
        }

        // Skill gap risk
        if (analysis.skillGap.gapPercentage > 60) {
            risks.push({
                category: 'Skills',
                level: 'High',
                description: 'Significant skill gaps will require extensive learning time',
                mitigation: 'Consider bootcamp or intensive courses to accelerate learning'
            });
            overallRiskScore += 15;
        } else if (analysis.skillGap.gapPercentage > 40) {
            risks.push({
                category: 'Skills',
                level: 'Medium',
                description: 'Moderate skill gaps that are addressable with consistent effort',
                mitigation: 'Create structured learning plan with weekly goals'
            });
            overallRiskScore += 8;
        }

        // Market risk
        const targetRoleData = this.findBestRoleMatch(userData.dreamRole);
        if (targetRoleData?.demandLevel === 'low' || targetRoleData?.demandLevel === 'stable') {
            risks.push({
                category: 'Market',
                level: 'Medium',
                description: 'Target role has limited or stable job market',
                mitigation: 'Focus on niche specializations or high-growth sectors within the field'
            });
            overallRiskScore += 10;
        }

        // Age/timing risk
        if (userData.constraints.includes('age')) {
            risks.push({
                category: 'Perception',
                level: 'Medium',
                description: 'Some employers may have unconscious bias toward younger candidates',
                mitigation: 'Emphasize experience, wisdom, and stability as advantages; target mature companies'
            });
            overallRiskScore += 8;
        }

        // Location risk
        if (userData.constraints.includes('location')) {
            risks.push({
                category: 'Opportunity',
                level: 'Medium',
                description: 'Geographic constraints limit job opportunities',
                mitigation: 'Focus on remote-friendly roles or companies with local offices'
            });
            overallRiskScore += 5;
        }

        // Timing risk (based on commitment)
        if (userData.upskillHours < 5) {
            risks.push({
                category: 'Timeline',
                level: 'High',
                description: 'Limited upskilling time significantly extends transition timeline',
                mitigation: 'Find ways to free up more time or adjust expectations on timeline'
            });
            overallRiskScore += 12;
        }

        overallRiskScore = Math.min(90, overallRiskScore);

        return {
            overallScore: overallRiskScore,
            level: this.getRiskLevel(overallRiskScore),
            risks,
            mitigationPlan: this.createMitigationPlan(risks)
        };
    }

    getRiskLevel(score) {
        if (score >= 70) return { label: 'High Risk', color: 'rose', advice: 'Proceed with caution and strong preparation' };
        if (score >= 50) return { label: 'Moderate Risk', color: 'orange', advice: 'Manageable with good planning' };
        if (score >= 30) return { label: 'Low-Moderate Risk', color: 'gold', advice: 'Favorable conditions for transition' };
        return { label: 'Low Risk', color: 'emerald', advice: 'Excellent position to make this transition' };
    }

    createMitigationPlan(risks) {
        return risks
            .filter(r => r.level === 'High')
            .map(r => ({
                priority: 'Address before transitioning',
                risk: r.description,
                action: r.mitigation
            }));
    }

    // ============================================
    // RESOURCE RECOMMENDATIONS
    // ============================================
    recommendResources(userData, skillGap) {
        const lr = window.LearningResources;
        const resources = {
            courses: [],
            books: [],
            communities: [],
            tools: [],
            guides: [],
            learningPath: null
        };

        const targetRole = this.normalizeRoleName(userData.dreamRole);

        // Get role-specific learning path
        if (lr?.learningPaths?.[targetRole]) {
            resources.learningPath = lr.learningPaths[targetRole];
        }

        // Get courses for each skill to acquire
        skillGap.skillsToAcquire.forEach(skill => {
            const skillKey = skill.name.toLowerCase();
            const skillCourses = lr?.courses?.[skillKey];

            if (skillCourses) {
                // Add beginner courses
                if (skillCourses.beginner) {
                    skillCourses.beginner.forEach(course => {
                        if (!resources.courses.find(c => c.name === course.name)) {
                            resources.courses.push({
                                ...course,
                                skill: skill.name,
                                level: 'Beginner'
                            });
                        }
                    });
                }
                // Add intermediate courses
                if (skillCourses.intermediate) {
                    skillCourses.intermediate.forEach(course => {
                        if (!resources.courses.find(c => c.name === course.name)) {
                            resources.courses.push({
                                ...course,
                                skill: skill.name,
                                level: 'Intermediate'
                            });
                        }
                    });
                }
                // Add books
                if (skillCourses.books) {
                    skillCourses.books.forEach(book => {
                        if (!resources.books.find(b => b.name === book.name)) {
                            resources.books.push({
                                ...book,
                                skill: skill.name
                            });
                        }
                    });
                }
                // Add tools
                if (skillCourses.tools) {
                    skillCourses.tools.forEach(tool => {
                        if (!resources.tools.find(t => t.name === tool.name)) {
                            resources.tools.push(tool);
                        }
                    });
                }
            }
        });

        // Add relevant guides
        if (lr?.guides) {
            resources.guides = Object.entries(lr.guides).map(([key, guide]) => ({
                id: key,
                ...guide
            }));
        }

        // Add communities
        resources.communities = [
            { name: 'LinkedIn Groups', description: `Join groups for ${userData.dreamRole || 'your target role'}`, url: 'https://linkedin.com/groups' },
            { name: 'Reddit Communities', description: 'r/careerguidance, r/cscareerquestions, r/ProductManagement', url: 'https://reddit.com' },
            { name: 'Slack/Discord Communities', description: 'Industry-specific communities for networking', url: '' },
            { name: 'Product Hunt', description: 'Discover new tools and connect with makers', url: 'https://producthunt.com' }
        ];

        // Limit courses to most relevant
        resources.courses = resources.courses.slice(0, 12);
        resources.books = resources.books.slice(0, 6);

        return resources;
    }

    // ============================================
    // DETAILED GUIDE GENERATION
    // ============================================
    getGuideForTask(taskName) {
        const lr = window.LearningResources;
        if (!lr?.guides) return null;

        // Match task to guide
        const guideKeys = Object.keys(lr.guides);
        const matchedKey = guideKeys.find(key =>
            taskName.toLowerCase().includes(key.replace(/-/g, ' ')) ||
            key.includes(taskName.toLowerCase().split(' ')[0])
        );

        return matchedKey ? lr.guides[matchedKey] : null;
    }

    getCoursesForSkill(skillName) {
        const lr = window.LearningResources;
        const skillKey = skillName.toLowerCase();
        return lr?.courses?.[skillKey] || null;
    }

    // ============================================
    // UTILITY METHODS
    // ============================================
    normalizeRoleName(role) {
        if (!role) return '';
        return role.toLowerCase()
            .replace(/senior |junior |lead |principal |staff /gi, '')
            .replace(/[^a-z\s]/g, '')
            .trim();
    }

    findBestRoleMatch(roleName) {
        if (!roleName) return null;
        const normalized = this.normalizeRoleName(roleName);

        // Direct match
        if (this.kb.roles[normalized]) return this.kb.roles[normalized];

        // Partial match
        for (const [key, value] of Object.entries(this.kb.roles)) {
            if (normalized.includes(key) || key.includes(normalized)) {
                return value;
            }
        }

        // Keyword match
        const keywords = normalized.split(' ');
        for (const [key, value] of Object.entries(this.kb.roles)) {
            if (keywords.some(kw => key.includes(kw))) {
                return value;
            }
        }

        return null;
    }

    calculateSkillOverlap(role1Data, role2Data) {
        if (!role1Data?.skills || !role2Data?.skills) return 0.3;

        const skills1 = new Set(role1Data.skills);
        const skills2 = new Set(role2Data.skills);

        let overlap = 0;
        skills1.forEach(skill => {
            if (skills2.has(skill)) overlap++;
        });

        return overlap / Math.max(skills1.size, skills2.size);
    }

    isSameIndustryTransition(role1Data, role2Data) {
        if (!role1Data?.category || !role2Data?.category) return false;
        return role1Data.category === role2Data.category;
    }

    formatSkillName(skill) {
        return skill.split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    formatCurrency(amount) {
        if (amount >= 10000000) return `${(amount / 10000000).toFixed(1)}Cr`;
        if (amount >= 100000) return `${(amount / 100000).toFixed(1)}L`;
        if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
        return amount.toString();
    }
}

// Export AI engine
window.CareerAI = CareerAI;
