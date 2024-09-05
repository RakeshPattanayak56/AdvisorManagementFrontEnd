import React from 'react';
import AdvisorForm from './AdvisorForm';
import AdvisorTable from './AdvisorTable';

function App() {
    return (
        <div className="container mt-4">
        <h1 className="text-center">Advisor Management</h1>
        <AdvisorForm /> {/* Render the form */}
        <hr />
        <AdvisorTable /> {/* Render the table */}
    </div>
    );
}

export default App;
