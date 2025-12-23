"use client";

import { useState, useEffect } from "react";
import { Plus, Package, Clock, DollarSign } from "lucide-react";
import managerApi from "@/lib/api/managerApi";
import AddPackageModal from "@/components/manager/AddPackageModal";

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await managerApi.getPackages();
      if (Array.isArray(res)) {
        setPackages(res);
      }
    } catch (error) {
      console.error("Failed to fetch packages", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Membership Packages</h1>
          <p className="text-sm text-gray-400">Manage store packages</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          <Plus className="w-5 h-5" />
          Add Package
        </button>
      </div>

      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.package_id}
              className="bg-[#1A1F26] border border-[#2A2F38] rounded-xl p-6 hover:border-gray-600 transition group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <Package className="w-6 h-6 text-blue-400" />
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${pkg.is_active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {pkg.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{pkg.description}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold text-lg">${Number(pkg.price).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{pkg.duration_days} Days</span>
                </div>
              </div>

              <div className="border-t border-[#2A2F38] pt-4">
                <div className="text-xs text-gray-500 font-mono">CODE: {pkg.code}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <AddPackageModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchPackages}
        />
      )}
    </div>
  );
}
