// TODO: Replace mock data with actual API endpoints

export const membershipApi = {
  // Get all available membership packages
  async getPackages() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      success: true,
      data: [
        {
          id: 1,
          name: "Basic Monthly",
          price: 29.99,
          duration: "1 Month",
          durationType: "monthly",
          benefits: ["Access to gym equipment", "Locker access", "Free WiFi"],
          recommended: false,
        },
        {
          id: 2,
          name: "Premium Monthly",
          price: 49.99,
          duration: "1 Month",
          durationType: "monthly",
          benefits: ["All Basic benefits", "Group classes", "Free towel service", "1 PT session/month"],
          recommended: true,
        },
        {
          id: 3,
          name: "Premium Quarterly",
          price: 129.99,
          duration: "3 Months",
          durationType: "quarterly",
          benefits: ["All Premium benefits", "Save 10%", "Priority booking"],
          recommended: false,
        },
        {
          id: 4,
          name: "Elite Annual",
          price: 499.99,
          duration: "12 Months",
          durationType: "annual",
          benefits: ["All Premium benefits", "Save 20%", "4 PT sessions/month", "Nutrition consultation"],
          recommended: false,
        },
      ],
    }
  },

  // Get current user's membership status
  async getStatus() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      success: true,
      data: {
        status: "Active", // Active, Expired, Pending Verification, None
        packageName: "Premium Monthly",
        startDate: "2024-01-15",
        endDate: "2024-02-15",
        daysRemaining: 5,
        autoRenew: true,
      },
    }
  },

  // Create a new membership purchase
  async createPurchase(data) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      success: true,
      data: {
        transactionId: "TXN" + Date.now(),
        packageId: data.packageId,
        paymentMethod: data.paymentMethod,
        amount: data.amount,
        status: "Pending",
        createdAt: new Date().toISOString(),
      },
    }
  },
}
