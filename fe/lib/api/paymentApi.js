// TODO: Replace mock data with actual API endpoints

export const paymentApi = {
  // Get payment history
  async getHistory() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      success: true,
      data: [
        {
          id: 1,
          date: "2024-01-15",
          amount: 49.99,
          method: "Credit Card",
          packageName: "Premium Monthly",
          status: "Success",
          invoiceUrl: "/invoices/INV-001.pdf",
        },
        {
          id: 2,
          date: "2023-12-15",
          amount: 49.99,
          method: "Credit Card",
          packageName: "Premium Monthly",
          status: "Success",
          invoiceUrl: "/invoices/INV-002.pdf",
        },
        {
          id: 3,
          date: "2023-11-20",
          amount: 29.99,
          method: "Bank Transfer",
          packageName: "Basic Monthly",
          status: "Pending",
          invoiceUrl: null,
        },
        {
          id: 4,
          date: "2023-10-10",
          amount: 49.99,
          method: "Credit Card",
          packageName: "Premium Monthly",
          status: "Failed",
          invoiceUrl: null,
        },
      ],
    }
  },

  // Download invoice (mocked)
  async downloadInvoice(transactionId) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Mock PDF download
    const blob = new Blob(["Mock PDF content for transaction " + transactionId], { type: "application/pdf" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `invoice-${transactionId}.pdf`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
    return { success: true }
  },
}
