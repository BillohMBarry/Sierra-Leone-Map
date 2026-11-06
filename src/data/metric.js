export const INITIAL_REGIONAL_METRICS = {
  western: {
    healthcare: {
      score: 92,
      fill: '#0f766e',
      hover: '#115e59',
      badge: '92% Ready · 168 PHUs',
      status: 'Optimal',
      primaryLabel: 'Facility Readiness',
      kpis: [
        { label: 'Active Hospitals & PHUs', value: 168, suffix: ' units', progress: 94 },
        { label: 'Essential Medicine Stock', value: 91.4, suffix: '%', progress: 91 },
        { label: 'Active NEMS Ambulances', value: 38, suffix: ' vehicles', progress: 88 },
        { label: 'Avg Emergency Response', value: 14, suffix: ' mins', progress: 86 }
      ],
      districts: [
        { name: 'Western Area Urban (Freetown)', metric: '112 Facilities', status: '95% Stock', trend: '+2.4%' },
        { name: 'Western Area Rural (Waterloo)', metric: '56 Facilities', status: '88% Stock', trend: '+4.1%' }
      ]
    },
    telecoms: {
      score: 96,
      fill: '#3730a3',
      hover: '#312e81',
      badge: '96.4% 4G · 4.2k Agents',
      status: 'Optimal',
      primaryLabel: '4G/LTE Population Reach',
      kpis: [
        { label: '4G / LTE Coverage', value: 96.4, suffix: '%', progress: 96 },
        { label: 'Active Mobile Money Hubs', value: 4250, suffix: ' agents', progress: 95 },
        { label: 'Metro Fiber & Starlink Nodes', value: 312, suffix: ' nodes', progress: 90 },
        { label: 'Core Network Uptime', value: 99.6, suffix: '%', progress: 99 }
      ],
      districts: [
        { name: 'Freetown Metro Core', metric: '98.8% 4G/5G', status: '185 Fiber Nodes', trend: '+1.8%' },
        { name: 'Peninsula & Waterloo Corridor', metric: '92.1% 4G', status: '127 Nodes', trend: '+5.3%' }
      ]
    },
    energy: {
      score: 82,
      fill: '#b45309',
      hover: '#92400e',
      badge: '82% Grid · 94 MW Load',
      status: 'High Demand',
      primaryLabel: 'Grid & Solar Access Rate',
      kpis: [
        { label: 'Household Electrification', value: 82.5, suffix: '%', progress: 83 },
        { label: 'Peak Generation Load', value: 94.2, suffix: ' MW', progress: 86 },
        { label: 'Commercial Solar Microgrids', value: 44, suffix: ' sites', progress: 78 },
        { label: 'Grid Stability Index', value: 87.0, suffix: '%', progress: 87 }
      ],
      districts: [
        { name: 'Kingtom / Blackhall Grid', metric: '68.4 MW', status: '89% Uptime', trend: '+3.0%' },
        { name: 'Western Rural Solar-Hybrid', metric: '25.8 MW', status: '84% Uptime', trend: '+6.2%' }
      ]
    },
    agri: {
      score: 89,
      fill: '#166534',
      hover: '#14532d',
      badge: '89 Idx · Port & Fisheries',
      status: 'Optimal',
      primaryLabel: 'Trade & Fisheries Output Index',
      kpis: [
        { label: 'Port & Market Trade Index', value: 89.2, suffix: '/100', progress: 89 },
        { label: 'Artisanal & Marine Catch', value: 42.8, suffix: 'k MT/yr', progress: 85 },
        { label: 'Food Price Stability', value: 84.5, suffix: '%', progress: 85 },
        { label: 'Peri-Urban Vegetable Farms', value: 640, suffix: ' co-ops', progress: 80 }
      ],
      districts: [
        { name: 'QE II Quay & Kissy Trade Hub', metric: '64% Natl Imports', status: 'High Volume', trend: '+4.7%' },
        { name: 'Tombo & Goderich Fisheries', metric: '28.4k MT Catch', status: 'Active Cold-Chain', trend: '+3.2%' }
      ]
    }
  },
  southern: {
    healthcare: {
      score: 81,
      fill: '#14b8a6',
      hover: '#0d9488',
      badge: '81% Ready · 312 PHUs',
      status: 'Optimal',
      primaryLabel: 'Facility Readiness',
      kpis: [
        { label: 'Active Hospitals & PHUs', value: 312, suffix: ' units', progress: 84 },
        { label: 'Essential Medicine Stock', value: 82.6, suffix: '%', progress: 83 },
        { label: 'Active NEMS Ambulances', value: 32, suffix: ' vehicles', progress: 80 },
        { label: 'Avg Emergency Response', value: 22, suffix: ' mins', progress: 76 }
      ],
      districts: [
        { name: 'Bo District (Bo Govt Hospital)', metric: '118 Facilities', status: '88% Stock', trend: '+3.1%' },
        { name: 'Moyamba & Pujehun', metric: '136 Facilities', status: '79% Stock', trend: '+2.5%' },
        { name: 'Bonthe & Sherbro Island', metric: '58 Facilities', status: 'Boat Ambulance', trend: '+4.0%' }
      ]
    },
    telecoms: {
      score: 82,
      fill: '#6366f1',
      hover: '#4f46e5',
      badge: '82.1% 4G · 2.6k Agents',
      status: 'Optimal',
      primaryLabel: '4G/LTE Population Reach',
      kpis: [
        { label: '4G / LTE Coverage', value: 82.1, suffix: '%', progress: 82 },
        { label: 'Active Mobile Money Hubs', value: 2640, suffix: ' agents', progress: 84 },
        { label: 'Regional Fiber & Starlink Nodes', value: 148, suffix: ' nodes', progress: 78 },
        { label: 'Core Network Uptime', value: 97.8, suffix: '%', progress: 98 }
      ],
      districts: [
        { name: 'Bo Urban & Njala Campus', metric: '91.5% 4G', status: 'Fiber Backbone', trend: '+3.8%' },
        { name: 'Moyamba & Imperri Mining Belt', metric: '79.0% 4G', status: 'High Uptime', trend: '+2.9%' },
        { name: 'Pujehun & Bonthe Coastal', metric: '72.4% 3G/4G', status: 'Expanding', trend: '+5.1%' }
      ]
    },
    energy: {
      score: 58,
      fill: '#f59e0b',
      hover: '#d97706',
      badge: '58% Access · 28 Solar Grids',
      status: 'Expansion Zone',
      primaryLabel: 'Grid & Solar Access Rate',
      kpis: [
        { label: 'Regional Electrification', value: 58.4, suffix: '%', progress: 58 },
        { label: 'Bo–Kenema Grid + Solar', value: 36.5, suffix: ' MW', progress: 72 },
        { label: 'Active Rural Solar Mini-Grids', value: 28, suffix: ' towns', progress: 82 },
        { label: 'Grid Stability Index', value: 83.2, suffix: '%', progress: 83 }
      ],
      districts: [
        { name: 'Bo City CLSG Grid Network', metric: '24.2 MW', status: '91% Uptime', trend: '+4.5%' },
        { name: 'Moyamba / Pujehun Mini-Grids', metric: '8.4 MW Solar', status: '19 Hubs Active', trend: '+7.8%' },
        { name: 'Bonthe Island Solar Grid', metric: '3.9 MW Solar', status: '94% Uptime', trend: '+3.4%' }
      ]
    },
    agri: {
      score: 86,
      fill: '#22c55e',
      hover: '#16a34a',
      badge: '86 Idx · Rice, Oil Palm & Rutile',
      status: 'Optimal',
      primaryLabel: 'Agri & Mineral Production Index',
      kpis: [
        { label: 'Agri-Commodity Yield Index', value: 86.4, suffix: '/100', progress: 86 },
        { label: 'Rice & Cassava Output', value: 318, suffix: 'k MT/yr', progress: 88 },
        { label: 'Oil Palm & Ginger Trade', value: 74.2, suffix: 'k MT/yr', progress: 81 },
        { label: 'Active Farmer Co-ops', value: 1420, suffix: ' groups', progress: 85 }
      ],
      districts: [
        { name: 'Torma Bum & Sewa Rice Bowl', metric: '145k MT Rice', status: 'Peak Harvest', trend: '+6.4%' },
        { name: 'Pujehun Oil Palm Corridor', metric: '52k MT Palm Oil', status: 'Export Ready', trend: '+4.1%' },
        { name: 'Imperri Rutile & Bauxite Belt', metric: 'High Output', status: 'Active Haulage', trend: '+2.8%' }
      ]
    }
  },
  eastern: {
    healthcare: {
      score: 78,
      fill: '#14b8a6',
      hover: '#0d9488',
      badge: '78% Ready · 286 PHUs',
      status: 'Optimal',
      primaryLabel: 'Facility Readiness',
      kpis: [
        { label: 'Active Hospitals & PHUs', value: 286, suffix: ' units', progress: 80 },
        { label: 'Essential Medicine Stock', value: 80.2, suffix: '%', progress: 80 },
        { label: 'Active NEMS Ambulances', value: 29, suffix: ' vehicles', progress: 77 },
        { label: 'Avg Emergency Response', value: 24, suffix: ' mins', progress: 74 }
      ],
      districts: [
        { name: 'Kenema District (Govt Hospital)', metric: '114 Facilities', status: '86% Stock', trend: '+3.5%' },
        { name: 'Kono District (Koidu Hospital)', metric: '92 Facilities', status: '81% Stock', trend: '+2.9%' },
        { name: 'Kailahun Border Corridor', metric: '80 Facilities', status: '76% Stock', trend: '+4.2%' }
      ]
    },
    telecoms: {
      score: 79,
      fill: '#6366f1',
      hover: '#4f46e5',
      badge: '79.3% 4G · 2.4k Agents',
      status: 'High Demand',
      primaryLabel: '4G/LTE Population Reach',
      kpis: [
        { label: '4G / LTE Coverage', value: 79.3, suffix: '%', progress: 79 },
        { label: 'Active Mobile Money Hubs', value: 2410, suffix: ' agents', progress: 82 },
        { label: 'Regional Fiber & Starlink Nodes', value: 134, suffix: ' nodes', progress: 75 },
        { label: 'Core Network Uptime', value: 96.9, suffix: '%', progress: 97 }
      ],
      districts: [
        { name: 'Kenema & Koidu Urban Centers', metric: '89.4% 4G', status: 'High Traffic', trend: '+4.4%' },
        { name: 'Kailahun & Pendembu Trade Hub', metric: '74.2% 4G', status: 'Cross-Border Link', trend: '+5.0%' }
      ]
    },
    energy: {
      score: 61,
      fill: '#f59e0b',
      hover: '#d97706',
      badge: '61% Access · CLSG + Solar',
      status: 'Expansion Zone',
      primaryLabel: 'Grid & Solar Access Rate',
      kpis: [
        { label: 'Regional Electrification', value: 61.2, suffix: '%', progress: 61 },
        { label: 'CLSG Interconnector + Hydro', value: 41.0, suffix: ' MW', progress: 76 },
        { label: 'Active Rural Solar Mini-Grids', value: 24, suffix: ' towns', progress: 79 },
        { label: 'Grid Stability Index', value: 85.4, suffix: '%', progress: 85 }
      ],
      districts: [
        { name: 'Kenema & Koidu CLSG Line', metric: '31.5 MW', status: '92% Uptime', trend: '+5.6%' },
        { name: 'Kailahun & Daru Solar Grids', metric: '9.5 MW Hybrid', status: '16 Hubs Active', trend: '+6.1%' }
      ]
    },
    agri: {
      score: 91,
      fill: '#166534',
      hover: '#14532d',
      badge: '91 Idx · Cocoa, Coffee & Diamonds',
      status: 'Optimal',
      primaryLabel: 'Export Commodity & Mining Index',
      kpis: [
        { label: 'Export Commodity Yield Index', value: 91.4, suffix: '/100', progress: 91 },
        { label: 'Cocoa & Coffee Production', value: 88.5, suffix: 'k MT/yr', progress: 93 },
        { label: 'Artisanal & Kimberlite Output', value: 94.0, suffix: ' Idx', progress: 90 },
        { label: 'Certified Agro-Forestry Co-ops', value: 1680, suffix: ' groups', progress: 89 }
      ],
      districts: [
        { name: 'Kailahun & Pendembu Cocoa Belt', metric: '62% Natl Cocoa', status: 'Peak Export', trend: '+7.2%' },
        { name: 'Kono (Koidu/Yengema) Mining', metric: 'Top Diamond Hub', status: 'High Output', trend: '+4.8%' },
        { name: 'Kenema Timber & Gola Buffer', metric: '26.5k MT Coffee', status: 'Shade-Grown', trend: '+3.9%' }
      ]
    }
  },
  northern: {
    healthcare: {
      score: 73,
      fill: '#5eead4',
      hover: '#2dd4bf',
      badge: '73% Ready · 248 PHUs',
      status: 'Expansion Zone',
      primaryLabel: 'Facility Readiness',
      kpis: [
        { label: 'Active Hospitals & PHUs', value: 248, suffix: ' units', progress: 75 },
        { label: 'Essential Medicine Stock', value: 76.4, suffix: '%', progress: 76 },
        { label: 'Active NEMS Ambulances', value: 27, suffix: ' vehicles', progress: 74 },
        { label: 'Avg Emergency Response', value: 28, suffix: ' mins', progress: 68 }
      ],
      districts: [
        { name: 'Bombali (Makeni Regional Hosp)', metric: '96 Facilities', status: '85% Stock', trend: '+3.2%' },
        { name: 'Tonkolili (Magburaka)', metric: '78 Facilities', status: '76% Stock', trend: '+2.7%' },
        { name: 'Koinadugu & Falaba Highlands', metric: '74 Facilities', status: 'Mobile Clinics', trend: '+4.9%' }
      ]
    },
    telecoms: {
      score: 74,
      fill: '#a5b4fc',
      hover: '#818cf8',
      badge: '74.2% 4G · 1.9k Agents',
      status: 'Expansion Zone',
      primaryLabel: '4G/LTE Population Reach',
      kpis: [
        { label: '4G / LTE Coverage', value: 74.2, suffix: '%', progress: 74 },
        { label: 'Active Mobile Money Hubs', value: 1920, suffix: ' agents', progress: 76 },
        { label: 'Regional Fiber & Starlink Nodes', value: 118, suffix: ' nodes', progress: 72 },
        { label: 'Core Network Uptime', value: 96.2, suffix: '%', progress: 96 }
      ],
      districts: [
        { name: 'Makeni Smart City & UNIMAK', metric: '90.2% 4G', status: 'Fiber Ring', trend: '+4.1%' },
        { name: 'Kabala & Tonkolili Corridor', metric: '71.5% 4G/3G', status: 'New Towers', trend: '+6.0%' },
        { name: 'Falaba Highland Communities', metric: '61.8% 3G/Sat', status: 'Starlink Backhaul', trend: '+8.3%' }
      ]
    },
    energy: {
      score: 68,
      fill: '#f59e0b',
      hover: '#d97706',
      badge: '68% Access · Bumbuna Hydro',
      status: 'Optimal',
      primaryLabel: 'Hydro & Solar Generation Rate',
      kpis: [
        { label: 'Regional Electrification', value: 68.0, suffix: '%', progress: 68 },
        { label: 'Bumbuna Hydro + Solar Park', value: 54.5, suffix: ' MW', progress: 84 },
        { label: 'Active Rural Solar Mini-Grids', value: 31, suffix: ' towns', progress: 85 },
        { label: 'Grid Stability Index', value: 88.5, suffix: '%', progress: 89 }
      ],
      districts: [
        { name: 'Bumbuna Hydroelectric Corridor', metric: '50.0 MW Hydro', status: 'Primary Source', trend: '+2.9%' },
        { name: 'Makeni & Kabala Solar Grids', metric: '4.5 MW Solar', status: '93% Uptime', trend: '+5.4%' }
      ]
    },
    agri: {
      score: 82,
      fill: '#22c55e',
      hover: '#16a34a',
      badge: '82 Idx · Cattle, Rice & Iron Ore',
      status: 'Optimal',
      primaryLabel: 'Agri, Livestock & Mining Index',
      kpis: [
        { label: 'Regional Production Index', value: 82.1, suffix: '/100', progress: 82 },
        { label: 'Upland & Boli-Land Rice', value: 275, suffix: 'k MT/yr', progress: 84 },
        { label: 'Koinadugu Vegetables & Cattle', value: 68.0, suffix: 'k heads', progress: 87 },
        { label: 'Tonkolili Iron Ore Haulage', value: 91.5, suffix: ' Idx', progress: 91 }
      ],
      districts: [
        { name: 'Kabala & Falaba Highland Farms', metric: 'Top Veg/Cattle', status: 'Fresh Supply', trend: '+5.5%' },
        { name: 'Bombali Boli-Lands Rice Belt', metric: '165k MT Rice', status: 'Mechanized', trend: '+4.3%' },
        { name: 'Tonkolili Iron Ore Corridor', metric: 'Heavy Rail Active', status: 'Peak Export', trend: '+6.1%' }
      ]
    }
  },
  northwest: {
    healthcare: {
      score: 71,
      fill: '#5eead4',
      hover: '#2dd4bf',
      badge: '71% Ready · 214 PHUs',
      status: 'Expansion Zone',
      primaryLabel: 'Facility Readiness',
      kpis: [
        { label: 'Active Hospitals & PHUs', value: 214, suffix: ' units', progress: 73 },
        { label: 'Essential Medicine Stock', value: 75.8, suffix: '%', progress: 76 },
        { label: 'Active NEMS Ambulances', value: 22, suffix: ' vehicles', progress: 72 },
        { label: 'Avg Emergency Response', value: 25, suffix: ' mins', progress: 71 }
      ],
      districts: [
        { name: 'Port Loko & Lunsar Corridor', metric: '104 Facilities', status: '82% Stock', trend: '+3.8%' },
        { name: 'Kambia Cross-Border Health', metric: '64 Facilities', status: '75% Stock', trend: '+3.1%' },
        { name: 'Karene (Kamakwie)', metric: '46 Facilities', status: '71% Stock', trend: '+4.6%' }
      ]
    },
    telecoms: {
      score: 76,
      fill: '#a5b4fc',
      hover: '#818cf8',
      badge: '76.5% 4G · 1.8k Agents',
      status: 'Optimal',
      primaryLabel: '4G/LTE Population Reach',
      kpis: [
        { label: '4G / LTE Coverage', value: 76.5, suffix: '%', progress: 77 },
        { label: 'Active Mobile Money Hubs', value: 1840, suffix: ' agents', progress: 79 },
        { label: 'Airport & Border Fiber Nodes', value: 112, suffix: ' nodes', progress: 76 },
        { label: 'Core Network Uptime', value: 97.4, suffix: '%', progress: 97 }
      ],
      districts: [
        { name: 'Lungi Airport & Port Loko Hub', metric: '92.0% 4G', status: 'Redundant Fiber', trend: '+3.6%' },
        { name: 'Kambia–Pamelap Trade Border', metric: '78.4% 4G', status: 'High Roaming', trend: '+5.2%' },
        { name: 'Karene Rural Interior', metric: '64.0% 3G/4G', status: 'Expanding', trend: '+6.7%' }
      ]
    },
    energy: {
      score: 52,
      fill: '#fcd34d',
      hover: '#fbbf24',
      badge: '52% Access · Lungi + Solar',
      status: 'Expansion Zone',
      primaryLabel: 'Grid & Solar Access Rate',
      kpis: [
        { label: 'Regional Electrification', value: 52.4, suffix: '%', progress: 52 },
        { label: 'Lungi–Port Loko Grid + Solar', value: 29.8, suffix: ' MW', progress: 68 },
        { label: 'Active Rural Solar Mini-Grids', value: 26, suffix: ' towns', progress: 80 },
        { label: 'Grid Stability Index', value: 81.6, suffix: '%', progress: 82 }
      ],
      districts: [
        { name: 'Lungi Airport & Pepel Port Grid', metric: '18.5 MW', status: '94% Uptime', trend: '+4.0%' },
        { name: 'Kambia & Rokupr Solar Mini-Grids', metric: '7.2 MW Solar', status: '18 Hubs Active', trend: '+6.8%' },
        { name: 'Kamakwie Off-Grid Solar', metric: '4.1 MW Solar', status: 'Expanding', trend: '+5.9%' }
      ]
    },
    agri: {
      score: 88,
      fill: '#166534',
      hover: '#14532d',
      badge: '88 Idx · Scarcies Rice & Port',
      status: 'Optimal',
      primaryLabel: 'Rice Bowl & Cross-Border Trade',
      kpis: [
        { label: 'Agri & Trade Output Index', value: 88.2, suffix: '/100', progress: 88 },
        { label: 'Scarcies Mangrove Rice Yield', value: 342, suffix: 'k MT/yr', progress: 92 },
        { label: 'Guinea Cross-Border Trade', value: 85.6, suffix: ' Idx', progress: 86 },
        { label: 'Marampa–Pepel Mineral Export', value: 90.4, suffix: ' Idx', progress: 90 }
      ],
      districts: [
        { name: 'Kambia & Rokupr Rice Research', metric: '38% Natl Rice', status: 'Bumper Yield', trend: '+6.9%' },
        { name: 'Gbalamuya Border Trade Post', metric: 'Peak ECOWAS Flow', status: '24/7 Customs', trend: '+5.4%' },
        { name: 'Lunsar–Pepel Iron Ore Corridor', metric: 'Dedicated Rail', status: 'High Tonnage', trend: '+4.2%' }
      ]
    }
  }
};