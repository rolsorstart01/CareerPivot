// ============================================
// CareerPivot AI Engine - Knowledge Base
// A comprehensive career intelligence system
// ============================================

const CareerKnowledgeBase = {

    // ============================================
    // CAREER ROLES DATABASE
    // ============================================
    roles: {
        // TECHNOLOGY
        'software engineer': {
            category: 'Technology',
            salaryRange: { min: 600000, max: 4000000, median: 1500000 },
            skills: ['programming', 'problem solving', 'algorithms', 'system design', 'debugging', 'version control', 'testing'],
            growthRate: 22,
            demandLevel: 'very high',
            remoteFlexibility: 'high',
            transitionsTo: ['engineering manager', 'product manager', 'tech lead', 'solutions architect', 'devops engineer', 'data engineer', 'startup founder'],
            educationRequired: 'bachelors preferred',
            experienceYears: { entry: 0, mid: 3, senior: 6, lead: 10 }
        },
        'product manager': {
            category: 'Technology',
            salaryRange: { min: 1000000, max: 5000000, median: 2200000 },
            skills: ['product strategy', 'user research', 'data analysis', 'roadmapping', 'stakeholder management', 'agile', 'communication', 'prioritization'],
            growthRate: 18,
            demandLevel: 'high',
            remoteFlexibility: 'medium',
            transitionsTo: ['director of product', 'vp product', 'startup founder', 'consultant', 'general manager'],
            educationRequired: 'bachelors required, mba preferred',
            experienceYears: { entry: 2, mid: 5, senior: 8, lead: 12 }
        },
        'data scientist': {
            category: 'Technology',
            salaryRange: { min: 800000, max: 4500000, median: 1800000 },
            skills: ['python', 'machine learning', 'statistics', 'sql', 'data visualization', 'deep learning', 'communication'],
            growthRate: 28,
            demandLevel: 'very high',
            remoteFlexibility: 'high',
            transitionsTo: ['ml engineer', 'data science manager', 'ai researcher', 'analytics director', 'consultant'],
            educationRequired: 'masters preferred',
            experienceYears: { entry: 0, mid: 3, senior: 5, lead: 8 }
        },
        'ux designer': {
            category: 'Design',
            salaryRange: { min: 500000, max: 3000000, median: 1200000 },
            skills: ['user research', 'wireframing', 'prototyping', 'figma', 'visual design', 'usability testing', 'interaction design'],
            growthRate: 15,
            demandLevel: 'high',
            remoteFlexibility: 'high',
            transitionsTo: ['ux lead', 'product designer', 'design manager', 'product manager', 'ux researcher'],
            educationRequired: 'portfolio > degree',
            experienceYears: { entry: 0, mid: 3, senior: 5, lead: 8 }
        },
        'marketing manager': {
            category: 'Marketing',
            salaryRange: { min: 600000, max: 2500000, median: 1100000 },
            skills: ['digital marketing', 'content strategy', 'seo', 'analytics', 'campaign management', 'brand strategy', 'communication'],
            growthRate: 10,
            demandLevel: 'medium',
            remoteFlexibility: 'medium',
            transitionsTo: ['head of marketing', 'cmo', 'brand manager', 'growth manager', 'consultant', 'startup founder'],
            educationRequired: 'bachelors required',
            experienceYears: { entry: 2, mid: 5, senior: 8, lead: 12 }
        },
        'business analyst': {
            category: 'Business',
            salaryRange: { min: 500000, max: 2000000, median: 900000 },
            skills: ['data analysis', 'sql', 'excel', 'requirements gathering', 'documentation', 'stakeholder management', 'process improvement'],
            growthRate: 12,
            demandLevel: 'medium',
            remoteFlexibility: 'medium',
            transitionsTo: ['product manager', 'project manager', 'data analyst', 'consultant', 'operations manager'],
            educationRequired: 'bachelors required',
            experienceYears: { entry: 0, mid: 3, senior: 6, lead: 10 }
        },
        'consultant': {
            category: 'Consulting',
            salaryRange: { min: 800000, max: 5000000, median: 1800000 },
            skills: ['problem solving', 'communication', 'presentation', 'data analysis', 'client management', 'strategy', 'research'],
            growthRate: 8,
            demandLevel: 'medium',
            remoteFlexibility: 'low',
            transitionsTo: ['senior consultant', 'manager', 'director', 'startup founder', 'corporate strategy', 'product manager'],
            educationRequired: 'mba preferred',
            experienceYears: { entry: 0, mid: 3, senior: 6, lead: 10 }
        },
        'financial analyst': {
            category: 'Finance',
            salaryRange: { min: 500000, max: 2500000, median: 1000000 },
            skills: ['financial modeling', 'excel', 'valuation', 'accounting', 'data analysis', 'presentation', 'research'],
            growthRate: 6,
            demandLevel: 'medium',
            remoteFlexibility: 'low',
            transitionsTo: ['senior analyst', 'investment banker', 'corporate finance', 'fp&a manager', 'consultant', 'fintech pm'],
            educationRequired: 'bachelors required, cfa preferred',
            experienceYears: { entry: 0, mid: 3, senior: 6, lead: 10 }
        },
        'hr manager': {
            category: 'Human Resources',
            salaryRange: { min: 500000, max: 2000000, median: 900000 },
            skills: ['recruitment', 'employee relations', 'hr policies', 'compensation', 'training', 'communication', 'conflict resolution'],
            growthRate: 7,
            demandLevel: 'medium',
            remoteFlexibility: 'medium',
            transitionsTo: ['hr director', 'chro', 'talent acquisition lead', 'hr consultant', 'organization development'],
            educationRequired: 'bachelors required',
            experienceYears: { entry: 2, mid: 5, senior: 8, lead: 12 }
        },
        'operations manager': {
            category: 'Operations',
            salaryRange: { min: 600000, max: 2500000, median: 1100000 },
            skills: ['process optimization', 'project management', 'team leadership', 'data analysis', 'vendor management', 'budgeting'],
            growthRate: 8,
            demandLevel: 'medium',
            remoteFlexibility: 'low',
            transitionsTo: ['director of operations', 'coo', 'general manager', 'consultant', 'supply chain director'],
            educationRequired: 'bachelors required',
            experienceYears: { entry: 3, mid: 6, senior: 10, lead: 15 }
        },
        'teacher': {
            category: 'Education',
            salaryRange: { min: 300000, max: 1200000, median: 500000 },
            skills: ['teaching', 'curriculum development', 'communication', 'patience', 'classroom management', 'assessment'],
            growthRate: 4,
            demandLevel: 'stable',
            remoteFlexibility: 'low',
            transitionsTo: ['principal', 'curriculum designer', 'education consultant', 'corporate trainer', 'edtech pm', 'content creator'],
            educationRequired: 'bachelors + teaching certification',
            experienceYears: { entry: 0, mid: 5, senior: 10, lead: 15 }
        },
        'sales manager': {
            category: 'Sales',
            salaryRange: { min: 600000, max: 3000000, median: 1200000 },
            skills: ['sales strategy', 'negotiation', 'client relationship', 'team management', 'crm', 'communication', 'target achievement'],
            growthRate: 9,
            demandLevel: 'high',
            remoteFlexibility: 'medium',
            transitionsTo: ['sales director', 'vp sales', 'business development', 'account management', 'startup founder'],
            educationRequired: 'bachelors preferred',
            experienceYears: { entry: 2, mid: 5, senior: 8, lead: 12 }
        },
        'startup founder': {
            category: 'Entrepreneurship',
            salaryRange: { min: 0, max: 10000000, median: 0 },
            skills: ['leadership', 'fundraising', 'product vision', 'sales', 'hiring', 'resilience', 'decision making', 'networking'],
            growthRate: 50,
            demandLevel: 'self-created',
            remoteFlexibility: 'variable',
            transitionsTo: ['serial entrepreneur', 'investor', 'advisor', 'ceo at large company', 'board member'],
            educationRequired: 'not required',
            experienceYears: { entry: 0, mid: 3, senior: 7, lead: 10 }
        },
        'content creator': {
            category: 'Media',
            salaryRange: { min: 200000, max: 5000000, median: 600000 },
            skills: ['content creation', 'video editing', 'social media', 'audience building', 'storytelling', 'branding', 'marketing'],
            growthRate: 30,
            demandLevel: 'growing',
            remoteFlexibility: 'very high',
            transitionsTo: ['influencer', 'media entrepreneur', 'marketing consultant', 'brand manager', 'course creator'],
            educationRequired: 'not required',
            experienceYears: { entry: 0, mid: 2, senior: 5, lead: 8 }
        },
        'devops engineer': {
            category: 'Technology',
            salaryRange: { min: 800000, max: 4000000, median: 1800000 },
            skills: ['cloud platforms', 'ci/cd', 'docker', 'kubernetes', 'linux', 'scripting', 'monitoring', 'infrastructure as code'],
            growthRate: 25,
            demandLevel: 'very high',
            remoteFlexibility: 'high',
            transitionsTo: ['site reliability engineer', 'platform engineer', 'cloud architect', 'devops manager', 'consultant'],
            educationRequired: 'bachelors preferred',
            experienceYears: { entry: 1, mid: 3, senior: 6, lead: 10 }
        }
    },

    // ============================================
    // SKILLS DATABASE
    // ============================================
    skills: {
        // Technical Skills
        'programming': { category: 'Technical', learnTime: 6, difficulty: 'high', resources: ['freeCodeCamp', 'Codecademy', 'CS50', 'The Odin Project'] },
        'python': { category: 'Technical', learnTime: 3, difficulty: 'medium', resources: ['Python.org Tutorial', 'Automate the Boring Stuff', 'Codecademy Python'] },
        'javascript': { category: 'Technical', learnTime: 4, difficulty: 'medium', resources: ['JavaScript.info', 'freeCodeCamp', 'Eloquent JavaScript'] },
        'sql': { category: 'Technical', learnTime: 2, difficulty: 'low', resources: ['SQLZoo', 'Mode SQL Tutorial', 'W3Schools SQL'] },
        'machine learning': { category: 'Technical', learnTime: 6, difficulty: 'high', resources: ['Coursera ML Course', 'Fast.ai', 'Google ML Crash Course'] },
        'data analysis': { category: 'Technical', learnTime: 3, difficulty: 'medium', resources: ['Google Data Analytics Cert', 'DataCamp', 'Kaggle Learn'] },
        'cloud platforms': { category: 'Technical', learnTime: 4, difficulty: 'medium', resources: ['AWS Training', 'Google Cloud Skills', 'Azure Learn'] },
        'excel': { category: 'Technical', learnTime: 1, difficulty: 'low', resources: ['Excel Easy', 'Chandoo', 'LinkedIn Learning'] },

        // Business Skills
        'product strategy': { category: 'Business', learnTime: 4, difficulty: 'medium', resources: ['Reforge', 'Product School', 'Inspired by Marty Cagan'] },
        'stakeholder management': { category: 'Business', learnTime: 2, difficulty: 'medium', resources: ['Coursera', 'LinkedIn Learning', 'Practice'] },
        'agile': { category: 'Business', learnTime: 1, difficulty: 'low', resources: ['Scrum.org', 'Atlassian Agile Coach', 'Scrum Guide'] },
        'financial modeling': { category: 'Business', learnTime: 3, difficulty: 'medium', resources: ['Wall Street Prep', 'Corporate Finance Institute', 'Breaking Into Wall Street'] },

        // Soft Skills
        'communication': { category: 'Soft', learnTime: 3, difficulty: 'medium', resources: ['Toastmasters', 'Dale Carnegie', 'Practice'] },
        'leadership': { category: 'Soft', learnTime: 4, difficulty: 'high', resources: ['HBR Articles', 'Leadership Books', 'Mentorship'] },
        'problem solving': { category: 'Soft', learnTime: 3, difficulty: 'medium', resources: ['Case Studies', 'LeetCode', 'Critical Thinking Courses'] },
        'negotiation': { category: 'Soft', learnTime: 2, difficulty: 'medium', resources: ['Never Split the Difference', 'Coursera Negotiation', 'Practice'] },

        // Design Skills
        'figma': { category: 'Design', learnTime: 2, difficulty: 'low', resources: ['Figma Learn', 'YouTube Tutorials', 'DesignLab'] },
        'user research': { category: 'Design', learnTime: 3, difficulty: 'medium', resources: ['IDEO U', 'Nielsen Norman Group', 'User Interviews'] },
        'wireframing': { category: 'Design', learnTime: 1, difficulty: 'low', resources: ['Balsamiq Academy', 'Figma', 'Sketch Tutorials'] }
    },

    // ============================================
    // INDUSTRY DATA
    // ============================================
    industries: {
        'tech': { name: 'Technology / IT', growthRate: 15, avgSalaryMultiplier: 1.3, hotRoles: ['software engineer', 'data scientist', 'product manager'] },
        'finance': { name: 'Finance / Banking', growthRate: 5, avgSalaryMultiplier: 1.2, hotRoles: ['financial analyst', 'fintech pm', 'data analyst'] },
        'healthcare': { name: 'Healthcare', growthRate: 12, avgSalaryMultiplier: 1.0, hotRoles: ['healthcare admin', 'health tech pm', 'medical data analyst'] },
        'education': { name: 'Education', growthRate: 3, avgSalaryMultiplier: 0.7, hotRoles: ['edtech pm', 'curriculum designer', 'education consultant'] },
        'consulting': { name: 'Consulting', growthRate: 6, avgSalaryMultiplier: 1.4, hotRoles: ['consultant', 'strategy analyst', 'manager'] },
        'retail': { name: 'Retail / E-commerce', growthRate: 8, avgSalaryMultiplier: 0.9, hotRoles: ['ecommerce manager', 'product manager', 'data analyst'] },
        'manufacturing': { name: 'Manufacturing', growthRate: 2, avgSalaryMultiplier: 0.85, hotRoles: ['operations manager', 'supply chain', 'automation engineer'] },
        'media': { name: 'Media / Entertainment', growthRate: 7, avgSalaryMultiplier: 0.95, hotRoles: ['content creator', 'product manager', 'marketing manager'] }
    },

    // ============================================
    // TRANSITION PATTERNS
    // ============================================
    transitionPatterns: {
        'software engineer->product manager': {
            difficulty: 'medium',
            timelineMonths: 12,
            salaryChange: '+15%',
            keySkillsToAcquire: ['product strategy', 'user research', 'roadmapping', 'stakeholder management'],
            bridgeRoles: ['technical product manager', 'associate product manager'],
            successRate: 72,
            commonChallenges: ['Letting go of coding', 'Building business acumen', 'Stakeholder politics'],
            tips: ['Lead cross-functional projects', 'Talk to customers regularly', 'Get PM certification', 'Build side projects as PM']
        },
        'software engineer->data scientist': {
            difficulty: 'medium',
            timelineMonths: 9,
            salaryChange: '+10%',
            keySkillsToAcquire: ['statistics', 'machine learning', 'python for data science'],
            bridgeRoles: ['data engineer', 'ml engineer'],
            successRate: 78,
            commonChallenges: ['Statistics fundamentals', 'Business problem framing'],
            tips: ['Take ML courses', 'Do Kaggle competitions', 'Build portfolio projects']
        },
        'software engineer->startup founder': {
            difficulty: 'high',
            timelineMonths: 6,
            salaryChange: 'variable (-50% to +500%)',
            keySkillsToAcquire: ['fundraising', 'sales', 'hiring', 'product vision'],
            bridgeRoles: ['technical co-founder', 'side project'],
            successRate: 15,
            commonChallenges: ['Finding co-founder', 'Idea validation', 'Fundraising', 'Loneliness'],
            tips: ['Start with side project', 'Build in public', 'Network actively', 'Have 12+ months runway']
        },
        'marketing manager->product manager': {
            difficulty: 'medium',
            timelineMonths: 12,
            salaryChange: '+25%',
            keySkillsToAcquire: ['technical literacy', 'data analysis', 'agile', 'product strategy'],
            bridgeRoles: ['growth product manager', 'marketing technologist'],
            successRate: 65,
            commonChallenges: ['Building technical credibility', 'Learning agile', 'Working with engineers'],
            tips: ['Learn SQL basics', 'Understand technical concepts', 'Lead growth experiments']
        },
        'business analyst->product manager': {
            difficulty: 'low',
            timelineMonths: 8,
            salaryChange: '+30%',
            keySkillsToAcquire: ['product strategy', 'user research', 'roadmapping'],
            bridgeRoles: ['associate product manager', 'product analyst'],
            successRate: 80,
            commonChallenges: ['Shifting from documentation to decision making'],
            tips: ['Take product ownership', 'Shadow PMs', 'Lead small features end-to-end']
        },
        'teacher->corporate trainer': {
            difficulty: 'low',
            timelineMonths: 6,
            salaryChange: '+40%',
            keySkillsToAcquire: ['corporate culture', 'adult learning principles', 'presentation skills'],
            bridgeRoles: ['training coordinator', 'instructional designer'],
            successRate: 85,
            commonChallenges: ['Adapting to corporate environment', 'Learning business context'],
            tips: ['Get corporate training certification', 'Build business vocabulary', 'Network in L&D community']
        },
        'teacher->ux researcher': {
            difficulty: 'medium',
            timelineMonths: 12,
            salaryChange: '+60%',
            keySkillsToAcquire: ['user research methods', 'usability testing', 'data analysis', 'figma basics'],
            bridgeRoles: ['research assistant', 'junior ux researcher'],
            successRate: 60,
            commonChallenges: ['Breaking into tech', 'Building portfolio'],
            tips: ['Leverage observation skills', 'Build research portfolio', 'Take UX bootcamp']
        },
        'financial analyst->data scientist': {
            difficulty: 'medium',
            timelineMonths: 10,
            salaryChange: '+35%',
            keySkillsToAcquire: ['python', 'machine learning', 'statistics'],
            bridgeRoles: ['quantitative analyst', 'financial data analyst'],
            successRate: 70,
            commonChallenges: ['Learning programming', 'Statistical rigor'],
            tips: ['Leverage financial domain expertise', 'Focus on fintech', 'Build quantitative projects']
        },
        'consultant->product manager': {
            difficulty: 'low',
            timelineMonths: 8,
            salaryChange: '+10%',
            keySkillsToAcquire: ['agile', 'user research', 'technical concepts'],
            bridgeRoles: ['strategy pm', 'transformation pm'],
            successRate: 75,
            commonChallenges: ['Adapting to ownership vs advisory', 'Learning technical depth'],
            tips: ['Leverage analytical skills', 'Join product-focused firms first', 'Build side projects']
        }
    },

    // ============================================
    // LEARNING RESOURCES
    // ============================================
    learningResources: {
        'product management': [
            { name: 'Product School Certification', type: 'course', cost: 'paid', duration: '8 weeks', url: 'productschool.com' },
            { name: 'Reforge Growth Series', type: 'course', cost: 'paid', duration: '6 weeks', url: 'reforge.com' },
            { name: 'Inspired by Marty Cagan', type: 'book', cost: '₹500', duration: '1 week', url: 'amazon.com' },
            { name: 'Product Manager Interview Prep', type: 'course', cost: 'free', duration: '2 weeks', url: 'youtube.com' }
        ],
        'data science': [
            { name: 'Google Data Analytics Certificate', type: 'course', cost: 'paid', duration: '6 months', url: 'coursera.org' },
            { name: 'Fast.ai Practical Deep Learning', type: 'course', cost: 'free', duration: '4 weeks', url: 'fast.ai' },
            { name: 'Kaggle Learn', type: 'course', cost: 'free', duration: '4 weeks', url: 'kaggle.com/learn' },
            { name: 'Python for Data Science Handbook', type: 'book', cost: 'free', duration: '2 weeks', url: 'jakevdp.github.io' }
        ],
        'ux design': [
            { name: 'Google UX Design Certificate', type: 'course', cost: 'paid', duration: '6 months', url: 'coursera.org' },
            { name: 'Figma Tutorial', type: 'course', cost: 'free', duration: '1 week', url: 'figma.com/resources/learn-design' },
            { name: 'Nielsen Norman UX Certification', type: 'course', cost: 'paid', duration: '4 weeks', url: 'nngroup.com' },
            { name: "Don't Make Me Think", type: 'book', cost: '₹400', duration: '1 week', url: 'amazon.com' }
        ],
        'entrepreneurship': [
            { name: 'Y Combinator Startup School', type: 'course', cost: 'free', duration: '8 weeks', url: 'startupschool.org' },
            { name: 'The Lean Startup', type: 'book', cost: '₹400', duration: '1 week', url: 'amazon.com' },
            { name: 'Zero to One', type: 'book', cost: '₹400', duration: '1 week', url: 'amazon.com' },
            { name: 'How to Start a Startup (Stanford)', type: 'course', cost: 'free', duration: '4 weeks', url: 'youtube.com' }
        ]
    }
};

// Export for use in main script
window.CareerKnowledgeBase = CareerKnowledgeBase;
