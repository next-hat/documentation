import React from 'react';
import Link from '@docusaurus/Link';
import styles from './home_page_features.module.css';

const FeatureList = [
  {
    title: 'Get Started',
    url: '/guides/nanocl/get-started/orientation-and-setup',
    icon: '🚀',
    description: 'Deploy your first container in minutes. Learn Nanocl basics and start orchestrating.',
  },
  {
    title: 'Guides',
    url: '/guides/summary',
    icon: '📖',
    description: 'Step-by-step tutorials for containers, VMs, networking, TLS, and more.',
  },
  {
    title: 'Manuals',
    url: '/manuals/summary',
    icon: '📚',
    description: 'In-depth documentation for Nanocl CLI, daemon, proxy, and DNS.',
  },
  {
    title: 'References',
    url: '/references/summary',
    icon: '📋',
    description: 'API reference, Statefile syntax, configuration options, and CLI commands.',
  },
];

function Feature({icon, title, url, description}) {
  return (
    <Link to={url} className={styles.body_card}>
      <span className={styles.body_card_icon}>{icon}</span>
      <h3 className={styles.body_card_title}>{title}</h3>
      <p className={styles.body_card_description}>{description}</p>
      <span className={styles.body_card_arrow}>→</span>
    </Link>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.docsSection}>
      <div className='container'>
        <h2 className={styles.docsTitle}>Explore the Documentation</h2>
        <p className={styles.docsSubtitle}>Everything you need to deploy with Nanocl</p>
        
        <div className={styles.body_cards}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
