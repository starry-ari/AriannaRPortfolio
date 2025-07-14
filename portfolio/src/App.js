import React, { useState, useEffect } from 'react'
import Card from './components/Card'
import "./components/Card.css";


function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(data => {
      setData(data);
      console.log(data);
    });
  }, []);
  if (!data) return <div className="d-flex align-items-center justify-content-center min-vh-100 fs-4 fw-semibold">Loading...</div>;

  return (
    <div className="container py-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded shadow mb-4 px-3">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-2" href="/">Arianna Richardson</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* The Card component */}
      <div className="d-flex justify-content-center mb-4">
        <Card
          name={data.name}
          title={data.title}
          avatarUrl={data.avatarUrl}
          enableTilt={true}
        />
      </div>

      {/* Render additional info as HTML-like JSX below the card */}
      <section className="mb-4">
        <h2 className="fs-3 fw-bold border-bottom pb-2 mb-3">About</h2>
        <p className="fs-5 lh-base">{data.about}</p>
      </section>

      <section className="mb-4">
        <h2 className="fs-3 fw-bold border-bottom pb-2 mb-3">Education</h2>
        <p className="fs-5">
          <span className="fw-semibold">{data.education.school}</span> — {data.education.major} <span className="text-secondary">({data.education.grad})</span>
        </p>
      </section>

      <section className="mb-4">
        <h2 className="fs-3 fw-bold border-bottom pb-2 mb-3">Work Experience</h2>
        <ul className="list-group list-group-flush mb-3">
          {data.work.map((job, idx) => (
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
      </section>

      <section>
        <h2 className="fs-3 fw-bold border-bottom pb-2 mb-3">Hobbies</h2>
        <div className="row g-3">
          {data.hobbies.map((hobby, idx) => (
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
         <div className="card-footer text-muted">
                  <p card-text fw-semibold text-primary>Contact Me</p>
                  </div>
      </section>
    </div>
  );
}

export default App;

