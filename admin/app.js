const assets = "../assets/";

const state = {
  view: "dashboard",
  filter: "all",
  query: "",
  records: {
    news: [
      { id: 1, title: "臺灣藝術家首度參與高知雙年展國際藝術交流", subtitle: "Kochi-Muziris Biennale", image: "news-1.png", status: "published", date: "2026-06-25", updated: "今天 09:42" },
      { id: 2, title: "Art Basel 將揭幕 Ibrahim Mahama 大型委託創作", subtitle: "Art Basel major commission", image: "news-2.png", status: "published", date: "2026-02-27", updated: "10 月 10 日" },
      { id: 3, title: "Virginia Overton《Material Girl》新書發表", subtitle: "Book Launch at Stiftung Sitterwerk", image: "news-3.png", status: "draft", date: "2026-02-21", updated: "10 月 8 日" },
      { id: 4, title: "White Cube at Frieze Los Angeles 2026", subtitle: "International art fair", image: "news-4.png", status: "offline", date: "2026-02-18", updated: "9 月 28 日" }
    ],
    exhibitions: [
      { id: 1, title: "那些死過人的樹，都被做成衛生紙：羅硯澤 創作個展", subtitle: "The Trees That Witnessed Death", image: "project-1.jpg", status: "published", date: "2025/12/06 – 2026/01/31", updated: "今天 10:18", venue: "米豆藝術空間" },
      { id: 2, title: "家裡的蒼蠅：張程鈞個展", subtitle: "Flies In The House", image: "project-3.png", status: "published", date: "2025/11/01 – 11/22", updated: "10 月 11 日", venue: "米豆藝術空間" },
      { id: 3, title: "延長線 PLUG & OUTLET", subtitle: "Zhao-Yi WEI Image Exhibition", image: "project-2.png", status: "draft", date: "2025/09/12 – 10/25", updated: "10 月 9 日", venue: "Room B" },
      { id: 4, title: "物件的自治與觀看", subtitle: "The Autonomy of Objects", image: "exhibition-autonomy.jpg", status: "offline", date: "2025/07/05 – 08/23", updated: "9 月 17 日", venue: "米豆藝術空間" }
    ],
    international: [
      { id: 1, title: "穿越群島：亞洲藝術交流計畫", subtitle: "Across the Archipelago", image: "exchange-1.jpg", status: "published", date: "2026", updated: "10 月 8 日" },
      { id: 2, title: "東京—台北藝術家駐留交換", subtitle: "Tokyo–Taipei Residency Exchange", image: "project-4.png", status: "draft", date: "2026", updated: "10 月 6 日" },
      { id: 3, title: "海岸線之外", subtitle: "Beyond the Coastline", image: "hero.jpg", status: "offline", date: "2025", updated: "9 月 3 日" }
    ],
    publications: [
      { id: 1, title: "那些死過人的樹，都被做成衛生紙", subtitle: "展覽手冊 PDF", image: "project-1.jpg", status: "published", date: "2026-01-12", updated: "10 月 3 日" },
      { id: 2, title: "家裡的蒼蠅 Flies In The House", subtitle: "展覽專刊 PDF", image: "project-3.png", status: "published", date: "2025-11-01", updated: "9 月 28 日" },
      { id: 3, title: "米豆藝術空間 2025 年報", subtitle: "年度出版品 PDF", image: "news-list.jpg", status: "draft", date: "2025-12-30", updated: "9 月 21 日" }
    ],
    artists: [
      { id: 1, title: "Franek Ammer", nationality: "波蘭", residencyDate: "2026.09", website: "https://www.franekammer.com", subtitle: "", image: "artists-2026/franek.png", date: "2026.09", updated: "10 月 24 日" },
      { id: 2, title: "Seirin Hyung", nationality: "南韓", residencyDate: "2026.02", website: "https://www.seirinhyung.com/", subtitle: "", image: "artists-2026/seirin.png", date: "2026.02", updated: "10 月 24 日" },
      { id: 3, title: "Vladimir Us", nationality: "摩爾多瓦", residencyDate: "2025.05", website: "https://oberliht.org/", subtitle: "", image: "artists-2026/vladimir.png", date: "2025.05", updated: "10 月 24 日" }
    ],
    home: [
      { id: 1, title: "纖遇鮮：王瑞華纖維創作計畫", subtitle: "Current Exhibition · Los Angeles", image: "hero.jpg", status: "published", date: "排序 01", updated: "今天 08:50" },
      { id: 2, title: "那些死過人的樹，都被做成衛生紙", subtitle: "Solo Exhibition · Taipei", image: "project-1.jpg", status: "published", date: "排序 02", updated: "10 月 10 日" },
      { id: 3, title: "穿越群島：亞洲藝術交流計畫", subtitle: "International Exchange", image: "exchange-1.jpg", status: "draft", date: "排序 03", updated: "10 月 6 日" }
    ]
  }
};

const NEWS_STORAGE_KEY = "middle-art-space-cms-news-v1";
const NEWS_STORAGE_META_KEY = `${NEWS_STORAGE_KEY}-saved-at`;
let newsLocalSavedAt = 0;
try {
  const savedNews = JSON.parse(localStorage.getItem(NEWS_STORAGE_KEY) || "null");
  if (Array.isArray(savedNews)) state.records.news = savedNews;
  newsLocalSavedAt = Number(localStorage.getItem(NEWS_STORAGE_META_KEY)) || 0;
} catch (error) {
  console.warn("無法讀取已儲存的最新消息草稿", error);
}

const EXHIBITIONS_STORAGE_KEY = "middle-art-space-cms-exhibitions-v1";
const EXHIBITIONS_STORAGE_META_KEY = `${EXHIBITIONS_STORAGE_KEY}-saved-at`;
let exhibitionsLocalSavedAt = 0;
try {
  const savedExhibitions = JSON.parse(localStorage.getItem(EXHIBITIONS_STORAGE_KEY) || "null");
  if (Array.isArray(savedExhibitions)) state.records.exhibitions = savedExhibitions;
  exhibitionsLocalSavedAt = Number(localStorage.getItem(EXHIBITIONS_STORAGE_META_KEY)) || 0;
} catch (error) {
  console.warn("無法讀取已儲存的展覽資料", error);
}

const INTERNATIONAL_STORAGE_KEY = "middle-art-space-cms-international-v1";
const INTERNATIONAL_STORAGE_META_KEY = `${INTERNATIONAL_STORAGE_KEY}-saved-at`;
let internationalLocalSavedAt = 0;
try {
  const savedInternational = JSON.parse(localStorage.getItem(INTERNATIONAL_STORAGE_KEY) || "null");
  if (Array.isArray(savedInternational)) state.records.international = savedInternational;
  internationalLocalSavedAt = Number(localStorage.getItem(INTERNATIONAL_STORAGE_META_KEY)) || 0;
} catch (error) {
  console.warn("無法讀取已儲存的國際專案", error);
}

const ARTISTS_STORAGE_KEY = "middle-art-space-cms-artists-v1";
const ARTISTS_STORAGE_META_KEY = `${ARTISTS_STORAGE_KEY}-saved-at`;
let artistsLocalSavedAt = 0;
try {
  const savedArtists = JSON.parse(localStorage.getItem(ARTISTS_STORAGE_KEY) || "null");
  if (Array.isArray(savedArtists)) state.records.artists = savedArtists;
  artistsLocalSavedAt = Number(localStorage.getItem(ARTISTS_STORAGE_META_KEY)) || 0;
} catch (error) {
  console.warn("無法讀取已儲存的藝術家資料", error);
}

const DEFAULT_OPEN_CALL = {
  bannerUrl: `${assets}open-call/banner.png`,
  bannerName: "banner.png",
  residencyTitle: "駐村資訊",
  residencyContent: "米豆藝術空間自 2023 年成立以來，持續邀請不同領域的青年藝術家進駐，透過展覽、工作坊與各類藝術交流活動，建立臺灣與國際藝術社群之間的連結。駐村計畫延續空間對青年創作與跨文化交流的關注，期待藝術家在不同的生活環境中拓展創作視野，並透過彼此的相遇與對話，開展新的合作可能。\n\n計畫鼓勵藝術家從自身的創作脈絡出發，透過觀察、研究與實驗，探索臺北的文化地景與日常生活，發展創作想法。同時，藉由作品呈現與交流活動，分享駐村期間的思考與實踐，讓藝術創作與在地觀眾產生連結。\n\n駐村地點\n米豆藝術空間座落於臺北市後火車站、建成圓環周邊，鄰近捷運中山站，步行即可抵達寧夏夜市，交通與生活機能便利。街區中的歷史紋理、商業活動與生活樣貌，提供藝術家認識臺北的多元視角，也成為駐村期間觀察與探索的起點。\n\n米豆藝術空間 Middle Art Space\n臺北市大同區太原路 156 巷 13 號 1 樓",
  spaceTitle: "空間資訊",
  galleryUrls: ["outside.png", "first-floor.png", "second-floor.png", "bedroom-a.png", "bedroom-b.png", "showerroom.png"].map(name => `${assets}open-call/${name}`)
};
const OPEN_CALL_STORAGE_KEY = "middle-art-space-cms-open-call-v1";
const OPEN_CALL_STORAGE_META_KEY = `${OPEN_CALL_STORAGE_KEY}-saved-at`;
let openCallData = { ...DEFAULT_OPEN_CALL };
let openCallLocalSavedAt = 0;
try {
  const savedOpenCall = JSON.parse(localStorage.getItem(OPEN_CALL_STORAGE_KEY) || "null");
  if (savedOpenCall && typeof savedOpenCall === "object") openCallData = { ...DEFAULT_OPEN_CALL, ...savedOpenCall };
  openCallLocalSavedAt = Number(localStorage.getItem(OPEN_CALL_STORAGE_META_KEY)) || 0;
} catch (error) {
  console.warn("無法讀取已儲存的公開徵件資料", error);
}

const CMS_DATABASE_NAME = "middle-art-space-cms";
const CMS_DATABASE_VERSION = 1;
const CMS_RECORD_STORE = "content-records";

function openCmsDatabase() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) return reject(new Error("瀏覽器不支援 IndexedDB"));
    const request = indexedDB.open(CMS_DATABASE_NAME, CMS_DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(CMS_RECORD_STORE)) database.createObjectStore(CMS_RECORD_STORE, { keyPath: "type" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readDatabaseRecords(type) {
  const database = await openCmsDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(CMS_RECORD_STORE, "readonly");
    const request = transaction.objectStore(CMS_RECORD_STORE).get(type);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => database.close();
  });
}

async function writeDatabaseRecords(type, records, savedAt) {
  const database = await openCmsDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(CMS_RECORD_STORE, "readwrite");
    transaction.objectStore(CMS_RECORD_STORE).put({ type, records, savedAt });
    transaction.oncomplete = () => { database.close(); resolve(); };
    transaction.onerror = () => { database.close(); reject(transaction.error); };
    transaction.onabort = () => { database.close(); reject(transaction.error); };
  });
}

async function restorePersistentRecords() {
  try {
    const [savedNews, savedExhibitions, savedInternational, savedArtists, savedOpenCall] = await Promise.all([
      readDatabaseRecords("news"),
      readDatabaseRecords("exhibitions"),
      readDatabaseRecords("international"),
      readDatabaseRecords("artists"),
      readDatabaseRecords("open-call")
    ]);
    if (Array.isArray(savedNews?.records) && savedNews.savedAt >= newsLocalSavedAt) state.records.news = savedNews.records;
    if (Array.isArray(savedExhibitions?.records) && savedExhibitions.savedAt >= exhibitionsLocalSavedAt) state.records.exhibitions = savedExhibitions.records;
    if (Array.isArray(savedInternational?.records) && savedInternational.savedAt >= internationalLocalSavedAt) state.records.international = savedInternational.records;
    if (Array.isArray(savedArtists?.records) && savedArtists.savedAt >= artistsLocalSavedAt) state.records.artists = savedArtists.records;
    if (savedOpenCall?.records && savedOpenCall.savedAt >= openCallLocalSavedAt) openCallData = { ...DEFAULT_OPEN_CALL, ...savedOpenCall.records };
  } catch (error) {
    console.warn("無法讀取後台資料庫，已改用瀏覽器備份", error);
  }
}

const viewMeta = {
  home: { title: "首頁 Home", desc: "管理主視覺幻燈片。展覽、消息與 Footer 由其他模組自動帶入。", action: "新增幻燈片", sort: true },
  about: { title: "關於空間 About", desc: "管理空間介紹與共用聯絡資訊；更新後會同步至首頁 Footer 與公開徵件。", single: true },
  news: { title: "最新消息 News", desc: "依發布日期由新到舊排列；首頁自動顯示最新 3 筆已上架消息。", action: "新增消息" },
  exhibitions: { title: "展覽 Exhibitions", desc: "展覽依展期與進行狀態自動排序，每檔展覽有獨立內容頁。", action: "新增展覽" },
  international: { title: "國際專案 International Exchange", desc: "依年份由新到舊排列，管理基本資訊、內容、藝術家、消息與團隊。", action: "新增專案" },
  publications: { title: "出版品 Publications", desc: "管理出版品圖片、雙語內容與 PDF；點擊前台卡片會直接另開 PDF。", action: "新增出版品" },
  "open-call": { title: "公開徵件 Open Call", desc: "單頁管理 Banner、駐村資訊與空間圖片，儲存後同步更新前台。", single: true },
  artists: { title: "藝術家 Artists", desc: "管理藝術家圖片、姓名、國籍與網站連結；可進入排序模式調整前台順序。", action: "新增藝術家", sort: true }
};

const main = document.querySelector("#main-content");
const breadcrumb = document.querySelector("#breadcrumb");
const drawer = document.querySelector("#editor-drawer");
const scrim = document.querySelector("#scrim");
let editing = null;
const ADMIN_LOCATION_KEY = "middle-art-space-cms-current-location-v1";

function saveAdminLocation(mode = "list", itemId = null) {
  try {
    sessionStorage.setItem(ADMIN_LOCATION_KEY, JSON.stringify({
      view: state.view,
      filter: state.filter,
      query: state.query,
      mode,
      itemId
    }));
  } catch (error) {
    console.warn("無法記錄目前後台頁面", error);
  }
}

function readAdminLocation() {
  try {
    return JSON.parse(sessionStorage.getItem(ADMIN_LOCATION_KEY) || "null");
  } catch (error) {
    console.warn("無法還原上次瀏覽位置", error);
    return null;
  }
}

function restoreAdminLocation() {
  const saved = readAdminLocation();
  const validView = saved?.view === "dashboard" || Boolean(viewMeta[saved?.view]);
  if (!validView) return navigate("dashboard");

  state.view = saved.view;
  state.filter = saved.filter || "all";
  state.query = saved.query || "";
  document.querySelectorAll(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.view === state.view));

  if (saved.mode === "editor" && state.view === "news") {
    const item = state.records.news.find(record => record.id === Number(saved.itemId)) || null;
    return renderNewsEditor(item);
  }
  if (saved.mode === "editor" && state.view === "exhibitions") {
    const item = state.records.exhibitions.find(record => record.id === Number(saved.itemId)) || null;
    return renderExhibitionEditor(item);
  }
  if (saved.mode === "editor" && state.view === "international") {
    const item = state.records.international.find(record => record.id === Number(saved.itemId)) || null;
    return renderInternationalEditor(item);
  }
  if (state.view === "dashboard") renderDashboard();
  else if (viewMeta[state.view].single) renderSingle(state.view);
  else renderList(state.view);
}

function todayLabel() {
  return new Intl.DateTimeFormat("zh-TW", { year: "numeric", month: "long", day: "numeric", weekday: "long" }).format(new Date());
}

function statusLabel(status) {
  return status === "published" ? "已上架" : status === "draft" ? "草稿" : "已下架";
}

function renderDashboard() {
  breadcrumb.textContent = "總覽";
  main.innerHTML = `
    <header class="page-head dashboard-head"><div><p class="eyebrow">Dashboard</p><h1>總覽</h1><p class="subtitle">目前先保留基本內容統計與展覽近況。</p></div></header>
    <section class="stats-grid" aria-label="內容統計">
      ${statCard("公開內容", "32", "+3 本月", "◇")}
      ${statCard("草稿", "4", "待確認", "◌")}
      ${statCard("目前展覽", "1", "進行中", "□")}
      ${statCard("藝術家", String(state.records.artists.length), "前台同步", "△")}
    </section>
    <section class="dashboard-grid">
      <div class="panel">
        <div class="panel-head"><h2>展覽近況</h2><button class="text-button" data-view-jump="exhibitions">查看全部 →</button></div>
        ${state.records.exhibitions.slice(0,3).map(miniItem).join("")}
      </div>
    </section>`;
  saveAdminLocation("list");
}

function statCard(label, value, note, icon) {
  return `<article class="stat-card"><div class="stat-top"><span>${label}</span><span class="stat-icon">${icon}</span></div><div class="stat-value">${value}</div><div class="stat-bottom"><span>內容總數</span><b>${note}</b></div></article>`;
}

function miniItem(item) {
  return `<div class="mini-item"><img src="${recordImageSrc(item)}" alt=""><div><h3>${item.title}</h3><p>${item.date} · ${item.venue || "米豆藝術空間"}</p></div><span class="status ${item.status === "published" ? "" : item.status}">${statusLabel(item.status)}</span></div>`;
}

function renderList(view) {
  const meta = viewMeta[view];
  const navCount = document.querySelector(`[data-count-view="${view}"]`);
  if (navCount) navCount.textContent = String(state.records[view]?.length || 0);
  const showsStatus = !["home", "artists"].includes(view);
  const records = (state.records[view] || []).filter(item => {
    const matchesFilter = !showsStatus || state.filter === "all" || item.status === state.filter;
    const matchesQuery = (item.title + item.subtitle).toLowerCase().includes(state.query.toLowerCase());
    return matchesFilter && matchesQuery;
  });
  breadcrumb.textContent = meta.title;
  main.innerHTML = `
    ${pageHead(meta, `<div class="button-row">${meta.sort ? `<button class="button secondary" data-sort-mode>調整排序</button>` : ""}<button class="button primary" data-new>${meta.action}</button></div>`)}
    <div class="toolbar">
      ${showsStatus ? `<div class="tabs" role="tablist">
        ${filterButton("all", "全部")}${filterButton("published", "已上架")}${filterButton("draft", "草稿")}${filterButton("offline", "已下架")}
      </div>` : `<span></span>`}
      <label class="search"><span>⌕</span><input id="search-input" type="search" placeholder="搜尋內容名稱…" value="${state.query}"></label>
    </div>
    <div class="table-wrap">
      <table class="content-table ${view}-table">
        <thead><tr><th>內容名稱</th>${showsStatus ? `<th>狀態</th>` : ""}<th>${view === "artists" ? "排序" : view === "international" ? "年份" : "日期／展期"}</th><th>最後更新</th><th class="actions-column">操作</th></tr></thead>
        <tbody>${records.length ? records.map(row => tableRow(view, row)).join("") : `<tr><td colspan="${showsStatus ? 5 : 4}" class="empty">沒有符合條件的內容</td></tr>`}</tbody>
      </table>
      <div class="table-footer"><span>顯示 ${records.length} 筆，共 ${state.records[view].length} 筆</span><div class="pagination"><button>←</button><button class="active">1</button><button>→</button></div></div>
    </div>`;
  saveAdminLocation("list");
}

function pageHead(meta, actions) {
  return `<header class="page-head"><div><p class="eyebrow">Content Management</p><h1>${meta.title}</h1><p class="subtitle">${meta.desc}</p></div>${actions || ""}</header>`;
}

function filterButton(value, label) {
  return `<button class="${state.filter === value ? "active" : ""}" data-filter="${value}" type="button">${label}</button>`;
}

function tableRow(view, item) {
  const showsStatus = !["home", "artists"].includes(view);
  return `<tr data-id="${item.id}">
    <td><div class="title-cell"><img src="${recordImageSrc(item)}" alt=""><div><strong>${item.title}</strong><small>${view === "artists" ? escapeHtml(item.nationality || "尚未填寫國籍") : item.subtitle}</small></div></div></td>
    ${showsStatus ? `<td><span class="status ${item.status === "published" ? "" : item.status}">${statusLabel(item.status)}</span></td>` : ""}
    <td>${item.date}</td><td>${item.updated}</td>
    <td class="actions-column"><div class="row-actions">${view === "artists" ? `<button data-delete title="刪除">刪除</button>` : ""}${showsStatus ? `<button data-toggle title="${item.status === "published" ? "下架" : "上架"}">${item.status === "published" ? "下架" : "上架"}</button>` : ""}<button class="edit-row-button" data-edit title="編輯">編輯</button></div></td>
  </tr>`;
}

function renderSingle(view) {
  const meta = viewMeta[view];
  breadcrumb.textContent = meta.title;
  const isAbout = view === "about";
  main.innerHTML = `
    ${pageHead(meta, `<div class="button-row"><button class="button primary" data-save-single>儲存變更</button></div>`)}
    <form class="single-card form-grid" id="single-form">
      <div class="form-section"><h2>${isAbout ? "空間內容" : "頁面內容"}</h2><p>${isAbout ? "About 頁面主要資料，同時作為其他頁面的共用來源。" : "管理目前的公開徵件內容與申請資訊。"}</p></div>
      ${isAbout ? aboutFields() : openCallFields(openCallData)}
      <div class="form-actions"><button class="button secondary" type="button" data-save-single>儲存草稿</button><button class="button primary" type="button" data-save-single>儲存變更</button></div>
    </form>`;
  saveAdminLocation("list");
}

function aboutFields() {
  return `
    <div class="field full"><label>空間介紹 <span>*</span></label><div class="rich-toolbar"><button type="button"><b>B</b></button><button type="button"><i>I</i></button><button type="button">H2</button><button type="button">•―</button><button type="button">↗</button></div><textarea>米豆藝術空間致力於當代藝術的展示、交流與研究，透過展覽、駐村及跨地域合作，建立藝術家與觀眾相遇的開放場域。</textarea></div>
    <div class="field full"><label>空間圖片 <span>*</span></label><div class="upload"><img src="${assets}about/space.png" alt="目前的空間照片"><div><h3>space.png</h3><p>建議尺寸 2000 × 1300 px，支援 JPG、PNG、WebP</p><button class="button secondary" type="button">更換圖片</button></div></div></div>
    <div class="form-section"><h2>聯絡與營業資訊</h2><p>這些資訊也會同步出現在首頁 Footer。</p></div>
    <div class="field full"><label>空間位置 <span>*</span></label><input value="103 臺北市大同區昌吉街25巷18號1樓"></div>
    <div class="field"><label>聯絡電話</label><input value="+886 – 2 2598 3520"></div>
    <div class="field"><label>聯絡信箱</label><input type="email" value="info@themiddleartspace.com"></div>
    <div class="field full"><label>營業時間</label><textarea>週三至週六 13:00–19:00\n週日至週二休館</textarea></div>`;
}

function openCallFields(data) {
  const galleryUrls = data.galleryUrls || [];
  return `
    <div class="field full"><label>Banner 圖片 <span>*</span></label><div class="hero-upload ${data.bannerUrl ? "has-image" : ""}">${data.bannerUrl ? `<img src="${escapeAttr(data.bannerUrl)}" alt="Open Call Banner 預覽">` : ""}<input class="visually-hidden" id="open-call-banner" type="file" accept="image/jpeg,image/png,image/webp" data-preview-url="${escapeAttr(data.bannerUrl || "")}"><button class="button secondary" type="button" data-upload-button="open-call-banner">${data.bannerUrl ? "更換圖片" : "選擇圖片"}</button><small>${escapeHtml(data.bannerName || "支援 JPG、PNG、WebP")}</small></div></div>
    <div class="form-section"><h2>駐村資訊</h2><p>此區塊會直接對應前台的「駐村資訊」。</p></div>
    <div class="field full"><label>區塊標題 <span>*</span></label><input name="residencyTitle" required value="${escapeAttr(data.residencyTitle || "")}" placeholder="請輸入區塊標題"></div>
    <div class="field full"><label>駐村內容 <span>*</span></label><textarea name="residencyContent" required placeholder="請輸入駐村資訊；空行會分成不同段落">${escapeHtml(data.residencyContent || "")}</textarea><small>使用空行分隔段落，前台會依序顯示。</small></div>
    <div class="form-section"><h2>空間資訊</h2><p>管理前台空間資訊標題與圖片列表。</p></div>
    <div class="field full"><label>區塊標題 <span>*</span></label><input name="spaceTitle" required value="${escapeAttr(data.spaceTitle || "")}" placeholder="請輸入區塊標題"></div>
    <div class="field full"><label>空間圖片 <span>*</span></label><div class="exhibition-gallery-upload ${galleryUrls.length ? "has-images" : ""}"><div class="exhibition-gallery-preview">${galleryUrls.map((url, index) => `<img src="${escapeAttr(url)}" alt="空間圖片 ${index + 1}">`).join("")}</div><input class="visually-hidden" id="open-call-gallery" type="file" accept="image/jpeg,image/png,image/webp" multiple data-preview-urls="${escapeAttr(JSON.stringify(galleryUrls))}"><button class="button secondary" type="button" data-upload-button="open-call-gallery">新增圖片</button><small>支援 JPG、PNG、WebP，可一次選擇多張。</small></div></div>`;
}

function renderSort(view) {
  const meta = viewMeta[view];
  const records = state.records[view];
  breadcrumb.textContent = `${meta.title} / 排序`;
  main.innerHTML = `
    ${pageHead({ title: `${meta.title} 排序`, desc: view === "home" ? "調整主視覺出現順序。" : "一次顯示全部藝術家並調整前台排列順序。" }, `<div class="button-row"><button class="button secondary" data-cancel-sort>返回列表</button><button class="button primary" data-save-sort>儲存排序</button></div>`)}
    <div class="sort-grid">${records.map((item, index) => sortCard(item, index, view)).join("")}</div>`;
}

function sortCard(item, index, view) {
  return `<article class="sort-card" data-sort-id="${item.id}"><span class="sort-index">${String(index + 1).padStart(2, "0")}</span><div class="move-buttons"><button type="button" data-move="up" aria-label="向前移動">←</button><button type="button" data-move="down" aria-label="向後移動">→</button></div><img src="${recordImageSrc(item)}" alt=""><h3>${item.title}</h3>${["home", "artists"].includes(view) ? "" : `<p>${statusLabel(item.status)}</p>`}</article>`;
}

function openEditor(view, item = null) {
  editing = { view, id: item?.id || null };
  const meta = viewMeta[view];
  document.querySelector("#drawer-kicker").textContent = meta.title;
  document.querySelector("#drawer-title").textContent = view === "artists" ? (item ? "編輯藝術家" : "新增藝術家") : (item ? "編輯內容" : meta.action);
  document.querySelector("#editor-fields").innerHTML = editorFields(view, item);
  const draftButton = document.querySelector("#save-draft");
  const submitButton = document.querySelector("#editor-form .drawer-actions button[type=submit]");
  draftButton.hidden = view === "artists";
  draftButton.textContent = "儲存草稿";
  submitButton.textContent = view === "artists" ? (item ? "儲存變更" : "新增藝術家") : "儲存變更";
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  scrim.classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(() => drawer.querySelector("input, textarea, select")?.focus(), 100);
}

function renderNewsEditor(item = null) {
  const data = item || { title: "", date: "", status: "draft", blocks: [] };
  const blocks = data.blocks || [];
  const sharedImageSrc = data.heroImageUrl || recordImageSrc(data);
  const sharedImageName = data.heroImageName || data.imageName || data.image || "";
  editing = { view: "news", id: item?.id || null, fullPage: true };
  saveAdminLocation("editor", item?.id || null);
  document.body.classList.add("news-editor-mode");
  main.innerHTML = `
    <form class="news-page-editor" id="news-page-form">
      <header class="news-editor-topbar">
        <button class="news-back" type="button" data-news-back aria-label="返回最新消息列表"><img src="assets/icons/arrow-back.svg" alt=""><span>${item ? "編輯消息" : "新增消息"}</span></button>
        <div class="news-editor-top-actions">
          <label class="status-select">狀態：<select name="status" aria-label="消息狀態"><option value="draft" ${data.status === "draft" ? "selected" : ""}>草稿</option><option value="published" ${data.status === "published" ? "selected" : ""}>已上架</option><option value="offline" ${data.status === "offline" ? "selected" : ""}>已下架</option></select></label>
        </div>
      </header>

      <div class="news-editor-canvas">
        <nav class="news-section-nav" aria-label="新增消息頁面區段">
          <a class="active" href="#news-basic">基本資訊</a>
          <a href="#news-content">消息內容</a>
        </nav>

        <div class="news-editor-sections">
          <section class="news-editor-section" id="news-basic">
            <h2>基本資訊</h2>
            <div class="news-editor-card">
              <div class="field news-date-field">
                <label for="news-date">發布日期 <span>*</span></label>
                <input id="news-date" name="date" type="date" required value="${escapeAttr(normalizeDate(data.date))}">
              </div>
              <div class="field">
                <label for="news-title">標題 <span>*</span></label>
                <input id="news-title" name="title" required placeholder="請輸入標題" value="${escapeAttr(data.title)}">
              </div>
              <div class="field">
                <label>首圖＆列表圖 <span>*</span></label>
                <div class="hero-upload ${sharedImageSrc ? "has-image" : ""}">
                  ${sharedImageSrc ? `<img src="${escapeAttr(sharedImageSrc)}" alt="首圖與列表圖預覽">` : ""}
                  <input class="visually-hidden" id="shared-image-input" type="file" accept="image/jpeg,image/png" data-preview-url="${escapeAttr(sharedImageSrc)}">
                  <button class="button secondary" type="button" data-upload-button="shared-image-input">${sharedImageSrc ? "更換圖片" : "選擇圖片"}</button>
                  <small>${sharedImageName || "支援 JPG、PNG"}</small>
                </div>
                <small class="field-note">內容頁會顯示完整圖片；最新消息列表使用同一張圖片並置中裁切為正方形。</small>
              </div>
            </div>
          </section>

          <section class="news-editor-section" id="news-content">
            <h2>消息內容</h2>
            <div class="news-editor-card news-content-card">
              <div class="article-builder ${blocks.length ? "" : "empty"}" id="article-builder" aria-live="polite">${blocks.map(block => articleBlock(block.type, block)).join("")}</div>
              ${newsInsertMenu()}
            </div>
          </section>
        </div>
      </div>

      <footer class="news-editor-footer">
        <button class="button secondary" type="button" data-news-save="draft">儲存草稿</button>
        <button class="button primary" type="submit">儲存內容</button>
      </footer>
    </form>`;
  main.focus();
}

function renderExhibitionEditor(item = null) {
  const data = item || { title: "", status: "draft", blocks: [], galleryUrls: [], customFields: [] };
  const dates = exhibitionDates(data.date);
  const listImageSrc = recordImageSrc(data);
  const contentImageSrc = data.contentImageUrl || "";
  const galleryUrls = data.galleryUrls || [];
  const blocks = data.blocks || [];
  editing = { view: "exhibitions", id: item?.id || null, fullPage: true };
  saveAdminLocation("editor", item?.id || null);
  document.body.classList.add("news-editor-mode", "project-editor-mode");
  main.innerHTML = `
    <form class="news-page-editor exhibition-page-editor" id="exhibition-page-form">
      <header class="news-editor-topbar">
        <button class="news-back" type="button" data-exhibition-back aria-label="返回展覽列表"><img src="assets/icons/arrow-back.svg" alt=""><span>${item ? "編輯專案" : "新增專案"}</span></button>
      </header>

      <div class="news-editor-canvas">
        <nav class="news-section-nav" aria-label="展覽頁面區段">
          <a class="active" href="#exhibition-basic">基本資訊</a>
          <a href="#exhibition-content">專案內容</a>
          <a href="#exhibition-gallery">展覽圖片</a>
        </nav>

        <div class="news-editor-sections">
          <section class="news-editor-section" id="exhibition-basic">
            <h2>基本資訊</h2>
            <div class="news-editor-card exhibition-basic-card">
              <div class="project-first-row">
                <div class="field">
                  <label>列表圖片 <span>*</span></label>
                  <div class="project-list-upload ${listImageSrc ? "has-image" : ""}">
                    <div class="project-list-preview"><span ${listImageSrc ? `style="display:none"` : ""}>＋</span>${listImageSrc ? `<img src="${escapeAttr(listImageSrc)}" alt="列表圖片預覽">` : ""}</div>
                    <div class="project-list-info"><strong>${escapeHtml(data.imageName || data.image || "尚未選擇圖片")}</strong><small>支援 JPG、PNG、WebP。</small><input class="visually-hidden" id="exhibition-list-image" type="file" accept="image/jpeg,image/png,image/webp" data-preview-url="${escapeAttr(listImageSrc)}"><button class="button secondary" type="button" data-upload-button="exhibition-list-image">${listImageSrc ? "更換圖片" : "選擇圖片"}</button></div>
                  </div>
                </div>
                <div class="field">
                  <label for="exhibition-publish-date">發布日期 <span>*</span></label>
                  <input id="exhibition-publish-date" name="publishDate" type="date" required value="${escapeAttr(data.publishDate || dates.start)}">
                </div>
              </div>

              <div class="field"><label for="exhibition-title">標題 <span>*</span></label><input id="exhibition-title" name="title" required placeholder="請輸入標題" value="${escapeAttr(data.title)}"></div>

              <div class="field">
                <label>內文圖片 <span>*</span></label>
                <div class="hero-upload project-content-upload ${contentImageSrc ? "has-image" : ""}">
                  ${contentImageSrc ? `<img src="${escapeAttr(contentImageSrc)}" alt="內文圖片預覽">` : ""}
                  <input class="visually-hidden" id="exhibition-content-image" type="file" accept="image/jpeg,image/png" data-preview-url="${escapeAttr(contentImageSrc)}">
                  <button class="button secondary" type="button" data-upload-button="exhibition-content-image">${contentImageSrc ? "更換圖片" : "選擇圖片"}</button>
                  <small>${escapeHtml(data.contentImageName || "支援 JPG、PNG")}</small>
                </div>
              </div>

              <div class="field"><label for="exhibition-artist">藝術家 <span>*</span></label><input id="exhibition-artist" name="artist" required placeholder="請輸入藝術家" value="${escapeAttr(data.artist || "")}"></div>
              <div class="field"><label for="exhibition-curator">策展人</label><input id="exhibition-curator" name="curator" placeholder="請輸入策展人" value="${escapeAttr(data.curator || "")}"></div>
              <div class="field"><label for="exhibition-venue">展出地點 <span>*</span></label><input id="exhibition-venue" name="venue" required placeholder="請輸入地點" value="${escapeAttr(data.venue || "")}"></div>

              <div class="project-date-row">
                <div class="field"><label for="exhibition-start">展覽起日 <span>*</span></label><input id="exhibition-start" name="start" type="date" required value="${escapeAttr(dates.start)}"></div>
                <div class="field"><label for="exhibition-end">展覽迄日 <span>*</span></label><input id="exhibition-end" name="end" type="date" required value="${escapeAttr(dates.end)}"></div>
              </div>

              <div class="field"><label for="exhibition-organizer">主辦單位</label><input id="exhibition-organizer" name="organizer" placeholder="請輸入主辦單位" value="${escapeAttr(data.organizer || "")}"></div>
              <div class="field"><label for="exhibition-sponsor">贊助單位</label><input id="exhibition-sponsor" name="sponsor" placeholder="請輸入贊助單位" value="${escapeAttr(data.sponsor || "")}"></div>
              <div class="project-custom-fields" id="project-custom-fields">${(data.customFields || []).map(projectCustomField).join("")}</div>
              <button class="project-add-field" type="button" data-add-project-field><img src="assets/icons/add-field.svg" alt="">新增欄位</button>
            </div>
          </section>

          <section class="news-editor-section" id="exhibition-content">
            <h2>專案內容</h2>
            <div class="news-editor-card news-content-card">
              <div class="article-builder ${blocks.length ? "" : "empty"}" id="article-builder" aria-live="polite">${blocks.map(block => articleBlock(block.type, block)).join("")}</div>
              ${newsInsertMenu()}
            </div>
          </section>

          <section class="news-editor-section" id="exhibition-gallery">
            <h2>展覽圖片</h2>
            <div class="news-editor-card">
              <div class="exhibition-gallery-upload ${galleryUrls.length ? "has-images" : ""}">
                <div class="exhibition-gallery-preview">${galleryUrls.map(url => `<img src="${escapeAttr(url)}" alt="展覽圖片預覽">`).join("")}</div>
                <input class="visually-hidden" id="exhibition-gallery-input" type="file" accept="image/jpeg,image/png" multiple data-preview-urls="${escapeAttr(JSON.stringify(galleryUrls))}">
                <button class="button secondary" type="button" data-upload-button="exhibition-gallery-input">新增圖片</button>
                <small>支援 JPG、PNG</small>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer class="news-editor-footer">
        <button class="button secondary" type="button" data-exhibition-save="draft">儲存草稿</button>
        <button class="button primary" type="submit">儲存內容</button>
      </footer>
    </form>`;
  main.focus();
}

function renderInternationalEditor(item = null) {
  const data = item || { title: "", subtitle: "", status: "draft", blocks: [], projectArtists: [], relatedNews: [], teamMembers: [] };
  const listImageSrc = recordImageSrc(data);
  const heroImageSrc = data.heroImageUrl || "";
  editing = { view: "international", id: item?.id || null, fullPage: true };
  saveAdminLocation("editor", item?.id || null);
  document.body.classList.add("news-editor-mode", "project-editor-mode", "international-editor-mode");
  main.innerHTML = `
    <form class="news-page-editor international-page-editor" id="international-page-form">
      <header class="news-editor-topbar">
        <button class="news-back" type="button" data-international-back aria-label="返回國際專案列表"><img src="assets/icons/arrow-back.svg" alt=""><span>${item ? "編輯國際專案" : "新增國際專案"}</span></button>
        <div class="news-editor-top-actions"><span>狀態：${statusLabel(data.status)}</span></div>
      </header>
      <div class="news-editor-canvas">
        <nav class="news-section-nav" aria-label="國際專案頁面區段">
          <a class="active" href="#international-basic">基本資訊</a><a href="#international-content">專案內容</a><a href="#international-artists">藝術家</a><a href="#international-news">相關新聞</a><a href="#international-team">執行團隊</a>
        </nav>
        <div class="news-editor-sections">
          <section class="news-editor-section" id="international-basic"><h2>基本資訊</h2><div class="news-editor-card exhibition-basic-card">
            <div class="project-first-row">
              <div class="field"><label>列表圖片 <span>*</span></label><div class="project-list-upload ${listImageSrc ? "has-image" : ""}"><div class="project-list-preview"><span ${listImageSrc ? `style="display:none"` : ""}>＋</span>${listImageSrc ? `<img src="${escapeAttr(listImageSrc)}" alt="列表圖片預覽">` : ""}</div><div class="project-list-info"><strong>${escapeHtml(data.imageName || data.image || "尚未選擇圖片")}</strong><small>支援 JPG、PNG、WebP。</small><input class="visually-hidden" id="international-list-image" type="file" accept="image/jpeg,image/png,image/webp" data-preview-url="${escapeAttr(listImageSrc)}"><button class="button secondary" type="button" data-upload-button="international-list-image">${listImageSrc ? "更換圖片" : "選擇圖片"}</button></div></div></div>
              <div class="field"><label for="international-publish-date">發布日期 <span>*</span></label><input id="international-publish-date" name="publishDate" type="date" required value="${escapeAttr(data.publishDate || "")}"></div>
            </div>
            <div class="field"><label for="international-title">標題 <span>*</span></label><input id="international-title" name="title" required placeholder="請輸入標題" value="${escapeAttr(data.title)}"></div>
            <div class="field"><label for="international-subtitle">英文副標 <span>*</span></label><input id="international-subtitle" name="subtitle" required placeholder="請輸入副標" value="${escapeAttr(data.subtitle)}"></div>
            <div class="field"><label>列表圖＆內文圖片 <span>*</span></label><div class="hero-upload project-content-upload ${heroImageSrc ? "has-image" : ""}">${heroImageSrc ? `<img src="${escapeAttr(heroImageSrc)}" alt="內文圖片預覽">` : ""}<input class="visually-hidden" id="international-hero-image" type="file" accept="image/jpeg,image/png" data-preview-url="${escapeAttr(heroImageSrc)}"><button class="button secondary" type="button" data-upload-button="international-hero-image">${heroImageSrc ? "更換圖片" : "選擇圖片"}</button><small>${escapeHtml(data.heroImageName || "支援 JPG、PNG")}</small></div></div>
            <div class="field"><label>邀請人 <span>*</span></label><input name="inviter" required placeholder="請輸入邀請人" value="${escapeAttr(data.inviter || "")}"></div>
            <div class="project-date-row"><div class="field"><label>計畫起日 <span>*</span></label><input name="planStart" type="date" required value="${escapeAttr(data.planStart || "")}"></div><div class="field"><label>計畫迄日 <span>*</span></label><input name="planEnd" type="date" required value="${escapeAttr(data.planEnd || "")}"></div></div>
            <div class="field"><label>計畫執行地點 <span>*</span></label><input name="planVenue" required placeholder="請輸入地點" value="${escapeAttr(data.planVenue || "")}"></div>
            <div class="field"><label>展名 <span>*</span></label><input name="exhibitionName" required placeholder="請輸入展名" value="${escapeAttr(data.exhibitionName || "")}"></div>
            <div class="field"><label>展出地點 <span>*</span></label><input name="exhibitionVenue" required placeholder="請輸入地點" value="${escapeAttr(data.exhibitionVenue || "")}"></div>
            <div class="project-date-row"><div class="field"><label>展覽起日 <span>*</span></label><input name="exhibitionStart" type="date" required value="${escapeAttr(data.exhibitionStart || "")}"></div><div class="field"><label>展覽迄日 <span>*</span></label><input name="exhibitionEnd" type="date" required value="${escapeAttr(data.exhibitionEnd || "")}"></div></div>
            <div class="field"><label>參與藝術家 <span>*</span></label><input name="participatingArtists" required placeholder="請輸入參與藝術家" value="${escapeAttr(data.participatingArtists || "")}"></div>
          </div></section>
          <section class="news-editor-section" id="international-content"><h2>專案內容</h2><div class="news-editor-card news-content-card"><div class="article-builder ${data.blocks?.length ? "" : "empty"}" id="article-builder">${(data.blocks || []).map(block => articleBlock(block.type, block)).join("")}</div>${newsInsertMenu()}</div></section>
          ${internationalRepeatSection("artists", "藝術家", data.projectArtists || [])}
          ${internationalRepeatSection("news", "相關新聞", data.relatedNews || [])}
          ${internationalRepeatSection("team", "執行團隊", data.teamMembers || [])}
        </div>
      </div>
      <footer class="news-editor-footer"><button class="button secondary" type="button" data-international-save="draft">儲存草稿</button><button class="button primary" type="submit">儲存內容</button></footer>
    </form>`;
  main.focus();
}

function internationalRepeatSection(type, title, items) {
  const id = type === "artists" ? "international-artists" : type === "news" ? "international-news" : "international-team";
  const addLabel = type === "artists" ? "新增藝術家" : type === "news" ? "新增新聞" : "新增成員";
  return `<section class="news-editor-section" id="${id}"><h2>${title}</h2><div class="news-editor-card international-repeat-card"><div class="international-repeat-list" data-repeat-list="${type}">${items.map(item => internationalRepeatItem(type, item)).join("")}</div><button class="project-add-field" type="button" data-add-international="${type}"><img src="assets/icons/add-field.svg" alt="">${addLabel}</button></div></section>`;
}

function internationalRepeatItem(type, item = {}) {
  const title = type === "artists" ? "藝術家資訊" : type === "news" ? "新聞資訊" : "成員資訊";
  let body = "";
  if (type === "artists") body = `<div class="international-artist-grid"><div class="block-image-upload ${item.imageUrl ? "has-image" : ""}">${item.imageUrl ? `<img src="${escapeAttr(item.imageUrl)}" alt="藝術家圖片">` : ""}<input class="visually-hidden international-artist-image" type="file" accept="image/jpeg,image/png" data-preview-url="${escapeAttr(item.imageUrl || "")}"><button class="button secondary" type="button" data-repeat-upload>${item.imageUrl ? "更換圖片" : "選擇圖片"}</button><small>支援 JPG、PNG</small></div><div><label>藝術家姓名<input data-repeat-field="name" placeholder="請輸入姓名" value="${escapeAttr(item.name || "")}"></label><label>國籍<input data-repeat-field="nationality" placeholder="請輸入國籍" value="${escapeAttr(item.nationality || "")}"></label></div></div>`;
  if (type === "news") body = `<label>新聞標題<input data-repeat-field="title" placeholder="請輸入標題" value="${escapeAttr(item.title || "")}"></label><label>英文副標<input data-repeat-field="subtitle" placeholder="請輸入英文副標" value="${escapeAttr(item.subtitle || "")}"></label><label class="repeat-date">新聞日期<input data-repeat-field="date" type="date" value="${escapeAttr(item.date || "")}"></label>`;
  if (type === "team") body = `<label>姓名<input data-repeat-field="name" placeholder="請輸入姓名" value="${escapeAttr(item.name || "")}"></label><label>負責項目<input data-repeat-field="role" placeholder="請輸入負責項目" value="${escapeAttr(item.role || "")}"></label>`;
  return `<div class="international-repeat-item" data-repeat-type="${type}"><header><span>${title}</span><div><button type="button" data-repeat-move="up">↑</button><button type="button" data-repeat-move="down">↓</button><button type="button" data-repeat-remove>×</button></div></header><div class="international-repeat-body">${body}</div></div>`;
}

function projectCustomField(field = {}) {
  const label = field.label || "自訂欄位";
  return `<div class="field project-custom-row"><input type="hidden" name="customLabel" value="${escapeAttr(label)}"><div class="project-custom-label"><label>${escapeHtml(label)}</label><button type="button" data-remove-project-field>移除欄位</button></div><input name="customValue" placeholder="請輸入${escapeAttr(label)}" aria-label="${escapeAttr(label)}" value="${escapeAttr(field.value || "")}"></div>`;
}

function openProjectFieldDialog() {
  const projectFieldDialog = document.querySelector("#project-field-dialog");
  const nameInput = document.querySelector("#project-field-name");
  nameInput.value = "";
  projectFieldDialog.showModal();
  requestAnimationFrame(() => nameInput.focus());
}

function closeProjectFieldDialog() {
  document.querySelector("#project-field-dialog")?.close();
}

function createProjectCustomField() {
  const nameInput = document.querySelector("#project-field-name");
  const label = nameInput?.value.trim();
  if (!label) return nameInput?.focus();
  const fields = document.querySelector("#project-custom-fields");
  fields?.insertAdjacentHTML("beforeend", projectCustomField({ label }));
  closeProjectFieldDialog();
  fields?.querySelector(".project-custom-row:last-child input[name=customValue]")?.focus();
}

function newsInsertMenu() {
  return `<div class="news-insert-menu">
    <strong>新增文章區塊</strong>
    <div class="block-add-menu" aria-label="新增文章區塊">
      <button type="button" data-add-block="paragraph">＋文字</button>
      <button type="button" data-add-block="heading">＋標題</button>
      <button type="button" data-add-block="image">＋圖片</button>
    </div>
  </div>`;
}

function editorFields(view, item) {
  const data = item || { title: "", subtitle: "", date: "", venue: "" };
  if (view === "artists") return artistEditorFields(data, item);
  const labels = { home: "右下資訊文字", news: "消息標題", exhibitions: "展覽名稱", international: "專案名稱", publications: "出版品內容", artists: "藝術家姓名" };
  return `
    <div class="field full"><label>${labels[view] || "標題"} <span>*</span></label><input name="title" required value="${escapeAttr(data.title)}" placeholder="請輸入內容名稱"></div>
    ${view !== "artists" ? `<div class="field full"><label>${view === "publications" ? "英文或補充內容" : "英文副標／補充資訊"}</label><textarea name="subtitle" placeholder="可輸入中文與英文">${data.subtitle || ""}</textarea></div>` : ""}
    ${view === "exhibitions" ? `<div class="field"><label>展覽開始日期 <span>*</span></label><input type="date" name="start" value="2025-12-06"></div><div class="field"><label>展覽結束日期 <span>*</span></label><input type="date" name="end" value="2026-01-31"></div><div class="field full"><label>展出地點 <span>*</span></label><input name="venue" value="${escapeAttr(data.venue || "米豆藝術空間")}"></div>` : ""}
    ${view === "news" ? `<div class="field"><label>發布日期 <span>*</span></label><input type="date" name="date" value="${normalizeDate(data.date)}"></div><div class="field"><label>顯示狀態</label><select name="status"><option value="draft">草稿</option><option value="published" ${data.status === "published" ? "selected" : ""}>已上架</option><option value="offline">已下架</option></select></div>` : ""}
    ${view === "international" ? `<div class="field"><label>年份 <span>*</span></label><input type="number" name="date" value="${data.date || 2026}"></div><div class="field"><label>顯示狀態</label><select><option>草稿</option><option>已上架</option><option>已下架</option></select></div>` : ""}
    <div class="field full"><label>${view === "home" ? "主圖" : view === "artists" ? "藝術家圖片" : "列表／封面圖片"} <span>*</span></label><div class="upload">${item ? `<img src="${assets + item.image}" alt="目前圖片">` : `<div style="width:150px;height:110px;background:#ebe8e3;border-radius:5px;display:grid;place-items:center;color:#999">＋</div>`}<div><h3>${item ? item.image.split("/").pop() : "尚未選擇圖片"}</h3><p>支援 JPG、PNG、WebP。</p><button class="button secondary" type="button">選擇圖片</button></div></div></div>
    ${view === "news" ? newsArticleBuilder() : ""}
    ${["exhibitions", "international"].includes(view) ? `<div class="field full"><label>${view === "exhibitions" ? "Introduce 展覽介紹" : "Plan Content 計畫內容"}</label><div class="rich-toolbar"><button type="button"><b>B</b></button><button type="button"><i>I</i></button><button type="button">H2</button><button type="button">•―</button><button type="button">↗</button><button type="button">▧</button></div><textarea>在此輸入內容，可加入段落、標題、列表、連結與圖片。</textarea></div>` : ""}
    ${view === "publications" ? `<div class="field full"><label>PDF 檔案 <span>*</span></label><input type="text" value="exhibition-catalogue.pdf" readonly><small>僅接受 PDF，可重新上傳替換。</small></div>` : ""}
    ${view === "home" ? `<div class="field full"><label>點擊連結 <span>*</span></label><input value="/project-detail.html"><small>外部網址可在前台設定另開新分頁。</small></div>` : ""}`;
}

function artistEditorFields(data, item) {
  const imageSrc = recordImageSrc(data);
  return `
    <div class="field full"><label>藝術家圖片 <span>*</span></label><div class="project-list-upload artist-image-upload ${imageSrc ? "has-image" : ""}"><div class="project-list-preview"><span ${imageSrc ? `style="display:none"` : ""}>＋</span>${imageSrc ? `<img src="${escapeAttr(imageSrc)}" alt="藝術家圖片預覽">` : ""}</div><div class="project-list-info"><strong>${escapeHtml(data.imageName || data.image || "尚未選擇圖片")}</strong><small>支援 JPG、PNG、WebP。</small><input class="visually-hidden" id="artist-image-input" type="file" accept="image/jpeg,image/png,image/webp" data-preview-url="${escapeAttr(imageSrc)}"><button class="button secondary" type="button" data-upload-button="artist-image-input">${imageSrc ? "更換圖片" : "選擇圖片"}</button></div></div></div>
    <div class="field full"><label>姓名 <span>*</span></label><input name="title" required value="${escapeAttr(data.title || "")}" placeholder="請輸入藝術家姓名"></div>
    <div class="field full"><label>國籍 <span>*</span></label><input name="nationality" required value="${escapeAttr(data.nationality || "")}" placeholder="請輸入國籍"></div>
    <div class="field full"><label>駐村年月 <span>*</span></label><input name="residencyDate" type="month" required value="${escapeAttr((data.residencyDate || data.date || "").replace(".", "-"))}"></div>
    <div class="field full"><label>網站連結 <small>（選填）</small></label><input name="website" type="url" value="${escapeAttr(data.website || "")}" placeholder="https://example.com"><small>請輸入完整網址，例如 https://example.com</small></div>`;
}

function newsArticleBuilder() {
  return `<div class="field full article-field">
    <div class="article-builder-head">
      <div><label>文章內容 <span>*</span></label><small>以區塊組成文章，拖曳左側把手即可調整前後順序。</small></div>
      <div class="block-add-menu" aria-label="新增文章區塊">
        <button type="button" data-add-block="paragraph">＋ 文字</button>
        <button type="button" data-add-block="heading">＋ 標題</button>
        <button type="button" data-add-block="image">＋ 圖片</button>
      </div>
    </div>
    <div class="article-builder" id="article-builder">
      ${articleBlock("heading", "臺灣藝術家首度參與國際藝術交流")}
      ${articleBlock("paragraph", "米豆藝術空間持續推動跨地域藝術交流，透過展覽、研究與駐地計畫，讓臺灣創作者與國際策展及藝術社群展開對話。")}
      ${articleBlock("image", "existing")}
      ${articleBlock("paragraph", "本次計畫將於展覽期間舉辦藝術家座談與交流活動，相關時間與參與方式將另行公告。")}
    </div>
    <div class="builder-tip"><span>⋮⋮</span> 拖曳區塊重新排序；也可以使用每個區塊右上角的方向按鈕。</div>
  </div>`;
}

function articleBlock(type, content = "") {
  const labels = { paragraph: "文字段落", heading: "段落標題", image: "內容圖片" };
  const imageInputId = `article-image-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const blockData = typeof content === "object" && content ? content : { content };
  const textContent = blockData.content || "";
  let body = "";
  if (type === "heading") {
    body = `<input class="block-heading-input" value="${escapeAttr(textContent)}" aria-label="段落標題">`;
  } else if (type === "image") {
    const imageSrc = blockData.imageUrl || (content === "existing" ? `${assets}news-detail/image-2.png` : "");
    const caption = blockData.caption || (content === "existing" ? "展覽現場，攝影：米豆藝術空間" : "");
    body = `<div class="block-image-editor empty-image"><div class="block-image-upload ${imageSrc ? "has-image" : ""}">${imageSrc ? `<img src="${escapeAttr(imageSrc)}" alt="內容圖片預覽">` : ""}<input class="visually-hidden" id="${imageInputId}" type="file" accept="image/jpeg,image/png" data-preview-url="${escapeAttr(imageSrc)}"><button class="button secondary" type="button" data-upload-button="${imageInputId}">${imageSrc ? "更換圖片" : "選擇圖片"}</button><small>${blockData.imageName || (imageSrc ? "已選擇圖片" : "支援 JPG、PNG")}</small></div><label>圖片說明<textarea rows="1" placeholder="請輸入圖說" aria-label="圖片說明">${escapeHtml(caption)}</textarea></label></div>`;
  } else {
    body = `<div class="block-formatbar" aria-label="文字格式"><select aria-label="字型"><option>Roboto</option></select>${formatIcon("bold", "粗體")}${formatIcon("italic", "斜體")}${formatIcon("underline", "底線")}${formatIcon("strikethrough", "刪除線")}${formatIcon("text-color", "文字顏色")}${formatIcon("background-color", "背景顏色")}${formatIcon("ordered-list", "編號清單")}${formatIcon("unordered-list", "項目清單")}${formatIcon("outdent", "減少縮排")}${formatIcon("indent", "增加縮排")}${formatIcon("link", "插入連結")}</div><textarea aria-label="文字段落" placeholder="請輸入內文">${escapeHtml(textContent)}</textarea>`;
  }
  return `<section class="article-block" draggable="true" data-block-type="${type}">
    <div class="block-grip"><button type="button" class="drag-handle" aria-label="拖曳此區塊" title="拖曳排序">⋮⋮</button><span class="block-number"></span></div>
    <div class="block-content"><header class="block-head"><span>${labels[type]}</span><div><button type="button" data-block-move="up" aria-label="向上移動">↑</button><button type="button" data-block-move="down" aria-label="向下移動">↓</button><button type="button" data-block-remove aria-label="刪除區塊">×</button></div></header><div class="block-body">${body}</div></div>
  </section>`;
}

function formatIcon(name, label) {
  return `<button type="button" title="${label}" aria-label="${label}"><img src="assets/icons/${name}.svg" alt=""></button>`;
}

function closeNewsEditor() {
  document.body.classList.remove("news-editor-mode", "project-editor-mode");
  editing = null;
  navigate("news");
}

function closeExhibitionEditor() {
  document.body.classList.remove("news-editor-mode", "project-editor-mode");
  editing = null;
  navigate("exhibitions");
}

function closeInternationalEditor() {
  document.body.classList.remove("news-editor-mode", "project-editor-mode", "international-editor-mode");
  editing = null;
  navigate("international");
}

async function saveNewsPage(status = "draft") {
  const form = document.querySelector("#news-page-form");
  if (!form) return;
  const formData = new FormData(form);
  const title = formData.get("title")?.trim();
  if (!title) {
    form.querySelector("[name=title]").focus();
    showToast("請先輸入消息標題");
    return;
  }
  const sharedImage = form.querySelector("#shared-image-input");
  let item = state.records.news.find(record => record.id === editing?.id);
  const sharedImageUrl = sharedImage?.dataset.previewUrl || item?.heroImageUrl || item?.imageUrl || "";
  const sharedImageName = sharedImage?.files?.[0]?.name || item?.heroImageName || item?.imageName || item?.image || "";
  const saved = {
    title,
    subtitle: item?.subtitle || "自訂文章內容",
    image: item?.image || "news-list.jpg",
    imageUrl: sharedImageUrl,
    imageName: sharedImageName,
    heroImageUrl: "",
    heroImageName: "",
    status: status === "draft" ? "draft" : (formData.get("status") || "draft"),
    date: formData.get("date") || "尚未設定",
    updated: "剛剛",
    blocks: collectNewsBlocks(form)
  };
  if (item) Object.assign(item, saved);
  else {
    item = { id: Date.now(), ...saved };
    state.records.news.unshift(item);
  }
  await persistNewsRecords();
  document.body.classList.remove("news-editor-mode");
  editing = null;
  renderList("news");
  showToast(status === "draft" ? "草稿已儲存" : "內容已儲存");
}

async function persistNewsRecords() {
  const savedAt = Date.now();
  let localStorageHasImages = true;
  try {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(state.records.news));
    localStorage.setItem(NEWS_STORAGE_META_KEY, String(savedAt));
    newsLocalSavedAt = savedAt;
  } catch (error) {
    localStorageHasImages = false;
    const withoutEmbeddedImages = state.records.news.map(item => ({
      ...item,
      imageUrl: item.imageUrl?.startsWith("data:") ? "" : item.imageUrl,
      heroImageUrl: item.heroImageUrl?.startsWith("data:") ? "" : item.heroImageUrl,
      blocks: item.blocks?.map(block => ({ ...block, imageUrl: block.imageUrl?.startsWith("data:") ? "" : block.imageUrl }))
    }));
    try {
      localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(withoutEmbeddedImages));
      localStorage.setItem(NEWS_STORAGE_META_KEY, String(savedAt));
      newsLocalSavedAt = savedAt;
    } catch (fallbackError) {
      console.warn("最新消息瀏覽器備份容量不足", fallbackError);
    }
  }
  try {
    await writeDatabaseRecords("news", state.records.news, savedAt);
    if (!localStorageHasImages) showToast("草稿與圖片已存入後台資料庫");
  } catch (error) {
    console.warn("無法寫入最新消息資料庫", error);
  }
}

async function saveExhibitionPage(status = "draft") {
  const form = document.querySelector("#exhibition-page-form");
  if (!form) return;
  const formData = new FormData(form);
  const title = formData.get("title")?.trim();
  if (!title) {
    form.querySelector("[name=title]")?.focus();
    return showToast("請先輸入展覽標題");
  }

  let item = state.records.exhibitions.find(record => record.id === editing?.id);
  const listImage = form.querySelector("#exhibition-list-image");
  const contentImage = form.querySelector("#exhibition-content-image");
  const galleryInput = form.querySelector("#exhibition-gallery-input");
  const start = formData.get("start") || "";
  const end = formData.get("end") || "";
  const labels = formData.getAll("customLabel");
  const values = formData.getAll("customValue");
  const customFields = labels.map((label, index) => ({ label: String(label).trim(), value: String(values[index] || "").trim() })).filter(field => field.label || field.value);
  const galleryUrls = parsePreviewUrls(galleryInput?.dataset.previewUrls, item?.galleryUrls || []);

  const saved = {
    title,
    subtitle: formData.get("artist")?.trim() || item?.subtitle || "",
    artist: formData.get("artist")?.trim() || "",
    curator: formData.get("curator")?.trim() || "",
    venue: formData.get("venue")?.trim() || "",
    organizer: formData.get("organizer")?.trim() || "",
    sponsor: formData.get("sponsor")?.trim() || "",
    publishDate: formData.get("publishDate") || "",
    date: formatExhibitionRange(start, end),
    start,
    end,
    image: item?.image || "project-1.jpg",
    imageUrl: listImage?.dataset.previewUrl || item?.imageUrl || "",
    imageName: listImage?.files?.[0]?.name || item?.imageName || item?.image || "",
    contentImageUrl: contentImage?.dataset.previewUrl || item?.contentImageUrl || "",
    contentImageName: contentImage?.files?.[0]?.name || item?.contentImageName || "",
    galleryUrls,
    customFields,
    blocks: collectNewsBlocks(form),
    status: status === "draft" ? "draft" : (item?.status || "draft"),
    updated: "剛剛"
  };

  if (item) Object.assign(item, saved);
  else {
    item = { id: Date.now(), ...saved };
    state.records.exhibitions.unshift(item);
  }
  await persistExhibitionRecords();
  document.body.classList.remove("news-editor-mode", "project-editor-mode");
  editing = null;
  renderList("exhibitions");
  showToast(status === "draft" ? "展覽草稿已儲存" : "展覽內容已儲存");
}

async function persistExhibitionRecords() {
  const savedAt = Date.now();
  let localStorageHasImages = true;
  try {
    localStorage.setItem(EXHIBITIONS_STORAGE_KEY, JSON.stringify(state.records.exhibitions));
    localStorage.setItem(EXHIBITIONS_STORAGE_META_KEY, String(savedAt));
    exhibitionsLocalSavedAt = savedAt;
  } catch (error) {
    localStorageHasImages = false;
    const withoutEmbeddedImages = state.records.exhibitions.map(item => ({
      ...item,
      imageUrl: item.imageUrl?.startsWith("data:") ? "" : item.imageUrl,
      contentImageUrl: item.contentImageUrl?.startsWith("data:") ? "" : item.contentImageUrl,
      galleryUrls: (item.galleryUrls || []).filter(url => !url.startsWith("data:")),
      blocks: item.blocks?.map(block => ({ ...block, imageUrl: block.imageUrl?.startsWith("data:") ? "" : block.imageUrl }))
    }));
    try {
      localStorage.setItem(EXHIBITIONS_STORAGE_KEY, JSON.stringify(withoutEmbeddedImages));
      localStorage.setItem(EXHIBITIONS_STORAGE_META_KEY, String(savedAt));
      exhibitionsLocalSavedAt = savedAt;
    } catch (fallbackError) {
      console.warn("展覽瀏覽器備份容量不足", fallbackError);
    }
  }
  try {
    await writeDatabaseRecords("exhibitions", state.records.exhibitions, savedAt);
    if (!localStorageHasImages) showToast("展覽資料與圖片已存入後台資料庫");
  } catch (error) {
    console.warn("無法寫入展覽資料庫", error);
  }
}

async function saveInternationalPage(status = "draft") {
  const form = document.querySelector("#international-page-form");
  if (!form) return;
  const formData = new FormData(form);
  const title = formData.get("title")?.trim();
  if (!title) return showToast("請先輸入國際專案標題");
  let item = state.records.international.find(record => record.id === editing?.id);
  const listImage = form.querySelector("#international-list-image");
  const heroImage = form.querySelector("#international-hero-image");
  const publishDate = formData.get("publishDate") || "";
  const saved = {
    title,
    subtitle: formData.get("subtitle")?.trim() || "",
    status: status === "draft" ? "draft" : (item?.status || "draft"),
    date: publishDate.slice(0, 4) || item?.date || "尚未設定",
    publishDate,
    updated: "剛剛",
    image: item?.image || "exchange-1.jpg",
    imageUrl: listImage?.dataset.previewUrl || item?.imageUrl || "",
    imageName: listImage?.files?.[0]?.name || item?.imageName || item?.image || "",
    heroImageUrl: heroImage?.dataset.previewUrl || item?.heroImageUrl || "",
    heroImageName: heroImage?.files?.[0]?.name || item?.heroImageName || "",
    inviter: formData.get("inviter")?.trim() || "",
    planStart: formData.get("planStart") || "",
    planEnd: formData.get("planEnd") || "",
    planVenue: formData.get("planVenue")?.trim() || "",
    exhibitionName: formData.get("exhibitionName")?.trim() || "",
    exhibitionVenue: formData.get("exhibitionVenue")?.trim() || "",
    exhibitionStart: formData.get("exhibitionStart") || "",
    exhibitionEnd: formData.get("exhibitionEnd") || "",
    participatingArtists: formData.get("participatingArtists")?.trim() || "",
    blocks: collectNewsBlocks(form),
    projectArtists: collectInternationalRepeats(form, "artists"),
    relatedNews: collectInternationalRepeats(form, "news"),
    teamMembers: collectInternationalRepeats(form, "team")
  };
  if (item) Object.assign(item, saved);
  else { item = { id: Date.now(), ...saved }; state.records.international.unshift(item); }
  await persistInternationalRecords();
  document.body.classList.remove("news-editor-mode", "project-editor-mode", "international-editor-mode");
  editing = null;
  renderList("international");
  showToast(status === "draft" ? "國際專案草稿已儲存" : "國際專案已儲存");
}

function collectInternationalRepeats(scope, type) {
  return [...scope.querySelectorAll(`[data-repeat-type="${type}"]`)].map(card => {
    const value = name => card.querySelector(`[data-repeat-field="${name}"]`)?.value.trim() || "";
    if (type === "artists") return { name: value("name"), nationality: value("nationality"), imageUrl: card.querySelector(".international-artist-image")?.dataset.previewUrl || "" };
    if (type === "news") return { title: value("title"), subtitle: value("subtitle"), date: value("date") };
    return { name: value("name"), role: value("role") };
  }).filter(item => Object.values(item).some(Boolean));
}

async function persistInternationalRecords() {
  const savedAt = Date.now();
  try {
    localStorage.setItem(INTERNATIONAL_STORAGE_KEY, JSON.stringify(state.records.international));
    localStorage.setItem(INTERNATIONAL_STORAGE_META_KEY, String(savedAt));
    internationalLocalSavedAt = savedAt;
  } catch (error) {
    const compact = state.records.international.map(item => ({ ...item, imageUrl: item.imageUrl?.startsWith("data:") ? "" : item.imageUrl, heroImageUrl: item.heroImageUrl?.startsWith("data:") ? "" : item.heroImageUrl, blocks: item.blocks?.map(block => ({ ...block, imageUrl: block.imageUrl?.startsWith("data:") ? "" : block.imageUrl })), projectArtists: item.projectArtists?.map(artist => ({ ...artist, imageUrl: artist.imageUrl?.startsWith("data:") ? "" : artist.imageUrl })) }));
    try { localStorage.setItem(INTERNATIONAL_STORAGE_KEY, JSON.stringify(compact)); localStorage.setItem(INTERNATIONAL_STORAGE_META_KEY, String(savedAt)); } catch (fallbackError) { console.warn("國際專案瀏覽器備份容量不足", fallbackError); }
  }
  try { await writeDatabaseRecords("international", state.records.international, savedAt); } catch (error) { console.warn("無法寫入國際專案資料庫", error); }
}

function exhibitionDates(value = "") {
  const matches = String(value).match(/\d{4}[/-]\d{2}[/-]\d{2}|\d{2}[/-]\d{2}/g) || [];
  const start = matches[0]?.replaceAll("/", "-") || "";
  let end = matches[1]?.replaceAll("/", "-") || "";
  if (end && /^\d{2}-\d{2}$/.test(end) && start) end = `${start.slice(0, 4)}-${end}`;
  return { start, end };
}

function formatExhibitionRange(start, end) {
  const format = value => value ? value.replaceAll("-", "/") : "";
  return start && end ? `${format(start)} – ${format(end)}` : format(start || end) || "尚未設定";
}

function parsePreviewUrls(value, fallback = []) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function collectNewsBlocks(scope = document) {
  return [...scope.querySelectorAll("#article-builder .article-block")].map(block => {
    const type = block.dataset.blockType;
    if (type === "heading") return { type, content: block.querySelector(".block-heading-input")?.value || "" };
    if (type === "paragraph") return { type, content: block.querySelector("textarea")?.value || "" };
    const input = block.querySelector('input[type="file"]');
    return {
      type,
      imageUrl: input?.dataset.previewUrl || "",
      imageName: input?.files?.[0]?.name || block.querySelector(".block-image-upload small")?.textContent || "",
      caption: block.querySelector('[aria-label="圖片說明"]')?.value || ""
    };
  });
}

function currentNewsDraft() {
  const form = document.querySelector("#news-page-form");
  if (!form) return null;
  const existing = state.records.news.find(record => record.id === editing?.id) || {};
  const sharedImage = form.querySelector("#shared-image-input");
  const sharedImageUrl = sharedImage?.dataset.previewUrl || existing.heroImageUrl || existing.imageUrl || "";
  return {
    ...existing,
    title: form.querySelector("[name=title]")?.value.trim() || "未命名消息",
    date: form.querySelector("[name=date]")?.value || "尚未設定",
    status: form.querySelector("[name=status]")?.value || "draft",
    imageUrl: sharedImageUrl,
    heroImageUrl: "",
    blocks: collectNewsBlocks(form)
  };
}

function currentInternationalDraft() {
  const form = document.querySelector("#international-page-form");
  if (!form) return null;
  const existing = state.records.international.find(record => record.id === editing?.id) || {};
  const formData = new FormData(form);
  const listImage = form.querySelector("#international-list-image");
  const heroImage = form.querySelector("#international-hero-image");
  const publishDate = formData.get("publishDate") || "";
  return {
    ...existing,
    title: formData.get("title")?.trim() || "未命名國際專案",
    subtitle: formData.get("subtitle")?.trim() || "",
    date: publishDate.slice(0, 4) || existing.date || "尚未設定",
    publishDate,
    imageUrl: listImage?.dataset.previewUrl || existing.imageUrl || "",
    heroImageUrl: heroImage?.dataset.previewUrl || existing.heroImageUrl || "",
    inviter: formData.get("inviter")?.trim() || "",
    planStart: formData.get("planStart") || "",
    planEnd: formData.get("planEnd") || "",
    planVenue: formData.get("planVenue")?.trim() || "",
    exhibitionName: formData.get("exhibitionName")?.trim() || "",
    exhibitionVenue: formData.get("exhibitionVenue")?.trim() || "",
    exhibitionStart: formData.get("exhibitionStart") || "",
    exhibitionEnd: formData.get("exhibitionEnd") || "",
    participatingArtists: formData.get("participatingArtists")?.trim() || "",
    blocks: collectNewsBlocks(form),
    projectArtists: collectInternationalRepeats(form, "artists"),
    relatedNews: collectInternationalRepeats(form, "news"),
    teamMembers: collectInternationalRepeats(form, "team")
  };
}

function currentOpenCallDraft() {
  const form = document.querySelector("#single-form");
  if (!form || state.view !== "open-call") return openCallData;
  const formData = new FormData(form);
  const bannerInput = form.querySelector("#open-call-banner");
  const galleryInput = form.querySelector("#open-call-gallery");
  return {
    bannerUrl: bannerInput?.dataset.previewUrl || openCallData.bannerUrl || "",
    bannerName: bannerInput?.files?.[0]?.name || openCallData.bannerName || "",
    residencyTitle: formData.get("residencyTitle")?.trim() || "駐村資訊",
    residencyContent: formData.get("residencyContent")?.trim() || "",
    spaceTitle: formData.get("spaceTitle")?.trim() || "空間資訊",
    galleryUrls: parsePreviewUrls(galleryInput?.dataset.previewUrls, openCallData.galleryUrls || [])
  };
}

async function saveOpenCallPage() {
  const form = document.querySelector("#single-form");
  if (!form) return;
  if (!form.reportValidity()) return;
  const draft = currentOpenCallDraft();
  if (!draft.bannerUrl) return showToast("請選擇 Banner 圖片");
  if (!draft.galleryUrls.length) return showToast("請至少新增一張空間圖片");
  openCallData = draft;
  const savedAt = Date.now();
  try {
    localStorage.setItem(OPEN_CALL_STORAGE_KEY, JSON.stringify(openCallData));
    localStorage.setItem(OPEN_CALL_STORAGE_META_KEY, String(savedAt));
    openCallLocalSavedAt = savedAt;
  } catch (error) {
    const compact = {
      ...openCallData,
      bannerUrl: openCallData.bannerUrl?.startsWith("data:") ? "" : openCallData.bannerUrl,
      galleryUrls: openCallData.galleryUrls.filter(url => !url.startsWith("data:"))
    };
    try {
      localStorage.setItem(OPEN_CALL_STORAGE_KEY, JSON.stringify(compact));
      localStorage.setItem(OPEN_CALL_STORAGE_META_KEY, String(savedAt));
      openCallLocalSavedAt = savedAt;
    } catch (fallbackError) {
      console.warn("公開徵件瀏覽器備份容量不足", fallbackError);
    }
  }
  try {
    await writeDatabaseRecords("open-call", openCallData, savedAt);
  } catch (error) {
    console.warn("無法寫入公開徵件資料庫", error);
  }
  showToast("公開徵件內容已儲存並同步至前台");
}

function closeEditor() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  scrim.classList.remove("open");
  document.body.style.overflow = "";
}

function openPreview(item) {
  const route = previewRoutes[state.view] || previewRoutes.home;
  const frame = document.querySelector("#preview-frame");
  const label = document.querySelector("#preview-route-label");
  const newsItem = state.view === "news" ? (item || currentNewsDraft()) : null;
  const exhibitionItem = state.view === "exhibitions" ? item : null;
  const internationalItem = state.view === "international" ? item : null;
  const artistItem = state.view === "artists" ? item : null;
  const openCallItem = state.view === "open-call" ? currentOpenCallDraft() : null;
  if (newsItem) {
    frame.removeAttribute("src");
    frame.srcdoc = buildNewsPreview(newsItem);
    label.textContent = `最新消息 News · ${newsItem.title}`;
  } else if (exhibitionItem) {
    frame.removeAttribute("src");
    frame.srcdoc = buildExhibitionPreview(exhibitionItem);
    label.textContent = `展覽 Exhibitions · ${exhibitionItem.title}`;
  } else if (internationalItem) {
    frame.removeAttribute("src");
    frame.srcdoc = buildInternationalPreview(internationalItem);
    label.textContent = `國際專案 International Exchange · ${internationalItem.title}`;
  } else if (artistItem) {
    frame.removeAttribute("src");
    frame.srcdoc = buildArtistPreview(artistItem);
    label.textContent = `藝術家 Artists · ${artistItem.title}`;
  } else if (openCallItem) {
    frame.removeAttribute("src");
    frame.srcdoc = buildOpenCallPreview(openCallItem);
    label.textContent = "公開徵件 Open Call · 目前編輯內容";
  } else {
    frame.srcdoc = "";
    frame.src = route;
    label.textContent = `${viewMeta[state.view]?.title || "前台首頁"} · 既有前台版型`;
  }
  dialog.showModal();
}

function buildNewsPreview(item) {
  const hero = item.heroImageUrl || item.imageUrl || `${assets}news-detail/hero.png`;
  const blocks = (item.blocks?.length ? item.blocks : [{ type: "paragraph", content: "目前尚未加入文章內容。" }]).map(block => {
    if (block.type === "heading") return `<h2>${escapeHtml(block.content)}</h2>`;
    if (block.type === "image") return block.imageUrl ? `<figure><img src="${escapeAttr(block.imageUrl)}" alt="${escapeAttr(block.caption || "消息內容圖片")}"><figcaption>${escapeHtml(block.caption)}</figcaption></figure>` : "";
    return `<p>${escapeHtml(block.content).replaceAll("\n", "<br>")}</p>`;
  }).join("");
  return `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
    *{box-sizing:border-box}body{margin:0;color:#171717;font-family:Inter,"PingFang TC",sans-serif;background:#fff}header{height:82px;padding:0 5vw;border-bottom:1px solid #dedbd6;display:flex;align-items:center;justify-content:space-between}.logo{font-size:13px;font-weight:700;letter-spacing:.08em}.menu{font-size:12px;color:#666}main{width:min(1120px,90vw);margin:64px auto 100px}.date{margin:0 0 16px;color:#767676;font-size:13px;letter-spacing:.08em}.title{max-width:900px;margin:0 0 42px;font-size:clamp(36px,5vw,72px);font-weight:400;line-height:1.08;letter-spacing:-.045em}.hero{width:100%;max-height:650px;object-fit:cover;background:#f4f2ef}.article{width:min(760px,100%);margin:64px auto}.article h2{margin:60px 0 20px;font-size:32px;font-weight:500}.article p{margin:0 0 28px;font-size:17px;line-height:1.9}.article figure{margin:48px 0}.article figure img{display:block;width:100%;height:auto}.article figcaption{margin-top:10px;color:#767676;font-size:12px}@media(max-width:700px){header{height:64px}main{margin-top:36px}.title{font-size:38px}.article{margin-top:36px}.article h2{font-size:26px}}
  </style></head><body><header><div class="logo">THE MIDDLE ART SPACE</div><div class="menu">NEWS　ABOUT　ARTISTS</div></header><main><p class="date">${escapeHtml(item.date || "")}</p><h1 class="title">${escapeHtml(item.title)}</h1><img class="hero" src="${escapeAttr(hero)}" alt="${escapeAttr(item.title)}"><article class="article">${blocks}</article></main></body></html>`;
}

function buildExhibitionPreview(item) {
  const hero = item.contentImageUrl || item.imageUrl || recordImageSrc(item) || `${assets}project-detail/hero.png`;
  const infoRows = [
    ["參展藝術家", "Participating Artists", item.artist || item.subtitle],
    ["策展人", "Curatorial Team", item.curator],
    ["展出地點", "Venue", item.venue],
    ["展覽時間", "Exhibition Period", item.date],
    ["主辦單位", "Organizer", item.organizer],
    ["贊助單位", "Sponsor", item.sponsor],
    ...(item.customFields || []).map(field => [field.label, "", field.value])
  ].filter(([, , value]) => value);
  const information = infoRows.map(([label, english, value]) => `<div class="info-row"><dt>${escapeHtml(label)}${english ? `<span>${escapeHtml(english)}</span>` : ""}</dt><dd>${escapeHtml(value)}</dd></div>`).join("");
  const blocks = (item.blocks?.length ? item.blocks : [{ type: "paragraph", content: "目前尚未加入專案內容。" }]).map(block => {
    if (block.type === "heading") return `<h3>${escapeHtml(block.content)}</h3>`;
    if (block.type === "image") return block.imageUrl ? `<figure><img src="${escapeAttr(block.imageUrl)}" alt="${escapeAttr(block.caption || "展覽內容圖片")}"><figcaption>${escapeHtml(block.caption)}</figcaption></figure>` : "";
    return `<p>${escapeHtml(block.content).replaceAll("\n", "<br>")}</p>`;
  }).join("");
  const gallery = (item.galleryUrls || []).map((url, index) => `<img src="${escapeAttr(url)}" alt="展覽圖片 ${index + 1}">`).join("");
  return `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;color:#171717;font-family:Inter,"PingFang TC",sans-serif;background:#f9f8f6}header{height:72px;padding:0 5vw;border-bottom:1px solid #dedbd6;display:flex;align-items:center;justify-content:space-between;background:#fff}.logo{font-size:13px;font-weight:700;letter-spacing:.08em}.menu{font-size:12px;color:#666}.hero-shell{padding-top:56px}.title{width:min(1120px,90vw);margin:0 auto 48px;font-size:clamp(34px,4vw,58px);font-weight:300;line-height:1.18;letter-spacing:-.035em}.hero{display:block;width:100%;height:min(620px,58vw);min-height:320px;object-fit:cover;background:#eee}.content-shell{width:min(1120px,90vw);margin:0 auto;padding:56px 0 100px;display:grid;grid-template-columns:150px minmax(0,1fr);gap:44px}.section-nav{position:sticky;top:32px;align-self:start;display:grid;gap:24px}.section-nav a{color:#aaa;text-decoration:none}.section-nav a:first-child{color:#171717}.section{padding-bottom:88px}.section:last-child{padding-bottom:0}.section h2{margin:0 0 24px;font-size:30px}.info-list{display:grid;gap:24px}.info-row{display:grid;grid-template-columns:175px 1fr;gap:16px}.info-row dt,.info-row dd{margin:0}.info-row dt{color:#6f7074}.info-row dt span{display:block;font-size:12px}.article{font-size:16px;line-height:2}.article h3{margin:48px 0 16px;font-size:27px;line-height:1.4}.article p{margin:0 0 28px}.article figure{margin:48px 0}.article figure img{display:block;width:100%;height:auto}.article figcaption{margin-top:10px;color:#767676;font-size:12px}.gallery{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px}.gallery img{width:100%;aspect-ratio:4/3;object-fit:cover}.gallery:empty::before{content:"目前尚未加入展覽圖片。";color:#767676;font-size:14px}@media(max-width:720px){header{height:64px}.hero-shell{padding-top:36px}.title{margin-bottom:32px;font-size:34px}.hero{height:58vw;min-height:240px}.content-shell{display:block;padding-top:0}.section-nav{z-index:2;top:0;margin:0 -5vw 48px;padding:18px 5vw;display:flex;gap:24px;overflow:auto;background:rgba(255,255,255,.96);border-bottom:1px solid #dedbd6}.section{padding-bottom:64px}.info-row{grid-template-columns:1fr;gap:4px}.gallery{grid-template-columns:repeat(2,minmax(0,1fr))}}
  </style></head><body><header><div class="logo">THE MIDDLE ART SPACE</div><div class="menu">EXHIBITIONS　ABOUT　ARTISTS</div></header><main><section class="hero-shell"><h1 class="title">${escapeHtml(item.title || "未命名展覽")}</h1><img class="hero" src="${escapeAttr(hero)}" alt="${escapeAttr(item.title || "展覽主視覺")}"></section><div class="content-shell"><nav class="section-nav"><a href="#info">INFO</a><a href="#introduce">INTRODUCE</a><a href="#works">WORKS</a></nav><div><section class="section" id="info"><h2>INFO</h2><dl class="info-list">${information || "<p>目前尚未填寫展覽資訊。</p>"}</dl></section><section class="section" id="introduce"><h2>INTRODUCE</h2><article class="article">${blocks}</article></section><section class="section" id="works"><h2>WORKS</h2><div class="gallery">${gallery}</div></section></div></div></main></body></html>`;
}

function buildInternationalPreview(item) {
  const hero = item.heroImageUrl || item.imageUrl || recordImageSrc(item) || `${assets}exchange-1.jpg`;
  const blocks = (item.blocks?.length ? item.blocks : [{ type: "paragraph", content: "目前尚未加入專案內容。" }]).map(block => block.type === "heading" ? `<h2>${escapeHtml(block.content)}</h2>` : block.type === "image" ? (block.imageUrl ? `<figure><img src="${escapeAttr(block.imageUrl)}" alt="${escapeAttr(block.caption || "專案內容圖片")}"><figcaption>${escapeHtml(block.caption)}</figcaption></figure>` : "") : `<p>${escapeHtml(block.content).replaceAll("\n", "<br>")}</p>`).join("");
  const artists = (item.projectArtists || []).map(artist => `<article class="person">${artist.imageUrl ? `<img src="${escapeAttr(artist.imageUrl)}" alt="${escapeAttr(artist.name)}">` : ""}<h3>${escapeHtml(artist.name)}</h3><p>${escapeHtml(artist.nationality)}</p></article>`).join("");
  const news = (item.relatedNews || []).map(newsItem => `<article class="news"><time>${escapeHtml(newsItem.date)}</time><h3>${escapeHtml(newsItem.title)}</h3><p>${escapeHtml(newsItem.subtitle)}</p></article>`).join("");
  const team = (item.teamMembers || []).map(member => `<div class="team"><strong>${escapeHtml(member.name)}</strong><span>${escapeHtml(member.role)}</span></div>`).join("");
  return `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0;color:#171717;font-family:Inter,"PingFang TC",sans-serif;background:#f9f8f6}header{height:72px;padding:0 5vw;border-bottom:1px solid #ddd;display:flex;align-items:center;justify-content:space-between;background:#fff}.logo{font-size:13px;font-weight:700}.menu{font-size:12px;color:#666}.hero{position:relative;min-height:620px;padding:72px 7vw;color:#fff;background:#222 center/cover no-repeat}.hero:before{content:"";position:absolute;inset:0;background:rgba(0,0,0,.34)}.hero>*{position:relative}.hero h1{max-width:950px;margin:120px 0 16px;font-size:clamp(42px,6vw,82px);line-height:1.05;font-weight:400}.hero p{font-size:20px}.content{width:min(1080px,88vw);margin:auto;padding:80px 0}.info{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 60px;margin-bottom:90px}.info div{border-top:1px solid #bbb;padding-top:12px}.info span{display:block;color:#777;font-size:13px}.article{max-width:780px;margin:auto;font-size:17px;line-height:1.9}.article h2{margin:56px 0 20px;font-size:32px}.article img{width:100%;height:auto}.article figure{margin:48px 0}.article figcaption{color:#777;font-size:12px}.section{margin-top:100px}.section>h2{font-size:34px}.people{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.person img{width:100%;aspect-ratio:4/3;object-fit:cover}.person h3{margin:14px 0 4px}.person p{margin:0;color:#777}.news{padding:24px 0;border-top:1px solid #bbb}.news h3{margin:8px 0}.news p,.news time{color:#777}.team{display:grid;grid-template-columns:1fr 2fr;padding:18px 0;border-top:1px solid #bbb}@media(max-width:700px){.hero{min-height:480px}.hero h1{margin-top:90px}.info,.people{grid-template-columns:1fr}.team{grid-template-columns:1fr;gap:6px}}</style></head><body><header><div class="logo">THE MIDDLE ART SPACE</div><div class="menu">INTERNATIONAL EXCHANGE　ABOUT　ARTISTS</div></header><section class="hero" style="background-image:url('${escapeAttr(hero)}')"><h1>${escapeHtml(item.title)}</h1><p>${escapeHtml(item.subtitle || "")}</p></section><main class="content"><section class="info"><div><span>邀請人</span>${escapeHtml(item.inviter || "—")}</div><div><span>計畫期間</span>${escapeHtml(formatExhibitionRange(item.planStart, item.planEnd))}</div><div><span>計畫執行地點</span>${escapeHtml(item.planVenue || "—")}</div><div><span>展覽</span>${escapeHtml(item.exhibitionName || "—")}</div><div><span>展出地點</span>${escapeHtml(item.exhibitionVenue || "—")}</div><div><span>展覽期間</span>${escapeHtml(formatExhibitionRange(item.exhibitionStart, item.exhibitionEnd))}</div></section><article class="article">${blocks}</article><section class="section"><h2>藝術家</h2><div class="people">${artists || "目前尚未加入藝術家。"}</div></section><section class="section"><h2>相關新聞</h2>${news || "目前尚未加入相關新聞。"}</section><section class="section"><h2>執行團隊</h2>${team || "目前尚未加入團隊成員。"}</section></main></body></html>`;
}

function buildArtistPreview(item) {
  const image = recordImageSrc(item);
  const website = item.website || "";
  return `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0;color:#171717;font-family:Inter,"PingFang TC",sans-serif;background:#f7f6f3}header{height:72px;padding:0 5vw;border-bottom:1px solid #ddd;background:#fff;display:flex;align-items:center;justify-content:space-between}.logo{font-size:13px;font-weight:700;letter-spacing:.08em}.menu{font-size:12px;color:#666}main{width:min(1040px,88vw);margin:72px auto;display:grid;grid-template-columns:minmax(280px,520px) 1fr;gap:64px;align-items:start}.portrait{display:block;width:100%;aspect-ratio:4/5;object-fit:cover;background:#e9e7e2}.detail{padding-top:32px;border-top:1px solid #aaa}.detail h1{margin:0 0 16px;font-size:clamp(36px,5vw,64px);font-weight:400;line-height:1.08}.detail p{margin:0 0 36px;color:#737373;font-size:18px}.detail a{color:#171717;text-underline-offset:5px}@media(max-width:720px){main{margin-top:36px;grid-template-columns:1fr;gap:36px}.detail{padding-top:24px}}</style></head><body><header><div class="logo">THE MIDDLE ART SPACE</div><div class="menu">ARTISTS　ABOUT　EXHIBITIONS</div></header><main>${image ? `<img class="portrait" src="${escapeAttr(image)}" alt="${escapeAttr(item.title)}">` : ""}<section class="detail"><h1>${escapeHtml(item.title)}</h1><p>${escapeHtml(item.nationality || "")}</p>${website ? `<a href="${escapeAttr(website)}" target="_blank" rel="noopener">前往藝術家網站 ↗</a>` : ""}</section></main></body></html>`;
}

function buildOpenCallPreview(data) {
  const paragraphs = String(data.residencyContent || "").split(/\n\s*\n/).filter(Boolean).map(paragraph => `<p>${escapeHtml(paragraph).replaceAll("\n", "<br>")}</p>`).join("");
  const gallery = (data.galleryUrls || []).map((url, index) => `<img src="${escapeAttr(url)}" alt="空間圖片 ${index + 1}">`).join("");
  return `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0;color:#19191a;font-family:Inter,"PingFang TC",sans-serif;background:#f9f8f6}header{height:72px;padding:0 5vw;border-bottom:1px solid #d8d6d1;background:#fff;display:flex;align-items:center;justify-content:space-between}.logo{font-size:13px;font-weight:700}.menu{font-size:12px;color:#666}main{width:min(1050px,90vw);margin:56px auto 100px}h1{margin:0 0 48px;font-size:42px;font-weight:300}.frame{border:1px solid #d8d6d1}.hero{display:block;width:100%;aspect-ratio:1025/538;object-fit:cover}.section{border-top:1px solid #d8d6d1}.section h2{height:66px;margin:0;padding:0 16px;border-bottom:1px solid #d8d6d1;font-size:16px;display:flex;align-items:center}.copy{padding:20px 16px}.copy p{margin:0 0 24px;font-size:16px;line-height:1.55}.copy p:last-child{margin-bottom:0}.gallery{padding:24px 16px 80px;display:grid;grid-template-columns:repeat(4,1fr);gap:13px}.gallery img{width:100%;aspect-ratio:1;object-fit:cover}@media(max-width:700px){header{height:64px}main{width:100%;margin:36px 0}h1{padding:0 20px;font-size:32px}.frame{border-width:1px 0}.hero{aspect-ratio:4/3}.gallery{grid-template-columns:repeat(2,1fr);padding-bottom:48px}}</style></head><body><header><div class="logo">THE MIDDLE ART SPACE</div><div class="menu">OPEN CALL　ABOUT　ARTISTS</div></header><main><h1>/Open Call</h1><div class="frame"><img class="hero" src="${escapeAttr(data.bannerUrl || "")}" alt="Open Call Banner"><section class="section"><h2>${escapeHtml(data.residencyTitle || "駐村資訊")}</h2><div class="copy">${paragraphs}</div></section><section class="section"><h2>${escapeHtml(data.spaceTitle || "空間資訊")}</h2><div class="gallery">${gallery}</div></section></div></main></body></html>`;
}

async function saveEditor(status = "draft") {
  const form = document.querySelector("#editor-form");
  const formData = new FormData(form);
  const title = formData.get("title")?.trim();
  if (!title) { form.querySelector("[name=title]").focus(); return; }
  const list = state.records[editing.view];
  let item = list.find(r => r.id === editing.id);
  if (editing.view === "artists") {
    const imageInput = form.querySelector("#artist-image-input");
    const nationality = formData.get("nationality")?.trim() || "";
    const residencyDate = (formData.get("residencyDate")?.trim() || "").replace("-", ".");
    const website = formData.get("website")?.trim() || "";
    const imageUrl = imageInput?.dataset.previewUrl || item?.imageUrl || (item?.image ? assets + item.image : "");
    if (!nationality) {
      form.querySelector("[name=nationality]")?.focus();
      return showToast("請輸入藝術家國籍");
    }
    if (!imageUrl) return showToast("請選擇藝術家圖片");
    if (!/^\d{4}\.\d{2}$/.test(residencyDate)) {
      form.querySelector("[name=residencyDate]")?.focus();
      return showToast("請選擇駐村年月");
    }
    if (website && !/^https?:\/\//i.test(website)) {
      form.querySelector("[name=website]")?.focus();
      return showToast("網站連結請輸入以 http:// 或 https:// 開頭的完整網址");
    }
    const saved = {
      title,
      subtitle: "",
      nationality,
      residencyDate,
      website,
      image: item?.image || "artists/asako-otsuka.png",
      imageUrl,
      imageName: imageInput?.files?.[0]?.name || item?.imageName || item?.image || "",
      date: residencyDate,
      updated: "剛剛"
    };
    if (item) Object.assign(item, saved);
    else {
      item = { id: Date.now(), ...saved };
      list.unshift(item);
    }
    await persistArtistRecords();
    closeEditor();
    renderList("artists");
    return showToast(editing?.id ? "藝術家資料已更新" : "藝術家已新增");
  }
  if (item) {
    item.title = title;
    item.subtitle = formData.get("subtitle") || item.subtitle;
    item.updated = "剛剛";
  } else {
    item = { id: Date.now(), title, subtitle: formData.get("subtitle") || "新內容", image: editing.view === "artists" ? "artists/asako-otsuka.png" : "news-list.jpg", status, date: formData.get("date") || "尚未設定", updated: "剛剛" };
    list.unshift(item);
  }
  closeEditor();
  renderList(editing.view);
  showToast(status === "draft" ? "草稿已儲存" : "內容已儲存");
}

async function persistArtistRecords() {
  const savedAt = Date.now();
  try {
    localStorage.setItem(ARTISTS_STORAGE_KEY, JSON.stringify(state.records.artists));
    localStorage.setItem(ARTISTS_STORAGE_META_KEY, String(savedAt));
    artistsLocalSavedAt = savedAt;
  } catch (error) {
    const compact = state.records.artists.map(item => ({ ...item, imageUrl: item.imageUrl?.startsWith("data:") ? "" : item.imageUrl }));
    try {
      localStorage.setItem(ARTISTS_STORAGE_KEY, JSON.stringify(compact));
      localStorage.setItem(ARTISTS_STORAGE_META_KEY, String(savedAt));
      artistsLocalSavedAt = savedAt;
    } catch (fallbackError) {
      console.warn("藝術家瀏覽器備份容量不足", fallbackError);
    }
  }
  try {
    await writeDatabaseRecords("artists", state.records.artists, savedAt);
  } catch (error) {
    console.warn("無法寫入藝術家資料庫", error);
  }
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  document.querySelector("#toast-text").textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function navigate(view) {
  document.body.classList.remove("news-editor-mode", "project-editor-mode", "international-editor-mode");
  state.view = view;
  state.filter = "all";
  state.query = "";
  document.querySelectorAll(".nav-item").forEach(btn => btn.classList.toggle("active", btn.dataset.view === view));
  if (view === "dashboard") renderDashboard();
  else if (viewMeta[view].single) renderSingle(view);
  else renderList(view);
  main.focus();
  document.querySelector("#sidebar").classList.remove("open");
  scrim.classList.remove("open");
}

function recordImageSrc(item = {}) { return item.imageUrl || (item.image ? assets + item.image : ""); }
function escapeHtml(value = "") { return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"); }
function escapeAttr(value = "") { return escapeHtml(value).replaceAll('"', "&quot;"); }
function normalizeDate(value = "") { const m = value.match(/\d{4}[-/]\d{2}[-/]\d{2}/); return m ? m[0].replaceAll("/", "-") : "2026-10-13"; }

document.addEventListener("click", event => {
  if (event.target.closest("[data-news-back]")) return closeNewsEditor();
  if (event.target.closest("[data-exhibition-back]")) return closeExhibitionEditor();
  if (event.target.closest("[data-international-back]")) return closeInternationalEditor();
  const newsSave = event.target.closest("[data-news-save]");
  if (newsSave) return saveNewsPage(newsSave.dataset.newsSave);
  const exhibitionSave = event.target.closest("[data-exhibition-save]");
  if (exhibitionSave) return saveExhibitionPage(exhibitionSave.dataset.exhibitionSave);
  const internationalSave = event.target.closest("[data-international-save]");
  if (internationalSave) return saveInternationalPage(internationalSave.dataset.internationalSave);
  const uploadButton = event.target.closest("[data-upload-button]");
  if (uploadButton) {
    document.getElementById(uploadButton.dataset.uploadButton)?.click();
    return;
  }
  const repeatUpload = event.target.closest("[data-repeat-upload]");
  if (repeatUpload) {
    repeatUpload.closest(".international-repeat-item")?.querySelector('.international-artist-image')?.click();
    return;
  }
  const nav = event.target.closest("[data-view]");
  if (nav) return navigate(nav.dataset.view);
  const jump = event.target.closest("[data-view-jump]");
  if (jump) return navigate(jump.dataset.viewJump);
  const filter = event.target.closest("[data-filter]");
  if (filter) { state.filter = filter.dataset.filter; return renderList(state.view); }
  if (event.target.closest("[data-new]")) {
    if (state.view === "news") return renderNewsEditor();
    if (state.view === "exhibitions") return renderExhibitionEditor();
    if (state.view === "international") return renderInternationalEditor();
    return openEditor(state.view);
  }
  if (event.target.closest("[data-sort-mode]")) return renderSort(state.view);
  if (event.target.closest("[data-cancel-sort]")) return renderList(state.view);
  if (event.target.closest("[data-save-sort]")) {
    if (state.view === "artists") persistArtistRecords();
    showToast("排序已儲存並立即生效");
    return renderList(state.view);
  }
  if (event.target.closest("[data-save-single]")) {
    if (state.view === "open-call") return saveOpenCallPage();
    return showToast("頁面內容已儲存");
  }
  if (event.target.closest("[data-add-project-field]")) {
    return openProjectFieldDialog();
  }
  if (event.target.closest("[data-project-field-close]")) return closeProjectFieldDialog();
  const removeProjectField = event.target.closest("[data-remove-project-field]");
  if (removeProjectField) {
    removeProjectField.closest(".project-custom-row")?.remove();
    return;
  }
  const addInternational = event.target.closest("[data-add-international]");
  if (addInternational) {
    const type = addInternational.dataset.addInternational;
    const list = document.querySelector(`[data-repeat-list="${type}"]`);
    list?.insertAdjacentHTML("beforeend", internationalRepeatItem(type));
    list?.querySelector(".international-repeat-item:last-child input")?.focus();
    return;
  }
  const repeatAction = event.target.closest("[data-repeat-remove], [data-repeat-move]");
  if (repeatAction) {
    const card = repeatAction.closest(".international-repeat-item");
    if (repeatAction.hasAttribute("data-repeat-remove")) {
      card?.remove();
      return showToast("欄位已移除");
    }
    if (repeatAction.dataset.repeatMove === "up" && card?.previousElementSibling) card.before(card.previousElementSibling);
    if (repeatAction.dataset.repeatMove === "down" && card?.nextElementSibling) card.after(card.nextElementSibling);
    return;
  }
  const addBlock = event.target.closest("[data-add-block]");
  if (addBlock) {
    const builder = document.querySelector("#article-builder");
    builder?.insertAdjacentHTML("beforeend", articleBlock(addBlock.dataset.addBlock, ""));
    builder?.classList.remove("empty");
    showToast(`已新增${addBlock.dataset.addBlock === "image" ? "圖片" : addBlock.dataset.addBlock === "heading" ? "標題" : "文字"}區塊`);
    return;
  }
  const blockAction = event.target.closest("[data-block-move], [data-block-remove]");
  if (blockAction) {
    const block = blockAction.closest(".article-block");
    if (blockAction.hasAttribute("data-block-remove")) {
      if (block.parentElement.children.length === 1 && !document.body.classList.contains("news-editor-mode")) return showToast("文章至少需要保留一個內容區塊");
      const builder = block.parentElement;
      block.remove();
      if (!builder.children.length) builder.classList.add("empty");
      return showToast("區塊已移除");
    }
    const direction = blockAction.dataset.blockMove;
    if (direction === "up" && block.previousElementSibling) block.before(block.previousElementSibling);
    if (direction === "down" && block.nextElementSibling) block.after(block.nextElementSibling);
    return;
  }
  const tr = event.target.closest("tr[data-id]");
  if (tr) {
    const item = state.records[state.view].find(r => r.id === Number(tr.dataset.id));
    if (event.target.closest("[data-edit]")) {
      if (state.view === "news") return renderNewsEditor(item);
      if (state.view === "exhibitions") return renderExhibitionEditor(item);
      if (state.view === "international") return renderInternationalEditor(item);
      return openEditor(state.view, item);
    }
    if (state.view === "artists" && event.target.closest(".title-cell")) return openEditor("artists", item);
    if (event.target.closest("[data-delete]") && state.view === "artists") {
      if (!window.confirm(`確定要刪除「${item.title}」嗎？`)) return;
      state.records.artists = state.records.artists.filter(record => record.id !== item.id);
      persistArtistRecords();
      renderList("artists");
      return showToast("藝術家資料已刪除");
    }
    if (event.target.closest("[data-toggle]")) {
      item.status = item.status === "published" ? "offline" : "published";
      item.updated = "剛剛";
      if (state.view === "news") persistNewsRecords();
      if (state.view === "exhibitions") persistExhibitionRecords();
      if (state.view === "international") persistInternationalRecords();
      renderList(state.view);
      return showToast(item.status === "published" ? "內容已上架" : "內容已下架，資料仍保留");
    }
  }
  const move = event.target.closest("[data-move]");
  if (move) {
    const card = move.closest("[data-sort-id]");
    const list = state.records[state.view];
    const current = list.findIndex(item => item.id === Number(card.dataset.sortId));
    const target = move.dataset.move === "up" ? current - 1 : current + 1;
    if (target >= 0 && target < list.length) [list[current], list[target]] = [list[target], list[current]];
    return renderSort(state.view);
  }
});

let draggedArticleBlock = null;
document.addEventListener("dragstart", event => {
  const block = event.target.closest(".article-block");
  if (!block) return;
  draggedArticleBlock = block;
  block.classList.add("dragging");
  block.setAttribute("aria-grabbed", "true");
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", block.dataset.blockType || "content-block");
  }
});

document.addEventListener("dragover", event => {
  const builder = event.target.closest("#article-builder");
  if (!builder || !draggedArticleBlock) return;
  event.preventDefault();
  const blocks = [...builder.querySelectorAll(".article-block:not(.dragging)")];
  const after = blocks.find(block => event.clientY < block.getBoundingClientRect().top + block.getBoundingClientRect().height / 2);
  if (after) builder.insertBefore(draggedArticleBlock, after);
  else builder.appendChild(draggedArticleBlock);
});

document.addEventListener("dragend", () => {
  if (!draggedArticleBlock) return;
  draggedArticleBlock.classList.remove("dragging");
  draggedArticleBlock.setAttribute("aria-grabbed", "false");
  draggedArticleBlock = null;
});

document.addEventListener("input", event => {
  if (event.target.id === "search-input") {
    state.query = event.target.value;
    clearTimeout(document._searchTimer);
    document._searchTimer = setTimeout(() => { renderList(state.view); document.querySelector("#search-input")?.focus(); }, 160);
  }
});

document.addEventListener("change", async event => {
  if (!(event.target instanceof HTMLInputElement) || event.target.type !== "file" || !event.target.files?.[0]) return;
  const zone = event.target.closest("[data-upload-zone]");
  const file = event.target.files[0];

  const galleryUpload = event.target.closest(".exhibition-gallery-upload");
  if (galleryUpload) {
    const existingUrls = parsePreviewUrls(event.target.dataset.previewUrls, []);
    const newUrls = await Promise.all([...event.target.files].map(imageFileToStoredUrl));
    const urls = [...existingUrls, ...newUrls];
    event.target.dataset.previewUrls = JSON.stringify(urls);
    galleryUpload.querySelector(".exhibition-gallery-preview").innerHTML = urls.map(url => `<img src="${escapeAttr(url)}" alt="展覽圖片預覽">`).join("");
    galleryUpload.classList.toggle("has-images", Boolean(urls.length));
    return;
  }

  const previewUrl = await imageFileToStoredUrl(file);
  event.target.dataset.previewUrl = previewUrl;

  const projectListUpload = event.target.closest(".project-list-upload");
  if (projectListUpload) {
    const preview = projectListUpload.querySelector(".project-list-preview");
    let image = preview.querySelector("img");
    if (!image) {
      image = document.createElement("img");
      image.alt = "列表圖片預覽";
      preview.appendChild(image);
    }
    image.src = previewUrl;
    preview.querySelector("span")?.setAttribute("style", "display:none");
    projectListUpload.querySelector("strong").textContent = file.name;
    projectListUpload.querySelector("[data-upload-button]").textContent = "更換圖片";
    projectListUpload.classList.add("has-image");
    return;
  }

  if (zone) {
    const preview = zone.querySelector(".news-upload-preview");
    const image = preview?.querySelector("img");
    if (image) {
      image.src = previewUrl;
      image.style.display = "block";
      preview.querySelector("span").style.display = "none";
    }
    zone.querySelector("strong").textContent = file.name;
    return;
  }
  const simpleUpload = event.target.closest(".hero-upload, .block-image-upload");
  if (simpleUpload) {
    simpleUpload.querySelector("small").textContent = file.name;
    const changeButton = simpleUpload.querySelector("[data-upload-button]");
    if (changeButton) changeButton.textContent = "更換圖片";
    const repeatChangeButton = simpleUpload.querySelector("[data-repeat-upload]");
    if (repeatChangeButton) repeatChangeButton.textContent = "更換圖片";
    simpleUpload.classList.add("has-image");
    let image = simpleUpload.querySelector("img");
    if (!image) {
      image = document.createElement("img");
      image.alt = "圖片預覽";
      simpleUpload.prepend(image);
    }
    image.src = previewUrl;
  }
});

function imageFileToStoredUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const original = String(reader.result);
      const image = new Image();
      image.onerror = () => resolve(original);
      image.onload = () => {
        const maxSide = 1600;
        const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/webp", 0.84));
      };
      image.src = original;
    };
    reader.readAsDataURL(file);
  });
}

document.addEventListener("submit", event => {
  if (event.target.id === "project-field-form") {
    event.preventDefault();
    return createProjectCustomField();
  }
  if (event.target.id === "news-page-form") {
    event.preventDefault();
    return saveNewsPage("save");
  }
  if (event.target.id === "exhibition-page-form") {
    event.preventDefault();
    return saveExhibitionPage("save");
  }
  if (event.target.id === "international-page-form") {
    event.preventDefault();
    return saveInternationalPage("save");
  }
});

document.querySelector("#drawer-close").addEventListener("click", closeEditor);
scrim.addEventListener("click", () => { closeEditor(); document.querySelector("#sidebar").classList.remove("open"); });
document.querySelector("#editor-form").addEventListener("submit", event => { event.preventDefault(); saveEditor("save"); });
document.querySelector("#save-draft").addEventListener("click", () => saveEditor("draft"));
document.querySelector("#mobile-menu").addEventListener("click", () => { document.querySelector("#sidebar").classList.add("open"); scrim.classList.add("open"); });
document.querySelector("#mobile-close").addEventListener("click", () => { document.querySelector("#sidebar").classList.remove("open"); scrim.classList.remove("open"); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && drawer.classList.contains("open")) closeEditor(); });

restorePersistentRecords().finally(restoreAdminLocation);
