import { getIncentives } from '../src/protocols/aave';

const uiIncentiveProvider = '0x430Ef10d29237a0f061f9F7753fCe1cd1F5cF0e1';
const data = await getIncentives(324, '0x78e30497a3c7527d953c6B1E3541b021A98Ac43c', '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91');
console.log(JSON.stringify(data));
