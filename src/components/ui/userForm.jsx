import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Eye, EyeOff } from "lucide-react";
import useFetchAPI from "../../hooks/useFetchAPI";

export function AddUserDialog({ isOpen, setIsOpen, addUser }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle Role Selection
  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  // Validate Field on Blur
  const validateField = (name, value) => {
    let error = "";

    if (!value.trim()) {
      error = `${name.replace(/([A-Z])/g, " $1")} is required`;
    } else {
      if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Invalid email format";
      }
      if (name === "phone" && !/^\+?[1-9]\d{9,14}$/.test(value)) {
        error = "Invalid phone number format";
      }
      if (name === "password" && value.length < 6) {
        error = "Password must be at least 6 characters";
      }
      if (name === "confirmPassword" && value !== formData.password) {
        error = "Passwords do not match";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Validate Form on Submit
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    addUser({
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
      status: "Active",
    });
    setIsOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      role: "",
      password: "",
      confirmPassword: "",
    })
  };

  const [getLSPCompanyIfSelectedResponse, getLSPCompanyIfSelectedHandler] =
    useFetchAPI(
      {
        url: "/role",
        method: "GET",
      },
      (e) => {
        return e;
      },
      (e) => {
        return e;
      }
    );
  useEffect(() => {
    console.log("eeeeeeeee");

    if (isOpen) {
      getLSPCompanyIfSelectedHandler()
    }
  }, [isOpen])


  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 w-[100%] z-30" />
        <Dialog.Content className="z-40 fixed top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-lg font-semibold">Add New User</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mb-4">
            Create a new user here. Click save when you’re done.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: "firstName", placeholder: "First Name" },
              { name: "lastName", placeholder: "Last Name" },
              { name: "username", placeholder: "Username" },
              { name: "email", placeholder: "Email", type: "email" },
              { name: "phone", placeholder: "Phone Number" },
            ].map(({ name, placeholder, type = "text" }) => (
              <div key={name}>
                <input
                  className={`w-full p-2 border rounded ${errors[name] ? "border-red-500" : ""}`}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                  required
                />
                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
              </div>
            ))}

            {/* Role Selection */}
            <div>
              <select
                className={`w-full p-2 border rounded ${errors.role ? "border-red-500" : ""}`}
                value={formData.role}
                onChange={(e) => handleRoleSelect(e.target.value)}
                onBlur={() => validateField("role", formData.role)}
                required
              >
                <option value="" disabled>
                  Select a role
                </option>
                {["Admin", "Superadmin", "Manager", "Cashier"].map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div>

            {/* Password Fields with Toggle Visibility */}
            {[
              { name: "password", show: showPassword, setShow: setShowPassword, placeholder: "Password" },
              { name: "confirmPassword", show: showConfirmPassword, setShow: setShowConfirmPassword, placeholder: "Confirm Password" },
            ].map(({ name, show, setShow, placeholder }) => (
              <div key={name} className="relative">
                <input
                  className={`w-full p-2 border rounded pr-10 ${errors[name] ? "border-red-500" : ""}`}
                  name={name}
                  type={show ? "text" : "password"}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                  required
                />
                <button type="button" className="absolute right-2 top-2" onClick={() => setShow(!show)}>
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
              </div>
            ))}

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <Dialog.Close asChild>
                <button type="button" className="px-4 py-2 border rounded">Cancel</button>
              </Dialog.Close>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white text-[16px] font-bold rounded disabled:opacity-50"
                disabled={Object.values(errors).some((err) => err) || Object.values(formData).some((val) => !val.trim())}
              >
                Save changes
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
