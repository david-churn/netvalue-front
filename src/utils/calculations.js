'use strict';
// 4/18/2019  David Churn

module.exports = {
  periodValue: (principle, payment, APR, periodQty) => {
    let b = Math.round(principle * 100) / 100;
    let p = Math.round(payment * 100) / 100;
    let rt = APR/12;
    let tEarn = 0;
    for (let q = 0; q < periodQty; q++) {
      let pEarn = Math.round(b * rt * 100) / 100;
      tEarn += pEarn;
      b += (p + pEarn);
    }
    return {
      balance: b,
      earnings: tEarn
    }
  },
  finalValue: (principle, payment, APR, result) => {
    let b = Math.round(principle * 100) / 100;
    let p = Math.round(payment * 100) / 100;
    let rt = APR/12;
    let tEarn = 0;
    let periodQty = 0;
    while (b < result) {
      let pEarn = Math.round(b * rt * 100) / 100;
      tEarn += pEarn;
      b += (p + pEarn);
      periodQty++;
    }
    return {
      balance: b,
      earnings: tEarn,
      periodQty: periodQty
    }
  },
  minPayment: (principle, APR, periodQty) => {
    let rt = APR/12;
    let q = Math.round(periodQty);
    return (principle * rt) * ((1 + rt) ** q) / (((1 + rt) ** q) - 1 );
  }
}
