import React, { useState } from 'react';

function AdvisorForm() {
    const [advisorData, setAdvisorData] = useState({
        name: '',
        SIN: '',
        Address: '',
        Phone: ''
    });

    const [result, setResult] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdvisorData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7278/api/advisors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(advisorData)
            });

            if (response.ok) {
                const data = await response.json();
                setResult(`Advisor created successfully with ID: ${data.id}`);
            } else {
                setResult(`Error: ${response.statusText}`);
            }
        } catch (error) {
            setResult(`Error: ${error.message}`);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
        <h2 className="text-center mb-4">Create Advisor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={advisorData.name}
              onChange={handleChange}
              maxLength="255"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">SIN</label>
            <input
                        className="form-control"
                        type="SIN"
                        name="SIN"
                        value={advisorData.SIN}
                        onChange={handleChange}
                        maxLength="9"
                        minLength="9"
                        required
                    />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Address</label>
            <textarea
                        className="form-control"
                        type="Address"
                        name="Address"
                        value={advisorData.Address}
                        onChange={handleChange}
                        maxLength="255"
                        
                    />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Phone</label>
            <input
                        className="form-control"
                        type="text"
                        name="Phone"
                        value={advisorData.Phone}
                        onChange={handleChange}
                        maxLength="10"
                        minLength="10"
                        required
                    />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
        {result && <p>{result}</p>}
        </div>
        </div>
      </div>
    );
}

export default AdvisorForm;
