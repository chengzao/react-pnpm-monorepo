export function getCustomAgeRange({ custom_min_age, custom_max_age }) {
  let min_age = custom_min_age || ''
  let max_age = custom_max_age || ''

  if (custom_min_age && !custom_max_age) {
    if (custom_min_age == '<20') {
      min_age = 1
    }

    if (custom_min_age == '>50') {
      min_age = 50
    }

    max_age = 100
  } else if (custom_min_age && custom_max_age) {
    if (custom_min_age == '<20' && custom_max_age != '>50') {
      min_age = 1
      max_age = custom_max_age
    }

    if (custom_min_age == '<20' && custom_max_age == '>50') {
      min_age = 1
      max_age = 100
    }

    if (custom_min_age !== '<20' && custom_max_age == '>50') {
      min_age = custom_min_age
      max_age = 100
    }

    if (custom_min_age == '<20' && custom_max_age == '<20') {
      min_age = 1
      max_age = 20
    }

    if (custom_min_age == '>50' && custom_max_age == '>50') {
      min_age = 50
      max_age = 100
    }
  }

  return {
    min_age,
    max_age
  }
}