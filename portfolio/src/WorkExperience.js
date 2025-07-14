import React from 'react';

function WorkExperience({ work }) {
  return (
    <div className="container py-4">
      <h2 className="fs-3 fw-bold border-bottom pb-2 mb-3">Work Experience</h2>
      <ul className="list-group list-group-flush mb-3">
        {work.map((job, idx) => (
          <li key={idx} className="list-group-item">
            <span className="fw-semibold text-primary">{job.title}</span>{' '}
            {job.company && <span className="text-secondary">@ {job.company}</span>}
            <ul className="ms-4 mt-2">
              {job.description.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkExperience;
