// ============================================
// CareerPivot - Comprehensive Learning Resources
// Detailed courses, guides, and step-by-step instructions
// ============================================

const LearningResources = {

    // ============================================
    // COURSE CATALOG BY SKILL
    // ============================================
    courses: {
        // PRODUCT MANAGEMENT
        'product strategy': {
            beginner: [
                { name: 'Product Management Fundamentals', provider: 'Coursera (University of Virginia)', url: 'https://www.coursera.org/learn/uva-darden-digital-product-management', duration: '4 weeks', cost: 'Free to audit', rating: 4.7, certificate: true },
                { name: 'Become a Product Manager', provider: 'Udemy', url: 'https://www.udemy.com/course/become-a-product-manager-learn-the-skills-get-a-job/', duration: '12 hours', cost: '₹499', rating: 4.6, certificate: true },
                { name: 'Product Management 101', provider: 'Product School (YouTube)', url: 'https://www.youtube.com/playlist?list=PLNvWIUcprGPLYvF4ZqAYH-CYAVYm5xJGV', duration: '5 hours', cost: 'Free', rating: 4.5, certificate: false }
            ],
            intermediate: [
                { name: 'Digital Product Management', provider: 'Coursera (UVA Darden)', url: 'https://www.coursera.org/specializations/uva-darden-digital-product-management', duration: '4 months', cost: '₹3,500/mo', rating: 4.7, certificate: true },
                { name: 'Product Management Certificate', provider: 'Product School', url: 'https://productschool.com/product-management-certification', duration: '8 weeks', cost: '$4,000', rating: 4.8, certificate: true }
            ],
            advanced: [
                { name: 'Reforge Growth Series', provider: 'Reforge', url: 'https://www.reforge.com/growth-series', duration: '6 weeks', cost: '$1,995', rating: 4.9, certificate: true },
                { name: 'Advanced Product Management', provider: 'Product School', url: 'https://productschool.com/', duration: '8 weeks', cost: '$4,500', rating: 4.8, certificate: true }
            ],
            books: [
                { name: 'Inspired: How to Create Tech Products Customers Love', author: 'Marty Cagan', url: 'https://www.amazon.in/dp/1119387507', cost: '₹500' },
                { name: 'The Lean Product Playbook', author: 'Dan Olsen', url: 'https://www.amazon.in/dp/1118960874', cost: '₹450' },
                { name: 'Escaping the Build Trap', author: 'Melissa Perri', url: 'https://www.amazon.in/dp/149197379X', cost: '₹400' }
            ]
        },

        'user research': {
            beginner: [
                { name: 'User Research Methods and Best Practices', provider: 'Coursera', url: 'https://www.coursera.org/learn/user-research', duration: '4 weeks', cost: 'Free to audit', rating: 4.6, certificate: true },
                { name: 'UX Research for Beginners', provider: 'Udemy', url: 'https://www.udemy.com/course/ux-research-for-beginners/', duration: '6 hours', cost: '₹499', rating: 4.5, certificate: true },
                { name: 'Intro to User Research', provider: 'Google (YouTube)', url: 'https://www.youtube.com/watch?v=WpzmOH0hrEM', duration: '1 hour', cost: 'Free', rating: 4.4, certificate: false }
            ],
            intermediate: [
                { name: 'User Research and Design', provider: 'University of Michigan (Coursera)', url: 'https://www.coursera.org/learn/user-research', duration: '5 weeks', cost: '₹3,000/mo', rating: 4.7, certificate: true },
                { name: 'Advanced User Research', provider: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/courses/user-research-methods-and-best-practices', duration: '6 weeks', cost: '$15/mo', rating: 4.6, certificate: true }
            ],
            books: [
                { name: 'Just Enough Research', author: 'Erika Hall', url: 'https://www.amazon.in/dp/1937557103', cost: '₹350' },
                { name: 'Interviewing Users', author: 'Steve Portigal', url: 'https://www.amazon.in/dp/193382011X', cost: '₹400' }
            ]
        },

        'roadmapping': {
            beginner: [
                { name: 'Product Roadmaps Micro-Learning', provider: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning/product-management-building-a-product-roadmap', duration: '1 hour', cost: '₹1,000/mo', rating: 4.5, certificate: true },
                { name: 'How to Create a Product Roadmap', provider: 'Productboard (YouTube)', url: 'https://www.youtube.com/watch?v=z4JKmvQqOKM', duration: '30 min', cost: 'Free', rating: 4.3, certificate: false }
            ],
            intermediate: [
                { name: 'Advanced Product Roadmapping', provider: 'Pragmatic Institute', url: 'https://www.pragmaticinstitute.com/course/focus', duration: '2 days', cost: '$2,500', rating: 4.7, certificate: true },
                { name: 'Strategic Roadmapping', provider: 'Product School', url: 'https://productschool.com/', duration: '4 weeks', cost: '$2,000', rating: 4.6, certificate: true }
            ],
            tools: [
                { name: 'Productboard', url: 'https://www.productboard.com/', type: 'Roadmap Tool', cost: 'Free tier available' },
                { name: 'Aha!', url: 'https://www.aha.io/', type: 'Roadmap Tool', cost: '$59/mo' },
                { name: 'Notion', url: 'https://www.notion.so/', type: 'All-in-one', cost: 'Free tier available' }
            ]
        },

        'stakeholder management': {
            beginner: [
                { name: 'Stakeholder Management', provider: 'Coursera', url: 'https://www.coursera.org/learn/stakeholder-management', duration: '3 weeks', cost: 'Free to audit', rating: 4.5, certificate: true },
                { name: 'Influence Without Authority', provider: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning/influencing-others', duration: '1 hour', cost: '₹1,000/mo', rating: 4.6, certificate: true }
            ],
            intermediate: [
                { name: 'Strategic Communication', provider: 'edX (Purdue)', url: 'https://www.edx.org/course/strategic-communication', duration: '6 weeks', cost: 'Free to audit', rating: 4.5, certificate: true }
            ],
            books: [
                { name: 'Crucial Conversations', author: 'Patterson, Grenny, et al.', url: 'https://www.amazon.in/dp/1260474186', cost: '₹450' },
                { name: 'Influence: The Psychology of Persuasion', author: 'Robert Cialdini', url: 'https://www.amazon.in/dp/006124189X', cost: '₹400' }
            ]
        },

        'agile': {
            beginner: [
                { name: 'Agile with Atlassian Jira', provider: 'Coursera (Atlassian)', url: 'https://www.coursera.org/learn/agile-atlassian-jira', duration: '4 weeks', cost: 'Free to audit', rating: 4.7, certificate: true },
                { name: 'Scrum Master Certification Prep', provider: 'Udemy', url: 'https://www.udemy.com/course/scrum-master-certification/', duration: '8 hours', cost: '₹499', rating: 4.6, certificate: true },
                { name: 'Agile Crash Course', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=1evfn3qTYGM', duration: '2 hours', cost: 'Free', rating: 4.5, certificate: false }
            ],
            intermediate: [
                { name: 'Professional Scrum Master I', provider: 'Scrum.org', url: 'https://www.scrum.org/professional-scrum-master-i-certification', duration: 'Self-paced', cost: '$150', rating: 4.8, certificate: true },
                { name: 'SAFe Agilist Certification', provider: 'Scaled Agile', url: 'https://scaledagile.com/training/leading-safe/', duration: '2 days', cost: '$995', rating: 4.6, certificate: true }
            ],
            books: [
                { name: 'Scrum: The Art of Doing Twice the Work in Half the Time', author: 'Jeff Sutherland', url: 'https://www.amazon.in/dp/038534645X', cost: '₹350' },
                { name: 'The Lean Startup', author: 'Eric Ries', url: 'https://www.amazon.in/dp/0307887898', cost: '₹400' }
            ]
        },

        'data analysis': {
            beginner: [
                { name: 'Google Data Analytics Certificate', provider: 'Coursera (Google)', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', duration: '6 months', cost: '₹3,500/mo', rating: 4.8, certificate: true },
                { name: 'Data Analysis with Python', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/', duration: '300 hours', cost: 'Free', rating: 4.7, certificate: true },
                { name: 'Excel for Data Analysis', provider: 'Coursera (Macquarie)', url: 'https://www.coursera.org/learn/excel-data-analysis', duration: '4 weeks', cost: 'Free to audit', rating: 4.6, certificate: true }
            ],
            intermediate: [
                { name: 'SQL for Data Science', provider: 'Coursera (UC Davis)', url: 'https://www.coursera.org/learn/sql-for-data-science', duration: '4 weeks', cost: 'Free to audit', rating: 4.6, certificate: true },
                { name: 'Data Analysis with Pandas', provider: 'DataCamp', url: 'https://www.datacamp.com/courses/data-manipulation-with-pandas', duration: '4 hours', cost: '$25/mo', rating: 4.7, certificate: true }
            ],
            advanced: [
                { name: 'Business Analytics Specialization', provider: 'Wharton (Coursera)', url: 'https://www.coursera.org/specializations/business-analytics', duration: '6 months', cost: '₹4,000/mo', rating: 4.7, certificate: true }
            ],
            tools: [
                { name: 'SQL Practice', url: 'https://sqlzoo.net/', type: 'Interactive SQL', cost: 'Free' },
                { name: 'Kaggle', url: 'https://www.kaggle.com/learn', type: 'Data Science Practice', cost: 'Free' },
                { name: 'Mode Analytics', url: 'https://mode.com/sql-tutorial/', type: 'SQL Tutorial', cost: 'Free' }
            ]
        },

        'sql': {
            beginner: [
                { name: 'SQL for Beginners', provider: 'Codecademy', url: 'https://www.codecademy.com/learn/learn-sql', duration: '8 hours', cost: 'Free', rating: 4.6, certificate: false },
                { name: 'SQLZoo Interactive Tutorial', provider: 'SQLZoo', url: 'https://sqlzoo.net/', duration: 'Self-paced', cost: 'Free', rating: 4.7, certificate: false },
                { name: 'SQL Tutorial', provider: 'W3Schools', url: 'https://www.w3schools.com/sql/', duration: 'Self-paced', cost: 'Free', rating: 4.5, certificate: false }
            ],
            intermediate: [
                { name: 'SQL for Data Science', provider: 'Coursera', url: 'https://www.coursera.org/learn/sql-for-data-science', duration: '4 weeks', cost: 'Free to audit', rating: 4.6, certificate: true },
                { name: 'Advanced SQL', provider: 'Mode Analytics', url: 'https://mode.com/sql-tutorial/intro-to-advanced-sql/', duration: '10 hours', cost: 'Free', rating: 4.5, certificate: false }
            ]
        },

        'python': {
            beginner: [
                { name: 'Python for Everybody', provider: 'Coursera (University of Michigan)', url: 'https://www.coursera.org/specializations/python', duration: '8 months', cost: 'Free to audit', rating: 4.8, certificate: true },
                { name: 'Automate the Boring Stuff', provider: 'Udemy / Free Book', url: 'https://automatetheboringstuff.com/', duration: 'Self-paced', cost: 'Free', rating: 4.9, certificate: false },
                { name: 'Python Crash Course', provider: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', duration: '4.5 hours', cost: 'Free', rating: 4.7, certificate: false }
            ],
            intermediate: [
                { name: 'Python Data Structures', provider: 'Coursera', url: 'https://www.coursera.org/learn/python-data', duration: '7 weeks', cost: 'Free to audit', rating: 4.7, certificate: true },
                { name: '100 Days of Code', provider: 'Udemy', url: 'https://www.udemy.com/course/100-days-of-code/', duration: '60 hours', cost: '₹499', rating: 4.7, certificate: true }
            ]
        },

        'machine learning': {
            beginner: [
                { name: 'Machine Learning by Andrew Ng', provider: 'Coursera (Stanford)', url: 'https://www.coursera.org/learn/machine-learning', duration: '11 weeks', cost: 'Free to audit', rating: 4.9, certificate: true },
                { name: 'ML Crash Course', provider: 'Google', url: 'https://developers.google.com/machine-learning/crash-course', duration: '15 hours', cost: 'Free', rating: 4.8, certificate: false },
                { name: 'Practical Deep Learning', provider: 'Fast.ai', url: 'https://course.fast.ai/', duration: '7 weeks', cost: 'Free', rating: 4.9, certificate: false }
            ],
            intermediate: [
                { name: 'Deep Learning Specialization', provider: 'Coursera (deeplearning.ai)', url: 'https://www.coursera.org/specializations/deep-learning', duration: '5 months', cost: '₹3,500/mo', rating: 4.9, certificate: true },
                { name: 'Applied ML', provider: 'Kaggle', url: 'https://www.kaggle.com/learn', duration: '30 hours', cost: 'Free', rating: 4.7, certificate: true }
            ]
        },

        'communication': {
            beginner: [
                { name: 'Business Communication', provider: 'Coursera (University of Colorado)', url: 'https://www.coursera.org/learn/business-writing', duration: '4 weeks', cost: 'Free to audit', rating: 4.6, certificate: true },
                { name: 'Public Speaking', provider: 'Coursera (University of Washington)', url: 'https://www.coursera.org/learn/public-speaking', duration: '5 weeks', cost: 'Free to audit', rating: 4.7, certificate: true }
            ],
            practice: [
                { name: 'Toastmasters International', url: 'https://www.toastmasters.org/', type: 'Speaking Club', cost: '~₹500/mo' },
                { name: 'Daily Writing Practice', url: 'https://750words.com/', type: 'Writing Practice', cost: 'Free' }
            ],
            books: [
                { name: 'Made to Stick', author: 'Chip & Dan Heath', url: 'https://www.amazon.in/dp/1400064287', cost: '₹400' },
                { name: 'Talk Like TED', author: 'Carmine Gallo', url: 'https://www.amazon.in/dp/1250041120', cost: '₹350' }
            ]
        },

        'figma': {
            beginner: [
                { name: 'Figma UI Design Tutorial', provider: 'Figma (Official)', url: 'https://www.figma.com/resources/learn-design/', duration: '5 hours', cost: 'Free', rating: 4.8, certificate: false },
                { name: 'Figma for Beginners', provider: 'YouTube (DesignCourse)', url: 'https://www.youtube.com/watch?v=Cx2dkpBxst8', duration: '3 hours', cost: 'Free', rating: 4.7, certificate: false },
                { name: 'Complete Figma Course', provider: 'Udemy', url: 'https://www.udemy.com/course/learn-figma/', duration: '10 hours', cost: '₹499', rating: 4.6, certificate: true }
            ],
            intermediate: [
                { name: 'Advanced Figma Techniques', provider: 'DesignLab', url: 'https://designlab.com/figma-101-course/', duration: '4 weeks', cost: '$499', rating: 4.7, certificate: true }
            ]
        },

        'leadership': {
            beginner: [
                { name: 'Leadership Principles', provider: 'Harvard (edX)', url: 'https://www.edx.org/course/exercising-leadership-foundational-principles', duration: '4 weeks', cost: 'Free to audit', rating: 4.7, certificate: true },
                { name: 'Inspiring Leadership', provider: 'Coursera (Case Western)', url: 'https://www.coursera.org/learn/inspirational-leadership', duration: '8 weeks', cost: 'Free to audit', rating: 4.6, certificate: true }
            ],
            books: [
                { name: 'Leaders Eat Last', author: 'Simon Sinek', url: 'https://www.amazon.in/dp/1591848016', cost: '₹400' },
                { name: 'The Five Dysfunctions of a Team', author: 'Patrick Lencioni', url: 'https://www.amazon.in/dp/0787960756', cost: '₹350' },
                { name: 'Radical Candor', author: 'Kim Scott', url: 'https://www.amazon.in/dp/1250235375', cost: '₹450' }
            ]
        }
    },

    // ============================================
    // STEP-BY-STEP GUIDES
    // ============================================
    guides: {
        'informational interviews': {
            title: 'How to Conduct Informational Interviews',
            difficulty: 'Easy',
            timeRequired: '30 min prep + 30 min call each',
            steps: [
                {
                    step: 1,
                    title: 'Identify Target People',
                    description: 'Find 10-15 people on LinkedIn who are in your target role',
                    actions: [
                        'Search LinkedIn for your target job title',
                        'Filter by 2nd-degree connections (easier to reach)',
                        'Look for people who made similar transitions',
                        'Note their career path and current company'
                    ],
                    tips: ['Alumni from your college are 3x more likely to respond', 'Look for people who post content - they usually enjoy sharing']
                },
                {
                    step: 2,
                    title: 'Craft Your Outreach Message',
                    description: 'Write a personalized, brief connection request',
                    actions: [
                        'Mention something specific about their background',
                        'Explain your situation in 2 sentences',
                        'Ask for just 20 minutes of their time',
                        'Make it easy to say yes'
                    ],
                    template: `Hi [Name],

I noticed you transitioned from [their old role] to [current role] at [company]. I'm currently a [your role] exploring a similar path.

Would you have 20 minutes for a quick call? I'd love to learn about your journey and any advice you'd share.

Thanks!
[Your name]`
                },
                {
                    step: 3,
                    title: 'Prepare Your Questions',
                    description: 'Have 5-7 thoughtful questions ready',
                    actions: [
                        'Research them first - don\'t ask what\'s on LinkedIn',
                        'Focus on their personal experience',
                        'Ask about challenges and surprises',
                        'End with "who else should I talk to?"'
                    ],
                    sampleQuestions: [
                        'What does a typical day look like in your role?',
                        'What was the biggest surprise when you made the transition?',
                        'What skills were most important in landing your first PM role?',
                        'If you were me, what would you focus on in the next 6 months?',
                        'Is there anyone else you think I should talk to?'
                    ]
                },
                {
                    step: 4,
                    title: 'Follow Up Properly',
                    description: 'Build lasting relationships, not just one-time asks',
                    actions: [
                        'Send thank you within 24 hours',
                        'Connect on LinkedIn if not already',
                        'Share something valuable (article, resource)',
                        'Update them on your progress in 2-3 months'
                    ]
                }
            ]
        },

        'portfolio projects': {
            title: 'Building PM Portfolio Projects',
            difficulty: 'Medium',
            timeRequired: '20-40 hours per project',
            steps: [
                {
                    step: 1,
                    title: 'Choose the Right Project Type',
                    description: 'Select a project that demonstrates PM skills',
                    options: [
                        { type: 'Feature Improvement', desc: 'Improve an existing product feature', example: 'Redesign Spotify\'s playlist sharing experience' },
                        { type: 'New Product Concept', desc: 'Create a solution for a real problem', example: 'App to help remote workers manage work-life balance' },
                        { type: 'Product Teardown', desc: 'Deep analysis of a product\'s strategy', example: 'Why Notion won: A product strategy analysis' },
                        { type: 'Market Analysis', desc: 'Identify opportunities in a space', example: 'The future of personal finance apps in India' }
                    ]
                },
                {
                    step: 2,
                    title: 'Document Like a Real PM',
                    description: 'Create professional PM artifacts',
                    artifacts: [
                        'Problem Statement & User Research Summary',
                        'User Personas (2-3 detailed personas)',
                        'Competitive Analysis Matrix',
                        'Product Requirements Document (PRD)',
                        'User Journey Maps',
                        'Wireframes or Mockups (use Figma)',
                        'Success Metrics & KPIs',
                        'Launch Plan'
                    ]
                },
                {
                    step: 3,
                    title: 'Add Credibility Boosters',
                    description: 'Make your project stand out',
                    actions: [
                        'Conduct 5+ real user interviews',
                        'Run a small survey (use Typeform)',
                        'Include data-driven insights',
                        'Show iteration based on feedback',
                        'Get feedback from actual PMs'
                    ]
                },
                {
                    step: 4,
                    title: 'Present Professionally',
                    description: 'Create a polished case study',
                    format: [
                        'Personal website or Notion page',
                        'Clear problem → process → solution flow',
                        'Visual mockups and diagrams',
                        'Lessons learned section',
                        'Link to detailed documents'
                    ]
                }
            ]
        },

        'resume optimization': {
            title: 'Optimizing Resume for Career Transition',
            difficulty: 'Medium',
            timeRequired: '4-6 hours',
            steps: [
                {
                    step: 1,
                    title: 'Research Target Role Keywords',
                    description: 'Understand what hiring managers look for',
                    actions: [
                        'Analyze 10+ job descriptions for your target role',
                        'List common skills, tools, and requirements',
                        'Note the language they use (metrics, verbs)',
                        'Identify must-have vs nice-to-have'
                    ]
                },
                {
                    step: 2,
                    title: 'Reframe Your Experience',
                    description: 'Translate past work to target role language',
                    beforeAfter: [
                        { before: 'Led development team of 5 engineers', after: 'Owned roadmap and led cross-functional team of 5 to deliver product features' },
                        { before: 'Created marketing campaigns', after: 'Drove user acquisition through data-informed growth experiments, increasing signups 40%' },
                        { before: 'Analyzed business data', after: 'Identified product opportunities through SQL analysis, leading to 2 new feature launches' }
                    ]
                },
                {
                    step: 3,
                    title: 'Add Transition Signals',
                    description: 'Show intentional movement toward new role',
                    sections: [
                        'Add coursework/certifications in a prominent section',
                        'Include portfolio projects with results',
                        'Highlight transferable achievements',
                        'Add relevant volunteer/side work'
                    ]
                },
                {
                    step: 4,
                    title: 'Get Professional Feedback',
                    description: 'Iterate based on expert input',
                    actions: [
                        'Ask 2-3 people in target role to review',
                        'Use free resume review services',
                        'Run through ATS scanner tools',
                        'A/B test with different versions'
                    ],
                    tools: [
                        { name: 'Jobscan', url: 'https://www.jobscan.co/', desc: 'ATS optimization' },
                        { name: 'Grammarly', url: 'https://www.grammarly.com/', desc: 'Writing clarity' },
                        { name: 'Resume Worded', url: 'https://resumeworded.com/', desc: 'AI feedback' }
                    ]
                }
            ]
        },

        'networking strategy': {
            title: 'Strategic Networking for Career Changers',
            difficulty: 'Easy-Medium',
            timeRequired: '3-5 hours/week ongoing',
            steps: [
                {
                    step: 1,
                    title: 'Build Your Target List',
                    description: 'Identify who can help you',
                    categories: [
                        { type: 'Gatekeepers', desc: 'Recruiters at target companies' },
                        { type: 'Peers', desc: 'People who made similar transitions' },
                        { type: 'Mentors', desc: 'Senior people in target role' },
                        { type: 'Connectors', desc: 'Well-networked people in the industry' }
                    ]
                },
                {
                    step: 2,
                    title: 'Engage Before Asking',
                    description: 'Build genuine relationships first',
                    actions: [
                        'Comment thoughtfully on their posts for 2-4 weeks',
                        'Share their content with your insights',
                        'Offer help or value before asking for anything',
                        'Find common ground (school, interests, background)'
                    ]
                },
                {
                    step: 3,
                    title: 'Attend Industry Events',
                    description: 'Show up where target people gather',
                    venues: [
                        'Product Management meetups (search Meetup.com)',
                        'Industry conferences (even virtual)',
                        'Webinars and Twitter Spaces',
                        'Slack/Discord communities',
                        'Company open houses and demo days'
                    ]
                },
                {
                    step: 4,
                    title: 'Nurture Your Network',
                    description: 'Maintain relationships systematically',
                    actions: [
                        'Use a CRM (Notion, Airtable) to track contacts',
                        'Set reminders for quarterly check-ins',
                        'Share relevant articles and opportunities',
                        'Celebrate their wins publicly',
                        'Make introductions between your contacts'
                    ]
                }
            ]
        },

        'mock interviews': {
            title: 'Preparing with Mock Interviews',
            difficulty: 'Medium',
            timeRequired: '2-3 hours per session',
            steps: [
                {
                    step: 1,
                    title: 'Know the Interview Types',
                    description: 'Prepare for different formats',
                    types: [
                        { type: 'Behavioral', focus: 'Past experiences using STAR method', time: '30-45 min' },
                        { type: 'Product Design', focus: 'Design a product for X users', time: '45-60 min' },
                        { type: 'Product Strategy', focus: 'How would you grow X product', time: '45 min' },
                        { type: 'Technical', focus: 'System design, metrics, SQL', time: '30-45 min' },
                        { type: 'Case Study', focus: 'Analyze and present a business problem', time: '60 min' }
                    ]
                },
                {
                    step: 2,
                    title: 'Build Your Story Bank',
                    description: 'Prepare 8-10 versatile stories',
                    framework: 'STAR Method',
                    stories: [
                        'Led a difficult project to success',
                        'Failed and learned from it',
                        'Dealt with conflict in the team',
                        'Influenced without authority',
                        'Made decision with incomplete data',
                        'Handled competing priorities',
                        'Worked with difficult stakeholders',
                        'Drove impact beyond your role'
                    ]
                },
                {
                    step: 3,
                    title: 'Practice with Real People',
                    description: 'Simulate actual interview pressure',
                    resources: [
                        { name: 'Pramp', url: 'https://www.pramp.com/', desc: 'Free peer practice', cost: 'Free' },
                        { name: 'Exponent', url: 'https://www.tryexponent.com/', desc: 'PM interview prep', cost: '$99/mo' },
                        { name: 'IGotAnOffer', url: 'https://igotanoffer.com/', desc: 'Expert mock interviews', cost: '$150+' },
                        { name: 'LinkedIn', url: 'https://linkedin.com', desc: 'Find practice partners', cost: 'Free' }
                    ]
                },
                {
                    step: 4,
                    title: 'Review and Iterate',
                    description: 'Learn from each practice session',
                    actions: [
                        'Record yourself (with permission)',
                        'Get specific feedback on each answer',
                        'Track common weaknesses',
                        'Practice weaker areas specifically',
                        'Do 10-15 mocks minimum before real interviews'
                    ]
                }
            ]
        }
    },

    // ============================================
    // ROLE-SPECIFIC LEARNING PATHS
    // ============================================
    learningPaths: {
        'product manager': {
            duration: '4-6 months',
            weeklyHours: 10,
            phases: [
                {
                    phase: 'Foundation',
                    weeks: '1-4',
                    focus: 'Core PM concepts',
                    courses: [
                        { name: 'Product Management Fundamentals', provider: 'Coursera', priority: 'Required' },
                        { name: 'Inspired by Marty Cagan', type: 'Book', priority: 'Required' }
                    ],
                    projects: ['Analyze 5 products you use daily', 'Write PRD for a feature improvement']
                },
                {
                    phase: 'Technical Literacy',
                    weeks: '5-8',
                    focus: 'Enough tech to be dangerous',
                    courses: [
                        { name: 'SQL for Data Science', provider: 'Coursera', priority: 'Required' },
                        { name: 'Agile with Jira', provider: 'Atlassian', priority: 'Required' }
                    ],
                    projects: ['Run SQL queries on a public dataset', 'Set up a Kanban board for a personal project']
                },
                {
                    phase: 'User Research',
                    weeks: '9-12',
                    focus: 'Understanding users',
                    courses: [
                        { name: 'User Research Methods', provider: 'Coursera', priority: 'Required' },
                        { name: 'Figma Basics', provider: 'Figma', priority: 'Recommended' }
                    ],
                    projects: ['Conduct 5 user interviews', 'Create wireframes for a feature']
                },
                {
                    phase: 'Portfolio Building',
                    weeks: '13-18',
                    focus: 'Demonstrable work',
                    projects: ['Complete 2 full PM case studies', 'Build personal PM portfolio website']
                },
                {
                    phase: 'Interview Prep',
                    weeks: '19-24',
                    focus: 'Landing the role',
                    activities: ['15+ mock interviews', 'Resume optimization', 'Apply to 50+ roles']
                }
            ]
        },

        'data scientist': {
            duration: '6-9 months',
            weeklyHours: 15,
            phases: [
                {
                    phase: 'Python & Math Foundation',
                    weeks: '1-6',
                    courses: [
                        { name: 'Python for Everybody', provider: 'Coursera', priority: 'Required' },
                        { name: 'Mathematics for Machine Learning', provider: 'Coursera', priority: 'Required' }
                    ]
                },
                {
                    phase: 'Data Analysis',
                    weeks: '7-12',
                    courses: [
                        { name: 'Google Data Analytics', provider: 'Coursera', priority: 'Required' },
                        { name: 'SQL for Data Science', provider: 'Coursera', priority: 'Required' }
                    ]
                },
                {
                    phase: 'Machine Learning',
                    weeks: '13-20',
                    courses: [
                        { name: 'Machine Learning by Andrew Ng', provider: 'Coursera', priority: 'Required' },
                        { name: 'Practical Deep Learning', provider: 'Fast.ai', priority: 'Recommended' }
                    ]
                },
                {
                    phase: 'Portfolio & Kaggle',
                    weeks: '21-28',
                    activities: ['Complete 3 Kaggle competitions', 'Build 2 end-to-end ML projects']
                }
            ]
        }
    }
};

// Export for use
window.LearningResources = LearningResources;
