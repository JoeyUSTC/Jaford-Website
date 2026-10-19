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

// Account URLs/WeChat QR code will be supplied by the owner. No placeholder destinations.
export const socialChannels = [
  {name: 'Twitter', icon: 'twitter'},
  {name: 'LinkedIn', icon: 'linkedin'},
  {name: 'Taobao', icon: 'taobao'},
  {name: 'WeChat Official Account', icon: 'wechat'},
  {name: 'Douyin', icon: 'douyin'},
];
