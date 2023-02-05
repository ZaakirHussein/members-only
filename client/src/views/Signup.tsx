import * as React from 'react';
import Header from '../components/Header';
import SignupForm from '../components/SignupForm';

export default function Signup() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col flex-1 items-center bg-neutral-900">
        <SignupForm />
      </div>
    </div>
  );
}
