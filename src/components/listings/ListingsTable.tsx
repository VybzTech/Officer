import { useState } from "react";
import { formatNaira } from "@/utils/format";
import { StatusBadge, TierBadge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Eye, ShieldAlert, CheckCircle2, XCircle, Ban, ArrowUpDown } from "lucide-react";
import { PermissionGate } from "@/components/guards";
import toast from "react-hot-toast";

// Simple dropdown menu component mockup for actions
export function ListingsTable({
    listings,
    selectedListings,
    onToggleSelection,
    onViewDetails,
    onApprove,
    onReject,
    onSuspend,
    onFlagRisk,
    onSort,
    sortConfig
}: any) {
    const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean, action: string, listingId: string | null }>({ isOpen: false, action: '', listingId: null });

    const openConfirm = (action: string, id: string) => {
        setConfirmModal({ isOpen: true, action, listingId: id });
    };

    const handleConfirm = () => {
        if (!confirmModal.listingId) return;

        // Execute the action
        switch (confirmModal.action) {
            case 'approve':
                onApprove(confirmModal.listingId);
                toast.success("Listing approved successfully");
                break;
            case 'reject':
                onReject(confirmModal.listingId);
                toast.error("Listing rejected");
                break;
            case 'suspend':
                onSuspend(confirmModal.listingId);
                toast.success("Listing suspended");
                break;
            case 'flag':
                onFlagRisk(confirmModal.listingId);
                toast.success("Listing flagged for risk");
                break;
        }

        setConfirmModal({ isOpen: false, action: '', listingId: null });
    };

    const SortHeader = ({ label, sortKey }: { label: string, sortKey: string }) => (
        <th className="p-4 uppercase tracking-widest text-[10px] font-bold cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => onSort?.(sortKey)}>
            <div className="flex items-center gap-1">
                {label}
                <ArrowUpDown className={`h-3 w-3 ${sortConfig?.key === sortKey ? 'text-primary-600' : 'text-gray-400'}`} />
            </div>
        </th>
    );

    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                    <tr>
                        <th className="p-4 w-10">
                            <input type="checkbox" className="rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                        </th>
                        <SortHeader label="" sortKey="title" />
                        <SortHeader label="Owner" sortKey="ownerName" />
                        <SortHeader label="Region" sortKey="region" />
                        <SortHeader label="Status" sortKey="status" />
                        <th className="p-4 uppercase tracking-widest text-[10px] font-bold text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {listings.map((listing: any) => (
                        <tr key={listing.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4">
                                <input
                                    type="checkbox"
                                    checked={selectedListings.includes(listing.id)}
                                    onChange={() => onToggleSelection(listing.id)}
                                    className="rounded border-gray-300 text-primary-500 focus:ring-primary-500 cursor-pointer"
                                />
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                        <img src={listing.images[0]} alt="Prop" className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <p
                                            className="font-bold text-gray-900 max-w-[200px] truncate cursor-pointer hover:text-primary-600 transition-colors"
                                            title={listing.title}
                                            onClick={() => onViewDetails(listing)}
                                        >
                                            {listing.title}
                                        </p>
                                        <p className="text-primary-600 font-extrabold text-xs tracking-tight mt-0.5">
                                            {formatNaira(listing.price)} {listing.listingType === "RENT" ? "/yr" : ""}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4">
                                <p className="font-semibold text-gray-800 text-xs">{listing.ownerName}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-[10px] uppercase font-bold text-gray-400">{listing.ownerType}</span>
                                    <TierBadge tier={listing.ownerTier} />
                                </div>
                            </td>
                            <td className="p-4">
                                <p className="text-xs font-semibold text-gray-700 max-w-[150px] truncate">{listing.address}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">{listing.lgaName}</p>
                            </td>
                            <td className="p-4">
                                <StatusBadge status={listing.status} />
                            </td>
                            <td className="p-4 flex items-center justify-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => onViewDetails(listing)} className="!px-2 h-8" title="View Details">
                                    <Eye className="h-4 w-4" />
                                </Button>

                                {listing.status === "PENDING" && (
                                    <>
                                        <PermissionGate permission="APPROVE_LISTING">
                                            <Button variant="ghost" size="sm" onClick={() => openConfirm('approve', listing.id)} className="!px-2 h-8 text-success-dark hover:text-success-dark hover:bg-success-light/20" title="Approve">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </Button>
                                        </PermissionGate>
                                        <PermissionGate permission="REJECT_LISTING">
                                            <Button variant="ghost" size="sm" onClick={() => openConfirm('reject', listing.id)} className="!px-2 h-8 text-danger-dark hover:text-danger-dark hover:bg-danger-light/20" title="Reject">
                                                <XCircle className="h-4 w-4" />
                                            </Button>
                                        </PermissionGate>
                                    </>
                                )}

                                {listing.status === "APPROVED" && (
                                    <PermissionGate permission="SUSPEND_LISTING">
                                        <Button variant="ghost" size="sm" onClick={() => openConfirm('suspend', listing.id)} className="!px-2 h-8 text-warning-dark hover:text-warning-dark hover:bg-warning-light/20" title="Suspend">
                                            <Ban className="h-4 w-4" />
                                        </Button>
                                    </PermissionGate>
                                )}

                                <Button variant="ghost" size="sm" onClick={() => openConfirm('flag', listing.id)} className="!px-2 h-8 text-danger hover:text-danger hover:bg-danger/10" title="Flag Risk">
                                    <ShieldAlert className="h-4 w-4" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {listings.length === 0 && (
                        <tr>
                            <td colSpan={6} className="p-8 text-center text-gray-500 font-medium">
                                No listings matched your criteria
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Confirmation Modal */}
            {confirmModal.isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl scale-100 transition-transform">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-gray-900 capitalize text-center w-full">Confirm Action</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-gray-600 text-center mb-6">
                                Are you sure you want to {confirmModal.action} this listing? This action may notify the user.
                            </p>
                            <div className="flex gap-3">
                                <Button fullWidth variant="outline" onClick={() => setConfirmModal({ isOpen: false, action: '', listingId: null })} className="!border-gray-200">
                                    Cancel
                                </Button>
                                <Button fullWidth className={confirmModal.action === 'reject' || confirmModal.action === 'flag' ? 'bg-danger hover:bg-danger-dark text-white shadow-none border-none' : 'bg-primary-500 text-white shadow-none border-none'} onClick={handleConfirm}>
                                    Yes, {confirmModal.action}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
