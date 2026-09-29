import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function FindSkills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/skills");
        const data = await response.json();

        if (response.ok) {
          setSkills(data.skills || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadSkills();
  }, []);

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1>Find Skills</h1>
        <p>Discover skills offered by other users.</p>

        {skills.map((skill) => (
          <div className="skill-card" key={skill._id}>
            <h2>{skill.name}</h2>
            <p>{skill.description}</p>
            <p>Category: {skill.category}</p>

            <button>Request Skill</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default FindSkills;