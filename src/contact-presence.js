// Confirmed contact locations are distinct from additional enquiry destinations.
export const enquiryRegions = [
  {name: 'Saudi Arabia', established: true},
  {name: 'Malaysia', established: true},
  {name: 'Singapore', established: true},
  {name: 'United States', established: true},
  {name: 'Hong Kong', established: true},
  {name: 'Australia', established: false},
  {name: 'Canada', established: false},
  {name: 'Taiwan', established: false},
  {name: 'United Arab Emirates', established: false},
].sort((a,b) => a.name.localeCompare(b.name, 'en'));

// Owner-supplied account links. Taobao remains unlinked until its shop URL is supplied.
export const socialChannels = [
  {name: 'Twitter', icon: 'twitter', url: 'https://x.com/jafordadvisory?s=11'},
  {name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/company/jaford-advisory-pte-ltd/'},
  {name: 'Taobao', icon: 'taobao'},
  {name: 'WeChat Official Account', icon: 'wechat', url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzcwNTM5NjE5OA=='},
  {name: 'Douyin', icon: 'douyin', url: 'https://v.douyin.com/_hYZqMd3ITY/'},
  {name: 'Xiaohongshu', icon: 'xiaohongshu', url: 'https://www.xiaohongshu.com/user/profile/68d8b17b000000002101992c'},
];
