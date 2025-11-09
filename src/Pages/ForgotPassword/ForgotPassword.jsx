import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import { useLocation, useNavigate } from "react-router";
import useTitle from "../../hooks/useTitle";

const ForgotPassword = () => {
    useTitle("ForgotPassword | ToyVerse");
  const { sendPasswordResetEmailFunc } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Prefill email if coming from login page
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    sendPasswordResetEmailFunc(email)
      .then(() => {
        toast.success("Password reset email sent!");
        // Redirect to Gmail (or the default mail client)
        window.open("https://mail.google.com", "_blank");
        navigate('/auth/login')
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl py-6 px-5 rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-6">
          Reset Your Password
        </h2>
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="label font-semibold text-base-content">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-3"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
