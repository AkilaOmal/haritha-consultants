const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'Projects', href: '/#projects' },
  { label: 'About', href: '/#about' },
  { label: 'Insights', href: '/#blog' },
  { label: 'Contact', href: '/#contact' },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">

        {/* Company Information */}
        <div>
          <a href="/#home" className="brand footer-brand">
            <img
              src="/haritha-logo.webp"
              alt="Haritha Consultants"
            />
            <span className="brand-text">
              Haritha Consultants
            </span>
          </a>

          <p>
            Professional MEP design and building performance
            consultancy for commercial, residential, and
            sustainable projects.
          </p>
        </div>

        {/* Quick Links */}
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

        {/* Contact Information */}
        <div>
          <h3>Contact</h3>

          <ul>
            <li>
              <a href="mailto:info@haritha.co.uk">
                info@haritha.co.uk
              </a>
            </li>

            <li>
              <a href="tel:+447402942751">
                +44 7402 947251
              </a>
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
  );
}

export default Footer;