declare namespace naver {
  namespace maps {
    class Map {
      constructor(mapDiv: HTMLElement, mapOptions?: MapOptions);
      setCenter(latlng: LatLng): void;
      setZoom(level: number): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
    }

    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
    }

    class InfoWindow {
      constructor(options: InfoWindowOptions);
      open(map: Map, marker: Marker): void;
      close(): void;
      setContent(content: string): void;
    }

    class Point {
      constructor(x: number, y: number);
    }

    const Event: {
      addListener(obj: any, eventName: string, handler: Function): any;
      removeListener(listeners: any): void;
    };

    enum Position {
      TOP = 0,
      RIGHT = 1,
      BOTTOM = 2,
      LEFT = 3,
      TOP_LEFT = 4,
      TOP_RIGHT = 5,
      BOTTOM_LEFT = 6,
      BOTTOM_RIGHT = 7,
      CENTER = 8
    }

    interface MapOptions {
      center?: LatLng;
      zoom?: number;
      minZoom?: number;
      maxZoom?: number;
      zoomControl?: boolean;
      zoomControlOptions?: {
        position?: Position;
      };
    }

    interface MarkerOptions {
      position: LatLng;
      map?: Map;
      icon?: {
        content: string;
        anchor: Point;
      } | string;
      title?: string;
      draggable?: boolean;
      clickable?: boolean;
      visible?: boolean;
      zIndex?: number;
    }

    interface InfoWindowOptions {
      content: string;
      zIndex?: number;
      maxWidth?: number;
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
      disableAnchor?: boolean;
    }
  }
} 