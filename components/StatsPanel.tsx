'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DroneSighting {
  date: string;
  time: string;
  message: string;
}

interface StatsPanelProps {
  isVideoShown?: boolean;
}

export function StatsPanel({ isVideoShown = false }: StatsPanelProps) {
  const [sightings, setSightings] = useState<DroneSighting[]>([]);

  useEffect(() => {
    if (isVideoShown) {
      const now = new Date();
      const date = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      });
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const time = `${hours}:${minutes}:${seconds}`;
      
      const newSighting: DroneSighting = {
        date,
        time,
        message: 'Threat: Drone in ZONE-3'
      };
      
      setSightings(prev => [newSighting, ...prev].slice(0, 5));
    }
  }, [isVideoShown]);

  return (
    <Card className="bg-[#1f2122] border-[#3a3d3e] text-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">SYSTEM STATUS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs text-gray-400">Detection Events</div>
            <div className="text-lg font-semibold">127</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs text-gray-400">Alert Level</div>
            <div className="text-lg font-semibold text-orange-500">MODERATE</div>
          </div>
        </div>
        
        {/* Drone Sightings Feed */}
        <div className="pt-4 border-t border-[#3a3d3e]">
          <div className="text-xs text-gray-400 mb-2">Recent Threats</div>
          <div className="space-y-2">
            {sightings.length > 0 ? (
              sightings.map((sighting, index) => (
                <div key={index} className="text-xs text-gray-300 bg-[#2a2d2e] p-2 rounded">
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{sighting.date}</span>
                    <span className="font-mono">{sighting.time}</span>
                    <span>{sighting.message}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-500 italic">No recent threats</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

