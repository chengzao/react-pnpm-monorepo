import { describe, test } from 'vitest'

import { getCustomAgeRange } from '../src/getCustomAgeRange.js'

describe('getCustomAgeRange:: custom_min_age and custom_max_age is empty', () => {
  test(`custom_min_age: <20 ; custom_max_age: ''`, ({ expect }) => {
    const result = getCustomAgeRange({ custom_min_age: '<20', custom_max_age: '' })
    expect(result).toEqual({ min_age: 1, max_age: 100 })
  })

  test(`custom_min_age: 20 ; custom_max_age: ''`, ({ expect }) => {
    const result = getCustomAgeRange({ custom_min_age: 20, custom_max_age: '' })
    expect(result).toEqual({ min_age: 20, max_age: 100 })
  })

  test(`custom_min_age: >50 ; custom_max_age: ''`, ({ expect }) => {
    const result = getCustomAgeRange({ custom_min_age: '>50', custom_max_age: '' })
    expect(result).toEqual({ min_age: 50, max_age: 100 })
  })
})

describe('getCustomAgeRange:: custom_min_age and custom_max_age', () => {
  test(`custom_min_age: <20 ; custom_max_age: 23`, ({ expect }) => {
    const result = getCustomAgeRange({ custom_min_age: '<20', custom_max_age: 23 })
    expect(result).toEqual({ min_age: 1, max_age: 23 })
  })
  
  test(`custom_min_age: <20 ; custom_max_age: >50`, ({ expect }) => {
    const result = getCustomAgeRange({ custom_min_age: '<20', custom_max_age: '>50' })
    expect(result).toEqual({ min_age: 1, max_age: 100 })
  })

  test(`custom_min_age: 23 ; custom_max_age: >50`, ({ expect }) => {
    const result = getCustomAgeRange({ custom_min_age: 23, custom_max_age: '>50' })
    expect(result).toEqual({ min_age: 23, max_age: 100 })
  })

  test(`custom_min_age: 24 ; custom_max_age: 56`, ({ expect }) => {
    const result = getCustomAgeRange({ custom_min_age: 24, custom_max_age: 56 })
    expect(result).toEqual({ min_age: 24, max_age: 56 })
  })
})

describe('getCustomAgeRange:: equal custom_min_age and custom_max_age', () => {

  test(`custom_min_age: <20 ; custom_max_age: <20`, ({ expect }) => {
    const result = getCustomAgeRange({ custom_min_age: '<20', custom_max_age: '<20' })
    expect(result).toEqual({ min_age: 1, max_age: 20 })
  })
  
  test(`custom_min_age: >50 ; custom_max_age: >50`, ({ expect }) => {
    const result = getCustomAgeRange({ custom_min_age: '>50', custom_max_age: '>50' })
    expect(result).toEqual({ min_age: 50, max_age: 100 })
  })
})