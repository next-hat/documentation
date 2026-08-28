import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import HomepageFeatures from '@site/src/components/home_page_features';

import styles from './index.module.css';

const WhyNanoclFeatures = [
  {
    title: 'Declarative Statefiles',
    description: 'YAML/TOML/JSON describe cargoes, resources, jobs & VMs.',
    label: 'YAML',
  },
  {
    title: 'Rust Core',
    description: 'Memory-safe, efficient implementation for predictable performance.',
    label: 'Rust',
  },
  {
    title: 'Routing & DNS',
    description: 'Dynamic rules through ncproxy with embedded Nginx and ncdns with embedded dnsmasq.',
    label: 'DNS',
  },
  {
    title: 'TLS Across Services',
    description: 'End-to-end TLS with mesh primitives in progress.',
    label: 'TLS',
  },
  {
    title: 'Jobs & Cron',
    description: 'Automate tasks and workflows alongside your services.',
    label: 'Cron',
  },
  {
    title: 'Minimal Ops',
    description: 'Opinionated defaults, batteries-included CLI & daemon.',
    label: 'Ops',
  },
];

function SearchBar() {
  const focusSearch = () => {
    document.querySelector('#search_input_react')?.focus();
  };

  return (
    <div
      className={styles.form_search}
    >
      <button
        className={styles.search_bar}
        type="button"
        onClick={focusSearch}
      >
        <svg className={styles.searchIcon} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
        <span>Search guides, commands, and references</span>
        <kbd className={styles.searchShortcut}>Ctrl K</kbd>
      </button>
    </div>
  )
}

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      {/* Background decorations */}
      <div aria-hidden className={styles.heroBackground}></div>
      {/* Hero content */}
      <div className={styles.heroContent}>
        <span className={styles.heroEyebrow}>Nanocl documentation</span>
        <h1 className={styles.heroTitle}>
          Build, deploy, and operate<br />
          with confidence.
        </h1>
        <p className={styles.heroDescription}>
          Practical guides, installation manuals, and precise references for<br />
          running containers and virtual machines with Nanocl.
        </p>
        <div className={styles.heroButtons}>
          <Link
            className={clsx('button button--primary button--lg', styles.heroButton)}
            to="/guides/nanocl/get-started/orientation-and-setup">
            Start with Nanocl
          </Link>
          <Link
            className={clsx('button button--outline button--lg', styles.heroButtonOutline)}
            to="/manuals/nanocl/install/overview">
            Install Nanocl
          </Link>
        </div>
        <SearchBar />
      </div>
    </header>
  );
}

function WhyNanocl() {
  return (
    <section className={styles.whySection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Why Nanocl</h2>
        <p className={styles.sectionSubtitle}>
          Lean where K8s is heavy. Powerful where Compose is limited.
        </p>
        <div className={styles.featureGrid}>
          {WhyNanoclFeatures.map((feature) => (
            <div key={feature.title} className={styles.featureCard}>
              <span className={styles.featureIcon}>{feature.label}</span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      description="Nanocl documentation - Open-source orchestrator for containers and VMs. Simple, lightweight, fast. Deploy anything from containers to VMs, edge workloads to production apps."
    >
      <Head>
        <meta property="og:image" content="/img/logo.webp" />
        <meta property="twitter:image" content="/img/logo.webp" />
      </Head>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <WhyNanocl />
      </main>
    </Layout>
  );
}
