import { useEffect, useState } from 'react';
import { GitHubUser } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<GitHubUser[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setCandidates(saved);
  }, []);

  const handleReject = (username: string) => {
    const updated = candidates.filter((user) => user.login !== username);
    setCandidates(updated);
    localStorage.setItem('savedCandidates', JSON.stringify(updated));
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      {candidates.length === 0 ? (
        <p>No candidates have been accepted yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.login}>
                <td>
                  <img src={candidate.avatar_url} width={60} alt={candidate.name} />
                </td>
                <td>
                  {candidate.name} <br />
                  <em>({candidate.login})</em>
                </td>
                <td>{candidate.location}</td>
                <td>
                  <a href={`mailto:${candidate.email}`} className="nav-link">
                    {candidate.email}
                  </a>
                </td>
                <td>{candidate.company}</td>
                <td>{candidate.bio}</td>
                <td>
                  <button
                    style={{ backgroundColor: 'red', borderRadius: '50%' }}
                    onClick={() => handleReject(candidate.login)}
                  >
                    −
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default SavedCandidates;
