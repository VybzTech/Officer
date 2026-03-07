import { useState } from "react";
import { X, CheckCircle2, XCircle, Ban, AlertTriangle, ArrowRightLeft, Eye, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { Tile } from "@/components/ui/Tile";
import { SmallHeader } from "@/components/ui/Typography";
import { formatNaira } from "@/utils/format";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { PermissionGate } from "@/components/guards";
import type { ReactNode } from "react";

// Modal Wrapper (assuming one doesn't exist to drop-in seamlessly)
function DetailModalWrapper({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: ReactNode }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-6 lg:p-12 transition-opacity animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-3xl w-full max-w-5xl max-h-full flex flex-col overflow-hidden shadow-2xl scale-100 transition-transform" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export function ListingDetailModal({ listing, isOpen, onClose }: any) {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!listing) return null;

    const navigateToFullPage = () => {
        onClose();
        navigate(`/listings/${listing.id}`);
    };

    return (
        <DetailModalWrapper isOpen={isOpen} onClose={onClose}>
            {/* Shorter Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-gray-100 bg-gray-50/50">
                <div>
                    <h2 onClick={navigateToFullPage} className="text-xl font-bold font-hubot text-gray-900 tracking-tight flex items-center gap-3 cursor-pointer hover:text-primary-600 transition-colors">
                        {listing.title} <StatusBadge status={listing.status} /> <ExternalLink className="w-4 h-4 text-gray-400 ml-2" />
                    </h2>
                    <p className="text-sm font-semibold text-gray-400 mt-0.5">{listing.address}</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors">
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gray-50/30 space-y-6">

                {/* Full Width Media Gallery */}
                <Tile padding="none" className="overflow-hidden border border-gray-100">
                    <div className="h-80 bg-gray-900 relative">
                        {listing.images && listing.images.length > 0 ? (
                            <img src={listing.images[currentImageIndex]} alt="Property Main" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">No images available</div>
                        )}
                        <div className="absolute top-4 left-4 shadow-sm">
                            <Badge variant="primary">{currentImageIndex + 1} / {listing.images?.length || 0}</Badge>
                        </div>
                    </div>
                    {listing.images && listing.images.length > 1 && (
                        <div className="flex gap-2 p-3 overflow-x-auto bg-gray-50 border-t border-gray-100 custom-scrollbar">
                            {listing.images.map((imgUrl: string, i: number) => (
                                <div
                                    key={i}
                                    onClick={() => setCurrentImageIndex(i)}
                                    className={`h-20 w-32 bg-gray-300 rounded-lg flex-shrink-0 border-2 transition-colors cursor-pointer ${currentImageIndex === i ? 'border-primary-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={imgUrl} className="w-full h-full object-cover rounded-md" />
                                </div>
                            ))}
                        </div>
                    )}
                </Tile>

                {/* 2-Column Details & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Left Column: Property Details & Backlinks */}
                    <div className="space-y-6">
                        {/* Details Grid */}
                        <Tile padding="md">
                            <SmallHeader className="mb-4">Property Details</SmallHeader>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Price</p>
                                    <p className="font-extrabold text-primary-600">{formatNaira(listing.price)}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Type</p>
                                    <p className="font-bold text-gray-900">{listing.propertyType}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Action</p>
                                    <p className="font-bold text-gray-900">{listing.listingType}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Specs</p>
                                    <p className="font-bold text-gray-900">{listing.bedrooms} Beds, {listing.bathrooms} Baths</p>
                                </div>
                            </div>
                        </Tile>

                        {/* Backlinks */}
                        <Tile padding="md">
                            <SmallHeader className="mb-4">System Backlinks</SmallHeader>
                            <div className="space-y-3">
                                <button className="w-full flex justify-between items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100 group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-primary-50"><Eye className="h-4 w-4 text-primary-500" /></div>
                                        <div className="text-left">
                                            <p className="text-xs font-bold text-gray-900">Landlord Profile</p>
                                            <p className="text-[10px] font-semibold text-gray-400 mt-0.5">{listing.ownerName}</p>
                                        </div>
                                    </div>
                                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-500" />
                                </button>
                                <button className="w-full flex justify-between items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100 group disabled:opacity-50">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100"><ArrowRightLeft className="h-4 w-4 text-gray-400" /></div>
                                        <div className="text-left">
                                            <p className="text-xs font-bold text-gray-900">Escrow Tranactions</p>
                                            <p className="text-[10px] font-semibold text-gray-400 mt-0.5">0 Active linked escrows</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </Tile>
                    </div>

                    {/* Right Column: Status & Moderation */}
                    <div className="space-y-6">
                        <Tile padding="md">
                            <SmallHeader className="mb-4">Status & Moderation</SmallHeader>
                            <div className="space-y-3">
                                {/* Convert to official toggle mock */}
                                <div className="flex items-center justify-between p-4 rounded-xl bg-primary-50/50 border border-primary-100 mb-4">
                                    <div>
                                        <p className="text-xs font-bold text-gray-900">Official Listing</p>
                                        <p className="text-[10px] font-semibold text-gray-500 mt-0.5">Convert to platform-backed</p>
                                    </div>
                                    <div className="h-6 w-11 bg-gray-200 rounded-full cursor-pointer relative transition-colors hover:bg-gray-300">
                                        <div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>

                                {listing.status === "PENDING" && (
                                    <div className="grid grid-cols-2 gap-3 pb-3 border-b border-gray-100">
                                        <PermissionGate permission="APPROVE_LISTING">
                                            <Button fullWidth className="bg-success text-white hover:bg-success-dark border-transparent justify-center shadow-sm">
                                                <CheckCircle2 className="h-4 w-4 mr-2" /> Approve
                                            </Button>
                                        </PermissionGate>
                                        <PermissionGate permission="REJECT_LISTING">
                                            <Button fullWidth className="bg-danger/10 text-danger hover:bg-danger hover:text-white border-transparent justify-center">
                                                <XCircle className="h-4 w-4 mr-2" /> Reject
                                            </Button>
                                        </PermissionGate>
                                    </div>
                                )}

                                {(listing.status === "APPROVED" || listing.status === "PENDING") && (
                                    <PermissionGate permission="SUSPEND_LISTING">
                                        <Button fullWidth variant="ghost" className="bg-warning/10 text-warning-dark hover:bg-warning hover:text-white justify-start border-transparent mt-2">
                                            <Ban className="h-4 w-4 mr-2" /> Suspend Listing
                                        </Button>
                                    </PermissionGate>
                                )}

                                <Button fullWidth variant="ghost" className="text-danger hover:bg-danger hover:text-white justify-start border-transparent">
                                    <AlertTriangle className="h-4 w-4 mr-2" /> Flag Risk
                                </Button>
                            </div>
                        </Tile>
                    </div>

                </div>
            </div>
        </DetailModalWrapper>
    );
}
