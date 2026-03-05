import { cookies } from "next/headers";
import { PlayersTable } from "./components/PlayersTable";
import { TypingArea } from "./components/TypingArea";

export default async function Home() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value || "Anonymous";

  return (
    <main className="my-4">
      <TypingArea />
      <div className="mt-8 mx-4">
        <PlayersTable username={username} />
      </div>
    </main>
  );
}
