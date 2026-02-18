"use client";

import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import AuthButton from "../components/AuthButton";
import BookmarkForm from "../components/BookmarkForm";
import BookmarkList from "../components/BookmarkList";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-slate-500">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-slate-200 text-center">
          <h1 className="text-3xl font-semibold mb-3">
            Smart Bookmark
          </h1>
          <p className="text-slate-500 mb-8">
            Save and manage your favorite links securely.
          </p>
          <AuthButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-slate-200">
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-semibold">
              My Bookmarks
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your saved links
            </p>
          </div>

          <button
            onClick={async () => await supabase.auth.signOut()}
            className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition"
          >
            Logout
          </button>
        </div>

        <BookmarkForm session={session} />
        <BookmarkList session={session} />
      </div>
    </div>
  );
}
