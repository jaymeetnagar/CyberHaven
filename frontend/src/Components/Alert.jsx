import React, { useState, useEffect } from 'react';

const Alert = ({ message }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []); 
    return (
        <>
            {isVisible && (
                <div className="alert alert-info" role="alert">
                    {message}
                </div>
            )}
        </>
    );
};

export default Alert;
