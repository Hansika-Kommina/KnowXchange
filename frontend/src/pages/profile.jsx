import Navbar from "../components/Navbar";

function Profile() {
  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1>My Profile</h1>

        <div className="profile-card">
          <h2>User Profile</h2>
          <p>Manage your KnowXchange profile.</p>
        </div>
      </div>
    </>
  );
}

export default Profile;