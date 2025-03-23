"use client";

import { useState, useEffect } from "react";
import {
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Moon,
  Sun,
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
  const [theme, setTheme] = useState<"light" | "dark">("dark"); // Set default to dark

  // Apply theme class to document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll to top button when scrolled down
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Update active section based on scroll position
      const sections = ["home", "about", "projects", "experience"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
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
                { id: "projects", label: "Projects" },
                { id: "experience", label: "Experience" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-base font-medium hover:text-primary transition-colors ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground dark:text-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={
                  theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
                className="dark:text-white dark:hover:text-white"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={
                  theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
                className="dark:text-white dark:hover:text-white"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
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
                I enjoy building backend solutions and working with data
                analysis to create efficient, data-driven systems.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  className="dark:text-white dark:border-slate-600 dark:hover:bg-slate-800"
                >
                  Download CV
                </Button>
                <Button onClick={() => scrollToSection("projects")}>
                  View My Work
                </Button>
              </div>
              <div className="flex space-x-4 mt-8">
                <Link
                  href="https://github.com"
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
                  href="https://linkedin.com"
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
                <Link href="mailto:contact@example.com">
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
                  src="/Nestor_Athena_Web.png?height=320&width=320"
                  alt="Nestor Garcia"
                  fill
                  className="object-cover"
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
              <p className="text-muted-foreground dark:text-slate-300 mb-4">
                I'm a passionate frontend developer with 2+ years of experience
                building modern web applications. I specialize in React,
                Next.js, and Tailwind CSS, focusing on creating responsive and
                accessible user interfaces.
              </p>
              <p className="text-muted-foreground dark:text-slate-300 mb-4">
                My journey in web development started when I was in college, and
                I've been in love with creating things for the web ever since. I
                enjoy solving complex problems and turning ideas into reality
                through code.
              </p>
              <p className="text-muted-foreground dark:text-slate-300 mb-6">
                When I'm not coding, you can find me hiking, reading, or
                experimenting with new technologies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12 items-start">
              {/* Columna Izquierda - Hard Skills */}
              <Card className="text-center p-6 dark:bg-slate-800 dark:border-slate-700 w-full shadow-md">
                <CardContent className="p-0 pt-4">
                  <h3 className="text-2xl font-bold mb-6 dark:text-white">
                    Hard Skills
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4 place-items-center">
                    {[
                      { src: "/icons/python.png", label: "Python" },
                      { src: "/icons/django.png", label: "Django" },
                      { src: "/icons/SQL.png", label: "SQL" },
                      { src: "/icons/docker.png", label: "Docker" },
                      { src: "/icons/Excel.png", label: "Excel" },
                      { src: "/icons/laravel.png", label: "Laravel" },
                      { src: "/icons/git.png", label: "Git" },
                      { src: "/icons/js.png", label: "JavaScript" },
                      { src: "/icons/react.png", label: "React" },
                    ].map((skill, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center space-y-2 transition-transform duration-200 hover:scale-105"
                      >
                        <img
                          src={skill.src}
                          alt={skill.label}
                          className="h-10 w-10"
                        />
                        <span className="text-sm font-medium text-muted-foreground dark:text-slate-300">
                          {skill.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Columna Derecha - Soft Skills + Experience */}
              <div className="flex flex-col space-y-6 w-full">
                {/* Soft Skills */}
                <Card className="dark:bg-slate-800 dark:border-slate-700 w-full shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 dark:text-white text-center">
                      Soft Skills
                    </h3>
                    <ul className="flex flex-wrap justify-center gap-3 text-muted-foreground dark:text-slate-300">
                      {[
                        "Problem-solving",
                        "Time Management",
                        "Adaptability",
                        "Collaboration",
                        "Communication",
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
                <Card className="text-center p-6 dark:bg-slate-800 dark:border-slate-700 w-full shadow-md">
                  <CardContent className="p-0 pt-8 pb-8">
                    <p className="text-4xl font-bold text-primary mb-2">2+</p>
                    <p className="text-muted-foreground dark:text-slate-300">
                      Years Experience
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
            My Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Point of sale system",
                description:
                  "A full-featured point of sale system built with modules like products, sales, users, roles, focus on solving day to day operations of a store and with a database.",
                image: "/assets/pos.png?height=400&width=600",
                tags: ["Laravel", "Tailwind CSS", "Livewire", "PHP", "SQL"],
              },
              {
                title: "Backtesting Trading Strategies",
                description:
                  "A backtesting app to aid when creating a new strategy and put it into a test against historical data.",
                image: "/assets/trading.png?height=400&width=600",
                tags: ["Python", "SQL", "Streamlit"],
              },
              {
                title: "Alien Invasion Pygame",
                description:
                  "The classic arcade Alien invasion game, developed using Python and Pygame ",
                image: "/assets/pygame.png?height=400&width=600",
                tags: ["Python", "Pygame"],
              },
              {
                title: "Weather Dashboard",
                description:
                  "A weather application that displays current and forecasted weather data.",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["React", "API Integration", "Chart.js"],
              },
              {
                title: "Recipe Finder",
                description:
                  "An app that helps users find recipes based on ingredients they have.",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["Next.js", "Tailwind CSS", "API Integration"],
              },
              {
                title: "Blog Platform",
                description:
                  "A content management system for creating and managing blog posts.",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["React", "Node.js", "MongoDB"],
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="dark:border-slate-600 dark:text-white dark:hover:bg-slate-700"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                    <Button size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
            Work Experience
          </h2>
          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              {
                role: "Senior Frontend Developer",
                company: "Tech Innovations Inc.",
                period: "2021 - Present",
                description:
                  "Lead the frontend development team in building and maintaining multiple web applications. Implemented modern frontend architecture and improved performance by 40%.",
                responsibilities: [
                  "Developed and maintained multiple React applications",
                  "Implemented responsive designs and ensured cross-browser compatibility",
                  "Collaborated with UX/UI designers to implement new features",
                  "Mentored junior developers and conducted code reviews",
                ],
              },
              {
                role: "Frontend Developer",
                company: "Digital Solutions Ltd.",
                period: "2019 - 2021",
                description:
                  "Worked on various client projects, developing responsive and accessible web applications using React and related technologies.",
                responsibilities: [
                  "Built responsive web applications using React and Redux",
                  "Collaborated with backend developers to integrate APIs",
                  "Implemented UI components following design specifications",
                  "Participated in agile development processes",
                ],
              },
              {
                role: "Junior Web Developer",
                company: "WebCraft Agency",
                period: "2017 - 2019",
                description:
                  "Started as an intern and grew into a full-time role. Worked on various client websites and internal tools.",
                responsibilities: [
                  "Developed and maintained client websites using HTML, CSS, and JavaScript",
                  "Assisted senior developers with larger projects",
                  "Created responsive layouts and implemented basic animations",
                  "Troubleshot and fixed bugs in existing websites",
                ],
              },
            ].map((job, index) => (
              <Card
                key={index}
                className="p-6 dark:bg-slate-800 dark:border-slate-700"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold dark:text-white">
                      {job.role}
                    </h3>
                    <p className="text-primary">{job.company}</p>
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
                <div>
                  <h4 className="font-semibold mb-2 dark:text-white">
                    Key Responsibilities:
                  </h4>
                  <ul className="list-disc pl-5 text-muted-foreground dark:text-slate-300 space-y-1">
                    {job.responsibilities.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
            Get In Touch
          </h2>
          <div className="max-w-md mx-auto text-center">
            <p className="text-muted-foreground dark:text-slate-300 mb-6">
              I'm currently open to new opportunities. If you have a project
              that needs my expertise or just want to chat, feel free to reach
              out!
            </p>
            <Button className="w-full sm:w-auto">
              <Mail className="h-4 w-4 mr-2" />
              contact@example.com
            </Button>
            <div className="flex justify-center space-x-4 mt-8">
              <Link
                href="https://github.com"
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
                href="https://linkedin.com"
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
