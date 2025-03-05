import React, {FC} from 'react';

const ErrorPage: FC = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-success"> Sorry! Not found </h1>
            <h2 className="text-success"> Use menu to go back </h2>
        </div>
    );
};

export default ErrorPage;