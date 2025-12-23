"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, ArrowLeft, QrCode, ShieldCheck } from "lucide-react"
import { membershipApi } from "@/lib/api/membershipApi"
import Link from "next/link"

export default function PaymentPage({ params }) {
    const router = useRouter()
    const { id } = params
    const [packageDetails, setPackageDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        // Ideally fetch specific package, but reusing getPackages for now
        const fetchPackage = async () => {
            try {
                const res = await membershipApi.getPackages()
                const pkg = res.data.find(p => p.package_id == id)
                if (pkg) {
                    setPackageDetails(pkg)
                } else {
                    console.error("Package not found")
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchPackage()
    }, [id])

    const handleConfirmTransfer = async () => {
        setProcessing(true)
        try {
            await membershipApi.confirmPayment(id)
            // Success
            router.push("/dashboard?payment=success")
        } catch (error) {
            console.error("Payment failed", error)
            alert(error.response?.data?.message || "Payment failed. Please try again.")
        } finally {
            setProcessing(false)
        }
    }

    if (loading) return <div className="p-8 text-center text-[#a0a0a0]">Loading payment details...</div>
    if (!packageDetails) return <div className="p-8 text-center text-red-500">Package not found</div>

    return (
        <div className="max-w-3xl mx-auto">
            <Link href="/memberships" className="inline-flex items-center text-[#a0a0a0] hover:text-[#f0f0f0] mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Plans
            </Link>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Summary */}
                <div>
                    <h1 className="text-3xl font-bold text-[#f0f0f0] mb-4">Confirm Payment</h1>
                    <p className="text-[#a0a0a0] mb-8">Scan the QR code to pay via Bank Transfer.</p>

                    <div className="bg-[#282828] border border-[#282828] rounded-xl p-6 mb-6">
                        <h3 className="text-lg font-semibold text-[#f0f0f0] mb-4">Order Summary</h3>
                        <div className="flex justify-between mb-2 text-[#a0a0a0]">
                            <span>Plan</span>
                            <span className="text-[#f0f0f0]">{packageDetails.name}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-[#a0a0a0]">
                            <span>Duration</span>
                            <span className="text-[#f0f0f0]">{packageDetails.duration_days} Days</span>
                        </div>
                        <div className="border-t border-[#333] pt-4 flex justify-between items-center">
                            <span className="font-semibold text-[#f0f0f0]">Total</span>
                            <span className="text-2xl font-bold text-[#f0f0f0]">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(packageDetails.price)}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-[#a0a0a0]">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                        <span>Secure payment via Bank Transfer</span>
                    </div>
                </div>

                {/* Right: QR Code */}
                <div className="bg-[#f0f0f0] rounded-xl p-8 flex flex-col items-center justify-center text-center">
                    <div className="bg-white p-2 rounded-lg mb-4 shadow-lg">
                        <img src="/qr-code.png" alt="Payment QR Code" className="w-64 h-auto object-contain" />
                    </div>

                    <p className="text-[#141414] font-medium mb-2">Scan with your Banking App</p>
                    <div className="bg-white/10 w-full p-3 rounded text-sm text-[#141414] mb-6 border border-[#282828]/10">
                        <p className="mb-1 opacity-80">Bank: <span className="font-bold">Techcombank</span></p>
                        <p className="mb-1 opacity-80">Account Name: <span className="font-bold">NGUYEN DO KHANH HUNG</span></p>
                        <p className="mb-1 opacity-80">Account No: <span className="font-bold">1907 5139 7070 10</span></p>
                        <p className="opacity-80">Content: <span className="font-bold">GYM {id} [YourPhone]</span></p>
                    </div>

                    <button
                        onClick={handleConfirmTransfer}
                        disabled={processing}
                        className="w-full py-3 bg-[#141414] hover:bg-[#333] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                        {processing ? "Verifying..." : "I have transferred"}
                        {!processing && <CheckCircle className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        </div>
    )
}
