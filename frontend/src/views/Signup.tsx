import * as React from 'react';
import Header from '../components/Header';
import SignupForm from '../components/SignupForm';

export default function Signup() {
  return (
    <div>
      <Header />
      <div className="flex h-full w-full flex-col items-center	 bg-neutral-900">
        <SignupForm />
      </div>
    </div>
  );
}
