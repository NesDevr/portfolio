"use client";

import { useState, useEffect } from "react";
import { ArrowUp, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="text-xl font-bold">John Doe</div>
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
                  className={`text-sm font-medium hover:text-primary transition-colors ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                Menu
              </Button>
            </div>
          </nav>
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 flex justify-center p-4 z-50">
              <div className="bg-background border rounded-lg shadow-lg w-[90%] max-w-sm animate-in fade-in slide-in-from-top-4 duration-300">
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
                      className={`px-4 py-2 rounded-md text-left text-sm font-medium hover:bg-muted transition-colors ${
                        activeSection === item.id
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground"
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Hi, I'm <span className="text-primary">John Doe</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground mb-6">
                Frontend Developer
              </h2>
              <p className="text-muted-foreground max-w-md mb-8">
                I build accessible, responsive, and performant web applications
                with modern technologies.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => scrollToSection("projects")}>
                  View My Work
                </Button>
                <Button variant="outline">Download CV</Button>
              </div>
              <div className="flex space-x-4 mt-8">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="mailto:contact@example.com">
                  <Button variant="ghost" size="icon">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="John Doe"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-muted-foreground mb-4">
                I'm a passionate frontend developer with 5 years of experience
                building modern web applications. I specialize in React,
                Next.js, and Tailwind CSS, focusing on creating responsive and
                accessible user interfaces.
              </p>
              <p className="text-muted-foreground mb-4">
                My journey in web development started when I was in college, and
                I've been in love with creating things for the web ever since. I
                enjoy solving complex problems and turning ideas into reality
                through code.
              </p>
              <p className="text-muted-foreground mb-6">
                When I'm not coding, you can find me hiking, reading, or
                experimenting with new technologies.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold mb-2">Skills</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>JavaScript / TypeScript</li>
                    <li>React / Next.js</li>
                    <li>HTML / CSS</li>
                    <li>Tailwind CSS</li>
                    <li>UI/UX Design</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Education</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>B.S. Computer Science</li>
                    <li>University of Technology</li>
                    <li>2015 - 2019</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Years Experience", value: "5+" },
                { label: "Projects Completed", value: "30+" },
                { label: "Satisfied Clients", value: "20+" },
                { label: "Certifications", value: "4" },
              ].map((stat, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="p-0 pt-6">
                    <p className="text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "E-commerce Website",
                description:
                  "A full-featured online store built with Next.js and Tailwind CSS.",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["Next.js", "Tailwind CSS", "Stripe"],
              },
              {
                title: "Task Management App",
                description:
                  "A productivity app for managing tasks and projects with team collaboration features.",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["React", "TypeScript", "Firebase"],
              },
              {
                title: "Portfolio Website",
                description:
                  "A responsive portfolio website showcasing my work and skills.",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
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
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
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
          <h2 className="text-3xl font-bold mb-8 text-center">
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
              <Card key={index} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{job.role}</h3>
                    <p className="text-primary">{job.company}</p>
                  </div>
                  <Badge variant="outline" className="mt-2 md:mt-0 w-fit">
                    {job.period}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{job.description}</p>
                <div>
                  <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
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
          <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
          <div className="max-w-md mx-auto text-center">
            <p className="text-muted-foreground mb-6">
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
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} John Doe. All rights reserved.
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
