import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export const TopicDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const topicData = {
        dsa: {
            title: "Data Structures & Algorithms",
            subtitle: "Master the Art of Problem Solving",
            description: "Deep dive into the fundamental building blocks of computer science. Learn to think algorithmically and solve complex problems efficiently.",
            icon: "🧮",
            difficultyLevels: [
                {
                    title: "Basic",
                    topics: ["Time & Space Complexity", "Big O Notation", "Basic Math & Logic", "Problem Solving Patterns"],
                    difficulty: "Beginner",
                    icon: "📚"
                },
                {
                    title: "Medium",
                    topics: ["Hash Tables & Maps", "Stack & Queue", "Recursion & Backtracking", "Greedy Algorithms"],
                    difficulty: "Intermediate",
                    icon: "🎯"
                },
                {
                    title: "Advanced",
                    topics: ["Advanced DP Patterns", "Segment Trees", "Trie & Suffix Arrays", "Graph Algorithms"],
                    difficulty: "Expert",
                    icon: "🚀"
                }
            ],
            sections: [
                {
                    title: "Arrays & Strings",
                    topics: ["Two Pointers", "Sliding Window", "Prefix Sum", "String Manipulation"],
                    difficulty: "Beginner to Intermediate"
                },
                {
                    title: "Trees & Graphs",
                    topics: ["Binary Trees", "BST", "Graph Traversal", "Shortest Path Algorithms"],
                    difficulty: "Intermediate to Advanced"
                },
                {
                    title: "Dynamic Programming",
                    topics: ["Memoization", "Tabulation", "Knapsack Problems", "LCS & LIS"],
                    difficulty: "Advanced"
                },
                {
                    title: "Sorting & Searching",
                    topics: ["Quick Sort", "Merge Sort", "Binary Search", "Heap Sort"],
                    difficulty: "Beginner to Intermediate"
                }
            ],
            resources: [
                { name: "LeetCode Practice", type: "Platform" },
                { name: "Introduction to Algorithms (CLRS)", type: "Book" },
                { name: "NeetCode Roadmap", type: "Course" }
            ]
        },
        fullstack: {
            title: "Full Stack Web Development",
            subtitle: "Build Modern Web Applications",
            description: "Master both frontend and backend development to create complete, production-ready web applications from scratch.",
            icon: "🌐",
            sections: [
                {
                    title: "Frontend Development",
                    topics: ["React & Hooks", "State Management", "Responsive Design", "Performance Optimization"],
                    difficulty: "Intermediate"
                },
                {
                    title: "Backend Development",
                    topics: ["Node.js & Express", "RESTful APIs", "Authentication", "Middleware"],
                    difficulty: "Intermediate"
                },
                {
                    title: "Database Design",
                    topics: ["SQL & PostgreSQL", "MongoDB", "Database Modeling", "Query Optimization"],
                    difficulty: "Intermediate to Advanced"
                },
                {
                    title: "Modern Frameworks",
                    topics: ["Next.js", "TypeScript", "GraphQL", "Server Components"],
                    difficulty: "Advanced"
                }
            ],
            resources: [
                { name: "Full Stack Open", type: "Course" },
                { name: "MDN Web Docs", type: "Documentation" },
                { name: "Next.js Documentation", type: "Documentation" }
            ]
        },
        ai: {
            title: "AI Tools & Integration",
            subtitle: "Harness the Power of AI",
            description: "Learn to integrate cutting-edge AI technologies into your applications and build intelligent, AI-powered solutions.",
            icon: "🤖",
            sections: [
                {
                    title: "Large Language Models",
                    topics: ["OpenAI API", "GPT-4 Integration", "Prompt Engineering", "Fine-tuning"],
                    difficulty: "Intermediate"
                },
                {
                    title: "AI Frameworks",
                    topics: ["LangChain", "LlamaIndex", "Semantic Kernel", "AutoGen"],
                    difficulty: "Intermediate to Advanced"
                },
                {
                    title: "Vector Databases",
                    topics: ["Pinecone", "Weaviate", "Embeddings", "Semantic Search"],
                    difficulty: "Intermediate"
                },
                {
                    title: "AI Agents",
                    topics: ["Agent Architecture", "Tool Use", "Memory Systems", "Multi-Agent Systems"],
                    difficulty: "Advanced"
                }
            ],
            resources: [
                { name: "OpenAI Cookbook", type: "Documentation" },
                { name: "LangChain Docs", type: "Documentation" },
                { name: "DeepLearning.AI Courses", type: "Course" }
            ]
        },
        devops: {
            title: "DevOps & Cloud",
            subtitle: "Deploy, Scale, and Monitor",
            description: "Master modern DevOps practices and cloud infrastructure to build, deploy, and maintain scalable applications.",
            icon: "⚙️",
            sections: [
                {
                    title: "Containerization",
                    topics: ["Docker Basics", "Docker Compose", "Container Orchestration", "Best Practices"],
                    difficulty: "Beginner to Intermediate"
                },
                {
                    title: "Kubernetes",
                    topics: ["Pods & Services", "Deployments", "ConfigMaps & Secrets", "Helm Charts"],
                    difficulty: "Advanced"
                },
                {
                    title: "Cloud Platforms",
                    topics: ["AWS Services", "Azure Fundamentals", "GCP Basics", "Serverless"],
                    difficulty: "Intermediate to Advanced"
                },
                {
                    title: "CI/CD & Monitoring",
                    topics: ["GitHub Actions", "Jenkins", "Prometheus", "Grafana"],
                    difficulty: "Intermediate"
                }
            ],
            resources: [
                { name: "Docker Documentation", type: "Documentation" },
                { name: "Kubernetes.io", type: "Documentation" },
                { name: "AWS Training", type: "Course" }
            ]
        }
    };

    const topic = topicData[id];

    if (!topic) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-5xl font-light text-white mb-3">404</h1>
                    <p className="text-neutral-500 mb-8 text-sm">Topic not found</p>
                    <Link to="/code" className="px-6 py-2.5 bg-white text-black text-sm font-medium transition-all duration-300 hover:bg-neutral-200">
                        Back to Topics
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 py-16 px-6">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto mb-12">
                <button
                    onClick={() => navigate('/code')}
                    className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm group"
                >
                    <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back to Topics
                </button>
            </div>

            {/* Hero Section - Minimalist */}
            <div className={`max-w-7xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="border border-white/5 bg-neutral-900/30 p-12">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-5xl opacity-40">{topic.icon}</span>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-light text-white mb-2">
                                {topic.title}
                            </h1>
                            <p className="text-lg text-neutral-500">{topic.subtitle}</p>
                        </div>
                    </div>
                    <p className="text-sm text-neutral-500 max-w-3xl leading-relaxed">
                        {topic.description}
                    </p>
                </div>
            </div>

            {/* Difficulty Levels - Only for DSA - Minimalist */}
            {topic.difficultyLevels && (
                <div className="max-w-7xl mx-auto mb-16">
                    <h2 className="text-2xl font-light text-white mb-8">Difficulty Levels</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* All DSA Problems Card */}
                        <Link
                            to="/code/dsa/all"
                            className="group relative overflow-hidden border border-white/5 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 p-8 transition-all duration-300 hover:border-white/10 cursor-pointer"
                            style={{
                                animation: `fadeInUp 0.6s ease-out backwards`
                            }}
                        >
                            <div className="relative">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-4xl opacity-40">📚</span>
                                    <span className="px-3 py-1 text-xs bg-white/5 text-neutral-500 border border-white/5 uppercase tracking-wider">
                                        All Levels
                                    </span>
                                </div>

                                <h3 className="text-2xl font-light text-white mb-4">
                                    All Problems
                                </h3>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-xs text-neutral-400 bg-white/5 px-3 py-2 border border-white/5 transition-all duration-300 group-hover:bg-white/10 group-hover:text-neutral-300">
                                        <span className="text-xs">✓</span>
                                        <span>All Difficulty Levels</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-neutral-400 bg-white/5 px-3 py-2 border border-white/5 transition-all duration-300 group-hover:bg-white/10 group-hover:text-neutral-300">
                                        <span className="text-xs">✓</span>
                                        <span>Complete Collection</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-neutral-400 bg-white/5 px-3 py-2 border border-white/5 transition-all duration-300 group-hover:bg-white/10 group-hover:text-neutral-300">
                                        <span className="text-xs">✓</span>
                                        <span>Track Progress</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-neutral-500 group-hover:text-white transition-colors pt-4 border-t border-white/5">
                                    <span>Browse All</span>
                                    <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </div>
                            </div>
                        </Link>

                        {/* Existing Difficulty Level Cards */}
                        {topic.difficultyLevels.map((level, index) => (
                            <Link
                                key={index}
                                to={`/code/dsa/${level.title.toLowerCase()}`}
                                className="group relative overflow-hidden border border-white/5 bg-neutral-900/30 p-8 transition-all duration-300 hover:border-white/10 cursor-pointer"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${(index + 1) * 0.1}s backwards`
                                }}
                            >
                                <div className="relative">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-4xl opacity-40">{level.icon}</span>
                                        <span className="px-3 py-1 text-xs bg-white/5 text-neutral-500 border border-white/5 uppercase tracking-wider">
                                            {level.difficulty}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-light text-white mb-4">
                                        {level.title}
                                    </h3>

                                    <div className="space-y-2 mb-6">
                                        {level.topics.map((topic, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 text-xs text-neutral-400 bg-white/5 px-3 py-2 border border-white/5 transition-all duration-300 group-hover:bg-white/10 group-hover:text-neutral-300"
                                            >
                                                <span className="text-xs">✓</span>
                                                <span>{topic}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-neutral-500 group-hover:text-white transition-colors pt-4 border-t border-white/5">
                                        <span>View Problems</span>
                                        <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Learning Sections - Minimalist */}
            <div className="max-w-7xl mx-auto mb-16">
                <h2 className="text-2xl font-light text-white mb-8">Learning Path</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {topic.sections.map((section, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden border border-white/5 bg-neutral-900/30 p-6 transition-all duration-300 hover:border-white/10"
                            style={{
                                animation: `fadeInUp 0.6s ease-out ${index * 0.05}s backwards`
                            }}
                        >
                            <div className="relative">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-lg font-light text-white">{section.title}</h3>
                                    <span className="px-2.5 py-1 text-xs bg-white/5 text-neutral-500 border border-white/5">
                                        {section.difficulty}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {section.topics.map((topic, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2 text-xs text-neutral-400 bg-white/5 px-3 py-2 border border-white/5 transition-all duration-300 hover:bg-white/10 hover:text-neutral-300"
                                        >
                                            <span className="text-xs">✓</span>
                                            <span>{topic}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Resources Section - Minimalist */}
            <div className="max-w-7xl mx-auto mb-16">
                <h2 className="text-2xl font-light text-white mb-8">Recommended Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {topic.resources.map((resource, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden border border-white/5 bg-neutral-900/30 p-6 transition-all duration-300 hover:border-white/10"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="text-base font-light text-white">{resource.name}</h4>
                            </div>
                            <span className="inline-block px-2.5 py-1 text-xs bg-white/5 text-neutral-500 border border-white/5">
                                {resource.type}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section - Minimalist */}
            <div className="max-w-4xl mx-auto mt-20">
                <div className="bg-neutral-900/30 border border-white/5 p-12 text-center">
                    <h3 className="text-2xl font-light text-white mb-3">
                        Ready to Start Learning?
                    </h3>
                    <p className="text-neutral-500 mb-8 text-sm">
                        Begin your journey and master {topic.title.toLowerCase()}
                    </p>
                    <button className="px-6 py-2.5 bg-white text-black text-sm font-medium transition-all duration-300 hover:bg-neutral-200">
                        Start Course
                    </button>
                </div>
            </div>

            {/* CSS Animation */}
            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
};
