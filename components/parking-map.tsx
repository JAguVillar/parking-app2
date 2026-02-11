import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { INITIAL_REGION, Route, ParkingSpot } from '@/constants/mockRoutes';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ParkingMapProps {
  routes?: Route[];
  selectedRoute?: Route | null;
  onParkingSpotPress?: (spot: ParkingSpot) => void;
}

export function ParkingMap({ routes = [], selectedRoute, onParkingSpotPress }: ParkingMapProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Estilos del mapa para modo oscuro
  const mapStyle = isDark
    ? [
        {
          elementType: 'geometry',
          stylers: [{ color: '#212121' }],
        },
        {
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        },
        {
          elementType: 'labels.text.fill',
          stylers: [{ color: '#757575' }],
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#212121' }],
        },
        {
          featureType: 'administrative',
          elementType: 'geometry',
          stylers: [{ color: '#757575' }],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#757575' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry.fill',
          stylers: [{ color: '#2c2c2c' }],
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#8a8a8a' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#000000' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#3d3d3d' }],
        },
      ]
    : undefined;

  // Renderizar marcadores de estacionamiento
  const renderParkingMarkers = () => {
    const spots: ParkingSpot[] = [];

    if (selectedRoute) {
      spots.push(...selectedRoute.parkingSpots);
    } else {
      routes.forEach(route => {
        spots.push(...route.parkingSpots);
      });
    }

    return spots.map((spot) => {
      const availabilityRatio = spot.availableSpots / spot.totalSpots;
      const pinColor =
        availabilityRatio > 0.5
          ? '#34C759' // Verde: alta disponibilidad
          : availabilityRatio > 0.2
          ? '#FF9500' // Naranja: disponibilidad media
          : '#FF3B30'; // Rojo: baja disponibilidad

      return (
        <Marker
          key={spot.id}
          coordinate={spot.coordinate}
          pinColor={pinColor}
          title={spot.name}
          description={`${spot.availableSpots}/${spot.totalSpots} disponibles - $${spot.pricePerHour}/hr`}
          onPress={() => onParkingSpotPress?.(spot)}
        />
      );
    });
  };

  // Renderizar ruta seleccionada
  const renderRoute = () => {
    if (!selectedRoute) return null;

    const coordinates = [
      selectedRoute.origin,
      ...selectedRoute.waypoints,
      selectedRoute.destination,
    ];

    return (
      <>
        {/* Línea de la ruta */}
        <Polyline
          coordinates={coordinates}
          strokeColor="#007AFF"
          strokeWidth={3}
        />

        {/* Marcador de origen */}
        <Marker
          coordinate={selectedRoute.origin}
          pinColor="#34C759"
          title="Origen"
        />

        {/* Marcador de destino */}
        <Marker
          coordinate={selectedRoute.destination}
          pinColor="#FF3B30"
          title="Destino"
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        customMapStyle={mapStyle}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        showsScale
      >
        {renderParkingMarkers()}
        {renderRoute()}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
