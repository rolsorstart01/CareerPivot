// ============================================
// CareerPivot - Advanced AI Support System
// Personalized coaching, actionable advice, emotional support
// ============================================

const AISupport = {

    // ============================================
    // PERSONALIZED COACHING MESSAGES
    // ============================================
    getPersonalizedMessage(userData, analysis) {
        const name = userData.currentTitle?.split(' ')[0] || 'there';
        const feasibility = analysis.feasibility.score;
        const targetRole = userData.dreamRole || 'your dream role';

        if (feasibility >= 80) {
            return {
                emoji: '🚀',
                headline: `You're in an excellent position to become a ${targetRole}!`,
                message: `With ${userData.yearsExp} years of experience and your existing skills, you're ahead of most career changers. Your ${userData.skills[0] || 'technical'} background is highly valued in ${targetRole} roles. Focus on bridging the specific skill gaps, and you'll be landing interviews within ${analysis.roadmap?.totalMonths || 12} months.`,
                encouragement: `Remember: Many successful ${targetRole}s started exactly where you are now.`
            };
        } else if (feasibility >= 60) {
            return {
                emoji: '💪',
                headline: `This transition is absolutely achievable!`,
                message: `Your path to ${targetRole} requires focused effort, but you have solid foundations. Your experience in ${userData.industry || 'your field'} gives you unique insights that pure ${targetRole}s don't have. This is your competitive advantage - use it!`,
                encouragement: `The best time to start was yesterday. The second best time is today.`
            };
        } else {
            return {
                emoji: '🌱',
                headline: `Every expert was once a beginner`,
                message: `This is a significant career shift, which means more growth opportunity. Consider this a marathon, not a sprint. Break it into smaller milestones, celebrate each win, and you'll look back in 2 years amazed at how far you've come.`,
                encouragement: `The gap between where you are and where you want to be is called growth.`
            };
        }
    },

    // ============================================
    // WEEKLY ACTION PLANS
    // ============================================
    generateWeeklyPlan(userData, analysis) {
        const weeklyHours = userData.upskillHours || 10;
        const skillsToLearn = analysis.skillGap?.skillsToAcquire || [];

        return {
            thisWeek: {
                title: "🎯 Your Actions for This Week",
                totalHours: weeklyHours,
                days: [
                    {
                        day: "Monday",
                        time: `${Math.round(weeklyHours * 0.2)}h`,
                        task: "Research & Planning",
                        details: [
                            "Identify 5 people on LinkedIn in your target role",
                            "Draft connection request message (use template below)",
                            "Set up a learning tracker (Notion, Spreadsheet)"
                        ]
                    },
                    {
                        day: "Tuesday",
                        time: `${Math.round(weeklyHours * 0.25)}h`,
                        task: "Skill Building",
                        details: [
                            `Start course: ${analysis.resources?.courses?.[0]?.name || 'First recommended course'}`,
                            "Take notes using the Cornell method",
                            "Complete first module or chapter"
                        ]
                    },
                    {
                        day: "Wednesday",
                        time: `${Math.round(weeklyHours * 0.15)}h`,
                        task: "Networking",
                        details: [
                            "Send 3 LinkedIn connection requests",
                            "Comment thoughtfully on 2 industry posts",
                            "Join 1 relevant community or group"
                        ]
                    },
                    {
                        day: "Thursday",
                        time: `${Math.round(weeklyHours * 0.25)}h`,
                        task: "Skill Building",
                        details: [
                            "Continue course work",
                            "Practice what you learned with hands-on exercise",
                            "Document insights for your portfolio"
                        ]
                    },
                    {
                        day: "Friday",
                        time: `${Math.round(weeklyHours * 0.15)}h`,
                        task: "Reflection & Planning",
                        details: [
                            "Review what you learned this week",
                            "Update your progress tracker",
                            "Plan next week's priorities"
                        ]
                    }
                ]
            },
            monthlyGoals: [
                `Complete 1 certification or course module`,
                `Have ${Math.min(4, Math.round(userData.upskillHours / 2.5))} informational interviews`,
                `Build 1 portfolio piece or case study`,
                `Apply to ${Math.min(10, Math.round(analysis.feasibility.score / 10))} relevant positions`
            ]
        };
    },

    // ============================================
    // SUCCESS STORIES
    // ============================================
    getSuccessStories(currentRole, targetRole) {
        const stories = {
            'software engineer->product manager': [
                {
                    name: "Priya S.",
                    timeline: "8 months",
                    story: "I was a backend engineer at a startup for 4 years. I started by volunteering to write PRDs for features I was building. Within 6 months, I was leading product discussions. Got my PM role at a fintech company with a 40% salary increase.",
                    keyTip: "Use your technical background as leverage - you can spot feasibility issues that non-technical PMs miss."
                },
                {
                    name: "Rahul M.",
                    timeline: "12 months",
                    story: "Took the Product School certification, built 2 case studies, and had 15+ informational interviews. The connections I made led to my PM role at a Series B startup. It was hard but worth every hour.",
                    keyTip: "Document everything. Your transition story becomes your interview narrative."
                }
            ],
            'marketing->product manager': [
                {
                    name: "Ananya K.",
                    timeline: "10 months",
                    story: "My marketing analytics skills directly transferred. I focused on learning SQL and understanding product metrics. My ability to connect user needs to business goals was my differentiator.",
                    keyTip: "Marketers understand users - that's 50% of product management right there."
                }
            ],
            'default': [
                {
                    name: "Amit R.",
                    timeline: "14 months",
                    story: "I switched from a completely unrelated field. The key was treating it like a part-time job - dedicated learning every evening and weekend. Now I'm doing work I love.",
                    keyTip: "Consistency beats intensity. 1 hour daily > 7 hours once a week."
                },
                {
                    name: "Sneha P.",
                    timeline: "9 months",
                    story: "I was terrified at first. But breaking it into small weekly goals made it manageable. Every small win built my confidence. You can do this too!",
                    keyTip: "Imposter syndrome is normal. Everyone feels it. Do it scared if you have to."
                }
            ]
        };

        const key = `${currentRole?.toLowerCase()}->${targetRole?.toLowerCase()}`;
        return stories[key] || stories['default'];
    },

    // ============================================
    // INTERVIEW PREPARATION
    // ============================================
    getInterviewPrep(targetRole) {
        const prepByRole = {
            'product manager': {
                commonQuestions: [
                    {
                        question: "Tell me about a product you love and how you'd improve it.",
                        framework: "Use the CIRCLES method: Comprehend, Identify users, Report needs, Cut through prioritization, List solutions, Evaluate tradeoffs, Summarize",
                        sampleAnswer: "I love Spotify's Discover Weekly. One improvement: Add 'mood filters' so users can discover music matching their current energy. I'd validate this with user research, start with a simple prototype, and measure success by playlist save rates.",
                        mistakes: ["Don't just list features", "Always tie back to user needs", "Show structured thinking"]
                    },
                    {
                        question: "How do you prioritize features?",
                        framework: "RICE (Reach, Impact, Confidence, Effort) or ICE (Impact, Confidence, Ease)",
                        sampleAnswer: "I use a combination of quantitative (RICE scoring) and qualitative (user feedback, strategic alignment) methods. For example, at my last company...",
                        mistakes: ["Don't say 'gut feeling'", "Always have a framework", "Show data-driven thinking"]
                    },
                    {
                        question: "Tell me about a time you failed.",
                        framework: "STAR + Growth: Situation, Task, Action, Result, What you learned",
                        sampleAnswer: "I once launched a feature without proper user research. Usage was 70% below expectations. I learned to always validate assumptions. Now I include user testing in every sprint.",
                        mistakes: ["Don't blame others", "Show self-awareness", "Focus on the learning"]
                    }
                ],
                behavioralTips: [
                    "Prepare 8-10 STAR stories covering different themes",
                    "Practice with a friend or record yourself",
                    "Have questions ready for your interviewer",
                    "Research the company's product deeply"
                ],
                technicalTips: [
                    "Know basic SQL for data analysis questions",
                    "Understand A/B testing and statistical significance",
                    "Be ready to do back-of-envelope calculations",
                    "Practice case studies out loud"
                ]
            },
            'data scientist': {
                commonQuestions: [
                    {
                        question: "Explain a complex ML concept to a non-technical person.",
                        framework: "Use analogies, avoid jargon, tie to business value",
                        sampleAnswer: "Gradient descent is like finding the lowest point in a valley when you're blindfolded. You feel the ground, take a step downhill, and repeat until you can't go lower.",
                        mistakes: ["Don't use jargon", "Don't oversimplify to the point of inaccuracy"]
                    },
                    {
                        question: "Walk me through a data science project you led.",
                        framework: "PCAR: Problem, Approach, Results, Learnings",
                        sampleAnswer: "We had a 15% customer churn rate. I built a prediction model using gradient boosting, identified top churn indicators, and we reduced churn by 4% through targeted interventions.",
                        mistakes: ["Don't just describe the tech", "Focus on business impact"]
                    }
                ],
                behavioralTips: [
                    "Practice explaining models to non-technical people",
                    "Have impact metrics for each project you discuss",
                    "Be honest about what you don't know"
                ]
            },
            'default': {
                commonQuestions: [
                    {
                        question: "Why do you want to make this transition?",
                        framework: "Connect past → present → future. Show intentionality.",
                        sampleAnswer: "In my current role, I discovered I'm most energized when [doing X]. I've been actively building skills in [Y]. This role combines my experience with my passion for [Z].",
                        mistakes: ["Don't badmouth current job", "Show genuine enthusiasm", "Highlight transferable skills"]
                    },
                    {
                        question: "What's your biggest weakness?",
                        framework: "Real weakness + What you're doing about it",
                        sampleAnswer: "I sometimes focus too much on details. I've learned to set time limits and ask 'Is this level of detail necessary for the outcome?'",
                        mistakes: ["Don't say 'I work too hard'", "Don't say 'I have no weaknesses'"]
                    }
                ],
                behavioralTips: [
                    "Research the company thoroughly",
                    "Prepare specific examples from your experience",
                    "Have thoughtful questions ready"
                ]
            }
        };

        const roleKey = targetRole?.toLowerCase() || 'default';
        return prepByRole[roleKey] || prepByRole['default'];
    },

    // ============================================
    // NETWORKING TEMPLATES
    // ============================================
    getNetworkingTemplates(userData) {
        return {
            connectionRequest: {
                title: "LinkedIn Connection Request",
                template: `Hi [Name],

I noticed you transitioned from ${userData.currentTitle || '[similar role]'} to ${userData.dreamRole || '[target role]'} - that's exactly the path I'm exploring.

I'm currently a ${userData.currentTitle || '[current role]'} with ${userData.yearsExp || 'several'} years of experience, actively learning ${userData.dreamRole ? `what it takes to become a ${userData.dreamRole}` : 'new skills'}.

Would love to connect and learn from your journey!

Best,
[Your Name]`,
                tips: [
                    "Keep it under 300 characters for mobile",
                    "Mention something specific about them",
                    "Make it easy to say yes"
                ]
            },
            informationalInterview: {
                title: "Informational Interview Request",
                template: `Hi [Name],

I hope this message finds you well! I came across your profile and was inspired by your journey from ${userData.currentTitle || '[similar background]'} to ${userData.dreamRole || '[their current role]'}.

I'm currently navigating a similar transition and would be incredibly grateful for 20 minutes of your time to learn from your experience. I have specific questions about [skill gap/company type/transition challenge].

I'm happy to work around your schedule - early mornings, lunch, or evenings all work for me.

Thank you for considering this!

Best regards,
[Your Name]`,
                tips: [
                    "Be specific about what you want to learn",
                    "Offer flexibility on timing",
                    "Follow up once after 5-7 days if no response"
                ]
            },
            thankYou: {
                title: "Thank You Message",
                template: `Hi [Name],

Thank you so much for taking the time to chat today! Your insights on [specific thing discussed] were incredibly valuable.

I especially appreciated your advice about [key takeaway]. I'm going to [specific action] based on our conversation.

I'll keep you updated on my progress. If there's ever anything I can help you with, please don't hesitate to reach out.

Gratefully,
[Your Name]`,
                tips: [
                    "Send within 24 hours",
                    "Reference something specific",
                    "Commit to a follow-up action"
                ]
            }
        };
    },

    // ============================================
    // DAILY HABITS FOR SUCCESS
    // ============================================
    getDailyHabits(userData) {
        const hours = userData.upskillHours || 10;
        const dailyMinutes = Math.round((hours * 60) / 7);

        return {
            morning: [
                {
                    habit: "🌅 Career Reflection (5 min)",
                    description: "Before checking phone, visualize yourself in your dream role. How does it feel?",
                    science: "Visualization activates the same neural pathways as actually performing the task."
                },
                {
                    habit: "📚 Learning Block (20-30 min)",
                    description: "Tackle the hardest learning material when your brain is fresh.",
                    science: "Willpower is highest in the morning. Use it for challenging new skills."
                }
            ],
            commute: [
                {
                    habit: "🎧 Industry Podcasts",
                    description: `Listen to podcasts about ${userData.dreamRole || 'your target field'}`,
                    recommendations: [
                        "Lenny's Podcast (Product)",
                        "Acquired (Business)",
                        "Data Skeptic (Data Science)"
                    ]
                }
            ],
            lunch: [
                {
                    habit: "🤝 Networking (15 min)",
                    description: "Send 1 connection request, comment on 2 posts, engage meaningfully",
                    science: "Small daily networking compounds. 1/day = 365 new connections/year."
                }
            ],
            evening: [
                {
                    habit: `📖 Skill Practice (${dailyMinutes - 35} min)`,
                    description: "Apply what you learned - do exercises, build projects, practice frameworks",
                    rule: "30% learning, 70% doing. This is where real growth happens."
                },
                {
                    habit: "✍️ Daily Log (5 min)",
                    description: "Write 3 things you learned today. This 10x's retention.",
                    template: "Today I learned...\nI'm proud that I...\nTomorrow I will..."
                }
            ],
            weekly: [
                {
                    habit: "📊 Weekly Review (30 min Sunday)",
                    description: "Track progress, adjust plans, celebrate wins",
                    questions: [
                        "What did I accomplish this week?",
                        "What blocked me?",
                        "What will I prioritize next week?"
                    ]
                }
            ]
        };
    },

    // ============================================
    // EMOTIONAL SUPPORT & MOTIVATION
    // ============================================
    getMotivationalContent(analysis) {
        const score = analysis.feasibility?.score || 50;

        return {
            affirmations: [
                "I am capable of learning anything I set my mind to",
                "Every expert was once a beginner",
                "My past experience is an asset, not a limitation",
                "Progress over perfection",
                "I am worthy of the career I'm building"
            ],
            whenStuck: {
                title: "Feeling Stuck? Try This:",
                tips: [
                    {
                        feeling: "Overwhelmed",
                        action: "Pick ONE tiny task. Complete it. Celebrate. Repeat.",
                        exercise: "Write down everything on your mind. Circle the ONE thing that would make tomorrow easier. Do only that."
                    },
                    {
                        feeling: "Imposter Syndrome",
                        action: "Read your past accomplishments. You've done hard things before.",
                        exercise: "List 10 things you've achieved that once seemed impossible. You'll achieve this too."
                    },
                    {
                        feeling: "Discouraged by rejection",
                        action: "Rejection is redirection. Each 'no' brings you closer to 'yes'.",
                        exercise: "Reframe: What can you learn from this rejection? How can you improve?"
                    },
                    {
                        feeling: "Burned out",
                        action: "Take a guilt-free break. Rest is part of the process.",
                        exercise: "Schedule 1 full day off this week. Do something that brings you joy."
                    }
                ]
            },
            milestones: [
                { at: "Week 1", celebration: "🎉 You started! 90% never make it this far." },
                { at: "Month 1", celebration: "🏆 One month in! You're building real momentum." },
                { at: "First Interview", celebration: "🚀 Someone sees your potential! You belong here." },
                { at: "First Offer", celebration: "🎊 YOU DID IT! All the hard work paid off." }
            ]
        };
    },

    // ============================================
    // SALARY NEGOTIATION
    // ============================================
    getSalaryNegotiationTips(targetRole, currentSalary) {
        return {
            research: {
                sources: [
                    "Glassdoor salary data for your city",
                    "levels.fyi (tech roles)",
                    "LinkedIn Salary Insights",
                    "AngelList for startup salaries"
                ],
                tip: "Know the range BEFORE you interview. Never give a number first."
            },
            scripts: [
                {
                    scenario: "When asked about salary expectations early",
                    script: "I'm focused on finding the right opportunity. I'd love to learn more about the role and responsibilities before discussing numbers. What's the range you have budgeted for this position?",
                    why: "Lets them anchor first. Information is power."
                },
                {
                    scenario: "When you receive an offer",
                    script: "Thank you so much for this offer! I'm really excited about this opportunity. I've done some research on market rates for this role, and based on my experience in [X], I was hoping for something closer to [Y]. Is there flexibility?",
                    why: "Shows enthusiasm while advocating for yourself."
                },
                {
                    scenario: "If they can't budge on salary",
                    script: "I understand salary has limits. Could we discuss other elements - signing bonus, additional PTO, remote flexibility, or a performance review at 6 months?",
                    why: "Total compensation isn't just salary. Get creative."
                }
            ],
            mistakes: [
                "Accepting immediately - always ask for time to consider",
                "Apologizing for negotiating - it's expected and respected",
                "Not getting the offer in writing before negotiating",
                "Negotiating on multiple fronts at once - go one by one"
            ],
            statistics: [
                "Candidates who negotiate earn 7% more on average",
                "84% of employers expect candidates to negotiate",
                "Only 37% of people actually negotiate - be in that group!"
            ]
        };
    },

    // ============================================
    // RED FLAGS & MISTAKES TO AVOID
    // ============================================
    getCommonMistakes(targetRole) {
        return {
            duringTransition: [
                {
                    mistake: "Trying to learn everything at once",
                    fix: "Focus on 1-2 core skills. Master them. Then expand.",
                    example: "For PM: Start with user research + prioritization. Not metrics + SQL + design + strategy all at once."
                },
                {
                    mistake: "Not networking because you're 'not ready'",
                    fix: "Network while learning. People hire potential, not perfection.",
                    example: "Reach out saying 'I'm learning about PM. Can I learn from your journey?' - people love helping."
                },
                {
                    mistake: "Quitting your job too early",
                    fix: "Transition while employed if possible. Income = time = less desperation.",
                    example: "Use evenings/weekends. Takes longer but way safer."
                },
                {
                    mistake: "Only applying online",
                    fix: "80% of jobs are filled through referrals. Network > apply.",
                    example: "1 warm referral = 10 cold applications in effectiveness."
                },
                {
                    mistake: "Not building in public",
                    fix: "Share your journey on LinkedIn. Recruiters notice engaged learners.",
                    example: "Post about what you're learning weekly. Build an audience."
                }
            ],
            duringInterviews: [
                {
                    mistake: "Not researching the company product",
                    fix: "Use the product. Form opinions. Be ready to discuss improvements."
                },
                {
                    mistake: "Saying 'I don't have direct experience'",
                    fix: "Frame as 'In a similar situation, I...' and connect to transferable skills."
                },
                {
                    mistake: "Asking about salary in round 1",
                    fix: "Wait until they bring it up or until you have an offer."
                }
            ],
            redFlagsInCompanies: [
                "Role is 'hybrid' of too many things",
                "No clear manager or reporting structure",
                "They rush you to decide on offer",
                "High turnover (check Glassdoor)",
                "Vague job description"
            ]
        };
    },

    // ============================================
    // BACKUP PLANS
    // ============================================
    getBackupPlans(userData, analysis) {
        const alternatives = analysis.alternatives || [];

        return {
            ifTimeTakesLonger: {
                title: "If transition takes longer than expected",
                actions: [
                    `Consider ${alternatives[0]?.role || 'related roles'} as a stepping stone`,
                    "Look for hybrid roles at current company",
                    "Take contract/freelance work in target field for experience",
                    "Extend timeline but don't give up - persistence wins"
                ]
            },
            ifRejectedRepeatedly: {
                title: "If facing multiple rejections",
                actions: [
                    "Get feedback from interviewers when possible",
                    "Practice with mock interviews more",
                    "Review portfolio - is it demonstrating right skills?",
                    "Consider a different company size/stage",
                    "Look at adjacent roles that build toward goal"
                ]
            },
            financialBackup: {
                title: "Financial safety nets",
                actions: [
                    "Build 6-month runway before making big moves",
                    "Consider part-time/consulting work during transition",
                    "Reduce discretionary expenses temporarily",
                    `Target bridge fund: ₹${((userData.monthlyExpenses || 50000) * 6).toLocaleString('en-IN')}`
                ]
            },
            pivotOptions: analysis.alternatives?.slice(0, 3).map(alt => ({
                role: alt.role,
                matchScore: alt.matchScore,
                timeline: alt.timeline,
                why: alt.whyConsider
            })) || []
        };
    },

    // ============================================
    // PROGRESS TRACKING
    // ============================================
    getProgressTracker() {
        return {
            template: {
                title: "Weekly Progress Tracker Template",
                categories: [
                    {
                        category: "🎓 Learning",
                        metrics: ["Hours studied", "Courses/modules completed", "Books read", "Notes taken"]
                    },
                    {
                        category: "🤝 Networking",
                        metrics: ["New connections", "Informational interviews", "Events attended", "Follow-ups sent"]
                    },
                    {
                        category: "💼 Portfolio",
                        metrics: ["Projects completed", "Case studies written", "Skills practiced"]
                    },
                    {
                        category: "📝 Job Search",
                        metrics: ["Applications sent", "Responses received", "Interviews scheduled"]
                    },
                    {
                        category: "🧘 Wellbeing",
                        metrics: ["Energy level (1-10)", "Confidence level (1-10)", "Stress level (1-10)"]
                    }
                ]
            },
            tools: [
                { name: "Notion", url: "notion.so", best: "Visual progress tracking" },
                { name: "Google Sheets", url: "sheets.google.com", best: "Data-driven tracking" },
                { name: "Trello", url: "trello.com", best: "Kanban-style task management" }
            ]
        };
    },

    // ============================================
    // QUICK WINS FOR CONFIDENCE
    // ============================================
    getQuickWins(userData, analysis) {
        return [
            {
                win: "Update LinkedIn headline",
                time: "5 min",
                action: `Change to: "${userData.currentTitle || 'Professional'} → Aspiring ${userData.dreamRole || 'New Role'} | Learning ${analysis.skillGap?.skillsToAcquire?.[0]?.name || 'New Skills'}"`,
                impact: "Signals intent to recruiters"
            },
            {
                win: "Join 3 relevant communities",
                time: "10 min",
                action: "Join LinkedIn groups, Slack communities, subreddits for your target role",
                impact: "Immerse yourself in the conversation"
            },
            {
                win: "Set up Google Alerts",
                time: "5 min",
                action: `Create alerts for "${userData.dreamRole || 'target role'} trends", "hiring ${userData.dreamRole || ''}}"`,
                impact: "Stay informed without effort"
            },
            {
                win: "Schedule learning blocks",
                time: "10 min",
                action: "Block recurring time in your calendar for upskilling",
                impact: "Protected time = consistent progress"
            },
            {
                win: "Connect with 5 people in target role",
                time: "15 min",
                action: "Send personalized connection requests (use template)",
                impact: "Start building your network today"
            }
        ];
    }
};

// Export for use
window.AISupport = AISupport;
