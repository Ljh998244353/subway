# AGENT.md

兼容入口：AI coding 工具应优先读取 [AGENTS.md](AGENTS.md)。

本文件保留给旧链接和既有文档索引使用。当前项目采用单 AI 增量迭代开发模式，下一步以 `context/TODO_NEXT.md` 的任务卡为准。

必读顺序：

```text
AGENTS.md
context/TODO_NEXT.md
PROGRESS.md
IMPORTANT.md
当前增量点名的相关 docs/context/source 文件
```

固定约束：

```text
一次只做一个小增量
数据库统一 MySQL
不接真实视频、真实商场素材、真实品牌或个人轨迹
新增依赖、镜像、模型、素材或外部服务前先审计许可证、成本和数据边界
Python backend/ 或 ai-services/ 必须重新创建虚拟环境
需要 sudo 时停下来让人类执行
完成后更新 PROGRESS.md、context/*.md 和 context/TODO_NEXT.md
```

继续开发时，人类只需输入：

```text
请进行下一步
```

