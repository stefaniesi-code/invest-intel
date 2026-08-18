const news = [
  {
    title: "AI 服务器订单继续上修，NVDA 供应链同步走强",
    source: "MarketWire",
    time: "08:12",
    symbol: "NVDA",
    type: "watch",
    sentiment: "good",
    impact: "高",
    sourceUrl: "https://www.alphavantage.co/documentation/#news-sentiment",
    sourceLatency: "新闻 API · 近实时",
    why: "直接影响数据中心收入预期，同时会传导到内存、光模块和代工链。",
  },
  {
    title: "美债收益率回落，成长股估值压力短线缓和",
    source: "Macro Desk",
    time: "07:45",
    symbol: "QQQ",
    type: "macro",
    sentiment: "good",
    impact: "中",
    sourceUrl: "https://www.alphavantage.co/documentation/#news-sentiment",
    sourceLatency: "新闻 API · 近实时",
    why: "利率下行通常利好久期较长的科技资产，但需要确认是否来自增长放缓。",
  },
  {
    title: "Berkshire 最新 13F 显示 OXY 权重继续提升",
    source: "SEC EDGAR",
    time: "昨日",
    symbol: "OXY",
    type: "filing",
    sentiment: "warn",
    impact: "中",
    sourceUrl: "https://www.sec.gov/search-filings/edgar-application-programming-interfaces",
    sourceLatency: "SEC EDGAR · 披露后更新",
    why: "13F 是季度披露，能看方向但不能当作实时买卖单。",
  },
  {
    title: "ARK 日度持仓文件显示 TSLA 小幅增持，COIN 小幅减持",
    source: "ARK ETF CSV",
    time: "昨日收盘后",
    symbol: "TSLA",
    type: "filing",
    sentiment: "good",
    impact: "中",
    sourceUrl: "https://helpcenter.ark-funds.com/where-can-i-download-the-latest-etf-holdings",
    sourceLatency: "ARK ETF · 交易日后更新",
    why: "ARK ETF 持仓日更，更适合观察短期调仓节奏。",
  },
  {
    title: "某国会议员披露半导体 ETF 交易，披露日晚于交易日",
    source: "STOCK Act",
    time: "06:50",
    symbol: "SMH",
    type: "filing",
    sentiment: "warn",
    impact: "低",
    sourceUrl: "https://disclosures-clerk.house.gov/FinancialDisclosure",
    sourceLatency: "STOCK Act · 延迟披露",
    why: "国会议员披露通常有延迟，适合做主题观察，不适合追实时交易。",
  },
  {
    title: "AAPL 服务业务增长预期提高，但硬件换机周期仍待确认",
    source: "Earnings Scout",
    time: "05:30",
    symbol: "AAPL",
    type: "watch",
    sentiment: "good",
    impact: "中",
    sourceUrl: "https://www.alphavantage.co/documentation/#news-sentiment",
    sourceLatency: "新闻 API · 近实时",
    why: "服务收入改善估值质量，硬件销量仍是主要不确定性。",
  },
];

const sourceDefinitions = [
  {
    name: "Alpha Vantage News & Sentiment",
    url: "https://www.alphavantage.co/documentation/#news-sentiment",
    cadence: "近实时新闻",
    use: "按 ticker、主题、时间抓新闻，并附带情绪分数，适合做新闻流和信号强度。",
    caveat: "需要 API key；情绪分数只能作为排序辅助，不能直接当结论。",
  },
  {
    name: "SEC EDGAR APIs",
    url: "https://www.sec.gov/search-filings/edgar-application-programming-interfaces",
    cadence: "披露后更新",
    use: "抓公司公告、13F、Form 4、公司事实数据，适合做可审计的披露追踪。",
    caveat: "文件结构复杂，需要解析 accession number、CIK、表单类型和报告期。",
  },
  {
    name: "SEC Form 13F FAQ",
    url: "https://www.sec.gov/rules-regulations/staff-guidance/division-investment-management-frequently-asked-questions/frequently-asked-questions-about-form-13f",
    cadence: "季度披露",
    use: "解释机构持仓披露口径，适合给 Berkshire 等机构动作加延迟标签。",
    caveat: "13F 不是实时交易记录，通常最多滞后 45 天。",
  },
  {
    name: "ARK ETF Holdings",
    url: "https://helpcenter.ark-funds.com/where-can-i-download-the-latest-etf-holdings",
    cadence: "交易日后更新",
    use: "追踪 Cathie Wood/ARK ETF 每日持仓变化，适合做短期调仓观察。",
    caveat: "ETF 持仓不是完整个人组合，需要按基金权重理解。",
  },
  {
    name: "House Financial Disclosures",
    url: "https://disclosures-clerk.house.gov/FinancialDisclosure",
    cadence: "延迟披露",
    use: "追踪美国众议员定期交易报告，适合发现政策敏感主题。",
    caveat: "披露时间晚于交易发生时间，金额多为区间。",
  },
  {
    name: "SEC Insider Transactions",
    url: "https://www.sec.gov/data-research/sec-markets-data/insider-transactions-data-sets",
    cadence: "披露后数据集",
    use: "追踪 Form 3/4/5 内部人买卖，适合观察 CEO、CFO、董事交易。",
    caveat: "要区分主动买入、计划卖出、期权行权和税务相关交易。",
  },
];

const priorities = [
  { title: "NVDA 财报前预期升温", score: 92, meta: "观察列表 · 新闻密集 · 高波动" },
  { title: "Berkshire 对能源暴露增加", score: 78, meta: "13F 披露 · OXY · 滞后数据" },
  { title: "ARK 对 TSLA 短线加仓", score: 73, meta: "日度持仓 · 成长股情绪" },
  { title: "利率下行带动 QQQ", score: 69, meta: "宏观 · 估值重估" },
];

const watchlist = [
  ["NVDA", "$182.40", "+2.8%", "6", "ARK 轻微减持", "高"],
  ["TSLA", "$259.10", "+1.9%", "4", "ARK 增持", "中"],
  ["AAPL", "$231.66", "+0.5%", "3", "Berkshire 重仓", "中"],
  ["OXY", "$61.32", "-0.8%", "2", "Berkshire 增持", "低"],
  ["COIN", "$321.20", "-2.4%", "5", "ARK 减持", "高"],
];

const gurus = [
  {
    name: "Berkshire Hathaway",
    delay: "13F · 最多滞后 45 天",
    sourceName: "SEC EDGAR",
    sourceUrl: "https://www.sec.gov/edgar/browse/?CIK=1067983",
    style: "价值/保险现金流",
    aum: "$300B+",
    overlap: "AAPL / OXY",
    signal: "增持能源",
    moves: [
      ["增持", "OXY", "能源权重继续提高，适合观察油价和现金流假设。"],
      ["持有", "AAPL", "仍是核心仓位，但要看消费电子周期。"],
      ["减持", "BAC", "银行股风险暴露下降。"],
    ],
  },
  {
    name: "Cathie Wood / ARK",
    delay: "ETF 持仓 · 交易日后更新",
    sourceName: "ARK ETF Holdings",
    sourceUrl: "https://helpcenter.ark-funds.com/where-can-i-download-the-latest-etf-holdings",
    style: "创新成长",
    aum: "$10B+",
    overlap: "TSLA / COIN",
    signal: "高频调仓",
    moves: [
      ["增持", "TSLA", "成长股风险偏好回升时弹性更高。"],
      ["减持", "COIN", "加密主题短线降温。"],
      ["增持", "ROKU", "流媒体广告复苏假设。"],
    ],
  },
  {
    name: "国会议员交易",
    delay: "STOCK Act · 披露延迟",
    sourceName: "House Disclosures",
    sourceUrl: "https://disclosures-clerk.house.gov/FinancialDisclosure",
    style: "政策敏感",
    aum: "披露区间",
    overlap: "SMH / LMT",
    signal: "主题线索",
    moves: [
      ["买入", "SMH", "半导体政策和资本开支主题。"],
      ["卖出", "LMT", "国防预算预期需复核。"],
      ["买入", "XLV", "医疗政策相关 ETF。"],
    ],
  },
  {
    name: "公司内部人",
    delay: "Form 4 · 披露后可抓取",
    sourceName: "SEC Insider Transactions",
    sourceUrl: "https://www.sec.gov/data-research/sec-markets-data/insider-transactions-data-sets",
    style: "公司级信号",
    aum: "个人披露",
    overlap: "多股票",
    signal: "真金白银买入",
    moves: [
      ["买入", "CHPT", "CEO 买入通常比常规卖出更值得看。"],
      ["卖出", "MSFT", "需区分 10b5-1 计划卖出。"],
      ["买入", "TOI", "小盘股信号强但流动性风险高。"],
    ],
  },
];

const timelines = {
  NVDA: [
    ["08:12", "新闻", "AI 服务器订单预期上修，供应链反馈偏强。"],
    ["昨日", "观察列表", "新闻热度从 71 升至 92，波动风险提高。"],
    ["本周", "财报", "财报前隐含波动率升高，避免只看方向不看赔率。"],
  ],
  TSLA: [
    ["昨日", "ARK", "日度持仓显示小幅增持。"],
    ["07:10", "新闻", "自动驾驶和交付预期成为主要叙事。"],
    ["本周", "风险", "高估值对利率变化敏感。"],
  ],
  AAPL: [
    ["05:30", "新闻", "服务业务增长预期提高。"],
    ["季度", "13F", "仍与 Berkshire 持仓高度相关。"],
    ["下月", "产品", "硬件换机周期需要新证据。"],
  ],
  OXY: [
    ["昨日", "13F", "Berkshire 能源暴露提升。"],
    ["本周", "宏观", "油价和美元走势是主要变量。"],
    ["复盘", "估值", "自由现金流比营收增速更重要。"],
  ],
  COIN: [
    ["昨日", "ARK", "日度文件显示小幅减持。"],
    ["08:30", "市场", "加密资产波动传导到交易收入预期。"],
    ["风险", "监管", "监管消息可能快速改变估值假设。"],
  ],
  "BRK.B": [
    ["季度", "13F", "持仓披露更新后重算行业暴露。"],
    ["长期", "现金", "现金水平影响潜在回购和收购空间。"],
    ["风险", "保险", "巨灾损失和承保周期需要跟踪。"],
  ],
};

const stockMeta = {
  NVDA: ["NVDA · NVIDIA", "$182.40", "+2.8%"],
  TSLA: ["TSLA · Tesla", "$259.10", "+1.9%"],
  AAPL: ["AAPL · Apple", "$231.66", "+0.5%"],
  OXY: ["OXY · Occidental Petroleum", "$61.32", "-0.8%"],
  COIN: ["COIN · Coinbase", "$321.20", "-2.4%"],
  "BRK.B": ["BRK.B · Berkshire Hathaway", "$479.80", "+0.3%"],
};

const views = {
  dashboard: "今日情报",
  watchlist: "观察列表",
  gurus: "大佬追踪",
  stock: "股票详情",
  notes: "决策笔记",
  sources: "信息来源",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function renderPriorities() {
  $("#priorityList").innerHTML = priorities
    .map(
      (item, index) => `
        <article class="priority-item">
          <span class="rank">${index + 1}</span>
          <div>
            <strong>${item.title}</strong>
            <div class="meta-line">${item.meta}</div>
          </div>
          <span class="score">${item.score}</span>
        </article>
      `
    )
    .join("");
}

function renderNews(filter = "all", query = "") {
  const normalized = query.trim().toLowerCase();
  const filtered = news.filter((item) => {
    const filterMatch = filter === "all" || item.type === filter;
    const queryMatch =
      !normalized ||
      `${item.title} ${item.source} ${item.symbol}`.toLowerCase().includes(normalized);
    return filterMatch && queryMatch;
  });

  $("#newsFeed").innerHTML = filtered
    .map(
      (item) => `
        <article class="news-item">
          <div class="meta-line">
            <span class="tag ${item.sentiment}">${item.sentiment === "good" ? "偏利好" : item.sentiment === "bad" ? "偏利空" : "需复核"}</span>
            <span>${item.symbol}</span>
            <span>${item.source}</span>
            <span>${item.time}</span>
            <span>影响：${item.impact}</span>
            <span>${item.sourceLatency}</span>
          </div>
          <strong>${item.title}</strong>
          <p>${item.why}</p>
          <a class="source-link" href="${item.sourceUrl}" target="_blank" rel="noreferrer">查看来源</a>
        </article>
      `
    )
    .join("");
}

function renderWatchlist() {
  const rows = watchlist
    .map(
      ([symbol, price, change, newsCount, guru, risk]) => `
        <button class="stock-row" data-symbol="${symbol}" type="button">
          <strong>${symbol}</strong>
          <span>${price}</span>
          <span class="${change.startsWith("+") ? "positive" : "negative"}">${change}</span>
          <span>${newsCount} 条新闻</span>
          <span>${guru}</span>
          <span>${risk}波动</span>
        </button>
      `
    )
    .join("");

  $("#watchTable").innerHTML = `
    <div class="stock-row header">
      <span>股票</span><span>价格</span><span>涨跌</span><span>新闻</span><span>大佬信号</span><span>风险</span>
    </div>
    ${rows}
  `;
}

function renderGurus(activeIndex = 0) {
  $("#guruList").innerHTML = gurus
    .map(
      (guru, index) => `
        <button class="guru-item ${index === activeIndex ? "active" : ""}" data-guru="${index}" type="button">
          <strong>${guru.name}</strong>
          <div class="meta-line"><span>${guru.style}</span><span>${guru.delay}</span></div>
        </button>
      `
    )
    .join("");
  renderGuruDetail(activeIndex);
}

function renderGuruDetail(index) {
  const guru = gurus[index];
  $("#guruName").textContent = guru.name;
  $("#guruDelay").textContent = guru.delay;
  $("#guruStats").innerHTML = `
    <div><span>风格</span><strong>${guru.style}</strong></div>
    <div><span>规模/口径</span><strong>${guru.aum}</strong></div>
    <div><span>与你重合</span><strong>${guru.overlap}</strong></div>
    <div><span>追溯入口</span><strong><a class="inline-link" href="${guru.sourceUrl}" target="_blank" rel="noreferrer">${guru.sourceName}</a></strong></div>
  `;
  $("#guruMoves").innerHTML = guru.moves
    .map(
      ([action, symbol, detail]) => `
        <article class="move-item">
          <span class="tag ${action === "增持" || action === "买入" ? "good" : action === "减持" || action === "卖出" ? "bad" : ""}">${action}</span>
          <div><strong>${symbol}</strong><div class="meta-line">${detail}</div></div>
          <button class="ghost-action" data-symbol="${symbol}" type="button">查看</button>
        </article>
      `
    )
    .join("");
}

function renderSources() {
  $("#sourceGrid").innerHTML = sourceDefinitions
    .map(
      (source) => `
        <article class="source-card">
          <div class="source-card-top">
            <strong>${source.name}</strong>
            <span class="pill muted">${source.cadence}</span>
          </div>
          <p>${source.use}</p>
          <div class="source-caveat">${source.caveat}</div>
          <a class="source-link" href="${source.url}" target="_blank" rel="noreferrer">打开来源</a>
        </article>
      `
    )
    .join("");
}

function showView(view) {
  $$(".view").forEach((panel) => panel.classList.toggle("active-view", panel.id === view));
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  $("#viewTitle").textContent = views[view];
}

function renderTimeline(symbol = "NVDA") {
  const [name, price, change] = stockMeta[symbol] || stockMeta.NVDA;
  $("#stockName").textContent = name;
  $("#stockPrice").textContent = price;
  $("#stockChange").textContent = change;
  $("#stockChange").className = change.startsWith("+") ? "positive" : "negative";
  $("#timeline").innerHTML = (timelines[symbol] || timelines.NVDA)
    .map(
      ([time, kind, detail]) => `
        <article class="timeline-item">
          <div class="meta-line"><span>${time}</span><span class="tag">${kind}</span></div>
          <strong>${detail}</strong>
        </article>
      `
    )
    .join("");
}

function generateBrief() {
  showView("notes");
  $("#briefOutput").innerHTML = `
    <ul>
      <li><strong>先看 NVDA：</strong>新闻热度和波动同步升高，财报前不要只追方向，要看预期是否已经反映。</li>
      <li><strong>再看 OXY：</strong>Berkshire 的 13F 显示能源暴露增加，但数据最多滞后 45 天，只能当方向线索。</li>
      <li><strong>关注 TSLA：</strong>ARK 日度持仓显示小幅增持，适合观察成长股风险偏好是否延续。</li>
      <li><strong>宏观背景：</strong>利率下行缓和成长股估值压力，但要确认是否来自经济放缓。</li>
    </ul>
  `;
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest(".nav-item");
  if (nav) showView(nav.dataset.view);

  const segment = event.target.closest(".segment");
  if (segment) {
    $$(".segment").forEach((button) => button.classList.remove("active"));
    segment.classList.add("active");
    renderNews(segment.dataset.filter, $("#searchInput").value);
  }

  const guruButton = event.target.closest(".guru-item");
  if (guruButton) {
    renderGurus(Number(guruButton.dataset.guru));
  }

  const symbolButton = event.target.closest("[data-symbol]");
  if (symbolButton && symbolButton.dataset.symbol) {
    renderTimeline(symbolButton.dataset.symbol);
    showView("stock");
  }
});

$("#searchInput").addEventListener("input", (event) => {
  const activeFilter = $(".segment.active")?.dataset.filter || "all";
  renderNews(activeFilter, event.target.value);
});

$("#briefBtn").addEventListener("click", generateBrief);

renderPriorities();
renderNews();
renderWatchlist();
renderGurus();
renderTimeline();
renderSources();
