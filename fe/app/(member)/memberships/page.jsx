"use client"

import { useState, useEffect } from "react"
import { Package, Search, Check } from "lucide-react"
import { membershipApi } from "@/lib/api/membershipApi"
import Link from "next/link"

export default function PackagesPage() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadPackages()
  }, [])

  const loadPackages = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await membershipApi.getPackages()
      if (response.success) {
        setPackages(response.data)
      } else {
        setError("Failed to load packages")
      }
    } catch (err) {
      setError("An error occurred while loading packages")
    } finally {
      setLoading(false)
    }
  }

  const filteredPackages = packages.filter((pkg) => pkg.name.toLowerCase().includes(searchTerm.toLowerCase()))

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#282828] border-t-[#f0f0f0] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a0a0a0]">Loading packages...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-[#282828] rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-[#606060]" />
          </div>
          <h3 className="text-xl font-semibold text-[#f0f0f0] mb-2">Failed to Load Packages</h3>
          <p className="text-[#a0a0a0] mb-6">{error}</p>
          <button
            onClick={loadPackages}
            className="px-6 py-2.5 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Membership Packages</h1>
        <p className="text-[#a0a0a0]">Choose the perfect membership plan for your fitness journey</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#606060]" />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#282828] border border-[#282828] rounded-lg text-[#f0f0f0] placeholder-[#606060] focus:outline-none focus:border-[#f0f0f0] transition-colors"
          />
        </div>
      </div>

      {filteredPackages.length === 0 ? (
        <div className="text-center py-12 bg-[#282828] rounded-lg border border-[#282828]">
          <Package className="h-12 w-12 text-[#606060] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">No packages found</h3>
          <p className="text-[#a0a0a0]">Try adjusting your search</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-[#282828] border rounded-lg p-6 hover:bg-[#1E1E1E] transition-all ${
                pkg.recommended ? "border-[#f0f0f0]" : "border-[#282828]"
              }`}
            >
              {pkg.recommended && (
                <div className="inline-block px-3 py-1 bg-[#f0f0f0] text-[#141414] text-xs font-semibold rounded-full mb-4">
                  RECOMMENDED
                </div>
              )}

              <h3 className="text-2xl font-bold text-[#f0f0f0] mb-2">{pkg.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-[#f0f0f0]">${pkg.price}</span>
                <span className="text-[#a0a0a0]">/ {pkg.duration}</span>
              </div>

              <div className="space-y-3 mb-6">
                {pkg.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#f0f0f0] flex-shrink-0 mt-0.5" />
                    <span className="text-[#a0a0a0] text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/payments/checkout?packageId=${pkg.id}`}
                className="block w-full px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] text-center rounded-lg font-medium transition-colors"
              >
                Select Plan
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
