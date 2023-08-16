import Head from 'next/head';
import react, { useState, useEffect } from 'react';

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [name]);

  const submitName = (e) => {
    e.preventDefault();
    if (name.split(' ').length < 3) {
      setError('Enter 3 names');
      return;
    }
    window.open(`/api/genCert?name=${name}`, '_blank');
  };

  return (
    <>
      <Head>
        <title>Luxor Conference Certificate</title>
      </Head>

      <div className="flex items-center justify-center">
        <div className="container containerHome">
          <img id="certificate-image" src="/1.png" alt="Certificate Image" />
          <h1>
            <strong>Luxor Conference Certificate</strong>
          </h1>
          <form onSubmit={submitName}>
            <div className="form-group">
              <label htmlFor="name">Recipient&apos;s Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button type="submit">Generate Certificate</button>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </form>
          <img id="logo" src="/2.png" alt="Conference Logo" />
        </div>
      </div>
    </>
  );
}
