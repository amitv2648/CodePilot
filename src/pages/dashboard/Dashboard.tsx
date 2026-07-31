import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { getUserPreferences } from "../../services/firebase/user";


function Dashboard() {

  const { user } = useAuth();


  const [languages, setLanguages] =
    useState<string[]>([]);


  useEffect(() => {

    async function loadUserData(){

      if(!user) return;


      const data =
        await getUserPreferences(
          user.uid
        );


      if(data?.selectedLanguages){

        setLanguages(
          data.selectedLanguages
        );

      }

    }


    loadUserData();

  }, [user]);


  return (

    <div>

      <h1>
        Welcome back!
      </h1>


      <p>
        {user?.email}
      </p>


      <h2>
        Your Learning Paths
      </h2>


      {
        languages.length === 0 ? (

          <p>
            No languages selected yet.
          </p>

        ) : (

          languages.map(
            (language) => (

              <div
                key={language}
              >

                <h3>
                  {language}
                </h3>

                <p>
                  Beginner Level
                </p>

                <p>
                  Progress: 0%
                </p>


              </div>

            )
          )

        )
      }



      <h2>
        Recent Learning Sessions
      </h2>


      <p>
        No sessions started yet.
      </p>


    </div>

  );

}


export default Dashboard;