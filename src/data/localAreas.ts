import type { RegionId } from './sierraLeoneData';
import type { LngLat } from './sierraLeoneGeoJson';

export interface LocalAreaFeature {
  id: string;
  name: string;
  provinceId: RegionId;
  districtName: string;
  provinceName: string;
  rings: LngLat[][];
  center: LngLat;
}

const REGION_ID_BY_PCODE: Record<string, RegionId> = {
  SL01: 'eastern',
  SL02: 'northern',
  SL03: 'southern',
  SL04: 'western',
  SL05: 'north-west',
};

interface GeoJsonProperties {
  adm3_name: string;
  adm3_pcode: string;
  adm2_name: string;
  adm2_pcode: string;
  adm1_name: string;
  adm1_pcode: string;
  center_lon: number;
  center_lat: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseProperties(value: unknown): GeoJsonProperties | null {
  if (!isRecord(value)) return null;

  const {
    adm3_name,
    adm3_pcode,
    adm2_name,
    adm2_pcode,
    adm1_name,
    adm1_pcode,
    center_lon,
    center_lat,
  } = value;
  if (
    typeof adm3_name !== 'string' ||
    typeof adm3_pcode !== 'string' ||
    typeof adm2_name !== 'string' ||
    typeof adm2_pcode !== 'string' ||
    typeof adm1_name !== 'string' ||
    typeof adm1_pcode !== 'string' ||
    typeof center_lon !== 'number' ||
    typeof center_lat !== 'number'
  ) {
    return null;
  }

  return {
    adm3_name,
    adm3_pcode,
    adm2_name,
    adm2_pcode,
    adm1_name,
    adm1_pcode,
    center_lon,
    center_lat,
  };
}

function isLngLat(value: unknown): value is LngLat {
  return (
    Array.isArray(value) &&
    value.length >= 2 &&
    typeof value[0] === 'number' &&
    Number.isFinite(value[0]) &&
    typeof value[1] === 'number' &&
    Number.isFinite(value[1])
  );
}

function parseRings(value: unknown): LngLat[][] | null {
  if (!Array.isArray(value)) return null;

  const rings: LngLat[][] = [];
  for (const ring of value) {
    if (!Array.isArray(ring) || !ring.every(isLngLat)) return null;
    rings.push(ring as LngLat[]);
  }
  return rings.length > 0 ? rings : null;
}

export function parseLocalAreas(value: unknown): LocalAreaFeature[] {
  if (!isRecord(value) || !Array.isArray(value.features)) {
    throw new Error('The local-area GeoJSON does not contain a features array.');
  }

  return value.features.map((feature, index) => {
    if (!isRecord(feature) || !isRecord(feature.geometry)) {
      throw new Error(`Local-area GeoJSON feature ${index + 1} has no valid geometry.`);
    }

    const properties = parseProperties(feature.properties);
    if (!properties) {
      throw new Error(`Local-area GeoJSON feature ${index + 1} has invalid administrative properties.`);
    }
    const provinceId = REGION_ID_BY_PCODE[properties.adm1_pcode];
    if (!provinceId) {
      throw new Error(`Local-area GeoJSON feature ${index + 1} has an unknown province code.`);
    }

    const geometry = feature.geometry;
    let rings: LngLat[][] | null = null;
    if (geometry.type === 'Polygon') {
      rings = parseRings(geometry.coordinates);
    } else if (geometry.type === 'MultiPolygon' && Array.isArray(geometry.coordinates)) {
      const polygons = geometry.coordinates.map(parseRings);
      if (polygons.every((polygon): polygon is LngLat[][] => polygon !== null)) {
        rings = polygons.flat();
      }
    }

    if (!rings) {
      throw new Error(`Local-area GeoJSON feature ${index + 1} has unsupported or invalid coordinates.`);
    }

    return {
      id: properties.adm3_pcode,
      name: properties.adm3_name,
      provinceId,
      districtName: properties.adm2_name,
      provinceName: properties.adm1_name,
      rings,
      center: [properties.center_lon, properties.center_lat],
    };
  });
}

export function normalizeAdministrativeName(name: string): string {
  const normalized = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  if (normalized === 'fabala') return 'falaba';
  if (normalized === 'northwestern') return 'northwest';
  return normalized;
}

let localAreasPromise: Promise<LocalAreaFeature[]> | null = null;

export function loadLocalAreas(): Promise<LocalAreaFeature[]> {
  if (!localAreasPromise) {
    localAreasPromise = fetch(
      new URL('./sle_admin_boundaries.geojson/sle_admin3.geojson', import.meta.url)
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load HDX local-area boundaries (${response.status}).`);
        }
        return response.json() as Promise<unknown>;
      })
      .then(parseLocalAreas)
      .catch((error: unknown) => {
        localAreasPromise = null;
        throw error;
      });
  }
  return localAreasPromise;
}
