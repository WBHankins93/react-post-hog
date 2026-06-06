import { Link } from 'react-router-dom';
import { getHqApp } from '../content/hqApps';

type HqAppPageProps = {
  slug: string;
};

const statusLabels = {
  live: 'Live',
  building: 'Building',
  planned: 'Planned',
};

export function HqAppPage({ slug }: HqAppPageProps) {
  const app = getHqApp(slug);

  if (!app) {
    throw new Error(`Unknown HQ app: ${slug}`);
  }

  return (
    <section className="appPage">
      <header className="appPage__header">
        <div>
          <p className="eyebrow">{app.eyebrow}</p>
          <h2>{app.title}</h2>
          <p className="appPage__lede">{app.lede}</p>
        </div>
        <aside className="appPage__intent" aria-label={`${app.fileLabel} intent`}>
          <span>{app.fileLabel}</span>
          <p>{app.intent}</p>
        </aside>
      </header>

      <div className="appPage__grid">
        {app.items.map((item) => (
          <article key={item.title} className="appCard">
            <div className="appCard__meta">
              <span>{item.eyebrow}</span>
              <strong>{statusLabels[item.status]}</strong>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.href && item.linkLabel ? (
              <a href={item.href} target="_blank" rel="noreferrer" className="searchPanel__link">
                {item.linkLabel}
              </a>
            ) : null}
          </article>
        ))}
      </div>

      <footer className="appPage__footer">
        <Link to="/" className="buttonLink">
          Back to home.mdx
        </Link>
        <Link to="/workspace" className="buttonLink buttonLink--primary">
          Open workspace.app
        </Link>
      </footer>
    </section>
  );
}
