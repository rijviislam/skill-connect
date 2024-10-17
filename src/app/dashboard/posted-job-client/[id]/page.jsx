import HireFreelancer from '@/app/components/HireFreelancer';
import React from 'react';

const page = ({params}) => {
    return (
        <div>
            <HireFreelancer params={params}/>
        </div>
    );
};

export default page;