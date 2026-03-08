import { useState, useEffect, useRef } from "react";
import {
  Search,
  Filter,
  UserCheck,
  Shield,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  Building2,
  CheckCircle2,
  Lock,
  ArrowUpCircle,
  Link as LinkIcon,
  Home
} from "lucide-react";
import { usersApi } from "@/services/api";
import type { User } from "@/services/mockFn";
import { cn } from "@/utils/cn";
import { getInitials } from "@/utils/format";
import { BigHeader } from "@/components/ui/Typography";
import { mockDatabase } from "@/data/mockDatabase";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";

export function LandlordsPage() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [activeTierFilters, setActiveTierFilters] = useState<string[]>(["all"]);
  const [activeVerification, setActiveVerification] = useState<string>("all");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadData();
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const users = await usersApi.getAll("LANDLORD");
      setData(users);
    } catch (error) {
      console.error("Failed to load landlords", error);
    } finally {
      setLoading(false);
    }
  };

  const getListingCount = (userId: string) => {
    return mockDatabase.listings.filter(l => l.ownerId === userId).length;
  };

  const getRandomEscrow = (userId: string) => {
    // Mocking escrow involvement based on id characters length just for display concurrency
    return userId.length % 5 === 0 ? "Active" : "None";
  };

  const toggleTierFilter = (id: string) => {
    setActiveTierFilters((prev) => {
      if (id === "all") return ["all"];
      const newFilters = prev.filter((f) => f !== "all");
      if (newFilters.includes(id)) {
        const result = newFilters.filter((f) => f !== id);
        return result.length === 0 ? ["all"] : result;
      } else {
        return [...newFilters, id];
      }
    });
  };

  const filteredData = data.filter((item) => {
    const term = searchQuery.toLowerCase();
    const searchMatch =
      item.firstName.toLowerCase().includes(term) ||
      item.lastName.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term);

    const tierMatch = activeTierFilters.includes("all") || activeTierFilters.includes(item.tier.toLowerCase());

    let verificationMatch = true;
    if (activeVerification === "verified") verificationMatch = item.status === "VERIFIED";
    if (activeVerification === "unverified") verificationMatch = item.status !== "VERIFIED";

    return searchMatch && tierMatch && verificationMatch;
  });

  const handleAction = (action: string, userName: string) => {
    toast.success(`${action} initiated for ${userName}`);
    setActiveMenu(null);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <BigHeader useHubot subtitle="Manage property owners, verification status, and portfolio performance.">
            Landlord Management
          </BigHeader>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border-2 border-white bg-gray-200"
              />
            ))}
            <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
              +1k
            </div>
          </div>
          <Button
            icon={Mail}
            onClick={() => toast.success("Group Message Portal Opened")}
            className="bg-primary-500 text-gray-900 font-bold border-b-[4px] border-primary-700 active:border-b-0 active:translate-y-[4px] transition-all shadow-sm"
          >
            Group Message
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 h-12 text-sm font-semibold border border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-400 font-hubot"
          />
        </div>

        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-200">
            <button onClick={() => setActiveVerification(prev => prev === 'verified' ? 'all' : 'verified')} className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all", activeVerification === 'verified' ? "bg-white text-primary-600 shadow-sm" : "text-gray-500 hover:text-gray-900")}>
              Verified Only
            </button>
          </div>

          <button
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            className={cn("h-12 w-12 flex items-center justify-center rounded-2xl border transition-all", isFilterDropdownOpen || !activeTierFilters.includes("all") ? "bg-primary-50 text-primary-600 border-primary-500 shadow-sm" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 shadow-sm")}
          >
            <Filter className="h-5 w-5" />
          </button>

          {isFilterDropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+0.5rem)] w-56 bg-white border border-gray-100 shadow-xl rounded-2xl p-2 z-[100] animate-fade-in">
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-50 mb-1">
                Owner Tier
              </div>
              {[
                { id: "all", label: "All Tiers", className: "text-gray-600" },
                { id: "free", label: "Free", className: "text-[#8B4513]" },
                { id: "pro", label: "Pro", className: "text-[#d99a06]" },
                { id: "premier", label: "Premier", className: "text-purple-700 font-bold" },
              ].map((option) => (
                <button
                  key={`tier-${option.id}`}
                  onClick={() => toggleTierFilter(option.id)}
                  className="w-full text-left px-3 py-2 text-sm font-semibold rounded-xl flex items-center justify-between transition-colors hover:bg-gray-50"
                >
                  <span className={activeTierFilters.includes(option.id) ? "text-primary-600" : option.className}>
                    {option.label}
                  </span>
                  {activeTierFilters.includes(option.id) && (
                    <CheckCircle2 className="h-4 w-4 text-primary-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 bg-gray-50 rounded-3xl animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredData.map((user) => {
            const listingsCount = getListingCount(user.id);
            const escrowStatus = getRandomEscrow(user.id);
            const isMenuOpen = activeMenu === user.id;

            return (
              <div
                key={user.id}
                className="group relative bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 pb-[76px]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt=""
                          className="h-16 w-16 rounded-[20px] object-cover shadow-sm border border-gray-100"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-[20px] bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-xl border border-primary-100">
                          {getInitials(user.firstName, user.lastName)}
                        </div>
                      )}
                      <div
                        className={cn(
                          "absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white",
                          user.status === "VERIFIED"
                            ? "bg-blue-500"
                            : "bg-gray-400",
                        )}
                      >
                        {user.status === "VERIFIED" && (
                          <UserCheck className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 font-hubot tracking-tight">
                        {user.firstName} {user.lastName}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Building2 className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                          {user.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(isMenuOpen ? null : user.id)}
                      className={cn(
                        "h-10 w-10 flex items-center justify-center rounded-xl transition-colors border",
                        isMenuOpen ? "bg-gray-100 border-gray-200 text-gray-900" : "bg-white border-transparent text-gray-400 hover:bg-gray-50 hover:border-gray-200 hover:text-gray-900"
                      )}
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>

                    {isMenuOpen && (
                      <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 shadow-xl rounded-2xl p-2 z-50 animate-fade-in">
                        <button onClick={() => handleAction('Verification', user.firstName)} className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl flex items-center gap-2">
                          <Shield className="h-4 w-4 text-blue-500" /> Verify Profile
                        </button>
                        <button onClick={() => handleAction('Tier Upgrade', user.firstName)} className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl flex items-center gap-2">
                          <ArrowUpCircle className="h-4 w-4 text-purple-500" /> Upgrade Tier
                        </button>
                        <button onClick={() => handleAction('Link Search', user.firstName)} className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl flex items-center gap-2">
                          <LinkIcon className="h-4 w-4 text-gray-400" /> View Backlinks
                        </button>
                        <div className="h-px bg-gray-100 my-1"></div>
                        <button onClick={() => handleAction('Suspension', user.firstName)} className="w-full text-left px-3 py-2 text-sm font-bold text-danger hover:bg-danger/10 rounded-xl flex items-center gap-2">
                          <Lock className="h-4 w-4" /> Suspend
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm font-semibold text-gray-600">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-gray-600">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{user.region}</span>
                  </div>
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-gray-50">
                  <div className="p-3 bg-gray-50 rounded-2xl flex flex-col">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 flex items-center gap-1 mb-1"><Home className="w-3 h-3" /> Listings</p>
                    <p className="text-xl font-black font-hubot text-gray-900 leading-none">{listingsCount}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-2xl flex flex-col">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 flex items-center gap-1 mb-1"><Shield className="w-3 h-3" /> Escrow</p>
                    <p className={cn("text-xs font-bold leading-none mt-1", escrowStatus === 'Active' ? 'text-green-600' : 'text-gray-500')}>{escrowStatus}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={cn(
                      "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border",
                      user.tier === "PRO" || user.tier === "PREMIUM"
                        ? "bg-purple-50 text-purple-700 border-purple-100"
                        : "bg-gray-50 text-gray-600 border-gray-200",
                    )}
                  >
                    TIER: {user.tier}
                  </span>
                  {user.status === "VERIFIED" && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-1 rounded-md tracking-widest">
                      <Shield className="h-3 w-3" />
                      KYC VERIFIED
                    </span>
                  )}
                </div>

                {/* Pin to bottom action */}
                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-100 rounded-b-[32px] bg-gray-50/50">
                  <Button
                    fullWidth
                    variant="ghost"
                    onClick={() => toast.success(`Viewing full profile for ${user.firstName}`)}
                    className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 shadow-sm rounded-xl h-12 flex items-center justify-center gap-2"
                  >
                    Profile Review
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Click outside listener mockup for mobile menus */}
      {activeMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)} />
      )}
    </div>
  );
}

export default LandlordsPage;
