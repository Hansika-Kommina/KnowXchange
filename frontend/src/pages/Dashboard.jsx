import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1>Welcome to KnowXchange</h1>
        <p>Exchange your skills with other learners.</p>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>My Skills</h2>
            <p>Manage the skills you can offer.</p>
          </div>

          <div className="dashboard-card">
            <h2>Find Skills</h2>
            <p>Discover skills offered by other users.</p>
          </div>

          <div className="dashboard-card">
            <h2>Skill Requests</h2>
            <p>Manage your incoming and outgoing requests.</p>
          </div>

          <div className="dashboard-card">
            <h2>Profile</h2>
            <p>View your KnowXchange profile.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;