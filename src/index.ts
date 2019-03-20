import {additive_reconstruct, additive_share, checkRange} from './additive-sh-lib';
const Q: number = 131;
const secret: number = 41;
const N: number = 3;
const shares = additive_share(secret, Q, N);

console.log(`shares`, shares);
const reconstructSum:number = additive_reconstruct(shares, Q);
console.log(`reconstructSum`, reconstructSum);
console.log(`secret`, secret);

const seen_shares = shares.slice(0, N-2);
checkRange(seen_shares, Q);
