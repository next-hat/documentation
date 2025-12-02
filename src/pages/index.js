import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/home_page_features';

import styles from './index.module.css';

const WhyNanoclFeatures = [
  {
    title: 'Declarative Statefiles',
    description: 'YAML/TOML/JSON describe cargoes, resources, jobs & VMs.',
    icon: '📄',
  },
  {
    title: 'Rust Core',
    description: 'Memory-safe, efficient implementation for predictable performance.',
    icon: '⚙️',
  },
  {
    title: 'Routing & DNS',
    description: 'Dynamic rules via nproxy/ncproxy + ndns/ncdns.',
    icon: '🌐',
  },
  {
    title: 'TLS Across Services',
    description: 'End-to-end TLS with mesh primitives in progress.',
    icon: '🔒',
  },
  {
    title: 'Jobs & Cron',
    description: 'Automate tasks and workflows alongside your services.',
    icon: '⏰',
  },
  {
    title: 'Minimal Ops',
    description: 'Opinionated defaults, batteries-included CLI & daemon.',
    icon: '🚀',
  },
];

function SearchBar() {
  const [qs, setQs] = useState('');
  const history = useHistory();

  const submitSearch = (e) => {
    e.preventDefault();
    history.push(`/search?q=${qs}`);
  }

  const onChange = (e) => {
    setQs(e.target.value);
  }

  return (
    <form
      className={styles.form_search}
      onSubmit={submitSearch}
    >
      <input
        className={styles.search_bar}
        type="search"
        value={qs}
        placeholder='Search for terms, guides, commands, and more..'
        onChange={onChange}
      />
    </form>
  )
}

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      {/* Background decorations */}
      <div aria-hidden className={styles.heroBackground}></div>
      {/* Quote overlay */}
      <p className={styles.heroQuote}>&ldquo;Promote a brighter future through open source.&rdquo;</p>
      {/* Hero content */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Just Develop, Deploy.<br />
          From your garage to the edge.
        </h1>
        <p className={styles.heroDescription}>
          Nanocl is an open-source orchestrator for containers and virtual machines.<br />
          Declarative deploys, no lock-in, minutes to production.
        </p>
        <div className={styles.heroButtons}>
          <Link
            className={clsx('button button--primary button--lg', styles.heroButton)}
            to="/guides/nanocl/get-started/orientation-and-setup">
            Get Started
          </Link>
          <Link
            className={clsx('button button--outline button--lg', styles.heroButtonOutline)}
            to="https://github.com/next-hat/nanocl">
            View on GitHub
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
          {WhyNanoclFeatures.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <span className={styles.featureIcon}>{feature.icon}</span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className={styles.comparisonSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Nanocl vs Others</h2>
        <div className={styles.comparisonGrid}>
          <div className={styles.comparisonCard}>
            <h3>Docker Compose</h3>
            <p className={styles.comparisonStatus}>Limited</p>
            <ul className={styles.comparisonList}>
              <li>Single host only</li>
              <li>No built-in proxy</li>
              <li>No DNS management</li>
              <li>No VM support</li>
            </ul>
          </div>
          <div className={clsx(styles.comparisonCard, styles.comparisonCardHighlight)}>
            <h3>Nanocl</h3>
            <p className={styles.comparisonStatusGood}>Just Right</p>
            <ul className={styles.comparisonList}>
              <li>Built-in proxy & DNS</li>
              <li>Containers & VMs</li>
              <li>Service discovery</li>
              <li>Monitoring & logging</li>
              <li>No master node required</li>
            </ul>
          </div>
          <div className={styles.comparisonCard}>
            <h3>Kubernetes</h3>
            <p className={styles.comparisonStatus}>Complex</p>
            <ul className={styles.comparisonList}>
              <li>Steep learning curve</li>
              <li>Heavy resource usage</li>
              <li>Complex setup</li>
              <li>Overkill for most apps</li>
            </ul>
          </div>
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
        <WhyNanocl />
        <ComparisonSection />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
