#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import { execa } from 'execa';
import pLimit from 'p-limit';

console.log(
  chalk.cyanBright(`
╔════════════════════════════════════════════╗
║     🧹 git-del-tags CLI 工具 v1.2.0       ║
╚════════════════════════════════════════════╝
`),
);

const args = process.argv.slice(2);
const pattern = args.find((a) => !a.startsWith('--'));
const dryRun = args.includes('--dry-run');
const remoteOnly = args.includes('--remote-only');
const localOnly = args.includes('--local-only');

const concurrencyArg = args.find((a) => a.startsWith('--concurrency='));
const concurrency = concurrencyArg ? parseInt(concurrencyArg.split('=')[1], 10) : 5;

if (!pattern) {
  console.error(chalk.red('❌ 请提供标签匹配模式，例如：'));
  console.log(chalk.yellow('   git-del-tags "main_2025_10_28_v*"'));
  console.log(chalk.gray('\n可选参数:'));
  console.log(chalk.gray('  --dry-run             仅预览，不执行删除'));
  console.log(chalk.gray('  --remote-only         仅删除远程标签'));
  console.log(chalk.gray('  --local-only          仅删除本地标签'));
  console.log(chalk.gray('  --concurrency=<n>     并行删除限制 (默认5)'));
  process.exit(1);
}

async function main() {
  const { stdout: tagList } = await execa('git', ['tag', '-l', pattern]);
  const tags = tagList.split('\n').filter(Boolean);

  if (tags.length === 0) {
    console.log(chalk.gray(`⚠️ 未找到匹配标签: ${pattern}`));
    return;
  }

  console.log(chalk.blueBright('🧾 将要删除以下标签：'));
  tags.forEach((t) => console.log('  -', chalk.green(t)));
  console.log(chalk.gray(`共 ${tags.length} 个标签`));

  if (dryRun) {
    console.log(chalk.yellow('\n💡 Dry-run 模式：仅显示将要删除的标签，不执行删除。'));
    if (remoteOnly) console.log(chalk.gray('  模式: remote-only'));
    if (localOnly) console.log(chalk.gray('  模式: local-only'));
    console.log(chalk.gray(`  并行限制: ${concurrency}`));
    return;
  }

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `是否确认删除以上 ${tags.length} 个标签？`,
      default: false,
    },
  ]);

  if (!confirm) {
    console.log(chalk.yellow('🚫 操作已取消。'));
    return;
  }

  let failedTags = [];
  let successCount = 0;

  if (!remoteOnly) {
    console.log(chalk.yellow('\n🧹 删除本地标签...'));
    await execa('git', ['tag', '-d', ...tags]);
  } else {
    console.log(chalk.gray('跳过本地标签删除 (--remote-only 模式)'));
  }

  if (!localOnly) {
    console.log(chalk.yellow(`\n🌐 删除远程标签（并行度 ${concurrency}）...`));

    const limit = pLimit(concurrency);

    const tasks = tags.map((tag) =>
      limit(async () => {
        try {
          await execa('git', ['push', 'origin', `:refs/tags/${tag}`]);
          console.log(chalk.gray(`✔ 已删除远程标签: ${tag}`));
          successCount++;
        } catch (err) {
          console.error(chalk.red(`❌ 删除失败: ${tag}`));
          failedTags.push(tag);
        }
      }),
    );
    await Promise.all(tasks);

    // 输出失败的标签列表
    if (failedTags.length > 0) {
      console.log(chalk.redBright('\n❌ 以下标签删除失败：'));
      failedTags.forEach((tag) => console.log(chalk.red(`  - ${tag}`)));
    }
  } else {
    console.log(chalk.gray('跳过远程标签删除 (--local-only 模式)'));
    successCount = tags.length; // 如果只删除本地标签，所有标签都算成功
  }

  if (!localOnly) {
    console.log(chalk.yellow('\n🔄 同步远程标签状态...'));
    await execa('git', ['fetch', '--prune', 'origin', '+refs/tags/*:refs/tags/*']);
  }

  console.log(chalk.greenBright(`\n✅ 已完成删除 ${successCount} 个标签。`));
  if (failedTags.length > 0) {
    console.log(chalk.red(`⚠️  失败 ${failedTags.length} 个标签，请手动检查并重试。`));
  }
}

main().catch((err) => {
  console.error(chalk.red('❌ 出错：'), err.message);
});
