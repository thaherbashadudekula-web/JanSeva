import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '5rem 1rem', textAlign: 'center', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-main)' }}>
        Page Not Found / పేజీ కనుగొనబడలేదు
      </h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
        The page you are looking for does not exist or has been relocated in the demo system.
      </p>
      <Link href="/" className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
        Return to Home / హోమ్‌కు వెళ్లండి
      </Link>
    </div>
  );
}

