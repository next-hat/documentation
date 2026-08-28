import React from 'react';
import Link from '@docusaurus/Link';
import vars from '@site/vars';
import styles from './home_page_features.module.css';

const FeatureList = [
  {
    label: 'Install',
    title: 'Install Nanocl',
    url: '/manuals/nanocl/install/overview',
    description: 'Choose your platform, install the CLI and daemon, and verify your setup.',
  },
  {
    label: 'First deployment',
    title: 'Start with Nanocl',
    url: '/guides/nanocl/get-started/orientation-and-setup',
    description: 'Learn the core workflow and deploy your first container from a Statefile.',
  },
  {
    label: 'Learn',
    title: 'Guides',
    url: '/guides/summary',
    description: 'Follow task-focused walkthroughs for networking, secrets, VMs, health checks, and more.',
  },
  {
    label: 'Operate',
    title: 'Manuals',
    url: '/manuals/summary',
    description: 'Find installation, post-installation, and upgrade procedures for Nanocl.',
  },
  {
    label: 'Look up',
    title: 'CLI reference',
    url: '/references/nanocl/cli/overview',
    description: 'Browse every command, option, and subcommand exposed by the Nanocl CLI.',
  },
  {
    label: 'Integrate',
    title: 'API reference',
    url: `/references/nanocl/daemon/v${vars.nanoclMajorVersion}`,
    description: 'Explore the current daemon HTTP API, schemas, requests, and responses.',
  },
];

function Feature({label, title, url, description}) {
  return (
    <Link to={url} className={styles.body_card}>
      <span className={styles.body_card_label}>{label}</span>
      <h3 className={styles.body_card_title}>{title}</h3>
      <p className={styles.body_card_description}>{description}</p>
      <span className={styles.body_card_arrow} aria-hidden="true">→</span>
    </Link>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.docsSection}>
      <div className='container'>
        <span className={styles.docsEyebrow}>Find your path</span>
        <h2 className={styles.docsTitle}>What do you want to do?</h2>
        <p className={styles.docsSubtitle}>Start with a workflow or jump straight to the details.</p>
        
        <div className={styles.body_cards}>
          {FeatureList.map((props) => (
            <Feature key={props.url} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
