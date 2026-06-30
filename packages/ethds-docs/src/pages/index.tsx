import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function Hero(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.heroLede}>
          A shared, open-source design system for accessible, multilingual
          Ethiopian government digital services.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Get started
          </Link>
          <Link className="button button--outline button--lg" to="/docs/principles">
            Design principles
          </Link>
        </div>
      </div>
    </header>
  );
}

const highlights = [
  {
    title: 'Accessible by default',
    body: 'Every token, component, and pattern targets WCAG 2.2 AA as a floor — verified, not assumed.',
  },
  {
    title: 'Multilingual by default',
    body: 'Built for English, Amharic, Afaan Oromo, Tigrinya, Somali, and Afar from the start.',
  },
  {
    title: 'Open by default',
    body: 'MIT licensed, developed in the open, and made to be reused across all of government.',
  },
];

export default function Home(): ReactNode {
  return (
    <Layout title="Home" description="Ethiopian Government Design System">
      <Hero />
      <main className="container margin-vert--lg">
        <div className="row">
          {highlights.map((h) => (
            <div className="col col--4" key={h.title}>
              <div className="card padding--lg margin-bottom--md">
                <Heading as="h3">{h.title}</Heading>
                <p>{h.body}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
