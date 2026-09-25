import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kevin Carl A. Acebuche — CV",
  robots: { index: false },
};

// Web version of the resume (public/assets/Kevin-Acebuche-CV.pdf is the
// original PDF). The in-page viewer loads this page with ?embed=1 (no toolbar).
// Keep the text in sync with the PDF when the resume changes.
export default async function CvPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const embed = "embed" in (await searchParams);

  return (
    <div className="cvdoc">
      {!embed && (
        <div className="cv-toolbar">
          <span>Kevin Acebuche — CV</span>
          <div>
            <Link className="cv-ghost" href="/">
              Back to portfolio
            </Link>{" "}
            <a href={site.cvPdf} download={site.cvFileName}>
              Download PDF
            </a>
          </div>
        </div>
      )}

      <main className="cv-page">
        <header className="cv-head">
          <div>
            <h1>Kevin Carl A. Acebuche</h1>
            <p className="cv-role">Electronics Engineering</p>
          </div>
          <ul className="cv-contact">
            <li>
              <a href="mailto:kvncrlacebuche@gmail.com">kvncrlacebuche@gmail.com</a>
            </li>
            <li>
              <a href="tel:+639361955464">+63 936 195 5464</a>
            </li>
            <li>Teresa, Rizal, Philippines</li>
            <li>
              <a href={site.url}>kevindev.vercel.app</a>
            </li>
            <li>
              <a href={site.linkedin}>linkedin.com/in/kvndvlpr</a>
            </li>
          </ul>
        </header>

        <div className="cv-main">
          <section>
            <h2>Summary</h2>
            <p className="cv-summary">
              Electronics &amp; Communications Engineering graduate with hands-on experience in technical support, web
              development, CRM platforms, workflow automation, and digital operations. Experienced in building and
              maintaining web-based projects, configuring digital workflows, supporting users and technical systems, and
              working with CRM and automation tools. Currently developing a portfolio focused on web applications, CRM
              workflows, AI, automation, and practical digital solutions, with a strong foundation in HTML, CSS,
              JavaScript, SQL, CRM platforms, and technical troubleshooting, along with a continuous commitment to
              expanding skills in AI, automation, and software technologies.
            </p>
          </section>

          <section>
            <h2>Professional experience</h2>
            {experience.map((job) => (
              <div key={job.title} className="cv-item">
                <div className="cv-item-head">
                  <h3>{job.title}</h3>
                  <span className="cv-when">{job.when}</span>
                </div>
                {job.where && <p className="cv-where">{job.where}</p>}
                <ul>
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2>Projects</h2>
            {projectItems.map((pr) => (
              <div key={pr.title} className="cv-item">
                <div className="cv-item-head">
                  <h3>{pr.title}</h3>
                </div>
                {pr.link && (
                  <p className="cv-where">
                    <a className="cv-link" href={`https://${pr.link}`}>
                      {pr.link}
                    </a>
                  </p>
                )}
                <ul>
                  {pr.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2>Education</h2>
            <div className="cv-item">
              <div className="cv-item-head">
                <h3>Bachelor of Science in Electronics Engineering</h3>
                <span className="cv-when">Aug 2021 – Jul 2025</span>
              </div>
              <p className="cv-where">University of Rizal System Morong · Morong Campus</p>
              <p className="cv-where">Relevant coursework:</p>
              <ul>
                {coursework.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <aside>
          <section>
            <h2>Skills</h2>
            {skillGroups.map((g) => (
              <div key={g.title} className="cv-group">
                <h3>{g.title}</h3>
                <ul className="cv-tags">
                  {g.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2>Certifications</h2>
            <ul className="cv-plain">
              <li>
                <strong>Introduction to HTML, CSS, JavaScript, SQL and Python</strong>
                <small>SoloLearn</small>
              </li>
              <li>
                <strong>The Origins I: HTML and CSS</strong>
                <small>CodeX</small>
              </li>
              <li>
                <strong>Canva</strong>
              </li>
              <li>
                <strong>Digital Marketing Training</strong>
              </li>
            </ul>
          </section>

          <section>
            <h2>Additional experiences</h2>
            <ul className="cv-plain">
              <li>
                <strong>Technical Representative</strong>
                <small>IECEP Rizal Chapter</small>
              </li>
              <li>
                <strong>Technical Representative</strong>
                <small>IECEP URSM Student Chapter</small>
              </li>
              <li>
                <strong>Student Representative</strong>
              </li>
              <li>
                <strong>Vice President – Internal</strong>
              </li>
              <li>
                <strong>President / Organizational Leadership Experience</strong>
                <small>Aug 2021 – Jul 2025</small>
              </li>
            </ul>
          </section>
        </aside>

        <footer className="cv-foot">
          <span>Kevin Carl A. Acebuche · Electronics Engineering</span>
          <span>References available on request</span>
        </footer>
      </main>
    </div>
  );
}

const experience = [
  {
    title: "Technical Support Representative",
    where: "Medical Healthcare Account",
    when: "Mar 2026 – Sep 2026",
    points: [
      "Provided technical support and troubleshooting for system and user-related issues.",
      "Diagnosed problems, identified root causes, and provided appropriate technical solutions.",
      "Navigated multiple systems and digital tools to investigate and resolve issues efficiently.",
      "Documented technical issues, troubleshooting steps, and resolutions accurately.",
      "Escalated complex issues to specialized teams with complete technical documentation.",
      "Applied problem-solving, system navigation, and technical troubleshooting skills in a fast-paced environment.",
    ],
  },
  {
    title: "Digital Marketing Trainee",
    when: "Jan 2026 – Feb 2026",
    points: [
      "Completed hands-on training in CRM systems, workflow automation, email marketing, customer support, and lead management using GoHighLevel and ActiveCampaign.",
    ],
  },
  {
    title: "Engineering Internship",
    when: "Jun 2025 – Aug 2025",
    points: [
      "Assisted the Engineering Department with technical support and troubleshooting.",
      "Organized and analyzed operational data using Microsoft Excel.",
      "Utilized Excel functions including IF, VLOOKUP, Sorting, and Filtering.",
      "Maintained technical documentation and internal reports.",
      "Supported administrative and engineering operations.",
    ],
  },
];

const projectItems = [
  {
    title: "AI-Based Eggplant Leaf Disease Detection (Thesis)",
    points: [
      "Developed a deep learning-based disease classification system using Roboflow and Raspberry Pi.",
      "Prepared and augmented image datasets for AI model training.",
      "Implemented real-time disease detection and treatment recommendations.",
    ],
  },
  {
    title: "Daywell – Full-Stack Planner Web App",
    link: "daywell-project.vercel.app",
    points: [
      "Built a full-stack daily planner with Next.js 16, React 19, TypeScript, and Supabase, deployed on Vercel.",
      "Implemented email-confirmed authentication, recurring tasks, a focus timer, a calendar with events, and daily progress tracking.",
      "Used Claude Code as an AI pair programmer from spec to production, and reviewed every change to the data model, security, and UI.",
    ],
  },
  {
    title: "Agham Setlist – Worship Team Setlist Manager",
    link: "setlist-agham.vercel.app",
    points: [
      "Developed a mobile-friendly web app to manage worship lineups, chords, and lyrics for a church youth team.",
      "Designed it as an installable web app so members can pull up setlists quickly on their phones during practice and service.",
      "Deployed on Vercel and maintained it based on feedback from the team.",
    ],
  },
  {
    title: "Personal Portfolio Website",
    link: "kevindev.vercel.app",
    points: [
      "Rebuilt my portfolio with Next.js, Tailwind CSS, and shadcn/ui, deployed on Vercel with a responsive layout and light/dark mode.",
      'Designed interactive sections, including an 8-card "Beyond the code" carousel, an unfold-to-view project showcase, and hover cards for each technology.',
      "Built with Claude Code as an AI pair programmer, reviewing every change before deploying, and added a downloadable CV and a contact form that opens a pre-filled email.",
    ],
  },
];

const coursework = [
  "Data Analysis and Reporting",
  "Technical Documentation",
  "Hardware and Software Troubleshooting",
  "Programming Fundamentals",
  "AI-Based System Development",
  "Problem Solving",
  "Research and System Design",
];

const skillGroups = [
  { title: "Web development", tags: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind"] },
  { title: "Backend & data", tags: ["SQL", "PostgreSQL", "Supabase", "Microsoft Excel"] },
  {
    title: "AI & automation",
    tags: ["Claude Code", "AI-assisted development", "Workflow automation", "GoHighLevel", "ActiveCampaign", "Typeform", "Calendly"],
  },
  { title: "Technical support", tags: ["Troubleshooting", "Root-cause analysis", "Documentation", "Escalation"] },
  {
    title: "Tools",
    tags: ["Git & GitHub", "Vercel", "Vitest", "Playwright", "Google Workspace", "ClickUp", "Canva", "Loom"],
  },
];
