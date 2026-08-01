import { FireIcon } from "@heroicons/react/24/solid";

type Props = {
  firstName: string;
};

function WelcomeBanner({
  firstName,
}: Props) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Welcome back{firstName ? `, ${firstName}` : ""}! 👋
          </h1>

          <p className="mt-3 text-blue-100">
            Continue your coding journey and keep building amazing projects.
          </p>

        </div>

        <div className="hidden md:flex items-center gap-3 rounded-xl bg-white/10 px-5 py-4">

          <FireIcon className="h-8 w-8 text-orange-300" />

          <div>

            <p className="text-sm text-blue-100">
              Current Streak
            </p>

            <p className="text-2xl font-bold">
              0 Days
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default WelcomeBanner;