import React from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import Modal from '../components/DialogModel';

export default function JoinClub() {
  const [secretCode, setSecretCode] = useState('');
  let [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (secretCode === 'lebron james') {
      console.log('congrats you are now apart of the club');
    }
    return setShowModal(true);
  };

  const handleChange = (e) => {
    setSecretCode(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {showModal && <Modal open={showModal} setOpen={setShowModal} />}
      <div className="flex flex-1 bg-neutral-900">
        <div className="flex flex-col mx-auto justify-center text-center h-fit p-10 border-solid border-sky-500">
          <h1 className="text-gray-50 text-lg	">
            Want to join the club? Enter the secret code below
          </h1>
          <p className="text-gray-300 cursor-pointer">
            Hint...{' '}
            <span className="text-xs text-gray-500 opacity-0 hover:opacity-100 hover:transition-opacity	 ">
              he's the all-time leading scorer in the NBA
            </span>
          </p>
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <div className="flex w-full mt-9 gap-3">
              <input type="text" name="secret" className="flex-1 max-h-8" />
              <button className="text-slate-100 max-h-8">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
