import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { GitHubUser } from '../types/GitHubUser';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidate = async () => {
    setLoading(true);
    try {
      const user = await searchGithub();
      setCandidate(user);
      setError(null);
    } catch (err) {
      setError('Failed to fetch candidate.');
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!candidate) return <p>No candidate available.</p>;

  return (
    <div>
      <img src={candidate.avatar_url} alt={candidate.name} width={100} />
      <h2>{candidate.name}</h2>
      <p><strong>Username:</strong> {candidate.login}</p>
      <p><strong>Location:</strong> {candidate.location}</p>
      <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
      <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
      <a href={candidate.html_url} target="_blank" rel="noreferrer">GitHub Profile</a>
      
      <div>
        <button onClick={handleAccept}>+</button>
        <button onClick={handleReject}>−</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
