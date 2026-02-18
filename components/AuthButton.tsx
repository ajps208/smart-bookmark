"use client";

import { supabase } from "../lib/supabase";

export default function AuthButton() {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <button
      onClick={signIn}
      className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-700 transition"
    >
      Continue with Google
    </button>
  );
}
