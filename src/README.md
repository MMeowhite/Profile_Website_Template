# 个人网站项目 - MMeowhite

欢迎来到我的个人网站项目！这是一个基于 JSON 配置文件快速生成个人网站的项目。通过简单的 JSON 配置，您可以快速搭建并个性化您的个人网站。

## 一、项目简介

本项目旨在提供一个简单、灵活且高度可定制的个人网站解决方案。通过修改 JSON 配置文件，您可以轻松地更新网站内容，包括个人信息、教育背景、工作经验、研究成果、项目经历等。

## 二、功能特点

- **个性化配置**：通过 JSON 文件自定义网站内容。
- **多页面支持**：支持首页、教育背景、工作经验、研究成果、项目经历等多个页面。
- **响应式设计**：网站在不同设备上均能完美显示。
- **社交媒体集成**：支持与 GitHub、Google Scholar、LinkedIn 等平台的集成。
- **快速部署**：支持通过 GitHub Pages 等平台快速部署。

## 三、使用说明

### 1. 准备工作

- 确保您已经安装了npm。
- 克隆本项目到您的本地机器：

```bash
git clone https://github.com/MMeowhite/Profile_Website_Template.git
```

### 2.安装依赖
```bash
cd Profile_Website_Template
npm install
```

### 3.修改/public/configs/en{zh}_json配置文件

#### 3.1 顶级配置
```json
{
  "websiteTitle": "MMeowhite",
  "references": "/references.bib",
  "pages": {
    ...
  },
  "widgets": {
    ...
  }
}
```

- `websiteTitle`: 网站的标题，显示在浏览器标签页中。
- `references`: 参考文献文件的路径，用于存储网站中引用的文献信息。
- `pages`: 网站的页面内容配置。
- `widgets`: 网站的导航和其他小部件配置。

#### 3.2 页面内容配置
pages分为home，experience, projects, publication配置，关于blog的配置，需要在`/public/blogs/configs/en{zh}_json`中进一步配置
```json
"pages": {
  "home": {
    ...
  },
  "experience": {
    ...
  },
  "projects": {
    ...
  },
  "publication": {
    ...
  }
}
```

##### 3.2.1 首页配置
```json
"home": {
  "avatar": {
    "init": "/images/avatar_init.jpg",
    "hovered": "/images/avatar_hover.jpg"
  },
  "name": {
    "nickName": "MMeowhite",
    "realName": "(Peng, Miao)"
  },
  "institution": "Sichuan University",
  "field": "MEDICINE / COMPUTER SCIENCE / MATHEMATICS / PHYSICS",
  "greeting": {
    "img": "/images/featuredImages/img.png",
    "title": "Hello, I'm MMeowhite (Peng, Miao)",
    "subtitle": "I'd like to say something...",
    "profile": "Hi! I am MMeowhite, a second-year Master's student advised by Professor Canhua Huang in State Key Laboratory of Biotherapy at Sichuan University. My major is all of things in the world. <br/><br/>My goal is to push the boundaries of human knowledge and capabilities in Medicine, Computer Science, Mathematics, and Physics. I aspire to develop innovative and intelligent solutions that integrate principles from these fields to tackle complex real-world challenges. Specifically, I am interested in exploring methods that effectively and efficiently leverage multimodal data, advanced computational models, and mathematical frameworks to enhance understanding, decision-making, and problem-solving in science and healthcare. I am also passionate about discovering new interdisciplinary approaches that drive meaningful advancements.<br/><br/> News: I am currently researching on cancer neuroscience. Actively looking for communication and collaboration!"
  },
  "quote": {
    "words": "The most important thing in communication is hearing what isn’t said.",
    "author": "<cite>Claude Shannon</cite>"
  },
  "experienceSection": {
    "title": "Education",
    "edu": [
      ...
    ],
    "timeline": [
      ...
    ]
  },
  "featuredPublications": [
    ...
  ],
  "cv": "/cv_en.pdf",
  "contact": {
    ...
  }
}
```
- home: 个人简介部分。
  - avatar: 设置头像。
      - init: 初始头像图片路径。
      - hovered: 鼠标悬停时的头像图片路径。
  - name: 设置姓名。
      - nickName: 昵称。
      - realName: 真实姓名。
  - institution: 所属机构。
  - field: 研究领域。
  - greeting: 欢迎信息。
  - img: 欢迎信息的图片路径，建议直接放在`/public/images/`。
  - title: 欢迎信息的标题。 
      - subtitle: 欢迎信息的副标题。
      - profile: 个人简介。
  - quote: 引言部分，在这一部分，可以输入你的自己喜欢的名人名言。
      - words: 内容。
      - author: 作者。
  
- experienceSection: 教育经历部分。
  - title: 教育经历的标题。
  - edu: 教育经历列表。
  - timeline: 时间轴内容。

- featuredPublications: 特色出版物列表。 
- cv: 简历文件的路径。
- contact: 联系信息。


### 4.部署项目
您可以选择将项目部署到 GitHub Pages 或其他静态网站托管平台。请参考相关平台的具体部署指南。

## 四、依赖说明
### 4.1 依赖项
#### 4.1.1 运行时依赖项 (dependencies)

| 依赖项名称 | 版本 | 说明 |
|-----------|------|------|
| `@babel/plugin-proposal-private-property-in-object` | 7.21.11 | 用于支持私有属性的 Babel 插件 |
| `@testing-library/jest-dom` | 5.17.0 | 提供 Jest 的 DOM 测试工具 |
| `@testing-library/react` | 13.4.0 | 提供 React 的测试工具 |
| `@testing-library/user-event` | 13.5.0 | 提供用户事件模拟工具 |
| `aos` | 2.3.4 | 用于实现动画效果的库 |
| `axios` | 1.7.9 | 用于进行 HTTP 请求的库 |
| `bootstrap` | 5.3.3 | 前端框架，用于实现响应式设计 |
| `classnames` | 2.5.1 | 用于操作类名的库 |
| `framer-motion` | 12.3.1 | 用于实现动画效果的库 |
| `gh-pages` | 6.1.1 | 用于将项目部署到 GitHub Pages 的工具 |
| `github-markdown-css` | 5.8.1 | 用于实现 GitHub 风格的 Markdown 样式 |
| `highlight.js` | 11.11.1 | 用于代码高亮显示的工具 |
| `katex` | 0.16.20 | 用于显示数学公式的库 |
| `lodash` | 4.17.21 | 用于操作数组和对象的工具库 |
| `markmap` | 0.6.1 | 用于生成思维导图的库 |
| `masonry-layout` | 4.2.2 | 用于实现瀑布流布局的库 |
| `normalize.css` | 8.0.1 | 用于重置浏览器默认样式的库 |
| `prop-types` | 15.8.1 | 用于定义 React 组件的类型检查 |
| `pyodide` | 0.27.1 | 用于在浏览器中运行 Python 的库 |
| `react-bootstrap` | 2.10.7 | React 的 Bootstrap 组件库 |
| `react-dom` | 18.3.1 | React 的 DOM 渲染库 |
| `react-icons` | 5.4.0 | 提供 React 图标库 |
| `react-markdown` | 9.0.3 | 用于渲染 Markdown 的 React 组件 |
| `react-responsive` | 10.0.0 | 用于实现响应式设计的 React 组件 |
| `react-router-dom` | 6.26.2 | React 的路由库 |
| `react-scripts` | 5.0.1 | React 的脚本工具 |
| `react-scroll` | 1.9.0 | 用于实现滚动效果的 React 组件 |
| `react-slick` | 0.30.3 | 用于实现轮播图的 React 组件 |
| `react-syntax-highlighter` | 15.6.1 | 用于代码高亮显示的 React 组件 |
| `react` | 18.3.1 | 前端框架，用于构建用户界面 |
| `rehype-highlight` | 7.0.1 | 用于高亮显示的 Rehype 插件 |
| `rehype-katex` | 7.0.1 | 用于显示数学公式的 Rehype 插件 |
| `rehype-raw` | 7.0.0 | 用于处理原始内容的 Rehype 插件 |
| `rehype-slug` | 6.0.0 | 用于生成锚点的 Rehype 插件 |
| `remark-admonitions` | 1.2.1 | 用于实现警告和提示的 Remark 插件 |
| `remark-gfm` | 4.0.0 | 用于支持 GitHub Flavored Markdown 的 Remark 插件 |
| `remark-html` | 16.0.1 | 用于将 Markdown 转换为 HTML 的 Remark 插件 |
| `remark-math` | 6.0.0 | 用于支持数学公式的 Remark 插件 |
| `remark-toc` | 9.0.0 | 用于生成目录的 Remark 插件 |
| `remark` | 15.0.1 | 用于处理 Markdown 的工具 |
| `slick-carousel` | 1.8.1 | 用于实现轮播图的库 |
| `unist-util-visit` | 5.0.0 | 用于处理 Unist 节点的工具 |
| `video-embed` | 0.2.0 | 用于嵌入视频的工具 |
| `web-vitals` | 2.1.4 | 用于监测网站性能的工具 |

#### 4.1.2 开发依赖项 (devDependencies)

| 依赖项名称 | 版本 | 说明 |
|-----------|------|------|
| `nodemon` | 3.0.1 | 用于自动重启服务器的工具 |
| 其他开发依赖项 | ... | ... |

### 4.2 依赖项说明
- **`dependencies`**: 这些依赖项是项目运行所必需的，包括前端框架、工具库、样式库等。
- **`devDependencies`**: 这些依赖项是开发和测试过程中所必需的，包括测试工具、构建工具等。

### 4.3 更新依赖项
定期使用以下命令更新依赖项：
```bash
npm update
```

### 4.4 安装依赖项


## 五、联系方式
- 邮箱：miaopeng@stu.scu.edu.cn
- GitHub：https://github.com/MMeowhite
- LinkedIn：https://www.linkedin.com/in/peng-miao-89324a341/
- YouTube：https://www.youtube.com/@pengmiao-bmm

## 六、许可证
本项目采用 MIT 许可证。请参阅 LICENSE 文件了解更多信息。



