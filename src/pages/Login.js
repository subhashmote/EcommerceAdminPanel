import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";
import { login } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";



let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state);
  // console.log(authState);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading]);

  return (
    <div className="py-5" style={{ background: "#1677ff", minHeight: "100vh" }}>
      <div className="py-5" style={{ background: "#1677ff", minHeight: "100vh" }}>
        <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
          <h3 className="text-center title">Login</h3>
          <p className="text-center">Login to your account to continue.</p>
          <div className="error text-center">
            {message.message == "Rejected" ? "You are not an Admin" : ""}
          </div>
          <form action='' onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Email Address"
              id="email"
              name="email"
              onChng={formik.handleChange("email")}
              onBlr={formik.handleBlur("email")}
              val={formik.values.email}
            />

            <div className="error mt-2">
              {formik.touched.email && formik.errors.email}
            </div>

            <CustomInput
              type="password"
              ype="password"
              label="Password"
              id="pass"
              name="password"
              onChng={formik.handleChange("password")}
              onBlr={formik.handleBlur("password")}
              val={formik.values.password}
            />

            <div className="error mt-2">
              {formik.touched.password && formik.errors.password}
            </div>

            
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
              style={{ background: "#1677ff" }}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login