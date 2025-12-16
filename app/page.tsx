"use client";

import { useState, useEffect } from "react";
import {
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll to top button when scrolled down
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Update active section based on scroll position
      const sections = [
        "home",
        "about",
        "experience",
        "projects",
        "education",
        "contact",
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-slate-900 text-foreground dark:text-slate-100 transition-colors duration-200">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-slate-800/80 backdrop-blur-sm border-b dark:border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center h-10">
              <img
                src="/LOGO.png"
                alt="Nestor Garcia Logo"
                className="h-20 w-auto object-contain"
              />
            </div>
            <div className="hidden md:flex space-x-6">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "experience", label: "Experience" },
                { id: "projects", label: "Projects" },
                { id: "education", label: "Education" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-base font-medium hover:text-primary transition-colors ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-muted-foreground dark:text-slate-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground dark:text-slate-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                Menu
              </Button>
            </div>
          </nav>
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 flex justify-center p-4 z-50">
              <div className="bg-background dark:bg-slate-800 border dark:border-slate-700 rounded-lg shadow-lg w-[90%] max-w-sm animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex flex-col p-4 space-y-4">
                  {[
                    { id: "home", label: "Home" },
                    { id: "about", label: "About" },
                    { id: "projects", label: "Projects" },
                    { id: "experience", label: "Experience" },
                    { id: "education", label: "Education" },
                    { id: "contact", label: "Contact" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollToSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-3 rounded-md text-left text-base font-medium hover:bg-muted dark:hover:bg-slate-700 transition-colors ${
                        activeSection === item.id
                          ? "text-primary bg-primary/10 dark:bg-primary/20"
                          : "text-muted-foreground dark:text-slate-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Home/Intro Section */}
        <section
          id="home"
          className="min-h-[calc(100vh-6rem)] flex flex-col justify-center py-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 dark:text-white">
                Hi, I'm <span className="text-primary">Nestor Garcia</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground dark:text-slate-200 mb-6">
                Software Engineer
              </h2>
              <p className="text-muted-foreground dark:text-slate-300 max-w-md mb-8">
                I enjoy building reliable,
                production grade products that make people's work faster and
                decisions smarter.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/assets/NestorGarciaCV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Button
                    variant="outline"
                    className="dark:text-white dark:border-slate-600 dark:hover:bg-slate-800"
                  >
                    Download CV
                  </Button>
                </Link>
                <Button onClick={() => scrollToSection("projects")}>
                  View My Work
                </Button>
              </div>
              <div className="flex space-x-4 mt-8">
                <Link
                  href="https://github.com/Nesgc/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="dark:text-white dark:hover:text-white"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/nestorofirgarcia/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="dark:text-white dark:hover:text-white"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="mailto:nestorofgarcia@gmail.com">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="dark:text-white dark:hover:text-white"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 dark:border-primary/30">
                <Image
                  src="/Nestor_Picture.png"
                  alt="Nestor Garcia"
                  fill
                  className="object-cover object-top scale-[1.25]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Scroll down indicator */}
          <div className="flex justify-center mt-12 md:mt-24 animate-bounce">
            <button
              onClick={() => scrollToSection("about")}
              aria-label="Scroll to About Me"
              className="text-muted-foreground dark:text-slate-400 hover:text-primary transition-colors"
            >
              <ArrowDown className="h-10 w-10" /> {/* 👈 Super-sized icon */}
            </button>
          </div>
        </section>

        <section id="about" className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
            About Me
          </h2>

          <div className="max-w-7xl mx-auto space-y-12">
            {/* About Me */}
            <div>
              <p className="text-muted-foreground dark:text-slate-100 mb-4">
                Backend + full-stack engineer with 5+ years of experience
                building scalable systems (ERPs, Fintech, SaaS, B2B) and data
                pipelines. I enjoy turning messy, real-world workflows into
                reliable, production-grade products, ranging from straightforward
                internal tools to complex systems with automation, analytics, and
                strong operational reliability.
              </p>
              <p className="text-muted-foreground dark:text-slate-100 mb-4">
                Recently, I've been working on cloud-native manufacturing
                automation and instant quoting price prediction with Machine
                Learning, 3D geometry visualization, workflow orchestration with
                LangGraph, observability, and shipping both backend services and
                React/TypeScript product experiences. I care a lot about clean
                architecture, measurable performance, and systems that are easy
                to operate in production.
              </p>
              <p className="text-muted-foreground dark:text-slate-100 mb-4">
                I got into technology in college through web development and
                never stopped what still hooks me is breaking down complex
                problems and shipping solutions that make people's work faster
                and decisions smarter.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12 items-start">
              {/* Columna Izquierda - Hard Skills */}
              <Card className="text-center p-4 dark:bg-slate-800 dark:border-slate-700 w-full shadow-md">
                <CardContent className="pt-5">
                  <h3 className="text-2xl font-bold mb-6 dark:text-white text-center">
                    Hard Skills
                  </h3>

                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-6">
                    {[
                      { src: "/icons/python.png", label: "Python" },
                      { src: "/icons/django.png", label: "Django" },
                      {
                        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
                        label: "FastAPI",
                      },
                      {
                        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
                        label: "Flask",
                      },
                      { src: "/icons/laravel.png", label: "Laravel" },
                      {
                        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
                        label: "PostgreSQL",
                      },
                      {
                        src: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png",
                        label: "Docker",
                      },
                      { src: "/icons/aws.png", label: "AWS" },
                      {
                        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
                        label: "Azure",
                      },
                      {
                        src: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4",
                        label: "LangChain",
                      },
                      {
                        src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
                        label: "Scikit-learn",
                      },
                      { src: "/icons/react.png", label: "React" },
                      {
                        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
                        label: "Tailwind",
                      },
                      { src: "/icons/git.png", label: "Git" },
                      {
                        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
                        label: "Postman",
                      },
                    ].map((skill, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center w-20 space-y-2 transition-transform duration-200 hover:scale-105"
                      >
                        <img
                          src={skill.src}
                          alt={skill.label}
                          className="h-10 w-10 object-contain"
                        />
                        <span className="text-sm font-medium text-muted-foreground dark:text-slate-300 text-center">
                          {skill.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Columna Derecha - Soft Skills + Experience */}
              <div className="flex flex-col gap-3 w-full h-full">
                {/* Soft Skills */}
                <Card className="dark:bg-slate-800 dark:border-slate-700 w-full shadow-md flex-1 flex flex-col justify-center">
                  <CardContent className="p-4">
                    <h3 className="text-xl font-bold mb-4 dark:text-white text-center">
                      Soft Skills
                    </h3>
                    <ul className="flex flex-wrap justify-center gap-3 text-muted-foreground dark:text-slate-300">
                      {[
                        "Problem Solving",
                        "Technical Leadership",
                        "Cross-team Collaboration",
                        "Systems Thinking",
                        "Ownership",
                      ].map((skill, index) => (
                        <li
                          key={index}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-sm"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Years of Experience */}
                <Card className="text-center dark:bg-slate-800 dark:border-slate-700 w-full shadow-md flex-1 flex flex-col justify-center">
                  <CardContent className="p-4">
                    <p className="text-4xl font-bold text-primary mb-2">5+</p>
                    <p className="text-muted-foreground dark:text-slate-300">
                      Years Experience
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white ">
            Work Experience 💼
          </h2>
          <div className="max-w-3xl mx-auto text-base font-sans">
            <div className="relative md:pl-12 space-y-8">
              {/* Timeline line */}
              <div className="absolute left-[8px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-slate-700 hidden md:block" />
              {[
                {
                  role: "Software Engineer",
                  company: "radii.",
                  period: "Jan 2025 - Present",
                  isCurrent: true,
                  description:
                    "Building ML-powered pricing systems and scalable backend services for the Instant Quote product at a manufacturing technology company.",
                  responsibilities: [
                    "Built machine learning price prediction, combining extracted signals + business rules to improve consistency and speed of estimates",
                    "Led planning and collaboration across multiple projects: scoping, prioritization, reviews, and cross-team coordination",
                    "Designed and operated an event-driven cloud architecture on Azure (containers, queues, storage) with retries, idempotency, and clear execution states",
                    "Added production observability (metrics, tracing, dashboards, alerts) and led debugging of high-impact issues to improve uptime and developer velocity",
                    "Implemented workflow orchestration with LangGraph for multi-step automation with traceability, structured outputs, and easy iteration",
                    "Built and scaled backend services (Python) powering the Instant Quote product, including APIs, long-running job processing, and production-grade reliability patterns",
                    "Designed and optimized PostgreSQL data models and pipelines to store processed results, extracted features, and pricing outputs enabling analytics and ML-ready datasets",
                    "Implemented CI/CD with GitHub Actions + Docker to build, test, and deploy services to Azure Container Apps (ACR), improving release speed and consistency across environments",
                  ],
                  skills: ["Python", "Azure", "PostgreSQL", "LangGraph", "Docker", "React", "Machine Learning"],
                },
                {
                  role: "Software Engineer",
                  company: "Athena Systems",
                  period: "Oct 2023 - Jan 2025",
                  description:
                    "Started as a Support Engineer and was promoted within 3 months for demonstrating development talent. Worked on implementing financial software solutions for private investment funds.",
                  responsibilities: [
                    "Created client interfaces and implemented new client requirements",
                    "Performed data cleaning and transformation for tens of thousands of transaction records",
                    "Developed internal tools using Python and Flask to improve support team efficiency",
                    "Worked extensively with SQL Server stored procedures for backend implementations",
                    "Mentored junior engineers and conducted code reviews",
                    "Collaborated with cross-functional teams to accelerate joint deliverables",
                    "Created monitoring alerts for daily client processes",
                  ],
                  skills: ["Python", "Flask", "SQL Server", "ETL", "FIX Protocol"],
                },
                {
                  role: "Full Stack Developer",
                  company: "Inprosa",
                  period: "Jan 2023 - Sep 2023",
                  description:
                    "Contributed to the initial phase of an internal football/soccer project, developing core modules.",
                  responsibilities: [
                    "Developed user management modules with role-based permissions",
                    "Implemented tournament management systems",
                    "Used Laravel, Livewire, and SQL for full-stack development",
                    "Built modular components for future project scalability",
                  ],
                  skills: ["Laravel", "Livewire", "PHP", "MySQL", "JavaScript"],
                },
                {
                  role: "Web Developer / Data Analyst",
                  company: "Fort Group",
                  period: "Oct 2021 - Dec 2022",
                  description:
                    "Supported ERP development and provided data-driven insights for company operations.",
                  responsibilities: [
                    "Developed an ERP system using Laravel, SQL, and Livewire for internal management",
                    "Managed data systems for truck fleet, invoices, and employee performance",
                    "Analyzed operational data using Python, SQL, Excel, and Power BI",
                    "Delivered actionable business insights from complex datasets",
                  ],
                  skills: ["Laravel", "Python", "SQL", "Power BI", "Excel"],
                },
              ].map((job, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[47px] top-8 w-4 h-4 rounded-full hidden md:block border-2 border-slate-900 ${
                    job.isCurrent
                      ? "bg-primary ring-4 ring-primary/30"
                      : "bg-slate-500"
                  }`} />

                  <Card
                    className={`p-6 dark:bg-slate-800 dark:border-slate-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                      job.isCurrent
                        ? "ring-2 ring-primary/50 shadow-lg shadow-primary/10"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold dark:text-white">
                            {job.role}
                          </h3>
                          {job.isCurrent && (
                            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-primary font-medium">{job.company}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="mt-2 md:mt-0 w-fit dark:border-slate-600 dark:text-white"
                      >
                        {job.period}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground dark:text-slate-300 mb-4">
                      {job.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 dark:text-white">
                        Key Responsibilities:
                      </h4>
                      <ul className="list-disc pl-5 text-muted-foreground dark:text-slate-100 space-y-1">
                        {job.responsibilities.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t dark:border-slate-700">
                      {job.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="dark:bg-slate-700 dark:text-slate-200 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
            My Projects 💻
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Backtesting Trading Strategies",
                description:
                  "Data-intensive application that simulates trading strategies against historical market data. Processes 10,000+ data points to generate performance metrics and risk analysis reports.",
                image: "/assets/trading.png?height=400&width=600",
                tags: ["Python", "SQL", "Streamlit"],
                codeUrl: "https://github.com/Nesgc/BacktestingStrategies",
              },

              {
                title: "Internal tool For Athena Systems",
                description:
                  "Internal web application that reduced average support ticket resolution time by 30% by providing Safe in-app data correction tools.",
                image: "/assets/athena.png?height=400&width=600",
                tags: ["Python", "Flask", "SQL"],
                isPrivate: true,
              },
              {
                title: "Discord Bot",
                description:
                  "Full-stack gaming assistant featuring React dashboard + Django API. Tracks 500+ player characters, automatically notifies guilds about level milestones, and provides game analytics.",
                image: "/assets/discord.png?height=400&width=600",
                tags: ["Django", "React", "API", "Python"],
                codeUrl: "https://github.com/Nesgc/YalaharBot/",
              },
              {
                title: "Point of sale system",
                description:
                  "A full-featured point of sale system built with modules like products, sales, users, roles, focus on solving day to day operations of a store and with a database.",
                image: "/assets/pos.png?height=400&width=600",
                tags: [
                  "Laravel",
                  "Tailwind CSS",
                  "Livewire",
                  "PHP",
                  "SQL",
                  "Docker",
                ],
                codeUrl: "https://github.com/Nesgc/SalesSystemLivewireV3",
              },
              {
                title: "Alien Invasion Pygame",
                description:
                  "Object-oriented arcade game built with Pygame featuring progressive difficulty, score tracking, and modular design allowing easy expansion of enemy types and power-ups.",
                image: "/assets/pygame2.png?height=400&width=600",
                tags: ["Python", "Pygame", "OOP"],
                codeUrl: "https://github.com/Nesgc/Alien_Invasion",
              },
              {
                title: "Indeed Web Scraper",
                description:
                  "Automated data pipeline that collects and analyzes 1,000+ job postings daily. Transforms raw listings into SQL databases for tracking employment trends and skill demand.",
                image: "/assets/scrape2.png?height=400&width=600",
                tags: ["Python", "Selenium", "SQL"],
                codeUrl: "https://github.com/Nesgc/IndeedScraperPy",
              },
            ].map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden dark:bg-slate-800 dark:border-slate-700"
              >
                <div className="relative h-48">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground dark:text-slate-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="dark:bg-slate-700 dark:text-white"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    {project.isPrivate ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="cursor-default opacity-70 dark:bg-slate-700 dark:text-white"
                        disabled
                      >
                        🔒 Private
                      </Button>
                    ) : (
                      <>
                        {project.codeUrl && (
                          <Link
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="dark:border-slate-600 dark:text-white dark:hover:bg-slate-700"
                            >
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </Button>
                          </Link>
                        )}
                        {project.demoUrl && (
                          <Link
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Demo
                            </Button>
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
            Education 📚
          </h2>
          <div className="space-y-8 max-w-3xl mx-auto text-lg">
            {[
              {
                degree: "Bachelor’s Degree in Industrial Engineering",
                institution: "Instituto Tecnológico de Ciudad Madero",
                period: "2018 - 2023",
                description:
                  "Focused on quality engineering solutions, industrial adaptability, data-driven decision-making, and improving business profitability.",
              },
              {
                degree: "Computer Science Engineering",
                institution: "Instituto Tecnológico de Ciudad Madero",
                period: "2017 - 2018",
                description:
                  "Foundation year focused on core principles of computer science including logic, programming, and system analysis.",
              },
            ].map((edu, index) => (
              <Card
                key={index}
                className="p-6 dark:bg-slate-800 dark:border-slate-700"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-primary">{edu.institution}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="mt-2 md:mt-0 w-fit dark:border-slate-600 dark:text-white"
                  >
                    {edu.period}
                  </Badge>
                </div>
                <p className="text-muted-foreground dark:text-slate-300 mb-4">
                  {edu.description}
                </p>
                {edu.achievements?.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 dark:text-white">
                      Highlights:
                    </h4>
                    <ul className="list-disc pl-5 text-muted-foreground dark:text-slate-300 space-y-1">
                      {edu.achievements.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
            Get In Touch 📬
          </h2>

          <div className="max-w-lg mx-auto flex flex-col items-center text-center space-y-6">
            <p className="text-muted-foreground dark:text-slate-300">
              I'm currently open to new opportunities. If you have a project
              that needs my expertise or just want to chat, feel free to reach
              out!
            </p>

            <Link href="mailto:nestorofgarcia@gmail.com">
              <Button className="w-full sm:w-auto">
                <Mail className="h-4 w-4 mr-2" />
                nestorofgarcia@gmail.com
              </Button>
            </Link>

            <div className="flex justify-center gap-4 mt-4">
              <Link
                href="https://github.com/Nesgc/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary dark:text-white"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>

              <Link
                href="https://www.linkedin.com/in/nestorofirgarcia/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary dark:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t dark:border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground dark:text-slate-300">
            © {new Date().getFullYear()} Nestor Garcia. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={() => scrollToSection("home")}
          className="fixed bottom-6 right-6 p-2 rounded-full bg-primary text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
