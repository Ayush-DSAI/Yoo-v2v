'use client';

import { useState, useEffect } from 'react';
import { getSupabaseToken } from '@/lib/supabase/authHelper';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom tailwind-styled markers using L.divIcon
const createDivIcon = (bgColor: string, text: string, animate: boolean = false) => {
    return L.divIcon({
        html: `<div class="relative flex items-center justify-center w-6 h-6 ${bgColor} rounded-full border-2 border-white shadow-lg text-white font-bold text-xs ${animate ? 'animate-pulse' : ''}">${text}</div>`,
        className: 'custom-leaflet-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
};

const userIcon = createDivIcon('bg-blue-500', '●', true);
const incidentRedIcon = createDivIcon('bg-red-500', '!', false);
const incidentOrangeIcon = createDivIcon('bg-orange-500', '!', false);
const safeSpaceIcon = createDivIcon('bg-green-500', '✓', false);
const destinationIcon = createDivIcon('bg-purple-600', '⚑', false);

interface LiveIncident {
    id: string;
    title: string;
    description?: string;
    hazard_type: string;
    latitude: number;
    longitude: number;
    status: string;
}

interface LiveSafeSpace {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    type: string;
}

interface RouteAnalysis {
    score: number;
    risk: string;
    explanation?: string[];
}

function LocationTracker({ onLocationUpdate }: { onLocationUpdate: (pos: [number, number]) => void }) {
    const map = useMap();
    useEffect(() => {
        const bhubaneswar: [number, number] = [20.2961, 85.8245];
        onLocationUpdate(bhubaneswar);
        map.setView(bhubaneswar, 13);
    }, [map, onLocationUpdate]);
    return null;
}

function MapRecenter({ position }: { position: [number, number] | null }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(position, 14, { duration: 1.5 });
        }
    }, [map, position]);
    return null;
}

interface LiveMapProps {
    currentPosition: [number, number];
    setCurrentPosition: (pos: [number, number]) => void;
    destinationPos: [number, number] | null;
    showIncidents: boolean;
    showSafeSpaces: boolean;
}

export default function LiveMapInner({
    currentPosition,
    setCurrentPosition,
    destinationPos,
    showIncidents,
    showSafeSpaces,
}: LiveMapProps) {
    const [liveIncidents, setLiveIncidents] = useState<LiveIncident[]>([]);
    const [liveSafeSpaces, setLiveSafeSpaces] = useState<LiveSafeSpace[]>([]);
    const [routePoints, setRoutePoints] = useState<[number, number][]>([]);
    const [analysis, setAnalysis] = useState<RouteAnalysis | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    // Seed mock data for Bhubaneswar demo on mount
    useEffect(() => {
        // Set 3 mock incidents (red pins) around Bhubaneswar
        setLiveIncidents([
            {
                id: 'mock-inc-1',
                title: 'Minor Theft Snatching',
                description: 'Reported mobile snatching incident near commercial street.',
                hazard_type: 'theft',
                latitude: 20.2900,
                longitude: 85.8200,
                status: 'investigating'
            },
            {
                id: 'mock-inc-2',
                title: 'Poor Lighting Area',
                description: 'Streetlights are non-functional for the past three days.',
                hazard_type: 'lighting',
                latitude: 20.3000,
                longitude: 85.8300,
                status: 'investigating'
            },
            {
                id: 'mock-inc-3',
                title: 'Harassment Alert',
                description: 'Group of loiterers blocking the sidewalk at evening hours.',
                hazard_type: 'harassment',
                latitude: 20.3050,
                longitude: 85.8150,
                status: 'investigating'
            }
        ]);

        // Set 3 mock safe spaces (green pins)
        setLiveSafeSpaces([
            {
                id: 'mock-safe-1',
                name: 'Capital Hospital',
                type: 'medical_center',
                latitude: 20.2950,
                longitude: 85.8250
            },
            {
                id: 'mock-safe-2',
                name: 'Bhubaneswar Central Police Station',
                type: 'police_station',
                latitude: 20.2850,
                longitude: 85.8350
            },
            {
                id: 'mock-safe-3',
                name: 'Aegis Shelter House',
                type: 'safe_house',
                latitude: 20.3100,
                longitude: 85.8200
            }
        ]);
    }, []);

    // Fetch route safety analysis and OSRM route geometry when destination changes
    useEffect(() => {
        if (!destinationPos) {
            setAnalysis(null);
            setRoutePoints([]);
            return;
        }

        const analyzeAndRoute = async () => {
            const token = (await getSupabaseToken()) || '';
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };

            // Mock API Safety analysis
            setAnalysis({
                score: 87,
                risk: 'Low Risk',
                explanation: [
                    'Well-lit streets along major avenues.',
                    'High density of active safe zones within 300m.',
                    'No recent incident reports on this path.'
                ]
            });

            // 2. Fetch OSRM street route geometry
            try {
                const startLat = currentPosition[0];
                const startLng = currentPosition[1];
                const destLat = destinationPos[0];
                const destLng = destinationPos[1];
                const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${destLng},${destLat}?overview=full&geometries=geojson`;

                const osrmRes = await fetch(osrmUrl);
                if (osrmRes.ok) {
                    const osrmData = await osrmRes.json();
                    if (osrmData.routes && osrmData.routes.length > 0) {
                        const rawCoords = osrmData.routes[0].geometry.coordinates; // [[lng, lat]]
                        const flippedCoords: [number, number][] = rawCoords.map((pt: [number, number]) => [pt[1], pt[0]]);
                        setRoutePoints(flippedCoords);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch OSRM route points:', err);
            }
        };

        analyzeAndRoute();
    }, [currentPosition, destinationPos, API_URL]);

    const getPolylinePositions = (): [number, number][] => {
        if (!destinationPos) return [currentPosition];
        if (routePoints.length > 0) return routePoints;
        return [currentPosition, destinationPos];
    };

    const getPolylineColor = () => {
        if (!analysis) return '#3b82f6';
        const risk = analysis.risk?.toLowerCase();
        if (risk.includes('high') || risk.includes('severe')) return '#ef4444';
        if (risk.includes('medium') || risk.includes('moderate')) return '#f97316';
        if (risk.includes('low') || risk.includes('safe')) return '#22c55e';
        return '#3b82f6';
    };

    return (
        <MapContainer
            center={currentPosition}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full min-h-[500px] rounded-lg z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationTracker onLocationUpdate={setCurrentPosition} />
            <MapRecenter position={destinationPos} />

            <Marker position={currentPosition} icon={userIcon}>
                <Popup>Your Location</Popup>
            </Marker>

            {destinationPos && (
                <Marker position={destinationPos} icon={destinationIcon}>
                    <Popup>
                        <div className="font-semibold">Destination</div>
                        {analysis && (
                            <div className="text-xs mt-1 text-slate-600">
                                Risk Level: <span className="font-bold capitalize">{analysis.risk}</span> | Score: {analysis.score}
                            </div>
                        )}
                    </Popup>
                </Marker>
            )}

            {showIncidents &&
                liveIncidents.map((incident) => {
                    const lat = incident.latitude;
                    const lng = incident.longitude;
                    if (lat === undefined || lng === undefined) return null;
                    const isHigh = ['assault', 'harassment', 'theft'].includes(incident.hazard_type?.toLowerCase());
                    const icon = isHigh ? incidentRedIcon : incidentOrangeIcon;

                    return (
                        <Marker key={`inc-${incident.id}`} position={[lat, lng]} icon={icon}>
                            <Popup>
                                <div className="font-bold text-red-600 capitalize">
                                    {incident.hazard_type?.replace('_', ' ') || 'Incident'}
                                </div>
                                <div className="font-medium text-slate-800 text-sm mt-1">{incident.title}</div>
                                {incident.description && <div className="text-slate-500 text-xs mt-1">{incident.description}</div>}
                            </Popup>
                        </Marker>
                    );
                })}

            {showSafeSpaces &&
                liveSafeSpaces.map((space) => {
                    const lat = space.latitude;
                    const lng = space.longitude;
                    if (lat === undefined || lng === undefined) return null;

                    return (
                        <Marker key={`safe-${space.id}`} position={[lat, lng]} icon={safeSpaceIcon}>
                            <Popup>
                                <div className="font-bold text-green-600">Safe Space</div>
                                <div className="font-medium text-slate-800 text-sm mt-1">{space.name}</div>
                                <div className="text-slate-500 text-xs capitalize mt-0.5">{space.type?.replace('_', ' ')}</div>
                            </Popup>
                        </Marker>
                    );
                })}

            {destinationPos && (
                <Polyline
                    positions={getPolylinePositions()}
                    color={getPolylineColor()}
                    weight={5}
                    opacity={0.8}
                />
            )}
        </MapContainer>
    );
}
