// ============================================
// CareerPivot - Company Knowledge Base
// Database of potential employers by location and role
// ============================================

const CompanyDatabase = {
    // City mappings for normalization
    cities: {
        'bangalore': 'Bengaluru',
        'bengaluru': 'Bengaluru',
        'mumbai': 'Mumbai',
        'delhi': 'Delhi NCR',
        'ncr': 'Delhi NCR',
        'gurgaon': 'Delhi NCR',
        'noida': 'Delhi NCR',
        'hyderabad': 'Hyderabad',
        'pune': 'Pune',
        'chennai': 'Chennai',
        'sf': 'San Francisco',
        'san francisco': 'San Francisco',
        'new york': 'New York',
        'nyc': 'New York',
        'london': 'London',
        'remote': 'Remote',
        'wfh': 'Remote'
    },

    // Company Data
    // Structure: City -> Role -> List of Companies with details
    data: {
        'Bengaluru': {
            'Product Manager': [
                { name: "Flipkart", tier: "Tier 1", tags: ["E-commerce", "High Scale"], url: "https://www.flipkartcareers.com/" },
                { name: "Swiggy", tier: "Tier 1", tags: ["Food Tech", "Hyperlocal"], url: "https://careers.swiggy.com/" },
                { name: "Razorpay", tier: "Tier 1", tags: ["Fintech", "B2B"], url: "https://razorpay.com/jobs/" },
                { name: "Zerodha", tier: "Tier 1", tags: ["Fintech", "Bootstrapped"], url: "https://zerodha.com/careers" },
                { name: "Cred", tier: "Tier 1", tags: ["Fintech", "Design-first"], url: "https://careers.cred.club/" },
                { name: "Udaan", tier: "Tier 2", tags: ["B2B E-commerce"], url: "https://udaan.com/careers" },
                { name: "PhonePe", tier: "Tier 1", tags: ["Fintech"], url: "https://www.phonepe.com/careers/" }
            ],
            'Software Engineer': [
                { name: "Google", tier: "MNC", tags: ["Search", "Cloud"], url: "https://careers.google.com/" },
                { name: "Microsoft", tier: "MNC", tags: ["Cloud", "AI"], url: "https://careers.microsoft.com/" },
                { name: "Amazon", tier: "MNC", tags: ["E-commerce", "AWS"], url: "https://www.amazon.jobs/" },
                { name: "Postman", tier: "Unicorn", tags: ["DevTools", "API"], url: "https://www.postman.com/careers/" },
                { name: "Atlassian", tier: "MNC", tags: ["SaaS", "Collaboration"], url: "https://www.atlassian.com/company/careers" }
            ],
            'Data Scientist': [
                { name: "Fractal Analytics", tier: "Specialized", tags: ["AI/ML Consult"], url: "https://fractal.ai/careers/" },
                { name: "InMobi", tier: "Unicorn", tags: ["AdTech", "Big Data"], url: "https://www.inmobi.com/company/careers/" },
                { name: "Target", tier: "MNC", tags: ["Retail Analytics"], url: "https://jobs.target.com/" },
                { name: "Walmart Global Tech", tier: "MNC", tags: ["Retail Tech"], url: "https://careers.walmart.com/" }
            ]
        },
        'Mumbai': {
            'Product Manager': [
                { name: "Dream11", tier: "Unicorn", tags: ["Gaming", "Sports"], url: "https://about.dream11.com/careers" },
                { name: "Jio", tier: "Conglomerate", tags: ["Telecom", "Digital"], url: "https://careers.jio.com/" },
                { name: "Nykaa", tier: "Unicorn", tags: ["E-commerce", "Fashion"], url: "https://www.nykaa.com/careers" },
                { name: "BookMyShow", tier: "Established", tags: ["Entertainment"], url: "https://in.bookmyshow.com/careers" }
            ],
            'Finance': [
                { name: "HDFC Bank", tier: "Bank", tags: ["Banking"], url: "https://www.hdfcbank.com/personal/about-us/careers" },
                { name: "ICICI Bank", tier: "Bank", tags: ["Banking"], url: "https://www.icicicareers.com/" },
                { name: "Axis Bank", tier: "Bank", tags: ["Banking"], url: "https://www.axisbank.com/careers" }
            ]
        },
        'Delhi NCR': {
            'Product Manager': [
                { name: "Zomato", tier: "Unicorn", tags: ["Food Tech"], url: "https://www.zomato.com/careers" },
                { name: "Paytm", tier: "Unicorn", tags: ["Fintech"], url: "https://paytm.com/careers" },
                { name: "MakeMyTrip", tier: "Established", tags: ["Travel"], url: "https://www.makemytrip.com/careers/" },
                { name: "PolicyBazaar", tier: "Unicorn", tags: ["InsurTech"], url: "https://www.policybazaar.com/careers/" },
                { name: "Urban Company", tier: "Unicorn", tags: ["Services"], url: "https://www.urbancompany.com/careers" }
            ]
        },
        'Remote': {
            'Any': [
                { name: "GitLab", tier: "Remote-First", tags: ["DevOps"], url: "https://about.gitlab.com/jobs/" },
                { name: "Automattic", tier: "Remote-First", tags: ["WordPress"], url: "https://automattic.com/work-with-us/" },
                { name: "Doist", tier: "Remote-First", tags: ["Productivity"], url: "https://doist.com/careers" },
                { name: "Zapier", tier: "Remote-First", tags: ["Automation"], url: "https://zapier.com/jobs" },
                { name: "Canonical", tier: "Remote-First", tags: ["Linux"], url: "https://canonical.com/careers" }
            ]
        }
    },

    // Fallback if city not found
    genericTech: [
        { name: "Accenture", description: "Global professional services", tags: ["Consulting", "Tech"] },
        { name: "TCS", description: "IT Services", tags: ["Service", "Global"] },
        { name: "Infosys", description: "Digital services and consulting", tags: ["Service", "Global"] },
        { name: "Wipro", description: "IT consulting", tags: ["Service", "Tech"] },
        { name: "Capgemini", description: "Consulting & Technology", tags: ["Consulting"] }
    ],

    // Helper to get companies
    getCompanies(cityInput, roleInput) {
        // Normalize city
        const cityKey = Object.keys(this.cities).find(k => cityInput.toLowerCase().includes(k));
        const city = cityKey ? this.cities[cityKey] : 'Remote'; // Default to Remote/Global if unknown

        // Get companies for city
        const cityData = this.data[city] || this.data['Remote'];

        // Normalize role to find closest match in data
        // For simplicity, we check if role contains "Product", "Engineer", "Data", "Design"
        let roleCategory = 'Software Engineer'; // Default
        if (roleInput.toLowerCase().includes('product') || roleInput.toLowerCase().includes('manager')) roleCategory = 'Product Manager';
        else if (roleInput.toLowerCase().includes('data') || roleInput.toLowerCase().includes('scientist') || roleInput.toLowerCase().includes('analyst')) roleCategory = 'Data Scientist';
        else if (roleInput.toLowerCase().includes('design') || roleInput.toLowerCase().includes('ux')) roleCategory = 'Product Manager'; // Map logic
        else if (this.data[city] && this.data[city][roleInput]) roleCategory = roleInput;

        // Fetch
        let companies = [];
        if (cityData && cityData[roleCategory]) {
            companies = cityData[roleCategory];
        } else if (cityData && cityData['Any']) {
            companies = cityData['Any'];
        }

        // If very few companies found for specific city/role, add generic/remote ones
        if (companies.length < 3) {
            companies = [...companies, ...this.data['Remote']['Any']];
        }

        return {
            city: city,
            roleCategory: roleCategory,
            list: companies,
            isGeneric: companies.length === 0
        };
    }
};

window.CompanyDatabase = CompanyDatabase;
