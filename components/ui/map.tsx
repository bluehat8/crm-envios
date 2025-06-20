'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para los iconos de Leaflet en Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapProps {
  origin: [number, number];
  destination: [number, number];
  currentLocation?: [number, number];
  className?: string;
}

export function Map({ origin, destination, currentLocation, className = 'h-[400px] w-full' }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Crear el mapa
    const map = L.map(mapContainerRef.current).setView(origin, 6);
    mapRef.current = map;

    // Añadir capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Añadir marcadores
    L.marker(origin).addTo(map)
      .bindPopup('Origen')
      .openPopup();

    L.marker(destination).addTo(map)
      .bindPopup('Destino')
      .openPopup();

    // Añadir marcador de ubicación actual si está disponible
    if (currentLocation) {
      L.marker(currentLocation, {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color: #3b82f6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        })
      }).addTo(map)
        .bindPopup('Ubicación actual')
        .openPopup();

      // Añadir línea de ruta
      const route = L.polyline([origin, currentLocation, destination], {
        color: '#3b82f6',
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 5'
      }).addTo(map);

      // Ajustar el zoom para mostrar toda la ruta
      map.fitBounds(route.getBounds().pad(0.2));
    } else {
      // Si no hay ubicación actual, solo mostrar origen y destino
      const bounds = L.latLngBounds([origin, destination]);
      map.fitBounds(bounds.pad(0.2));
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [origin, destination, currentLocation]);

  return (
    <div 
      ref={mapContainerRef} 
      className={`${className} rounded-lg border`}
      style={{ zIndex: 1 }}
    />
  );
}
