"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";

interface Note {
  id: string;
  page_path: string;
  unit_id: string;
  content: string;
  updated_at: string;
}

interface Props {
  locale: string;
}

export default function NotesList({ locale }: Props) {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const isKo = locale === "ko";
  const supabase = createClient();

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    supabase
      .from("study_notes")
      .select("id, page_path, unit_id, content, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .then((result: { data: Note[] | null }) => {
        setNotes(result.data ?? []);
        setLoading(false);
      });
  }, [user, supabase]);

  if (!user) {
    return (
      <p className="text-sm text-gray-500">
        {isKo ? "로그인 후 메모를 확인할 수 있습니다." : "Sign in to view your notes."}
      </p>
    );
  }

  if (loading) {
    return <p className="text-sm text-gray-400">{isKo ? "불러오는 중..." : "Loading..."}</p>;
  }

  if (notes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 px-6 py-10 text-center text-sm text-gray-400">
        {isKo ? "아직 작성한 메모가 없습니다." : "No study notes yet."}
      </div>
    );
  }

  return (
    <ul className="space-y-3" role="list">
      {notes.map((note) => {
        const exam = note.unit_id.startsWith("cpacc") ? "cpacc" : "was";
        const href = `/${locale}/${exam}/study/${note.unit_id}`;
        const dateStr = new Date(note.updated_at).toLocaleDateString(
          locale === "ko" ? "ko-KR" : "en-US",
          { year: "numeric", month: "short", day: "numeric" }
        );

        return (
          <li key={note.id} className="rounded-xl border border-gray-200 px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <Link
                  href={href}
                  className="text-xs font-medium text-blue-600 no-underline hover:underline"
                >
                  {note.unit_id} →
                </Link>
                <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap line-clamp-3">
                  {note.content}
                </p>
              </div>
              <span className="shrink-0 text-xs text-gray-400">{dateStr}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
