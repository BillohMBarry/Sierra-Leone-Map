import { CITIES, RegionId } from './sierraLeoneData';

export type EducationTopicId = 'rivers' | 'agriculture' | 'minerals' | 'landmarks' | 'chiefdoms';

export interface EducationTopic {
  id: EducationTopicId;
  label: string;
}

export interface EducationStudyItem {
  id: string;
  name: string;
  topicId: EducationTopicId;
  description: string;
  regionId?: RegionId;
  relatedRegionIds?: RegionId[];
  district?: string;
  coordinates?: [longitude: number, latitude: number];
  riverName?: string;
  studyPrompt?: string;
  status: string;
  sourceLabel: string;
  sourceUrl: string;
}

export const EDUCATION_TOPICS: EducationTopic[] = [
  { id: 'rivers', label: 'Rivers' },
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'minerals', label: 'Minerals' },
  { id: 'landmarks', label: 'Landmarks' },
  { id: 'chiefdoms', label: 'Chiefdoms' },
];

function getCityPlaceStudyItem(
  cityId: string,
  placeName: string,
  id: string,
  studyPrompt: string,
  coordinates?: [longitude: number, latitude: number]
): EducationStudyItem {
  const city = CITIES.find((candidate) => candidate.id === cityId);
  if (!city) throw new Error(`Unknown city "${cityId}" for education landmark data.`);
  const place = city.places.find((candidate) => candidate.name === placeName);
  if (!place) throw new Error(`Unknown place "${placeName}" in city "${city.name}".`);

  return {
    id,
    name: place.name,
    topicId: 'landmarks',
    description: place.description,
    regionId: city.regionId,
    district: city.keyFacts.district,
    coordinates: coordinates ?? [city.lng, city.lat],
    studyPrompt,
    status: 'Prototype city-centered marker; exact place location is approximate',
    sourceLabel: `Existing place profile: ${city.name} · ${place.category}`,
    sourceUrl: 'https://tourismsierraleone.com/where-to-go/freetown/',
  };
}

const FOURAH_BAY_COLLEGE_STUDY_ITEM = getCityPlaceStudyItem(
  'freetown',
  'Fourah Bay College',
  'landmark-fourah-bay-college',
  'Why are educational institutions important landmarks in a country’s history?',
  [-13.238, 8.491]
);

const NATIONAL_MUSEUM_STUDY_ITEM = getCityPlaceStudyItem(
  'freetown',
  'Sierra Leone National Museum',
  'landmark-national-museum',
  'How can museums help preserve a country’s historical record?',
  [-13.2337, 8.4848]
);

const FREETOWN_HISTORIC_LANDMARKS: EducationStudyItem[] = [
  {
    id: 'landmark-cotton-tree',
    name: 'Cotton Tree Memorial',
    topicId: 'landmarks',
    description:
      'The Cotton Tree was a longstanding symbol in central Freetown. This prototype marks its historic city-center location.',
    regionId: 'western',
    district: 'Western Area Urban',
    coordinates: [-13.2344, 8.4847],
    studyPrompt: 'What can a landmark in a city center represent to its community?',
    status: 'Prototype map marker; approximate location',
    sourceLabel: 'Tourism Sierra Leone · Freetown',
    sourceUrl: 'https://tourismsierraleone.com/where-to-go/freetown/',
  },
  {
    id: 'landmark-kings-gate',
    name: "King's Gate",
    topicId: 'landmarks',
    description:
      "King's Gate is associated with Freetown's early history. Its map position is an approximate study marker.",
    regionId: 'western',
    district: 'Western Area Urban',
    coordinates: [-13.2308, 8.4877],
    studyPrompt: 'How can a historic monument help people interpret a city’s past?',
    status: 'Prototype map marker; approximate location',
    sourceLabel: 'Tourism Sierra Leone · Freetown',
    sourceUrl: 'https://tourismsierraleone.com/where-to-go/freetown/',
  },
  {
    id: 'landmark-st-johns-maroon-church',
    name: "St John's Maroon Church",
    topicId: 'landmarks',
    description:
      'St John’s Maroon Church is part of Freetown’s historic religious heritage. This marker is illustrative, not a surveyed location.',
    regionId: 'western',
    district: 'Western Area Urban',
    coordinates: [-13.2322, 8.4865],
    studyPrompt: 'What can historic places of worship tell us about a city’s communities?',
    status: 'Prototype map marker; approximate location',
    sourceLabel: 'Tourism Sierra Leone · Freetown',
    sourceUrl: 'https://tourismsierraleone.com/where-to-go/freetown/',
  },
  {
    id: 'landmark-st-georges-cathedral',
    name: "St George's Cathedral",
    topicId: 'landmarks',
    description:
      'St George’s Cathedral is a historic church in central Freetown. The marker shows an approximate location.',
    regionId: 'western',
    district: 'Western Area Urban',
    coordinates: [-13.2292, 8.4851],
    studyPrompt: 'How do historic buildings contribute to a city’s cultural landscape?',
    status: 'Prototype map marker; approximate location',
    sourceLabel: 'Tourism Sierra Leone · Freetown',
    sourceUrl: 'https://tourismsierraleone.com/where-to-go/freetown/',
  },
  {
    id: 'landmark-old-fourah-bay-college',
    name: 'Old Fourah Bay College',
    topicId: 'landmarks',
    description:
      'The former Fourah Bay College building in Cline Town is a historic education site. Its position here is approximate.',
    regionId: 'western',
    district: 'Western Area Urban',
    coordinates: [-13.2118, 8.4887],
    studyPrompt: 'How can an old school building help preserve educational history?',
    status: 'Prototype map marker; approximate location',
    sourceLabel: 'Tourism Sierra Leone · Freetown',
    sourceUrl: 'https://tourismsierraleone.com/where-to-go/freetown/',
  },
  {
    id: 'landmark-railway-museum',
    name: 'National Railway Museum',
    topicId: 'landmarks',
    description:
      'The National Railway Museum preserves railway heritage in Freetown. This prototype marker is approximate.',
    regionId: 'western',
    district: 'Western Area Urban',
    coordinates: [-13.2111, 8.4872],
    studyPrompt: 'What can transport exhibits teach us about a country’s history?',
    status: 'Prototype map marker; approximate location',
    sourceLabel: 'Tourism Sierra Leone · Freetown',
    sourceUrl: 'https://tourismsierraleone.com/where-to-go/freetown/',
  },
];

export const EDUCATION_STUDY_ITEMS: EducationStudyItem[] = [
  {
    id: 'river-rokel',
    name: 'Rokel (Seli) River',
    topicId: 'rivers',
    riverName: 'Rokel (Seli) River',
    relatedRegionIds: ['northern', 'north-west'],
    description:
      'Follow the Rokel from the northern interior toward the Sierra Leone River estuary. The existing map line is a simplified study trace.',
    studyPrompt: 'Which regions does this river pass near on the map?',
    status: 'Prototype map line; approximate',
    sourceLabel: 'Existing project river geometry',
    sourceUrl: 'https://www.fao.org/aquastat/en/countries-and-basins/country-profiles/country/SLE',
  },
  {
    id: 'river-great-scarcies',
    name: 'Great Scarcies (Kolenté) River',
    topicId: 'rivers',
    riverName: 'Great Scarcies (Kolenté) River',
    relatedRegionIds: ['north-west'],
    description:
      'A northern river system represented here with a simplified line near the Guinea border and North West region.',
    studyPrompt: 'How can a river help define a national or regional boundary?',
    status: 'Prototype map line; approximate',
    sourceLabel: 'Existing project river geometry',
    sourceUrl: 'https://www.fao.org/aquastat/en/countries-and-basins/country-profiles/country/SLE',
  },
  {
    id: 'river-little-scarcies',
    name: 'Little Scarcies (Kaba) River',
    topicId: 'rivers',
    riverName: 'Little Scarcies (Kaba) River',
    relatedRegionIds: ['north-west'],
    description:
      'The Little Scarcies, also known as the Kaba, is shown as a simplified northern drainage route.',
    studyPrompt: 'Compare the direction of this river with the Great Scarcies.',
    status: 'Prototype map line; approximate',
    sourceLabel: 'Existing project river geometry',
    sourceUrl: 'https://www.fao.org/aquastat/en/countries-and-basins/country-profiles/country/SLE',
  },
  {
    id: 'river-sewa',
    name: 'Sewa River',
    topicId: 'rivers',
    riverName: 'Sewa River',
    relatedRegionIds: ['eastern', 'southern'],
    description:
      'The Sewa is shown crossing the southern and eastern interior toward the Atlantic coast.',
    studyPrompt: 'What physical or economic activities are often connected to river valleys?',
    status: 'Prototype map line; approximate',
    sourceLabel: 'Existing project river geometry',
    sourceUrl: 'https://www.fao.org/aquastat/en/countries-and-basins/country-profiles/country/SLE',
  },
  {
    id: 'river-jong',
    name: 'Jong (Taia) River',
    topicId: 'rivers',
    riverName: 'Jong (Taia) River',
    relatedRegionIds: ['northern', 'southern'],
    description:
      'The Jong, also called the Taia, is represented by a simplified line through the south-central interior.',
    studyPrompt: 'Identify the nearest regional area shown along this river.',
    status: 'Prototype map line; approximate',
    sourceLabel: 'Existing project river geometry',
    sourceUrl: 'https://www.fao.org/aquastat/en/countries-and-basins/country-profiles/country/SLE',
  },
  {
    id: 'river-moa',
    name: 'Moa River',
    topicId: 'rivers',
    riverName: 'Moa River',
    relatedRegionIds: ['eastern', 'southern'],
    description:
      'The Moa is represented in the east as a simplified route running south toward the coast.',
    studyPrompt: 'Which neighboring country is closest to the upper part of this river?',
    status: 'Prototype map line; approximate',
    sourceLabel: 'Existing project river geometry',
    sourceUrl: 'https://www.fao.org/aquastat/en/countries-and-basins/country/SLE',
  },
  {
    id: 'river-mano',
    name: 'Mano River',
    topicId: 'rivers',
    riverName: 'Mano River',
    relatedRegionIds: ['eastern'],
    description:
      'The Mano River forms part of the Sierra Leone–Liberia border area. Its path here is an illustrative sketch, not a surveyed river geometry.',
    studyPrompt: 'Trace where the Mano River approaches the Sierra Leone–Liberia border.',
    status: 'Candidate river; approximate prototype geometry',
    sourceLabel: 'Prototype river sketch; verify before public release',
    sourceUrl: 'https://www.fao.org/aquastat/en/countries-and-basins/country-profiles/country/SLE',
  },
  {
    id: 'agri-rice',
    name: 'Rice-growing areas',
    topicId: 'agriculture',
    description:
      'Rice is a major cereal crop in Sierra Leone. This example highlights lowland rice as an important national agricultural theme; it is not a district-level production map.',
    regionId: 'north-west',
    coordinates: [-12.18, 9.0],
    studyPrompt: 'Why might lowland areas be useful for rice cultivation?',
    status: 'Illustrative national context; not district production data',
    sourceLabel: 'FAO/GIEWS country brief',
    sourceUrl: 'https://www.fao.org/giews/countrybrief/country.jsp?code=SLE',
  },
  {
    id: 'agri-cocoa-coffee',
    name: 'Cocoa and coffee belt',
    topicId: 'agriculture',
    description:
      'Existing regional descriptions associate cocoa and coffee cultivation with the Eastern and Southern provinces. The marker is illustrative and does not indicate measured yield.',
    regionId: 'eastern',
    coordinates: [-10.95, 8.15],
    studyPrompt: 'What climate and landscape conditions can support tree crops?',
    status: 'Illustrative regional context; not a measured crop boundary',
    sourceLabel: 'Existing regional descriptions',
    sourceUrl: 'https://maf.gov.sl/',
  },
  {
    id: 'agri-cereal',
    name: 'Cereal crops',
    topicId: 'agriculture',
    description:
      'FAO lists rice, sorghum, millet, and maize among Sierra Leone’s cereal crops. This marker represents national context, not a production hotspot.',
    coordinates: [-11.75, 8.45],
    studyPrompt: 'Name two cereals grown in Sierra Leone and compare their uses.',
    status: 'National context; illustrative marker',
    sourceLabel: 'FAO/GIEWS country brief',
    sourceUrl: 'https://www.fao.org/giews/countrybrief/country.jsp?code=SLE',
  },
  {
    id: 'mineral-diamonds',
    name: 'Kono diamond area',
    topicId: 'minerals',
    description:
      'The Eastern Province description identifies Kono as an area associated with alluvial and kimberlite diamonds. This point is for learning context, not a licensed deposit boundary.',
    regionId: 'eastern',
    district: 'Kono',
    coordinates: [-10.85, 8.64],
    studyPrompt: 'How can geological resources influence local settlement and trade?',
    status: 'Illustrative location; not a mineral-rights boundary',
    sourceLabel: 'National Minerals Agency',
    sourceUrl: 'https://www.nma.gov.sl/minerals-and-rocks/',
  },
  {
    id: 'mineral-bauxite',
    name: 'Gondama bauxite example',
    topicId: 'minerals',
    description:
      'The National Minerals Agency describes the Gondama bauxite deposit in Moyamba District. The map marker is approximate and should not be used as a deposit boundary.',
    regionId: 'southern',
    district: 'Moyamba',
    coordinates: [-12.18, 8.05],
    studyPrompt: 'What is bauxite used to produce?',
    status: 'Illustrative location; not a mineral-rights boundary',
    sourceLabel: 'National Minerals Agency',
    sourceUrl: 'https://www.nma.gov.sl/minerals-and-rocks/',
  },
  {
    id: 'mineral-marampa',
    name: 'Marampa iron ore example',
    topicId: 'minerals',
    description:
      'The National Minerals Agency identifies Marampa iron ore in Port Loko District. This marker is approximate and does not show the licensed area.',
    regionId: 'north-west',
    district: 'Port Loko',
    coordinates: [-12.03, 8.69],
    studyPrompt: 'How is iron ore used, and what is one potential local benefit or impact of mining?',
    status: 'Illustrative location; not a mineral-rights boundary',
    sourceLabel: 'National Minerals Agency',
    sourceUrl: 'https://www.nma.gov.sl/minerals-and-rocks/',
  },
  {
    id: 'landmark-bunce-island',
    name: 'Bunce Island',
    topicId: 'landmarks',
    description:
      'Bunce Island lies in the Sierra Leone River estuary and is a significant historic site connected to the transatlantic slave trade. Learn about it with care and historical context.',
    regionId: 'western',
    coordinates: [-13.05, 8.58],
    studyPrompt: 'What does preserving a historic site help future generations understand?',
    status: 'Prototype map marker; approximate',
    sourceLabel: 'Tourism Sierra Leone',
    sourceUrl: 'https://tourismsierraleone.com/attractions/bunce-island/',
  },
  FOURAH_BAY_COLLEGE_STUDY_ITEM,
  NATIONAL_MUSEUM_STUDY_ITEM,
  ...FREETOWN_HISTORIC_LANDMARKS,
  {
    id: 'landmark-tiwai-island',
    name: 'Tiwai Island Wildlife Sanctuary',
    topicId: 'landmarks',
    description:
      'Tiwai Island is listed in the Southern Province regional profile as a wildlife sanctuary and is used here as a nature and conservation study example.',
    regionId: 'southern',
    coordinates: [-11.34, 7.55],
    studyPrompt: 'How can protected areas support both biodiversity and local livelihoods?',
    status: 'Prototype map marker; approximate',
    sourceLabel: 'Existing regional description in this project',
    sourceUrl: 'https://tourismsierraleone.com/',
  },
  {
    id: 'chiefdom-koya',
    name: 'Koya Chiefdom (example)',
    topicId: 'chiefdoms',
    regionId: 'north-west',
    district: 'Port Loko',
    coordinates: [-12.35, 8.75],
    description:
      'An illustrative chiefdom entry to demonstrate the administrative hierarchy below district level. The marker is approximate and no boundary is shown.',
    studyPrompt: 'How does a chiefdom fit within the country’s wider administrative structure?',
    status: 'Demonstration entry; approximate location, not a complete list',
    sourceLabel: 'Statistics Sierra Leone reference for future verification',
    sourceUrl: 'https://www.statistics.sl/',
  },
  {
    id: 'chiefdom-nongowa',
    name: 'Nongowa Chiefdom (example)',
    topicId: 'chiefdoms',
    regionId: 'eastern',
    district: 'Kenema',
    coordinates: [-11.18, 7.92],
    description:
      'An illustrative chiefdom entry to demonstrate selecting a sub-district area. Its map point is approximate; chiefdom boundaries are not included.',
    studyPrompt: 'What kinds of local information could be compared between chiefdoms?',
    status: 'Demonstration entry; approximate location, not a complete list',
    sourceLabel: 'Statistics Sierra Leone reference for future verification',
    sourceUrl: 'https://www.statistics.sl/',
  },
  {
    id: 'chiefdom-nimikoro',
    name: 'Nimikoro Chiefdom (example)',
    topicId: 'chiefdoms',
    regionId: 'eastern',
    district: 'Kono',
    coordinates: [-10.78, 8.45],
    description:
      'An illustrative chiefdom entry for the prototype. The point is approximate and does not represent an official boundary.',
    studyPrompt: 'Why should a map distinguish a point marker from an administrative boundary?',
    status: 'Demonstration entry; approximate location, not a complete list',
    sourceLabel: 'Statistics Sierra Leone reference for future verification',
    sourceUrl: 'https://www.statistics.sl/',
  },
];

export function getEducationItemById(id: string): EducationStudyItem | undefined {
  return EDUCATION_STUDY_ITEMS.find((item) => item.id === id);
}
