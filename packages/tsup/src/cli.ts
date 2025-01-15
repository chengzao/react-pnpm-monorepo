import fs from 'fs';
import { resolve } from 'path';
import process from 'process';
import jsonc from 'comment-json';
import { setVscodeSettingsJson } from './shared';

const cwd = process.cwd();

fs.mkdirSync(resolve(cwd, '.vscode'), {
  recursive: true,
});
const vscodeSettingsFilename = resolve(cwd, '.vscode/settings.json');

let json = {};
const isExisted = fs.existsSync(vscodeSettingsFilename);
if (isExisted) {
  const value = jsonc.parse(fs.readFileSync(vscodeSettingsFilename, 'utf8'));
  if (value) {
    json = value;
  }
}
setVscodeSettingsJson(json);
fs.writeFileSync(vscodeSettingsFilename, jsonc.stringify(json, undefined, 2), 'utf8');

console.info(
  `[@learnbase/stylelint] ${isExisted ? 'update' : 'init'} '.vscode/settings.json' finished`,
);
