
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import { CITIES, PROVINCES, RegionId } from './data/sierraLeoneData';
import {
  loadLocalAreas,
  LocalAreaFeature,
  normalizeAdministrativeName,
} from './data/localAreas';
import {
  EDUCATION_STUDY_ITEMS,
  EducationTopicId,
} from './data/educationData';
import {
  filterCities,
  filterProvinces,
  getCityById,
  getProvinceById,
  getSiblingCities,
} from './utils/mapFilters';
import {
  createInitialTelemetryStore,
  DataLayerId,
  FieldReportEntry,
  simulateTelemetryTick,
  TelemetryStore,
} from './utils/telemetryEngine';
import { LeftSidebar } from './components/LeftSidebar';
import { InteractiveMap } from './components/InteractiveMap';
import { RightDetailPanel } from './components/RightDetailPanel';
import { EducationDetailPanel } from './components/EducationDetailPanel';
import { filterEducationItems, filterFreetownLandmarks } from './utils/educationFilters';

const INITIAL_FIELD_REPORTS: FieldReportEntry[] = [
  {
    id: 'rep-1',
    cityId: 'freetown',
    cityName: 'Freetown',
    regionId: 'western',
    regionName: 'Western Area',
    layerId: 'healthcare',
    statusLevel: 'Nominal',
    note: 'Connaught & Ola During cold-chain telemetry verified at 96.2% uptime.',
    reporter: 'Western Area Health Dispatch',
    timestamp: '14:20 UTC',
    gps: '8.4844° N, 13.2344° W',
  },
  {
    id: 'rep-2',
    cityId: 'bo',
    cityName: 'Bo',
    regionId: 'southern',
    regionName: 'Southern Province',
    layerId: 'energy',
    statusLevel: 'Nominal',
    note: 'CLSG 225kV substation and Bo–Kenema solar mini-grid load balanced.',
    reporter: 'Southern Grid Control',
    timestamp: '13:55 UTC',
    gps: '7.9647° N, 11.7383° W',
  },
];

function App() {
  const [selectedCityId, setSelectedCityId] = useState<string>('freetown');
  const [selectedProvinceId, setSelectedProvinceId] = useState<RegionId | null>(null);
  const [selectedDistrictName, setSelectedDistrictName] = useState<string | null>(null);
  const [selectedLocalAreaId, setSelectedLocalAreaId] = useState<string | null>(null);
  const [localAreas, setLocalAreas] = useState<LocalAreaFeature[]>([]);
  const [localAreasStatus, setLocalAreasStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>(
    'idle'
  );
  const [localAreasError, setLocalAreasError] = useState<string | null>(null);
  const [localAreasRetry, setLocalAreasRetry] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllCities, setShowAllCities] = useState<boolean>(false);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [favoriteCityIds, setFavoriteCityIds] = useState<string[]>(['freetown']);
  const [mode, setMode] = useState<'political' | 'study'>('political');
  const [studyTopic, setStudyTopic] = useState<EducationTopicId | null>('rivers');
  const [freetownLandmarksOnly, setFreetownLandmarksOnly] = useState<boolean>(false);
  const [selectedStudyItemId, setSelectedStudyItemId] = useState<string | null>('river-rokel');
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Real-Time Regional Metrics & Data Layer Switcher state
  const [activeLayer, setActiveLayer] = useState<DataLayerId>('political');
  const [telemetryStore, setTelemetryStore] = useState<TelemetryStore>(() =>
    createInitialTelemetryStore()
  );
  const [isStreamActive, setIsStreamActive] = useState<boolean>(true);
  const [, setTickCounter] = useState<number>(1);
  const [fieldReports, setFieldReports] = useState<FieldReportEntry[]>(INITIAL_FIELD_REPORTS);

  const selectedCity = useMemo(() => getCityById(selectedCityId), [selectedCityId]);
  const selectedCityProvince = useMemo(
    () => getProvinceById(selectedCity.regionId),
    [selectedCity.regionId]
  );

  const filteredProvinces = useMemo(
    () => filterProvinces(PROVINCES, searchQuery),
    [searchQuery]
  );

  const filteredCities = useMemo(
    () => filterCities(CITIES, searchQuery, selectedProvinceId, showAllCities),
    [searchQuery, selectedProvinceId, showAllCities]
  );
  const selectedDistrictLocalAreas = useMemo(
    () =>
      localAreas.filter(
        (area) =>
          area.provinceId === selectedProvinceId &&
          selectedDistrictName !== null &&
          normalizeAdministrativeName(area.districtName) ===
            normalizeAdministrativeName(selectedDistrictName) &&
          (!searchQuery.trim() ||
            area.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
      ),
    [localAreas, searchQuery, selectedDistrictName, selectedProvinceId]
  );

  const siblingCities = useMemo(() => getSiblingCities(selectedCity), [selectedCity]);
  const filteredStudyItems = useMemo(() => {
    if (!studyTopic) return [];
    const topicItems = freetownLandmarksOnly
      ? filterFreetownLandmarks(EDUCATION_STUDY_ITEMS)
      : EDUCATION_STUDY_ITEMS;
    return filterEducationItems(topicItems, studyTopic, searchQuery);
  }, [freetownLandmarksOnly, studyTopic, searchQuery]);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
    if (window.matchMedia('(max-width: 767px)').matches) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSidebar();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeSidebar, isSidebarOpen]);

  const handlePulseTelemetry = useCallback(() => {
    setTickCounter((prevTick) => {
      const nextTick = prevTick + 1;
      const nowIso = new Date().toISOString();
      setTelemetryStore((prevStore) => simulateTelemetryTick(prevStore, nextTick, nowIso));
      return nextTick;
    });
  }, []);

  useEffect(() => {
    if (!isStreamActive) return;
    const interval = window.setInterval(() => {
      handlePulseTelemetry();
    }, 4500);
    return () => window.clearInterval(interval);
  }, [isStreamActive, handlePulseTelemetry]);

  useEffect(() => {
    if (!selectedDistrictName || localAreasStatus === 'loaded') return;

    let isCurrent = true;
    setLocalAreasStatus('loading');
    setLocalAreasError(null);
    loadLocalAreas()
      .then((areas) => {
        if (!isCurrent) return;
        setLocalAreas(areas);
        setLocalAreasStatus('loaded');
      })
      .catch((error: unknown) => {
        if (!isCurrent) return;
        setLocalAreasStatus('error');
        setLocalAreasError(
          error instanceof Error ? error.message : 'Unable to load local-area boundaries.'
        );
      });

    return () => {
      isCurrent = false;
    };
  }, [localAreasRetry, selectedDistrictName]);

  const handleSelectCity = (cityId: string) => {
    setSelectedCityId(cityId);
    setIsDetailOpen(true);
    closeSidebar();
  };

  const handleSelectProvince = (provinceId: RegionId | null) => {
    if (provinceId === null || selectedProvinceId === provinceId) {
      if (provinceId !== null && selectedDistrictName) {
        setSelectedDistrictName(null);
        setSelectedLocalAreaId(null);
        closeSidebar();
        return;
      }
      setSelectedProvinceId(null);
      setSelectedDistrictName(null);
      setSelectedLocalAreaId(null);
    } else {
      setSelectedProvinceId(provinceId);
      setSelectedDistrictName(null);
      setSelectedLocalAreaId(null);
      const prov = getProvinceById(provinceId);
      if (prov.capitalId) {
        setSelectedCityId(prov.capitalId);
        setIsDetailOpen(true);
      }
    }
    closeSidebar();
  };

  const handleSelectDistrict = (districtName: string | null) => {
    setSelectedDistrictName(districtName);
    setSelectedLocalAreaId(null);
    closeSidebar();
  };

  const handleSelectLocalArea = (localAreaId: string) => {
    setSelectedLocalAreaId(localAreaId);
    closeSidebar();
  };

  const handleExploreRegion = (regionId: RegionId) => {
    setSelectedProvinceId(regionId);
    setSelectedDistrictName(null);
    setSelectedLocalAreaId(null);
    setShowAllCities(true);
  };

  const handleSelectStudyItem = (itemId: string) => {
    setSelectedStudyItemId(itemId);
    setIsDetailOpen(true);
    closeSidebar();
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (mode === 'study' && studyTopic) {
      const topicItems = freetownLandmarksOnly
        ? filterFreetownLandmarks(EDUCATION_STUDY_ITEMS)
        : EDUCATION_STUDY_ITEMS;
      const matchingItems = filterEducationItems(topicItems, studyTopic, query);
      setSelectedStudyItemId(matchingItems[0]?.id ?? null);
    }
  };

  const handleSelectStudyTopic = (topicId: EducationTopicId) => {
    if (studyTopic === topicId) {
      setFreetownLandmarksOnly(false);
      setStudyTopic(null);
      setSelectedStudyItemId(null);
      setIsDetailOpen(true);
      return;
    }
    if (topicId !== 'landmarks') setFreetownLandmarksOnly(false);
    setStudyTopic(topicId);
    const matchingItems = filterEducationItems(EDUCATION_STUDY_ITEMS, topicId, searchQuery);
    setSelectedStudyItemId(matchingItems[0]?.id ?? null);
    setIsDetailOpen(true);
  };

  const handleSelectMode = (nextMode: 'political' | 'study') => {
    setMode(nextMode);
    if (nextMode === 'political') setFreetownLandmarksOnly(false);
    setIsDetailOpen(true);
    if (nextMode === 'study' && !studyTopic) {
      setStudyTopic('rivers');
      setSelectedStudyItemId(
        filterEducationItems(EDUCATION_STUDY_ITEMS, 'rivers', searchQuery)[0]?.id ?? null
      );
    } else if (nextMode === 'study' && !selectedStudyItemId) {
      setSelectedStudyItemId(filteredStudyItems[0]?.id ?? null);
    }
  };

  const handleToggleFreetownLandmarksOnly = () => {
    const nextEnabled = !freetownLandmarksOnly;
    setMode('study');
    setStudyTopic('landmarks');
    setFreetownLandmarksOnly(nextEnabled);
    if (nextEnabled) {
      setSelectedProvinceId(null);
      setSelectedDistrictName(null);
      setSelectedLocalAreaId(null);
      setSearchQuery('');
    }
    const landmarkItems = nextEnabled
      ? filterFreetownLandmarks(EDUCATION_STUDY_ITEMS)
      : EDUCATION_STUDY_ITEMS.filter((item) => item.topicId === 'landmarks');
    setSelectedStudyItemId(
      filterEducationItems(landmarkItems, 'landmarks', nextEnabled ? '' : searchQuery)[0]?.id ??
        null
    );
    setIsDetailOpen(true);
  };

  const handleToggleFavorite = (cityId: string) => {
    setFavoriteCityIds((prev) =>
      prev.includes(cityId) ? prev.filter((id) => id !== cityId) : [...prev, cityId]
    );
  };

  const handleAddFieldReport = (report: Omit<FieldReportEntry, 'id' | 'timestamp'>) => {
    const now = new Date();
    const timestamp = `${String(now.getUTCHours()).padStart(2, '0')}:${String(
      now.getUTCMinutes()
    ).padStart(2, '0')} UTC`;

    const newEntry: FieldReportEntry = {
      ...report,
      id: `rep-${Date.now()}`,
      timestamp,
    };

    setFieldReports((prev) => [newEntry, ...prev]);

    // Nudge the reported region & sector telemetry to reflect live field report ingestion
    setTelemetryStore((prev) => {
      const next = structuredClone(prev);
      const snap = next[report.regionId][report.layerId];
      const nudge =
        report.statusLevel === 'Nominal'
          ? 0.4
          : report.statusLevel === 'Maintenance'
            ? -0.2
            : -0.6;
      snap.primaryScore = Number(
        Math.min(99.4, Math.max(25, snap.primaryScore + nudge)).toFixed(1)
      );
      snap.delta = Number(((snap.delta ?? 0) + nudge).toFixed(1));
      snap.lastUpdatedIso = now.toISOString();
      return next;
    });
  };
  return (
       <main className="relative w-screen h-screen overflow-hidden flex bg-[#f3f3e8]">
      {/* Left Navigation Sidebar */}
      <LeftSidebar
        isOpen={isSidebarOpen}
        provinces={filteredProvinces}
        cities={filteredCities}
        selectedCityId={selectedCityId}
        selectedProvinceId={selectedProvinceId}
        selectedDistrictName={selectedDistrictName}
        localAreas={selectedDistrictLocalAreas}
        localAreasStatus={localAreasStatus}
        selectedLocalAreaId={selectedLocalAreaId}
        searchQuery={searchQuery}
        showAllCities={showAllCities}
        activeLayer={activeLayer}
        telemetryStore={telemetryStore}
        studyMode={mode === 'study'}
        studyTopic={studyTopic}
        studyItems={filteredStudyItems}
        selectedStudyItemId={selectedStudyItemId}
        onSearchChange={handleSearchChange}
        onSelectCity={handleSelectCity}
        onSelectProvince={handleSelectProvince}
        onSelectDistrict={handleSelectDistrict}
        onSelectLocalArea={handleSelectLocalArea}
        onToggleShowAllCities={() => setShowAllCities((prev) => !prev)}
        onSelectStudyItem={handleSelectStudyItem}
        onClose={closeSidebar}
      />

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-slate-950/30 md:hidden"
        />
      )}

      {/* Center Interactive Political & Telemetry Map Canvas + Floating Right Detail Panel */}
      <div className="relative flex-1 h-full overflow-hidden flex">
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open navigation menu"
          aria-controls="left-navigation-sidebar"
          aria-expanded={isSidebarOpen}
          onClick={() => setIsSidebarOpen(true)}
          className="absolute left-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/95 text-slate-800 shadow-md backdrop-blur-xs transition-colors hover:bg-white md:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <InteractiveMap
          provinces={PROVINCES}
          cities={CITIES}
          selectedCity={selectedCity}
          selectedProvinceId={selectedProvinceId}
          selectedDistrictName={selectedDistrictName}
          selectedLocalAreaId={selectedLocalAreaId}
          localAreas={localAreas}
          localAreasStatus={localAreasStatus}
          localAreasError={localAreasError}
          onRetryLocalAreas={() => {
            setLocalAreasStatus('idle');
            setLocalAreasRetry((retry) => retry + 1);
          }}
          isDetailOpen={isDetailOpen}
          mode={mode}
          studyTopic={studyTopic}
          freetownLandmarksOnly={freetownLandmarksOnly}
          studyItems={filteredStudyItems}
          selectedStudyItemId={selectedStudyItemId}
          activeLayer={activeLayer}
          telemetryStore={telemetryStore}
          isStreamActive={isStreamActive}
          onSelectLayer={setActiveLayer}
          onToggleStream={() => setIsStreamActive((prev) => !prev)}
          onPulseTelemetry={handlePulseTelemetry}
          onSelectCity={handleSelectCity}
          onSelectProvince={handleSelectProvince}
          onSelectDistrict={handleSelectDistrict}
          onSelectLocalArea={handleSelectLocalArea}
          onSelectMode={handleSelectMode}
          onSelectStudyTopic={handleSelectStudyTopic}
          onToggleFreetownLandmarksOnly={handleToggleFreetownLandmarksOnly}
          onSelectStudyItem={handleSelectStudyItem}
        />

        {isDetailOpen ? (
          mode === 'study' ? (
            <EducationDetailPanel
              item={
                EDUCATION_STUDY_ITEMS.find((item) => item.id === selectedStudyItemId) ?? null
              }
              onClose={() => setIsDetailOpen(false)}
            />
          ) : (
          <RightDetailPanel
            city={selectedCity}
            province={selectedCityProvince}
            siblingCities={siblingCities}
            isFavorite={favoriteCityIds.includes(selectedCity.id)}
            activeLayer={activeLayer}
            telemetryStore={telemetryStore}
            fieldReports={fieldReports}
            onSelectLayer={setActiveLayer}
            onAddFieldReport={handleAddFieldReport}
            onToggleFavorite={handleToggleFavorite}
            onSelectCity={handleSelectCity}
            onExploreRegion={handleExploreRegion}
            onClose={() => setIsDetailOpen(false)}
          />
          )
        ) : (
          <button
            type="button"
            onClick={() => setIsDetailOpen(true)}
            className="absolute right-5 top-5 z-20 px-4 py-2.5 bg-white/95 backdrop-blur-xs rounded-2xl shadow-md border border-slate-200/80 text-[13px] font-bold text-slate-900 hover:bg-white transition-colors"
          >
            {mode === 'study' ? 'Show Study Details' : `Show ${selectedCity.name} Details`}
          </button>
        )}
      </div>
    </main>
  );
}

export default App;
