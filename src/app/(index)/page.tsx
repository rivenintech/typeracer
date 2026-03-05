import TypingArea from "@/components/TypingArea";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value || "Anonymous";

  return (
    <main>
      <TypingArea username={username} />
    </main>
  );
}
