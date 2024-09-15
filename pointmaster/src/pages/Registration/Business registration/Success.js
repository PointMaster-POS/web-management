import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Success() {
    const location = useLocation();
    const { businessId } = location.state;
    const [businessDetails, setBusinessDetails] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/business/${businessId}`)
            .then(response => response.json())
            .then(data => setBusinessDetails(data))
            .catch(error => console.error('Error fetching business details:', error));
    }, [businessId]);

    if (!businessDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Registration Successful</h1>
            <h2>Business Details</h2>
            <p><strong>Email:</strong> {businessDetails.business_mail}</p>
            <p><strong>Phone:</strong> {businessDetails.business_hotline}</p>
            <p><strong>Owner Name:</strong> {businessDetails.business_owner_name}</p>
            <p><strong>Owner Email:</strong> {businessDetails.business_owner_mail}</p>
            <p><strong>Description:</strong> {businessDetails.business_description}</p>
            <p><strong>Website:</strong> {businessDetails.business_url}</p>
            <p><strong>Address:</strong> {businessDetails.business_address}</p>
            <p><strong>Registration Number:</strong> {businessDetails.business_registration_number}</p>
            <p><strong>Type:</strong> {businessDetails.business_type}</p>
            <p><strong>Registration Date:</strong> {businessDetails.business_registration_date}</p>
            <p><strong>Logo Location:</strong> {businessDetails.logo_location}</p>
        </div>
    );
}

export default Success;
