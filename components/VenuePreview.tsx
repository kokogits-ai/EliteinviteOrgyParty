
import React from 'react';
import { MapPin, Camera } from 'lucide-react';

const venueImages = [
  {
    url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800",
    label: "Main Lounge"
  },
  {
    url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
    label: "Private Suite"
  },
  {
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
    label: "Atmospheric Lighting"
  }
];

const VenuePreview: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-xl text-left">
            <div className="flex items-center gap-2 text-indigo-400 mb-4">
              <MapPin size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Secret Location</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">The Apartment</h2>
            <p className="text-slate-400 leading-relaxed">
              Experience the evening in our high-end private residence. Designed for comfort, discretion, and a premium atmosphere.
            </p>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm italic">
            <Camera size={16} />
            <span>Venue Mockups - No photos allowed during event</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {venueImages.map((img, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-3xl aspect-[4/5] bg-slate-900 border border-slate-800">
              <img 
                src={img.url} 
                alt={img.label} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6">
                <span className="text-white font-bold tracking-wide uppercase text-xs px-3 py-1.5 bg-slate-900/80 rounded-lg border border-slate-700 backdrop-blur-sm">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenuePreview;
