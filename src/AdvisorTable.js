import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdvisorTable() {
    const [advisors, setAdvisors] = useState([]);
    const [editAdvisorId, setEditAdvisorId] = useState(null);
    const [editAdvisorData, setEditAdvisorData] = useState({
        Name: '',
        SIN: '',
        Address: '',
        Phone: '',
        HealthStatus:''
    });

    // Fetch advisors data 
    useEffect(() => {
        const fetchAdvisors = async () => {
            try {
                const response = await fetch('https://localhost:7278/api/advisors');
                const data = await response.json();
                setAdvisors(data);
            } catch (error) {
                console.error('Error fetching advisors:', error);
            }
        };
        fetchAdvisors();
    }, []);

    // Handle edit button click
    const handleEditClick = (advisor) => {
        setEditAdvisorId(advisor.id);
        setEditAdvisorData(advisor);
    };

    // Handle input changes for editing
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditAdvisorData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle save button click
    const handleSaveClick = async (id) => {
        try {
            const response = await fetch(`https://localhost:7278/api/advisors/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editAdvisorData)
            });

            if (response.ok) {
                const updatedAdvisor = await response.json();
                setAdvisors(advisors.map(advisor => advisor.id === id ? updatedAdvisor : advisor));
                setEditAdvisorId(null);
            } else {
                console.error('Failed to update advisor');
            }
        } catch (error) {
            console.error('Error updating advisor:', error);
        }
    };

    // Handle delete button click
    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`https://localhost:7278/api/advisors/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setAdvisors(advisors.filter(advisor => advisor.id !== id));
            } else {
                console.error('Failed to delete advisor');
            }
        } catch (error) {
            console.error('Error deleting advisor:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Advisor List</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>SIN</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Health Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {advisors.map(advisor => (
                        <tr key={advisor.id}>
                            <td>
                                {editAdvisorId === advisor.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editAdvisorData.name}
                                        onChange={handleEditChange}
                                        className="form-control"
                                    />
                                ) : (
                                    advisor.name
                                )}
                            </td>
                            <td>
                                {editAdvisorId === advisor.id ? (
                                    <input
                                        type="text"
                                        name="SIN"
                                        value={editAdvisorData.sin}
                                        onChange={handleEditChange}
                                        className="form-control"
                                    />
                                ) : (
                                    advisor.sin
                                )}
                            </td>
                            <td>
                                {editAdvisorId === advisor.id ? (
                                    <input
                                        type="text"
                                        name="Address"
                                        value={editAdvisorData.address}
                                        onChange={handleEditChange}
                                        className="form-control"
                                    />
                                ) : (
                                    advisor.address
                                )}
                            </td>
                            <td>
                                {editAdvisorId === advisor.id ? (
                                    <input
                                        type="text"
                                        name="Phone"
                                        value={editAdvisorData.phone}
                                        onChange={handleEditChange}
                                        className="form-control"
                                    />
                                ) : (
                                    advisor.phone
                                )}
                            </td>
                            <td>{advisor.healthStatus}</td>
                            <td>
                                {editAdvisorId === advisor.id ? (
                                    <>
                                        <button
                                            onClick={() => handleSaveClick(advisor.id)}
                                            className="btn btn-success btn-sm"
                                        >
                                            Save
                                        </button>
                                        
                                        <button
                                            onClick={() => setEditAdvisorId(null)}
                                            className="btn btn-secondary btn-sm ml-2"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEditClick(advisor)}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(advisor.id)}
                                            className="btn btn-danger btn-sm ml-2"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdvisorTable;
