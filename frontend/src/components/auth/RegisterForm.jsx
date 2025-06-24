import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toast";
import { Mail, Lock, User } from "lucide-react";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pregnancyWeek, setPregnancyWeek] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password && password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!pregnancyWeek) newErrors.pregnancyWeek = "Pregnancy week is required";
    if (
      pregnancyWeek &&
      (isNaN(pregnancyWeek) || pregnancyWeek < 1 || pregnancyWeek > 42)
    ) {
      newErrors.pregnancyWeek = "Enter a valid week (1-42)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await register({ name, email, password, pregnancyWeek });
      showToast.success("Registered successfully");
      navigate("/");
    } catch (error) {
      showToast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-10 max-w-xl w-full flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">BabySteps</h1>
        <p className="text-gray-600">Create your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full pl-4 pr-4 py-3 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full pl-4 pr-4 py-3 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full pl-4 pr-4 py-3 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pregnancy Week
          </label>
          <input
            type="number"
            min="1"
            max="42"
            value={pregnancyWeek}
            onChange={(e) => setPregnancyWeek(e.target.value)}
            className={`w-full pr-4 py-3 border ${
              errors.pregnancyWeek ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
            placeholder="Enter your current week"
          />
          {errors.pregnancyWeek && (
            <p className="mt-1 text-sm text-red-600">{errors.pregnancyWeek}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pregnancy Week
          </label>
          <input
            type="number"
            min="1"
            max="42"
            value={pregnancyWeek}
            onChange={(e) => setPregnancyWeek(e.target.value)}
            className={`w-full pr-4 py-3 border ${
              errors.pregnancyWeek ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
            placeholder="Enter your current week"
          />
          {errors.pregnancyWeek && (
            <p className="mt-1 text-sm text-red-600">{errors.pregnancyWeek}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          Already have an account?{" "}
          <a
            href="/login"
            className="text-pink-500 hover:text-pink-700 font-medium"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};
