import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
    Eye,
    EyeOff,
    MessageSquare,
    User,
    Mail,
    Lock,
    Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

export default function SignupPage() {
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { signup, isSigninUp } = useAuthStore();

    // validate form
    const validationForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email))
            return toast.error("Invalid Email format");
        if (!formData.password.trim()) return toast.error("Passwordis required");
        if (formData.password.length < 6)
            return toast.error("Password must be 6 charcter long");

        return true
    };

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validationForm();
        if (success === true) {
            signup(formData)
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* left side page */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* logo of web */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <MessageSquare className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-4">Create Account</h1>
                            <p className="text-base-content/60 text-sm">
                                Get started with your free account
                            </p>
                        </div>
                    </div>

                    {/* form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <User className="w-5 h-5 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    className="input input-bordered w-full pl-10"
                                    placeholder="Enter Name"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, fullName: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <Mail className="w-5 h-5 text-gray-500" />
                                </div>
                                <input
                                    type="email"
                                    className="input input-bordered w-full pl-10"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <Lock className="w-5 h-5 text-gray-500" />
                                </div>
                                <input
                                    type={showPass ? "text" : "password"}
                                    className="input input-bordered w-full pl-10"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {showPass ? (
                                        <EyeOff className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isSigninUp}
                        >
                            {isSigninUp ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* right side */}
            <AuthImagePattern
                title="Join Our community"
                subtitle="Connect with friends,share moments,and saty in touch with your loved ones"
            />
        </div>
    );
}
