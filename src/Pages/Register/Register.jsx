import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import useTitle from "../../hooks/useTitle";

const Register = () => {
  useTitle("Register | ToyVerse");
  const navigate = useNavigate();
  const {
    createUserWithEmailAndPasswordFunc,
    signInWithGoogleFunc,
    setUser,
    updateProfileFunc,
    setLoading


  } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [Error, setError] = useState('');
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(e.target);
    const form = e.target;
    const name = form.name.value;

    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error("Password must have at least 1 uppercase, 1 lowercase letter, and be 6+ characters long.");
      setError('Password must have at least 1 uppercase, 1 lowercase letter, and be 6+ characters long.')
      return;
    }
    setError(""),
      console.log({ name, photo, email, password });
    createUserWithEmailAndPasswordFunc(email, password)
      .then((res) => {

        const user = res.user;
        updateProfileFunc({ displayName: name, photoURL: photo })
          .then(() => {
            console.log(user);
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
            toast.success("Register Successful!");
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setUser(user);
          });


      })
      .catch((e) => {
        console.log(e);
        console.log(e.code);
        if (e.code === "auth/email-already-in-use") {
          toast.error(
            "User already exists in the database. Etai bastob haahahahaha"
          );
        } else if (e.code === "auth/weak-password") {
          toast.error("Bhai tomake at least 6 ta digit er pass dite hobe");
        } else if (e.code === "auth/invalid-email") {
          toast.error("Invalid email format. Please check your email.");
        } else if (e.code === "auth/user-not-found") {
          toast.error("User not found. Please sign up first.");
        } else if (e.code === "auth/wrong-password") {
          toast.error("Wrong password. Please try again.");
        } else if (e.code === "auth/user-disabled") {
          toast.error("This user account has been disabled.");
        } else if (e.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Please try again later.");
        } else if (e.code === "auth/operation-not-allowed") {
          toast.error("Operation not allowed. Please contact support.");
        } else if (e.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error(e.message || "An unexpected error occurred.");
        }
      });
  };

  const handleGoogleSignin = () => {
    signInWithGoogleFunc()
      .then((res) => {
        setUser(res.user);
        setLoading(false);
        toast.success("Google Sign-in successful!");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card bg-base-100 w-full max-w-md md:max-w-lg lg:max-w-xl shadow-2xl py-6 px-5 sm:px-8 rounded-lg">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-primary mb-6">
          Register your account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label flex justify-items-start font-semibold text-base-content">Name</label>
            <input
              name="name"
              type="text"
              className="input input-bordered w-full"
              placeholder="Name"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="label flex justify-items-start font-semibold text-base-content">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input input-bordered w-full"
              placeholder="Photo URL"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="label flex justify-items-start font-semibold text-base-content">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="label flex justify-items-start font-semibold text-base-content">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full pr-10 text-base-content placeholder-base-content/50"
              required
            />
            <span
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-[8px] top-[40px]  transform -translate-y-[20%] cursor-pointer text-base-content/70 hover:text-primary transition-colors z-10"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>
          {Error && <p className="text-xs text-error">{Error}</p>}

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-3">
            Register
          </button>

          {/* OR Divider */}
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-px w-16 bg-base-content/20"></div>
            <span className="text-sm text-base-content/50">or</span>
            <div className="h-px w-16 bg-base-content/20"></div>
          </div>

          {/* Google Signin */}
          <button onClick={handleGoogleSignin}
            type="button"
            className="flex items-center justify-center gap-3 w-full py-2 px-5 bg-pink-100 text-gray-800 rounded-lg font-semibold hover:bg-pink-200 transition-colors"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Login Link */}
          <p className="text-center font-semibold pt-5 text-sm sm:text-base">
            Already Have An Account?{" "}
            <Link className="text-secondary font-bold" to="/auth/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>

  );
};

export default Register;