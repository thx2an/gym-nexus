"use client"

import { useState, useEffect } from "react"
import { CreditCard, Download, X, Calendar, DollarSign } from "lucide-react"
import { paymentApi } from "@/lib/api/paymentApi"

export default function PaymentsPage() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    loadPayments()
  }, [])

  const loadPayments = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await paymentApi.getHistory()
      if (response.success) {
        setPayments(response.data)
      } else {
        setError("Failed to load payment history")
      }
    } catch (err) {
      setError("An error occurred while loading payments")
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadInvoice = async (transactionId) => {
    try {
      setDownloading(true)
      await paymentApi.downloadInvoice(transactionId)
    } catch (err) {
      console.error("Failed to download invoice", err)
    } finally {
      setDownloading(false)
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      Success: "bg-green-500/10 text-green-500 border-green-500/20",
      Failed: "bg-red-500/10 text-red-500 border-red-500/20",
      Pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    }
    return (
      <span className={`px-3 py-1 rounded-lg border text-xs font-semibold ${styles[status] || styles.Pending}`}>
        {status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#282828] border-t-[#f0f0f0] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a0a0a0]">Loading payments...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-[#282828] rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="h-8 w-8 text-[#606060]" />
          </div>
          <h3 className="text-xl font-semibold text-[#f0f0f0] mb-2">Failed to Load Payments</h3>
          <p className="text-[#a0a0a0] mb-6">{error}</p>
          <button
            onClick={loadPayments}
            className="px-6 py-2.5 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Payment History</h1>
          <p className="text-[#a0a0a0]">View your transaction history and download invoices</p>
        </div>

        {payments.length === 0 ? (
          <div className="bg-[#282828] border border-[#282828] rounded-lg p-12 text-center">
            <CreditCard className="h-12 w-12 text-[#606060] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">No payment history</h3>
            <p className="text-[#a0a0a0]">Your transactions will appear here</p>
          </div>
        ) : (
          <div className="bg-[#282828] border border-[#282828] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#141414] border-b border-[#000000]">
                  <tr>
                    <th className="text-left px-6 py-4 text-[#a0a0a0] font-semibold text-sm">Date</th>
                    <th className="text-left px-6 py-4 text-[#a0a0a0] font-semibold text-sm">Package</th>
                    <th className="text-left px-6 py-4 text-[#a0a0a0] font-semibold text-sm">Amount</th>
                    <th className="text-left px-6 py-4 text-[#a0a0a0] font-semibold text-sm">Method</th>
                    <th className="text-left px-6 py-4 text-[#a0a0a0] font-semibold text-sm">Status</th>
                    <th className="text-right px-6 py-4 text-[#a0a0a0] font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr
                      key={payment.id}
                      onClick={() => setSelectedPayment(payment)}
                      className={`cursor-pointer hover:bg-[#1E1E1E] transition-colors ${index !== payments.length - 1 ? "border-b border-[#282828]" : ""}`}
                    >
                      <td className="px-6 py-4 text-[#f0f0f0]">
                        {new Date(payment.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-[#f0f0f0]">{payment.packageName}</td>
                      <td className="px-6 py-4 text-[#f0f0f0] font-semibold">${payment.amount}</td>
                      <td className="px-6 py-4 text-[#a0a0a0]">{payment.method}</td>
                      <td className="px-6 py-4">{getStatusBadge(payment.status)}</td>
                      <td className="px-6 py-4 text-right">
                        {payment.status === "Success" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDownloadInvoice(payment.id)
                            }}
                            disabled={downloading}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                          >
                            <Download className="h-4 w-4" />
                            Invoice
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Payment Detail Drawer */}
      {selectedPayment && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSelectedPayment(null)} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#141414] border-l border-[#282828] z-50 overflow-y-auto">
            <div className="sticky top-0 bg-[#141414] border-b border-[#282828] p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#f0f0f0]">Transaction Details</h2>
              <button
                onClick={() => setSelectedPayment(null)}
                className="p-2 hover:bg-[#282828] rounded-lg transition-colors text-[#f0f0f0]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center pb-6 border-b border-[#282828]">
                <div className="w-16 h-16 bg-[#282828] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-[#f0f0f0]" />
                </div>
                <div className="text-4xl font-bold text-[#f0f0f0] mb-2">${selectedPayment.amount}</div>
                {getStatusBadge(selectedPayment.status)}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-[#282828] rounded-lg">
                  <Calendar className="h-5 w-5 text-[#606060]" />
                  <div>
                    <div className="text-xs text-[#606060] mb-1">Date</div>
                    <div className="text-[#f0f0f0] font-medium">
                      {new Date(selectedPayment.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[#282828] rounded-lg">
                  <DollarSign className="h-5 w-5 text-[#606060]" />
                  <div>
                    <div className="text-xs text-[#606060] mb-1">Payment Method</div>
                    <div className="text-[#f0f0f0] font-medium">{selectedPayment.method}</div>
                  </div>
                </div>

                <div className="p-4 bg-[#282828] rounded-lg">
                  <div className="text-xs text-[#606060] mb-1">Package Details</div>
                  <div className="text-[#f0f0f0] font-medium">{selectedPayment.packageName}</div>
                </div>
              </div>

              {selectedPayment.status === "Success" && (
                <button
                  onClick={() => handleDownloadInvoice(selectedPayment.id)}
                  disabled={downloading}
                  className="w-full px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Download className="h-5 w-5" />
                  {downloading ? "Downloading..." : "Download Invoice"}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
