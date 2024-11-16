import { glob } from 'glob';
import path from 'path';
import { DefaultTheme } from 'vitepress';

/**
 * 读取所有的 md 文件，生成侧边栏，数据格式参考ts类型定义 DefaultTheme.Sidebar
 */
const mdFiles = glob.sync('./docs/**/*.md');

const sidebarMap = mdFiles.reduce<DefaultTheme.Sidebar>((acc, filePath) => {
    const relativePath = path.relative('docs', filePath).replace('.md', '');
    const segments = relativePath.split(path.sep);

    const dirName = segments.slice(0, -1).join('/');
    const dirPath = `/${dirName}/`;
    const fileName = segments[segments.length - 1];

    if (!acc[dirPath]) {
        acc[dirPath] = [
            {
                text: dirName,
                collapsed: true,
                items: []
            }
        ];
    }

    const sidebarItem = acc[dirPath][0];
    sidebarItem.items.push({
        text: fileName.toLowerCase(),
        link: `/${filePath}`,
    });

    return acc;
}, {});

// 对侧边栏嵌套数组进行排序，按照中文拼音来排序
const collator = new Intl.Collator('zh', { sensitivity: 'base' });

for (const dir in sidebarMap) {
    const current = (sidebarMap?.[dir]?.[0] as DefaultTheme.SidebarItem);
    current?.items?.sort((a, b) => collator.compare(a.text!, b.text!));
}

// 对于第一层，由于是字母A ~ Z，因此可以按照字母来排序
const sidebarKeys = Object.keys(sidebarMap).sort((a, b) => a.localeCompare(b));

export const sidebar = sidebarKeys.reduce<DefaultTheme.SidebarItem[]>((acc,key) => (acc.push(...sidebarMap[key]),acc), []);
