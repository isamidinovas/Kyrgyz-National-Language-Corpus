import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    let formatted = digits;

    if (digits.length > 0 && !digits.startsWith("996")) {
      if (digits.startsWith("0")) {
        formatted = "996" + digits.substring(1);
      } else {
        formatted = "996" + digits;
      }
    }

    if (formatted.length > 3) {
      formatted = formatted.substring(0, 3) + " " + formatted.substring(3);
    }
    if (formatted.length > 7) {
      formatted = formatted.substring(0, 7) + " " + formatted.substring(7);
    }
    if (formatted.length > 11) {
      formatted = formatted.substring(0, 11) + " " + formatted.substring(11);
    }

    return "+" + formatted.substring(0, 13);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      phone: formatted,
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      confirmPassword: value,
    }));

    // Real-time password validation
    if (value && formData.password !== value) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Сыр сөздөр дал келбейт",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email талап кылынат";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Туура email жазыңыз";
    }

    if (!formData.password) {
      newErrors.password = "Сыр сөз талап кылынат";
    } else if (formData.password.length < 6) {
      newErrors.password = "Сыр сөз 6 символдон көп болушу керек";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Сыр сөздөр дал келбейт";
    }

    if (!acceptTerms) {
      newErrors.terms = "Шарттарды кабыл алуу керек";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      alert("Ийгиликтүү катталдыңыз! Электрондук почтаңызды текшериңиз.");
      setIsLoading(false);
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
      setAcceptTerms(false);
      setErrors({});
    }, 2000);
  };

  const showLogin = () => {
    alert("Кируу бетине өтүү...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md relative overflow-hidden">
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-400 to-red-500"></div>
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Катталуу</h1>
          <p className="text-gray-600 text-lg">Жаңы аккаунт түзүү</p>
        </div>
        {/* Form */}
        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Электрондук почта
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-5 py-4 border-2 rounded-xl text-base transition-all duration-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="email@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        {/* Password */}
        <div>
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Сыр сөз
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-5 py-4 border-2 rounded-xl text-base transition-all duration-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.password ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Сыр сөзүңүздү жазыңыз"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        {/* Confirm Password */}
        <div>
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Сыр сөздү ырастоо
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={`w-full px-5 py-4 border-2 rounded-xl text-base transition-all duration-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.confirmPassword
                ? "border-red-500"
                : formData.confirmPassword &&
                  formData.password === formData.confirmPassword
                ? "border-blue-500"
                : "border-gray-200"
            }`}
            placeholder="Сыр сөзүңүздү кайталаңыз"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full mt-5 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-base font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? "Каттоо жүрүп жатат..." : "Катталуу"}
        </button>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Мурунтан аккаунтуңуз барбы?{" "}
            <NavLink
              to="/signIn"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Кируу
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
