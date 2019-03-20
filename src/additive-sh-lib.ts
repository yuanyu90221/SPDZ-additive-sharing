export const additive_share = (secret:number, Q:number, N:number):number[]=>{
  let shares:number[] = [];
  for (let idx = 0; idx < N; idx++){
    let currentValue: number = Math.floor(Math.random()*Q);
    shares.push(currentValue);
  }
  let sumOfShares = shares.reduce((acc, cur)=>acc+cur);
  let lastOne:number = (secret - sumOfShares)%Q;
  lastOne = (lastOne > 0 )? lastOne: lastOne +Q;
  shares.push(lastOne);
  return shares;
};

export const additive_reconstruct = (shares:number[], Q:number):number=>{
  let sumOfShares = 0;
  if (shares.length > 0 ){
    sumOfShares = shares.reduce((acc, cur)=>acc+cur);
    console.log(`sumOfShares: ${sumOfShares}`);
    sumOfShares %= Q;
    sumOfShares = (sumOfShares > 0)? sumOfShares: sumOfShares+Q;
  }
  return sumOfShares;
};

export const explain = (seen_shares:number[], guess: number, Q: number):number=>{
  let sumOfSeenShares = (seen_shares.length > 0)? seen_shares.reduce((acc, cur)=> acc+cur):0;
  let simulated_unseen_share = (guess - sumOfSeenShares) % Q;
  simulated_unseen_share = (simulated_unseen_share >= 0 )? simulated_unseen_share: simulated_unseen_share + Q;
  let simulated_shares = [...seen_shares, simulated_unseen_share];
  if (additive_reconstruct(simulated_shares, Q)=== guess) {
    return simulated_unseen_share;
  }
  return -1;
};

export const checkRange = (seen_shares:number[], Q:number)=>{
  for (let guess=0; guess < Q; guess++) {
    let explaination = explain(seen_shares, guess, Q);
    if (explaination!==-1){
      console.log(`guess ${guess} can be explained by ${explaination}`);
    }
  }
};