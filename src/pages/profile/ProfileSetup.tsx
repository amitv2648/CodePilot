import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebase";
import { useAuth } from "../../context/AuthContext";

function ProfileSetup() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    if (!firstName || !lastName || !gradeLevel) {
      alert("Please complete all fields.");
      return;
    }

    if (!user) {
      alert("User not found.");
      return;
    }
    try {
      setLoading(true);
      await setDoc(
        doc(db, "users", user.uid),
        {
          firstName,
          lastName,
          gradeLevel,
          email: user.email,
        },
        { merge: true }
      );

      navigate("/onboarding");
    } catch (error) {
      console.error(error);
      alert("Unable to save profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">

      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-8 shadow-xl">

        <p className="text-blue-400 font-semibold mb-2">
          Step 1 of 2
        </p>

        <h1 className="text-3xl font-bold text-white mb-2">
          Tell us about yourself
        </h1>

        <p className="text-slate-400 mb-8">
          We'll personalize your learning experience.
        </p>

        <div className="space-y-5">

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              First Name
            </label>

            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Last Name
            </label>

            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Grade Level
            </label>

            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
            >
              <option value="">Select Grade</option>

              <option>6th Grade</option>
              <option>7th Grade</option>
              <option>8th Grade</option>

              <option>9th Grade (Freshman)</option>
              <option>10th Grade (Sophomore)</option>
              <option>11th Grade (Junior)</option>
              <option>12th Grade (Senior)</option>

              <option>College Freshman</option>
              <option>College Sophomore</option>
              <option>College Junior</option>
              <option>College Senior</option>

              <option>Other</option>
            </select>
          </div>

          <button
            onClick={handleContinue}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition py-3 font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Continue →"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProfileSetup;