import { cookies } from "next/headers";
import { TypingArea } from "./components/TypingArea";

export default async function Home() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value || "Anonymous";

  return (
    <main>
      <TypingArea username={username} />
    </main>
  );
}
