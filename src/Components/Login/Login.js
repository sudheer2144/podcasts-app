import React, { useState } from "react";
import InputComponent from "../Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";
import Button from "../Button";
import LoadingButton from "../Button/LoadingButton";

const Login = () => {
  const [email, setEmail] = useState("sudheer@mail.com");
  const [password, setPassword] = useState("12345678");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleClick() {
    if (email && password) {
      try {
        setLoading(true);

        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredentials.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));

        const userData = userDoc.data();

        dispatch(setUser(userData));

        toast.success(`Welcome ${userData.name}.`);

        navigate("/");
      } catch (error) {
        setLoading(false);
        toast.error("Login failed. Try again !");
        setPassword("");
      }
    } else {
      toast.info("Enter valid values !");
      setLoading(false);
    }
  }

  return (
    <>
      <h2>Login</h2>
      <InputComponent
        type={"email"}
        value={email}
        setState={setEmail}
        placeholder={"Email"}
      />
      <InputComponent
        type={"password"}
        value={password}
        setState={setPassword}
        placeholder={"Password"}
      />
      {
        // loading ? <Loader height={"39px"} /> :
        // <Button text={"Login"} handleClick={handleClick} loading={loading} />
        <LoadingButton onClcik={handleClick} loading={loading} text={"Login"} />
      }
    </>
  );
};

export default Login;
