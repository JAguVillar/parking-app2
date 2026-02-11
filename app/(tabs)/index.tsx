import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Platform } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ParkingMap } from '@/components/parking-map';
import { MOCK_ROUTES, Route, ParkingSpot } from '@/constants/mockRoutes';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HomeScreen() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedParkingSpot, setSelectedParkingSpot] = useState<ParkingSpot | null>(null);

  const cardBackgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({ light: '#E5E5EA', dark: '#38383A' }, 'text');
  const accentColor = useThemeColor({ light: '#007AFF', dark: '#0A84FF' }, 'tint');

  const handleRoutePress = (route: Route) => {
    setSelectedRoute(route.id === selectedRoute?.id ? null : route);
    setSelectedParkingSpot(null);
  };

  const handleParkingSpotPress = (spot: ParkingSpot) => {
    setSelectedParkingSpot(spot);
  };

  return (
    <View style={styles.container}>
      {/* Mapa */}
      <View style={styles.mapContainer}>
        <ParkingMap
          routes={MOCK_ROUTES}
          selectedRoute={selectedRoute}
          onParkingSpotPress={handleParkingSpotPress}
        />
      </View>

      {/* Panel de información */}
      <View style={styles.infoPanel}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.routesContainer}
        >
          {MOCK_ROUTES.map((route) => {
            const isSelected = selectedRoute?.id === route.id;
            return (
              <Pressable
                key={route.id}
                style={[
                  styles.routeCard,
                  {
                    backgroundColor: cardBackgroundColor,
                    borderColor: isSelected ? accentColor : borderColor,
                    borderWidth: isSelected ? 2 : 1,
                  },
                ]}
                onPress={() => handleRoutePress(route)}
              >
                <ThemedText type="defaultSemiBold" style={styles.routeName}>
                  {route.name}
                </ThemedText>
                <ThemedText style={styles.routeDetails}>
                  📍 {route.distance} km · ⏱️ {route.estimatedTime} min
                </ThemedText>
                <ThemedText style={styles.routeDetails}>
                  🅿️ {route.parkingSpots.length} estacionamientos
                </ThemedText>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Información del estacionamiento seleccionado */}
        {selectedParkingSpot && (
          <ThemedView style={[styles.spotInfo, { borderColor }]}>
            <ThemedText type="subtitle">{selectedParkingSpot.name}</ThemedText>
            <View style={styles.spotDetailsRow}>
              <ThemedText style={styles.spotDetail}>
                Disponibles: {selectedParkingSpot.availableSpots}/{selectedParkingSpot.totalSpots}
              </ThemedText>
              <ThemedText style={styles.spotDetail}>
                ${selectedParkingSpot.pricePerHour}/hr
              </ThemedText>
            </View>
            <ThemedText style={styles.spotDetail}>
              ⭐ {selectedParkingSpot.rating}/5.0
            </ThemedText>
          </ThemedView>
        )}

        {/* Instrucciones */}
        {!selectedRoute && !selectedParkingSpot && (
          <ThemedView style={styles.instructions}>
            <ThemedText type="defaultSemiBold" style={styles.instructionsTitle}>
              Encuentra tu estacionamiento
            </ThemedText>
            <ThemedText style={styles.instructionsText}>
              • Selecciona una ruta para ver su trayecto
            </ThemedText>
            <ThemedText style={styles.instructionsText}>
              • Toca los marcadores para ver detalles
            </ThemedText>
            <ThemedText style={styles.instructionsText}>
              • Verde: alta disponibilidad
            </ThemedText>
            <ThemedText style={styles.instructionsText}>
              • Naranja: disponibilidad media
            </ThemedText>
            <ThemedText style={styles.instructionsText}>
              • Rojo: baja disponibilidad
            </ThemedText>
          </ThemedView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  infoPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
  },
  routesContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  routeCard: {
    padding: 16,
    borderRadius: 12,
    minWidth: 200,
    gap: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  routeName: {
    fontSize: 16,
    marginBottom: 4,
  },
  routeDetails: {
    fontSize: 13,
    opacity: 0.8,
  },
  spotInfo: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  spotDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spotDetail: {
    fontSize: 14,
    opacity: 0.9,
  },
  instructions: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    gap: 6,
  },
  instructionsTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 13,
    opacity: 0.8,
  },
});
