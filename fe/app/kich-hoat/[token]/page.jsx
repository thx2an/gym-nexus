"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Toast from "@/components/common/Toast";

export default function ActivationPage() {
    const params = useParams();
    const router = useRouter();
    const [status, setStatus] = useState("loading"); // loading, success, error
    const [message, setMessage] = useState("");
    const [toast, setToast] = useState({ show: false, message: "", type: "info" });

    useEffect(() => {
        const activateAccount = async () => {
            const token = params.token;

            if (!token) {
                setStatus("error");
                setMessage("Token not found.");
                return;
            }

            try {
                const res = await axios.post("http://127.0.0.1:8000/api/kich-hoat", {
                    hash_active: token
                });

                if (res.data.status) {
                    setStatus("success");
                    setMessage(res.data.message || "Account activated successfully!");
                    showToast(res.data.message || "Account activated successfully!", "success");

                    // Redirect to login after 3 seconds
                    setTimeout(() => {
                        router.push("/auth/login");
                    }, 3000);
                } else {
                    setStatus("error");
                    setMessage(res.data.message || "Activation failed.");
                    showToast(res.data.message || "Activation failed.", "error");
                }
            } catch (error) {
                console.error(error);
                const msg = error.response?.data?.message || "An error occurred during activation.";
                setStatus("error");
                setMessage(msg);
                showToast(msg, "error");
            }
        };

        activateAccount();
    }, [params.token, router]);

    const showToast = (message, type) => {
        setToast({ show: true, message, type });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Account Activation
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                    {status === "loading" && (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                            <p className="text-gray-600">Activating your account...</p>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="text-green-600">
                            <svg className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <h3 className="text-lg font-medium">Activation Successful!</h3>
                            <p className="mt-2 text-sm text-gray-500">{message}</p>
                            <p className="mt-4 text-sm text-gray-400">Redirecting to login...</p>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="text-red-600">
                            <svg className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <h3 className="text-lg font-medium">Activation Failed</h3>
                            <p className="mt-2 text-sm text-gray-500">{message}</p>
                            <button
                                onClick={() => router.push("/auth/login")}
                                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                            >
                                Go to Login
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Toast
                show={toast.show}
                message={toast.message}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </div>
    );
}
