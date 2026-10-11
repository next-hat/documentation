const nanoclMajorVersion = '0.18';
const ncproxyMajorVersion = '0.15';
const ncdnsMajorVersion = '0.10';
const nanoclLatestBinaryVersion = '0.18.0';
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

const vars = {
  nanoclMajorVersion,
  ncproxyMajorVersion,
  ncdnsMajorVersion,
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

export default vars;

export {
  nanoclMajorVersion,
  ncproxyMajorVersion,
  ncdnsMajorVersion,
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
