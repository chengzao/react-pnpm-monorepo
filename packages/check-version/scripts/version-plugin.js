import fs from 'fs';
import path from 'path';

export default function (options) {
  let config;

  return {
    name: 'version-plugin',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    writeBundle() {
      const outDir = config.build.outDir || 'dist';
      const filePath = path.resolve(outDir, 'version.json');

      const versionInfo = { version: options.version };

      // 确保输出目录存在
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }
      // 写入版本文件
      fs.writeFileSync(filePath, JSON.stringify(versionInfo, null, 2));
      console.log(`版本文件已生成: ${filePath}`);
    },
  };
}
