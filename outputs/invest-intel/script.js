const sampleNews = [
  {
    title: "Microsoft 与 OpenAI 基础设施开支继续牵动云厂商估值",
    source: "MarketWire",
    time: "昨日 13:20",
    symbol: "MSFT",
    type: "watch",
    sentiment: "good",
    impact: "中",
    sourceUrl: "https://www.alphavantage.co/documentation/#news-sentiment",
    sourceLatency: "新闻 API · 样例",
    why: "云资本开支会影响 AI 服务器、GPU、数据中心电力和软件平台预期。",
  },
  {
    title: "Bitcoin ETF 资金流入回升，COIN 与 MSTR 同步受关注",
    source: "Crypto Desk",
    time: "昨日 11:40",
    symbol: "CRYPTO:BTC",
    type: "watch",
    sentiment: "good",
    impact: "中",
    sourceUrl: "https://www.alphavantage.co/documentation/#news-sentiment",
    sourceLatency: "新闻 API · 样例",
    why: "加密资产流动性会传导到交易平台、矿企和持币公司估值。",
  },
  {
    title: "JPM 交易收入预期上修，金融股受利率曲线影响分化",
    source: "Financial Markets",
    time: "昨日 10:05",
    symbol: "JPM",
    type: "watch",
    sentiment: "warn",
    impact: "中",
    sourceUrl: "https://www.alphavantage.co/documentation/#news-sentiment",
    sourceLatency: "新闻 API · 样例",
    why: "银行股需要同时看净息差、交易收入、信贷成本和监管资本要求。",
  },
  {
    title: "GLP-1 需求强劲，LLY 与 NVO 供应扩张节奏成关键",
    source: "Healthcare Tape",
    time: "昨日 09:10",
    symbol: "LLY",
    type: "watch",
    sentiment: "good",
    impact: "高",
    sourceUrl: "https://www.alphavantage.co/documentation/#news-sentiment",
    sourceLatency: "新闻 API · 样例",
    why: "减重药需求影响长期收入天花板，但产能、定价和竞争格局需要持续复核。",
  },
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

let news = [...sampleNews];
let lastNewsMode = "sample";
let activeNewsWindowLabel = "";

const DEFAULT_ASSET_POOL =
  "NVDA,MSFT,AAPL,AMZN,META,GOOGL,TSLA,AMD,AVGO,SMCI,PLTR,COIN,MSTR,HOOD,BRK.B,JPM,LLY,NVO,SPY,QQQ,CRYPTO:BTC,CRYPTO:ETH,CRYPTO:SOL";

const heroEvents = [
  {
    title: "ARK 持仓日更",
    detail: "适合看 TSLA、COIN、ROKU 等成长股短期调仓节奏。",
    tag: "交易日后更新",
    tone: "buy",
    sourceName: "ARK ETF Holdings",
    sourceUrl: "https://helpcenter.ark-funds.com/where-can-i-download-the-latest-etf-holdings",
  },
  {
    title: "SEC 13F/内部人",
    detail: "追 Berkshire、机构持仓与 Form 4 高管交易，必须标注披露滞后。",
    tag: "可审计披露",
    tone: "file",
    sourceName: "SEC EDGAR",
    sourceUrl: "https://www.sec.gov/search-filings/edgar-application-programming-interfaces",
  },
  {
    title: "昨日市场新闻",
    detail: "从 Alpha Vantage 拉昨日广谱新闻，再用资产池匹配股票和币。",
    tag: "API 新闻",
    tone: "warn",
    sourceName: "Alpha Vantage",
    sourceUrl: "https://www.alphavantage.co/documentation/#news-sentiment",
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
  ["NVDA", "$182.40", "+2.8%", "6", "AI 基建核心", "高"],
  ["MSFT", "$514.30", "+0.9%", "5", "云与 AI 支出", "中"],
  ["AAPL", "$231.66", "+0.5%", "3", "Berkshire 重仓", "中"],
  ["TSLA", "$259.10", "+1.9%", "4", "ARK 增持", "高"],
  ["AMD", "$173.22", "+1.4%", "4", "AI GPU 替代线", "高"],
  ["AVGO", "$304.12", "+0.8%", "3", "ASIC/网络芯片", "中"],
  ["PLTR", "$152.76", "-1.7%", "5", "AI 软件叙事", "高"],
  ["COIN", "$321.20", "-2.4%", "5", "加密交易量", "高"],
  ["CRYPTO:BTC", "$113,800", "+1.1%", "7", "ETF 资金流", "高"],
  ["CRYPTO:ETH", "$4,230", "+0.7%", "5", "链上与 ETF", "高"],
  ["JPM", "$286.41", "+0.4%", "2", "金融风向", "中"],
  ["LLY", "$742.18", "+1.3%", "3", "GLP-1", "中"],
  ["OXY", "$61.32", "-0.8%", "2", "Berkshire 增持", "低"],
  ["SPY", "$644.10", "+0.4%", "9", "大盘基准", "中"],
  ["QQQ", "$579.40", "+0.8%", "8", "科技权重", "中"],
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
  MSFT: [
    ["昨日", "新闻", "云资本开支和 AI 基础设施预算继续影响估值预期。"],
    ["本周", "风险", "需要确认 Azure 增速和 AI 收入贡献是否匹配市场预期。"],
    ["复盘", "估值", "关注自由现金流能否覆盖高强度资本开支。"],
  ],
  AMD: [
    ["昨日", "新闻", "AI GPU 替代线热度升高，市场关注客户导入进度。"],
    ["本周", "供应链", "HBM、封装和数据中心订单是关键变量。"],
    ["风险", "竞争", "需要和 NVDA、AVGO 的份额变化一起看。"],
  ],
  PLTR: [
    ["昨日", "新闻", "AI 软件订单和政府/商业客户扩张是主要叙事。"],
    ["本周", "估值", "高倍数股票对增长放缓非常敏感。"],
    ["复盘", "信号", "观察新闻热度是否转化为实际合同披露。"],
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
  "CRYPTO:BTC": [
    ["昨日", "新闻", "ETF 资金流、宏观流动性和风险偏好共同影响 BTC。"],
    ["本周", "链上", "观察交易所余额、ETF 净流入和期货资金费率。"],
    ["风险", "监管", "加密监管消息会快速传导到 COIN、MSTR 等股票。"],
  ],
  JPM: [
    ["昨日", "新闻", "银行交易收入和利率曲线变化影响金融股预期。"],
    ["本周", "宏观", "关注净息差、信贷成本和监管资本要求。"],
    ["风险", "周期", "经济放缓会改变贷款损失假设。"],
  ],
  LLY: [
    ["昨日", "新闻", "GLP-1 需求和产能扩张继续是医药主线。"],
    ["本周", "供应", "产能、定价和竞争药物进展是主要变量。"],
    ["风险", "估值", "高成长预期需要持续兑现。"],
  ],
  "BRK.B": [
    ["季度", "13F", "持仓披露更新后重算行业暴露。"],
    ["长期", "现金", "现金水平影响潜在回购和收购空间。"],
    ["风险", "保险", "巨灾损失和承保周期需要跟踪。"],
  ],
};

const stockMeta = {
  NVDA: ["NVDA · NVIDIA", "$182.40", "+2.8%"],
  MSFT: ["MSFT · Microsoft", "$514.30", "+0.9%"],
  TSLA: ["TSLA · Tesla", "$259.10", "+1.9%"],
  AAPL: ["AAPL · Apple", "$231.66", "+0.5%"],
  AMD: ["AMD · Advanced Micro Devices", "$173.22", "+1.4%"],
  AVGO: ["AVGO · Broadcom", "$304.12", "+0.8%"],
  PLTR: ["PLTR · Palantir", "$152.76", "-1.7%"],
  OXY: ["OXY · Occidental Petroleum", "$61.32", "-0.8%"],
  COIN: ["COIN · Coinbase", "$321.20", "-2.4%"],
  "CRYPTO:BTC": ["BTC · Bitcoin", "$113,800", "+1.1%"],
  "CRYPTO:ETH": ["ETH · Ethereum", "$4,230", "+0.7%"],
  JPM: ["JPM · JPMorgan Chase", "$286.41", "+0.4%"],
  LLY: ["LLY · Eli Lilly", "$742.18", "+1.3%"],
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

function pad2(value) {
  return String(value).padStart(2, "0");
}

function formatLocalDate(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function formatAlphaVantageDateTime(date) {
  return `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}T${pad2(date.getHours())}${pad2(date.getMinutes())}`;
}

function previousDayWindow(now = new Date()) {
  const start = new Date(now);
  start.setDate(now.getDate() - 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setHours(23, 59, 0, 0);

  return {
    start,
    end,
    dateLabel: formatLocalDate(start),
    timeFrom: formatAlphaVantageDateTime(start),
    timeTo: formatAlphaVantageDateTime(end),
  };
}

function updateDeskDates() {
  const yesterday = previousDayWindow();
  activeNewsWindowLabel = yesterday.dateLabel;
  $("#deskDate").textContent = `${formatLocalDate(new Date())} · 美股盘前工作台`;
  $("#newsWindow").textContent = `新闻窗口：${yesterday.dateLabel} 00:00-23:59，本机时区。`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatAlphaVantageTime(value) {
  if (!value || value.length < 13) return "刚刚";
  const year = value.slice(0, 4);
  const month = value.slice(4, 6);
  const day = value.slice(6, 8);
  const hour = value.slice(9, 11);
  const minute = value.slice(11, 13);
  return `${month}-${day} ${hour}:${minute} UTC`;
}

function sentimentClass(score) {
  const numeric = Number(score);
  if (Number.isNaN(numeric)) return "warn";
  if (numeric > 0.12) return "good";
  if (numeric < -0.12) return "bad";
  return "warn";
}

function sentimentLabel(sentiment) {
  if (sentiment === "good") return "偏利好";
  if (sentiment === "bad") return "偏利空";
  return "需复核";
}

function impactFromSentiment(score) {
  const numeric = Math.abs(Number(score));
  if (Number.isNaN(numeric)) return "中";
  if (numeric >= 0.35) return "高";
  if (numeric >= 0.12) return "中";
  return "低";
}

function firstTicker(article) {
  const tickers = article.ticker_sentiment || [];
  return tickers[0]?.ticker || "MARKET";
}

function trackedAssets() {
  return $("#tickerInput").value
    .split(",")
    .map((ticker) => ticker.trim().toUpperCase())
    .filter(Boolean);
}

function normalizedAsset(symbol) {
  return symbol.replace(/^CRYPTO:/, "");
}

function matchesTrackedAsset(symbol, assets = trackedAssets()) {
  const normalized = normalizedAsset(symbol);
  return assets.some((asset) => asset === symbol || normalizedAsset(asset) === normalized);
}

function bestTickerForArticle(article, assets = trackedAssets()) {
  const tickers = article.ticker_sentiment || [];
  const tracked = tickers.find((ticker) => matchesTrackedAsset(ticker.ticker || "", assets));
  return tracked?.ticker || tickers[0]?.ticker || "MARKET";
}

function mapAlphaVantageArticle(article) {
  const ticker = bestTickerForArticle(article);
  const score = article.overall_sentiment_score;
  return {
    title: article.title || "未命名新闻",
    source: article.source || "Alpha Vantage",
    time: formatAlphaVantageTime(article.time_published),
    symbol: ticker,
    type: matchesTrackedAsset(ticker) ? "watch" : "macro",
    sentiment: sentimentClass(score),
    impact: impactFromSentiment(score),
    sourceUrl: article.url || "https://www.alphavantage.co/documentation/#news-sentiment",
    sourceLatency: "Alpha Vantage · 昨日新闻",
    why: article.summary || "来自 Alpha Vantage News & Sentiment 的实时/历史市场新闻。",
  };
}

function dedupeArticles(feed) {
  const seen = new Set();
  return feed.filter((article) => {
    const key = article.url || `${article.title}-${article.time_published}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function setApiStatus(message, tone = "neutral") {
  const status = $("#apiStatus");
  status.textContent = message;
  status.dataset.tone = tone;
}

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

function renderHeroEvents() {
  $("#eventDeck").innerHTML = heroEvents
    .map(
      (event) => `
        <a class="signal-card ${event.tone}" href="${event.sourceUrl}" target="_blank" rel="noreferrer">
          <span>${event.tag}</span>
          <strong>${event.title}</strong>
          <small>${event.detail}</small>
          <em>${event.sourceName}</em>
        </a>
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

  if (filtered.length === 0) {
    $("#newsFeed").innerHTML = `
      <article class="news-item">
        <strong>没有匹配的新闻</strong>
        <p>可以换一个 ticker、关键词，或放宽新闻过滤条件。</p>
      </article>
    `;
    return;
  }

  $("#newsFeed").innerHTML = filtered
    .map(
      (item) => `
        <article class="news-item">
          <div class="meta-line">
            <span class="tag ${escapeHtml(item.sentiment)}">${sentimentLabel(item.sentiment)}</span>
            <span>${escapeHtml(item.symbol)}</span>
            <span>${escapeHtml(item.source)}</span>
            <span>${escapeHtml(item.time)}</span>
            <span>影响：${escapeHtml(item.impact)}</span>
            <span>${escapeHtml(item.sourceLatency)}</span>
          </div>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.why)}</p>
          <a class="source-link" href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noreferrer">查看来源</a>
        </article>
      `
    )
    .join("");
}

async function loadAlphaVantageNews(options = {}) {
  const key = $("#apiKeyInput").value.trim();
  const tickers = $("#tickerInput").value
    .split(",")
    .map((ticker) => ticker.trim().toUpperCase())
    .filter(Boolean)
    .join(",");

  if (!key) {
    setApiStatus("请先填入 Alpha Vantage API Key。", "warn");
    return;
  }

  window.localStorage.setItem("investIntelAlphaVantageKey", key);
  window.localStorage.setItem("investIntelTickers", tickers);
  const newsWindow = previousDayWindow();
  activeNewsWindowLabel = newsWindow.dateLabel;
  setApiStatus(`正在拉取 ${newsWindow.dateLabel} 的 Alpha Vantage 新闻...`, "neutral");
  $("#loadNewsBtn").disabled = true;

  try {
    const params = new URLSearchParams({
      function: "NEWS_SENTIMENT",
      time_from: newsWindow.timeFrom,
      time_to: newsWindow.timeTo,
      sort: "LATEST",
      limit: "100",
      apikey: key,
    });

    const response = await fetch(`https://www.alphavantage.co/query?${params.toString()}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();

    if (payload.Note) throw new Error(payload.Note);
    if (payload.Information) throw new Error(payload.Information);
    if (payload["Error Message"]) throw new Error(payload["Error Message"]);
    if (!Array.isArray(payload.feed)) throw new Error("返回格式里没有 feed。");

    news = dedupeArticles(payload.feed).map(mapAlphaVantageArticle);
    lastNewsMode = "api";
    renderNews($(".segment.active")?.dataset.filter || "all", $("#searchInput").value);
    setApiStatus(`已加载 ${news.length} 条 ${newsWindow.dateLabel} 的广谱市场新闻；资产池用于前端标记，不作为 API 同时匹配条件。`, "good");
  } catch (error) {
    news = [...sampleNews];
    lastNewsMode = "sample";
    renderNews($(".segment.active")?.dataset.filter || "all", $("#searchInput").value);
    const prefix = options.auto ? "自动刷新失败" : "拉取失败";
    setApiStatus(`${prefix}，已回到样例数据：${error.message}`, "bad");
  } finally {
    $("#loadNewsBtn").disabled = false;
  }
}

function restoreApiInputs() {
  const storedKey = window.localStorage.getItem("investIntelAlphaVantageKey");
  const storedTickers = window.localStorage.getItem("investIntelTickers");
  const storedAssetCount = (storedTickers || "").split(",").map((ticker) => ticker.trim()).filter(Boolean).length;
  if (storedKey) {
    $("#apiKeyInput").value = storedKey;
    setApiStatus("已从本机浏览器读取 API Key，正在自动刷新昨日新闻。", "neutral");
  }
  if (storedTickers && storedTickers !== "NVDA,TSLA,AAPL,OXY,COIN" && storedAssetCount >= 10) {
    $("#tickerInput").value = storedTickers;
  } else {
    $("#tickerInput").value = DEFAULT_ASSET_POOL;
    window.localStorage.setItem("investIntelTickers", DEFAULT_ASSET_POOL);
  }
  return Boolean(storedKey);
}

function clearApiKey() {
  window.localStorage.removeItem("investIntelAlphaVantageKey");
  $("#apiKeyInput").value = "";
  setApiStatus(
    lastNewsMode === "api" ? "API Key 已清除；当前新闻会保留到下次刷新。" : "API Key 已清除；当前显示样例数据。",
    "neutral"
  );
}

function resetAssetPool() {
  $("#tickerInput").value = DEFAULT_ASSET_POOL;
  window.localStorage.setItem("investIntelTickers", DEFAULT_ASSET_POOL);
  setApiStatus("已恢复默认资产池；下次拉取会用广谱新闻并按这些资产做标记。", "good");
}

function scheduleDailyNewsRefresh() {
  window.setInterval(() => {
    const latestWindow = previousDayWindow();
    if (latestWindow.dateLabel === activeNewsWindowLabel) return;

    updateDeskDates();
    if ($("#apiKeyInput").value.trim()) {
      loadAlphaVantageNews({ auto: true });
    }
  }, 30 * 60 * 1000);
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
$("#loadNewsBtn").addEventListener("click", loadAlphaVantageNews);
$("#resetAssetsBtn").addEventListener("click", resetAssetPool);
$("#clearApiKeyBtn").addEventListener("click", clearApiKey);

updateDeskDates();
const hasStoredApiKey = restoreApiInputs();
renderPriorities();
renderHeroEvents();
renderNews();
renderWatchlist();
renderGurus();
renderTimeline();
renderSources();
if (hasStoredApiKey) loadAlphaVantageNews({ auto: true });
scheduleDailyNewsRefresh();
