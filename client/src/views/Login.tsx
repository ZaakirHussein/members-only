import * as React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <LoginForm />
    </div>
  );
}
