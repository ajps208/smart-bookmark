"use client";

import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  created_at: string;
}

interface Props {
  session: Session;
}

export default function BookmarkList({ session }: Props) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    if (!session) return;

    fetchBookmarks();

    const channel = supabase
      .channel("bookmarks-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => fetchBookmarks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  return (
    <div className="space-y-4">
      {bookmarks.length === 0 && (
        <p className="text-slate-500 text-sm">
          No bookmarks added yet.
        </p>
      )}

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="flex justify-between items-center p-4 border border-slate-200 rounded-lg hover:shadow-md transition"
        >
          <div>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-900 hover:underline"
            >
              {bookmark.title}
            </a>
            <p className="text-sm text-slate-500">
              {bookmark.url}
            </p>
          </div>

          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="text-sm text-red-500 hover:text-red-700 transition"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
