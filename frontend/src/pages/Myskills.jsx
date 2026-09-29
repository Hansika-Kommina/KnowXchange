import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function MySkills() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

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

  useEffect(() => {
    loadSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          description,
          category
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to add skill");
        return;
      }

      alert("Skill added successfully!");

      setName("");
      setDescription("");
      setCategory("");

      loadSkills();
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1>My Skills</h1>

        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Skill name"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
          />

          <button type="submit">Add Skill</button>
        </form>

        <h2>Available Skills</h2>

        {skills.map((skill) => (
          <div className="skill-card" key={skill._id}>
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
            <small>{skill.category}</small>
          </div>
        ))}
      </div>
    </>
  );
}

export default MySkills;