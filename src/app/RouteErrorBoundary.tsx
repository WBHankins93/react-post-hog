import { Link, useRouteError } from 'react-router-dom';

export function RouteErrorBoundary() {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : 'Something unexpected happened.';

  return (
    <section className="errorState" role="alert">
      <p className="eyebrow">Error trace</p>
      <h2>That window failed to render.</h2>
      <p>{message}</p>
      <Link to="/" className="buttonLink buttonLink--primary">
        Reopen home.mdx
      </Link>
    </section>
  );
}
