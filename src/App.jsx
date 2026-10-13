import { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Compass,
  Gauge,
  Globe2,
  HardHat,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MoonStar,
  Phone,
  ShieldCheck,
  Sparkles,
  SunMedium,
  X,
} from 'lucide-react';
import './App.css';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Insights', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const trustPoints = [
  { icon: Globe2, label: 'Global project experience' },
  { icon: Building2, label: 'MEP design expertise' },
  { icon: Leaf, label: 'Sustainability-led thinking' },
];

const services = [
  {
    icon: Gauge,
    title: 'SAP Calculations',
    description:
      'Accurate energy performance calculations and technical reporting to support compliant building design.',
    href: 'https://haritha.co.uk/services/',
  },
  {
    icon: SunMedium,
    title: 'Daylight / Sunlight Assessment',
    description:
      'BRE 209-compliant daylight and sunlight reviews to help shape well-lit, comfortable projects.',
    href: 'https://haritha.co.uk/services/',
  },
  {
    icon: Sparkles,
    title: 'TM59 / Part O Overheating Assessments',
    description:
      'Thermal comfort analysis that supports overheating risk assessment and design optimisation.',
    href: 'https://haritha.co.uk/services/',
  },
  {
    icon: ShieldCheck,
    title: 'SBEM / DSM Calculation Services',
    description:
      'Building compliance calculations designed to help projects align with performance and regulatory requirements.',
    href: 'https://haritha.co.uk/services/',
  },
];

const projects = [
  {
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80',
    title: 'MEP Design, Energy Simulation & BIM/CAD Modeling',
    category: 'MEP Design',
    href: 'https://haritha.co.uk/portfolio-new/mep-design/',
  },
  {
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
    title: 'Part O Compliance and TM59 Overheating Analysis',
    category: 'Thermal Comfort',
    href: 'https://haritha.co.uk/portfolio-new/over-heating/',
  },
  {
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    title: 'Radiant Heating and Snow Melting System Design',
    category: 'System Design',
    href: 'https://haritha.co.uk/portfolio-new/radiant-heating/',
  },
  {
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
    title: 'Manual J S D and Manual N Design Calculation',
    category: 'Load Calculation',
    href: 'https://haritha.co.uk/portfolio-new/manual-j/',
  },
  {
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    title: 'Florida 2023 R405 Energy Compliance: ResCheck and ComCheck Analysis',
    category: 'Energy Compliance',
    href: 'https://haritha.co.uk/portfolio-new/florida/',
  },
  {
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80',
    title: 'Assessment of Daylight and Sunlight Compliance with BRE 209 Guidelines and Impact Evaluation',
    category: 'Daylight Analysis',
    href: 'https://haritha.co.uk/portfolio-new/day-light/',
  },
];

const reasons = [
  {
    icon: HardHat,
    title: 'Engineering expertise',
    description: 'Practical, design-led engineering support from concept through delivery.',
  },
  {
    icon: Compass,
    title: 'Client-focused solutions',
    description: 'Responsive collaboration and tailored strategies for each project brief.',
  },
  {
    icon: Leaf,
    title: 'Sustainability-conscious design',
    description: 'Performance-led thinking that supports efficient, high-quality building outcomes.',
  },
  {
    icon: Globe2,
    title: 'International experience',
    description: 'A global outlook shaped by projects across multiple regions and sectors.',
  },
];

const blogPosts = [
  {
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    title: 'Designing Net Zero Buildings',
    excerpt:
      'Exploring the essentials of net zero building design, sustainable materials, and efficient strategies.',
    href: 'https://haritha.co.uk/blog/',
  },
  {
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
    title: 'Understanding Carbon Footprint',
    excerpt:
      'A practical guide to key carbon sources, emissions impacts, and opportunities for reduction.',
    href: 'https://haritha.co.uk/blog/',
  },
  {
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    title: 'The Future Unfolded: Digital Twins in MEP Design',
    excerpt:
      'How digital twin technology is transforming the way buildings are designed, managed, and maintained.',
    href: 'https://haritha.co.uk/blog/',
  },
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  service: 'General Enquiry',
  message: '',
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: 'error',
        message:
          'EmailJS is not configured yet. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your environment to enable form delivery.',
      });
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          project_type: formData.service,
          message: formData.message || 'No additional message provided.',
        },
        publicKey,
      );

      setStatus({
        type: 'success',
        message: 'Your enquiry has been sent successfully. We will be in touch shortly.',
      });
      setFormData(initialForm);
    } catch {
      setStatus({
        type: 'error',
        message: 'Something went wrong while sending your message. Please email info@haritha.co.uk directly.',
      });
    }
  };

  return (
    <div className={`page-shell ${theme}`}>
      <header className="topbar">
        <div className="container nav-bar">
          <a href="#home" className="brand" aria-label="Haritha Consultants home">
            <span className="brand-mark">HC</span>
            <span className="brand-text">Haritha Consultants</span>
          </a>

          <nav className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              onClick={() => setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))}
            >
              {theme === 'light' ? <MoonStar size={18} /> : <SunMedium size={18} />}
              <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>

            <a className="primary-btn nav-cta" href="#contact">
              Request a Quote
            </a>
          </div>

          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              {/* <span className="eyebrow">MEP Design • Energy • BIM</span> */}
              <h1>Engineering Better Buildings. Designing a Sustainable Future.</h1>
              <p className="lead">
                Haritha Consultants delivers professional MEP design and building performance
                solutions for clients across the UK, Europe, and international markets.
              </p>

              <div className="hero-actions">
                <a href="#contact" className="primary-btn">
                  Discuss Your Project <ArrowRight size={18} />
                </a>
                <a href="#projects" className="secondary-btn">
                  Explore Our Projects
                </a>
              </div>

              <div className="trust-strip">
                {trustPoints.map(({ icon: Icon, label }) => (
                  <div key={label} className="trust-item">
                    <span className="icon-wrap">
                      <Icon size={18} />
                    </span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual" aria-label="Haritha building design visual">
              <div className="visual-card main-card">
                <img
                  src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern engineering consultancy office and architecture"
                />
              </div>
              <div className="floating-panel panel-top">
                <span className="panel-label">Trusted partner</span>
                <strong>MEP design consultancy</strong>
              </div>
              <div className="floating-panel panel-bottom">
                <span className="panel-label">International presence</span>
                <strong>UK • Sri Lanka • Singapore</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section intro" id="about">
          <div className="container intro-grid">
            <div className="intro-media">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                alt="Engineering professionals reviewing project plans"
              />
            </div>

            <div className="intro-copy">
              <span className="eyebrow dark">About Haritha Consultants</span>
              <h2>Trusted partner in delivering MEP design solutions</h2>
              <p>
                Haritha Consultants Limited stands as a distinguished MEP design firm in the
                vibrant heart of London, UK. With strategically located offices in Sri Lanka and
                Singapore, we bring our expertise to a global clientele.
              </p>
              <p>
                Innovation, sustainability, and client-centric focus are the pillars of our
                identity, creating a practical approach to building performance and design.
              </p>

              <ul className="check-list">
                <li>
                  <CheckCircle2 size={18} />
                  <span>MEP design consultancy expertise</span>
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  <span>Commitment to innovation and sustainable outcomes</span>
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  <span>Client-focused delivery with international experience</span>
                </li>
              </ul>

              <a href="#contact" className="secondary-btn">
                Learn More About Us
              </a>
            </div>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow dark">What we do</span>
              <h2>Specialist engineering consultancy services</h2>
            </div>

            <div className="service-grid">
              {services.map(({ icon: Icon, title, description, href }) => (
                <article key={title} className="service-card">
                  <div className="service-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <a href={href}>
                    Learn More <ArrowRight size={15} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section projects" id="projects">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <span className="eyebrow dark">Selected work</span>
                <h2>Portfolio of engineering and building performance projects</h2>
              </div>
              <a href="https://haritha.co.uk/portfolio-new/" className="text-link">
                View all projects <ArrowRight size={16} />
              </a>
            </div>

            <div className="project-grid">
              {projects.map(({ title, category, image, href }) => (
                <article key={title} className="project-card">
                  <img src={image} alt={title} />
                  <div className="project-meta">
                    <span>{category}</span>
                    <h3>{title}</h3>
                    <a href={href}>
                      View Project <ArrowRight size={15} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section reasons" id="why-us">
          <div className="container">
            <div className="section-heading center-heading">
              <span className="eyebrow dark">Why choose us</span>
              <h2>Professional, practical, and sustainability-minded</h2>
            </div>

            <div className="reason-grid">
              {reasons.map(({ icon: Icon, title, description }) => (
                <article key={title} className="reason-card">
                  <span className="reason-icon">
                    <Icon size={22} />
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section feature-band">
          <div className="container feature-band-inner">
            <div className="feature-copy">
              <span className="eyebrow light">Sustainable engineering</span>
              <h2>Designing more efficient, resilient buildings for the future.</h2>
            </div>
            <a href="#services" className="primary-btn light-btn">
              Explore Services
            </a>
          </div>
        </section>

        <section className="section blog" id="blog">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <span className="eyebrow dark">Insights</span>
                <h2>Expert perspectives for better building performance</h2>
              </div>
              <a href="https://haritha.co.uk/blog/" className="text-link">
                Read all articles <ArrowRight size={16} />
              </a>
            </div>

            <div className="blog-grid">
              {blogPosts.map(({ image, title, excerpt, href }) => (
                <article key={title} className="blog-card">
                  <img src={image} alt={title} />
                  <div className="blog-content">
                    <span className="tag">Insights</span>
                    <h3>{title}</h3>
                    <p>{excerpt}</p>
                    <a href={href}>
                      Read Article <ArrowRight size={15} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <span className="eyebrow dark">Let’s talk</span>
              <h2>Let’s Discuss Your Project</h2>
              <p>
                Whether you need MEP design support, compliance assessments, or building
                performance advice, our team is ready to help.
              </p>

              <div className="contact-list">
                <div className="contact-item">
                  <MapPin size={18} />
                  <div>
                    <strong>Haritha Consultants Limited</strong>
                    <span>06, Sutton Plaza, Sutton Court Road, SM1 4FS, Sutton, United Kingdom</span>
                  </div>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <a href="tel:+447402942751">+44 7402 947251</a>
                </div>
                <div className="contact-item">
                  <Mail size={18} />
                  <a href="mailto:info@haritha.co.uk">info@haritha.co.uk</a>
                </div>
              </div>

              <div className="office-blocks">
                <div>
                  <h3>Sri Lanka</h3>
                  <p>
                    Haritha Consultants Pvt Ltd
                    <br />
                    No.14, School Avenue, Nawala, Rajagiriya,
                    <br />
                    Sri Lanka
                  </p>
                </div>
                <div>
                  <h3>Singapore</h3>
                  <p>
                    Haritha Consultants Pte. Ltd
                    <br />
                    151, Chin Swee Road, #02-24 Manhattan House,
                    <br />
                    Singapore
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-form-wrap">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="field-row">
                  <label>
                    <span>Name</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </label>
                </div>

                <div className="field-row two-up">
                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </label>
                  <label>
                    <span>Telephone</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your number"
                    />
                  </label>
                </div>

                <div className="field-row">
                  <label>
                    <span>Project type</span>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                    >
                      <option>General Enquiry</option>
                      <option>SAP Calculations</option>
                      <option>Daylight / Sunlight Assessment</option>
                      <option>TM59 / Part O Overheating Assessments</option>
                      <option>SBEM / DSM Calculation Services</option>
                      <option>MEP Design</option>
                    </select>
                  </label>
                </div>

                <div className="field-row">
                  <label>
                    <span>Project details</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      placeholder="Tell us about your project requirements"
                    />
                  </label>
                </div>

                {status.message ? (
                  <p className={`form-status ${status.type}`}>{status.message}</p>
                ) : null}

                <button type="submit" className="primary-btn submit-btn">
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a href="#home" className="brand footer-brand">
              <span className="brand-mark">HC</span>
              <span className="brand-text">Haritha Consultants</span>
            </a>
            <p>
              Professional MEP design and building performance consultancy for commercial,
              residential, and sustainable projects.
            </p>
          </div>

          <div>
            <h3>Quick links</h3>
            <ul>
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="mailto:info@haritha.co.uk">info@haritha.co.uk</a>
              </li>
              <li>
                <a href="tel:+447402942751">+44 7402 947251</a>
              </li>
              <li>London, UK</li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Haritha Consultants</span>
          <span>Designed for engineering excellence</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
