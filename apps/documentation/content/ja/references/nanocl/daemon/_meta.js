import { nanoclMajorVersion } from '@/lib/vars'

const referenceTheme = {
  layout: 'full',
  sidebar: false,
  toc: false,
  pagination: false,
  copyPage: false,
  breadcrumb: false,
}

export default {
  index: { display: 'hidden' },
  overview: '概要',
  ...Object.fromEntries(['0.18', '0.17', '0.16', '0.15', '0.14', '0.13', '0.12'].map(version => [
    `v${version}`,
    { title: `v${version}${version === nanoclMajorVersion ? '（最新）' : ''}`, theme: referenceTheme },
  ])),
}
