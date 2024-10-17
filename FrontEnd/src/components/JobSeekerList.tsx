// components/JobSeekerList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobSeekerList: React.FC = () => {
    const [jobSeekers, setJobSeekers] = useState([]);

    useEffect(() => {
        const fetchJobSeekers = async () => {
            const response = await axios.get('/api/users/job-seekers');
            setJobSeekers(response.data);
        };

        fetchJobSeekers();
    }, []);

    const acceptJobSeeker = async (jobSeekerId: string) => {
        await axios.post('/api/users/accept-job-seeker', { agencyId: 'your-agency-id', jobSeekerId });
        // Update the UI accordingly
    };

    return (
        <div>
            <h2>Job Seekers</h2>
            <ul>
                {jobSeekers.map((jobSeeker: any) => (
                    <li key={jobSeeker.id}>
                        {jobSeeker.firstName} {jobSeeker.lastName} - {jobSeeker.status}
                        {jobSeeker.status === 'pending' && (
                            <button onClick={() => acceptJobSeeker(jobSeeker.id)}>Accept</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobSeekerList;