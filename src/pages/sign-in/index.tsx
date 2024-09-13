import { signIn, signOut, useSession } from "next-auth/react";

 export default function AuthShowcase() {
    const { data: sessionData } = useSession();

    return (
      <div className="flex flex-col items-center justify-center gap-4 font-helvetica ">
        <button
          className=" text-white no-underline transition hover:text-purple-500"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "SIGN OUT" : "SIGN IN"}
        </button>
      </div>
    );
  }
  