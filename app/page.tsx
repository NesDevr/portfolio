"use client";

import { useState, useEffect } from "react";
import {
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Project = {
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
  screenshots?: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>;
  tags: string[];
  codeUrl?: string;
  websiteUrl?: string;
  websiteLogo?: string;
  isPrivate?: boolean;
  hidden?: boolean;
};

const tagIcons: Record<string, string> = {
  Python: "/assets/tech/python.svg",
  Django: "/assets/tech/django.svg",
  PostgreSQL: "/assets/tech/postgresql.svg",
  Azure: "/assets/tech/azure.svg",
  React: "/assets/tech/react.svg",
  "Next.js": "/assets/tech/nextjs.svg",
  Typescript: "/assets/tech/typescript.svg",
  Streamlit: "/assets/tech/streamlit.svg",
  Flask: "/assets/tech/flask.svg",
  Laravel: "/assets/tech/laravel.svg",
  "Tailwind CSS": "/assets/tech/tailwindcss.svg",
  Tailwind: "/assets/tech/tailwindcss.svg",
  Supabase:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  LangChain: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4",
  Livewire: "/assets/tech/livewire.svg",
  PHP: "/assets/tech/php.svg",
  Pygame: "/assets/tech/pygame.svg",
  "Three.js": "/assets/tech/threejs.svg",
  LangGraph: "/assets/tech/langgraph.svg",
  Docker: "/assets/tech/docker.svg",
  "Express.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "Github Actions": "/assets/tech/github-actions.svg",
  "GitHub Actions": "/assets/tech/github-actions.svg",
  "SQL Server": "/assets/tech/sql-server.svg",
  MSSQL: "/assets/tech/sql-server.svg",
  MySQL: "/assets/tech/mysql.svg",
  JavaScript: "/assets/tech/javascript.svg",
  "Machine Learning": "/assets/tech/machine-learning.svg",
  "Google Cloud": "/assets/tech/google-cloud.svg",
  Remotion: "/assets/tech/remotion.png",
  FFmpeg: "/assets/tech/ffmpeg.svg",
  Prisma: "/assets/tech/prisma.svg",
  Gemini: "/assets/tech/gemini.svg",
  "Django REST": "/assets/tech/django-rest.svg",
  "discord.py": "/assets/tech/discord-py.svg",
  Kotlin:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  Android:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
  "Jetpack Compose":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jetpackcompose/jetpackcompose-original.svg",
  "Chrome Extension":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",
  IndexedDB: "/assets/tech/indexeddb.svg",
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);

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
        <div className="container mx-auto px-4 py-2">
          <nav className="flex justify-between items-center">
            <div className="flex items-center h-9">
              <Image
                src="/LOGO.png"
                alt="Nestor Garcia Logo"
                width={160}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="hidden md:flex items-center gap-2">
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
                  className={`px-3 py-2 text-base font-semibold transition-[color,transform] duration-100 hover:scale-105 ${
                    activeSection === item.id
                      ? "scale-105 text-white"
                      : "text-muted-foreground hover:text-white dark:text-slate-300"
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
                      className={`px-4 py-3 text-left text-base font-semibold transition-[color,transform] duration-100 hover:scale-[1.02] ${
                        activeSection === item.id
                          ? "scale-[1.02] text-white"
                          : "text-muted-foreground hover:text-white dark:text-slate-200"
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
                Hi, I&apos;m <span className="text-primary">Nestor Garcia</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground dark:text-slate-200 mb-6">
                Software Engineer
              </h2>
              <p className="text-muted-foreground dark:text-slate-300 max-w-md mb-8">
                I enjoy building reliable, production grade products that make
                people&apos;s work faster and decisions smarter.
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
                <Button onClick={() => scrollToSection("experience")}>
                  My Experience
                </Button>
              </div>
              <div className="flex space-x-4 mt-8">
                <Link
                  href="https://github.com/NesDevr/"
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
                  href="https://www.linkedin.com/in/ngarcia12/"
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
                <Link href="mailto:nestororgarcia@gmail.com">
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
                Software engineer with 5+ years of experience building scalable
                systems (ERPs, Fintech, SaaS, B2B), AI Agents and data
                pipelines. I enjoy turning messy, real-world workflows into
                reliable, production-grade products, ranging from
                straightforward internal tools to complex systems with
                automation, analytics, and strong operational reliability.
              </p>
              <p className="text-muted-foreground dark:text-slate-100 mb-4">
                Recently, I&apos;ve been working on AI Agent systems, automation
                and instant quoting price prediction with ML, 3D geometry
                visualization, workflow orchestration with LangGraph,
                observability, and shipping both backend services and
                React/TypeScript product experiences. I care a lot about clean
                architecture, measurable performance, and systems that are easy
                to operate in production.
              </p>
              <p className="text-muted-foreground dark:text-slate-100 mb-4">
                I got into technology in college through web development and
                never stopped what still hooks me is breaking down complex
                problems and shipping solutions that make people&apos;s work
                faster and decisions smarter.
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
                      { src: "/assets/tech/python.svg", label: "Python" },
                      { src: "/assets/tech/django.svg", label: "Django" },
                      {
                        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
                        label: "FastAPI",
                      },
                      { src: "/assets/tech/react.svg", label: "React" },
                      { src: "/assets/tech/nextjs.svg", label: "Next.js" },
                      {
                        src: "/assets/tech/typescript.svg",
                        label: "TypeScript",
                      },
                      {
                        src: "/assets/tech/postgresql.svg",
                        label: "PostgreSQL",
                      },
                      {
                        src: "/assets/tech/sql-server.svg",
                        label: "SQL Server",
                      },
                      {
                        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
                        label: "Supabase",
                      },
                      { src: "/assets/tech/azure.svg", label: "Azure" },
                      {
                        src: "/assets/tech/google-cloud.svg",
                        label: "Google Cloud",
                      },
                      { src: "/assets/tech/docker.svg", label: "Docker" },
                      {
                        src: "/assets/tech/github-actions.svg",
                        label: "GitHub Actions",
                      },
                      {
                        src: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4",
                        label: "LangChain",
                      },
                      {
                        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
                        label: "Express.js",
                      },
                    ].map((skill, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center w-20 space-y-2 transition-transform duration-200 hover:scale-105"
                      >
                        <Image
                          src={skill.src}
                          alt={skill.label}
                          width={40}
                          height={40}
                          unoptimized
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
            Work Experience
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
                    "Full-time remote role at a manufacturing technology company in Querétaro, Mexico. Building fullstack services.",
                  responsibilities: [
                    "Built and maintained Django backend APIs end-to-end (models, serializers, views/viewsets, permissions, validation) with clean contracts and reliable error handling",
                    "Led planning and collaboration across multiple projects: scoping, prioritization, reviews, and cross-team coordination",
                    "Designed and operated an event-driven cloud architecture on Azure (containers, queues, storage) with retries, idempotency, and clear execution states",
                    "Added production observability (metrics, tracing, dashboards, alerts) and led debugging of high-impact issues to improve uptime and developer velocity",
                    "Architected a React UI instant quoting system supporting drag-and-drop CAD file uploads, real-time price calculation with async job polling, and a checkout flow integrating shipping/billing address management and PDF quote generation",
                    "Built and scaled backend microservices, including APIs, long-running job processing, and production-grade reliability patterns",
                    "Designed and optimized PostgreSQL data models and pipelines to store processed results, extracted features, and pricing outputs enabling analytics and ML-ready datasets",
                    "Implemented CI/CD with GitHub Actions + Docker to build, test, and deploy services to Azure Container Apps (ACR), improving release speed and consistency across environments",
                  ],
                  skills: [
                    "Python",
                    "Django",
                    "Express.js",
                    "Azure",
                    "PostgreSQL",
                    "LangGraph",
                    "Docker",
                    "React",
                    "Machine Learning",
                    "GitHub Actions",
                  ],
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
                  skills: [
                    "Python",
                    "Flask",
                    "SQL Server",
                    "ETL",
                    "FIX Protocol",
                  ],
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
                  skills: ["Laravel", "Python", "MySQL", "Power BI", "Excel"],
                },
              ].map((job, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[47px] top-8 w-4 h-4 rounded-full hidden md:block border-2 border-slate-900 ${
                      job.isCurrent
                        ? "bg-primary ring-4 ring-primary/30"
                        : "bg-slate-500"
                    }`}
                  />

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
                            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs hover:bg-primary/20">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-primary font-medium">
                          {job.company}
                        </p>
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
                      {job.skills.map((skill, skillIndex) => {
                        const skillIcon = tagIcons[skill];

                        return (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="inline-flex items-center gap-1.5 dark:bg-slate-700 dark:text-slate-200 text-xs"
                          >
                            {skillIcon && (
                              <Image
                                src={skillIcon}
                                alt=""
                                width={16}
                                height={16}
                                className="h-4 w-4"
                              />
                            )}
                            {skill}
                          </Badge>
                        );
                      })}
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
            My Projects
          </h2>
          <div
            id="project-grid"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                title: "radii. instant quoting platform",
                description:
                  "Built core components of a B2B platform that gives manufacturers instant pricing on custom parts from uploaded CAD files. Designed and shipped a Three.js 3D viewer with DFM analysis overlays, drag-and-drop multi-file upload, async pricing via job polling backed by Django services on an event-driven Azure architecture with LangGraph workflow orchestration.",
                image: "/assets/DFM.webp?height=400&width=600",
                tags: [
                  "Python",
                  "Django",
                  "Express.js",
                  "PostgreSQL",
                  "Azure",
                  "React",
                  "Typescript",
                  "Three.js",
                  "LangGraph",
                  "Docker",
                  "Github Actions",
                ],
                websiteUrl: "https://www.radii.com.mx/en",
                websiteLogo: "/assets/radii_logo.webp",
              },
              {
                title: "YouTube Outlier Research Platform",
                description:
                  "Full-stack YouTube research platform for creators and content teams. Finds outlier videos, analyzes transcripts and metadata, compares trends, researches keywords, saves videos into folders, and generates AI-assisted content ideas with Gemini.",
                image: "/assets/youtube-analyzer/02-outlier-finder.png",
                imagePosition: "object-top",
                screenshots: [
                  {
                    src: "/assets/youtube-analyzer/02-outlier-finder.png",
                    alt: "YouTube Analyzer outlier finder",
                    width: 1280,
                    height: 720,
                  },
                  {
                    src: "/assets/youtube-analyzer/03-keyword-research.png",
                    alt: "YouTube Analyzer keyword research",
                    width: 1280,
                    height: 720,
                  },
                  {
                    src: "/assets/youtube-analyzer/04-google-trends.png",
                    alt: "YouTube Analyzer Google Trends research",
                    width: 1280,
                    height: 720,
                  },
                  {
                    src: "/assets/youtube-analyzer/05-channel-starter.png",
                    alt: "YouTube Analyzer channel starter",
                    width: 1280,
                    height: 720,
                  },
                ],
                tags: [
                  "Next.js",
                  "React",
                  "Typescript",
                  "Tailwind CSS",
                  "Prisma",
                  "Google Cloud",
                  "Gemini",
                ],
                codeUrl: "https://github.com/NesDevr/youtube-content-analyzer",
              },
              {
                title: "AI Video Production Factory",
                description:
                  "Multi-agent AI video production pipeline that turns a topic into a YouTube-ready package: channel-aware planning, script generation, visual sourcing, TTS narration, Remotion rendering, thumbnails, review gates, cost traces, and final MP4 assembly.",
                image:
                  "/assets/video-factory-remotion.png?height=400&width=600",
                imagePosition: "object-bottom",
                tags: [
                  "Python",
                  "React",
                  "Typescript",
                  "Google Cloud",
                  "Remotion",
                  "FFmpeg",
                ],
                codeUrl: "https://github.com/NesDevr/video-factory",
              },
              {
                title: "Coffee Shop Chatbot",
                description:
                  "Next.js coffee storefront with a floating AI chat widget. Uses LangChain and OpenAI with Supabase vector search to retrieve coffee knowledge before answering customer questions.",
                image: "/assets/coffee-snapshot.png?height=400&width=600",
                imagePosition: "object-bottom",
                tags: [
                  "React",
                  "Typescript",
                  "Tailwind CSS",
                  "Supabase",
                  "LangChain",
                ],
                codeUrl: "https://github.com/NesDevr/coffee-shop-chatbot",
              },
              {
                title: "Minley Budget App + MCP Server",
                description:
                  "Built a native Android budgeting system that centralizes accounts, transactions, categories, recurring items, reminders, and monthly activity. I designed and implemented the app in Kotlin and Jetpack Compose, then added a local MCP server exposing validated finance tools for assistant-driven actions. Key challenges included synchronizing application state with Supabase, scheduling reliable reminders, and restricting assistant actions to safe, explicit operations. Personal project with public source code.",
                image: "/assets/minley-budget.jpg?height=400&width=600",
                screenshots: [
                  {
                    src: "/assets/minley/01-overview.png",
                    alt: "Minley monthly budget overview",
                    width: 1080,
                    height: 2400,
                  },
                  {
                    src: "/assets/minley/02-accounts.png",
                    alt: "Minley accounts screen",
                    width: 1080,
                    height: 2400,
                  },
                  {
                    src: "/assets/minley/03-add-expense.png",
                    alt: "Adding an expense in Minley",
                    width: 1080,
                    height: 2400,
                  },
                  {
                    src: "/assets/minley/04-activity.png",
                    alt: "Minley monthly activity screen",
                    width: 1080,
                    height: 2400,
                  },
                  {
                    src: "/assets/minley/05-reminders.png",
                    alt: "Minley reminders screen",
                    width: 1080,
                    height: 2400,
                  },
                ],
                tags: [
                  "Kotlin",
                  "Android",
                  "Jetpack Compose",
                  "Supabase",
                  "Typescript",
                ],
                codeUrl: "https://github.com/NesDevr/minley-budget-app",
              },
              {
                title: "Job Autofill + Tracker Chrome Extension",
                description:
                  "Built a local-first Chrome extension that centralizes job application autofill, tracking, follow-ups, reusable answers, and proposal workflows. I designed and implemented the extension with React, TypeScript, WXT, and IndexedDB, then added optional OpenAI-powered drafting and parsing with a bring-your-own-key model. Key challenges included filling React-controlled forms reliably across multiple applicant tracking systems, preserving user privacy with local storage, and restricting automation to explicit user-triggered actions. Personal project with public source code.",
                image: "/assets/job-tracker/01-application-details.png",
                imagePosition: "object-top",
                screenshots: [
                  {
                    src: "/assets/job-tracker/01-application-details.png",
                    alt: "Job Tracker application details dashboard",
                    width: 1905,
                    height: 854,
                  },
                  {
                    src: "/assets/job-tracker/02-quick-side-panel.png",
                    alt: "Job Tracker quick side panel",
                    width: 505,
                    height: 874,
                  },
                  {
                    src: "/assets/job-tracker/03-autofill-sidebar.png",
                    alt: "Job application autofill sidebar",
                    width: 1684,
                    height: 935,
                  },
                  {
                    src: "/assets/job-tracker/04-demo-profile-retake.png",
                    alt: "Job Tracker demo profile",
                    width: 1905,
                    height: 854,
                  },
                  {
                    src: "/assets/job-tracker/05-answer-library.png",
                    alt: "Job Tracker reusable answer library",
                    width: 1905,
                    height: 854,
                  },
                ],
                tags: [
                  "React",
                  "Typescript",
                  "Tailwind CSS",
                  "Chrome Extension",
                  "IndexedDB",
                ],
                codeUrl: "https://github.com/NesDevr/job-autofill-tracker",
              },
              {
                title: "Backtesting Trading Strategies",
                description:
                  "Data-intensive application that simulates trading strategies against historical market data. Processes 10,000+ data points to generate performance metrics, risk analysis reports, and visual comparisons for evaluating strategy behavior.",
                image: "/assets/trading.png?height=400&width=600",
                tags: ["Python", "MSSQL", "Streamlit"],
                codeUrl: "https://github.com/NesDevr/BacktestingStrategies",
                hidden: true,
              },

              {
                title: "Athena Support Operations Tool",
                description:
                  "Internal web application that reduced average support ticket resolution time by 30% by providing safe in-app data correction tools, validation workflows, and faster operational visibility for support engineers.",
                image: "/assets/athena.png?height=400&width=600",
                tags: ["Python", "Flask", "MSSQL"],
                websiteUrl: "https://www.athenasystems.com/",
                websiteLogo: "/assets/athenaSystems.png",
                hidden: true,
              },
              {
                title: "YalaharBot",
                description:
                  "Discord automation bot for Tibia servers with hybrid slash/prefix commands, character identity linking, level and death alerts, watched worlds and guilds, leaderboards, a Django REST API, and a Next.js control-panel dashboard.",
                image: "/assets/yalaharbot-dashboard.png?height=400&width=600",
                tags: [
                  "Python",
                  "Django",
                  "Django REST",
                  "discord.py",
                  "Next.js",
                  "React",
                  "Tailwind CSS",
                ],
                codeUrl: "https://github.com/NesDevr/yalaharbot-tibia-discord-bot",
                hidden: true,
              },
              {
                title: "Point of sale system",
                description:
                  "Full-featured point of sale system with modules for products, sales, users, roles, and inventory-focused store operations. Built to streamline daily workflows with a structured database-backed admin experience.",
                image: "/assets/pos.png?height=400&width=600",
                tags: [
                  "Laravel",
                  "Tailwind CSS",
                  "Livewire",
                  "PHP",
                  "MySQL",
                  "Docker",
                ],
                codeUrl:
                  "https://github.com/NesDevr/sales-management-system-laravel-livewire",
                hidden: true,
              },
            ]
              .filter(
                (project: Project) => showAllProjects || !project.hidden,
              )
              .map((project: Project) => (
              <Card
                key={project.title}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedScreenshotIndex(0);
                  setSelectedProject(project);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedScreenshotIndex(0);
                    setSelectedProject(project);
                  }
                }}
                className="animate-in fade-in slide-in-from-bottom-3 overflow-hidden duration-300 dark:bg-slate-800 dark:border-slate-700 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <div className="relative h-44 bg-slate-950">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className={`object-cover ${project.imagePosition ?? ""}`}
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold mb-2 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-sm leading-6 text-muted-foreground dark:text-slate-300">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => {
                      const tagIcon = tagIcons[tag];

                      return (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="inline-flex items-center gap-1.5 text-xs dark:bg-slate-700 dark:text-white"
                        >
                          {tagIcon && (
                            <Image
                              src={tagIcon}
                              alt=""
                              width={16}
                              height={16}
                              className="h-4 w-4"
                            />
                          )}
                          {tag}
                        </Badge>
                      );
                    })}
                  </div>
                  <div
                    className="flex flex-wrap gap-2"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {project.isPrivate && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="cursor-default opacity-70 dark:bg-slate-700 dark:text-white"
                        disabled
                      >
                        🔒 Private Code
                      </Button>
                    )}
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
                    {project.websiteUrl && (
                      <Link
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="dark:border-slate-600 dark:text-white dark:hover:bg-slate-700"
                        >
                          {project.websiteLogo ? (
                            <span className="mr-2 flex h-7 w-7 items-center justify-center rounded bg-white p-1">
                              <Image
                                src={project.websiteLogo}
                                alt=""
                                width={24}
                                height={24}
                                className="h-5 w-5 object-contain"
                              />
                            </span>
                          ) : (
                            <ExternalLink className="h-4 w-4 mr-2" />
                          )}
                          Website
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              variant="outline"
              aria-expanded={showAllProjects}
              aria-controls="project-grid"
              onClick={() => setShowAllProjects((current) => !current)}
              className="group min-w-48 border-slate-600 bg-slate-900/40 text-white shadow-lg shadow-black/10 hover:bg-slate-800"
            >
              {showAllProjects ? "Show fewer projects" : "Show more projects"}
              <ArrowDown
                className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                  showAllProjects ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
          <Dialog
            open={selectedProject !== null}
            onOpenChange={(open) => {
              if (!open) {
                setSelectedProject(null);
              }
            }}
          >
            <DialogContent className="max-h-[90vh] max-w-5xl overflow-x-hidden overflow-y-auto p-0 dark:border-slate-700 dark:bg-slate-900">
              {selectedProject && (
                <div className="min-w-0">
                  {selectedProject.screenshots ? (
                    <div className="overflow-hidden bg-slate-950 px-12 py-6 sm:px-16">
                      <div className="relative">
                        <figure className="relative h-[52vh] min-h-[300px] max-h-[600px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/30 sm:h-[60vh]">
                          {selectedProject.screenshots.map(
                            (screenshot, index) => (
                              <div
                                key={screenshot.src}
                                aria-hidden={
                                  selectedScreenshotIndex !== index
                                }
                                className={`absolute inset-0 transition-opacity duration-200 ${
                                  selectedScreenshotIndex === index
                                    ? "opacity-100"
                                    : "pointer-events-none opacity-0"
                                }`}
                              >
                                <Image
                                  src={screenshot.src}
                                  alt={
                                    selectedScreenshotIndex === index
                                      ? screenshot.alt
                                      : ""
                                  }
                                  fill
                                  loading="eager"
                                  sizes="(max-width: 640px) 80vw, 850px"
                                  className="object-contain"
                                />
                              </div>
                            ),
                          )}
                        </figure>
                      {selectedProject.screenshots.length > 1 && (
                        <>
                          <button
                            type="button"
                            aria-label="Previous screenshot"
                            onClick={() =>
                              setSelectedScreenshotIndex((current) =>
                                current === 0
                                  ? selectedProject.screenshots!.length - 1
                                  : current - 1,
                              )
                            }
                            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/90 text-white shadow-lg transition hover:bg-slate-700 sm:left-4"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            aria-label="Next screenshot"
                            onClick={() =>
                              setSelectedScreenshotIndex(
                                (current) =>
                                  (current + 1) %
                                  selectedProject.screenshots!.length,
                              )
                            }
                            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/90 text-white shadow-lg transition hover:bg-slate-700 sm:right-4"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      </div>
                      {selectedProject.screenshots.length > 1 && (
                          <div className="mt-4 flex items-center justify-center gap-2">
                            {selectedProject.screenshots.map(
                              (screenshot, index) => (
                                <button
                                  key={screenshot.src}
                                  type="button"
                                  aria-label={`Show screenshot ${index + 1}`}
                                  aria-current={
                                    selectedScreenshotIndex === index
                                      ? "true"
                                      : undefined
                                  }
                                  onClick={() =>
                                    setSelectedScreenshotIndex(index)
                                  }
                                  className={`h-2 rounded-full transition-all ${
                                    selectedScreenshotIndex === index
                                      ? "w-6 bg-primary"
                                      : "w-2 bg-slate-600 hover:bg-slate-400"
                                  }`}
                                />
                              ),
                            )}
                            <span className="ml-2 text-xs tabular-nums text-slate-400">
                              {selectedScreenshotIndex + 1} /{" "}
                              {selectedProject.screenshots.length}
                            </span>
                          </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative min-h-[280px] bg-slate-950 sm:min-h-[420px]">
                      <Image
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="space-y-5 p-6 sm:p-8">
                    <DialogHeader>
                      <DialogTitle className="text-2xl dark:text-white">
                        {selectedProject.title}
                      </DialogTitle>
                      <DialogDescription className="text-base leading-7 dark:text-slate-300">
                        {selectedProject.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, tagIndex) => {
                        const tagIcon = tagIcons[tag];

                        return (
                          <Badge
                            key={tagIndex}
                            variant="secondary"
                            className="inline-flex items-center gap-1.5 dark:bg-slate-700 dark:text-white"
                          >
                            {tagIcon && (
                              <Image
                                src={tagIcon}
                                alt=""
                                width={16}
                                height={16}
                                className="h-4 w-4"
                              />
                            )}
                            {tag}
                          </Badge>
                        );
                      })}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.isPrivate && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="cursor-default opacity-70 dark:bg-slate-700 dark:text-white"
                          disabled
                        >
                          🔒 Private Code
                        </Button>
                      )}
                      {selectedProject.codeUrl && (
                        <Link
                          href={selectedProject.codeUrl}
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
                      {selectedProject.websiteUrl && (
                        <Link
                          href={selectedProject.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="dark:border-slate-600 dark:text-white dark:hover:bg-slate-700"
                          >
                            {selectedProject.websiteLogo ? (
                              <span className="mr-2 flex h-7 w-7 items-center justify-center rounded bg-white p-1">
                                <Image
                                  src={selectedProject.websiteLogo}
                                  alt=""
                                  width={24}
                                  height={24}
                                  className="h-5 w-5 object-contain"
                                />
                              </span>
                            ) : (
                              <ExternalLink className="h-4 w-4 mr-2" />
                            )}
                            Website
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </section>

        {/* Education Section */}
        <section id="education" className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
            Education
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
                {"achievements" in edu &&
                  Array.isArray(edu.achievements) &&
                  edu.achievements.length > 0 && (
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
            Get In Touch
          </h2>

          <div className="max-w-lg mx-auto flex flex-col items-center text-center space-y-6">
            <p className="text-muted-foreground dark:text-slate-300">
              I&apos;m currently open to new opportunities. If you have a
              project that needs my expertise or just want to chat, feel free to
              reach out!
            </p>

            <Link href="mailto:nestororgarcia@gmail.com">
              <Button className="w-full sm:w-auto">
                <Mail className="h-4 w-4 mr-2" />
                nestororgarcia@gmail.com
              </Button>
            </Link>

            <div className="flex justify-center gap-4 mt-4">
              <Link
                href="https://github.com/NesDevr/"
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
                href="https://www.linkedin.com/in/ngarcia12/"
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
