import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleSearch = async () => {
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userJson = await userResponse.json();
      setUserData(userJson);

      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
      const reposJson = await reposResponse.json();
      setRepos(reposJson);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  return (
    <div className="App">
      <h1>GitHub Profile Finder</h1>
      <input
        type="text"
        placeholder="Digite o nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {userData && (
        <div className="profile">
          <img src={userData.avatar_url} alt="avatar" width="100" />
          <h2>{userData.name}</h2>
          <p>{userData.login}</p>
          <p>{userData.bio}</p>
        </div>
      )}

      <h3>Repositórios:</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
