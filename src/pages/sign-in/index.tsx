import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="font-helvetica flex flex-col items-center justify-center gap-4 ">
      <button
        className=" text-white no-underline transition hover:text-purple-500"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "SIGN OUT" : "SIGN IN"}
      </button>
    </div>
  );
}
