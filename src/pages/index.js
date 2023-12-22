import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import {useHistory} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/home_page_features';

import styles from './index.module.css';

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
    <header className={clsx('hero hero', styles.heroBanner)}>
      <div className={clsx(styles.heroBannerContent)}>
        <h1 className={clsx("hero__title", styles.heroTitle)}>What can we help you find ?</h1>
        <SearchBar />
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      description="Welcome on Next Hat documentation, you will find guide and tutorial regarding Next Hat product and tools."
    >
      <Head>
        <meta property="og:image" content="/img/logo.webp" />
        <meta property="twitter:image" content="/img/logo.webp" />
      </Head>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
