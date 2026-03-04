import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Enter Your Username
          </h1>
          <form action={setUsernameInCookie} className="space-y-6">
            <input
              type="text"
              name="username"
              placeholder="Your username"
              required
              className="w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
            >
              Join Game
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
