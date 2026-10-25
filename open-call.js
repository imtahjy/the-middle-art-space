const OPEN_CALL_STORAGE_KEY = "middle-art-space-cms-open-call-v1";
const OPEN_CALL_STORAGE_META_KEY = `${OPEN_CALL_STORAGE_KEY}-saved-at`;
const OPEN_CALL_DATABASE_NAME = "middle-art-space-cms";
const OPEN_CALL_RECORD_STORE = "content-records";

function openCallImageSource(url) {
  return url?.startsWith("../assets/") ? url.slice(3) : url;
}

function renderOpenCall(data) {
  if (!data || typeof data !== "object") return;
  const hero = document.querySelector("#open-call-hero");
  const residencyTitle = document.querySelector("#residency-title");
  const residencyCopy = document.querySelector("#residency-copy");
  const spaceTitle = document.querySelector("#space-title");
  const gallery = document.querySelector("#space-gallery");

  if (hero && data.bannerUrl) hero.src = openCallImageSource(data.bannerUrl);
  if (residencyTitle && data.residencyTitle) residencyTitle.textContent = data.residencyTitle;
  if (spaceTitle && data.spaceTitle) spaceTitle.textContent = data.spaceTitle;
  if (residencyCopy && data.residencyContent) {
    const paragraphs = String(data.residencyContent).split(/\n\s*\n/).filter(Boolean);
    residencyCopy.replaceChildren(...paragraphs.map(content => {
      const paragraph = document.createElement("p");
      content.split("\n").forEach((line, index) => {
        if (index) paragraph.appendChild(document.createElement("br"));
        paragraph.appendChild(document.createTextNode(line));
      });
      return paragraph;
    }));
  }
  if (gallery && Array.isArray(data.galleryUrls) && data.galleryUrls.length) {
    const existingImages = [...gallery.querySelectorAll("img")];
    data.galleryUrls.forEach((url, index) => {
      const image = existingImages[index] || document.createElement("img");
      image.src = openCallImageSource(url);
      image.alt = `米豆藝術空間圖片 ${index + 1}`;
      if (!image.parentElement) gallery.appendChild(image);
    });
    existingImages.slice(data.galleryUrls.length).forEach(image => image.remove());
  }
}

function readOpenCallDatabase() {
  return new Promise(resolve => {
    if (!("indexedDB" in window)) return resolve(null);
    const request = indexedDB.open(OPEN_CALL_DATABASE_NAME, 1);
    request.onerror = () => resolve(null);
    request.onsuccess = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(OPEN_CALL_RECORD_STORE)) {
        database.close();
        return resolve(null);
      }
      const transaction = database.transaction(OPEN_CALL_RECORD_STORE, "readonly");
      const getRequest = transaction.objectStore(OPEN_CALL_RECORD_STORE).get("open-call");
      getRequest.onsuccess = () => resolve(getRequest.result || null);
      getRequest.onerror = () => resolve(null);
      transaction.oncomplete = () => database.close();
    };
  });
}

async function loadOpenCall() {
  let localRecord = null;
  let localSavedAt = 0;
  try {
    localRecord = JSON.parse(localStorage.getItem(OPEN_CALL_STORAGE_KEY) || "null");
    localSavedAt = Number(localStorage.getItem(OPEN_CALL_STORAGE_META_KEY)) || 0;
  } catch (error) {
    console.warn("無法讀取公開徵件前台資料", error);
  }
  const databaseRecord = await readOpenCallDatabase();
  if (databaseRecord?.records && databaseRecord.savedAt >= localSavedAt) renderOpenCall(databaseRecord.records);
  else if (localRecord) renderOpenCall(localRecord);
}

window.addEventListener("storage", event => {
  if (event.key === OPEN_CALL_STORAGE_KEY || event.key === OPEN_CALL_STORAGE_META_KEY) loadOpenCall();
});

loadOpenCall();
