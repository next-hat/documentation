import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './home_page_features.module.css';

const FeatureList = [
  {
    title: 'Guides',
    url: '/guides/summary',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Browse our guides to learn how to use Next Hat tools.
        But also some guide about Rust, Docker, and other dev and devops tools that Next hat use!
      </>
    ),
  },
  {
    title: 'Manuals',
    url: '/manuals/summary',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
         Manuals of Next Hat tools.
      </>
    ),
  },
  {
    title: 'References',
    url: '/references/summary',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Browse through reference documentation.
      </>
    ),
  },
  {
    title: 'Get started with Nanocl',
    url: '/guides/nanocl/get-started/orientation-and-setup',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Learn Nanocl basics and the benefits of hybrid cloud.
      </>
    ),
  },
];

function Feature({Svg, title, url, description}) {
  return (
    <div className={styles.body_card_holder}>
      <Link to={url} className={styles.body_card}>
        <i className="fas fa-circle-info body-icon"></i>
        <h5 className={styles.body_card_title}>{title}</h5>
        <p className={styles.body_card_description}>
          {description}
        </p>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className='container'>
      <div className={clsx(styles.body_cards)}>
      {FeatureList.map((props, idx) => (
        <Feature key={idx} {...props} />
      ))}
      </div>
    </section>
  );
}
