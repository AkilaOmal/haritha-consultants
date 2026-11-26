import { useState } from 'react';
import { Menu, MoonStar, SunMedium, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'Projects', href: '/#projects' },
  { label: 'About', href: '/#about' },
  { label: 'Insights', href: '/#blog' },
  { label: 'Contact', href: '/#contact' },
];

function Header({ theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="container nav-bar">

        <a href="/#home" className="brand"
          aria-label="Haritha Consultants home">
          <img
            src="/haritha-logo.webp"
            alt="Haritha Consultants"
          />
          <span className="brand-text">
            Haritha Consultants
          </span>
        </a>

        <nav
          className={`nav ${menuOpen ? 'open' : ''}`}
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            aria-label={
              theme === 'light'
                ? 'Switch to dark mode'
                : 'Switch to light mode'
            }
            onClick={() =>
              setTheme((currentTheme) =>
                currentTheme === 'light' ? 'dark' : 'light'
              )
            }
          >
            {theme === 'light'
              ? <MoonStar size={18} />
              : <SunMedium size={18} />}

            <span>
              {theme === 'light' ? 'Dark' : 'Light'}
            </span>
          </button>

          <a className="primary-btn nav-cta" href="/#contact">
            Request a Quote
          </a>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>
    </header>
  );
}

export default Header;