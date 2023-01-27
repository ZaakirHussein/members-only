import * as React from 'react';
import Post from './Post';

// fetch posts from database and map through them here

export default function Timeline() {
  return (
    <div className="max-w-4xl text-gray-200 border-x-neutral-800 border-x">
      <div className="flex items-end w-full border-b-neutral-800 border-b px-4 py-6 gap-4 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <h1 className="text-4xl	font-bold">Home</h1>
      </div>
      <Post
        username="Anonymous"
        message="We've used Inter font family for all of the Tailwind UI examples because it's a beautiful font for UI design and is completely open-source and free. Using a custom font is nice because it allows us to make the components look the same on all browsers and operating systems."
      />
    </div>
  );
}
