/**
 * Datos mock para rutas de estacionamiento
 */

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface ParkingSpot {
  id: string;
  name: string;
  coordinate: Coordinate;
  availableSpots: number;
  totalSpots: number;
  pricePerHour: number;
  rating: number;
}

export interface Route {
  id: string;
  name: string;
  origin: Coordinate;
  destination: Coordinate;
  parkingSpots: ParkingSpot[];
  distance: number; // en kilómetros
  estimatedTime: number; // en minutos
  waypoints: Coordinate[];
}

// Coordenadas de ejemplo en Ciudad de México
export const MOCK_ROUTES: Route[] = [
  {
    id: 'route-1',
    name: 'Ruta Centro Histórico',
    origin: {
      latitude: 19.4326,
      longitude: -99.1332,
    },
    destination: {
      latitude: 19.4340,
      longitude: -99.1390,
    },
    distance: 2.3,
    estimatedTime: 15,
    waypoints: [
      { latitude: 19.4328, longitude: -99.1345 },
      { latitude: 19.4335, longitude: -99.1370 },
    ],
    parkingSpots: [
      {
        id: 'parking-1',
        name: 'Estacionamiento Zócalo',
        coordinate: {
          latitude: 19.4338,
          longitude: -99.1385,
        },
        availableSpots: 12,
        totalSpots: 50,
        pricePerHour: 35,
        rating: 4.5,
      },
      {
        id: 'parking-2',
        name: 'Parking Plaza de la República',
        coordinate: {
          latitude: 19.4335,
          longitude: -99.1375,
        },
        availableSpots: 5,
        totalSpots: 30,
        pricePerHour: 40,
        rating: 4.2,
      },
    ],
  },
  {
    id: 'route-2',
    name: 'Ruta Polanco - Reforma',
    origin: {
      latitude: 19.4340,
      longitude: -99.1900,
    },
    destination: {
      latitude: 19.4270,
      longitude: -99.1677,
    },
    distance: 4.5,
    estimatedTime: 25,
    waypoints: [
      { latitude: 19.4320, longitude: -99.1850 },
      { latitude: 19.4300, longitude: -99.1750 },
      { latitude: 19.4280, longitude: -99.1700 },
    ],
    parkingSpots: [
      {
        id: 'parking-3',
        name: 'Estacionamiento Antara',
        coordinate: {
          latitude: 19.4345,
          longitude: -99.1910,
        },
        availableSpots: 25,
        totalSpots: 100,
        pricePerHour: 50,
        rating: 4.8,
      },
      {
        id: 'parking-4',
        name: 'Parking Museo de Antropología',
        coordinate: {
          latitude: 19.4260,
          longitude: -99.1860,
        },
        availableSpots: 8,
        totalSpots: 40,
        pricePerHour: 45,
        rating: 4.3,
      },
      {
        id: 'parking-5',
        name: 'Estacionamiento Reforma 222',
        coordinate: {
          latitude: 19.4275,
          longitude: -99.1680,
        },
        availableSpots: 18,
        totalSpots: 80,
        pricePerHour: 55,
        rating: 4.6,
      },
    ],
  },
  {
    id: 'route-3',
    name: 'Ruta Roma - Condesa',
    origin: {
      latitude: 19.4120,
      longitude: -99.1700,
    },
    destination: {
      latitude: 19.4095,
      longitude: -99.1810,
    },
    distance: 1.8,
    estimatedTime: 12,
    waypoints: [
      { latitude: 19.4110, longitude: -99.1750 },
      { latitude: 19.4100, longitude: -99.1780 },
    ],
    parkingSpots: [
      {
        id: 'parking-6',
        name: 'Estacionamiento Plaza Río de Janeiro',
        coordinate: {
          latitude: 19.4110,
          longitude: -99.1730,
        },
        availableSpots: 15,
        totalSpots: 35,
        pricePerHour: 30,
        rating: 4.4,
      },
      {
        id: 'parking-7',
        name: 'Parking Parque México',
        coordinate: {
          latitude: 19.4098,
          longitude: -99.1800,
        },
        availableSpots: 3,
        totalSpots: 25,
        pricePerHour: 35,
        rating: 4.7,
      },
    ],
  },
  {
    id: 'route-4',
    name: 'Ruta Santa Fe',
    origin: {
      latitude: 19.3600,
      longitude: -99.2700,
    },
    destination: {
      latitude: 19.3580,
      longitude: -99.2590,
    },
    distance: 3.2,
    estimatedTime: 18,
    waypoints: [
      { latitude: 19.3590, longitude: -99.2650 },
      { latitude: 19.3585, longitude: -99.2620 },
    ],
    parkingSpots: [
      {
        id: 'parking-8',
        name: 'Estacionamiento Centro Santa Fe',
        coordinate: {
          latitude: 19.3585,
          longitude: -99.2600,
        },
        availableSpots: 45,
        totalSpots: 200,
        pricePerHour: 40,
        rating: 4.5,
      },
      {
        id: 'parking-9',
        name: 'Parking Samara',
        coordinate: {
          latitude: 19.3595,
          longitude: -99.2660,
        },
        availableSpots: 22,
        totalSpots: 75,
        pricePerHour: 38,
        rating: 4.3,
      },
    ],
  },
];

// Región inicial para el mapa (centro de las rutas)
export const INITIAL_REGION = {
  latitude: 19.4284,
  longitude: -99.1276,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Función helper para obtener una ruta por ID
export const getRouteById = (id: string): Route | undefined => {
  return MOCK_ROUTES.find((route) => route.id === id);
};

// Función helper para obtener todos los estacionamientos
export const getAllParkingSpots = (): ParkingSpot[] => {
  return MOCK_ROUTES.flatMap((route) => route.parkingSpots);
};
