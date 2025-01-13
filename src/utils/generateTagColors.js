import colorMapping from './arco-palette.json'; // 导入 JSON 文件

// 创建一个索引状态，用于循环使用颜色类别
const colorIndexes = Object.keys(colorMapping.light).reduce((acc, key) => {
  acc[key] = { index: colorMapping.light[key].length - 1 }; // 从后往前选
  return acc;
}, {});

const usedTags = {}; // 存储已生成的颜色映射，确保固定不变

/**
 * 根据标签数组生成对应的颜色映射
 * @param {Array} tags 标签数组
 * @returns {Object} 包含每个标签的 light 和 dark 颜色的映射
 */
export const generateTagColors = (tags) => {
  tags.forEach((tag) => {
    const tagName = tag.name.toLowerCase();
    if (usedTags[tagName]) return; // 如果颜色已生成，直接跳过

    // 按颜色类别循环分配颜色
    const colorCategories = Object.keys(colorMapping.light);
    for (const category of colorCategories) {
      const lightColors = colorMapping.light[category];
      const darkColors = colorMapping.dark[category];
      const currentIndex = colorIndexes[category].index;

      if (currentIndex >= 0) {
        // 分配当前类别的颜色
        usedTags[tagName] = {
          light: lightColors[currentIndex],
          dark: darkColors[currentIndex],
        };

        // 更新当前类别的索引，跳跃到下一个颜色
        colorIndexes[category].index -= 1;
        break;
      }
    }
  });

  return usedTags;
};
