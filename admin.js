document.addEventListener('DOMContentLoaded', function() {

  // --- CONSTANTS & CONFIGURATION ---
  const PASSWORD = 'FNLHBC26';
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
  const defaultTeams = [
    { id: 1, name: 'Cooper College', sport: 'netball', division: 'u19' },
    { id: 2, name: 'Northriding College', sport: 'netball', division: 'u19' },
    { id: 3, name: 'Croyden House', sport: 'netball', division: 'u13' },
    { id: 4, name: 'HeronBridge College 2', sport: 'netball', division: 'u13' },
    { id: 5, name: 'HeronBridge College 2', sport: 'hockey', division: 'u13g' },
    { id: 6, name: 'Cooper College', sport: 'hockey', division: 'u13g' },
    { id: 7, name: 'HeronBridge College 1', sport: 'hockey', division: 'u13b' },
    { id: 8, name: 'Croyden House', sport: 'hockey', division: 'u13b' },
    { id: 9, name: 'HeronBridge Gold', sport: 'football', division: 'u11b' },
    { id: 10, name: 'Northriding College', sport: 'football', division: 'u11b' },
    { id: 11, name: 'HeronBridge White', sport: 'football', division: 'u11b' },
    { id: 12, name: 'Cooper College', sport: 'football', division: 'u11b' },
    { id: 13, name: 'Croyden House', sport: 'football', division: 'u11b' },
    { id: 14, name: 'HeronBridge Gold', sport: 'football', division: 'u13b' },
    { id: 15, name: 'HeronBridge White', sport: 'football', division: 'u13b' },
    { id: 16, name: 'Northriding College', sport: 'football', division: 'u13b' },
    { id: 17, name: 'Curro Roodeplaat', sport: 'football', division: 'u13b' },
    { id: 18, name: 'Cooper College', sport: 'football', division: 'u13b' },
    { id: 19, name: 'Croyden House', sport: 'football', division: 'u13b' },
    { id: 20, name: 'HeronBridge', sport: 'football', division: 'u19g' },
    { id: 21, name: 'Curro Victory Park', sport: 'football', division: 'u19g' },
    { id: 22, name: 'Curro Edenvale', sport: 'football', division: 'u19g' },
    { id: 23, name: 'Tentative', sport: 'football', division: 'u19g' },
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
  const defaultFixtures = [
    { id: 1001, sport: 'football', division: 'u19b', teamA: 'Northriding College', teamB: 'HeronBridge', date: '2026-06-05', time: '17:00', status: 'upcoming', type: 'Pool A', venue: 'Main Field' },
    { id: 1002, sport: 'football', division: 'u11b', teamA: 'HeronBridge Gold', teamB: 'Croyden House', date: '2026-06-05', time: '17:30', status: 'upcoming', type: 'Pool B', venue: 'Astro 2' },
    { id: 1003, sport: 'netball', division: 'u19', teamA: 'Cooper College', teamB: 'Northriding College', date: '2026-06-05', time: '17:45', status: 'upcoming', type: 'Pool A', venue: 'Court 1' },
    { id: 1004, sport: 'netball', division: 'u13', teamA: 'Croyden House', teamB: 'HeronBridge College 2', date: '2026-06-05', time: '18:00', status: 'upcoming', type: 'Pool C', venue: 'Court 3' },
    { id: 1005, sport: 'hockey', division: 'u13g', teamA: 'HeronBridge College 2', teamB: 'Cooper College', date: '2026-06-05', time: '18:15', status: 'upcoming', type: 'Pool A', venue: 'Astro 1' },
    { id: 1006, sport: 'hockey', division: 'u13b', teamA: 'HeronBridge College 1', teamB: 'Croyden House', date: '2026-06-05', time: '18:30', status: 'upcoming', type: 'Pool B', venue: 'Astro 1' },
  ];

  // --- STATE MANAGEMENT ---
  const state = {
    teams: [],
    fixtures: [],
    editingFixtureId: null,
  };

  // --- DOM ELEMENTS ---
  const loginForm = document.getElementById('admin-login-form');
  const fixtureList = document.getElementById('fixture-list');
  const addFixtureBtn = document.getElementById('add-fixture-btn');
  const fixtureModal = document.getElementById('fixture-modal');
  const modalForm = document.getElementById('modal-form');
  const modalTitle = document.getElementById('modal-title');
  const teamsListContainer = document.getElementById('teams-list-container');
  const addTeamForm = document.getElementById('add-team-form');

  // --- API LAYER ---
  async function loadData() {
    try {
      const response = await fetch('/api/get-data', { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch data from server');
      const data = await response.json();

      state.teams = (data && Array.isArray(data.teams)) ? data.teams : [...defaultTeams];
      const loadedFixtures = (data && Array.isArray(data.fixtures)) ? data.fixtures : [...defaultFixtures];

      // Ensure all fixtures have a unique ID for robust editing/deleting
      state.fixtures = loadedFixtures.map((fx, index) => ({
        ...fx,
        id: fx.id || Date.now() + index // Assign ID if missing
      }));

    } catch (e) {
      console.error("Could not load server data, using defaults.", e);
      state.teams = [...defaultTeams];
      state.fixtures = [...defaultFixtures].map((fx, index) => ({
        ...fx,
        id: fx.id || Date.now() + index
      }));
    }
  }

  async function saveData() {
    try {
      const response = await fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teams: state.teams, fixtures: state.fixtures, password: PASSWORD }),
      });

      if (!response.ok) {
        let errorMessage = `Server responded with status: ${response.status}.`;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.details || errorData.error || errorMessage;
          } catch (jsonError) {
            errorMessage += ' The server sent an invalid JSON error response.';
          }
        } else {
          const textError = await response.text();
          console.error("Server returned a non-JSON error response:", textError);
          errorMessage += ' This can happen if the server crashes. Check Vercel logs.';
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

  // --- UI & HELPER FUNCTIONS ---
  function showLoader(show) {
    let overlay = document.getElementById('loading-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'loading-overlay';
      overlay.innerHTML = `<div class="spinner"></div><p>Saving...</p>`;
      document.body.appendChild(overlay);
      const style = document.createElement('style');
      style.textContent = `
        #loading-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 1000; color: white; font-family: sans-serif; }
        .spinner { border: 4px solid rgba(255,255,255,0.2); border-left-color: #f5c518; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin-bottom: 16px; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `;
      document.head.appendChild(style);
    }
    overlay.style.display = show ? 'flex' : 'none';
  }

  async function performSave(updateAction) {
    const originalState = {
      teams: JSON.parse(JSON.stringify(state.teams)),
      fixtures: JSON.parse(JSON.stringify(state.fixtures)),
    };

    updateAction(); // Apply optimistic update to the state object

    showLoader(true);
    const success = await saveData();
    showLoader(false);

    if (!success) {
      // Revert state on failure
      state.teams = originalState.teams;
      state.fixtures = originalState.fixtures;
    }
    return success;
  }

  function renderFixtures() {
    fixtureList.innerHTML = '';
    state.fixtures.sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99'));

    state.fixtures.forEach(fx => {
      const safeSport = fx.sport || 'football';
      const sportName = safeSport.charAt(0).toUpperCase() + safeSport.slice(1);
      const divObj = sportDivisions[safeSport]?.find(d => d.v === fx.division);
      const divName = divObj ? divObj.t : (fx.division ? fx.division.toUpperCase() : 'UNKNOWN');

      const card = document.createElement('div');
      card.className = 'fixture-card';
      card.innerHTML = `
        <div class="fixture-header">
          <span><b>${fx.teamA || 'TBC'}</b></span>
          <span class="fixture-vs">vs</span>
          <span><b>${fx.teamB || 'TBC'}</b></span>
        </div>
        <div class="fixture-meta">
          <span class="fixture-status">${(fx.status || 'upcoming').toUpperCase()}</span>
          <span class="fixture-sport-div">${sportName} - ${divName}</span>
          <span class="fixture-type">${fx.type || 'Pool'}</span>
          <span class="fixture-time">${fx.time || 'TBD'}</span>
        </div>
        <div class="fixture-date">${formatDate(fx.date)} • ${fx.venue || 'TBC'}</div>
        <div class="fixture-actions">
          <button title="Edit" onclick="editFixture(${fx.id})"><i data-lucide="edit-2"></i></button>
          <button title="Delete" onclick="deleteFixture(${fx.id})"><i data-lucide="trash-2"></i></button>
        </div>
      `;
      fixtureList.appendChild(card);
    });
    if (window.lucide) lucide.createIcons();
  }

  function renderTeams() {
    teamsListContainer.innerHTML = '';
    Object.keys(sportDivisions).forEach(sport => {
      const sportTeams = state.teams.filter(t => t.sport === sport);
      if (sportTeams.length === 0) return;

      const sportName = sport.charAt(0).toUpperCase() + sport.slice(1);
      const groupDiv = document.createElement('div');
      groupDiv.className = 'team-group';
      groupDiv.innerHTML = `<h4>${sportName}</h4>`;

      const list = document.createElement('div');
      list.className = 'team-badge-list';

      sportTeams.sort((a, b) => a.name.localeCompare(b.name));

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
            <button onclick="deleteTeam(${t.id})" title="Delete Team"><i data-lucide="trash-2"></i></button>
          </div>
        `;
        list.appendChild(badge);
      });
      groupDiv.appendChild(list);
      teamsListContainer.appendChild(groupDiv);
    });
    if (window.lucide) lucide.createIcons();
  }

  function formatDate(dateStr) {
    if (!dateStr) return 'Date TBC';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  window.updateDivisions = function(sportSelectId, divSelectId, selectedVal) {
    const sport = document.getElementById(sportSelectId).value;
    const divSelect = document.getElementById(divSelectId);
    divSelect.innerHTML = '';
    if (sportDivisions[sport]) {
      sportDivisions[sport].forEach(d => {
        divSelect.innerHTML += `<option value="${d.v}">${d.t}</option>`;
      });
    }
    if (selectedVal) divSelect.value = selectedVal;
  };

  window.updateModalTeams = function(selectedA, selectedB) {
    const sport = document.getElementById('modal-sport').value;
    const div = document.getElementById('modal-division').value;
    const validTeams = state.teams.filter(t => t.sport === sport && t.division === div);

    let options = '<option value="" disabled selected>Select a Team...</option>';
    validTeams.forEach(t => {
      options += `<option value="${t.name}">${t.name}</option>`;
    });

    const selA = document.getElementById('modal-teamA');
    const selB = document.getElementById('modal-teamB');
    selA.innerHTML = options;
    selB.innerHTML = options;

    if (selectedA) selA.value = selectedA;
    if (selectedB) selB.value = selectedB;
  };

  window.closeModal = function() {
    fixtureModal.style.display = 'none';
  };

  // --- CORE LOGIC / EVENT HANDLERS ---

  window.editFixture = function(id) {
    const fx = state.fixtures.find(f => f.id === id);
    if (!fx) return console.error("Fixture not found for editing:", id);

    state.editingFixtureId = id;
    document.getElementById('modal-sport').value = fx.sport;
    updateDivisions('modal-sport', 'modal-division', fx.division);
    updateModalTeams(fx.teamA, fx.teamB);

    document.getElementById('modal-date').value = fx.date;
    document.getElementById('modal-time').value = fx.time;
    document.getElementById('modal-status').value = fx.status.toLowerCase();
    document.getElementById('modal-type').value = fx.type;
    document.getElementById('modal-venue').value = fx.venue || '';
    modalTitle.textContent = 'Edit Fixture';
    fixtureModal.style.display = 'flex';
  };

  window.deleteFixture = async function(id) {
    if (confirm('Are you sure you want to delete this fixture?')) {
      const success = await performSave(() => {
        state.fixtures = state.fixtures.filter(f => f.id !== id);
      });
      if (success) renderFixtures();
    }
  };

  addFixtureBtn.onclick = function() {
    state.editingFixtureId = null;
    modalForm.reset();

    document.getElementById('modal-sport').value = 'football';
    updateDivisions('modal-sport', 'modal-division');
    updateModalTeams();

    document.getElementById('modal-date').value = '2026-06-05';
    document.getElementById('modal-status').value = 'upcoming';
    modalTitle.textContent = 'Add Fixture';
    fixtureModal.style.display = 'flex';
  };

  modalForm.onsubmit = async function(e) {
    e.preventDefault();
    const fixtureData = {
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

    if (fixtureData.teamA === fixtureData.teamB && fixtureData.teamA !== '') {
      alert("Team A and Team B cannot be the same team!");
      return;
    }

    const isEditing = state.editingFixtureId !== null;

    const success = await performSave(() => {
      if (isEditing) {
        const index = state.fixtures.findIndex(f => f.id === state.editingFixtureId);
        if (index !== -1) {
          state.fixtures[index] = { ...fixtureData, id: state.editingFixtureId };
        }
      } else {
        state.fixtures.push({ ...fixtureData, id: Date.now() });
      }
    });

    if (success) {
      renderFixtures();
      closeModal();
    }
  };

  window.deleteTeam = async function(id) {
    if (confirm("Are you sure you want to remove this team? This cannot be undone.")) {
      const success = await performSave(() => {
        state.teams = state.teams.filter(t => t.id !== id);
      });
      if (success) renderTeams();
    }
  };

  addTeamForm.onsubmit = async function(e) {
    e.preventDefault();
    const newTeam = {
      id: Date.now(),
      name: document.getElementById('team-name').value,
      sport: document.getElementById('team-sport').value,
      division: document.getElementById('team-division').value,
    };

    if (!newTeam.name.trim()) {
      alert("Team name cannot be empty.");
      return;
    }

    const success = await performSave(() => {
      state.teams.push(newTeam);
    });

    if (success) {
      document.getElementById('team-name').value = '';
      renderTeams();
    }
  };

  window.switchTab = function(tab) {
    // Deactivate all tab buttons if they exist
    const tabFixturesBtn = document.getElementById('tab-fixtures');
    if (tabFixturesBtn) tabFixturesBtn.classList.remove('active');
    const tabTeamsBtn = document.getElementById('tab-teams');
    if (tabTeamsBtn) tabTeamsBtn.classList.remove('active');

    // Hide all editor panels
    const fixtureEditor = document.getElementById('fixture-editor');
    if (fixtureEditor) fixtureEditor.style.display = 'none';
    const teamsEditor = document.getElementById('teams-editor');
    if (teamsEditor) teamsEditor.style.display = 'none';

    // Activate the selected tab button if it exists
    const activeTabBtn = document.getElementById(`tab-${tab}`);
    if (activeTabBtn) activeTabBtn.classList.add('active');

    // Show the selected editor panel and render its content
    if (tab === 'teams' && teamsEditor) {
      teamsEditor.style.display = 'block';
      renderTeams();
    } else if (tab === 'fixtures' && fixtureEditor) {
      fixtureEditor.style.display = 'block';
      renderFixtures();
    }
  };

  loginForm.onsubmit = async function(e) {
    e.preventDefault();
    const pass = document.getElementById('admin-password').value;
    if (pass === PASSWORD) {
      document.getElementById('admin-login').style.display = 'none';
      document.getElementById('admin-content').style.display = 'block';
      await loadData();
      // This will show the fixture editor and render the loaded fixtures.
      switchTab('fixtures');
    } else {
      alert('Incorrect password');
    }
  };

  // --- INITIALIZATION ---
  function init() {
    // Populate static dropdowns
    const sportOptions = Object.keys(sportDivisions).map(sport =>
      `<option value="${sport}">${sport.charAt(0).toUpperCase() + sport.slice(1)}</option>`
    ).join('');
    document.getElementById('modal-sport').innerHTML = sportOptions;
    document.getElementById('team-sport').innerHTML = sportOptions;

    // Set initial division dropdowns
    updateDivisions('modal-sport', 'modal-division');
    updateDivisions('team-sport', 'team-division');

    // Light/Dark mode
    const modeBtn = document.getElementById('mode-toggle');
    const FNL_THEME_KEY = 'fnl_theme';
    const applyTheme = () => {
      const isLight = localStorage.getItem(FNL_THEME_KEY) === 'light';
      document.body.classList.toggle('light-mode', isLight);
      modeBtn.innerHTML = isLight ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
      if (window.lucide) lucide.createIcons();
    };
    modeBtn.onclick = () => {
      const isLight = document.body.classList.toggle('light-mode');
      localStorage.setItem(FNL_THEME_KEY, isLight ? 'light' : 'dark');
      applyTheme();
    };
    applyTheme();
  }

  init();
});
