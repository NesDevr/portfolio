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
  FileText,
} from "lucide-react";
import { WorkflowPreview, type WorkflowKind } from "@/components/workflow-preview";
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
  hidden?: boolean;
  description: string;
  image?: string;
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
  context?: string;
  workflow?: WorkflowKind;
  caseStudy?: {
    problem: string;
    contribution: string;
    implementation: string;
    validation: string;
    outcome: string;
  };
};

const tagIcons: Record<string, string> = {
  Python: "/assets/tech/python.svg",
  AWS: "/assets/tech/aws.svg",
  Git: "/assets/tech/git.svg",
  FastAPI: "/assets/tech/fastapi.svg",
  "Node.js": "/assets/tech/nodejs.svg",
  Kubernetes: "/assets/tech/kubernetes.svg",
  Terraform: "/assets/tech/terraform.svg",
  PyTorch: "/assets/tech/pytorch.svg",
  "scikit-learn": "/assets/tech/scikitlearn.svg",
  Databricks: "/assets/tech/databricks.svg",
  "Apache Spark": "/assets/tech/apache-spark.svg",
  PowerShell: "/assets/tech/powershell.svg",
  Django: "/assets/tech/django.svg",
  PostgreSQL: "/assets/tech/postgresql.svg",
  Azure: "/assets/tech/azure.svg",
  React: "/assets/tech/react.svg",
  "Next.js": "/assets/tech/nextjs.svg",
  Typescript: "/assets/tech/typescript.svg",
  TypeScript: "/assets/tech/typescript.svg",
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
  Electron: "/assets/tech/electron.svg",
  "Power BI": "/assets/tech/power-bi.svg",
  Excel: "/assets/tech/excel.svg",
  Grafana: "/assets/tech/grafana.svg",
  XGBoost: "/assets/tech/xgboost.png",
  "Delta Lake": "/assets/tech/delta-lake.svg",
  Postman: "/assets/tech/postman.svg",
  "Azure AI Foundry": "/assets/tech/azure.svg",
  Codex: "/assets/tech/codex.svg",
  "Claude Code": "/assets/tech/claude-code.svg",
};

const skillGroups = [
  {
    title: "Backend",
    skills: ["Python", "Django", "Django REST", "FastAPI", "Node.js", "Express.js", "Flask", "PHP", "Laravel"],
  },
  {
    title: "Frontend",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Three.js", "Livewire"],
  },
  {
    title: "Data & analytics",
    skills: ["PostgreSQL", "SQL Server", "MySQL", "Supabase", "Databricks", "Apache Spark", "Delta Lake", "Power BI", "Excel"],
  },
  {
    title: "AI & machine learning",
    skills: ["LangChain", "LangGraph", "Azure AI Foundry", "PyTorch", "XGBoost", "scikit-learn", "Gemini"],
  },
  {
    title: "Cloud & infrastructure",
    skills: ["Azure", "AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Grafana"],
  },
  {
    title: "Delivery & testing",
    skills: ["Git", "GitHub Actions", "Postman", "PowerShell", "Codex", "Claude Code"],
  },
];

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
                I build production web applications, AI document workflows and
                financial data integrations. Hands-on from planning and team
                coordination to deployment and production support.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/assets/Nestor_Garcia_Software_Engineer.pdf"
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
                I&apos;m a software engineer with about five years of experience
                across manufacturing, financial software and internal business
                tools. My main stack is Python, Django, React, TypeScript, Node.js
                and SQL.
                I enjoy understanding how people work and building software that
                makes their daily tasks easier.
              </p>
              <p className="text-muted-foreground dark:text-slate-100 mb-4">
                At radii., I designed and led the redesign of an existing
                manufacturing quotation feature, implementing most of the
                changes across the interface, APIs and database. I built a
                manufacturing AI assistant, ML-based cost
                prediction, production PDF redaction and LangGraph document
                workflows. I also managed cloud resources and container delivery
                on Azure and AWS, including production Kubernetes workloads.
              </p>
              <p className="text-muted-foreground dark:text-slate-100 mb-4">
                Previously, at Athena Systems, I worked directly with clients and
                providers in English to implement financial-data integrations and
                investigate reconciliation issues. I use Codex and Claude Code
                for planning, test design, implementation and review, followed by
                my own checks.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12 items-start">
              {/* Columna Izquierda - Hard Skills */}
              <Card className="text-center dark:bg-slate-800 dark:border-slate-700 w-full shadow-md md:col-span-2">
                <CardContent className="p-4 sm:p-5">
                  <h3 className="text-xl font-bold mb-4 dark:text-white text-center">
                    Technical Skills
                  </h3>

                  <div className="grid gap-x-6 gap-y-4 text-left md:grid-cols-2 xl:grid-cols-3">
                    {skillGroups.map((group) => (
                      <div key={group.title}>
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-slate-400">
                          {group.title}
                        </h4>
                        <ul className="flex flex-wrap gap-1.5" aria-label={group.title}>
                          {group.skills.map((skill) => (
                            <li
                              key={skill}
                              className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs leading-5 text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200"
                            >
                              <Image
                                src={tagIcons[skill]}
                                alt=""
                                width={16}
                                height={16}
                                unoptimized
                                className={`h-4 w-4 shrink-0 object-contain ${["Express.js", "Three.js", "LangGraph"].includes(skill) ? "dark:brightness-0 dark:invert" : ""}`}
                              />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Columna Derecha - Soft Skills + Experience */}
              <div className="grid gap-3 w-full md:col-span-2 md:grid-cols-2">
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
                      Years across software and data
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
                    "Manufacturing software, from customer-facing quotations to AI assistants, cost prediction, document processing and cloud operations.",
                  responsibilities: [
                    "Led the redesign of an existing manufacturing quotation feature using React, TypeScript, Django REST Framework, and PostgreSQL. Defined requirements with Operations, designed the interface, APIs, and database schema, and implemented most of the changes. Assigned tasks and reviewed the team’s work.",
                    "Independently built PDF redaction and a LangGraph PPAP workflow used by operations. Estimated complete-report preparation fell from a working day to five minutes or less.",
                    "Built the FastAPI-based CAD-processing service and redesigned asynchronous processing with Azure Service Bus and Container Apps, supporting up to 35 concurrent jobs per worker replica.",
                    "Built a LangChain/LangGraph manufacturing assistant with Azure OpenAI, Django APIs and PostgreSQL/pgvector for technical retrieval and permission-checked quotation actions.",
                    "Replaced deterministic cost estimation with an ML pricing engine using PyTorch geometry features and XGBoost regression, with scikit-learn evaluation and FastAPI inference.",
                    "Built Databricks ETL pipelines using real manufacturing datasets, with PySpark, bronze/silver/gold Delta tables, scheduled ingestion, data-quality checks and SQL dashboards.",
                    "Designed and implemented a Node.js LogoDetection worker on AWS, combining OCR, LLM classification and configurable PDF redaction policies.",
                    "Managed production Kubernetes workloads on Azure with Terraform, including health probes, secrets, resource limits and rolling updates; used Grafana for monitoring dashboards.",
                    "Built GitHub Actions CI/CD pipelines for automated tests, linting, Docker image builds, publishing to Azure Container Registry and deployment to Azure Container Apps; configured cloud resources, scoped identities, permissions and secrets.",
                    "Deployed LogoDetection on AWS using ECR/ECS and CloudWatch; configured S3 file permissions and expiring download links, and cleaned up unused Azure resources.",
                    "Normalized PostgreSQL quotation/order relationships with staged migrations and backfills. Diagnosed N+1 queries with Scout APM, reducing Orders page loading from 4.4 seconds to one.",
                    "Deployed models and configured endpoints through Microsoft Foundry. Investigated processing timeouts and memory failures using job logs, Azure alerts, Papertrail and Heroku.",
                  ],
                  skills: [
                    "Python",
                    "Node.js",
                    "FastAPI",
                    "Django",
                    "Azure",
                    "AWS",
                    "PostgreSQL",
                    "LangGraph",
                    "PyTorch",
                    "XGBoost",
                    "LangChain",
                    "Azure AI Foundry",
                    "Kubernetes",
                    "Terraform",
                    "Databricks",
                    "Apache Spark",
                    "Delta Lake",
                    "Grafana",
                    "Postman",
                    "Docker",
                    "React",
                    "GitHub Actions",
                  ],
                },
                {
                  role: "Software Engineer",
                  company: "Athena Systems",
                  period: "Oct 2023 - Jan 2025",
                  description:
                    "Financial software for investment clients. Started in support and moved into software engineering responsibilities within approximately three months, working directly with clients and providers in English.",
                  responsibilities: [
                    "Owned provider requirements, historical loads and daily ingestion with Python, PowerShell, SQL Server, FIX transactions, XML mappings and CSV reports over FTP/SFTP.",
                    "Built reconciliation procedures, views and functions; transformed and validated 10,000+ transaction records and investigated missing activity, duplicates and account discrepancies.",
                    "Resolved a doubled account total by tracing an unexpected provider summary row, correcting filtering rules and explaining the cause and fix in a client postmortem.",
                    "Built a Flask/ORM interface for repetitive database tasks. Used Bloomberg Terminal/Desktop API to investigate missing security identifiers and price data.",
                    "Troubleshot Athena Spark through application logs, SQL records and incoming files; communicated findings in English, mentored junior engineers and reviewed code.",
                  ],
                  skills: [
                    "Python",
                    "Flask",
                    "SQL Server",
                    "PowerShell",
                  ],
                },
                {
                  role: "Full Stack Developer / Data Analyst",
                  company: "Fort Group",
                  period: "Oct 2021 - Sep 2023",
                  description:
                    "Built internal applications and reporting workflows, combining full-stack development with operational data analysis.",
                  responsibilities: [
                    "Developed Laravel/Livewire ERP modules for fleet, tires, maintenance, invoicing and employee-performance workflows, using PHP, JavaScript and MySQL.",
                    "Built user management, role-based permissions, tournament workflows and reusable interface components.",
                    "Gathered requirements from operational staff and designed relational models to support their workflows.",
                    "Maintained Python/SQL ETL and reporting workflows, with Excel and Power BI dashboards for operational analysis.",
                  ],
                  skills: ["Laravel", "Livewire", "PHP", "JavaScript", "Python", "MySQL", "Power BI", "Excel"],
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
                        Selected work
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
                  "Led the redesign of an existing manufacturing quotation feature using React, TypeScript, Django REST Framework, and PostgreSQL. The platform supports asynchronous CAD processing, an AI assistant and ML-based cost estimation.",
                image: "/assets/DFM.webp?height=400&width=600",
                tags: [
                  "Python",
                  "Django",
                  "PostgreSQL",
                  "Azure",
                  "React",
                  "Typescript",
                ],
                websiteUrl: "https://www.radii.com.mx/en",
                websiteLogo: "/assets/radii_logo.webp",
                isPrivate: true,
                caseStudy: {
                  problem: "Customers needed a connected flow from uploaded CAD files to a usable quotation, with clear status while long-running processing finished.",
                  contribution: "Defined requirements with Operations, designed the interface, APIs and database schema, implemented most of the redesign, and assigned and reviewed the team's work. Owned the CAD processing redesign and built the manufacturing AI assistant and ML cost-estimation integrations.",
                  implementation: "React and Django/DRF connect CAD uploads, processing status, pricing, review, checkout and PDF quotes, with Three.js for part visualization. FastAPI, Azure Service Bus and Container Apps handle asynchronous CAD processing, supporting up to 35 concurrent jobs per worker replica. A LangChain/LangGraph assistant uses Azure OpenAI, PostgreSQL/pgvector and validated Django tools to answer technical questions and manage quotations. PyTorch geometry features and XGBoost regression support manufacturing cost estimates.",
                  validation: "Checked quotation workflows and investigated failed jobs through application states and logs. Added permission checks and confirmation for chat-driven changes; evaluated pricing with MAE, RMSE and unusual-case review. Used Scout APM to identify N+1 queries and optimize Django data loading.",
                  outcome: "Shipped a production quotation workflow, preserved historical relationships through PostgreSQL migrations and backfills, and reduced Orders page loading from 4.4 seconds to one.",
                },
              },
              {
                title: "LogoDetection: PDF redaction",
                description: "Independently designed and implemented a production Node.js worker on AWS to identify and remove company logos and sensitive content from manufacturing PDFs using OCR, model classification and configurable rules.",
                workflow: "redaction" as const,
                tags: ["Node.js", "Azure", "AWS", "Docker"],
                isPrivate: true,
                caseStudy: {
                  problem: "Manufacturing documents needed company logos and sensitive details removed while retaining useful technical information.",
                  contribution: "Designed and implemented the Node.js solution end to end, including detection rules, model integration, redaction behavior, manual evaluation and AWS worker deployment.",
                  implementation: "The Node.js worker combines Azure Document Intelligence OCR, text and spatial rules, Azure OpenAI classification and configurable PDF redaction policies. Built and deployed Docker images through GitHub Actions and Amazon ECR to ECS, with CloudWatch logs and alarms.",
                  validation: "Manually reviewed what was removed, missed or preserved and why, then adjusted rules and bounding boxes. Added a reference list of clients and prospects when ambiguous company names confused classification.",
                  outcome: "Used in the production document workflow, with iterative manual evaluation to refine detection and preserve useful technical content.",
                },
              },
              {
                title: "PPAP manufacturing document automation",
                description: "Independently built a LangGraph workflow used by operations to generate manufacturing reports. Estimated preparation time fell from a working day to three minutes or less per complete report.",
                workflow: "ppap" as const,
                tags: ["Python", "LangGraph", "Azure", "Django"],
                isPrivate: true,
                caseStudy: {
                  problem: "Operations staff manually prepared flowcharts, PFMEA and Control Plan documents from technical drawings. A complete report could take a working day.",
                  contribution: "Built the workflow individually. Learned the requirements by reviewing examples and talking with operations colleagues about how they prepared the reports.",
                  implementation: "A LangGraph workflow performs structured extraction, generates the flowchart and analysis documents, and checks consistency before producing Excel/PDF outputs. Service Bus, Blob Storage and Django callbacks connect it to the application. Also deployed models and configured endpoints through Microsoft Foundry.",
                  validation: "Used the team's examples and requirements to guide output review, with cross-document consistency checks in the workflow. Operations colleagues used it on real work requests.",
                  outcome: "Operations staff used the workflow for real requests. Based on my observations, complete-report preparation fell from a working day to three minutes or less.",
                },
              },
              {
                title: "Financial data integration and reconciliation",
                description: "Owned client/provider coordination, historical loads and daily financial-data processing at Athena Systems. Traced a doubled account total to a changed provider file and corrected the ingestion rules.",
                workflow: "reconciliation" as const,
                tags: ["Python", "PowerShell", "SQL Server"],
                isPrivate: true,
                caseStudy: {
                  problem: "Athena's financial application needed historical and daily provider data to match the transaction activity and account totals shown to clients.",
                  contribution: "Coordinated fields and requirements directly with clients and providers in English, built ingestion and reconciliation flows, investigated discrepancies and communicated findings.",
                  implementation: "Python, PowerShell and SQL Server supported historical loads. Daily FIX transaction feeds and separate provider CSV reports over FTP/SFTP were processed using XML mappings, transformations and stored procedures, views and functions for reconciliation.",
                  validation: "Compared raw files, loaded records and reconciliation reports for missing activity, duplicate records, unexpected accounts and incorrect totals. Transformed and validated more than 10,000 transaction records.",
                  outcome: "Resolved a doubled account total caused by an unannounced CSV summary row. Added required-field filtering to exclude summary records, checked the corrected balance and sent the client a postmortem.",
                },
              },
              {
                title: "AI Manufacturing Assistant",
                description: "Built a conversational assistant for manufacturing quotations and part management, connecting technical-document retrieval with validated actions in the existing radii. application.",
                workflow: "assistant" as const,
                tags: ["Python", "Django", "LangChain", "LangGraph", "PostgreSQL", "React", "Azure"],
                isPrivate: true,
                caseStudy: {
                  problem: "Customers needed to find technical information and manage quotation details without moving between separate screens and documents.",
                  contribution: "Built the assistant's orchestration, document retrieval and quotation API integrations, and connected it to the React application.",
                  implementation: "LangChain and LangGraph orchestrate Azure OpenAI calls, retrieval over PostgreSQL/pgvector embeddings, and Django/DRF tools. The assistant handles conversational context, reads CAD-processing results and part details, and creates quotations or updates quantities and materials.",
                  validation: "Added permission checks, input validation and confirmation before quotation changes. Separated document retrieval from tools that modify application records.",
                  outcome: "Delivered a production chat workflow for technical questions, quotation creation, configuration changes and estimate requests within the manufacturing application.",
                },
              },
              {
                title: "Intelligent manufacturing pricing",
                description: "Replaced an earlier deterministic pricing approach with an ML engine combining learned CAD geometry features and structured manufacturing data to predict costs and flag unusual estimates.",
                workflow: "pricing" as const,
                tags: ["Python", "PyTorch", "XGBoost", "scikit-learn", "Machine Learning", "FastAPI", "Docker"],
                isPrivate: true,
                caseStudy: {
                  problem: "Manufacturing cost estimation needed to account for geometry, materials, quantities and production parameters beyond the existing deterministic pricing approach.",
                  contribution: "Built the feature-processing pipeline, PyTorch geometry feature extraction, XGBoost cost regression and FastAPI inference service.",
                  implementation: "PyTorch extracts numerical features from CAD representations. XGBoost combines these with dimensions, material properties, quantities and manufacturing parameters. pandas, NumPy and scikit-learn support preparation and evaluation; MLflow, serialized models and versioning support repeatable inference.",
                  validation: "Compared ML estimates with the previous deterministic approach using MAE, RMSE and error analysis across unusual manufacturing cases. Added checks for unusual inputs and predictions requiring manual review.",
                  outcome: "Delivered an operational ML pricing service that returns predicted manufacturing costs and flags estimates for review, replacing the earlier deterministic approach while retaining it for comparison.",
                },
              },
              {
                title: "Production container infrastructure on Azure",
                description: "Managed Django APIs and background workers on Azure Kubernetes Service using Terraform and Kubernetes, with health checks, rolling updates, automated delivery and infrastructure monitoring.",
                workflow: "infrastructure" as const,
                tags: ["Azure", "Kubernetes", "Terraform", "Docker", "GitHub Actions"],
                isPrivate: true,
                caseStudy: {
                  problem: "Containerized backend services and workers needed repeatable configuration, controlled releases and operational visibility in production.",
                  contribution: "Configured and managed production Kubernetes resources on Azure using Terraform, and worked on container delivery and monitoring.",
                  implementation: "Managed Deployments, Services, namespaces, ConfigMaps and Secrets, with readiness/liveness probes, resource limits and rolling updates. Used GitHub Actions for delivery and Grafana for monitoring dashboards alongside Django services, PostgreSQL and RabbitMQ. This environment is separate from the Azure Container Apps and AWS ECS deployments described in other projects.",
                  validation: "Used automated testing, image builds and deployment validation in GitHub Actions, health probes and application/infrastructure metrics to check service behavior and releases.",
                  outcome: "Supported production containerized services with repeatable Kubernetes configuration, monitored workloads and controlled rolling deployments.",
                },
              },
              {
                title: "Manufacturing analytics with Databricks",
                description: "Built a Databricks analytics pipeline at radii. using real manufacturing quotation and CAD-processing data, with bronze, silver and gold Delta tables, scheduled batch workflows and SQL dashboards.",
                context: "Professional work · radii.",
                isPrivate: true,
                workflow: "analytics" as const,
                tags: ["Databricks", "Apache Spark", "Delta Lake", "Python"],
                caseStudy: {
                  problem: "Manufacturing quotation records and CAD-processing metrics needed consistent analytical datasets for operational reporting at radii.",
                  contribution: "Built the ingestion and transformation notebooks, cleaning and validation rules, scheduled workflows and dashboards using real radii. manufacturing datasets.",
                  implementation: "PySpark and Spark SQL transform CSV/Parquet inputs into bronze, silver and gold Delta Lake tables. Databricks SQL dashboards show quotation volumes, material trends, processing durations and failed-job trends.",
                  validation: "Applied cleaning and validation rules to quotation records, material specifications and processing metrics; added monitoring to repeatable batch workflows and inspected the resulting SQL analyses and dashboards.",
                  outcome: "Delivered a manufacturing analytics workflow used at radii., turning real quotation and CAD-processing records into queryable Delta tables and dashboards for operational analysis.",
                },
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
                  "Personal research-to-video workflow using Google Cloud and Gemini for AI processing, ElevenLabs narration, visual sourcing, Remotion rendering and FFmpeg assembly. Includes checkpoints, retries, validation feedback and cost tracking.",
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
                title: "Athena Support Operations Tool",
                description:
                  "Built a Flask/ORM interface to simplify repetitive database operations during client support. I informally estimated about 30% less time on my recurring tasks; team benefits were qualitative, not a measured ticket-resolution KPI.",
                image: "/assets/athena.png?height=400&width=600",
                tags: ["Python", "Flask", "MSSQL"],
                websiteUrl: "https://www.athenasystems.com/",
                websiteLogo: "/assets/athenaSystems.png",
                isPrivate: true,
              },
              {
                title: "Coffee Shop Chatbot",
                hidden: true,
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
                title: "ObjectBuilder Studio",
                description:
                  "Windows desktop editor for browsing, editing, and exporting Open Tibia DAT/SPR assets. Supports object properties, animations, composed sprite previews, bulk sprite replacement, undo/redo, and verified paired exports for OTServ, OTCv8, PXG, and PokeTibia clients.",
                image: "/assets/objectbuilder-studio/staticpreview.png",
                imagePosition: "object-top",
                screenshots: [
                  {
                    src: "/assets/objectbuilder-studio/staticpreview.png",
                    alt: "ObjectBuilder Studio asset editing workspace",
                    width: 1456,
                    height: 906,
                  },
                  {
                    src: "/assets/objectbuilder-studio/previewimage.gif",
                    alt: "ObjectBuilder Studio editing DAT and SPR assets",
                    width: 1280,
                    height: 720,
                  },
                ],
                tags: ["Electron", "React", "Typescript"],
                codeUrl: "https://github.com/NesDevr/objectbuilder-studio",
              },
              {
                title: "Backtesting Trading Strategies",
                description:
                  "Data-intensive application that simulates trading strategies against historical market data. Processes 10,000+ data points to generate performance metrics, risk analysis reports, and visual comparisons for evaluating strategy behavior.",
                image: "/assets/trading.png?height=400&width=600",
                tags: ["Python", "MSSQL", "Streamlit"],
                codeUrl: "https://github.com/NesDevr/BacktestingStrategies",
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
              },
            ]
              .filter((project: Project) => !project.hidden && Boolean(project.image || project.screenshots?.length))
              .filter(
                (_project: Project, index) => showAllProjects || index < 6,
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
                  if (event.target !== event.currentTarget) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedScreenshotIndex(0);
                    setSelectedProject(project);
                  }
                }}
                className="animate-in fade-in slide-in-from-bottom-3 overflow-hidden duration-300 dark:bg-slate-800 dark:border-slate-700 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <div className="relative h-44 bg-slate-950">
                  {project.workflow ? (
                    <WorkflowPreview kind={project.workflow} />
                  ) : (
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className={`object-cover ${project.imagePosition ?? ""}`}
                    />
                  )}
                </div>
                <CardContent className="p-5">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
                    {project.context ?? (project.isPrivate ? "Professional work" : "Personal project")}
                  </p>
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
                  ) : selectedProject.workflow ? (
                    <WorkflowPreview kind={selectedProject.workflow} expanded />
                  ) : (
                    <div className="relative min-h-[280px] bg-slate-950 sm:min-h-[420px]">
                      <Image
                        src={selectedProject.image || "/placeholder.svg"}
                        alt={selectedProject.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="space-y-5 p-6 sm:p-8">
                    <DialogHeader>
                      <p className="text-xs font-medium uppercase tracking-wider text-primary">
                        {selectedProject.context ?? (selectedProject.isPrivate ? "Professional work" : "Personal project")}
                      </p>
                      <DialogTitle className="text-2xl dark:text-white">
                        {selectedProject.title}
                      </DialogTitle>
                      <DialogDescription className="text-base leading-7 dark:text-slate-300">
                        {selectedProject.description}
                      </DialogDescription>
                    </DialogHeader>
                    {selectedProject.caseStudy && (
                      <dl className="grid gap-5 border-y border-slate-700 py-5 sm:grid-cols-2">
                        {[
                          ["The problem", selectedProject.caseStudy.problem],
                          ["My contribution", selectedProject.caseStudy.contribution],
                          ["How it works", selectedProject.caseStudy.implementation],
                          ["How I checked it", selectedProject.caseStudy.validation],
                          ["The result", selectedProject.caseStudy.outcome],
                        ].map(([label, text]) => (
                          <div key={label} className={label === "The result" ? "sm:col-span-2" : ""}>
                            <dt className="mb-2 text-sm font-semibold text-primary">{label}</dt>
                            <dd className="text-sm leading-6 text-slate-300">{text}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
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
                program: "Industrial Engineering",
                institution: "Instituto Tecnológico de Ciudad Madero",
                period: "2019–2023",
              },
              {
                program: "Software Engineering",
                institution: "Instituto Tecnológico de Ciudad Madero",
                period: "2017–2019",
              },
            ].map((edu) => (
              <Card
                key={edu.program}
                className="p-6 dark:bg-slate-800 dark:border-slate-700"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold dark:text-white">
                      {edu.program}
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
              </Card>
            ))}
            <p className="text-sm text-muted-foreground dark:text-slate-300">
              Spanish (native) · English (advanced professional proficiency)
            </p>
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
