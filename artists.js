const ARTISTS_STORAGE_KEY = "middle-art-space-cms-artists-v1";
const ARTISTS_STORAGE_META_KEY = `${ARTISTS_STORAGE_KEY}-saved-at`;
const ARTISTS_DATABASE_NAME = "middle-art-space-cms";
const ARTISTS_RECORD_STORE = "content-records";
const ARTIST_META_DEFAULTS = {
  "Franek Ammer": { residencyDate: "2026.09", website: "https://www.franekammer.com" },
  "Seirin Hyung": { residencyDate: "2026.02", website: "https://www.seirinhyung.com/" },
  "Vladimir Us": { residencyDate: "2025.05", website: "https://oberliht.org/" }
};

function artistImageSource(artist) {
  if (artist.imageUrl?.startsWith("../assets/")) return artist.imageUrl.slice(3);
  if (artist.imageUrl) return artist.imageUrl;
  return artist.image ? `assets/${artist.image}` : "";
}

function artistResidencyDate(artist) {
  const value = artist.residencyDate || (/^\d{4}[.-]\d{2}$/.test(artist.date || "") ? artist.date : "") || ARTIST_META_DEFAULTS[artist.title]?.residencyDate || "";
  return value.replace("-", ".");
}

function artistWebsite(artist) {
  return artist.website || ARTIST_META_DEFAULTS[artist.title]?.website || "";
}

function createArtistCard(artist) {
  const card = document.createElement("article");
  card.className = "artist-card";

  const image = document.createElement("img");
  image.className = "artist-portrait";
  image.src = artistImageSource(artist);
  image.alt = artist.title || "藝術家";
  card.appendChild(image);

  const info = document.createElement("div");
  info.className = "artist-info";
  const identity = document.createElement("div");
  identity.className = "artist-name-country";
  const name = document.createElement("h2");
  name.textContent = artist.title || "未命名藝術家";
  const nationality = document.createElement("p");
  nationality.textContent = artist.nationality || "";
  identity.append(name, nationality);
  info.appendChild(identity);

  const residencyDate = artistResidencyDate(artist);
  const website = artistWebsite(artist);
  if (residencyDate || /^https?:\/\//i.test(website)) {
    const meta = document.createElement("div");
    meta.className = "artist-meta";
    if (residencyDate) {
      const time = document.createElement("time");
      time.dateTime = residencyDate.replace(".", "-");
      time.textContent = residencyDate;
      meta.appendChild(time);
    }
    if (/^https?:\/\//i.test(website)) {
      const link = document.createElement("a");
      link.className = "artist-website";
      link.href = website;
      link.target = "_blank";
      link.rel = "noopener";
      link.setAttribute("aria-label", `前往 ${artist.title || "藝術家"} 網站`);
      const icon = document.createElement("img");
      icon.src = "assets/artists-2026/language.svg";
      icon.alt = "";
      link.appendChild(icon);
      meta.appendChild(link);
    }
    info.appendChild(meta);
  }

  card.appendChild(info);
  return card;
}

function renderArtists(records) {
  const grid = document.querySelector("#artists-grid");
  if (!grid || !Array.isArray(records) || !records.length) return;
  grid.replaceChildren(...records.map(createArtistCard));
  const targetCount = Math.max(8, Math.ceil(records.length / 4) * 4);
  for (let index = records.length; index < targetCount; index += 1) {
    const empty = document.createElement("span");
    empty.className = "artist-card artist-card-empty";
    empty.setAttribute("aria-hidden", "true");
    empty.innerHTML = '<span class="artist-portrait"></span><span class="artist-info"></span>';
    grid.appendChild(empty);
  }
}

function readArtistsDatabase() {
  return new Promise((resolve) => {
    if (!("indexedDB" in window)) return resolve(null);
    const request = indexedDB.open(ARTISTS_DATABASE_NAME, 1);
    request.onerror = () => resolve(null);
    request.onsuccess = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(ARTISTS_RECORD_STORE)) {
        database.close();
        return resolve(null);
      }
      const transaction = database.transaction(ARTISTS_RECORD_STORE, "readonly");
      const getRequest = transaction.objectStore(ARTISTS_RECORD_STORE).get("artists");
      getRequest.onsuccess = () => resolve(getRequest.result || null);
      getRequest.onerror = () => resolve(null);
      transaction.oncomplete = () => database.close();
    };
  });
}

async function loadArtists() {
  let localRecords = null;
  let localSavedAt = 0;
  try {
    localRecords = JSON.parse(localStorage.getItem(ARTISTS_STORAGE_KEY) || "null");
    localSavedAt = Number(localStorage.getItem(ARTISTS_STORAGE_META_KEY)) || 0;
  } catch (error) {
    console.warn("無法讀取藝術家前台資料", error);
  }
  const databaseRecord = await readArtistsDatabase();
  if (Array.isArray(databaseRecord?.records) && databaseRecord.savedAt >= localSavedAt) renderArtists(databaseRecord.records);
  else if (Array.isArray(localRecords)) renderArtists(localRecords);
}

window.addEventListener("storage", event => {
  if (event.key === ARTISTS_STORAGE_KEY || event.key === ARTISTS_STORAGE_META_KEY) loadArtists();
});

loadArtists();
