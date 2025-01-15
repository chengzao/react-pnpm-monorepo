import get from 'get-value';
import set from 'set-value';

export function setVscodeSettingsJson(json: any = {}) {
  set(json, 'css\\.validate', false);
  set(json, 'less\\.validate', false);
  set(json, 'scss\\.validate', false);

  // 添加 stylelint.validate
  const stylelintValidates = new Set(
    get(json, 'stylelint\\.validate', { default: [] }) as string[],
  );
  stylelintValidates.add('css');
  stylelintValidates.add('scss');
  stylelintValidates.add('less');
  stylelintValidates.add('sass');
  set(json, 'stylelint\\.validate', Array.from(stylelintValidates));

  // 获取现有的 editor.codeActionsOnSave 配置
  const codeActionsOnSave = get(json, 'editor\\.codeActionsOnSave', { default: {} });

  // 如果没有 source.fixAll.stylelint 配置，则添加
  if (!codeActionsOnSave['source.fixAll.stylelint']) {
    codeActionsOnSave['source.fixAll.stylelint'] = 'explicit';
  }

  // 更新 editor.codeActionsOnSave 配置
  set(json, 'editor\\.codeActionsOnSave', codeActionsOnSave);
  return json;
}
