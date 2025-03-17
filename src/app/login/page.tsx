"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] bg-background">
      <div className="flex flex-col items-center justify-center h-full w-[400px]">
        <h1 className="text-3xl font-bold text-secondary mb-12 w-full">
          Login
        </h1>
        <form
          className="flex flex-col items-center space-y-4 w-full"
          onSubmit={async (e) => {
            e.preventDefault();
            const email = (e.target as any).email.value;
            await signIn("email", { email });
          }}
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="p-3 rounded-md bg-secondary text-background w-full"
          />
          <button
            type="submit"
            className="bg-primary text-background font-bold px-6 py-3 rounded-xl cursor-pointer w-full"
          >
            Get Login Code
          </button>
        </form>
        <hr className="border border-white/50 w-full my-4" />

        <button
          onClick={() => signIn("google")}
          className="bg-background w-full text-white px-6 py-3 rounded-xl mb-4 border-2 border-white/50 cursor-pointer"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
