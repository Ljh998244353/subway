# Slidev 演示稿

本目录是基于 Slidev 的功能介绍演示稿，重点展示商业综合体视觉 AI 数字孪生运营系统的核心功能。

当前版本使用简约浅色主题，并通过 Slidev `v-click`、页面转场和 CSS 动画实现逐步讲解、卡片浮动、热力脉冲、路线流动和指标生长效果。

演示稿已加入一个鼠标交互场景页：

```text
鼠标交互模拟：点击店铺查看运营解释
```

该页面使用本地 Vue 组件 `components/MallScenarioDemo.vue`，支持楼层切换、热力/预警/评分模式切换、店铺点击联动指标、hover 提示和系统解释展示。页面数据全部为虚构 Mock 数据，只用于展示商业综合体运营场景的功能表达。

## 运行

```bash
cd slides/slidev
npm install
npm run dev
```

## 构建静态站点

```bash
cd slides/slidev
npm run build
```

## 导出 PDF

```bash
cd slides/slidev
npm run export
```

## 合规说明

演示稿只使用自绘 UI 图形和 CSS 图形，不包含真实商场平面图、品牌 Logo、商户 Logo、监控视频、人物图像或外部图片素材。
