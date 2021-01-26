import React from 'react'
import { SignUp } from './screens';
import { signUpService } from './services/authService';

function App() {
  const login = async () => {
    const response = await signUpService()
    console.log(response)
  }

  return (
    <div className="App">
      <SignUp />

      <button onClick={login}>Register</button>
    </div>
  );
}

export default App;
