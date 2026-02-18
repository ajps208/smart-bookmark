"use client";

import { useState, FormEvent } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface Props {
  session: Session;
}

export default function BookmarkForm({ session }: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !url) return;

    await supabase.from("bookmarks").insert([
      {
        user_id: session.user.id,
        title,
        url,
      },
    ]);

    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <label className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter bookmark title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          URL
        </label>
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
        />
      </div>

      <button
        className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-700 transition"
      >
        Add Bookmark
      </button>
    </form>
  );
}
