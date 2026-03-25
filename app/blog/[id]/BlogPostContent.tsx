"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Facebook, Twitter, Linkedin, Github, Youtube, Menu, X, Moon, Sun, Calendar, Clock, User, Tag, Share2, ArrowLeft, Mail, ChevronRight, BookOpen, Printer } from 'lucide-react';

export default function BlogPostContent({ postId }: { postId: string }) {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Calculate reading progress
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const trackLength = docHeight - winHeight;
      const progress = Math.min(Math.max(window.scrollY / trackLength * 100, 0), 100);
      setReadingProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode, isMounted]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const blogPosts = [
    {
      id: 'future-of-web-development-2025',
      title: "The Future of Web Development in 2025: Trends You Can't Ignore",
      excerpt: "Discover the emerging technologies and frameworks that are reshaping how we build web applications in 2025.",
      content: `
        <h2>The AI-Powered Development Revolution</h2>
        <p>The integration of artificial intelligence into web development workflows is no longer a futuristic concept—it's happening right now. In 2025, we're seeing AI-powered tools that can generate entire codebases from natural language descriptions, automate bug fixing, and even optimize performance based on usage patterns.</p>
        
        <p>Tools like GitHub Copilot X and Amazon CodeWhisperer have evolved beyond simple code completion. They now understand complex business requirements and can generate entire microservices architectures with proper documentation and test suites. This doesn't mean developers are being replaced; rather, they're becoming more efficient, focusing on strategic decisions while AI handles repetitive tasks.</p>
        
        <h2>Serverless Architecture Matures</h2>
        <p>Serverless computing has moved from experimental to essential. With edge computing becoming more powerful, we're seeing the rise of "edge-first" applications that deliver sub-50ms response times globally. Cloud providers have introduced new serverless databases that automatically scale with your application, eliminating the need for manual capacity planning.</p>
        
        <blockquote>
          The combination of serverless functions at the edge with intelligent databases creates applications that are not only scalable but also cost-efficient and lightning-fast.
        </blockquote>
        
        <p>We're particularly excited about WebAssembly (WASM) becoming a first-class citizen in serverless environments. This allows developers to write functions in languages like Rust, Go, or C++ and run them at near-native speeds across the globe.</p>
        
        <h2>The Rise of Micro-Frontends</h2>
        <p>Micro-frontends have emerged as the standard architecture for large-scale applications. This approach allows different teams to work on separate parts of an application independently, using different technologies if needed. The key benefits include:</p>
        
        <ul>
          <li><strong>Independent Deployments:</strong> Teams can ship features without coordinating releases</li>
          <li><strong>Technology Freedom:</strong> Different parts can use React, Vue, Svelte, etc.</li>
          <li><strong>Incremental Upgrades:</strong> Modernize legacy applications piece by piece</li>
          <li><strong>Better Team Autonomy:</strong> Teams own their features end-to-end</li>
        </ul>
        
        <h2>JAMstack Evolution</h2>
        <p>The JAMstack (JavaScript, APIs, and Markup) has evolved into something more powerful: the "Dynamic JAMstack." While the original concept focused on pre-rendered static sites, modern implementations now include:</p>
        
        <div class="code-block">
          // Example of modern JAMstack with dynamic capabilities
          export async function getStaticProps() {
            const res = await fetch('https://api.example.com/data');
            const data = await res.json();
            
            // Incremental Static Regeneration
            return {
              props: { data },
              revalidate: 60 // Regenerate every 60 seconds
            }
          }
        </div>
        
        <p>This approach combines the performance benefits of static sites with the dynamic capabilities of server-side rendering, creating the best of both worlds.</p>
        
        <h2>Web3 and Decentralized Web</h2>
        <p>While still in its early stages for mainstream applications, Web3 technologies are finding practical use cases. Decentralized storage solutions like IPFS are being used for static assets, while smart contracts enable new business models. The key trends include:</p>
        
        <ul>
          <li>Token-gated content and features</li>
          <li>Decentralized identity and authentication</li>
          <li>NFT-based digital ownership</li>
          <li>DAO-governed platforms</li>
        </ul>
        
        <h2>Developer Experience Focus</h2>
        <p>2025 has brought a renewed focus on developer experience (DX). Tools now prioritize:</p>
        
        <ol>
          <li>Zero-configuration setups</li>
          <li>Instant hot reload with state preservation</li>
          <li>Comprehensive type safety across the stack</li>
          <li>Built-in performance monitoring</li>
          <li>Seamless deployment workflows</li>
        </ol>
        
        <h2>Key Takeaways</h2>
        <div class="key-takeaways">
          <p><strong>1. AI is augmenting, not replacing developers</strong> - Focus on learning how to work effectively with AI tools</p>
          <p><strong>2. Edge computing is essential</strong> - Design applications that leverage global edge networks</p>
          <p><strong>3. Micro-frontends enable scale</strong> - Consider this architecture for large teams and complex applications</p>
          <p><strong>4. Security must be built-in</strong> - Adopt DevSecOps practices from day one</p>
        </div>
        
        <p>The future of web development is exciting, with technologies that make us more productive while enabling better user experiences. The key is continuous learning and adaptation to these evolving trends.</p>
      `,
      author: "Clement Obeng",
      authorRole: "Lead Web Developer",
      authorImage: "/images/team/Clement.jpg",
      date: "2025-01-15",
      readTime: "8 min read",
      category: "Web Development",
      tags: ["React", "Next.js", "AI", "Trends", "Serverless", "Web3"],
      image: "/images/blog/web-dev-future.jpg",
      featured: true
    },
    {
      id: 'ui-ux-design-principles-2025',
      title: "10 UI/UX Design Principles Every Designer Should Know",
      excerpt: "Master these fundamental design principles to create intuitive and beautiful user experiences.",
      content: `
        <h2>1. User-Centered Design</h2>
        <p>Always design with the end-user in mind. This means understanding their needs, goals, and pain points through research and testing. User-centered design involves:</p>
        
        <ul>
          <li>Conducting user interviews and surveys</li>
          <li>Creating user personas and journey maps</li>
          <li>Performing usability testing at every stage</li>
          <li>Iterating based on user feedback</li>
        </ul>
        
        <p>Remember: you are not the user. Your personal preferences should never override user needs validated through research.</p>
        
        <h2>2. Consistency is Key</h2>
        <p>Consistency creates familiarity and reduces cognitive load. Users should never have to guess how your interface works. Maintain consistency in:</p>
        
        <blockquote>
          A consistent interface is an invisible interface—users focus on their tasks, not on figuring out how to use your product.
        </blockquote>
        
        <ul>
          <li>Visual elements (colors, typography, spacing)</li>
          <li>Interaction patterns (how buttons behave)</li>
          <li>Terminology (use the same words for the same concepts)</li>
          <li>Workflows (similar tasks should follow similar patterns)</li>
        </ul>
        
        <h2>3. Clear Visual Hierarchy</h2>
        <p>Guide users' attention through deliberate visual hierarchy. Users should immediately understand what's most important on each screen. Achieve this through:</p>
        
        <div class="code-block">
          /* CSS example for visual hierarchy */
          .primary-action {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--primary-color);
            padding: 1rem 2rem;
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          
          .secondary-action {
            font-size: 1rem;
            font-weight: 500;
            color: var(--secondary-color);
            padding: 0.75rem 1.5rem;
            background: transparent;
            border: 2px solid var(--border-color);
          }
        </div>
        
        <h2>4. Provide Immediate Feedback</h2>
        <p>Every user action should have an immediate and appropriate response. This includes:</p>
        
        <ol>
          <li>Button states (normal, hover, active, disabled)</li>
          <li>Loading indicators for asynchronous operations</li>
          <li>Success/error messages for form submissions</li>
          <li>Visual feedback for drag-and-drop interactions</li>
          <li>Haptic feedback on mobile devices</li>
        </ol>
        
        <h2>5. Accessibility First</h2>
        <p>Design for everyone, regardless of ability. Accessibility isn't just a legal requirement—it's a moral imperative and good business. Follow WCAG 2.1 guidelines:</p>
        
        <ul>
          <li><strong>Perceivable:</strong> Provide text alternatives, captions, and sufficient color contrast</li>
          <li><strong>Operable:</strong> Ensure keyboard navigation and sufficient time for tasks</li>
          <li><strong>Understandable:</strong> Make content readable and predictable</li>
          <li><strong>Robust:</strong> Maximize compatibility with current and future tools</li>
        </ul>
        
        <h2>6. Mobile-First Approach</h2>
        <p>With over 60% of web traffic coming from mobile devices, designing mobile-first is no longer optional. Benefits include:</p>
        
        <ul>
          <li>Focus on essential content and features</li>
          <li>Better performance on all devices</li>
          <li>Progressive enhancement for larger screens</li>
          <li>Improved SEO (Google uses mobile-first indexing)</li>
        </ul>
        
        <h2>7. The Power of Whitespace</h2>
        <p>Whitespace (negative space) isn't wasted space—it's a powerful design tool that:</p>
        
        <ul>
          <li>Improves readability by 20% when used properly</li>
          <li>Creates visual separation between elements</li>
          <li>Highlights important content</li>
          <li>Creates a feeling of elegance and sophistication</li>
        </ul>
        
        <h2>8. Typography that Communicates</h2>
        <p>Choose fonts that support your content's purpose and tone. Typography principles include:</p>
        
        <ol>
          <li>Establish a clear typographic scale (h1-h6, body, caption)</li>
          <li>Maintain optimal line length (50-75 characters)</li>
          <li>Use appropriate line height (1.5-1.75 for body text)</li>
          <li>Ensure sufficient font size (16px minimum for body text)</li>
          <li>Limit font families (2-3 maximum per project)</li>
        </ol>
        
        <h2>9. Color Psychology</h2>
        <p>Colors evoke emotions and influence behavior. Understand what different colors communicate:</p>
        
        <div class="color-grid">
          <div><span class="color-box blue"></span><strong>Blue:</strong> Trust, security, professionalism</div>
          <div><span class="color-box green"></span><strong>Green:</strong> Growth, success, environmental</div>
          <div><span class="color-box red"></span><strong>Red:</strong> Urgency, excitement, danger</div>
          <div><span class="color-box yellow"></span><strong>Yellow:</strong> Optimism, clarity, warmth</div>
          <div><span class="color-box purple"></span><strong>Purple:</strong> Creativity, luxury, wisdom</div>
        </div>
        
        <h2>10. Continuous Usability Testing</h2>
        <p>Design is never "done." Regular usability testing helps you:</p>
        
        <ul>
          <li>Identify pain points before they affect many users</li>
          <li>Validate design decisions with real users</li>
          <li>Discover new opportunities for improvement</li>
          <li>Stay aligned with changing user needs</li>
        </ul>
        
        <div class="key-takeaways">
          <p><strong>Remember:</strong> Great design is invisible. Users shouldn't notice the design—they should notice how easily they accomplish their goals.</p>
        </div>
      `,
      author: "Emmanuel Kofi Frimpong",
      authorRole: "Lead Designer",
      authorImage: "/images/team/Emmanuel.jpg",
      date: "2025-01-10",
      readTime: "6 min read",
      category: "Design",
      tags: ["UI/UX", "Design", "Best Practices", "Accessibility"],
      image: "/images/blog/design-principles.jpg",
      featured: false
    },
    {
      id: 'data-analytics-business-growth',
      title: "How Data Analytics Can Transform Your Business Growth",
      excerpt: "Learn how to leverage data analytics to make informed decisions and drive business success.",
      content: `
        <h2>The Data-Driven Revolution</h2>
        <p>In today's competitive landscape, intuition alone is no longer sufficient for business success. Companies that leverage data analytics grow 30% faster than their competitors and are 23 times more likely to acquire customers. But what exactly is data analytics, and how can it transform your business?</p>
        
        <h2>Understanding Your Customers</h2>
        <p>Data analytics provides deep insights into customer behavior, preferences, and pain points. By analyzing customer data, you can:</p>
        
        <ul>
          <li><strong>Identify high-value customer segments:</strong> Focus your marketing efforts on the most profitable customers</li>
          <li><strong>Predict churn:</strong> Identify at-risk customers before they leave</li>
          <li><strong>Personalize experiences:</strong> Deliver tailored content and offers</li>
          <li><strong>Optimize customer journeys:</strong> Remove friction points in the user experience</li>
        </ul>
        
        <blockquote>
          Companies that use customer analytics extensively are 2.6 times more likely to outperform their competitors in sales growth and 3.2 times more likely to outperform in sales profitability.
        </blockquote>
        
        <h2>Making Informed Decisions</h2>
        <p>Gut feelings can be wrong, but data doesn't lie. Data-driven decision making involves:</p>
        
        <ol>
          <li><strong>Collecting relevant data:</strong> From website analytics, CRM systems, sales data, social media, etc.</li>
          <li><strong>Cleaning and preparing data:</strong> Ensuring data quality and consistency</li>
          <li><strong>Analyzing patterns:</strong> Using statistical methods and machine learning</li>
          <li><strong>Visualizing insights:</strong> Creating dashboards that stakeholders can understand</li>
          <li><strong>Taking action:</strong> Implementing data-backed strategies</li>
        </ol>
        
        <h2>Key Performance Indicators (KPIs)</h2>
        <p>Not all metrics are created equal. Focus on KPIs that directly impact business outcomes:</p>
        
        <div class="code-block">
          // Example KPI dashboard structure
          {
            "financial": {
              "monthly_recurring_revenue": "$125,000",
              "customer_acquisition_cost": "$350",
              "lifetime_value": "$2,800",
              "gross_margin": "72%"
            },
            "customer": {
              "net_promoter_score": "68",
              "customer_satisfaction": "94%",
              "churn_rate": "2.1%",
              "activation_rate": "85%"
            },
            "operational": {
              "website_conversion_rate": "4.3%",
              "average_response_time": "2.4h",
              "feature_adoption": "78%",
              "bug_resolution_time": "6.8h"
            }
          }
        </div>
        
        <h2>Predictive Analytics</h2>
        <p>Move from reactive to proactive with predictive analytics. By analyzing historical data, you can:</p>
        
        <ul>
          <li><strong>Forecast demand:</strong> Optimize inventory and resource allocation</li>
          <li><strong>Predict market trends:</strong> Stay ahead of industry shifts</li>
          <li><strong>Identify growth opportunities:</strong> Discover untapped market segments</li>
          <li><strong>Mitigate risks:</strong> Identify potential problems before they occur</li>
        </ul>
        
        <h2>Tools for Success</h2>
        <p>The right tools make data analytics accessible to everyone in your organization:</p>
        
        <ul>
          <li><strong>Power BI:</strong> Microsoft's powerful visualization tool</li>
          <li><strong>Tableau:</strong> Industry leader in data visualization</li>
          <li><strong>Google Analytics:</strong> Essential for web analytics</li>
          <li><strong>Python/R:</strong> For advanced statistical analysis</li>
          <li><strong>SQL:</strong> For database querying and manipulation</li>
        </ul>
        
        <h2>Case Study: E-commerce Transformation</h2>
        <p>Consider an e-commerce company that implemented data analytics:</p>
        
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Before Analytics</th>
              <th>After Analytics</th>
              <th>Improvement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Conversion Rate</td>
              <td>1.8%</td>
              <td>4.2%</td>
              <td>+133%</td>
            </tr>
            <tr>
              <td>Average Order Value</td>
              <td>$45</td>
              <td>$68</td>
              <td>+51%</td>
            </tr>
            <tr>
              <td>Customer Retention</td>
              <td>28%</td>
              <td>52%</td>
              <td>+86%</td>
            </tr>
            <tr>
              <td>Marketing ROI</td>
              <td>2.1x</td>
              <td>4.8x</td>
              <td>+129%</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Getting Started</h2>
        <p>Don't try to boil the ocean. Start small with these steps:</p>
        
        <ol>
          <li><strong>Define clear business questions</strong> you want to answer</li>
          <li><strong>Identify available data sources</strong> and ensure data quality</li>
          <li><strong>Start with descriptive analytics</strong> (what happened?)</li>
          <li><strong>Move to diagnostic analytics</strong> (why did it happen?)</li>
          <li><strong>Progress to predictive analytics</strong> (what will happen?)</li>
          <li><strong>Aim for prescriptive analytics</strong> (what should we do?)</li>
        </ol>
        
        <h2>Measuring ROI</h2>
        <p>To justify analytics investment, track these metrics:</p>
        
        <div class="key-takeaways">
          <p><strong>1. Revenue impact:</strong> Increased sales from data-driven campaigns</p>
          <p><strong>2. Cost savings:</strong> Reduced waste and optimized operations</p>
          <p><strong>3. Customer satisfaction:</strong> Improved NPS and retention rates</p>
          <p><strong>4. Time savings:</strong> Automated reporting and insights</p>
          <p><strong>5. Competitive advantage:</strong> Faster, better decisions than competitors</p>
        </div>
        
        <p>Remember: data analytics isn't just about technology—it's about creating a data-driven culture where decisions are based on evidence rather than opinion.</p>
      `,
      author: "Francis Agyei Mensah",
      authorRole: "Data Analyst",
      authorImage: "/images/team/Francis.jpg",
      date: "2025-01-05",
      readTime: "7 min read",
      category: "Data Analytics",
      tags: ["Analytics", "Business", "Growth", "Data", "KPIs"],
      image: "/images/blog/data-analytics.jpg",
      featured: false
    },
    {
      id: 'react-vs-vue-2025',
      title: "React vs Vue in 2025: Which Framework Should You Choose?",
      excerpt: "An unbiased comparison of React and Vue to help you make the right choice for your next project.",
      content: `
        <h2>The Great JavaScript Framework Debate</h2>
        <p>Choosing between React and Vue is one of the most common dilemmas for frontend developers in 2025. Both frameworks have evolved significantly, and the choice depends on your specific needs, team expertise, and project requirements.</p>
        
        <h2>Performance Comparison</h2>
        <p>Both frameworks offer excellent performance, but they achieve it differently:</p>
        
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>React 19</th>
              <th>Vue 3</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bundle Size (min+gzip)</td>
              <td>~42KB</td>
              <td>~33KB</td>
              <td>Vue</td>
            </tr>
            <tr>
              <td>First Contentful Paint</td>
              <td>1.2s</td>
              <td>1.1s</td>
              <td>Vue</td>
            </tr>
            <tr>
              <td>Time to Interactive</td>
              <td>2.3s</td>
              <td>2.1s</td>
              <td>Vue</td>
            </tr>
            <tr>
              <td>Memory Usage</td>
              <td>85MB</td>
              <td>78MB</td>
              <td>Vue</td>
            </tr>
            <tr>
              <td>Developer Experience</td>
              <td>Excellent</td>
              <td>Excellent</td>
              <td>Tie</td>
            </tr>
          </tbody>
        </table>
        
        <blockquote>
          Performance differences are minimal for most applications. The real decision factors are ecosystem, team experience, and specific use cases.
        </blockquote>
        
        <h2>Learning Curve</h2>
        <p>Vue is generally considered more beginner-friendly, while React has a steeper learning curve but offers more flexibility:</p>
        
        <ul>
          <li><strong>Vue's advantages:</strong>
            <ul>
              <li>Single-file components keep HTML, CSS, and JS together</li>
              <li>Simpler reactivity system (no useState/useEffect hooks)</li>
              <li>Excellent official documentation</li>
              <li>Built-in solutions for common problems</li>
            </ul>
          </li>
          <li><strong>React's advantages:</strong>
            <ul>
              <li>Teaches fundamental JavaScript concepts</li>
              <li>Transferable skills to other frameworks</li>
              <li>Huge ecosystem of learning resources</li>
              <li>Better prepares developers for complex state management</li>
            </ul>
          </li>
        </ul>
        
        <h2>Ecosystem and Community</h2>
        <p>React dominates in terms of ecosystem size and job opportunities:</p>
        
        <div class="code-block">
          // React ecosystem example
          const ReactEcosystem = {
            stateManagement: ['Redux', 'MobX', 'Recoil', 'Zustand'],
            routing: ['React Router', 'Next.js Router'],
            uiLibraries: ['Material-UI', 'Ant Design', 'Chakra UI'],
            ssrFrameworks: ['Next.js', 'Remix', 'Gatsby'],
            testing: ['Jest', 'React Testing Library', 'Cypress']
          };
          
          // Vue ecosystem example  
          const VueEcosystem = {
            stateManagement: ['Pinia', 'Vuex'],
            routing: ['Vue Router'],
            uiLibraries: ['Vuetify', 'Quasar', 'Element Plus'],
            ssrFrameworks: ['Nuxt.js'],
            testing: ['Vitest', 'Vue Test Utils', 'Cypress']
          };
        </div>
        
        <h2>When to Choose React</h2>
        <p>React is the better choice when:</p>
        
        <ol>
          <li><strong>You need maximum flexibility:</strong> React is more of a library than a framework</li>
          <li><strong>Building large-scale applications:</strong> Better tooling for enterprise apps</li>
          <li><strong>Team already knows React:</strong> Switching costs can be high</li>
          <li><strong>You need specific React libraries:</strong> Some solutions only exist in React ecosystem</li>
          <li><strong>You want Next.js:</strong> The best full-stack React framework</li>
          <li><strong>Job market considerations:</strong> More React jobs available</li>
        </ol>
        
        <h2>When to Choose Vue</h2>
        <p>Vue shines in these scenarios:</p>
        
        <ol>
          <li><strong>Small to medium-sized projects:</strong> Vue's conventions reduce decision fatigue</li>
          <li><strong>Developer happiness:</strong> Vue is consistently rated higher for developer satisfaction</li>
          <li><strong>Progressive enhancement:</strong> Easily add Vue to existing projects</li>
          <li><strong>Rapid prototyping:</strong> Vue CLI makes starting projects quick and easy</li>
          <li><strong>Better TypeScript support:</strong> Vue 3 has excellent TypeScript integration</li>
          <li><strong>Chinese market:</strong> Vue is extremely popular in China</li>
        </ol>
        
        <h2>Migration Considerations</h2>
        <p>If you're considering migrating between frameworks:</p>
        
        <ul>
          <li><strong>React to Vue:</strong> Generally easier due to Vue's flexible nature</li>
          <li><strong>Vue to React:</strong> More challenging due to React's different mental model</li>
          <li><strong>Migration tools:</strong> Both communities have created migration helpers</li>
          <li><strong>Incremental migration:</strong> Both support gradual adoption alongside existing code</li>
        </ul>
        
        <h2>Real-World Performance</h2>
        <p>For most applications, the performance difference is negligible. The 80/20 rule applies here—80% of your performance improvements will come from:</p>
        
        <ul>
          <li>Proper code splitting and lazy loading</li>
          <li>Optimized images and assets</li>
          <li>Efficient API calls and caching</li>
          <li>Server-side rendering when appropriate</li>
          <li>Minimal JavaScript execution on the main thread</li>
        </ul>
        
        <h2>The Verdict</h2>
        <div class="key-takeaways">
          <p><strong>Choose React if:</strong> You value flexibility, have a large team, need specific React-only libraries, or are building a complex enterprise application.</p>
          <p><strong>Choose Vue if:</strong> You want better developer experience, faster development cycles, simpler learning curve, or are building smaller to medium applications.</p>
          <p><strong>You can't go wrong with either:</strong> Both are excellent choices that will serve you well in 2025 and beyond.</p>
        </div>
        
        <p>The best framework is the one your team can use most effectively to deliver value to users. Consider running a small proof-of-concept with both frameworks before making your final decision.</p>
      `,
      author: "Gerald Boakye",
      authorRole: "Web Developer",
      authorImage: "/images/team/Gerald.jpg",
      date: "2024-12-28",
      readTime: "10 min read",
      category: "Web Development",
      tags: ["React", "Vue", "JavaScript", "Frameworks", "Comparison"],
      image: "/images/blog/react-vs-vue.jpg",
      featured: true
    },
    {
      id: 'mobile-app-development-trends',
      title: "Mobile App Development Trends Dominating 2025",
      excerpt: "Stay ahead of the curve with these mobile development trends shaping the industry.",
      content: `
        <h2>Cross-Platform Development Matures</h2>
        <p>2025 has solidified cross-platform development as the standard for most mobile applications. Flutter and React Native have both matured significantly, offering near-native performance with 80-90% code reuse across platforms.</p>
        
        <p>Flutter 3.5 introduced groundbreaking improvements in performance and web support, while React Native's New Architecture (Fabric) has finally delivered on its promise of better performance and smoother animations. The choice between them now comes down to:</p>
        
        <ul>
          <li><strong>Choose Flutter if:</strong> You prioritize beautiful UI out of the box, need iOS/Android/Web from one codebase, or work with designers who love Material Design</li>
          <li><strong>Choose React Native if:</strong> Your team already knows React/JavaScript, you need access to more native modules, or you're integrating with existing React web apps</li>
        </ul>
        
        <h2>5G-Enabled Applications</h2>
        <p>The global rollout of 5G networks is enabling entirely new types of mobile applications. With 10-100x faster speeds and 10x lower latency than 4G, developers can now build:</p>
        
        <ul>
          <li><strong>Cloud Gaming on Mobile:</strong> Stream AAA games directly to phones with no downloads</li>
          <li><strong>Real-Time AR/VR:</strong> Immersive experiences with instant data streaming</li>
          <li><strong>Live 8K Video Streaming:</strong> Ultra-high-definition video calls and broadcasts</li>
          <li><strong>IoT Device Networks:</strong> Thousands of connected devices with real-time data sync</li>
        </ul>
        
        <blockquote>
          5G isn't just about faster internet—it's about enabling fundamentally new application architectures that were previously impossible.
        </blockquote>
        
        <h2>AI-Powered Mobile Experiences</h2>
        <p>On-device AI processing is transforming mobile apps from reactive tools to proactive assistants:</p>
        
        <div class="code-block">
          // Example: On-device image recognition with TensorFlow Lite
          const recognizeImage = async (imageUri) => {
            const model = await tf.loadGraphModel('model.json');
            const image = await loadImage(imageUri);
            const tensor = preprocessImage(image);
            const predictions = await model.predict(tensor);
            return processPredictions(predictions);
          };
          
          // Benefits:
          // - Works offline
          // - No privacy concerns (data stays on device)
          // - Instant results (no network latency)
          // - Reduced server costs
        </div>
        
        <h2>Super Apps and Mini Programs</h2>
        <p>Following WeChat's success in China, super apps are becoming popular globally. These are single apps that contain multiple "mini programs" or services:</p>
        
        <table>
          <thead>
            <tr>
              <th>Super App</th>
              <th>Mini Programs</th>
              <th>Monthly Active Users</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>WeChat</td>
              <td>3.5+ million</td>
              <td>1.3 billion</td>
            </tr>
            <tr>
              <td>AliPay</td>
              <td>2+ million</td>
              <td>1.2 billion</td>
            </tr>
            <tr>
              <td>Grab</td>
              <td>500+</td>
              <td>180 million</td>
            </tr>
            <tr>
              <td>Gojek</td>
              <td>200+</td>
              <td>170 million</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Foldable and Flexible Displays</h2>
        <p>With Samsung's Galaxy Z Fold and Flip series gaining popularity, developers must now design for multiple form factors:</p>
        
        <ul>
          <li><strong>Adaptive Layouts:</strong> Design interfaces that transform between phone and tablet modes</li>
          <li><strong>Multi-Window Support:</strong> Enable true multitasking with multiple app instances</li>
          <li><strong>Hinge-Aware Design:</strong> Account for the physical fold in UI elements</li>
          <li><strong>Persistent State:</strong> Maintain app state during folding/unfolding transitions</li>
        </ul>
        
        <h2>Privacy-First Development</h2>
        <p>Apple's App Tracking Transparency and Google's Privacy Sandbox have changed mobile development forever. Successful apps now:</p>
        
        <ol>
          <li>Request minimal permissions with clear explanations</li>
          <li>Implement on-device data processing when possible</li>
          <li>Offer value before asking for personal data</li>
          <li>Provide transparency about data collection and use</li>
          <li>Include easy-to-use privacy controls</li>
        </ol>
        
        <h2>Low-Code/No-Code Platforms</h2>
        <p>Tools like FlutterFlow, Adalo, and Bubble are enabling non-developers to create functional mobile apps:</p>
        
        <div class="key-takeaways">
          <p><strong>Impact:</strong> Professional developers are shifting from building basic apps to:</p>
          <p>1. Creating complex backend systems and APIs</p>
          <p>2. Building reusable components for low-code platforms</p>
          <p>3. Optimizing performance and security</p>
          <p>4. Integrating AI and advanced features</p>
        </div>
        
        <h2>Instant Apps and App Clips</h2>
        <p>Google's Instant Apps and Apple's App Clips allow users to experience apps without installation:</p>
        
        <ul>
          <li><strong>Use Cases:</strong> Parking apps, food ordering, event registration, product demos</li>
          <li><strong>Benefits:</strong> Zero storage usage, instant access, reduced friction</li>
          <li><strong>Technical:</strong> 10MB size limit, focused functionality, deep linking support</li>
        </ul>
        
        <h2>Monetization Evolution</h2>
        <p>Traditional app stores are being disrupted by new monetization models:</p>
        
        <ul>
          <li><strong>Subscription Fatigue:</strong> Users are resisting endless monthly fees</li>
          <li><strong>Rise of Pay-Per-Use:</strong> Pay only for what you actually use</li>
          <li><strong>Web3 Integration:</strong> Token-based rewards and ownership</li>
          <li><strong>Bundled Services:</strong> Apps as part of larger service ecosystems</li>
        </ul>
        
        <h2>Looking Ahead</h2>
        <p>The mobile landscape in 2025 is about <strong>smarter, faster, and more integrated</strong> experiences. Key skills for developers include:</p>
        
        <ol>
          <li>Cross-platform development expertise</li>
          <li>AI/ML integration capabilities</li>
          <li>5G-optimized architecture design</li>
          <li>Privacy and security best practices</li>
          <li>Adaptive UI/UX for diverse form factors</li>
        </ol>
        
        <p>The most successful apps will be those that leverage these trends to create seamless, valuable experiences that respect users' time and privacy.</p>
      `,
      author: "Clement Obeng",
      authorRole: "Lead Web Developer",
      authorImage: "/images/team/Clement.jpg",
      date: "2024-12-20",
      readTime: "9 min read",
      category: "Mobile Development",
      tags: ["Mobile", "Flutter", "React Native", "5G", "AI", "Trends"],
      image: "/images/blog/mobile-trends.jpg",
      featured: true
    }
  ];

  const post = blogPosts.find(p => p.id === postId);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog Post Not Found</h1>
          <Link href="/blog" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.id !== postId && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag)))).slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-900 dark:text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden transition-colors duration-300">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Header */}
        <header 
          className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm z-50 transition-all duration-300" 
          style={{ 
            transform: scrollY > 50 ? 'translateY(0)' : 'translateY(0)', 
            boxShadow: scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)',
            borderRadius: scrollY > 50 ? '0 0 24px 24px' : '0'
          }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 cursor-pointer transform hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="/images/logo/favicon.png" 
                    alt="KamarTec Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>                
                <div className="hidden sm:block">
                  <div className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">KamarTec</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 tracking-wider">SOLUTIONS</div>
                </div>
              </Link>

              {/* Desktop Search */}
              <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
                <div className="relative flex-1 group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors duration-300" size={18} />
                  <input
                    type="text"
                    placeholder="Looking for something?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                <Link href="/" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Home</Link>
                <Link href="/about" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">About</Link>
                <Link href="/services" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Services</Link>
                <Link href="/projects" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Projects</Link>
                <Link href="/team" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Team</Link>
                <Link href="/blog" className="text-sm lg:text-base text-red-500 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500">Blog</Link>
                <Link href="/contact" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Contact</Link>
              </nav>

              {/* Dark Mode Toggle & Mobile Menu */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-700" />}
                </button>
                
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X size={24} className="text-gray-700 dark:text-gray-300" /> : <Menu size={24} className="text-gray-700 dark:text-gray-300" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="py-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <Link href="/" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Home</Link>
                <Link href="/about" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">About</Link>
                <Link href="/services" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Services</Link>
                <Link href="/projects" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Projects</Link>
                <Link href="/team" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Team</Link>
                <Link href="/blog" className="block py-2 text-red-500 font-medium">Blog</Link>
                <Link href="/contact" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Contact</Link>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb & Back Button */}
        <div className="pt-24 pb-8 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Home</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white font-medium">{post.title}</span>
              </div>
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-all hover:gap-3"
              >
                <ArrowLeft size={20} />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pb-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {post.title}
                </h1>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  {post.excerpt}
                </p>
              </div>

              {/* Author & Metadata */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/20 pt-8">
                <div className="flex items-center gap-4">
                  <img 
                    src={post.authorImage} 
                    alt={post.author}
                    className="w-14 h-14 rounded-full border-2 border-white"
                  />
                  <div>
                    <h3 className="font-bold text-white">{post.author}</h3>
                    <p className="text-white/80 text-sm">{post.authorRole}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{post.author.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Tag className="text-gray-600 dark:text-gray-400" size={20} />
                    <h3 className="font-bold text-gray-900 dark:text-white">Tags</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-6">
                    <Share2 className="text-gray-600 dark:text-gray-400" size={20} />
                    <h3 className="font-bold text-gray-900 dark:text-white">Share this article</h3>
                  </div>
                  <div className="flex gap-3">
                    <button className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-110">
                      <Facebook className="text-blue-600 dark:text-blue-400" size={20} />
                    </button>
                    <button className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-110">
                      <Twitter className="text-blue-400 dark:text-blue-300" size={20} />
                    </button>
                    <button className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-110">
                      <Linkedin className="text-blue-700 dark:text-blue-500" size={20} />
                    </button>
                    <button className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-110">
                      <Printer className="text-gray-600 dark:text-gray-400" size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Author Bio */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={post.authorImage} 
                      alt={post.author}
                      className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-700"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{post.author}</h3>
                      <p className="text-purple-600 dark:text-purple-400 text-sm">{post.authorRole}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {post.author} is a {post.authorRole.toLowerCase()} at KamarTec with extensive experience in {post.category.toLowerCase()}. They regularly share insights and best practices through our blog.
                  </p>
                </div>

                {/* Related Articles */}
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-6">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link 
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.id}`}
                        className="group block p-4 rounded-xl hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 mb-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar size={12} />
                          <span>{formatDate(relatedPost.date)}</span>
                          <span>•</span>
                          <Clock size={12} />
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-6">
                  <BookOpen className="text-purple-600 dark:text-purple-400 mb-4" size={24} />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Stay Updated</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                    Get the latest articles and insights delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 sm:py-32 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 dark:from-purple-800 dark:via-blue-800 dark:to-pink-800 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Want More Insights Like This?
            </h2>
            <p className="text-white text-lg sm:text-xl mb-8">
              Subscribe to our newsletter and never miss an update on the latest trends and technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:shadow-2xl hover:scale-110 transition-all duration-300"
              >
                Explore More Articles
                <ChevronRight size={20} />
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 hover:shadow-2xl hover:scale-110 transition-all duration-300"
              >
                Work With Us
                <Mail size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 py-16 sm:py-20 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
              {/* Company Info */}
              <div>
                <div className="mb-6">
                  <img 
                    src="/images/logo/logo.png" 
                    alt="KamarTec Solutions" 
                    className="h-40 w-auto"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                  Making the world a better place through constructing elegant hierarchies. Not just about providing service to humanity 
                  but also making impact on the society at large.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="bg-pink-100 dark:bg-pink-900 p-3 rounded-full hover:bg-pink-200 dark:hover:bg-pink-800 hover:scale-110 transition-all">
                    <Facebook size={18} className="text-pink-600 dark:text-pink-400" />
                  </a>
                  <a href="#" className="bg-pink-100 dark:bg-pink-900 p-3 rounded-full hover:bg-pink-200 dark:hover:bg-pink-800 hover:scale-110 transition-all">
                    <Twitter size={18} className="text-pink-600 dark:text-pink-400" />
                  </a>
                  <a href="#" className="bg-pink-100 dark:bg-pink-900 p-3 rounded-full hover:bg-pink-200 dark:hover:bg-pink-800 hover:scale-110 transition-all">
                    <Linkedin size={18} className="text-pink-600 dark:text-pink-400" />
                  </a>
                  <a href="#" className="bg-pink-100 dark:bg-pink-900 p-3 rounded-full hover:bg-pink-200 dark:hover:bg-pink-800 hover:scale-110 transition-all">
                    <Github size={18} className="text-pink-600 dark:text-pink-400" />
                  </a>
                  <a href="#" className="bg-pink-100 dark:bg-pink-900 p-3 rounded-full hover:bg-pink-200 dark:hover:bg-pink-800 hover:scale-110 transition-all">
                    <Youtube size={18} className="text-pink-600 dark:text-pink-400" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">Quick Links</h3>
                <ul className="space-y-4">
                  <li><Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Home</Link></li>
                  <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">About</Link></li>
                  <li><Link href="/team" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Team</Link></li>
                  <li><Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Projects</Link></li>
                  <li><Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Blog</Link></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">Contact Us</h3>
                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                  <p className="leading-relaxed">Address: P.O Box 123 Kwapro,<br />University of Cape Coast.</p>
                  <p className="leading-relaxed">Phone: +233 (0) 592852555<br />+233 (0) 538118529</p>
                  <p>Email: kamartecsolutions@gmail.com</p>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">Newsletter</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                  Subscribe to our newsletter and stay up to date with all events coming straight in your mailbox:
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email here"
                    className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                  <button className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 hover:scale-110 transition-all shadow-lg">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                © 2025 KamarTec Solutions. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .prose {
            color: #374151;
          }
          .prose h2 {
            color: #111827;
            font-size: 1.875rem;
            font-weight: 700;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
          }
          .prose p {
            margin-top: 1rem;
            margin-bottom: 1rem;
            line-height: 1.75;
          }
          .prose ul, .prose ol {
            margin-top: 1rem;
            margin-bottom: 1rem;
            padding-left: 1.5rem;
          }
          .prose li {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .prose blockquote {
            border-left: 4px solid #8b5cf6;
            padding-left: 1.5rem;
            font-style: italic;
            color: #6b7280;
            margin: 2rem 0;
          }
          .prose .code-block {
            background: #1f2937;
            color: #f3f4f6;
            padding: 1.5rem;
            border-radius: 0.75rem;
            font-family: monospace;
            overflow-x: auto;
            margin: 1.5rem 0;
          }
          .prose table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
          }
          .prose th {
            background: #f3f4f6;
            color: #111827;
            font-weight: 600;
            text-align: left;
            padding: 0.75rem;
            border: 1px solid #e5e7eb;
          }
          .prose td {
            padding: 0.75rem;
            border: 1px solid #e5e7eb;
          }
          .prose .key-takeaways {
            background: #f5f3ff;
            border-left: 4px solid #8b5cf6;
            padding: 1.5rem;
            border-radius: 0.5rem;
            margin: 1.5rem 0;
          }
          .dark .prose {
            color: #d1d5db;
          }
          .dark .prose h2 {
            color: #f9fafb;
          }
          .dark .prose blockquote {
            color: #9ca3af;
          }
          .dark .prose .code-block {
            background: #111827;
            color: #e5e7eb;
          }
          .dark .prose th {
            background: #374151;
            color: #f9fafb;
            border-color: #4b5563;
          }
          .dark .prose td {
            border-color: #4b5563;
          }
          .dark .prose .key-takeaways {
            background: #1f2937;
          }
        `}</style>
      </div>
    </div>
  );
}