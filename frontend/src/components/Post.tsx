import * as React from 'react';

interface PostProps {
  username: string;
  message: string;
}

export default function Post({ username, message }: PostProps) {
  return (
    <article className="flex px-4 py-6 border-b-neutral-800 border-b">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 7 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className="w-16 h-11"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>

      <div className="px-4">
        <h2 className="pb-2 font-bold	">{username}</h2>
        <p className="text-sm	">{message}</p>
      </div>
    </article>
  );
}
