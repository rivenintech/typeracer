import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Form } from "./components/Form";

export default function EnterUsernamePage() {
  async function setUsernameInCookie(formData: FormData) {
    "use server";

    const cookieStore = await cookies();
    const username = formData.get("username")?.toString().trim();

    if (!username) return;

    cookieStore.set("username", username);
    redirect("/");
  }

  return (
    <main>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Form action={setUsernameInCookie} />
        </div>
      </div>
    </main>
  );
}
