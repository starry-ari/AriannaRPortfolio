import React from 'react';

function Education({ education }) {
  return (
    <div className="container py-4">
      <h2 className="fs-3 fw-bold border-bottom pb-2 mb-3">Education</h2>
      <p className="fs-5">
        <span className="fw-semibold">{education.school}</span> — {education.major} <span className="text-secondary">({education.grad})</span>
      </p>
    </div>
  );
}

export default Education;
