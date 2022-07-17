import type { NextPage } from 'next';

const NotAvailable: NextPage = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline w-24 h-24 mb-2 text-warning"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-5xl font-bold">Oops!</h1>
          <p className="py-6">
            Only available on mobile. Access mobile device!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotAvailable;
