const TMDB_BASE = "https://api.themoviedb.org/3";
// Paste your TMDB API key between the quotes. This key is visible to anyone who can access the site.
const TMDB_API_KEY = "";
const WIKIDATA_SPARQL = "https://query.wikidata.org/sparql";
const PAGE_SIZE = 20;
const STREAMING_SEARCH_URLS = [
  { match: /netflix/i, url: "https://www.netflix.com/search?q=" },
  { match: /prime video|amazon (prime )?video/i, url: "https://www.primevideo.com/search/ref=atv_nb_sr?phrase=" },
  { match: /disney\+ hotstar|jiohotstar/i, url: "https://www.hotstar.com/in/search?q=" },
  { match: /disney\+/i, url: "https://www.disneyplus.com/search?q=" },
  { match: /hulu/i, url: "https://www.hulu.com/search?q=" },
  { match: /max|hbo max/i, url: "https://www.max.com/search?q=" },
  { match: /zee5/i, url: "https://www.zee5.com/search?q=" },
  { match: /apple tv/i, url: "https://tv.apple.com/search?term=" },
  { match: /google play/i, url: "https://play.google.com/store/search?q=" },
  { match: /crunchyroll/i, url: "https://www.crunchyroll.com/search?q=" },
  { match: /sonyliv/i, url: "https://www.sonyliv.com/search?q=" },
  { match: /mubi/i, url: "https://mubi.com/en/search?query=" },
  { match: /rakuten tv/i, url: "https://www.rakuten.tv/search?q=" },
  { match: /paramount\+/i, url: "https://www.paramountplus.com/search/?query=" },
  { match: /youtube/i, url: "https://www.youtube.com/results?search_query=" }
];
const INDUSTRIES = {
  indian: { region: "IN", label: "Indian cinema" },
  bollywood: { language: "hi", label: "Bollywood" },
  tollywood: { language: "te", label: "Tollywood" },
  kollywood: { language: "ta", label: "Kollywood" },
  mollywood: { language: "ml", label: "Mollywood" },
  sandalwood: { language: "kn", label: "Sandalwood" },
  hollywood: { language: "en", region: "US", label: "Hollywood" },
  animation: { label: "Anime & Cartoon" }
};
const GENRES = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western",
  10759: "Action & Adventure", 10762: "Kids", 10763: "News", 10764: "Reality",
  10765: "Sci-Fi & Fantasy", 10766: "Soap", 10767: "Talk", 10768: "War & Politics"
};
const LANGUAGE_NAMES = {
  en: "English", hi: "Hindi", te: "Telugu", ta: "Tamil", ml: "Malayalam",
  kn: "Kannada", ja: "Japanese", ko: "Korean", fr: "French", es: "Spanish",
  de: "German", it: "Italian", zh: "Chinese", bn: "Bengali", mr: "Marathi"
};
const LANGUAGE_CODES = Object.fromEntries(
  Object.entries(LANGUAGE_NAMES).map(([code, name]) => [name.toLowerCase(), code])
);
const SAMPLE_FILMS = [
  { id: "rrr", title: "RRR", year: 2022, rating: 7.8, runtime: "187 min", genres: ["Action", "History"], industry: "tollywood", language: "Telugu", poster: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=85", plot: "A fearless warrior and a forceful police officer meet on opposing sides of a revolution, then form an unlikely bond that changes their lives.", director: "S. S. Rajamouli", cast: "N. T. Rama Rao Jr., Ram Charan, Alia Bhatt, Ajay Devgn", streaming: "Netflix", awards: [{ name: "Academy Awards", year: 2023, distinction: "Best Original Song — “Naatu Naatu”" }, { name: "National Film Awards", year: 2023, distinction: "Best Popular Film Providing Wholesome Entertainment" }] },
  { id: "lucky-baskhar", title: "Lucky Baskhar", year: 2024, rating: 7.7, runtime: "150 min", genres: ["Thriller", "Crime"], industry: "tollywood", language: "Telugu", poster: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=85", plot: "A modest bank cashier takes a risky shortcut toward a better life, only to discover that every easy win comes with a cost.", director: "Venky Atluri", cast: "Dulquer Salmaan, Meenakshi Chaudhary, Ramki", streaming: "Netflix" },
  { id: "bahubali", title: "Baahubali: The Beginning", year: 2015, rating: 8, runtime: "159 min", genres: ["Action", "Drama"], industry: "tollywood", language: "Telugu", poster: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=85", plot: "A young man raised far from the kingdom of Mahishmati discovers a remarkable destiny and the truth behind a legendary warrior.", director: "S. S. Rajamouli", cast: "Prabhas, Rana Daggubati, Anushka Shetty, Tamannaah", streaming: "Disney+ Hotstar" },
  { id: "kantara", title: "Kantara", year: 2022, rating: 8.2, runtime: "148 min", genres: ["Action", "Thriller"], industry: "indian", language: "Kannada", poster: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=85", plot: "In a forest village, an age-old tradition and a clash over land draw a rebellious young man into a battle bigger than himself.", director: "Rishab Shetty", cast: "Rishab Shetty, Kishore, Achyuth Kumar, Sapthami Gowda", streaming: "Prime Video", awards: [{ name: "National Film Awards", year: 2024, distinction: "Best Actor — Rishab Shetty" }, { name: "National Film Awards", year: 2024, distinction: "Best Popular Film Providing Wholesome Entertainment" }] },
  { id: "dangal", title: "Dangal", year: 2016, rating: 8.3, runtime: "161 min", genres: ["Drama", "Sport"], industry: "indian", language: "Hindi", poster: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=800&q=85", plot: "A former wrestler trains his daughters to compete against expectations and become champions on the international stage.", director: "Nitesh Tiwari", cast: "Aamir Khan, Fatima Sana Shaikh, Sanya Malhotra", streaming: "Netflix" },
  { id: "the-bear", title: "The Bear", year: 2022, rating: 8.5, runtime: "TV Series", genres: ["Drama", "Comedy"], industry: "tv", language: "English", isTv: true, poster: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=85", plot: "A talented young chef returns home to run his family’s sandwich shop, finding that the kitchen is only part of the challenge.", director: "Christopher Storer", cast: "Jeremy Allen White, Ayo Edebiri, Ebon Moss-Bachrach", streaming: "Hulu" },
  { id: "maya-legend", title: "Maya: Rise of a Legend", year: 2026, rating: 0, runtime: "195 min", genres: ["Fantasy", "Action", "Adventure"], industry: "indian", language: "Hindi", upcoming: true, poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85", plot: "An ancient epic follows a young prince and princess whose marriage and subsequent exile mark the beginning of a legendary journey.", director: "Nitesh Tiwari", cast: "Ranbir Kapoor, Yash, Sai Pallavi, Ravi Dubey, Arun Govil", streaming: "Not announced" },
  { id: "bahubali-2", title: "Baahubali 2: The Conclusion", year: 2017, rating: 8.2, runtime: "167 min", genres: ["Action", "Adventure"], industry: "tollywood", language: "Telugu", poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85", plot: "The story of Amarendra Baahubali unfolds, revealing the betrayal that tore a kingdom apart and the battle to reclaim it.", director: "S. S. Rajamouli", cast: "Prabhas, Rana Daggubati, Anushka Shetty, Ramya Krishna", streaming: "Netflix", awards: [{ name: "National Film Awards", year: 2018, distinction: "Best Popular Film Providing Wholesome Entertainment" }] },
  { id: "manjummel-boys", title: "Manjummel Boys", year: 2024, rating: 8.2, runtime: "135 min", genres: ["Adventure", "Thriller"], industry: "indian", language: "Malayalam", poster: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=85", plot: "A holiday among friends turns into a desperate rescue mission after one of them disappears inside a perilous cave.", director: "Chidambaram", cast: "Soubin Shahir, Sreenath Bhasi, Balu Varghese", streaming: "Disney+ Hotstar" },
  { id: "spirited-away", title: "Spirited Away", year: 2001, rating: 8.6, runtime: "125 min", genres: ["Animation", "Fantasy"], industry: "international", language: "Japanese", poster: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=800&q=85", plot: "A young girl enters a world of spirits and must find her courage to save her parents and return home.", director: "Hayao Miyazaki", cast: "Rumi Hiiragi, Miyu Irino, Mari Natsuki", streaming: "Max" },
  { id: "your-name", title: "Your Name.", year: 2016, rating: 8.5, runtime: "106 min", genres: ["Animation", "Romance", "Drama"], genreIds: [16, 10749, 18], industry: "animation", language: "Japanese", poster: "", plot: "Two teenagers find themselves mysteriously connected across distance and time.", director: "Makoto Shinkai", cast: "Ryunosuke Kamiki, Mone Kamishiraishi", streaming: "Check local streaming services" },
  { id: "coco", title: "Coco", year: 2017, rating: 8.2, runtime: "105 min", genres: ["Animation", "Family", "Music"], genreIds: [16, 10751, 10402], industry: "animation", language: "English", poster: "", plot: "A young musician journeys into the Land of the Dead to uncover his family's history.", director: "Lee Unkrich", cast: "Anthony Gonzalez, Gael García Bernal", streaming: "Disney+" },
  { id: "spider-verse", title: "Spider-Man: Into the Spider-Verse", year: 2018, rating: 8.4, runtime: "117 min", genres: ["Animation", "Action", "Adventure"], genreIds: [16, 28, 12], industry: "animation", language: "English", poster: "", plot: "Teenager Miles Morales becomes Spider-Man and joins heroes from other dimensions.", director: "Bob Persichetti, Peter Ramsey, Rodney Rothman", cast: "Shameik Moore, Jake Johnson, Hailee Steinfeld", streaming: "Check local streaming services" },
  { id: "interstellar", title: "Interstellar", year: 2014, rating: 8.7, runtime: "169 min", genres: ["Sci-Fi", "Drama"], industry: "international", language: "English", poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=85", plot: "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.", director: "Christopher Nolan", cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain", streaming: "Paramount+" },
  { id: "squid-game", title: "Squid Game", year: 2021, rating: 8, runtime: "TV Series", genres: ["Thriller", "Drama"], industry: "tv", language: "Korean", isTv: true, poster: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=85", plot: "Hundreds of cash-strapped contestants accept an invitation to compete in children's games, where the stakes are devastatingly real.", director: "Hwang Dong-hyuk", cast: "Lee Jung-jae, Lee Byung-hun, Wi Ha-jun", streaming: "Netflix" },
  { id: "86423", mediaType: "tv", title: "Locke & Key", year: 2020, rating: 7.7, runtime: "TV Series · 3 seasons", genres: ["Sci-Fi & Fantasy", "Drama", "Mystery"], genreIds: [10765, 18, 9648], industry: "tv", language: "English", isTv: true, poster: "", plot: "After their dad's murder, three siblings move with their mom to his ancestral estate, where they discover magical keys that unlock powers — and secrets.", director: "Meredith Averill, Aron Eli Coleite, Carlton Cuse", cast: "Darby Stanchfield, Connor Jessup, Emilia Jones, Jackson Robert Scott, Petrice Jones, Hallea Jones", streaming: "Netflix" }
];

const KNOWN_AWARDS = [
  {
    year: 2021,
    titles: ["Pushpa: The Rise", "Pushpa: The Rise - Part 1"],
    awards: [
      { name: "National Film Awards", year: 2023, distinction: "Best Actor — Allu Arjun" },
      { name: "National Film Awards", year: 2023, distinction: "Best Music Direction (Songs) — Devi Sri Prasad" }
    ]
  },
  {
    year: 2001,
    titles: ["The Lord of the Rings: The Fellowship of the Ring", "Lord of the Rings: The Fellowship of the Ring", "The Fellowship of the Ring"],
    awards: [
      { name: "Academy Awards", year: 2002, distinction: "4 wins: Cinematography, Makeup, Original Score, and Visual Effects. Part of a trilogy with 17 Oscar wins overall." }
    ]
  },
  {
    year: 2002,
    titles: ["The Lord of the Rings: The Two Towers", "Lord of the Rings: The Two Towers", "The Two Towers"],
    awards: [
      { name: "Academy Awards", year: 2003, distinction: "2 wins: Sound Editing and Visual Effects. Part of a trilogy with 17 Oscar wins overall." }
    ]
  },
  {
    year: 2003,
    titles: ["The Lord of the Rings: The Return of the King", "Lord of the Rings: The Return of the King", "The Return of the King"],
    awards: [
      { name: "Academy Awards", year: 2004, distinction: "11 wins, including Best Picture, Best Director, and all 11 categories in which it was nominated. Part of a trilogy with 17 Oscar wins overall." }
    ]
  },
  {
    year: 2001,
    titles: ["Spirited Away"],
    awards: [
      { name: "Academy Awards", year: 2003, distinction: "Best Animated Feature" }
    ]
  },
  {
    year: 2017,
    titles: ["Coco"],
    awards: [
      { name: "Academy Awards", year: 2018, distinction: "Best Animated Feature" },
      { name: "Academy Awards", year: 2018, distinction: "Best Original Song — “Remember Me”" }
    ]
  },
  {
    year: 2018,
    titles: ["Spider-Man: Into the Spider-Verse"],
    awards: [
      { name: "Academy Awards", year: 2019, distinction: "Best Animated Feature" }
    ]
  },
  {
    year: 2016,
    titles: ["Dangal"],
    awards: [
      { name: "National Film Awards", year: 2017, distinction: "Best Popular Film Providing Wholesome Entertainment" }
    ]
  },
  {
    year: 2022,
    titles: ["The Bear"],
    awards: [
      { name: "Primetime Emmy Awards", year: 2023, distinction: "Outstanding Comedy Series" },
      { name: "Primetime Emmy Awards", year: 2023, distinction: "Outstanding Lead Actor in a Comedy Series — Jeremy Allen White" },
      { name: "Primetime Emmy Awards", year: 2023, distinction: "Outstanding Supporting Actress in a Comedy Series — Ayo Edebiri" },
      { name: "Primetime Emmy Awards", year: 2024, distinction: "Outstanding Lead Actress in a Comedy Series — Ayo Edebiri" },
      { name: "Primetime Emmy Awards", year: 2024, distinction: "Outstanding Supporting Actor in a Comedy Series — Ebon Moss-Bachrach" }
    ]
  },
  {
    year: 2021,
    titles: ["Squid Game"],
    awards: [
      { name: "Primetime Emmy Awards", year: 2022, distinction: "Outstanding Lead Actor in a Drama Series — Lee Jung-jae" },
      { name: "Primetime Emmy Awards", year: 2022, distinction: "Outstanding Guest Actress in a Drama Series — Lee You-mi" }
    ]
  }
];
const SAMPLE_CREDITS = {
  rrr: { productionHouse: "DVV Entertainment", musicDirector: "M. M. Keeravaani" },
  kantara: { productionHouse: "Hombale Films", musicDirector: "B. Ajaneesh Loknath" },
  "bahubali-2": { productionHouse: "Arka Media Works", musicDirector: "M. M. Keeravaani" },
  dangal: { productionHouse: "Aamir Khan Productions", musicDirector: "Pritam" }
};
const KNOWN_BOX_OFFICE_VERDICTS = [
  {
    year: 2018,
    titles: ["Rangasthalam"],
    label: "ATB",
    detail: "All-time blockbuster in Telugu cinema. Reported worldwide gross: approximately ₹216 crore.",
    source: "https://en.wikipedia.org/wiki/Rangasthalam",
    theatricalRelease: true
  },
  {
    year: 2020,
    titles: ["Ala Vaikunthapurramuloo", "Ala Vaikuntapuramlo", "Ala Vaikunthapuramloo"],
    label: "ATB",
    detail: "All-time blockbuster in Telugu cinema. Reported worldwide gross: approximately ₹262–280 crore.",
    source: "https://en.wikipedia.org/wiki/Ala_Vaikunthapurramuloo",
    theatricalRelease: true
  }
];

function findKnownAwards(title, year) {
  const normalize = (value) => String(value).toLowerCase().replace(/[^a-z0-9]/g, "");
  const normalizedTitle = normalize(title);
  const lotrYear = Number(year);
  if (normalizedTitle.includes("lordoftherings")) {
    const filmTitle = normalizedTitle.includes("fellowshipofthering") ? "fellowshipofthering" :
      normalizedTitle.includes("twotowers") ? "twotowers" :
        normalizedTitle.includes("returnoftheking") ? "returnoftheking" : "";
    const expectedYear = filmTitle === "fellowshipofthering" ? 2001 :
      filmTitle === "twotowers" ? 2002 : filmTitle === "returnoftheking" ? 2003 : 0;
    if (filmTitle && lotrYear === expectedYear) {
      const lordOfTheRingsFilm = KNOWN_AWARDS.find((entry) =>
        entry.year === lotrYear &&
        entry.titles.some((knownTitle) => normalize(knownTitle).includes(filmTitle))
      );
      if (lordOfTheRingsFilm) return lordOfTheRingsFilm.awards;
    }
    if (filmTitle) return [];
  }
  const known = KNOWN_AWARDS.find((entry) =>
    entry.year === Number(year) &&
    entry.titles.some((knownTitle) => {
      const normalizedKnownTitle = normalize(knownTitle);
      return normalizedKnownTitle === normalizedTitle ||
        (normalizedKnownTitle.startsWith("thelordoftherings") && normalizedTitle.includes(normalizedKnownTitle.slice(3)));
    })
  );
  if (known) return known.awards;
  const sample = SAMPLE_FILMS.find((film) =>
    film.year === Number(year) &&
    normalize(film.title) === normalizedTitle &&
    film.awards?.length
  );
  return sample?.awards || [];
}

function mergeAwards(...awardLists) {
  const normalize = (value) => String(value).toLowerCase().replace(/[^a-z0-9]/g, "");
  const awards = new Map();
  awardLists.flat().forEach((award) => {
    const category = String(award.distinction || "")
      .split(/\s+[—–-]\s+/)[0]
      .replace(/^(academy award|national film award|primetime emmy award|emmy award)(s)?(\s+for)?/i, "");
    const organization = award.name.toLowerCase().includes("academy") ? "academy" :
      award.name.toLowerCase().includes("emmy") ? "emmy" :
        award.name.toLowerCase().includes("national") ? "national" : normalize(award.name);
    const key = `${organization}|${award.year || ""}|${normalize(category)}`;
    if (!awards.has(key)) awards.set(key, award);
  });
  return [...awards.values()];
}

function readSet(key) {
  const parsed = JSON.parse(localStorage.getItem(key) || "[]");
  return new Set(Array.isArray(parsed) ? parsed : []);
}

const state = {
  view: "discover", industry: "all", genre: "all", rating: "all", search: "",
  searchActive: false, suggestionsLoading: false, suggestionsError: "",
  films: SAMPLE_FILMS, page: 1, totalPages: 1, loading: false, error: "",
  totalResults: SAMPLE_FILMS.length,
  top250: false,
  watchlist: readSet("moviematrix-watchlist"),
  favorites: readSet("moviematrix-favorites"),
  savedFilms: JSON.parse(localStorage.getItem("moviematrix-saved-films") || "{}"),
  apiKey: TMDB_API_KEY.trim(),
  suggestions: [], suggestionQuery: "", selectedSuggestion: -1, searchTimer: 0, catalogToken: 0, suggestionToken: 0,
  searchMode: false,
  returnToSearch: false,
  recommendationToken: 0
};
const wikidataAwardsCache = new Map();

const grid = document.querySelector("#movie-grid");
const emptyState = document.querySelector("#empty-state");
const dialog = document.querySelector("#detail-dialog");
const detailContent = document.querySelector("#detail-content");
const suggestionBox = document.querySelector("#search-suggestions");
const allSavedIds = () => new Set([...state.watchlist, ...state.favorites]);

function titleKey(film) {
  return `${film.mediaType || (film.isTv ? "tv" : "movie")}-${film.id}`;
}

function storeSavedFilm(film) {
  if (!film) return;
  state.savedFilms[titleKey(film)] = film;
  localStorage.setItem("moviematrix-saved-films", JSON.stringify(state.savedFilms));
}

function industryFor(language, country) {
  if (language === "te") return "tollywood";
  if (language === "hi") return "bollywood";
  if (language === "ta") return "kollywood";
  if (language === "ml") return "mollywood";
  if (language === "kn") return "sandalwood";
  if (language === "en" && country === "US") return "hollywood";
  if (country === "IN") return "indian";
  return "international";
}

function genreIdsFor(names = []) {
  const normalize = (name) => String(name).toLowerCase().replace(/[^a-z0-9]/g, "");
  const aliases = { sciencefiction: 878, scifi: 878, scififantasy: 10765, actionadventure: 10759 };
  return names.map((name) => {
    const key = normalize(name);
    if (aliases[key]) return aliases[key];
    return Number(Object.entries(GENRES).find(([, label]) => normalize(label) === key)?.[0]);
  }).filter(Number.isFinite);
}

function normalizeTitle(item, mediaType = item.media_type || "movie") {
  const type = item.type || mediaType;
  const isTv = type === "tv" || type.startsWith("tv_");
  const language = item.original_language || "en";
  const country = item.origin_country?.[0] || item.country || "";
  const date = item.release_date || (item.year ? `${item.year}-01-01` : "");
  const genreNames = item.genre_names || item.genres?.map((genre) => typeof genre === "string" ? genre : genre.name) || [];
  const genreIds = item.genre_ids || (item.genres?.some((genre) => genre.id)
    ? item.genres.map((genre) => genre.id).filter(Boolean)
    : genreIdsFor(genreNames));
  return {
    id: String(item.id), mediaType: isTv ? "tv" : "movie", title: item.title || item.name || "Untitled",
    year: date ? Number(date.slice(0, 4)) : "—",
    rating: Number(item.user_rating || item.vote_average || 0),
    runtime: isTv ? "TV Series" : item.runtime_minutes ? `${item.runtime_minutes} min` :
      item.runtime ? `${item.runtime} min` : "Runtime not listed",
    genres: genreNames.length ? genreNames : genreIds.map((id) => GENRES[id]).filter(Boolean),
    genreIds, industry: isTv ? "tv" : industryFor(language, country),
    language: LANGUAGE_NAMES[language] || language.toUpperCase(), isTv, releaseDate: date || "",
    upcoming: date ? date > new Date().toISOString().slice(0, 10) : false,
    poster: item.poster || item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path || item.poster}` : "",
    backdrop: item.backdrop || item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path || item.backdrop}` : "",
    plot: item.plot_overview || item.overview || "No synopsis is available for this title yet.",
    director: "Not listed", cast: "Not listed", streaming: "Check local streaming services",
    popularity: Number(item.popularity || 0), voteCount: Number(item.vote_count || 0),
    imdbId: item.imdb_id || "",
    originCountry: country,
    awards: findKnownAwards(item.title || item.name || "Untitled", date ? date.slice(0, 4) : "")
  };
}

function imageMarkup(film, className) {
  const fallback = "https://placehold.co/600x900/242936/f4f1e9?text=MovieMatrix";
  const src = film.poster || fallback;
  return `<img class="${className}" src="${escapeHtml(src)}" alt="${escapeHtml(film.title)} poster" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">`;
}

function getStreamingProviders(film) {
  if (film.streamingProviders?.length) return film.streamingProviders;
  const unavailable = ["not announced", "check local streaming services", "no providers listed for the selected region"];
  return String(film.streaming || "")
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name && !unavailable.includes(name.toLowerCase()))
    .map((name) => ({ name }));
}

function streamingSearchUrl(provider, film) {
  const search = STREAMING_SEARCH_URLS.find((entry) => entry.match.test(provider.name));
  if (search) return `${search.url}${encodeURIComponent(`${film.title} ${film.year}`)}`;
  if (film.availabilityUrl) {
    try {
      const url = new URL(film.availabilityUrl);
      if (url.protocol === "https:") return url.href;
    } catch (error) {
      console.warn("Ignoring invalid streaming availability URL.", error);
    }
  }
  return "";
}

function renderStreamingProviders(film) {
  const providers = getStreamingProviders(film);
  if (!providers.length) return `<p class="credit-value">No streaming partners listed.</p>`;
  const icons = providers.map((provider) => {
    const url = streamingSearchUrl(provider, film);
    const hasPlatformSearch = STREAMING_SEARCH_URLS.some((entry) => entry.match.test(provider.name));
    const accessibleName = hasPlatformSearch
      ? `${provider.name} — search for ${film.title}`
      : `${provider.name} — check availability for ${film.title}`;
    const logo = provider.logoPath
      ? `<img src="${escapeHtml(provider.logoPath)}" alt="" loading="lazy">`
      : `<span class="streaming-provider-monogram" aria-hidden="true">${escapeHtml(provider.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase())}</span>`;
    return url
      ? `<a class="streaming-provider-icon" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(accessibleName)}" title="${escapeHtml(provider.name)}">${logo}</a>`
      : `<span class="streaming-provider-icon is-unavailable" aria-label="${escapeHtml(provider.name)}" title="${escapeHtml(provider.name)}">${logo}</span>`;
  }).join("");
  return `<div class="streaming-provider-list" aria-label="Streaming platforms">${icons}</div>`;
}

function isTelevisionTitle(film) {
  return film.mediaType ? film.mediaType === "tv" : film.isTv === true;
}

function getBoxOfficeVerdict(film) {
  if (isTelevisionTitle(film)) return null;
  if (film.upcoming) return { label: "Pending", detail: "Box-office figures are not available before release." };
  const normalize = (title) => String(title).toLowerCase().replace(/[^a-z0-9]/g, "");
  const normalizedTitle = normalize(film.title);
  const verdict = KNOWN_BOX_OFFICE_VERDICTS.find((entry) =>
    entry.year === Number(film.year) &&
    entry.titles.some((title) => normalize(title) === normalizedTitle)
  );
  if (verdict) return verdict;
  if (film.theatricalRelease !== true) {
    return {
      label: "Unavailable",
      detail: film.theatricalReleaseError
        ? `Theatrical release could not be checked: ${film.theatricalReleaseError}`
        : "A theatrical release is not confirmed in the sample catalog."
    };
  }
  const budget = Number(film.budget);
  const revenue = Number(film.revenue);
  if (!Number.isFinite(budget) || !Number.isFinite(revenue) || budget <= 0 || revenue <= 0) {
    return { label: "Unavailable", detail: "Budget and worldwide gross figures are not available for this theatrical movie." };
  }
  const ratio = revenue / budget;
  const label = ratio >= 5 ? "ATB" :
    ratio >= 3 ? "Blockbuster" :
      ratio >= 2 ? "Hit" :
        ratio >= 1.5 ? "Above average" :
          ratio >= 1 ? "Average" :
            ratio >= 0.75 ? "Below average" :
              ratio >= 0.5 ? "Flop" : "Disaster";
  return {
    label: `Estimated ${label}`,
    detail: `${ratio.toFixed(2)}× worldwide gross to reported production budget. This is a rough estimate, not an industry-verified verdict.`
  };
}

function renderBoxOfficeVerdict(film) {
  const verdict = getBoxOfficeVerdict(film);
  if (!verdict) return "";
  const className = ["Unavailable", "Pending"].includes(verdict.label)
    ? "verdict-badge is-neutral" : "verdict-badge";
  return `<div class="box-office-verdict">
    <p class="credit-label">${verdict.label.startsWith("Estimated ") ? "ESTIMATED BOX OFFICE VERDICT" : "BOX OFFICE VERDICT"}</p>
    <span class="${className}">${escapeHtml(verdict.label)}</span>
    <small>${escapeHtml(verdict.detail)}</small>
    ${verdict.source
      ? `<a class="verdict-source" href="${escapeHtml(verdict.source)}" target="_blank" rel="noopener noreferrer">Box-office source ↗</a>`
      : ""}
  </div>`;
}

function makeCard(film) {
  const key = titleKey(film);
  const saved = state.favorites.has(key);
  const label = film.industry === "tv" ? "SERIES" : film.language;
  return `<article class="movie-card" data-id="${escapeHtml(key)}" tabindex="0" aria-label="View details for ${escapeHtml(film.title)}">
    <div class="poster-wrap">${imageMarkup(film, "poster")}
      <span class="poster-label">${escapeHtml(label)}</span>
      <button class="favorite-button ${saved ? "is-favorite" : ""}" data-favorite="${escapeHtml(key)}" aria-label="${saved ? "Remove from" : "Add to"} favorites" aria-pressed="${saved}">♡</button>
      <div class="poster-meta"><span>${film.year}</span><span class="rating">${film.rating ? film.rating.toFixed(1) : "NR"}</span></div>
    </div><div class="card-copy"><h3 class="card-title">${escapeHtml(film.title)}</h3>
      <p class="card-genres">${escapeHtml(film.genres.join(" · ") || (film.isTv ? "Television" : "Genre not listed"))}</p>
    </div></article>`;
}

function filterSampleFilms() {
  return state.films.filter((film) => {
    const matchesIndustry = state.industry === "all" ||
      (state.industry === "animation" && isAnimationTitle(film)) ||
      (state.industry === "indian" && ["indian", "tollywood", "bollywood", "kollywood", "mollywood", "sandalwood"].includes(film.industry)) ||
      (state.industry === "tv" && film.isTv) || (state.industry === "upcoming" && film.upcoming) ||
      film.industry === state.industry;
    const matchesView = state.view === "discover" ||
        (state.view === "watchlist" && (state.watchlist.has(titleKey(film)) || state.watchlist.has(film.id))) ||
        (state.view === "favorites" && (state.favorites.has(titleKey(film)) || state.favorites.has(film.id)));
    const matchesSearch = `${film.title} ${film.genres.join(" ")} ${film.language} ${film.director}`.toLowerCase().includes(state.search.toLowerCase());
    const matchesGenre = state.genre === "all" || film.genres.some((genre) =>
      genre.toLowerCase() === (GENRES[state.genre] || state.genre).toLowerCase());
    const matchesRating = state.rating === "all" || (film.rating > 0 && film.rating >= Number(state.rating));
    return matchesIndustry && matchesView && matchesSearch && matchesGenre && matchesRating;
  });
}

function isAnimationTitle(film) {
  return (film.genreIds || []).includes(16) ||
    (film.genres || []).some((genre) => genre.toLowerCase() === "animation");
}

function render() {
  document.body.classList.toggle("search-active", state.searchActive && !dialog.open);
  document.body.classList.toggle("search-results-active", state.searchMode && !state.searchActive && state.view === "discover");
  document.body.dataset.backdrop = state.searchActive || state.searchMode || state.view !== "discover" || state.industry === "all"
    ? "all"
    : state.industry === "tv" ? "tv" : "movies";
  const isSavedView = state.view !== "discover";
  const savedTitles = [...allSavedIds()].map((key) => state.savedFilms[key]).filter(Boolean);
  const list = state.apiKey && !isSavedView
    ? state.films
    : isSavedView
      ? [...state.films, ...savedTitles].filter((film, index, all) =>
        all.findIndex((other) => titleKey(other) === titleKey(film)) === index &&
        (state.view === "watchlist" ? state.watchlist.has(titleKey(film)) : state.favorites.has(titleKey(film))))
      : filterSampleFilms();
  grid.innerHTML = list.map(makeCard).join("");
  document.querySelector("#result-count").textContent = state.apiKey && !isSavedView && !state.top250
    ? state.totalResults.toLocaleString()
    : list.length;
  document.querySelector("#result-label").textContent = state.top250 ? " top-rated titles" :
    state.apiKey && !isSavedView ? " titles found" : " titles in the index";
  document.querySelector("#watchlist-count").textContent = state.watchlist.size;
  document.querySelector("#favorites-count").textContent = state.favorites.size;
  document.querySelector("#section-title").textContent = state.top250
    ? `${top250Title()}${state.apiKey ? "" : " (sample picks)"}`
    : state.view === "watchlist"
    ? "Saved for a movie night" : state.view === "favorites" ? "Your favorite stories" :
      state.search ? `Search results for “${escapeHtml(state.search)}”` :
        state.industry === "all" ? "A good place to begin" : `${INDUSTRIES[state.industry]?.label || "Television"} catalog`;
  document.querySelector("#section-kicker").textContent = state.view === "discover" ? "A PERSONAL FILM INDEX" :
    state.view === "watchlist" ? "YOUR WATCHLIST" : "YOUR FAVORITES";
  document.querySelectorAll(".nav-link").forEach((button) => button.classList.toggle("active", button.dataset.view === state.view));
  document.querySelectorAll(".industry-tab").forEach((button) => button.classList.toggle("active", button.dataset.industry === state.industry));
  emptyState.hidden = list.length > 0 || state.loading;
  grid.hidden = list.length === 0;
  document.querySelector("#catalog-status").hidden = !state.loading && !state.error;
  document.querySelector("#catalog-status").textContent = state.loading
    ? state.top250 ? "Finding the top-rated titles…" : "Finding titles in the catalog…"
    : state.error;
  document.querySelector("#load-more").hidden = !state.apiKey || state.view !== "discover" || state.page >= state.totalPages || state.loading;
  document.querySelector("#api-status-label").textContent = state.error
    ? "TMDB ERROR" : state.apiKey ? "TMDB ONLINE" : "SAMPLE LIBRARY";
  document.querySelector(".api-status").classList.toggle("connected", Boolean(state.apiKey) && !state.error);
  document.querySelector("#search-hint").textContent = state.apiKey
    ? "Search TMDB's live movie and TV catalog, then browse results page by page."
    : "Sample titles shown; add your TMDB API key in app.js to load the live catalog.";
  document.querySelector("#catalog-connect").hidden = Boolean(state.apiKey);
  const top250Button = document.querySelector("#top-250-toggle");
  top250Button.hidden = state.view !== "discover" || state.industry === "upcoming" ||
    state.searchActive || state.searchMode || Boolean(state.search);
  top250Button.setAttribute("aria-pressed", String(state.top250));
  top250Button.innerHTML = state.top250
    ? 'Back to catalog <span aria-hidden="true">↗</span>'
    : `${escapeHtml(top250ButtonLabel())} <span aria-hidden="true">↗</span>`;
  renderRecommendations();
}

function top250Title() {
  if (state.industry === "all") return "Top 250 movies & television shows";
  if (state.industry === "tv") return "Top 250 television shows";
  if (state.industry === "indian") return "Top 250 Indian movies";
  if (state.industry === "animation") return "Top 250 Anime & Cartoon";
  return `Top 250 ${INDUSTRIES[state.industry]?.label || "movie"} movies`;
}

function top250ButtonLabel() {
  if (state.industry === "all") return "Top 250 movies & shows";
  if (state.industry === "tv") return "Top 250 shows";
  if (state.industry === "animation") return "Top 250 Anime & Cartoon";
  return `Top 250 ${INDUSTRIES[state.industry]?.label || "movies"} movies`;
}

async function tmdb(path, params = {}) {
  if (!state.apiKey) throw new Error("Add your TMDB API key to the TMDB_API_KEY constant in app.js.");
  const url = new URL(`${TMDB_BASE}${path}`);
  url.searchParams.set("api_key", state.apiKey);
  url.searchParams.set("language", "en-US");
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  });
  let response;
  try {
    response = await fetch(url, { headers: { Accept: "application/json" } });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Could not reach TMDB. Check your internet connection and browser access, then try again.");
    }
    throw error;
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.status_message || data.error || `TMDB request failed (${response.status}).`);
  }
  if (data.error) throw new Error(data.message || data.error);
  return data;
}

function titlesFromResponse(response) {
  if (Array.isArray(response)) return response;
  return response.results || response.titles || [];
}

async function loadWikidataAwards(imdbId) {
  if (!/^tt\d+$/.test(imdbId)) throw new Error("Wikidata lookup requires a valid IMDb ID.");
  if (wikidataAwardsCache.has(imdbId)) return wikidataAwardsCache.get(imdbId);
  const query = `SELECT ?awardLabel ?date WHERE {
    ?film wdt:P345 "${imdbId}".
    ?film p:P166 ?awardStatement.
    ?awardStatement ps:P166 ?award.
    OPTIONAL { ?awardStatement pq:P585 ?date. }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  } LIMIT 100`;
  const url = new URL(WIKIDATA_SPARQL);
  url.searchParams.set("query", query);
  url.searchParams.set("format", "json");
  const request = fetch(url, { headers: { Accept: "application/sparql-results+json" } })
    .then(async (response) => {
      if (!response.ok) throw new Error(`Wikidata request failed (${response.status}).`);
      const data = await response.json();
      const awards = (data.results?.bindings || []).flatMap((binding) => {
        const distinction = binding.awardLabel?.value || "";
        const normalized = distinction.toLowerCase();
        const name = normalized.includes("academy award") ? "Academy Awards" :
          normalized.includes("national film award") ? "National Film Awards" :
            normalized.includes("emmy award") ? "Emmy Awards" : "";
        if (!name) return [];
        const year = binding.date?.value ? Number(binding.date.value.slice(0, 4)) : 0;
        return [{ name, year, distinction }];
      });
      return [...new Map(awards.map((award) => [
        `${award.name}|${award.year}|${award.distinction}`,
        award
      ])).values()];
    })
    .catch((error) => {
      wikidataAwardsCache.delete(imdbId);
      throw error;
    });
  wikidataAwardsCache.set(imdbId, request);
  return request;
}

async function loadCatalog({ reset = true } = {}) {
  if (!state.apiKey) {
    state.films = SAMPLE_FILMS;
    state.totalPages = 1;
    render();
    return;
  }
  if (reset) {
    state.page = 1;
    state.films = [];
  }
  state.loading = true;
  state.error = "";
  render();
  const token = ++state.catalogToken;
  try {
    const type = state.industry === "tv" ? "tv" : "movie";
    const params = {
      page: state.page,
      include_adult: false,
      sort_by: state.industry === "upcoming" ? "primary_release_date.desc" : "popularity.desc"
    };
    if (state.industry === "bollywood") params.with_original_language = "hi";
    if (state.industry === "tollywood") params.with_original_language = "te";
    if (state.industry === "kollywood") params.with_original_language = "ta";
    if (state.industry === "mollywood") params.with_original_language = "ml";
    if (state.industry === "sandalwood") params.with_original_language = "kn";
    if (state.industry === "hollywood") params.with_original_language = "en";
    if (state.industry === "animation") params.with_genres = "16";
    if (state.industry === "indian") params.with_origin_country = "IN";
    if (state.industry === "upcoming") params.primary_release_date_gte = new Date().toISOString().slice(0, 10);
    const response = await tmdb(type === "tv" ? "/discover/tv" : "/discover/movie", params);
    if (token !== state.catalogToken) return;
    const result = titlesFromResponse(response)
      .filter((item) => item.media_type !== "person")
      .map((item) => normalizeTitle(item, item.media_type || type))
      .filter(matchesSearchFilters)
      .filter((film) => state.industry !== "upcoming" || film.upcoming);
    state.films = reset ? result : [...state.films, ...result];
    state.totalPages = Math.min(response.total_pages || 1, 500);
    state.totalResults = response.total_results || result.length;
  } catch (error) {
    if (token === state.catalogToken) {
      state.error = error.message;
      if (!state.films.length) state.films = SAMPLE_FILMS.filter((film) => {
        if (state.industry === "all") return true;
        if (state.industry === "indian") return ["indian", "tollywood"].includes(film.industry);
        if (state.industry === "animation") return isAnimationTitle(film);
        return film.industry === state.industry || (state.industry === "upcoming" && film.upcoming);
      });
    }
  } finally {
    if (token === state.catalogToken) {
      state.loading = false;
      render();
    }
  }
}

async function loadTop250() {
  if (!state.apiKey) {
    state.films = SAMPLE_FILMS;
    state.totalResults = SAMPLE_FILMS.length;
    state.page = 1;
    state.totalPages = 1;
    render();
    return;
  }
  state.page = 1;
  state.totalPages = 1;
  state.films = [];
  state.loading = true;
  state.error = "";
  render();
  const token = ++state.catalogToken;
  try {
    const endpoint = state.industry === "tv" ? "/tv/top_rated" : "/movie/top_rated";
    const response = await tmdb(endpoint, { page: 1 });
    if (token !== state.catalogToken) return;
    const films = titlesFromResponse(response)
      .map((item) => normalizeTitle(item, item.media_type || (state.industry === "tv" ? "tv" : "movie")))
      .filter(matchesSearchFilters)
      .sort((a, b) => b.rating - a.rating || b.voteCount - a.voteCount)
      .slice(0, 250);
    state.films = films;
    state.totalResults = films.length;
  } catch (error) {
    if (token === state.catalogToken) state.error = error.message;
  } finally {
    if (token === state.catalogToken) {
      state.loading = false;
      render();
    }
  }
}

async function loadMore() {
  if (state.loading || state.page >= state.totalPages) return;
  state.page += 1;
  if (state.searchMode) await loadCatalogSearch(state.search, { append: true });
  else await loadCatalog({ reset: false });
}

function similarity(left, right) {
  const a = left.toLowerCase().replace(/[^a-z0-9]/g, "");
  const b = right.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (a === b) return 1;
  if (!a || !b) return 0;
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i++) {
    let diagonal = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const previous = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1));
      diagonal = previous;
    }
  }
  return 1 - row[b.length] / Math.max(a.length, b.length);
}

async function suggestTitles(query) {
  const token = ++state.suggestionToken;
  state.suggestionQuery = query;
  state.suggestionsLoading = true;
  state.suggestionsError = "";
  renderSuggestions();
  let candidates = [];
  if (state.apiKey) {
    try {
      const data = await tmdb("/search/multi", {
        query, page: 1, include_adult: false
      });
      candidates = titlesFromResponse(data)
        .filter((item) => ["movie", "tv"].includes(item.media_type))
        .map((item) => normalizeTitle(item, item.media_type || "movie"))
        .filter(matchesSearchFilters);
    } catch (error) {
      if (token === state.suggestionToken) state.suggestionsError = error.message;
    }
  }
  if (token !== state.suggestionToken) return;
  const cache = [...state.films, ...SAMPLE_FILMS, ...Object.values(state.savedFilms)];
  const rankedCache = cache.filter((film) => similarity(query, film.title) >= 0.42);
  const combined = [...candidates, ...rankedCache].reduce((unique, film) => {
    const key = titleKey(film);
    if (!unique.has(key)) unique.set(key, film);
    return unique;
  }, new Map());
  state.suggestions = [...combined.values()]
    .sort((a, b) => similarity(query, b.title) - similarity(query, a.title))
    .slice(0, 6);
  state.selectedSuggestion = -1;
  state.suggestionsLoading = false;
  renderSuggestions();
}

function renderSuggestions() {
  const query = document.querySelector("#search-input").value.trim();
  const rows = state.suggestions.map((film, index) => `
    <button class="suggestion-option" type="button" role="option" aria-selected="${index === state.selectedSuggestion}" data-suggestion="${index}">
      ${imageMarkup(film, "suggestion-poster")}
      <span class="suggestion-copy"><strong>${escapeHtml(film.title)}</strong><small>${film.year} · ${film.isTv ? "TV" : film.language} · ${film.rating ? `★ ${film.rating.toFixed(1)}` : "Not rated"}</small></span>
    </button>`).join("");
  const isCurrentQuery = query.length >= 2 && state.suggestionQuery === query;
  const message = isCurrentQuery && state.suggestionsLoading ? "Searching movies and shows…" :
    isCurrentQuery && state.suggestionsError ? escapeHtml(state.suggestionsError) :
      isCurrentQuery && !state.suggestions.length ? "No matching titles found. Try another spelling." : "";
  suggestionBox.innerHTML = `${rows}${message ? `<div class="suggestion-message" role="status">${message}</div>` : ""}`;
  const show = state.searchActive && isCurrentQuery &&
    (state.suggestions.length > 0 || state.suggestionsLoading || Boolean(state.suggestionsError));
  suggestionBox.hidden = !show;
  document.querySelector("#search-input").setAttribute("aria-expanded", String(show));
}

function chooseSuggestion(index) {
  const film = state.suggestions[index];
  if (!film) return;
  document.querySelector("#search-input").value = film.title;
  state.search = film.title;
  state.view = "discover";
  state.top250 = false;
  state.returnToSearch = true;
  state.searchMode = false;
  state.searchActive = false;
  closeSuggestions();
  openDetails(titleKey(film));
}

function closeSuggestions() {
  suggestionBox.hidden = true;
  document.querySelector("#search-input").setAttribute("aria-expanded", "false");
}

function showCatalogError(message) {
  state.error = message;
  render();
}

async function hydrateDetails(film) {
  if (!state.apiKey || !/^\d+$/.test(film.id)) return film;
  const type = film.isTv || film.mediaType === "tv" ? "tv" : "movie";
  const details = await tmdb(`/${type}/${encodeURIComponent(film.id)}`, {
    append_to_response: "credits,external_ids,watch/providers"
  });
  const providerResults = details["watch/providers"]?.results || {};
  const providers = providerResults.IN?.flatrate || providerResults.US?.flatrate || providerResults.IN?.buy || providerResults.US?.buy || [];
  const streamingProviders = providers
    .filter((provider) => provider.provider_name)
    .map((provider) => ({
      name: provider.provider_name,
      logoPath: provider.logo_path ? `https://image.tmdb.org/t/p/w92${provider.logo_path}` : "",
      url: ""
    }))
    .filter((provider, index, list) => list.findIndex((entry) => entry.name === provider.name) === index);
  const imdbId = details.external_ids?.imdb_id || film.imdbId || "";
  let awardError = "";
  let onlineAwards = [];
  if (imdbId) {
    try {
      onlineAwards = await loadWikidataAwards(imdbId);
    } catch (error) {
      awardError = error.message;
    }
  } else {
    awardError = "TMDB did not provide an IMDb ID for this title.";
  }
  const awards = mergeAwards(
    film.awards || [],
    findKnownAwards(film.title, film.year),
    onlineAwards
  );
  const credits = details.credits || {};
  const directors = (credits.crew || []).filter((person) => person.job === "Director").map((person) => person.name);
  const cast = (credits.cast || []).slice(0, 8).map((person) => person.name);
  const genres = details.genres?.map((genre) => genre.name) || film.genres;
  const geneIds = details.genres?.map((genre) => genre.id) || film.genreIds || [];
  return {
    ...film,
    plot: details.overview || film.plot,
    runtime: type === "tv"
      ? (details.episode_run_time?.[0] ? `${details.episode_run_time[0]} min` : film.runtime)
      : (details.runtime ? `${details.runtime} min` : film.runtime),
    upcoming: film.upcoming,
    genres,
    genreIds: geneIds,
    director: directors.slice(0, 3).join(", ") || film.director || "Not listed",
    cast: cast.join(", ") || "Not listed",
    streaming: streamingProviders.map((provider) => provider.name).join(", ") || "No providers listed for the selected region",
    streamingProviders,
    availabilityUrl: "",
    awards,
    awardError,
    similar: [...state.films, ...SAMPLE_FILMS]
      .filter((item) => titleKey(item) !== titleKey(film) && item.isTv === film.isTv &&
        (item.genreIds || []).some((id) => geneIds.includes(id)))
      .slice(0, 5)
  };
}

async function openDetails(key) {
  const film = state.films.find((item) => titleKey(item) === key) ||
    state.suggestions.find((item) => titleKey(item) === key) ||
    state.savedFilms[key] || SAMPLE_FILMS.find((item) => titleKey({ ...item, mediaType: "sample" }) === key);
  if (!film) return;
  state.returnToSearch = state.returnToSearch || state.searchMode || state.searchActive;
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  detailContent.innerHTML = `<div class="detail-loading">Loading title details…</div>`;
  try {
    const fullFilm = await hydrateDetails(film);
    state.activeDetailFilm = fullFilm;
    storeSavedFilm(fullFilm);
    renderDetails(fullFilm);
  } catch (error) {
    state.activeDetailFilm = film;
    renderDetails(film, error.message);
  }
}

function renderDetails(film, detailError = "") {
  const key = titleKey(film);
  const isTv = isTelevisionTitle(film);
  const saved = state.watchlist.has(key);
  const favorite = state.favorites.has(key);
  const similar = (film.similar || []).filter((item) => titleKey(item) !== key);
  similar.forEach(storeSavedFilm);
  detailContent.innerHTML = `<div class="detail-page">
    <div class="detail-main">
      <div class="detail-poster-column">
        ${imageMarkup(film, "detail-poster")}
        ${renderAwards(film)}
      </div>
      <div class="detail-content">
        <p class="eyebrow">${isTv ? "TELEVISION" : film.upcoming ? "COMING SOON" : `${escapeHtml(film.language)} CINEMA`}</p>
        <h2 class="detail-title">${escapeHtml(film.title)}</h2>
        <p class="detail-facts">${film.year} &nbsp;·&nbsp; ${escapeHtml(film.runtime)} &nbsp;·&nbsp; ${escapeHtml(film.language)}</p>
        ${isTv ? "" : renderBoxOfficeVerdict(film)}
        <div class="genre-chips">${film.genres.map((genre) => `<span class="genre-chip">${escapeHtml(genre)}</span>`).join("")}</div>
        <section class="detail-plot-section">
          <p class="credit-label">THE STORY</p>
          <p class="detail-plot">${escapeHtml(film.plot)}</p>
        </section>
        <div class="detail-credit-grid">
          <div><p class="credit-label">DIRECTED BY</p><p class="credit-value">${escapeHtml(film.director)}</p></div>
          <div><p class="credit-label">RATING</p><p class="credit-value">${film.rating ? `★ ${film.rating.toFixed(1)} / 10` : "Not yet rated"}</p></div>
          <div><p class="credit-label">STARRING</p><p class="credit-value">${escapeHtml(film.cast)}</p></div>
          <div><p class="credit-label">WATCH ON</p>${renderStreamingProviders(film)}</div>
          <div><p class="credit-label">PRODUCTION HOUSE</p><p class="credit-value">${escapeHtml(film.productionHouse || "Not listed")}</p></div>
          <div><p class="credit-label">MUSIC DIRECTOR</p><p class="credit-value">${escapeHtml(film.musicDirector || "Not listed")}</p></div>
        </div>
        ${detailError ? `<p class="settings-note">Some details could not load: ${escapeHtml(detailError)}</p>` : ""}
        <div class="detail-actions">
          <button data-dialog-action="watchlist" data-id="${escapeHtml(key)}">${saved ? "✓ In watchlist" : "♧ Add to watchlist"}</button>
          <button data-dialog-action="favorites" data-id="${escapeHtml(key)}">${favorite ? "♥ Favorited" : "♡ Add to favorites"}</button>
        </div>
      </div>
    </div>
    ${isTv ? renderSeasonGuide(film) : ""}
    <section class="similar-section" aria-labelledby="similar-title">
      <div class="similar-heading"><p class="eyebrow">KEEP EXPLORING</p><h3 id="similar-title">Similar ${film.isTv ? "shows" : "movies"}</h3></div>
      ${film.recommendationError ? `<p class="similar-message">Similar titles could not load: ${escapeHtml(film.recommendationError)}</p>` :
        similar.length ? `<div class="similar-grid">${similar.map((item) => `
          <button class="similar-card" type="button" data-similar="${escapeHtml(titleKey(item))}">
            ${imageMarkup(item, "similar-poster")}
            <span class="similar-copy"><strong>${escapeHtml(item.title)}</strong><small>${item.year} · ${item.rating ? `★ ${item.rating.toFixed(1)}` : "Not rated"}</small></span>
          </button>`).join("")}</div>` :
          `<p class="similar-message">${state.apiKey ? "Save a few TV shows with similar genres to see recommendations here." : "Connect the catalog to find similar titles."}</p>`}
    </section>
  </div>`;
}

function renderAwards(film) {
  const awards = mergeAwards(film.awards || [], findKnownAwards(film.title, film.year));
  return `<section class="detail-awards" aria-labelledby="awards-title">
    <h3 class="credit-label" id="awards-title">AWARDS &amp; RECOGNITION</h3>
    ${awards.length ? `<ul class="award-list" role="region" aria-label="Award wins" tabindex="0">${awards.map((award) => `
      <li class="award-item">
        <span class="award-icon" aria-hidden="true">✦</span>
        <span><strong>${escapeHtml(award.name)}${award.year ? ` · ${award.year}` : ""}</strong><small>${escapeHtml(award.distinction)}</small></span>
      </li>`).join("")}</ul>` : `<p class="awards-unavailable">${film.awardError
        ? `Awards could not be checked: ${escapeHtml(film.awardError)}`
        : state.apiKey
          ? "No Oscar, Indian National Film Award, or Emmy wins are currently listed in Wikidata for this title."
          : "Award details aren't available in the sample catalog. Connect TMDB to check Wikidata."}</p>`}
    ${state.apiKey ? `<p class="award-source-note">Awards are sourced from Wikidata; its records may be incomplete.</p>` : ""}
    ${awards.length && film.awardError
        ? `<p class="award-source-note" role="status">Some awards could not be checked: ${escapeHtml(film.awardError)}</p>`
        : ""}
  </section>`;
}

function renderSeasonGuide(film) {
  const seasons = film.seasons || [];
  if (!seasons.length) {
    return `<section class="season-guide" aria-labelledby="season-guide-title">
      <div class="similar-heading"><p class="eyebrow">EPISODE GUIDE</p><h3 id="season-guide-title">Seasons &amp; episodes</h3></div>
      <p class="season-guide-message">${state.apiKey
        ? "Season and episode information is not available for this show."
        : "Connect TMDB to load this show's seasons and episode guide."}</p>
    </section>`;
  }
  return `<section class="season-guide" aria-labelledby="season-guide-title">
    <div class="similar-heading"><p class="eyebrow">EPISODE GUIDE</p><h3 id="season-guide-title">Seasons &amp; episodes</h3></div>
    <div class="season-list">${seasons.map((season) => {
      const panelId = `season-${escapeHtml(film.id)}-${season.season_number}`;
      const airYear = season.air_date ? season.air_date.slice(0, 4) : "";
      return `<div class="season-item">
        <button class="season-toggle" type="button" aria-expanded="false" aria-controls="${panelId}"
          data-season-show="${escapeHtml(film.id)}" data-season-number="${season.season_number}">
          <span><strong>${escapeHtml(season.name || `Season ${season.season_number}`)}</strong>
          <small>${season.episode_count || 0} episodes${airYear ? ` · ${airYear}` : ""}</small></span>
          <span class="season-rating">${formatGuideRating(season.vote_average)}</span>
          <span class="season-chevron" aria-hidden="true">⌄</span>
        </button>
        <div class="episode-list" id="${panelId}" hidden></div>
      </div>`;
    }).join("")}</div>
  </section>`;
}

function formatGuideRating(rating) {
  const value = Number(rating);
  return Number.isFinite(value) && value > 0
    ? `<span aria-label="Rated ${value.toFixed(1)} out of 10">★ ${value.toFixed(1)}<small> / 10</small></span>`
    : `<span class="unrated">Not rated</span>`;
}

function loadSeasonEpisodes(button) {
  const panel = document.querySelector(`#${CSS.escape(`season-${button.dataset.seasonShow}-${button.dataset.seasonNumber}`)}`);
  if (!panel) return;
  if (!panel.hidden) {
    panel.hidden = true;
    button.setAttribute("aria-expanded", "false");
    return;
  }
  panel.hidden = false;
  button.setAttribute("aria-expanded", "true");
  panel.innerHTML = `<p class="episode-guide-message">Episode guides are not available through TMDB.</p>`;
}

function recommendationProfile() {
  const saved = [...allSavedIds()].map((key) => state.savedFilms[key]).filter(Boolean);
  const genreScores = new Map();
  saved.forEach((film) => (film.genreIds || []).forEach((id) => genreScores.set(id, (genreScores.get(id) || 0) + 1)));
  return { saved, genres: [...genreScores.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id]) => id) };
}

function renderRecommendations() {
  const section = document.querySelector("#recommendations");
  const container = document.querySelector("#recommendation-grid");
  const profile = recommendationProfile();
  if (state.searchActive || state.searchMode || state.view !== "discover" || !profile.saved.length || !profile.genres.length) {
    section.hidden = true;
    return;
  }
  section.hidden = false;
  document.querySelector("#recommendation-reason").textContent =
    `Based on ${profile.saved.length} saved ${profile.saved.length === 1 ? "title" : "titles"}, their genres, and ratings.`;
  const savedKeys = allSavedIds();
  const results = (state.apiKey ? state.films : SAMPLE_FILMS)
    .filter((film) => !savedKeys.has(titleKey(film)))
    .map((film) => ({
      ...film,
      score: (film.genreIds || []).filter((id) => profile.genres.includes(id)).length * 5 + film.rating
    }))
    .filter((film) => (film.genreIds || []).some((id) => profile.genres.includes(id)))
    .sort((a, b) => b.score - a.score).slice(0, 5);
  container.innerHTML = results.length
    ? results.map(makeCard).join("")
    : `<p class="recommendation-loading">Save another title to discover more like your favorites.</p>`;
}

function toggleSaved(collectionName, key) {
  const collection = state[collectionName];
  if (collection.has(key)) collection.delete(key);
  else {
    collection.add(key);
    const film = state.films.find((item) => titleKey(item) === key) ||
      state.suggestions.find((item) => titleKey(item) === key);
    if (film) storeSavedFilm(film);
  }
  localStorage.setItem(`moviematrix-${collectionName}`, JSON.stringify([...collection]));
  render();
  if (dialog.open) {
    const film = state.savedFilms[key] || state.films.find((item) => titleKey(item) === key);
    if (film) renderDetails(film);
  }
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function setIndustry(industry) {
  state.industry = industry;
  document.querySelectorAll(".industry-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.industry === industry));
  if (state.apiKey && state.view === "discover") {
    if (state.searchMode && state.search) loadCatalogSearch(state.search);
    else loadCatalog();
  }
  else render();
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", (event) => {
    event.preventDefault();
    state.view = button.dataset.view;
    document.querySelector("#menu-toggle").setAttribute("aria-expanded", "false");
    document.querySelector(".main-nav").classList.remove("open");
    render();
    if (state.view === "discover" && state.apiKey) loadCatalog();
    document.querySelector("#catalog").scrollIntoView({ behavior: "smooth" });
  }));
  document.querySelectorAll(".industry-tab").forEach((button) => button.addEventListener("click", () => setIndustry(button.dataset.industry)));
  document.querySelector("#genre-filter").addEventListener("change", (event) => {
    state.genre = event.target.value;
    if (state.apiKey && state.searchMode && state.search) loadCatalogSearch(state.search);
    else if (state.apiKey) loadCatalog();
    else render();
  });
  document.querySelector("#rating-filter").addEventListener("change", (event) => {
    state.rating = event.target.value;
    if (state.apiKey && state.searchMode && state.search) loadCatalogSearch(state.search);
    else if (state.apiKey) loadCatalog();
    else render();
  });
  const input = document.querySelector("#search-input");
  const activateSearch = () => {
    if (state.searchActive) return;
    state.searchActive = true;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const scheduleSearchActivation = () => {
    if (!state.searchActive) window.setTimeout(activateSearch, 0);
  };
  document.querySelector("#search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    state.search = query;
    state.view = "discover";
    state.searchMode = Boolean(state.search);
    state.searchActive = false;
    input.blur();
    closeSuggestions();
    if (state.apiKey) {
      state.industry = "all";
      loadCatalogSearch(state.search);
    } else render();
    document.querySelector("#catalog").scrollIntoView({ behavior: "smooth" });
  });
  input.addEventListener("input", (event) => {
    const query = event.target.value.trim();
    window.clearTimeout(state.searchTimer);
    state.suggestionToken += 1;
    state.search = query;
    state.suggestionQuery = query;
    state.suggestionsError = "";
    if (query.length < 2) {
      state.suggestions = [];
      state.suggestionsLoading = false;
      closeSuggestions();
      if (!query) {
        state.search = "";
        const hadSearch = state.searchMode;
        state.searchMode = false;
        if (state.apiKey && hadSearch) loadCatalog();
        else render();
      }
      return;
    }
    state.suggestions = [];
    state.suggestionsLoading = true;
    renderSuggestions();
    state.searchTimer = window.setTimeout(() => suggestTitles(query), 300);
  });
  input.addEventListener("focus", () => {
    scheduleSearchActivation();
    const query = input.value.trim();
    if (state.suggestionQuery !== query) {
      state.suggestions = [];
      state.suggestionQuery = query;
      state.suggestionsLoading = false;
    }
    closeSuggestions();
    if (query.length >= 2) {
      state.suggestionsLoading = true;
      renderSuggestions();
      state.searchTimer = window.setTimeout(() => suggestTitles(query), 180);
    }
  });
  input.addEventListener("click", scheduleSearchActivation);
  input.addEventListener("keydown", (event) => {
    if (suggestionBox.hidden) return;
    if (!state.suggestions.length && event.key !== "Escape") return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      state.selectedSuggestion = (state.selectedSuggestion + direction + state.suggestions.length) % state.suggestions.length;
      renderSuggestions();
    } else if (event.key === "Enter" && state.selectedSuggestion >= 0) {
      event.preventDefault();
      chooseSuggestion(state.selectedSuggestion);
    } else if (event.key === "Escape") closeSuggestions();
  });
  suggestionBox.addEventListener("click", (event) => {
    const option = event.target.closest("[data-suggestion]");
    if (option) chooseSuggestion(Number(option.dataset.suggestion));
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".hero-search")) {
      closeSuggestions();
      if (state.searchActive && !event.target.closest("#detail-dialog")) {
        state.searchActive = false;
        render();
      }
    }
  });
  document.querySelector("#load-more").addEventListener("click", loadMore);
  [grid, document.querySelector("#recommendation-grid")].forEach((container) => {
    container.addEventListener("click", (event) => {
      const favorite = event.target.closest("[data-favorite]");
      if (favorite) {
        event.stopPropagation();
        toggleSaved("favorites", favorite.dataset.favorite);
        return;
      }
      const card = event.target.closest(".movie-card");
      if (card) openDetails(card.dataset.id);
    });
    container.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && event.target.matches(".movie-card")) {
        event.preventDefault();
        openDetails(event.target.dataset.id);
      }
    });
  });
  detailContent.addEventListener("click", (event) => {
    const season = event.target.closest("[data-season-show]");
    if (season) {
      loadSeasonEpisodes(season);
      return;
    }
    const similar = event.target.closest("[data-similar]");
    if (similar) {
      openDetails(similar.dataset.similar);
      return;
    }
    const button = event.target.closest("[data-dialog-action]");
    if (button) toggleSaved(button.dataset.dialogAction, button.dataset.id);
  });
  document.querySelector("#dialog-close").addEventListener("click", () => {
    dialog.close();
  });
  dialog.addEventListener("close", () => {
    const restoreSearch = state.returnToSearch;
    state.returnToSearch = false;
    if (restoreSearch) state.searchActive = true;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (restoreSearch) {
      input.focus({ preventScroll: true });
      input.select();
    }
  });
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  document.querySelector("#clear-filters").addEventListener("click", () => {
    state.view = "discover"; state.genre = "all"; state.rating = "all"; state.search = "";
    state.searchMode = false;
    document.querySelector("#search-input").value = "";
    document.querySelector("#genre-filter").value = "all";
    document.querySelector("#rating-filter").value = "all";
    setIndustry("all");
  });
  document.querySelector("#menu-toggle").addEventListener("click", (event) => {
    const open = document.querySelector(".main-nav").classList.toggle("open");
    event.currentTarget.setAttribute("aria-expanded", String(open));
  });
}

function matchesSearchFilters(film) {
  const matchesIndustry = state.industry === "all" ||
    (state.industry === "animation" && isAnimationTitle(film)) ||
    (state.industry === "indian" && ["indian", "tollywood", "bollywood", "kollywood", "mollywood", "sandalwood"].includes(film.industry)) ||
    (state.industry === "upcoming" && film.upcoming) ||
    (INDUSTRIES[state.industry]?.language && LANGUAGE_CODES[film.language.toLowerCase()] === INDUSTRIES[state.industry].language) ||
    (state.industry === "indian" && film.originCountry === "IN") ||
    (state.industry === "hollywood" && film.originCountry === "US") ||
    (state.industry === "tv" && film.isTv) ||
    film.industry === state.industry;
  const matchesGenre = state.genre === "all" || (film.genreIds || []).includes(Number(state.genre));
  const matchesRating = state.rating === "all" || (film.rating > 0 && film.rating >= Number(state.rating));
  return matchesIndustry && matchesGenre && matchesRating;
}

async function loadCatalogSearch(query, { append = false } = {}) {
  if (!query) {
    state.searchMode = false;
    await loadCatalog();
    return;
  }
  state.loading = true;
  state.searchMode = true;
  if (!append) {
    state.films = [];
    state.page = 1;
  }
  state.error = "";
  render();
  const token = ++state.catalogToken;
  try {
    const response = await tmdb("/search/multi", {
      query,
      page: state.page,
      include_adult: false
    });
    if (token !== state.catalogToken) return;
    const newFilms = titlesFromResponse(response)
      .filter((item) => ["movie", "tv"].includes(item.media_type))
      .map((item) => normalizeTitle(item, item.media_type || "movie"))
      .filter(matchesSearchFilters);
    state.films = append ? [...state.films, ...newFilms] : newFilms;
    state.totalPages = Math.min(response.total_pages || 1, 500);
    state.totalResults = response.total_results || state.films.length;
  } catch (error) {
    if (token === state.catalogToken) state.error = error.message;
  } finally {
    if (token === state.catalogToken) {
      state.loading = false;
      render();
    }
  }
}

function init() {
  SAMPLE_FILMS.forEach((film) => {
    const credits = SAMPLE_CREDITS[film.id];
    film.productionHouse = film.productionHouse || credits?.productionHouse || "Not listed";
    film.musicDirector = film.musicDirector || credits?.musicDirector || "Not listed";
    film.mediaType = film.isTv ? "tv" : "movie";
    film.genreIds = genreIdsFor(film.genres);
    if (film.isTv) film.mediaType = "tv";
  });
  ["watchlist", "favorites"].forEach((collectionName) => {
    const collection = state[collectionName];
    [...collection].forEach((savedId) => {
      const sample = SAMPLE_FILMS.find((film) => film.id === savedId);
      if (!sample) return;
      collection.delete(savedId);
      collection.add(titleKey(sample));
      storeSavedFilm(sample);
    });
    localStorage.setItem(`moviematrix-${collectionName}`, JSON.stringify([...collection]));
  });
  const genreFilter = document.querySelector("#genre-filter");
  [...new Set(Object.values(GENRES))].sort().forEach((genre) => {
    const option = document.createElement("option");
    option.value = Object.entries(GENRES).find((entry) => entry[1] === genre)?.[0] || genre;
    option.textContent = genre;
    genreFilter.append(option);
  });
  bindEvents();
  render();
  if (state.apiKey) loadCatalog();
}

init();
