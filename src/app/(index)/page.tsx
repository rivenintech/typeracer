import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PlayersTable } from "./components/PlayersTable";
import { TypingArea } from "./components/TypingArea";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value || "Anonymous";

  return (
    <main className="my-4">
      <TypingArea />
      <div className="mx-4 mt-8">
        <PlayersTable username={username} />
      </div>
    </main>
  );
}
