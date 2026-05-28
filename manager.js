// Simple manager login and fixture editor (no backend, demo only)
let isManager = false;
const managerBtn = document.getElementById('manager-login-btn');
const managerPanel = document.getElementById('manager-panel');
const loginForm = document.getElementById('manager-login-form');
const fixtureTable = document.getElementById('fixture-table');
const addFixtureBtn = document.getElementById('add-fixture-btn');
const fixtureForm = document.getElementById('fixture-form');

if (managerBtn) {
  managerBtn.onclick = () => {
    managerPanel.style.display = 'block';
  };
}
if (loginForm) {
  loginForm.onsubmit = (e) => {
    e.preventDefault();
    const pass = loginForm.elements['password'].value;
    if (pass === 'FNLHBC26') {
      isManager = true;
      document.getElementById('manager-login').style.display = 'none';
      document.getElementById('fixture-editor').style.display = 'block';
    } else {
      alert('Incorrect password');
    }
  };
}
if (addFixtureBtn && fixtureForm && fixtureTable) {
  addFixtureBtn.onclick = () => {
    fixtureForm.style.display = 'block';
  };
  fixtureForm.onsubmit = (e) => {
    e.preventDefault();
    const time = fixtureForm.elements['time'].value;
    const sport = fixtureForm.elements['sport'].value;
    const division = fixtureForm.elements['division'].value;
    const venue = fixtureForm.elements['venue'].value;
    const notes = fixtureForm.elements['notes'].value;
    const row = fixtureTable.insertRow(-1);
    row.innerHTML = `<td>${time}</td><td>${sport}</td><td>${division}</td><td>${venue}</td><td>${notes}</td>`;
    fixtureForm.reset();
    fixtureForm.style.display = 'none';
  };
}
