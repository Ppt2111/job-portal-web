import React, { useState, useEffect } from 'react';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('http://localhost/job-portal-api/jobs/job-from-db.php')
            .then(response => response.json())
            .then(data => setJobs(data))
            .catch(error => console.error("Error fetching jobs:", error));
    }, []);

    return (
        <div>
            <h2>Job List</h2>
            <ul>
                {jobs.map(job => (
                    <li key={job.JobID}>
                        <h3>{job.Title}</h3>
                        <p><strong>Company:</strong> Employer {job.EmployerID}</p>
                        <p><strong>Location:</strong> {job.Location}</p>
                        <p><strong>Salary:</strong> {job.Salary}</p>
                        <p><strong>Description:</strong> {job.Description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;