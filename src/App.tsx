import React, { useState, useEffect } from "react";
import axios from "axios";

const App: React.FC = () => {
  type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };

  type GetUsersResponse = {
    data: User[];
  };

  const [userData, setUserData] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<GetUsersResponse>(
          "https://reqres.in/api/users"
        );
        setUserData(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    }

    fetchData();
  }, []);

  return (
    <main className='h-screen flex items-center flex-col'>
      <h1 className='text-3xl text-blue-600 py-20'>
        React + Spring Boot starter
      </h1>
      {error ? (
        <h1>Error: {error}</h1>
      ) : (
        <div className='flex justify-between w-1/3 px-24'>
          <div>
            <h1>Axios fetching result:</h1>
            <div>
              {userData.map((user) => (
                <div key={user.id} className='my-2'>
                  <h3>
                    User ID: {user.id} Name:{" "}
                    {`${user.first_name} ${user.last_name}`}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <div className='underline'>
            <a href='/react-router-test'>Click to test react router</a>
          </div>
        </div>
      )}
    </main>
  );
};

export default App;
