import { createDefu } from 'defu';
import type { Config } from 'stylelint';

export const kebabCaseRegex = '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$';
export const lowerCamelCaseRegex = '^[a-z][a-zA-Z0-9]+$';
export const lowerCamelCaseIgnoredRegex = '^[a-z][a-zA-Z0-9]+$|^ant-|^yolo-|^Mui.*$';
export const snakeCaseRegex = '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$';
export const upperCamelCaseRegex = '^[A-Z][a-zA-Z0-9]+$';

function createDefaultConfig(): Config {
  return {
    extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
    plugins: ['stylelint-declaration-block-no-ignored-properties'],
    rules: {
      'plugin/declaration-block-no-ignored-properties': true,
      'selector-pseudo-class-no-unknown': [
        true,
        {
          ignorePseudoClasses: ['global'],
        },
      ],
      'selector-class-pattern': [
        lowerCamelCaseIgnoredRegex,
        {
          message: 'Expected selector class name to be lowerCamelCase',
        },
      ],
      'selector-id-pattern': [
        lowerCamelCaseIgnoredRegex,
        {
          message: (selector: string) => `Expected id selector "${selector}" to be lowerCamelCase`,
        },
      ],
      'max-nesting-depth': 3,
      'selector-max-id': 3,
      'selector-max-class': 3,
      'media-feature-range-notation': 'prefix',
      'scss/selector-no-union-class-name': true,
      'alpha-value-notation': 'number',
      'color-function-notation': 'legacy',
      'unit-allowed-list': ['px', 'em', 'deg', 'vh', 'vw', '%', 'rem', 's', 'ms'],
    },
  };
}

const ext = createDefu((obj, key, value) => {
  if (key === 'rules') {
    obj[key] = Object.assign(obj[key], value);
    return true;
  }
});

export function defaultConfig(config?: Config): Config {
  // @ts-expect-error
  return ext(config, createDefaultConfig());
}
