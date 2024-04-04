import { useState } from "react";

import Login from "./Login";
import Signup_Parent from "./Signup_Parent";

const Auth = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (state, value) => {
    switch (state) {
      case "first":
        setFirstName(value);
        break;
      case "last":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        console.log("Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const response = await (
        await fetch("http://localhost:8081/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first: firstName,
            last: lastName,
            first: firstName,
            last: lastName,
            email: email,
            password: password,
            password: password,
          }),
        })
      ).json();
      console.log(response);
      props.updateToken(response.Token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async () => {
    try {
      // Fetch from the parent account login route
      const parentResponse = await fetch("http://localhost:8081/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      // Check if the parent account login was successful
      if (parentResponse.ok) {
        const parentData = await parentResponse.json();
        console.log("Parent account login successful:", parentData);
        props.updateToken(parentData.token);
        props.setUserId(parentData.user.id);
        return; // Exit the function if parent login was successful
      }
  
      // Fetch from the child account login route
      const childResponse = await fetch("http://localhost:8081/user/login_child", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      // Check if the child account login was successful
      if (childResponse.ok) {
        const childData = await childResponse.json();
        console.log("Child account login successful:", childData);
        props.updateChildToken(childData.token);
        props.setUserId(childData.user.id);
        return; // Exit the function if child login was successful
      }
  
      // Handle case where neither parent nor child login was successful
      throw new Error('Failed to login. Please check your credentials.');
    } catch (err) {
      console.log(err);
      // Handle error, show error message to the user, etc.
    }
  };
  return (
    <>
      <Signup_Parent handleSignup={handleSignup} handleChange={handleChange} />
      <Login handleLogin={handleLogin} handleChange={handleChange} />
    </>
  );
};

export default Auth;
