import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../services/firebase/firebase";
import { useAuth } from "../../context/AuthContext";

type CareerField = {
  name: string;
  languages: string[];
};

const careerFields: CareerField[] = [
  {
    name: "Software Engineering",
    languages: [
      "Python",
      "Java",
      "C++",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "React",
    ],
  },
  {
    name: "Data Science",
    languages: [
      "Python",
      "R",
      "Julia",
    ],
  },
];

function Onboarding() {
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  const [selectedLanguages, setSelectedLanguages] =
    useState<string[]>([]);

  const [saving, setSaving] = useState(false);

  function toggleLanguage(language: string) {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((item) => item !== language)
        : [...prev, language]
    );
  }

  function toggleCareer(field: CareerField) {
    const allSelected = field.languages.every((lang) =>
      selectedLanguages.includes(lang)
    );

    if (allSelected) {
      setSelectedLanguages((prev) =>
        prev.filter(
          (lang) => !field.languages.includes(lang)
        )
      );
    } else {
      setSelectedLanguages((prev) => [
        ...new Set([
          ...prev,
          ...field.languages,
        ]),
      ]);
    }
  }

  async function handleFinish() {
    if (selectedLanguages.length === 0) {
      alert("Please select at least one language.");
      return;
    }

    if (loading) {
      return;
    }

    if (!user) {
      alert("User not found.");
      return;
    }

    try {
      setSaving(true);

      const selectedCareerFields = careerFields
        .filter((field) =>
          field.languages.some((language) =>
            selectedLanguages.includes(language)
          )
        )
        .map((field) => field.name);

      await setDoc(
        doc(db, "users", user.uid),
        {
          careerFields: selectedCareerFields,
          languages: selectedLanguages,
          updatedAt: serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(
        "Unable to save your learning preferences."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-4xl rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

        <p className="mb-2 font-semibold text-blue-400">
          Step 2 of 2
        </p>

        <h1 className="text-3xl font-bold text-white">
          Choose What You Want to Learn
        </h1>

        <p className="mt-2 mb-8 text-slate-400">
          Select an entire career field or choose individual
          languages.
        </p>

        <div className="space-y-8">
          {careerFields.map((field) => (
            <div
              key={field.name}
              className="rounded-xl border border-slate-700 bg-slate-800 p-6"
            >
              <label className="flex cursor-pointer items-center gap-3 text-lg font-semibold text-white">

                <input
                  type="checkbox"
                  className="h-5 w-5"
                  checked={field.languages.every((lang) =>
                    selectedLanguages.includes(lang)
                  )}
                  onChange={() =>
                    toggleCareer(field)
                  }
                />

                {field.name}

              </label>

              <div className="mt-5 ml-8 grid grid-cols-2 gap-3 md:grid-cols-3">
                {field.languages.map((language) => (
                  <label
                    key={language}
                    className="flex cursor-pointer items-center gap-2 text-slate-300"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={selectedLanguages.includes(
                        language
                      )}
                      onChange={() =>
                        toggleLanguage(language)
                      }
                    />

                    {language}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-between">

          <button
            onClick={() =>
              navigate("/profile-setup")
            }
            className="rounded-lg border border-slate-600 px-6 py-3 text-white transition hover:bg-slate-800"
          >
            ← Back
          </button>

          <button
            onClick={handleFinish}
            disabled={loading || saving}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Finish →"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default Onboarding;