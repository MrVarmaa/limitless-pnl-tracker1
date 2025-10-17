
import React from 'react';

const PromotionalBanners: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Points Card */}
            <div className="relative bg-[#111117] p-8 rounded-2xl flex items-center justify-center overflow-hidden min-h-[160px]">
                <div className="absolute inset-0 z-0">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="dot-pattern" width="35" height="35" patternUnits="userSpaceOnUse">
                                <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.08)" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
                    </svg>
                </div>
                <h2 className="text-4xl font-bold text-text-primary z-10">Points</h2>
            </div>

            {/* Hourly Prophet Challenge Card */}
            <div className="relative bg-primary p-8 rounded-2xl flex flex-col items-center justify-center text-center overflow-hidden min-h-[160px]">
                <div className="absolute inset-0 bg-no-repeat bg-center" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.04) 2px, transparent 2px), radial-gradient(circle, rgba(0,0,0,0.04) 2px, transparent 2px), radial-gradient(circle, rgba(0,0,0,0.04) 2px, transparent 2px)',
                    backgroundSize: '100px 100px, 200px 200px, 300px 300px',
                }}></div>
                <div className="relative z-10">
                    <div className="mb-2">
                        <span className="bg-[#111117] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider">NEW</span>
                    </div>
                    <h3 className="text-2xl font-bold text-text-on-primary">Hourly Prophet Challenge</h3>
                    <p className="text-lg text-text-on-primary/80 mt-1">$10k USDC prize pool</p>
                </div>
            </div>
        </div>
    );
};

export default PromotionalBanners;
