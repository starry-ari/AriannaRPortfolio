import React from 'react';

function Hobbies({ hobbies }) {
  return (
    <div className="container py-4">
      <h2 className="fs-3 fw-bold border-bottom pb-2 mb-3">Hobbies</h2>
      <div className="row g-3">
        {hobbies.map((hobby, idx) => (
          <div key={idx} className="col-6 col-md-4">
            <div className="card text-center h-100 shadow-sm">
              <img
                src={hobby.img}
                alt={hobby.hobby}
                className="card-img-top rounded-circle mx-auto mt-3"
                style={{ width: '96px', height: '96px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <p className="card-text fw-semibold text-primary">{hobby.hobby}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hobbies;
