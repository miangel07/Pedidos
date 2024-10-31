export const Avatar = ({ letter, imageUrl }) => (
  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto shadow-lg">
    {imageUrl ? (
      <img
        src={imageUrl}
        alt="Avatar"
        className="w-full h-full object-cover rounded-full"
      />
    ) : (
      <span className="text-5xl font-bold text-white">
        {letter || '?'}
      </span>
    )}
  </div>
);


export const Badge = ({ text }) => (
  <div className="inline-flex items-center px-4 py-1 rounded-full bg-green-100 text-green-800 font-medium text-sm">
    <svg
      className="w-4 h-4 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
    {text || 'Usuario'}
  </div>
);

export const InfoCard = ({ icon, title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
        <p className="text-lg text-gray-900 font-semibold">{value || 'No disponible'}</p>
      </div>
    </div>
  </div>
);

export const UserIcon = () => (
  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const EmailIcon = () => (
  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const PhoneIcon = () => (
  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export const ShieldIcon = () => (
  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
