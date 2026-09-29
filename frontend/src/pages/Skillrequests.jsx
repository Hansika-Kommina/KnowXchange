import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function SkillRequests() {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/requests", {
        credentials: "include"
      });

      const data = await response.json();

      if (response.ok) {
        setRequests(data.requests || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1>Skill Requests</h1>

        {requests.length === 0 ? (
          <p>No skill requests yet.</p>
        ) : (
          requests.map((request) => (
            <div className="skill-card" key={request._id}>
              <h3>{request.skill?.name}</h3>

              <p>
                From: {request.requester?.name}
              </p>

              <p>
                To: {request.receiver?.name}
              </p>

              <p>Status: {request.status}</p>

              {request.status === "pending" && (
                <div>
                  <button>Accept</button>
                  <button>Reject</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default SkillRequests;