"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { paymentApi } from "@/lib/api/paymentApi"
import { Printer } from "lucide-react"

export default function InvoicePage() {
    const router = useRouter()
    const { id } = useParams()
    const [invoice, setInvoice] = useState(null)
    const [loading, setLoading] = useState(true)
    const [unauthorized, setUnauthorized] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const res = await paymentApi.getInvoice(id)
                if (res.success) {
                    setInvoice(res.data)
                    setErrorMessage("")
                }
            } catch (error) {
                console.error("Failed to load invoice", error)
                const message = String(error?.message || "")
                if (message.toLowerCase() === "unauthorized") {
                    setUnauthorized(true)
                    return
                }
                setErrorMessage(message || "Invoice not found")
            } finally {
                setLoading(false)
            }
        }
        fetchInvoice()
    }, [id])

    useEffect(() => {
        if (unauthorized) {
            router.replace("/dashboard")
        }
    }, [unauthorized, router])

    if (unauthorized) return null
    if (loading) return <div className="p-8 text-[#f0f0f0]">Loading Invoice...</div>
    if (!invoice) return <div className="p-8 text-red-500">{errorMessage || "Invoice not found"}</div>

    return (
        <div className="min-h-screen bg-white text-black p-8 font-serif">
            {/* Print Button - Hidden on Print */}
            <div className="max-w-3xl mx-auto mb-6 flex justify-end print:hidden">
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                >
                    <Printer size={18} />
                    Print Invoice
                </button>
            </div>

            {/* Invoice Content */}
            <div className="max-w-3xl mx-auto border p-12 shadow-sm print:shadow-none print:border-none">
                {/* Header */}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">INVOICE</h1>
                        <p className="text-gray-500">#{invoice.invoice_number}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold text-gray-800">Gym Nexus</h2>
                        <p className="text-sm text-gray-600">123 Fitness Street</p>
                        <p className="text-sm text-gray-600">Hanoi, Vietnam</p>
                        <p className="text-sm text-gray-600">support@gymnexus.com</p>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                    <div>
                        <h3 className="font-bold text-gray-400 text-sm uppercase mb-2">Bill To</h3>
                        <p className="font-bold text-lg">{invoice.customer_name}</p>
                        <p className="text-gray-600">{invoice.customer_email}</p>
                    </div>
                    <div className="text-right">
                        <div className="mb-4">
                            <h3 className="font-bold text-gray-400 text-sm uppercase mb-1">Date Issued</h3>
                            <p className="font-medium">{new Date(invoice.issued_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-400 text-sm uppercase mb-1">Payment Method</h3>
                            <p className="font-medium capitalize">{invoice.payment_method}</p>
                        </div>
                    </div>
                </div>

                {/* Line Items */}
                <table className="w-full mb-12">
                    <thead>
                        <tr className="border-b-2 border-black">
                            <th className="text-left py-3 font-bold uppercase text-sm">Description</th>
                            <th className="text-right py-3 font-bold uppercase text-sm">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="py-4 font-medium">{invoice.package_name} Membership</td>
                            <td className="py-4 text-right font-medium">{Number(invoice.total_amount).toLocaleString()} VND</td>
                        </tr>
                    </tbody>
                </table>

                {/* Total */}
                <div className="flex justify-end mb-12">
                    <div className="w-1/2">
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">{Number(invoice.total_amount).toLocaleString()} VND</span>
                        </div>
                        <div className="flex justify-between py-4">
                            <span className="text-xl font-bold">Total</span>
                            <span className="text-xl font-bold">{Number(invoice.total_amount).toLocaleString()} VND</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t pt-8 text-center text-gray-500 text-sm">
                    <p>Thank you for choosing Gym Nexus!</p>
                    <p className="mt-1">For questions, contact us at support@gymnexus.com</p>
                </div>
            </div>
        </div>
    )
}
