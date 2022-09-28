import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function GoogleSearch() {
  return (
    <div
      className="gcse-searchresults-only"
      data-gname="storesearch"
    />
  );
}

export default function Search() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      description={siteConfig.description}>
      <Head>
        <script async src="https://cse.google.com/cse.js?cx=5c4a0cc2eff9d52d2" />
      </Head>
      <main>
        <GoogleSearch />
      </main>
    </Layout>
  );
}