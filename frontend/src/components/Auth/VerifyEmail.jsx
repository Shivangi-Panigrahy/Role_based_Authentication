import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../../features/auth/authAPI';

const VerifyEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { loading, error, message, user } = useSelector(state => state.auth);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (token) {
      const verify = async () => {
        try {
          await dispatch(verifyEmail(token));
          setVerified(true);
        } catch (err) {
          console.error('Verification failed:', err);
        }
      };
      verify();
    }
  }, [dispatch, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
        </div>

        {loading && (
          <div className="text-gray-600">
            <p>Verifying your email address...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
            <p className="mt-4">
              <Link to="/admin-login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Return to Login
              </Link>
            </p>
          </div>
        )}

        {verified && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{message}</span>
            <p className="mt-4">
              {user && user.role === 'admin' ? (
                <Link to="/admin-login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Go to Admin Login
                </Link>
              ) : (
                <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Go to Home Page
                </Link>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;