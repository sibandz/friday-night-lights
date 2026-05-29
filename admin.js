document.addEventListener('DOMContentLoaded', function() {
  // Admin login and fixture management for FNL
  const loginForm = document.getElementById('admin-login-form');
  const fixtureList = document.getElementById('fixture-list');
  const addBtn = document.getElementById('add-fixture-btn');

  const modal = document.getElementById('fixture-modal');
  const modalForm = document.getElementById('modal-form');
  const modalTitle = document.getElementById('modal-title');
  let editingIndex = -1;

  const PASSWORD = 'FNLHBC26';

  // Map of all available sports and divisions
  const sportDivisions = {
    football: [
      {v: 'u11b', t: 'Boys U11'}, {v: 'u13b', t: 'Boys U13'}, 
      {v: 'u19b', t: 'Boys U19'}, {v: 'u19g', t: 'Girls U19'}
    ],
    netball: [
      {v: 'u11', t: 'Girls U11'}, {v: 'u13', t: 'Girls U13'}, {v: 'u19', t: 'Girls U19'}
    ],
    hockey: [
      {v: 'u13g', t: 'Girls U13'}, {v: 'u13b', t: 'Boys U13'}
    ]
  };

  const sportOptions = `
    <option value="football">Football</option>
    <option value="netball">Netball</option>
    <option value="hockey">Hockey</option>
  `;

  // Teams Data
  let defaultTeams = [
    // Netball
    { id: 1, name: 'Cooper College', sport: 'netball', division: 'u19' },
    { id: 2, name: 'Northriding College', sport: 'netball', division: 'u19' },
    { id: 3, name: 'Croyden House', sport: 'netball', division: 'u13' },
    { id: 4, name: 'HeronBridge College 2', sport: 'netball', division: 'u13' },
    // Hockey
    { id: 5, name: 'HeronBridge College 2', sport: 'hockey', division: 'u13g' },
    { id: 6, name: 'Cooper College', sport: 'hockey', division: 'u13g' },
    { id: 7, name: 'HeronBridge College 1', sport: 'hockey', division: 'u13b' },
    { id: 8, name: 'Croyden House', sport: 'hockey', division: 'u13b' },
    // Football U11 Boys
    { id: 9, name: 'HeronBridge Gold', sport: 'football', division: 'u11b' },
    { id: 10, name: 'Northriding College', sport: 'football', division: 'u11b' },
    { id: 11, name: 'HeronBridge White', sport: 'football', division: 'u11b' },
    { id: 12, name: 'Cooper College', sport: 'football', division: 'u11b' },
    { id: 13, name: 'Croyden House', sport: 'football', division: 'u11b' },
    // Football U13 Boys
    { id: 14, name: 'HeronBridge Gold', sport: 'football', division: 'u13b' },
    { id: 15, name: 'HeronBridge White', sport: 'football', division: 'u13b' },
    { id: 16, name: 'Northriding College', sport: 'football', division: 'u13b' },
    { id: 17, name: 'Curro Roodeplaat', sport: 'football', division: 'u13b' },
    { id: 18, name: 'Cooper College', sport: 'football', division: 'u13b' },
    { id: 19, name: 'Croyden House', sport: 'football', division: 'u13b' },
    // Football U19 Girls
    { id: 20, name: 'HeronBridge', sport: 'football', division: 'u19g' },
    { id: 21, name: 'Curro Victory Park', sport: 'football', division: 'u19g' },
    { id: 22, name: 'Curro Edenvale', sport: 'football', division: 'u19g' },
    { id: 23, name: 'Tentative', sport: 'football', division: 'u19g' },
    // Football U19 Boys
    { id: 24, name: 'HeronBridge', sport: 'football', division: 'u19b' },
    { id: 25, name: 'Curro Victory Park', sport: 'football', division: 'u19b' },
    { id: 26, name: 'Northriding College', sport: 'football', division: 'u19b' },
    { id: 27, name: 'Croyden House', sport: 'football', division: 'u19b' },
    { id: 28, name: 'St Dustans', sport: 'football', division: 'u19b' },
    { id: 29, name: 'Curro Midrand Yellow', sport: 'football', division: 'u19b' },
    { id: 30, name: 'Curro Midrand Grey', sport: 'football', division: 'u19b' },
    { id: 31, name: 'Curro Midrand Green', sport: 'football', division: 'u19b' },
    { id: 32, name: 'Curro Midrand Blue', sport: 'football', division: 'u19b' },
  ];

  let defaultFixtures = [
    { sport: 'football', division: 'u19b', teamA: 'Northriding College', teamB: 'HeronBridge', date: '2026-06-05', time: '17:00', status: 'upcoming', type: 'Pool A', venue: 'Main Field' },
    { sport: 'football', division: 'u11b', teamA: 'HeronBridge Gold', teamB: 'Croyden House', date: '2026-06-05', time: '17:30', status: 'upcoming', type: 'Pool B', venue: 'Astro 2' },
    { sport: 'netball', division: 'u19', teamA: 'Cooper College', teamB: 'Northriding College', date: '2026-06-05', time: '17:45', status: 'upcoming', type: 'Pool A', venue: 'Court 1' },
    { sport: 'netball', division: 'u13', teamA: 'Croyden House', teamB: 'HeronBridge College 2', date: '2026-06-05', time: '18:00', status: 'upcoming', type: 'Pool C', venue: 'Court 3' },
    { sport: 'hockey', division: 'u13g', teamA: 'HeronBridge College 2', teamB: 'Cooper College', date: '2026-06-05', time: '18:15', status: 'upcoming', type: 'Pool A', venue: 'Astro 1' },
    { sport: 'hockey', division: 'u13b', teamA: 'HeronBridge College 1', teamB: 'Croyden House', date: '2026-06-05', time: '18:30', status: 'upcoming', type: 'Pool B', venue: 'Astro 1' },
  ];

  let teams = [];
  let fixtures = [];

  async function loadData() {
    try {
      const response = await fetch('/api/get-data');
      if (!response.ok) throw new Error('Failed to fetch data from server');
      const data = await response.json();
      // The original check was problematic: it would revert to default data
      // if the user saved an empty list of teams or fixtures.
      // This new check correctly handles empty arrays from the server.
      teams = data && Array.isArray(data.teams) ? data.teams : defaultTeams;
      fixtures = data && Array.isArray(data.fixtures) ? data.fixtures : defaultFixtures;
    } catch (e) {
      console.error("Could not load server data, using defaults.", e);
      teams = defaultTeams;
      fixtures = defaultFixtures;
    }
  }

  async function saveData() { // Returns true on success, false on failure
    try {
      const response = await fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teams, fixtures, password: PASSWORD }),
      });

      if (!response.ok) {
        let errorMessage = `Server responded with status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.details || errorData.error || errorMessage;
        } catch (jsonError) {
          // The response was not JSON. It might be an HTML error page.
          console.error("Could not parse error response as JSON.", jsonError);
        }
        throw new Error(errorMessage);
      }
      return true;
    } catch (e) {
      console.error("Failed to save data to server", e);
      alert(`Error: Could not save data. ${e.message}. Your changes have NOT been saved.`);
      return false;
    }
  }

  // Initialization setup
  function initSetup() {
    document.getElementById('modal-sport').innerHTML = sportOptions;
    document.getElementById('team-sport').innerHTML = sportOptions;
    window.updateDivisions('modal-sport', 'modal-division');
    window.updateDivisions('team-sport', 'team-division');
  }

  window.updateDivisions = function(sportSelectId, divSelectId, selectedVal) {
    const sport = document.getElementById(sportSelectId).value;
    const divSelect = document.getElementById(divSelectId);
    divSelect.innerHTML = '';
    if(sportDivisions[sport]) {
      sportDivisions[sport].forEach(d => {
        divSelect.innerHTML += `<option value="${d.v}">${d.t}</option>`;
      });
    }
    if(selectedVal) divSelect.value = selectedVal;
  };

  window.updateModalTeams = function(selectedA, selectedB) {
    const sport = document.getElementById('modal-sport').value;
    const div = document.getElementById('modal-division').value;
    const validTeams = teams.filter(t => t.sport === sport && t.division === div);
    
    let options = '<option value="" disabled selected>Select a Team...</option>';
    validTeams.forEach(t => {
      options += `<option value="${t.name}">${t.name}</option>`;
    });
    
    const selA = document.getElementById('modal-teamA');
    const selB = document.getElementById('modal-teamB');
    selA.innerHTML = options;
    selB.innerHTML = options;

    if(selectedA) selA.value = selectedA;
    if(selectedB) selB.value = selectedB;
  };

  function renderFixtures() {
    fixtureList.innerHTML = '';
    fixtures.forEach((fx, i) => {
      // Add safety fallbacks to prevent crashes if a fixture was saved poorly
      const safeSport = fx.sport || 'football';
      const sportName = safeSport.charAt(0).toUpperCase() + safeSport.slice(1);
      const divObj = sportDivisions[safeSport]?.find(d => d.v === fx.division);
      const divName = divObj ? divObj.t : (fx.division ? fx.division.toUpperCase() : 'UNKNOWN');

      const card = document.createElement('div');
      card.className = 'fixture-card';
      card.innerHTML = `
        <div class="fixture-header">
          <span><b>${fx.teamA}</b></span>
          <span class="fixture-vs">vs</span>
          <span><b>${fx.teamB}</b></span>
        </div>
        <div class="fixture-meta">
          <span class="fixture-status">${fx.status.toUpperCase()}</span>
          <span style="background: rgba(255,255,255,0.06); border-radius: 4px; padding: 2px 10px; font-weight: bold; color: var(--white);">${sportName} - ${divName}</span>
          <span class="fixture-type">${fx.type}</span>
          <span class="fixture-time">${fx.time}</span>
        </div>
        <div class="fixture-date">${formatDate(fx.date)}</div>
        <div class="fixture-actions">
          <button title="Edit" onclick="editFixture(${i})">Edit</button>
          <button title="Delete" onclick="deleteFixture(${i})">Delete</button>
        </div>
      `;
      fixtureList.appendChild(card);
    });
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  window.editFixture = function(idx) {
    editingIndex = idx;
    const fx = fixtures[idx];
    document.getElementById('modal-sport').value = fx.sport;
    updateDivisions('modal-sport', 'modal-division', fx.division);
    updateModalTeams(fx.teamA, fx.teamB);

    document.getElementById('modal-date').value = fx.date;
    document.getElementById('modal-time').value = fx.time;
    document.getElementById('modal-status').value = fx.status.toLowerCase();
    document.getElementById('modal-type').value = fx.type;
    document.getElementById('modal-venue').value = fx.venue || '';
    modalTitle.textContent = 'Edit Fixture';
    modal.style.display = 'flex';
  };

  window.deleteFixture = async function(idx) {
    if (confirm('Delete this fixture?')) {
      const originalFixtures = [...fixtures];
      fixtures.splice(idx, 1); // Temporarily update for the save call

      if (await saveData()) {
        renderFixtures(); // On success, re-render the UI
      } else {
        fixtures = originalFixtures; // On failure, revert the change
      }
    }
  };

  addBtn.onclick = function() {
    editingIndex = -1;
    modalForm.reset();
    
    document.getElementById('modal-sport').value = 'football';
    updateDivisions('modal-sport', 'modal-division');
    updateModalTeams();

    document.getElementById('modal-date').value = '2026-06-05';
    document.getElementById('modal-status').value = 'upcoming';
    modalTitle.textContent = 'Add Fixture';
    modal.style.display = 'flex';
  };

  window.closeModal = function() {
    modal.style.display = 'none';
  };

  modalForm.onsubmit = async function(e) { // Refactored for pessimistic UI update
    e.preventDefault();
    const newFixture = {
      sport: document.getElementById('modal-sport').value,
      division: document.getElementById('modal-division').value,
      teamA: document.getElementById('modal-teamA').value,
      teamB: document.getElementById('modal-teamB').value,
      date: document.getElementById('modal-date').value,
      time: document.getElementById('modal-time').value || 'TBD',
      status: document.getElementById('modal-status').value,
      type: document.getElementById('modal-type').value,
      venue: document.getElementById('modal-venue').value || 'TBC'
    };

    if(newFixture.teamA === newFixture.teamB) {
      alert("Team A and Team B cannot be the same team!");
      return;
    }

    const originalFixtures = [...fixtures];
    let updatedFixtures;

    if (editingIndex === -1) {
      updatedFixtures = [...fixtures, newFixture];
    } else {
      updatedFixtures = [...fixtures];
      updatedFixtures[editingIndex] = newFixture;
    }

    fixtures = updatedFixtures; // Temporarily update global state for saveData
    if (await saveData()) {
      renderFixtures();
      closeModal();
    } else {
      fixtures = originalFixtures; // Revert on failure
    }
  };

  /* ── TEAMS MANAGEMENT ───────────────────────────────────── */
  function renderTeams() {
    const container = document.getElementById('teams-list-container');
    container.innerHTML = '';
    
    Object.keys(sportDivisions).forEach(sport => {
      const sportTeams = teams.filter(t => t.sport === sport);
      if(sportTeams.length === 0) return;
      
      const sportName = sport.charAt(0).toUpperCase() + sport.slice(1);
      const groupDiv = document.createElement('div');
      groupDiv.style.marginBottom = '32px';
      groupDiv.innerHTML = `<h4 style="color:var(--gold); font-family:var(--font-head); text-transform:uppercase; margin-bottom: 16px; letter-spacing:0.05em; font-size:1.1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">${sportName}</h4>`;
      
      const list = document.createElement('div');
      list.style.display = 'grid';
      list.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
      list.style.gap = '12px';
      
      sportTeams.forEach(t => {
        const divName = sportDivisions[sport].find(d => d.v === t.division)?.t || t.division;
        const badge = document.createElement('div');
        badge.className = 'team-badge';
        badge.innerHTML = `
          <div>
            <strong>${t.name}</strong>
            <span class="team-badge-meta">${divName}</span>
          </div>
          <div class="team-badge-actions">
            <button onclick="deleteTeam(${t.id})" title="Delete Team">🗑️</button>
          </div>
        `;
        list.appendChild(badge);
      });
      groupDiv.appendChild(list);
      container.appendChild(groupDiv);
    });
  }

  window.deleteTeam = async function(id) {
    if(confirm("Are you sure you want to remove this team?")) {
      const originalTeams = [...teams];
      teams = teams.filter(t => t.id !== id); // Temporarily update for save

      if (await saveData()) {
        renderTeams(); // On success, re-render
      } else {
        teams = originalTeams; // On failure, revert
      }
    }
  };

  document.getElementById('add-team-form').onsubmit = async function(e) {
    e.preventDefault();
    const newTeam = {
      id: Date.now(),
      name: document.getElementById('team-name').value,
      sport: document.getElementById('team-sport').value,
      division: document.getElementById('team-division').value,
    };
    const originalTeams = [...teams];
    teams.push(newTeam); // Temporarily update for save

    if (await saveData()) {
      document.getElementById('team-name').value = '';
      renderTeams();
    } else {
      teams = originalTeams; // On failure, revert
    }
  };

  /* ── NAVIGATION / AUTH ──────────────────────────────────── */
  window.switchTab = function(tab) {
    document.getElementById('tab-fixtures').classList.remove('active');
    document.getElementById('tab-teams').classList.remove('active');
    document.getElementById('fixture-editor').style.display = 'none';
    document.getElementById('teams-editor').style.display = 'none';
    
    document.getElementById(`tab-${tab}`).classList.add('active');
    document.getElementById(`${tab}-editor`).style.display = 'block';
    
    if(tab === 'teams') renderTeams();
  };

  // Light/Dark mode toggle
  (function() {
    const modeBtn = document.getElementById('mode-toggle');
    const FNL_THEME_KEY = 'fnl_theme';

    const applyTheme = () => {
      if (localStorage.getItem(FNL_THEME_KEY) === 'light') {
        document.body.classList.add('light-mode');
        modeBtn.innerHTML = '<i data-lucide="sun"></i>';
      } else {
        document.body.classList.remove('light-mode');
        modeBtn.innerHTML = '<i data-lucide="moon"></i>';
      }
      lucide.createIcons();
    };

    modeBtn.onclick = function() {
      const isLight = document.body.classList.toggle('light-mode');
      localStorage.setItem(FNL_THEME_KEY, isLight ? 'light' : 'dark');
      applyTheme();
    };

    applyTheme(); // Apply theme on initial load
  })();

  loginForm.onsubmit = async function(e) {
    e.preventDefault();
    const pass = document.getElementById('admin-password').value;
    if (pass === PASSWORD) {
      document.getElementById('admin-login').style.display = 'none';
      document.getElementById('admin-tabs').style.display = 'flex';
      document.getElementById('fixture-editor').style.display = 'block';
      await loadData();
      renderFixtures();
    } else {
      alert('Incorrect password');
    }
  };

  // Initial setup call
  initSetup();
});
