'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix Next.js Leaflet icon loading
const fixLeafletIcon = () => {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
};

interface LiveMapProps {
    showIncidents: boolean;
    showSafeSpaces: boolean;
}

// Custom markers using L.divIcon
const createDivIcon = (bgColor: string, text: string) => {
    return L.divIcon({
        html: `<div class="relative flex items-center justify-center w-6 h-6 ${bgColor} rounded-full border-2 border-white shadow-lg text-white font-bold text-xs">${text}</div>`,
        className: 'custom-leaflet-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
};

const incidentIcon = createDivIcon('bg-red-500', '!');
const safeSpaceIcon = createDivIcon('bg-green-500', '✓');

const mockIncidents = [
    { id: 'inc-1', lat: 20.2900, lng: 85.8200, title: 'Harassment Reported', desc: 'Reported recently near Sahid Nagar.' },
    { id: 'inc-2', lat: 20.3010, lng: 85.8150, title: 'Poor Lighting', desc: 'Street lights not working near Khandagiri.' },
    { id: 'inc-3', lat: 20.2850, lng: 85.8300, title: 'Suspicious Activity', desc: 'Alert shared by local community near railway station.' },
];

const mockSafeSpaces = [
    { id: 'safe-1', lat: 20.2950, lng: 85.8250, name: 'Capital Hospital', address: 'Unit 6, Bhubaneswar' },
    { id: 'safe-2', lat: 20.3200, lng: 85.8180, name: 'AIIMS Bhubaneswar', address: 'Sijua, Bhubaneswar' },
    { id: 'safe-3', lat: 20.3050, lng: 85.8350, name: 'Sahid Nagar Police Station', address: 'Sahid Nagar, Bhubaneswar' },
];

export default function LiveMap({ showIncidents, showSafeSpaces }: LiveMapProps) {
    useEffect(() => {
        fixLeafletIcon();
    }, []);

    const defaultCenter: [number, number] = [20.2961, 85.8245];

    return (
        <div className="w-full h-full min-h-[500px]">
            <MapContainer
                center={defaultCenter}
                zoom={13}
                className="w-full h-full rounded-xl overflow-hidden border shadow-sm"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {showIncidents &&
                    mockIncidents.map((inc) => (
                        <Marker key={inc.id} position={[inc.lat, inc.lng]} icon={incidentIcon}>
                            <Popup>
                                <div className="p-1">
                                    <h3 className="font-bold text-slate-900 text-sm">{inc.title}</h3>
                                    <p className="text-xs text-slate-600 mt-1">{inc.desc}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                {showSafeSpaces &&
                    mockSafeSpaces.map((space) => (
                        <Marker key={space.id} position={[space.lat, space.lng]} icon={safeSpaceIcon}>
                            <Popup>
                                <div className="p-1">
                                    <h3 className="font-bold text-green-700 text-sm">🛡️ {space.name}</h3>
                                    <p className="text-xs text-slate-600 mt-1">{space.address}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
            </MapContainer>
        </div>
    );
}
