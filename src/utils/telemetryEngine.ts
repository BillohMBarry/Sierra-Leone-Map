import { CityData, ProvinceData, RegionId } from '../data/sierraLeoneData';
import { INITIAL_REGIONAL_METRICS } from '../data/metric.js';

export type DataLayerId = 'political' | 'healthcare' | 'telecom' | 'energy' | 'agri_trade';

export interface LayerDefinition {
  id: DataLayerId;
  label: string;
  shortLabel: string;
  primaryMetricLabel: string;
  unit: string;
  description: string;
  choroplethTiers: {
    tier: 'Optimal' | 'Good' | 'Moderate' | 'Priority';
    rangeLabel: string;
    min: number;
    fillColor: string;
    badgeBg: string;
    badgeText: string;
  }[];
}

export interface SubMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  delta?: number;
  target?: number;
  progress?: number;
}

export interface RegionLayerTelemetry {
  regionId: RegionId;
  layerId: Exclude<DataLayerId, 'political'>;
  primaryScore: number; // 0 - 100
  delta?: number;
  statusLabel: 'Optimal' | 'Good' | 'Moderate' | 'Priority';
  headlineStat: string;
  subMetrics: SubMetric[];
  lastUpdatedIso: string;
}

export interface FieldReportEntry {
  id: string;
  cityId: string;
  cityName: string;
  regionId: RegionId;
  regionName: string;
  layerId: Exclude<DataLayerId, 'political'>;
  statusLevel: 'Nominal' | 'Maintenance' | 'Priority Alert';
  note: string;
  reporter: string;
  timestamp: string;
  gps: string;
}

export const DATA_LAYERS: LayerDefinition[] = [
  {
    id: 'political',
    label: 'Political',
    shortLabel: 'Political',
    primaryMetricLabel: 'Administrative Regions',
    unit: '',
    description: 'Official 5 provinces, 16 districts, capitals, and international boundaries.',
    choroplethTiers: [],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    shortLabel: 'Healthcare',
    primaryMetricLabel: 'Health Readiness Index',
    unit: '%',
    description: 'Hospital & PHU readiness, vaccine cold-chain uptime, and maternal care coverage.',
    choroplethTiers: [
      {
        tier: 'Optimal',
        rangeLabel: '80% – 100%',
        min: 80,
        fillColor: '#10b981',
        badgeBg: '#065f46',
        badgeText: '#ecfdf5',
      },
      {
        tier: 'Good',
        rangeLabel: '68% – 79%',
        min: 68,
        fillColor: '#34d399',
        badgeBg: '#047857',
        badgeText: '#ffffff',
      },
      {
        tier: 'Moderate',
        rangeLabel: '55% – 67%',
        min: 55,
        fillColor: '#6ee7b7',
        badgeBg: '#0f766e',
        badgeText: '#ffffff',
      },
      {
        tier: 'Priority',
        rangeLabel: '< 55%',
        min: 0,
        fillColor: '#a7f3d0',
        badgeBg: '#115e59',
        badgeText: '#ffffff',
      },
    ],
  },
  {
    id: 'telecom',
    label: 'Telecom',
    shortLabel: 'Telecom',
    primaryMetricLabel: '4G/Fiber Connectivity',
    unit: '%',
    description: '4G LTE/5G population coverage, national fiber backbone uptime, and throughput.',
    choroplethTiers: [
      {
        tier: 'Optimal',
        rangeLabel: '80% – 100%',
        min: 80,
        fillColor: '#3b82f6',
        badgeBg: '#1e3a8a',
        badgeText: '#eff6ff',
      },
      {
        tier: 'Good',
        rangeLabel: '68% – 79%',
        min: 68,
        fillColor: '#60a5fa',
        badgeBg: '#1d4ed8',
        badgeText: '#ffffff',
      },
      {
        tier: 'Moderate',
        rangeLabel: '55% – 67%',
        min: 55,
        fillColor: '#93c5fd',
        badgeBg: '#1e40af',
        badgeText: '#ffffff',
      },
      {
        tier: 'Priority',
        rangeLabel: '< 55%',
        min: 0,
        fillColor: '#bfdbfe',
        badgeBg: '#1e3a8a',
        badgeText: '#ffffff',
      },
    ],
  },
  {
    id: 'energy',
    label: 'Energy',
    shortLabel: 'Energy',
    primaryMetricLabel: 'Grid & Solar Uptime',
    unit: '%',
    description: 'National grid & solar mini-grid availability, Bumbuna hydro share, and load.',
    choroplethTiers: [
      {
        tier: 'Optimal',
        rangeLabel: '80% – 100%',
        min: 80,
        fillColor: '#f59e0b',
        badgeBg: '#78350f',
        badgeText: '#fffbeb',
      },
      {
        tier: 'Good',
        rangeLabel: '68% – 79%',
        min: 68,
        fillColor: '#fbbf24',
        badgeBg: '#92400e',
        badgeText: '#ffffff',
      },
      {
        tier: 'Moderate',
        rangeLabel: '55% – 67%',
        min: 55,
        fillColor: '#fcd34d',
        badgeBg: '#b45309',
        badgeText: '#ffffff',
      },
      {
        tier: 'Priority',
        rangeLabel: '< 55%',
        min: 0,
        fillColor: '#fde68a',
        badgeBg: '#92400e',
        badgeText: '#ffffff',
      },
    ],
  },
  {
    id: 'agri_trade',
    label: 'Agri & Trade',
    shortLabel: 'Agri & Trade',
    primaryMetricLabel: 'Agri-Trade Output Index',
    unit: '%',
    description: 'Rice & cocoa harvest index, port/border trade volume, and market supply.',
    choroplethTiers: [
      {
        tier: 'Optimal',
        rangeLabel: '80% – 100%',
        min: 80,
        fillColor: '#84cc16',
        badgeBg: '#365314',
        badgeText: '#f7fee7',
      },
      {
        tier: 'Good',
        rangeLabel: '68% – 79%',
        min: 68,
        fillColor: '#a3e635',
        badgeBg: '#3f6212',
        badgeText: '#ffffff',
      },
      {
        tier: 'Moderate',
        rangeLabel: '55% – 67%',
        min: 55,
        fillColor: '#bef264',
        badgeBg: '#4d7c0f',
        badgeText: '#ffffff',
      },
      {
        tier: 'Priority',
        rangeLabel: '< 55%',
        min: 0,
        fillColor: '#d9f99d',
        badgeBg: '#3f6212',
        badgeText: '#ffffff',
      },
    ],
  },
];

export function getLayerDefinition(layerId: DataLayerId): LayerDefinition {
  return DATA_LAYERS.find((l) => l.id === layerId) || DATA_LAYERS[0];
}

export function resolveChoroplethStyle(
  layerId: DataLayerId,
  score: number,
  defaultPoliticalColor: string
): {
  fillColor: string;
  badgeBg: string;
  badgeText: string;
  tier: 'Optimal' | 'Good' | 'Moderate' | 'Priority';
} {
  if (layerId === 'political') {
    return {
      fillColor: defaultPoliticalColor,
      badgeBg: '#0f172a',
      badgeText: '#ffffff',
      tier: 'Optimal',
    };
  }
  const def = getLayerDefinition(layerId);
  for (const t of def.choroplethTiers) {
    if (score >= t.min) {
      return {
        fillColor: t.fillColor,
        badgeBg: t.badgeBg,
        badgeText: t.badgeText,
        tier: t.tier,
      };
    }
  }
  const fallback = def.choroplethTiers[def.choroplethTiers.length - 1];
  return {
    fillColor: fallback.fillColor,
    badgeBg: fallback.badgeBg,
    badgeText: fallback.badgeText,
    tier: fallback.tier,
  };
}

export type TelemetryStore = Record<
  RegionId,
  Record<Exclude<DataLayerId, 'political'>, RegionLayerTelemetry>
>;

// Legacy inline telemetry values are replaced by metric.js as the regional data source.
type MetricSourceLayer = {
  score: number;
  badge: string;
  kpis: { label: string; value: number; suffix: string; progress: number }[];
};

type MetricSourceRegion = {
  healthcare: MetricSourceLayer;
  telecoms: MetricSourceLayer;
  energy: MetricSourceLayer;
  agri: MetricSourceLayer;
};

type MetricSourceRegionId = 'western' | 'southern' | 'eastern' | 'northern' | 'northwest';

const metricSource = INITIAL_REGIONAL_METRICS as Record<MetricSourceRegionId, MetricSourceRegion>;

function mapMetricRegion(
  regionId: RegionId,
  source: MetricSourceRegion
): TelemetryStore[RegionId] {
  const mapLayer = (
    layerId: Exclude<DataLayerId, 'political'>,
    sourceLayer: MetricSourceLayer
  ): RegionLayerTelemetry => ({
    regionId,
    layerId,
    primaryScore: sourceLayer.score,
    statusLabel: resolveChoroplethStyle(layerId, sourceLayer.score, '#ffffff').tier,
    headlineStat: sourceLayer.badge,
    lastUpdatedIso: new Date().toISOString(),
    subMetrics: sourceLayer.kpis.map((kpi, index) => ({
      id: `${layerId}-${index + 1}`,
      label: kpi.label,
      value: kpi.value,
      unit: kpi.suffix.trim(),
      progress: kpi.progress,
    })),
  });

  return {
    healthcare: mapLayer('healthcare', source.healthcare),
    telecom: mapLayer('telecom', source.telecoms),
    energy: mapLayer('energy', source.energy),
    agri_trade: mapLayer('agri_trade', source.agri),
  };
}

export function createInitialTelemetryStore(): TelemetryStore {
  return {
    western: mapMetricRegion('western', metricSource.western),
    southern: mapMetricRegion('southern', metricSource.southern),
    eastern: mapMetricRegion('eastern', metricSource.eastern),
    northern: mapMetricRegion('northern', metricSource.northern),
    'north-west': mapMetricRegion('north-west', metricSource.northwest),
  };
}

export function simulateTelemetryTick(
  store: TelemetryStore,
  tickCount: number,
  timestampIso: string
): TelemetryStore {
  const next: TelemetryStore = JSON.parse(JSON.stringify(store));
  const regions: RegionId[] = ['western', 'southern', 'eastern', 'northern', 'north-west'];
  const layers: Exclude<DataLayerId, 'political'>[] = [
    'healthcare',
    'telecom',
    'energy',
    'agri_trade',
  ];

  regions.forEach((rId, rIdx) => {
    layers.forEach((lId, lIdx) => {
      const entry = next[rId][lId];
      entry.regionId = rId;
      const wave = Math.sin((tickCount + 1) * 0.85 + rIdx * 1.3 + lIdx * 0.9);
      const step = Number((wave * 0.7).toFixed(1));
      const updatedScore = Math.min(98.5, Math.max(48.0, Number((entry.primaryScore + step).toFixed(1))));
      const delta = Number((updatedScore - entry.primaryScore).toFixed(1));

      entry.primaryScore = updatedScore;
      entry.delta = delta === 0 ? 0.3 : delta;
      entry.lastUpdatedIso = timestampIso;

      const style = resolveChoroplethStyle(lId, updatedScore, '#ffffff');
      entry.statusLabel = style.tier;

      entry.subMetrics = entry.subMetrics.map((sm, sIdx) => {
        const subWave = Math.cos((tickCount + 1) * 0.7 + sIdx * 1.1 + rIdx);
        const factor = sm.unit === '%' ? 0.5 : sm.unit === 'tonnes' ? 15 : 0.4;
        const smDelta = Number((subWave * factor).toFixed(1));
        const nextVal =
          sm.unit === '%'
            ? Math.min(99.8, Math.max(40, Number((sm.value + smDelta).toFixed(1))))
            : Math.max(5, Number((sm.value + smDelta).toFixed(1)));
        return {
          ...sm,
          value: nextVal,
          delta: smDelta === 0 ? 0.2 : smDelta,
        };
      });
    });
  });

  return next;
}

export function formatMetricsToCsv(
  city: CityData,
  province: ProvinceData,
  activeLayer: DataLayerId,
  store: TelemetryStore
): string {
  const targetLayers: Exclude<DataLayerId, 'political'>[] =
    activeLayer === 'political'
      ? ['healthcare', 'telecom', 'energy', 'agri_trade']
      : [activeLayer];

  const rows: string[] = [
    'City,Region,GPS_Latitude,GPS_Longitude,Layer,Metric_Name,Value,Unit,Delta,Target,Status,Last_Updated',
  ];

  for (const lId of targetLayers) {
    const telemetry = store[city.regionId][lId];
    for (const sm of telemetry.subMetrics) {
      rows.push(
        [
          `"${city.name}"`,
          `"${province.name}"`,
          city.lat.toFixed(4),
          city.lng.toFixed(4),
          lId,
          `"${sm.label}"`,
          sm.value,
          `"${sm.unit}"`,
          sm.delta,
          sm.target,
          telemetry.statusLabel,
          telemetry.lastUpdatedIso,
        ].join(',')
      );
    }
  }

  return rows.join('\n');
}

export function formatMetricsToJson(
  city: CityData,
  province: ProvinceData,
  activeLayer: DataLayerId,
  store: TelemetryStore,
  fieldReports: FieldReportEntry[]
): string {
  const payload = {
    exportedAt: new Date().toISOString(),
    city: {
      id: city.id,
      name: city.name,
      status: city.status,
      population: city.population,
      gps: { lat: city.lat, lng: city.lng },
      district: city.keyFacts.district,
    },
    province: {
      id: province.id,
      name: province.name,
      capital: province.capitalName,
      population: province.population,
    },
    activeLayer,
    regionalTelemetry: store[city.regionId],
    recentFieldReports: fieldReports.filter((r) => r.cityId === city.id || r.regionId === city.regionId),
  };

  return JSON.stringify(payload, null, 2);
}

export function buildWhatsAppFieldReportMessage(
  city: CityData,
  layerId: Exclude<DataLayerId, 'political'>,
  telemetry: RegionLayerTelemetry,
  statusLevel: 'Nominal' | 'Maintenance' | 'Priority Alert',
  note: string,
  reporter: string
): string {
  const layerDef = getLayerDefinition(layerId);
  const cleanNote = note.trim() || `Routine ${layerDef.label} telemetry verification in ${city.name}.`;
  const cleanReporter = reporter.trim() || 'Field Operations Team';

  const lines = [
    `*SIERRA LEONE REGIONAL FIELD REPORT*`,
    `📍 *Location:* ${city.name} (${city.keyFacts.district}, ${city.regionName})`,
    `🧭 *GPS:* ${city.lat.toFixed(4)}° N, ${Math.abs(city.lng).toFixed(4)}° W`,
    `📊 *Sector Layer:* ${layerDef.label} (${layerDef.primaryMetricLabel})`,
    `⚡ *Regional Score:* ${telemetry.primaryScore.toFixed(1)}% (${telemetry.statusLabel})`,
    `🚦 *Field Status:* ${statusLevel}`,
    `📝 *Observation:* ${cleanNote}`,
    `👤 *Reported by:* ${cleanReporter}`,
  ];

  return lines.join('\n');
}
