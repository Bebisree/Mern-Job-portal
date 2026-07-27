import { useState } from "react";
import API from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const res = await API.post("/auth/login", {
      email,
      password
    });
console.log(res.data);
console.log(res.data.user);
    if (res.data.success) {

      localStorage.setItem("token", res.data.token);

      // IMPORTANT
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      window.location.href = "/";

    }

  } catch (error) {

    console.log(error.response?.data);

    alert(error.response?.data?.message);

  }

};



  return (
    <div>

      <h1>Login Page</h1>


      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />


        <br/>


        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />


        <br/>


        <button type="submit">
          Login
        </button>


      </form>

    </div>
  );
}

export default Login;