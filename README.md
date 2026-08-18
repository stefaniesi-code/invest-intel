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

## 信息来源

- [Alpha Vantage News & Sentiment](https://www.alphavantage.co/documentation/#news-sentiment)：新闻流和情绪分数
- [SEC EDGAR APIs](https://www.sec.gov/search-filings/edgar-application-programming-interfaces)：公司披露、13F、Form 4
- [SEC Form 13F FAQ](https://www.sec.gov/rules-regulations/staff-guidance/division-investment-management-frequently-asked-questions/frequently-asked-questions-about-form-13f)：机构持仓披露口径
- [ARK ETF Holdings](https://helpcenter.ark-funds.com/where-can-i-download-the-latest-etf-holdings)：ARK ETF 日度持仓
- [House Financial Disclosures](https://disclosures-clerk.house.gov/FinancialDisclosure)：美国众议员交易披露
- [SEC Insider Transactions](https://www.sec.gov/data-research/sec-markets-data/insider-transactions-data-sets)：内部人交易数据集
