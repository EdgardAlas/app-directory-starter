'use client';

import { signOut } from 'next-auth/react';

const HomePage = () => {
  return (
    <div>
      <button
        onClick={async () => {
          signOut({
            redirect: true,
          });
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default HomePage;
