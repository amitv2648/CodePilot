import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { saveUserPreferences } from "../../services/firebase/user";


const learningOptions = {
  "Software Engineering": [
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "TypeScript",
  ],

  "Web Development": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
  ],

  "Artificial Intelligence": [
    "Python",
    "R",
    "Julia",
  ],

  "Game Development": [
    "C++",
    "C#",
    "Lua",
  ],

  "Embedded Systems / Robotics": [
    "C",
    "C++",
    "Rust",
    "Assembly",
  ],
};


function Onboarding() {

  const navigate = useNavigate();

  const { user } = useAuth();


  const [selected, setSelected] =
    useState<string[]>([]);


  function toggleSelection(
    item: string
  ) {

    if (selected.includes(item)) {

      setSelected(
        selected.filter(
          (x) => x !== item
        )
      );

    } else {

      setSelected([
        ...selected,
        item
      ]);

    }

  }


  function toggleCareer(
    languages: string[]
  ) {

    const allSelected =
      languages.every(
        (language) =>
          selected.includes(language)
      );


    if (allSelected) {

      setSelected(
        selected.filter(
          (item) =>
            !languages.includes(item)
        )
      );

    } else {

      setSelected([
        ...new Set([
          ...selected,
          ...languages
        ])
      ]);

    }

  }


  async function handleContinue() {

    if (!user) {
      navigate("/login");
      return;
    }


    await saveUserPreferences(
      user.uid,
      selected
    );


    navigate("/dashboard");

  }


  return (

    <div>

      <h1>
        Choose What You Want To Learn
      </h1>


      {
        Object.entries(
          learningOptions
        ).map(
          ([career, languages]) => (

            <div key={career}>


              <h2>

                <label>

                  <input
                    type="checkbox"
                    checked={
                      languages.every(
                        (language) =>
                          selected.includes(language)
                      )
                    }
                    onChange={() =>
                      toggleCareer(languages)
                    }
                  />

                  {" "}
                  {career}

                </label>

              </h2>


              <div>

                {
                  languages.map(
                    (language) => (

                      <div key={language}>

                        <label>

                          <input
                            type="checkbox"
                            checked={
                              selected.includes(
                                language
                              )
                            }
                            onChange={() =>
                              toggleSelection(
                                language
                              )
                            }
                          />

                          {" "}
                          {language}

                        </label>

                      </div>

                    )
                  )
                }

              </div>


            </div>

          )
        )
      }


      <h3>
        Selected Languages:
      </h3>


      <p>
        {
          selected.length > 0
            ? selected.join(", ")
            : "Nothing selected yet"
        }
      </p>


      <button
        onClick={handleContinue}
      >
        Continue to Dashboard
      </button>


    </div>

  );

}


export default Onboarding;