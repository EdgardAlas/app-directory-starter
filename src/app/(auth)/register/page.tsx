import { createUser } from '@/actions/user.actions';
import React from 'react';

const Register = () => {
  return (
    <form action={createUser}>
      <button>crear</button>
    </form>
  );
};

export default Register;
