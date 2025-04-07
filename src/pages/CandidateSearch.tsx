import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { GitHubUser } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidate = async () => {
    setLoading(true);
    try {
      const users = await searchGithub();
      if (!Array.isArray(users) || users.length === 0) {
        throw new Error('No users returned from GitHub.');
      }

      const user = await searchGithubUser(users[0].login);
      setCandidate(user);
      setError(null);
    } catch (err) {
      console.error('Error fetching candidate:', err);
      setError('Failed to fetch candidate.');
      setCandidate(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    if (candidate) {
      const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      saved.push(candidate);
      localStorage.setItem('savedCandidates', JSON.stringify(saved));
    }
    fetchCandidate();
  };

  const handleReject = () => {
    fetchCandidate();
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  return (
    <>
      <h1>Candidate Search</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {candidate && (
        <div className="candidate-card">
          <img src={candidate.avatar_url} alt={candidate.name} />
          <div className="name-section">
            {candidate.name}
            <div className="username">({candidate.login})</div>
          </div>
          <p>Location: {candidate.location}</p>
          <p>
            Email:{' '}
            <a href={`mailto:${candidate.email}`} className="nav-link">
              {candidate.email || 'N/A'}
            </a>
          </p>
          <p>Company: {candidate.company || 'N/A'}</p>
          <p className="bio">
            Bio: {candidate.bio || "No bio provided."}
          </p>
          <div className="button-row">
            <button className="reject" onClick={handleReject}>−</button>
            <button className="accept" onClick={handleAccept}>+</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CandidateSearch;
