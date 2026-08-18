# Invest Intel

投资情报驾驶舱原型：聚合新闻、观察列表、大佬持仓/披露信号、股票事件时间线和决策笔记。

## 使用

直接打开 `outputs/invest-intel/index.html`，或在该目录启动静态服务器：

```bash
python3 -m http.server 4173
```

然后访问 `http://127.0.0.1:4173/`。

## 当前状态

- 静态 HTML/CSS/JS 原型
- 使用模拟数据展示产品体验
- 已区分 13F、ARK 日度持仓、STOCK Act、Form 4 的披露延迟
- 后续可接入 Alpha Vantage、SEC EDGAR、ARK CSV 等真实数据源
