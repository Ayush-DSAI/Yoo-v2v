'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Phone, Navigation, Star, Search, Filter } from 'lucide-react';
import { safeSpaceTypes } from '@/constants/status';

const mockSafeSpaces = [
  {
    id: '1',
    name: 'City General Hospital',
    type: 'hospital',
    address: '123 Main Street',
    distance: 0.5,
    rating: 4.8,
    isOpen24Hours: true,
    phone: '+1 234-567-8900',
  },
  {
    id: '2',
    name: 'Downtown Police Station',
    type: 'police',
    address: '456 Police Ave',
    distance: 0.8,
    rating: 4.5,
    isOpen24Hours: true,
    phone: '+1 234-567-8901',
  },
  {
    id: '3',
    name: 'Central Pharmacy',
    type: 'pharmacy',
    address: '789 Health Blvd',
    distance: 0.3,
    rating: 4.6,
    isOpen24Hours: false,
    phone: '+1 234-567-8902',
  },
  {
    id: '4',
    name: 'Metro Station - Central',
    type: 'metro',
    address: 'Central Square',
    distance: 0.2,
    rating: 4.2,
    isOpen24Hours: false,
    phone: null,
  },
  {
    id: '5',
    name: 'Women Help Center',
    type: 'women_help',
    address: '321 Support Lane',
    distance: 1.2,
    rating: 4.9,
    isOpen24Hours: true,
    phone: '+1 234-567-8903',
  },
];

export default function SafeSpacesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredSpaces = mockSafeSpaces.filter((space) => {
    const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || space.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    const typeConfig = safeSpaceTypes.find((t) => t.id === type);
    return typeConfig ? typeConfig.icon : 'map-pin';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Safe Spaces</h1>
        <p className="text-slate-500">Find nearby safe locations</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search safe spaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge
              variant={!selectedType ? 'default' : 'secondary'}
              className="cursor-pointer"
              onClick={() => setSelectedType(null)}
            >
              All
            </Badge>
            {safeSpaceTypes.map((type) => (
              <Badge
                key={type.id}
                variant={selectedType === type.id ? 'default' : 'secondary'}
                className="cursor-pointer"
                onClick={() => setSelectedType(type.id)}
              >
                {type.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safe Spaces List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSpaces.map((space) => (
          <Card key={space.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{space.name}</CardTitle>
                  <p className="text-sm text-slate-500">{space.address}</p>
                </div>
                <Badge variant={space.isOpen24Hours ? 'success' : 'secondary'}>
                  {space.isOpen24Hours ? '24/7' : 'Limited Hours'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {space.distance} km
                </div>
                {space.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    {space.rating}
                  </div>
                )}
              </div>
              {space.phone && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="h-4 w-4" />
                  {space.phone}
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  Navigate
                </Button>
                {space.phone && (
                  <Button variant="outline" size="sm">
                    Call
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
