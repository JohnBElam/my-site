// ============================================================
// SHARED NAV — inject into every page via:
//   document.getElementById('nav-placeholder').innerHTML = GG.nav('home');
// ============================================================
const GG = {
  nav(activePage = '') {
    const links = [
      { href: 'index.html',      label: 'Home',       id: 'home' },
      { href: 'start-here.html', label: 'Start Here', id: 'start' },
      { href: 'games.html',      label: 'Games',      id: 'games' },
      { href: 'personas.html',   label: 'Personas',   id: 'personas' },
      { href: 'skills.html',     label: 'DS Skills',  id: 'skills' },
      { href: 'blog.html',       label: 'Blog',       id: 'blog' },
      { href: 'research.html',   label: 'Research Log', id: 'research' },
    ];
    const navLinks = links.map(l =>
      `<li><a href="${l.href}" class="${activePage === l.id ? 'active' : ''}">${l.label}</a></li>`
    ).join('');
    return `
      <header class="gg-site-header">
        <div class="gg-site-bar">
          <a href="https://johnbelam.com" class="gg-site-back">← Return to johnbelam.com</a>
        </div>
        <nav class="gg-nav">
          <a href="index.html" class="nav-logo">
            <span style="font-size:20px">🎓</span>
            <span class="nav-logo-text">Gaming Is Good</span>
          </a>
          <ul class="nav-links">${navLinks}</ul>
          <a href="newsletter.html" class="nav-cta">Subscribe</a>
        </nav>
      </header>`;
  },

  footer() {
    return `
      <footer class="gg-footer">
        <div class="footer-logo">🎓 Gaming Is Good</div>
        <div class="footer-sub">Strategic games build better decision-makers. This is the proof.</div>
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="games.html">Games</a>
          <a href="personas.html">Personas</a>
          <a href="skills.html">DS Skills</a>
          <a href="blog.html">Blog</a>
          <a href="research.html">Research Log</a>
          <a href="newsletter.html">Newsletter</a>
          <a href="https://johnbelam.com" target="_blank">johnbelam.com</a>
        </div>
        <div style="margin-top:20px; font-size:12px; color:#a09cb8;">
          &copy; 2025 John Brandon Elam &middot; Bit Bros Publishing
        </div>
      </footer>`;
  }
};

// ============================================================
// GAME DATA
// ============================================================
const GAMES = [
  {
    id: 'factorio',
    title: 'Factorio',
    genre: 'Simulation / Factory Builder',
    platform: 'PC',
    steamUrl: 'https://store.steampowered.com/app/427520/Factorio/',
    thumbnail: '⚙️',
    color: '#e8f4e8',
    rating: 9.6,
    timeInvestment: 5,   // 1-5 scale
    complexity: 5,
    dsRating: 9.8,
    personas: ['optimizer', 'modeler'],
    skills: ['Systems Optimization', 'Flow Analysis', 'Bottleneck Identification', 'Resource Allocation'],
    tagline: 'The purest decision system ever shipped as a game.',
    summary: 'Factorio is a factory-building game where you automate increasingly complex production chains. Every constraint you encounter is a real operations research problem: throughput, queuing, resource allocation, and system interdependency. It rewards the same thinking patterns that make supply chain professionals dangerous.',
    transferableSkills: 'Players who log 100+ hours in Factorio develop an intuitive feel for bottleneck analysis and constraint propagation that takes years to build in a formal OR curriculum. The feedback loop is immediate and honest.',
    blogPost: null
  },
  {
    id: 'civilization',
    title: 'Civilization VI',
    genre: '4X Grand Strategy',
    platform: 'PC / Console',
    steamUrl: 'https://store.steampowered.com/app/289070/Sid_Meiers_Civilization_VI/',
    thumbnail: '🏛️',
    color: '#fff8e8',
    rating: 8.8,
    timeInvestment: 4,
    complexity: 4,
    dsRating: 8.5,
    personas: ['strategist', 'optimizer'],
    skills: ['Long-Horizon Planning', 'Multi-Variable Tradeoffs', 'Sequential Decision Making', 'Uncertainty Management'],
    tagline: 'Decades of decisions compressed into a single session.',
    summary: 'Civilization VI is a 4X strategy game spanning thousands of years of civilization development. Every turn is a portfolio allocation problem under uncertainty. The game trains long-horizon thinking, the ability to sequence decisions across time, and the discipline to avoid local optima at the cost of global objectives.',
    transferableSkills: 'The "one more turn" dynamic is actually a training artifact: the game punishes players who optimize for the next 5 turns at the expense of the next 50. That discipline transfers directly to strategic planning work.',
    blogPost: null
  },
  {
    id: 'hoi4',
    title: 'Hearts of Iron IV',
    genre: 'Grand Strategy / Wargame',
    platform: 'PC',
    steamUrl: 'https://store.steampowered.com/app/394360/Hearts_of_Iron_IV/',
    thumbnail: '🎖️',
    color: '#f0ede8',
    rating: 8.5,
    timeInvestment: 5,
    complexity: 5,
    dsRating: 9.0,
    personas: ['strategist', 'modeler'],
    skills: ['Resource Management', 'Risk Quantification', 'Coalition Dynamics', 'Capacity Planning'],
    tagline: 'War as a resource allocation problem. Solved repeatedly.',
    summary: 'Hearts of Iron IV models global industrial capacity, military logistics, and political coalition management across World War II timelines. It is the most complex resource allocation simulation available outside of professional wargaming software. Players learn to reason about capacity constraints, production queues, and multi-theater decision interdependency.',
    transferableSkills: 'HoI4 trains the ability to hold multiple resource constraints in working memory simultaneously and make tradeoffs without perfect information. That is exactly the cognitive load of enterprise operations planning.',
    blogPost: null
  },
  {
    id: 'apex',
    title: 'Apex Legends',
    genre: 'Battle Royale / Tactical FPS',
    platform: 'PC / Console',
    steamUrl: 'https://store.steampowered.com/app/1172470/Apex_Legends/',
    thumbnail: '⚡',
    color: '#eef0ff',
    rating: 8.2,
    timeInvestment: 2,
    complexity: 3,
    dsRating: 7.8,
    personas: ['adapter', 'strategist'],
    skills: ['Fast Feedback Loops', 'Probabilistic Risk Assessment', 'Team Coordination', 'Adaptive Decision Making'],
    tagline: 'Decisions at gunpoint. The fastest feedback loop in gaming.',
    summary: 'Apex Legends is a battle royale shooter that compresses the plan-observe-decide-act loop into seconds. At Platinum rank and above, the game becomes a study in probabilistic risk assessment: when to engage, when to disengage, how to read incomplete information, and how to coordinate decisions across a team in real time.',
    transferableSkills: 'The meta-skill Apex builds is composure under uncertainty. Professional decision-makers who game competitively report a measurably better ability to make fast, reversible decisions without analysis paralysis.',
    blogPost: null
  }
];

// ============================================================
// SKILL TAXONOMY
// ============================================================
const DS_SKILLS = [
  {
    id: 'systems-optimization',
    name: 'Systems Optimization',
    icon: '⚙️',
    color: '#eeedfe',
    textColor: '#6633ff',
    definition: 'The process of finding the best configuration of a system given a set of constraints and an objective function. In professional practice this is the core of Operations Research.',
    whyItMatters: 'Most "optimization" done in organizations is local: improve this one metric. True systems optimization requires holding the whole system in view and understanding how changing one variable propagates through others.',
    games: ['factorio', 'civilization'],
    professionalAnalog: 'Supply chain network design, workforce scheduling, production planning'
  },
  {
    id: 'flow-analysis',
    name: 'Flow Analysis',
    icon: '🌊',
    color: '#e1f5ee',
    textColor: '#007a3d',
    definition: 'Understanding how throughput, bottlenecks, and capacity constraints shape system behavior. Rooted in queuing theory and the Theory of Constraints.',
    whyItMatters: 'Every organization is a network of flows. Professionals who cannot identify the binding constraint in a process are doomed to optimize things that do not move the needle.',
    games: ['factorio'],
    professionalAnalog: 'Process improvement, logistics network analysis, software delivery pipelines'
  },
  {
    id: 'long-horizon-planning',
    name: 'Long-Horizon Planning',
    icon: '🔭',
    color: '#fff8e8',
    textColor: '#7a5500',
    definition: 'The ability to sequence decisions across time in a way that preserves future optionality while making progress toward a distal objective.',
    whyItMatters: 'Short-termism is the dominant failure mode in organizational decision-making. Training the brain to think in longer time horizons requires practice, not just intention.',
    games: ['civilization', 'hoi4'],
    professionalAnalog: 'Strategic roadmapping, capital allocation, talent development'
  },
  {
    id: 'risk-quantification',
    name: 'Risk Quantification',
    icon: '🎲',
    color: '#faeeda',
    textColor: '#7a4000',
    definition: 'The practice of converting qualitative uncertainty into probabilistic estimates that can be compared and acted upon. Not risk avoidance. Risk accounting.',
    whyItMatters: 'Decisions made without explicit risk accounting are not bold, they are incomplete. The discipline of forcing a probability estimate exposes hidden assumptions.',
    games: ['hoi4', 'apex', 'civilization'],
    professionalAnalog: 'Financial modeling, project risk management, scenario planning'
  },
  {
    id: 'adaptive-decision-making',
    name: 'Adaptive Decision Making',
    icon: '⚡',
    color: '#eef0ff',
    textColor: '#3300cc',
    definition: 'The ability to update a plan rapidly in response to new information without losing sight of the original objective. The cognitive skill behind good improvisation.',
    whyItMatters: 'Plans do not survive contact with reality. The goal is not better plans. The goal is faster, more disciplined replanning.',
    games: ['apex', 'civilization'],
    professionalAnalog: 'Crisis management, agile delivery, real-time operations'
  },
  {
    id: 'resource-allocation',
    name: 'Resource Allocation',
    icon: '📊',
    color: '#f0ede8',
    textColor: '#5a3000',
    definition: 'Distributing finite resources across competing demands to maximize a defined objective. The fundamental problem of management.',
    whyItMatters: 'Every organization runs resource allocation continuously and informally. Making it explicit, even mentally, produces measurably better outcomes.',
    games: ['hoi4', 'factorio', 'civilization'],
    professionalAnalog: 'Budget allocation, headcount planning, portfolio management'
  },
  {
    id: 'sequential-decision-making',
    name: 'Sequential Decision Making',
    icon: '🔗',
    color: '#eeedfe',
    textColor: '#6633ff',
    definition: 'Making a series of interdependent decisions over time where each choice constrains or enables future options. The formal domain of dynamic programming and Markov Decision Processes.',
    whyItMatters: 'Most real decisions are sequential, not one-shot. Professionals who treat each decision as independent miss the compounding effects of their choices.',
    games: ['civilization', 'hoi4'],
    professionalAnalog: 'Product roadmap sequencing, negotiation strategy, M&A deal structuring'
  },
  {
    id: 'fast-feedback-loops',
    name: 'Fast Feedback Loops',
    icon: '🔄',
    color: '#e1f5ee',
    textColor: '#007a3d',
    definition: 'Designing and operating within systems that provide rapid, unambiguous feedback on the quality of a decision. The foundation of deliberate practice.',
    whyItMatters: 'Expertise requires feedback. Most professional environments provide feedback too slowly and too ambiguously to build genuine skill. Games compress this cycle.',
    games: ['apex', 'factorio'],
    professionalAnalog: 'Experiment design, A/B testing culture, sprint retrospectives'
  }
];

// ============================================================
// PERSONAS
// ============================================================
const PERSONAS = [
  {
    id: 'optimizer',
    name: 'The Optimizer',
    icon: '⚙️',
    color: '#eeedfe',
    accentColor: '#6633ff',
    tagline: 'Systems, efficiency, resource management under constraint.',
    description: 'You see every process as a system and every inefficiency as a problem to be solved. You are drawn to games that reward understanding how things fit together and how to make them run better.',
    professionalProfile: 'Supply chain, operations, engineering, product management. Anyone whose job involves making a system run better than it does today.',
    games: ['factorio', 'civilization'],
    keySkills: ['Systems Optimization', 'Flow Analysis', 'Resource Allocation', 'Bottleneck Identification']
  },
  {
    id: 'strategist',
    name: 'The Strategist',
    icon: '🗺️',
    color: '#e1f5ee',
    accentColor: '#007a3d',
    tagline: 'Long horizon, multi-variable, cascading consequences.',
    description: 'You think in timeframes others cannot hold. You play games not for the next turn but for the shape of the game 20 turns from now. You are comfortable with ambiguity as long as you have a framework.',
    professionalProfile: 'Strategy, executive leadership, investment, corporate development. Anyone whose job is deciding where to play and how to win.',
    games: ['civilization', 'hoi4', 'apex'],
    keySkills: ['Long-Horizon Planning', 'Sequential Decision Making', 'Risk Quantification', 'Multi-Variable Tradeoffs']
  },
  {
    id: 'adapter',
    name: 'The Adapter',
    icon: '⚡',
    color: '#eef0ff',
    accentColor: '#3300cc',
    tagline: 'Fast feedback loops, rule changes, chaos management.',
    description: 'You thrive when the plan falls apart. You read environments quickly and update faster than others. You prefer games that reward improvisation over preparation.',
    professionalProfile: 'Operations, consulting, startups, crisis response. Anyone whose job requires making good decisions faster than the situation changes.',
    games: ['apex'],
    keySkills: ['Adaptive Decision Making', 'Fast Feedback Loops', 'Probabilistic Risk Assessment', 'Team Coordination']
  },
  {
    id: 'modeler',
    name: 'The Modeler',
    icon: '🔬',
    color: '#faeeda',
    accentColor: '#7a4000',
    tagline: 'Simulation, abstraction, turning data into insight.',
    description: 'You want to understand the rules of the system before you engage with it. You build mental models before taking action. You are drawn to games that reward deep study of mechanics.',
    professionalProfile: 'Data science, operations research, finance, industrial engineering. Anyone whose job involves building models that predict or optimize outcomes.',
    games: ['hoi4', 'factorio'],
    keySkills: ['Systems Optimization', 'Risk Quantification', 'Capacity Planning', 'Sequential Decision Making']
  }
];

// ============================================================
// BLOG POSTS
// ============================================================
const BLOG_POSTS = [
  {
    id: 'ftl',
    title: 'Every run is a different problem. That\'s the point.',
    game: 'FTL: Faster Than Light',
    gameTag: 'FTL',
    icon: '🚀',
    color: '#eeedfe',
    date: '2025-01-15',
    readTime: '6 min',
    excerpt: 'FTL does not reward memorization. It rewards decision architecture under resource scarcity. Why that matters for anyone who has ever made a call with incomplete information.',
    tags: ['Resource Management', 'Uncertainty', 'Roguelikes'],
    status: 'published'
  },
  {
    id: 'signal-state',
    title: 'A puzzle game that teaches systems thinking by stealth',
    game: 'The Signal State',
    gameTag: 'Signal State',
    icon: '🎵',
    color: '#e1f5ee',
    date: '2025-01-28',
    readTime: '5 min',
    excerpt: 'You think you are routing signals. You are actually learning feedback loops, signal processing, and the discipline of building something that cannot break.',
    tags: ['Systems Thinking', 'Puzzles', 'Feedback Loops'],
    status: 'published'
  },
  {
    id: 'door-kickers',
    title: 'Tactical planning in 90-second windows',
    game: 'Door Kickers 2',
    gameTag: 'Door Kickers 2',
    icon: '🪖',
    color: '#f0ede8',
    date: '2025-02-10',
    readTime: '7 min',
    excerpt: 'The game compresses the plan-execute-adapt loop into a format professionals can study. What special operations tactical planning has to do with your next project kickoff.',
    tags: ['Tactical Planning', 'Team Coordination', 'Decision Loops'],
    status: 'published'
  },
  {
    id: 'factorio-essay',
    title: 'Factorio is an Operations Research textbook that is actually fun',
    game: 'Factorio',
    gameTag: 'Factorio',
    icon: '⚙️',
    color: '#eeedfe',
    date: '2025-02-24',
    readTime: '9 min',
    excerpt: 'Every constraint in Factorio is a problem that has a name in the OR literature. Here is a field guide to the discipline hiding inside the factory.',
    tags: ['Operations Research', 'Optimization', 'Deep Dive'],
    status: 'published'
  },
  {
    id: 'apex-decisions',
    title: 'Why I take decision-making advice from a Battle Royale',
    game: 'Apex Legends',
    gameTag: 'Apex Legends',
    icon: '⚡',
    color: '#eef0ff',
    date: '2025-03-05',
    readTime: '5 min',
    excerpt: 'The fastest feedback loop in gaming happens to train the skill most missing in corporate decision-making: the ability to commit without certainty.',
    tags: ['Fast Decisions', 'Competitive Gaming', 'Uncertainty'],
    status: 'published'
  },
  {
    id: 'civ-strategy',
    title: 'Civilization taught me that most strategic plans are wrong. That is fine.',
    game: 'Civilization VI',
    gameTag: 'Civilization VI',
    icon: '🏛️',
    color: '#fff8e8',
    date: '2025-03-12',
    readTime: '8 min',
    excerpt: 'The game that punishes local optimization while rewarding long-horizon sequencing. A meditation on why most corporate strategy fails and what a 4X game reveals about it.',
    tags: ['Long-Horizon Planning', 'Strategy', 'Deep Dive'],
    status: 'draft'
  }
];
