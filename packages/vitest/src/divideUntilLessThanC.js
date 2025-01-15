const units = ['', 'K', 'M', 'G', 'T', 'P'];
const unitsForJp = ['', '万']
const specialCountryCase = ['jp', 'ae']


export function divideUntilLessThanC(x, c, count = 0) {
  if (x < c) {
      return [x, count];
  } else {
      return divideUntilLessThanC(x / c, c, count + 1);
  }
}

// export function generateRange({from, to, interval, unit, countryKey}) {
//   let result = [];
//   for (let i = from; i <= to; i += interval) {
//       const [number, index] = divideUntilLessThanC(i, unit);

//       const unitsArray = countryKey == 'jp' ? unitsForJp : units

//       result.push({
//         value: i,
//         label: `${number}${unitsArray[index]}`,
//       });
//   }
//   return result;
// }


export function generateRange({from, to, interval, unit, countryKey, currencySymbol=''}) {
  let result = [];
  for (let i = from; i <= to; i += interval) {
    const [number, index] = divideUntilLessThanC(i, unit);

    const unitsArray = countryKey == 'jp' ? unitsForJp : units
    let label = `${number}${unitsArray[index]}`;
 
    if(specialCountryCase.includes(countryKey)) {
      label = `${label}${currencySymbol}`
    } else {
      label = `${currencySymbol}${label}`
    }

    result.push({
      value: i,
      label: label,
    });
  }
  return result;
}
