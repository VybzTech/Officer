import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import { StatusBadge, TierBadge } from "@/components/ui/Badge";
import { mockDatabase } from "@/data/mockDatabase";
import { formatNaira } from "@/utils/format";
import { cn } from "@/utils/cn";

export default function ListingDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the mocked listing based on ID
    const listing: any = mockDatabase.listings.find(l => l.id === id) || mockDatabase.listings[0];

    if (!listing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="text-2xl font-bold mb-4">Listing Not Found</h2>
                <Button onClick={() => navigate('/listings')}>Back to Listings</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-fade-in">
            {/* Header & Breadcrumb */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/listings')}
                    className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-sm"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-hubot tracking-tight">{listing.title}</h1>
                    <div className="flex items-center gap-3 mt-1.5 text-sm font-semibold text-gray-500">
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {listing.address}, {listing.lgaName}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                        <span>ID: {listing.id}</span>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    <StatusBadge status={listing.status} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Media & Core Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Main Gallery */}
                    <div className="w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden bg-gray-100 shadow-sm border border-gray-200">
                        <img
                            src={listing.images[0]}
                            alt="Property Cover"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {listing.images.slice(1, 5).map((img: string, i: number) => (
                            <div key={i} className="aspect-video rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>

                    {/* Details Card */}
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 font-hubot">Property Details</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="space-y-1 text-center p-4 bg-gray-50 rounded-2xl">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Price</p>
                                <p className="text-gray-900 font-bold text-lg">{formatNaira(listing.price)}</p>
                            </div>
                            <div className="space-y-1 text-center p-4 bg-gray-50 rounded-2xl">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Type</p>
                                <p className="text-gray-900 font-bold text-lg">{listing.propertyType}</p>
                            </div>
                            <div className="space-y-1 text-center p-4 bg-gray-50 rounded-2xl">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Beds</p>
                                <p className="text-gray-900 font-bold text-lg">{listing.bedrooms || '-'}</p>
                            </div>
                            <div className="space-y-1 text-center p-4 bg-gray-50 rounded-2xl">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Baths</p>
                                <p className="text-gray-900 font-bold text-lg">{listing.bathrooms || '-'}</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 font-hubot">Description</h3>
                            <p className="text-gray-600 leading-relaxed font-semibold text-sm">
                                This is a detailed mock description for the property requested. Once integrated, the database will feed the description from the Property table where description usually tracks amenities and basic flow.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Ownership, Moderation & Actions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 font-hubot">Landlord / Owner</h2>
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-2xl bg-gray-100 flex items-center justify-center shadow-inner flex-shrink-0">
                                <span className="text-xl font-black text-gray-400 font-hubot">{listing.ownerName?.charAt(0)}</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{listing.ownerName}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs font-extrabold uppercase tracking-widest text-gray-400">{listing.ownerType}</span>
                                    <TierBadge tier={listing.ownerTier} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 font-hubot">Status Control</h2>
                        <div className="space-y-3">
                            <div className="p-4 rounded-2xl bg-gray-50 flex items-start gap-4 border border-gray-100">
                                <div className="h-10 w-10 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-shrink-0 items-center justify-center">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-gray-900">Creation Date</p>
                                    <p className="text-xs font-medium text-gray-500 mt-1">{new Date(listing.createdAt).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-gray-50 flex items-start gap-4 border border-gray-100">
                                <div className="h-10 w-10 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-shrink-0 items-center justify-center">
                                    {listing.isVerified ? <CheckCircle2 className="w-5 h-5 text-success" /> : <AlertTriangle className="w-5 h-5 text-warning" />}
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-gray-900">Verification</p>
                                    <p className={cn("text-xs font-bold uppercase tracking-widest mt-1", listing.isVerified ? "text-success" : "text-warning")}>
                                        {listing.isVerified ? "Verified" : "Unverified"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 space-y-3">
                            <Button fullWidth className="bg-success text-white">Approve Property</Button>
                            <Button fullWidth className="bg-danger text-white">Reject Listing</Button>
                            <Button fullWidth variant="outline" className="text-warning-dark border-warning-light/50 bg-warning-light/10">Suspend Listing</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
