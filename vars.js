const nanoclLatestBinaryVersion = '0.16.3';
const nanoclGithubRepository = 'https://github.com/next-hat/nanocl';
const nanoclReleaseTagUrl = `${nanoclGithubRepository}/releases/tag/nanocl-${nanoclLatestBinaryVersion}`
const nanoclDownloadUrl = `${nanoclGithubRepository}/releases/download/nanocl-${nanoclLatestBinaryVersion}`
const nanoclLinuxTarballName = `nanocl_${nanoclLatestBinaryVersion}_linux_amd64.tar.gz`
const nanoclLinuxTarballUrl = `${nanoclDownloadUrl}/${nanoclLinuxTarballName}`
const nanoclDebName = `nanocl_${nanoclLatestBinaryVersion}_amd64.deb`
const nanoclDebUrl = `${nanoclDownloadUrl}/${nanoclDebName}`
const nanoclMacOsTarballName = `nanocl_${nanoclLatestBinaryVersion}_mac_aarch64.tar.gz`
const nanoclMacOsTarballUrl = `${nanoclDownloadUrl}/${nanoclMacOsTarballName}`
const nanoclWindowsTarballName = `nanocl_${nanoclLatestBinaryVersion}_windows_amd64.tar.gz`
const nanoclWindowsTarballUrl = `${nanoclDownloadUrl}/${nanoclWindowsTarballName}`

module.exports = {
  nanoclMajorVersion: '0.17',
  ncproxyMajorVersion: '0.14',
  ncdnsMajorVersion: '0.9',
  nanoclLatestBinaryVersion,
  nanoclGithubRepository,
  nanoclReleaseTagUrl,
  nanoclLinuxTarballName,
  nanoclLinuxTarballUrl,
  nanoclDebName,
  nanoclDebUrl,
  nanoclMacOsTarballName,
  nanoclMacOsTarballUrl,
  nanoclWindowsTarballName,
  nanoclWindowsTarballUrl,
};
