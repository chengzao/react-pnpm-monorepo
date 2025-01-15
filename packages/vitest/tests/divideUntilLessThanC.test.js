import { test, describe } from 'vitest'

import { divideUntilLessThanC, generateRange } from '../src/divideUntilLessThanC.js'

describe('divideUntilLessThanC', () => {
  test(`divideUntilLessThanC(10, 5)`, ({ expect }) => {
    const result = divideUntilLessThanC(10, 5)
    expect(result).toEqual([2, 1])
  })
  
  test(`divideUntilLessThanC(100000, 1000)`, ({ expect }) => {
    const result = divideUntilLessThanC(100000, 1000)
    expect(result).toEqual([100, 1])
  })

  test(`divideUntilLessThanC(100000000, 10000)`, ({ expect }) => {
    const result = divideUntilLessThanC(100000000, 10000)
    expect(result).toEqual([1, 2])
  })

  test(`divideUntilLessThanC(88000000, 10000)`, ({ expect }) => {
    const result = divideUntilLessThanC(88000000, 10000)
    expect(result).toEqual([8800,1])
  })

  test(`divideUntilLessThanC(1, 10000)`, ({ expect }) => {
    const result = divideUntilLessThanC(1, 10000)
    expect(result).toEqual([1,0])
  })

  test(`divideUntilLessThanC(0, 1000)`, ({ expect }) => {
    const result = divideUntilLessThanC(0, 10000)
    expect(result).toEqual([0,0])
  })
})



describe('generateRange', () => {
  test(`{from: 1, to: 10, interval: 2}`, ({ expect }) => {
    const result = generateRange({from: 5000, to: 200000, interval: 5000, unit: 1000, countryKey: 'jp', currencySymbol: '円'})

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "label": "5万円",
          "value": 5000,
        },
        {
          "label": "10万円",
          "value": 10000,
        },
        {
          "label": "15万円",
          "value": 15000,
        },
        {
          "label": "20万円",
          "value": 20000,
        },
        {
          "label": "25万円",
          "value": 25000,
        },
        {
          "label": "30万円",
          "value": 30000,
        },
        {
          "label": "35万円",
          "value": 35000,
        },
        {
          "label": "40万円",
          "value": 40000,
        },
        {
          "label": "45万円",
          "value": 45000,
        },
        {
          "label": "50万円",
          "value": 50000,
        },
        {
          "label": "55万円",
          "value": 55000,
        },
        {
          "label": "60万円",
          "value": 60000,
        },
        {
          "label": "65万円",
          "value": 65000,
        },
        {
          "label": "70万円",
          "value": 70000,
        },
        {
          "label": "75万円",
          "value": 75000,
        },
        {
          "label": "80万円",
          "value": 80000,
        },
        {
          "label": "85万円",
          "value": 85000,
        },
        {
          "label": "90万円",
          "value": 90000,
        },
        {
          "label": "95万円",
          "value": 95000,
        },
        {
          "label": "100万円",
          "value": 100000,
        },
        {
          "label": "105万円",
          "value": 105000,
        },
        {
          "label": "110万円",
          "value": 110000,
        },
        {
          "label": "115万円",
          "value": 115000,
        },
        {
          "label": "120万円",
          "value": 120000,
        },
        {
          "label": "125万円",
          "value": 125000,
        },
        {
          "label": "130万円",
          "value": 130000,
        },
        {
          "label": "135万円",
          "value": 135000,
        },
        {
          "label": "140万円",
          "value": 140000,
        },
        {
          "label": "145万円",
          "value": 145000,
        },
        {
          "label": "150万円",
          "value": 150000,
        },
        {
          "label": "155万円",
          "value": 155000,
        },
        {
          "label": "160万円",
          "value": 160000,
        },
        {
          "label": "165万円",
          "value": 165000,
        },
        {
          "label": "170万円",
          "value": 170000,
        },
        {
          "label": "175万円",
          "value": 175000,
        },
        {
          "label": "180万円",
          "value": 180000,
        },
        {
          "label": "185万円",
          "value": 185000,
        },
        {
          "label": "190万円",
          "value": 190000,
        },
        {
          "label": "195万円",
          "value": 195000,
        },
        {
          "label": "200万円",
          "value": 200000,
        },
      ]
    `)
  })
 
})