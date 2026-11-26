import { useParams, Link } from 'react-router-dom';
import { services } from '../data/services';

function ServicePage() {
  const { slug } = useParams();

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return (
      <main>
        <h1>Service Not Found</h1>
        <Link to="/">Back to Home</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>{service.title}</h1>

      <p>{service.description}</p>

      <Link to="/">Back to Home</Link>
    </main>
  );
}

export default ServicePage;