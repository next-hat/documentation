import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

function GoogleSearch() {
  return (
    <div
      className="gcse-searchresults-only"
      data-gname="storesearch"
    />
  );
}

export default function Search() {
  return (
    <Layout
      title="Search"
      description="Next Hat documentation search page"
    >
      <Head>
        <meta property="og:image" content="/img/logo.webp" />
        <meta property="twitter:image" content="/img/logo.webp" />
        <script async src="https://cse.google.com/cse.js?cx=5c4a0cc2eff9d52d2" />
      </Head>
      <main>
        <GoogleSearch />
      </main>
    </Layout>
  );
}
