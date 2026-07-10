import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/Input';
import { MapPin, Loader } from 'lucide-react';

interface LocationAutocompleteProps {
    currentPosition?: [number, number] | null;
    onSelect: (lat: number, lon: number, name: string) => void;
    placeholder?: string;
    value?: string;
    onChange?: (val: string) => void;
}

interface PhotonFeature {
    properties: {
        name: string;
        city?: string;
        state?: string;
        country?: string;
        street?: string;
        housenumber?: string;
    };
    geometry: {
        coordinates: [number, number]; // [lon, lat]
    };
}

export default function LocationAutocomplete({
    currentPosition,
    onSelect,
    placeholder = 'Search locations...',
    value: controlledValue,
    onChange: controlledOnChange,
}: LocationAutocompleteProps) {
    const [internalValue, setInternalValue] = useState('');
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const [suggestions, setSuggestions] = useState<PhotonFeature[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    // Fetch suggestions with debounce
    useEffect(() => {
        if (!value || value.length < 3) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=5`;
                if (currentPosition) {
                    url += `&lat=${currentPosition[0]}&lon=${currentPosition[1]}`;
                }
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    setSuggestions(data.features || []);
                    setIsOpen(true);
                }
            } catch (err) {
                console.error('Photon autocomplete error:', err);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [value, currentPosition]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (isControlled) {
            controlledOnChange?.(val);
        } else {
            setInternalValue(val);
        }
        setIsOpen(true);
    };

    const handleSelect = (feat: PhotonFeature) => {
        const { name, city, state } = feat.properties;
        const parts = [name, city, state].filter(Boolean);
        const displayName = parts.join(', ');
        const [lon, lat] = feat.geometry.coordinates;

        if (isControlled) {
            controlledOnChange?.(displayName);
        } else {
            setInternalValue(displayName);
        }
        onSelect(lat, lon, displayName);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            <div className="relative">
                <Input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {loading ? (
                        <Loader className="h-4 w-4 animate-spin text-purple-600" />
                    ) : (
                        <MapPin className="h-4 w-4 text-slate-400" />
                    )}
                </div>
            </div>

            {isOpen && suggestions.length > 0 && (
                <ul className="absolute z-[9999] w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto divide-y divide-slate-100">
                    {suggestions.map((feat, idx) => {
                        const { name, city, state } = feat.properties;
                        return (
                            <li
                                key={idx}
                                onClick={() => handleSelect(feat)}
                                className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer flex flex-col transition-colors"
                                role="option"
                            >
                                <span className="text-sm font-semibold text-slate-800">{name}</span>
                                {(city || state) && (
                                    <span className="text-xs text-slate-400">
                                        {[city, state].filter(Boolean).join(', ')}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
