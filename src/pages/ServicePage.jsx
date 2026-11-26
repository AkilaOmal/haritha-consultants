import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/services';
import './ServicePage.css';

function ServicePage() {
  const { slug } = useParams();

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return (
      <main className="section container">
        <h1>Service Not Found</h1>
        <Link to="/">Back to Home</Link>
      </main>
    );
  }

  return (
    <main className="service-page">

      {/* Service Hero */}
      <section className="service-hero">
        <div className="container">

          <div className="service-breadcrumb">
            <Link to="/">Home</Link>
            <span> / </span>
            <a href="/#services">Services</a>
            <span> / {service.title}</span>
          </div>

          <span className="service-label">
            Engineering Consultancy
          </span>

          <h1>{service.title}</h1>

          <p>{service.description}</p>

          <a href="/#contact" className="service-cta">
            Discuss Your Project
            <ArrowRight size={18} />
          </a>

        </div>
      </section>

      {/* Service Overview */}
      <section className="section">
        <div className="container">
          <h2>Service Overview</h2>
          <p>{service.description}</p>
        </div>
      </section>

    </main>
  );
}

export default ServicePage;