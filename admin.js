document.addEventListener('DOMContentLoaded', function() {

  // --- CONSTANTS & CONFIGURATION ---
  const PASSWORD = 'INTERHOUSE2025';
  const sportDivisions = {
    football: [
      {v: 'u7', t: 'U7'}, {v: 'u8', t: 'U8'}, {v: 'u9', t: 'U9'},
      {v: 'u10', t: 'U10'}, {v: 'u11', t: 'U11'}, {v: 'u12', t: 'U12'},
      {v: 'u13', t: 'U13'}, {v: 'all-star', t: 'U13 All-Stars vs Coaches'}
    ],
    netball: [
      {v: 'u7', t: 'U7'}, {v: 'u8', t: 'U8'}, {v: 'u9', t: 'U9'},
      {v: 'u10', t: 'U10'}, {v: 'u11', t: 'U11'}, {v: 'u12', t: 'U12'},
      {v: 'u13', t: 'U13'}
    ]
  };

  const houses = ['Weaver', 'Starling', 'Taraco', 'Berbet'];
  const ageGroups = ['u7', 'u8', 'u9', 'u10', 'u11', 'u12', 'u13'];
  const sports = ['football', 'netball'];
  let teamIdCounter = 1;
  const generatedTeams = [];
  sports.forEach(sport => {
    ageGroups.forEach(ageGroup => {
      houses.forEach(house => {
        generatedTeams.push({ id: teamIdCounter++, name: house, sport: sport, division: ageGroup });
      });
    });
  });
  generatedTeams.push({ id: teamIdCounter++, name: 'U13 All-Stars', sport: 'football', division: 'all-star' });
  generatedTeams.push({ id: teamIdCounter++, name: 'Coaches', sport: 'football', division: 'all-star' });
  const defaultTeams = generatedTeams;

  const defaultFixtures = [
    // Football - U7
    { id: 1001, sport: 'football', division: 'u7', teamA: 'Weaver', teamB: 'Starling', date: '2025-06-11', time: '10:00', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1002, sport: 'football', division: 'u7', teamA: 'Taraco', teamB: 'Berbet', date: '2025-06-11', time: '10:00', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    { id: 1003, sport: 'football', division: 'u7', teamA: 'Weaver', teamB: 'Taraco', date: '2025-06-11', time: '10:20', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1004, sport: 'football', division: 'u7', teamA: 'Starling', teamB: 'Berbet', date: '2025-06-11', time: '10:20', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    { id: 1005, sport: 'football', division: 'u7', teamA: 'Weaver', teamB: 'Berbet', date: '2025-06-11', time: '10:40', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1006, sport: 'football', division: 'u7', teamA: 'Starling', teamB: 'Taraco', date: '2025-06-11', time: '10:40', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    
    // Football - U8
    { id: 1007, sport: 'football', division: 'u8', teamA: 'Weaver', teamB: 'Starling', date: '2025-06-11', time: '11:00', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1008, sport: 'football', division: 'u8', teamA: 'Taraco', teamB: 'Berbet', date: '2025-06-11', time: '11:00', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    { id: 1009, sport: 'football', division: 'u8', teamA: 'Weaver', teamB: 'Taraco', date: '2025-06-11', time: '11:20', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1010, sport: 'football', division: 'u8', teamA: 'Starling', teamB: 'Berbet', date: '2025-06-11', time: '11:20', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    { id: 1011, sport: 'football', division: 'u8', teamA: 'Weaver', teamB: 'Berbet', date: '2025-06-11', time: '11:40', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1012, sport: 'football', division: 'u8', teamA: 'Starling', teamB: 'Taraco', date: '2025-06-11', time: '11:40', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    
    // Football - U9
    { id: 1013, sport: 'football', division: 'u9', teamA: 'Weaver', teamB: 'Starling', date: '2025-06-11', time: '12:00', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1014, sport: 'football', division: 'u9', teamA: 'Taraco', teamB: 'Berbet', date: '2025-06-11', time: '12:00', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    { id: 1015, sport: 'football', division: 'u9', teamA: 'Weaver', teamB: 'Taraco', date: '2025-06-11', time: '12:20', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1016, sport: 'football', division: 'u9', teamA: 'Starling', teamB: 'Berbet', date: '2025-06-11', time: '12:20', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    { id: 1017, sport: 'football', division: 'u9', teamA: 'Weaver', teamB: 'Berbet', date: '2025-06-11', time: '12:40', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1018, sport: 'football', division: 'u9', teamA: 'Starling', teamB: 'Taraco', date: '2025-06-11', time: '12:40', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    
    // Football - U10
    { id: 1019, sport: 'football', division: 'u10', teamA: 'Weaver', teamB: 'Starling', date: '2025-06-11', time: '13:00', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1020, sport: 'football', division: 'u10', teamA: 'Taraco', teamB: 'Berbet', date: '2025-06-11', time: '13:00', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    { id: 1021, sport: 'football', division: 'u10', teamA: 'Weaver', teamB: 'Taraco', date: '2025-06-11', time: '13:20', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1022, sport: 'football', division: 'u10', teamA: 'Starling', teamB: 'Berbet', date: '2025-06-11', time: '13:20', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    { id: 1023, sport: 'football', division: 'u10', teamA: 'Weaver', teamB: 'Berbet', date: '2025-06-11', time: '13:40', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1024, sport: 'football', division: 'u10', teamA: 'Starling', teamB: 'Taraco', date: '2025-06-11', time: '13:40', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    
    // Football - U11
    { id: 1025, sport: 'football', division: 'u11', teamA: 'Weaver', teamB: 'Starling', date: '2025-06-11', time: '14:00', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1026, sport: 'football', division: 'u11', teamA: 'Taraco', teamB: 'Berbet', date: '2025-06-11', time: '14:00', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    { id: 1027, sport: 'football', division: 'u11', teamA: 'Weaver', teamB: 'Taraco', date: '2025-06-11', time: '14:20', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1028, sport: 'football', division: 'u11', teamA: 'Starling', teamB: 'Berbet', date: '2025-06-11', time: '14:20', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    { id: 1029, sport: 'football', division: 'u11', teamA: 'Weaver', teamB: 'Berbet', date: '2025-06-11', time: '14:40', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1030, sport: 'football', division: 'u11', teamA: 'Starling', teamB: 'Taraco', date: '2025-06-11', time: '14:40', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    
    // Football - U12
    { id: 1031, sport: 'football', division: 'u12', teamA: 'Weaver', teamB: 'Starling', date: '2025-06-11', time: '15:00', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1032, sport: 'football', division: 'u12', teamA: 'Taraco', teamB: 'Berbet', date: '2025-06-11', time: '15:00', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    { id: 1033, sport: 'football', division: 'u12', teamA: 'Weaver', teamB: 'Taraco', date: '2025-06-11', time: '15:20', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1034, sport: 'football', division: 'u12', teamA: 'Starling', teamB: 'Berbet', date: '2025-06-11', time: '15:20', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    { id: 1035, sport: 'football', division: 'u12', teamA: 'Weaver', teamB: 'Berbet', date: '2025-06-11', time: '15:40', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1036, sport: 'football', division: 'u12', teamA: 'Starling', teamB: 'Taraco', date: '2025-06-11', time: '15:40', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    
    // Football - U13
    { id: 1037, sport: 'football', division: 'u13', teamA: 'Weaver', teamB: 'Starling', date: '2025-06-11', time: '16:00', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1038, sport: 'football', division: 'u13', teamA: 'Taraco', teamB: 'Berbet', date: '2025-06-11', time: '16:00', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    { id: 1039, sport: 'football', division: 'u13', teamA: 'Weaver', teamB: 'Taraco', date: '2025-06-11', time: '16:20', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1040, sport: 'football', division: 'u13', teamA: 'Starling', teamB: 'Berbet', date: '2025-06-11', time: '16:20', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    { id: 1041, sport: 'football', division: 'u13', teamA: 'Weaver', teamB: 'Berbet', date: '2025-06-11', time: '16:40', status: 'upcoming', type: 'Pool', venue: 'Field 1' },
    { id: 1042, sport: 'football', division: 'u13', teamA: 'Starling', teamB: 'Taraco', date: '2025-06-11', time: '16:40', status: 'upcoming', type: 'Pool', venue: 'Field 2' },
    
    // Football - U13 All-Stars vs Coaches
    { id: 1043, sport: 'football', division: 'all-star', teamA: 'U13 All-Stars', teamB: 'Coaches', date: '2025-06-11', time: '17:30', status: 'upcoming', type: 'Final', venue: 'Main Field' },
    
    // Netball - U7
    { id: 2001, sport: 'netball', division: 'u7', teamA: 'Weaver', teamB: 'Starling', date: '2025-06-11', time: '10:00', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2002, sport: 'netball', division: 'u7', teamA: 'Taraco', teamB: 'Berbet', date: '2025-06-11', time: '10:00', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    { id: 2003, sport: 'netball', division: 'u7', teamA: 'Weaver', teamB: 'Taraco', date: '2025-06-11', time: '10:25', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2004, sport: 'netball', division: 'u7', teamA: 'Starling', teamB: 'Berbet', date: '2025-06-11', time: '10:25', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    { id: 2005, sport: 'netball', division: 'u7', teamA: 'Weaver', teamB: 'Berbet', date: '2025-06-11', time: '10:50', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2006, sport: 'netball', division: 'u7', teamA: 'Starling', teamB: 'Taraco', date: '2025-06-11', time: '10:50', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    
    // Netball - U8
    { id: 2007, sport: 'netball', division: 'u8', teamA: 'Weaver', teamB: 'Starling', date: '2025-06-11', time: '11:15', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2008, sport: 'netball', division: 'u8', teamA: 'Taraco', teamB: 'Berbet', date: '2025-06-11', time: '11:15', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    { id: 2009, sport: 'netball', division: 'u8', teamA: 'Weaver', teamB: 'Taraco', date: '2025-06-11', time: '12:05', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2010, sport: 'netball', division: 'u8', teamA: 'Starling', teamB: 'Berbet', date: '2025-06-11', time: '12:05', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    { id: 2011, sport: 'netball', division: 'u8', teamA: 'Weaver', teamB: 'Berbet', date: '2025-06-11', time: '12:05', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2012, sport: 'netball', division: 'u8', teamA: 'Starling', teamB: 'Taraco', date: '2025-06-11', time: '12:05', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    
    // Netball - U9
    { id: 2013, sport: 'netball', division: 'u9', teamA: 'Weaver', teamB: 'Starling', date: '2025-06-11', time: '12:45', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2014, sport: 'netball', division: 'u9', teamA: 'Taraco', teamB: 'Berbet', date: '2025-06-11', time: '12:45', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    { id: 2015, sport: 'netball', division: 'u9', teamA: 'Weaver', teamB: 'Taraco', date: '2025-06-11', time: '12:45', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2016, sport: 'netball', division: 'u9', teamA: 'Starling', teamB: 'Berbet', date: '2025-06-11', time: '12:45', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    { id: 2017, sport: 'netball', division: 'u9', teamA: 'Weaver', teamB: 'Berbet', date: '2025-06-11', time: '13:10', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2018, sport: 'netball', division: 'u9', teamA: 'Starling', teamB: 'Taraco', date: '2025-06-11', time: '13:10', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    
    // Netball - U10
    { id: 2019, sport: 'netball', division: 'u10', teamA: 'Weaver', teamB: 'Starling', date: '2025-06-11', time: '13:35', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2020, sport: 'netball', division: 'u10', teamA: 'Taraco', teamB: 'Berbet', date: '2025-06-11', time: '13:35', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    { id: 2021, sport: 'netball', division: 'u10', teamA: 'Weaver', teamB: 'Taraco', date: '2025-06-11', time: '14:00', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2022, sport: 'netball', division: 'u10', teamA: 'Starling', teamB: 'Berbet', date: '2025-06-11', time: '14:00', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    { id: 2023, sport: 'netball', division: 'u10', teamA: 'Weaver', teamB: 'Berbet', date: '2025-06-11', time: '14:25', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2024, sport: 'netball', division: 'u10', teamA: 'Starling', teamB: 'Taraco', date: '2025-06-11', time: '14:25', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    
    // Netball - U11
    { id: 2025, sport: 'netball', division: 'u11', teamA: 'Weaver', teamB: 'Starling', date: '2025-06-11', time: '14:50', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2026, sport: 'netball', division: 'u11', teamA: 'Taraco', teamB: 'Berbet', date: '2025-06-11', time: '14:50', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    { id: 2027, sport: 'netball', division: 'u11', teamA: 'Weaver', teamB: 'Taraco', date: '2025-06-11', time: '15:15', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2028, sport: 'netball', division: 'u11', teamA: 'Starling', teamB: 'Berbet', date: '2025-06-11', time: '15:15', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    { id: 2029, sport: 'netball', division: 'u11', teamA: 'Weaver', teamB: 'Berbet', date: '2025-06-11', time: '15:40', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2030, sport: 'netball', division: 'u11', teamA: 'Starling', teamB: 'Taraco', date: '2025-06-11', time: '15:40', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    
    // Netball - U12
    { id: 2031, sport: 'netball', division: 'u12', teamA: 'Weaver', teamB: 'Starling', date: '2025-06-11', time: '15:55', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2032, sport: 'netball', division: 'u12', teamA: 'Taraco', teamB: 'Berbet', date: '2025-06-11', time: '15:55', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    { id: 2033, sport: 'netball', division: 'u12', teamA: 'Weaver', teamB: 'Taraco', date: '2025-06-11', time: '16:20', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2034, sport: 'netball', division: 'u12', teamA: 'Starling', teamB: 'Berbet', date: '2025-06-11', time: '16:20', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    { id: 2035, sport: 'netball', division: 'u12', teamA: 'Weaver', teamB: 'Berbet', date: '2025-06-11', time: '16:45', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2036, sport: 'netball', division: 'u12', teamA: 'Starling', teamB: 'Taraco', date: '2025-06-11', time: '16:45', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    
    // Netball - U13
    { id: 2037, sport: 'netball', division: 'u13', teamA: 'Weaver', teamB: 'Starling', date: '2025-06-11', time: '17:10', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2038, sport: 'netball', division: 'u13', teamA: 'Taraco', teamB: 'Berbet', date: '2025-06-11', time: '17:10', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    { id: 2039, sport: 'netball', division: 'u13', teamA: 'Weaver', teamB: 'Taraco', date: '2025-06-11', time: '17:35', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2040, sport: 'netball', division: 'u13', teamA: 'Starling', teamB: 'Berbet', date: '2025-06-11', time: '17:35', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
    { id: 2041, sport: 'netball', division: 'u13', teamA: 'Weaver', teamB: 'Berbet', date: '2025-06-11', time: '18:00', status: 'upcoming', type: 'Pool', venue: 'Court 1' },
    { id: 2042, sport: 'netball', division: 'u13', teamA: 'Starling', teamB: 'Taraco', date: '2025-06-11', time: '18:00', status: 'upcoming', type: 'Pool', venue: 'Court 2' },
  ];

  // --- STATE MANAGEMENT ---
  const state = {
    teams: [],
    fixtures: [],
    scores: [],
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
      state.scores = (data && Array.isArray(data.scores)) ? data.scores : [];

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
      state.scores = [];
    }
  }

  async function saveData() {
    try {
      const response = await fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teams: state.teams, fixtures: state.fixtures, scores: state.scores, password: PASSWORD }),
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
          <span><b class="team-${(fx.teamA || 'TBC').toLowerCase().split(' ')[0]}">${fx.teamA || 'TBC'}</b></span>
          <span class="fixture-vs">vs</span>
          <span><b class="team-${(fx.teamB || 'TBC').toLowerCase().split(' ')[0]}">${fx.teamB || 'TBC'}</b></span>
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
    document.getElementById('modal-scoreA').value = (fx.scoreA !== null && fx.scoreA !== undefined) ? fx.scoreA : '';
    document.getElementById('modal-scoreB').value = (fx.scoreB !== null && fx.scoreB !== undefined) ? fx.scoreB : '';
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

    document.getElementById('modal-scoreA').value = '';
    document.getElementById('modal-scoreB').value = '';
    document.getElementById('modal-date').value = '2025-06-11';
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
      scoreA: (() => {
        const val = parseInt(document.getElementById('modal-scoreA').value, 10);
        return isNaN(val) ? null : val;
      })(),
      scoreB: (() => {
        const val = parseInt(document.getElementById('modal-scoreB').value, 10);
        return isNaN(val) ? null : val;
      })(),
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
