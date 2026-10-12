// Confirmed contact locations are distinct from additional enquiry destinations.
export const enquiryRegions = [
  {name: 'Saudi Arabia', established: true},
  {name: 'Malaysia', established: true},
  {name: 'Singapore', established: true},
  {name: 'United States', established: true},
  {name: 'Hong Kong', established: true},
  {name: 'Australia', established: false},
  {name: 'Canada', established: false},
].sort((a,b) => a.name.localeCompare(b.name, 'en'));

// Account URLs/WeChat QR code will be supplied by the owner. No placeholder destinations.
export const socialChannels = [
  {name: 'WeChat Official Account', icon: 'wechat'},
  {name: 'X (Twitter)', icon: 'x'},
  {name: 'Taobao', icon: 'taobao'},
];
