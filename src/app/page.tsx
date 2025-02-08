import { getServerSession } from "next-auth";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="min-h-screen transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="text-center">
          {session ? (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">
                Welcome, {session.user?.name}!
              </h1>
              <Link
                href="/api/auth/signout"
                className="inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Sign Out
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Welcome to Our App</h1>
              <p>Please sign in to continue</p>
              <Link
                href="/api/auth/signin"
                className="inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
