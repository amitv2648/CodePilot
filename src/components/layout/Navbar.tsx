import { useEffect, useRef, useState } from "react";
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import {
  deleteAccount,
  logout,
} from "../../services/firebase/auth";
import { deleteUserProfile } from "../../services/firebase/user";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  const savedTheme = window.localStorage.getItem("codepilot-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [isAccountActionRunning, setIsAccountActionRunning] =
    useState(false);
  const [accountError, setAccountError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("codepilot-theme", theme);
  }, [theme]);

  useEffect(() => {
    function closeProfileMenu(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
        setIsDeleteConfirmationOpen(false);
      }
    }

    function closeProfileMenuWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false);
        setIsDeleteConfirmationOpen(false);
      }
    }

    document.addEventListener("mousedown", closeProfileMenu);
    document.addEventListener(
      "keydown",
      closeProfileMenuWithEscape,
    );

    return () => {
      document.removeEventListener("mousedown", closeProfileMenu);
      document.removeEventListener(
        "keydown",
        closeProfileMenuWithEscape,
      );
    };
  }, []);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
  }

  async function handleLogout() {
    setAccountError(null);
    setIsAccountActionRunning(true);

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      setAccountError("Unable to log out. Please try again.");
      setIsAccountActionRunning(false);
    }
  }

  async function handleDeleteAccount() {
    if (!user) {
      setAccountError("No authenticated account was found.");
      return;
    }

    const lastSignInTime = user.metadata.lastSignInTime
      ? Date.parse(user.metadata.lastSignInTime)
      : 0;
    const recentlySignedIn =
      Date.now() - lastSignInTime < 4 * 60 * 1000;

    if (!recentlySignedIn) {
      setAccountError(
        "For security, log out and sign in again before deleting your account.",
      );
      setIsDeleteConfirmationOpen(false);
      return;
    }

    setAccountError(null);
    setIsAccountActionRunning(true);

    try {
      await deleteUserProfile(user.uid);
      await deleteAccount();
      navigate("/", { replace: true });
    } catch {
      setAccountError(
        "Unable to delete the account. Please sign in again and retry.",
      );
      setIsAccountActionRunning(false);
      setIsDeleteConfirmationOpen(false);
    }
  }

  const ThemeIcon = theme === "dark" ? MoonIcon : SunIcon;
  const themeLabel =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <header className="relative z-50 flex h-16 items-center justify-between border-b border-slate-700 bg-slate-900 px-8">
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-3 rounded-xl text-left transition hover:opacity-80"
        aria-label="Go to dashboard"
      >
        <img
          src="/codepilot-logo.svg"
          alt=""
          className="h-11 w-14 shrink-0 object-contain"
        />

        <div>
          <h1 className="text-xl font-bold text-white">
            CodePilot
          </h1>
          <p className="text-xs text-slate-400">
            Personalized Coding Education
          </p>
        </div>
      </button>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg p-2 transition hover:bg-slate-800"
          aria-label={themeLabel}
          title={themeLabel}
        >
          <ThemeIcon className="h-6 w-6 text-slate-300" />
        </button>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setIsProfileMenuOpen((isOpen) => !isOpen);
              setIsDeleteConfirmationOpen(false);
              setAccountError(null);
            }}
            className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-slate-800"
            aria-expanded={isProfileMenuOpen}
            aria-haspopup="menu"
          >
            <UserCircleIcon className="h-8 w-8 text-slate-300" />
            <span className="text-white">Profile</span>
            <ChevronDownIcon className="h-4 w-4 text-slate-400" />
          </button>

          {isProfileMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-2xl"
            >
              <div className="border-b border-slate-700 px-3 py-3">
                <p className="text-sm font-semibold text-white">
                  {user?.displayName ?? "CodePilot Student"}
                </p>
                <p className="mt-1 truncate text-xs text-slate-400">
                  {user?.email ?? ""}
                </p>
              </div>

              {!isDeleteConfirmationOpen ? (
                <div className="py-2">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={toggleTheme}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-slate-800"
                  >
                    <ThemeIcon className="h-5 w-5" />
                    {themeLabel}
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    disabled={isAccountActionRunning}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    Log out
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() =>
                      setIsDeleteConfirmationOpen(true)
                    }
                    disabled={isAccountActionRunning}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                  >
                    <TrashIcon className="h-5 w-5" />
                    Delete account
                  </button>
                </div>
              ) : (
                <div className="p-3">
                  <p className="text-sm font-semibold text-white">
                    Delete your account permanently?
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Your profile and authentication account will be removed.
                    This cannot be undone.
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setIsDeleteConfirmationOpen(false)
                      }
                      className="flex-1 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      disabled={isAccountActionRunning}
                      className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-50"
                    >
                      {isAccountActionRunning
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              )}

              {accountError && (
                <p
                  role="alert"
                  className="mx-3 mb-3 rounded-lg border border-red-500/40 bg-red-500/10 p-2 text-xs leading-5 text-red-300"
                >
                  {accountError}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;