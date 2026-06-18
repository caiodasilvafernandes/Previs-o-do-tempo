const apiKey = "bc5a506da074a84b2ca6c5425136744f";
var lat, lon;

let ACTIVE_THEME = 'sunny';

let currentUnit = 'C';
let data = { ...MOCK_DATA };

const THEMES = {
  sunny: {
    bgFrom:  '#f97316',  
    bgTo:    '#fbbf24',  
    accent:  '#fef08a',
  },
  cloudy: {
    bgFrom:  '#64748b', 
    bgTo:    '#334155',
    accent:  '#cbd5e1',
  },
  rainy: {
    bgFrom:  '#1e40af',
    bgTo:    '#1e3a5f',
    accent:  '#93c5fd',
  },
  stormy: {
    bgFrom:  '#1e1b4b', 
    bgTo:    '#111827',
    accent:  '#a78bfa',
  },
  snowy: {
    bgFrom:  '#bfdbfe',
    bgTo:    '#e0f2fe',
    accent:  '#ffffff',
  },
  night: {
    bgFrom:  '#0f172a',
    bgTo:    '#020617',
    accent:  '#818cf8',
  },
  dawn: {
    bgFrom:  '#7c3aed',
    bgTo:    '#f97316',
    accent:  '#fde68a',
  },
};

const MOCK_DATA = {
  city:          'São Paulo',
  country:       'BR',
  condition:     'Ensolarado',
  icon:          '☀️',
  temp:          28,
  feelsLike:     30,
  humidity:      65,
  uvIndex:       6,
  windSpeed:     14,
  visibility:    10,
  pressure:      1013,
  precipitation: 0,
  forecast: [
    { day: 'Seg', icon: '☀️',  hi: 29, lo: 18 },
    { day: 'Ter', icon: '⛅',  hi: 25, lo: 17 },
    { day: 'Qua', icon: '🌧️', hi: 22, lo: 16 },
    { day: 'Qui', icon: '⛈️', hi: 20, lo: 15 },
    { day: 'Sex', icon: '🌤️', hi: 26, lo: 17 },
  ],
  hourly: [
    { time: '06h', icon: '🌅', temp: 20 },
    { time: '08h', icon: '🌤️', temp: 22 },
    { time: '10h', icon: '☀️',  temp: 25 },
    { time: '12h', icon: '☀️',  temp: 28 },
    { time: '14h', icon: '☀️',  temp: 29 },
    { time: '16h', icon: '⛅',  temp: 27 },
    { time: '18h', icon: '🌥️', temp: 24 },
    { time: '20h', icon: '🌙',  temp: 21 },
    { time: '22h', icon: '🌙',  temp: 19 },
    { time: '00h', icon: '🌙',  temp: 18 },
  ],
};

/* document.addEventListener("DOMContentLoaded", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(setPosition, errorSetPosition);
    }

    applyTheme(ACTIVE_THEME);
    updateDateTime();
    render();
});

async function setData(url){
    var data = await fetch(url);
    console.log(data);
}

function setPosition(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    setData(url);
}

function errorSetPosition() {
  console.log("Não foi possível obter a sua localização.");
}
 */
function toF(c) { return Math.round(c * 9 / 5 + 32); }

function displayTemp(c) {
  return currentUnit === 'C' ? c : toF(c);
}

function applyTheme(themeName) {
  const theme = THEMES[themeName] ?? THEMES.sunny;
  const root  = document.documentElement;
  root.style.setProperty('--bg-from', theme.bgFrom);
  root.style.setProperty('--bg-to',   theme.bgTo);
  root.style.setProperty('--accent',  theme.accent);
}

function updateDateTime() {
  const now = new Date();
  const opts = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
  document.getElementById('dateTime').textContent = now.toLocaleDateString('pt-BR', opts);
}

function renderCurrent() {
  document.getElementById('cityName').textContent    = data.city;
  document.getElementById('countryName').textContent = data.country;
  document.getElementById('condition').textContent   = data.condition;
  document.getElementById('weatherIcon').textContent = data.icon;
  document.getElementById('temperature').textContent = displayTemp(data.temp);
  document.getElementById('feelsLike').textContent   = displayTemp(data.feelsLike);
  document.getElementById('humidity').textContent    = `${data.humidity}%`;
  document.getElementById('uvIndex').textContent     = data.uvIndex;
  document.getElementById('windSpeed').textContent   = `${data.windSpeed} km/h`;
  document.getElementById('visibility').textContent  = `${data.visibility} km`;
  document.getElementById('pressure').textContent    = `${data.pressure} hPa`;
  document.getElementById('precipitation').textContent = `${data.precipitation} mm`;

  const unitLabel = `°${currentUnit}`;
  document.getElementById('unitLabel').textContent = unitLabel;
  document.getElementById('unitSmall').textContent = unitLabel;
}

function renderForecast() {
  const container = document.getElementById('forecastCards');
  container.innerHTML = data.forecast.map(d => `
    <div class="forecast-card">
      <div class="forecast-day">${d.day}</div>
      <div class="forecast-icon">${d.icon}</div>
      <div class="forecast-hi">${displayTemp(d.hi)}°</div>
      <div class="forecast-lo">${displayTemp(d.lo)}°</div>
    </div>
  `).join('');
}

function renderHourly() {
  const container = document.getElementById('hourlyScroll');
  container.innerHTML = data.hourly.map(h => `
    <div class="hourly-card">
      <div class="hourly-time">${h.time}</div>
      <div class="hourly-icon">${h.icon}</div>
      <div class="hourly-temp">${displayTemp(h.temp)}°</div>
    </div>
  `).join('');
}

function render() {
  renderCurrent();
  renderForecast();
  renderHourly();
}

function setUnit(unit) {
  currentUnit = unit;
  document.getElementById('btnC').classList.toggle('active', unit === 'C');
  document.getElementById('btnF').classList.toggle('active', unit === 'F');
  render();
}

// ── Busca de cidade (mock — conecte a uma API aqui) ───────────
function searchCity(city) {
  if (!city.trim()) return;
  // Exemplo: troque por fetch(`https://api.openweathermap.org/...`)
  console.log(`Buscando: ${city}`);
  // Por enquanto apenas atualiza o nome
  data.city = city;
  render();
}

document.getElementById('searchBtn').addEventListener('click', () => {
  searchCity(document.getElementById('cityInput').value);
});

document.getElementById('cityInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') searchCity(e.target.value);
});
