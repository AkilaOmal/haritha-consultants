import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  const [theme, setTheme] = useState('light');

  return (
    <div className={`page-shell ${theme}`}>

      <Header theme={theme} setTheme={setTheme} />

      <Outlet />

      <Footer />

    </div>
  );
}

export default Layout;

