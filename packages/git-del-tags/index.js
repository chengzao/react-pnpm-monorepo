#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import { execa } from 'execa';

// 打印标题
const banner = chalk.cyanBright(`
╔════════════════════════════════════╗
║     🧹 git-del-tags CLI 工具       ║
╚════════════════════════════════════╝
`);
console.log(banner);

async function main() {
  const pattern = process.argv[2];

  if (!pattern) {
    console.error(chalk.red('❌ 请提供标签匹配模式，例如：'));
    console.log(chalk.yellow('   git-del-tags "main_2025_10_28_v*"'));
    process.exit(1);
  }

  // Step 1. 匹配标签
  const { stdout: tagList } = await execa('git', ['tag', '-l', pattern]);
  const tags = tagList.split('\n').filter(Boolean);

  if (tags.length === 0) {
    console.log(chalk.gray(`⚠️ 未找到匹配标签: ${pattern}`));
    return;
  }

  console.log(chalk.blueBright('🧾 将要删除以下标签：'));
  tags.forEach((t) => console.log('  -', chalk.green(t)));

  // Step 2. 交互确认
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `是否确认删除以上 ${tags.length} 个标签（本地 + 远程）？`,
      default: false,
    },
  ]);

  if (!confirm) {
    console.log(chalk.yellow('🚫 操作已取消。'));
    return;
  }

  // Step 3. Dry-run 模式？
  const { dryRun } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'dryRun',
      message: '是否仅预览（dry-run），不执行删除？',
      default: false,
    },
  ]);

  if (dryRun) {
    console.log(chalk.gray('💡 Dry-run 模式启用，不会真正删除标签。'));
    return;
  }

  // Step 4. 删除标签
  console.log(chalk.yellow('🧹 正在删除本地标签...'));
  await execa('git', ['tag', '-d', ...tags]);

  console.log(chalk.yellow('🌐 正在删除远程标签...'));
  for (const tag of tags) {
    await execa('git', ['push', 'origin', `:refs/tags/${tag}`]);
  }

  console.log(chalk.yellow('🔄 正在同步远程标签状态...'));
  await execa('git', ['fetch', '--prune', 'origin', '+refs/tags/*:refs/tags/*']);

  console.log(chalk.greenBright(`✅ 已成功删除 ${tags.length} 个标签。`));
}

main().catch((err) => {
  console.error(chalk.red('❌ 出错：'), err.message);
});
