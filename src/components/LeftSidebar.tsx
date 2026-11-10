import React, { useEffect, useRef } from 'react';
import { Building2, ChevronRight, Compass, Search, X } from 'lucide-react';
import { CityData, PROVINCES, ProvinceData, RegionId } from '../data/sierraLeoneData';
import { LocalAreaFeature } from '../data/localAreas';
import {
  EDUCATION_TOPICS,
  EducationStudyItem,
  EducationTopicId,
} from '../data/educationData';
import { DataLayerId, resolveChoroplethStyle, TelemetryStore } from '../utils/telemetryEngine';

interface LeftSidebarProps {
  isOpen: boolean;
  provinces: ProvinceData[];
  cities: CityData[];
  selectedCityId: string;
  selectedProvinceId: RegionId | null;
  selectedDistrictName: string | null;
  localAreas: LocalAreaFeature[];
  localAreasStatus: 'idle' | 'loading' | 'loaded' | 'error';
  selectedLocalAreaId: string | null;
  searchQuery: string;
  showAllCities: boolean;
  activeLayer: DataLayerId;
  telemetryStore: TelemetryStore;
  studyMode: boolean;
  studyTopic: EducationTopicId | null;
  studyItems: EducationStudyItem[];
  selectedStudyItemId: string | null;
  onSearchChange: (q: string) => void;
  onSelectCity: (cityId: string) => void;
  onSelectProvince: (provinceId: RegionId) => void;
  onSelectDistrict: (districtName: string | null) => void;
  onSelectLocalArea: (localAreaId: string) => void;
  onToggleShowAllCities: () => void;
  onSelectStudyItem: (itemId: string) => void;
  onClose: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  isOpen,
  provinces,
  cities,
  selectedCityId,
  selectedProvinceId,
  selectedDistrictName,
  localAreas,
  localAreasStatus,
  selectedLocalAreaId,
  searchQuery,
  showAllCities,
  activeLayer,
  telemetryStore,
  studyMode,
  studyTopic,
  studyItems,
  selectedStudyItemId,
  onSearchChange,
  onSelectCity,
  onSelectProvince,
  onSelectDistrict,
  onSelectLocalArea,
  onToggleShowAllCities,
  onSelectStudyItem,
  onClose,
}) => {
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const sidebar = sidebarRef.current;
    const focusableElements = sidebar?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    firstElement.focus();

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [isOpen]);

  return (
    <aside
      ref={sidebarRef}
      id="left-navigation-sidebar"
      role={isOpen ? 'dialog' : undefined}
      aria-modal={isOpen || undefined}
      aria-label="Sierra Leone Regions and Cities Navigation"
      className={`fixed inset-y-0 left-0 z-40 flex h-full w-[min(316px,90vw)] shrink-0 flex-col justify-between overflow-y-auto border-r border-slate-200/80 bg-white px-4 py-4 select-none custom-scrollbar transition-transform duration-200 md:relative md:inset-auto md:z-20 md:h-full md:w-[316px] md:translate-x-0 ${
        isOpen ? 'visible translate-x-0' : 'invisible -translate-x-full md:visible'
      }`}
    >
      <div>
        {/* Top Brand Header with Flag */}
        <div className="flex items-center justify-between gap-3.5 px-1 pt-0.5 pb-3">
          {/* <div
            className="w-[50px] h-[42px] rounded-lg overflow-hidden shadow-xs border border-slate-200/80 shrink-0 flex flex-col"
            aria-label="Flag of Sierra Leone"
            role="img"
          >
            <div className="flex-1 bg-[#1EB53A]" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-[#0072C6]" />
          </div> */}
          <div className="brand">
            salone<span>map.</span>
          </div>
          {/* <div cla
          ssName="min-w-0">
            <h1 className="text-[21px] font-bold tracking-tight text-slate-900 leading-tight whitespace-nowrap">
              saloneMap
            </h1>
            <p className="text-[13px] text-slate-500 font-medium leading-snug whitespace-nowrap">
              Interactive Political Map
            </p>
          </div> */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 md:hidden"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mt-1 mb-2">
          <label htmlFor="map-search-input" className="sr-only">
            {studyMode
              ? 'Search study topics and examples'
              : 'Search for a city, district or region'}
          </label>
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="map-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              studyMode
                ? 'Search this study topic...'
                : 'Search for a city, district or region...'
            }
            className="w-full pl-9 pr-8 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 bg-white border border-slate-200/90 rounded-full shadow-2xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 5 Regions / Provinces List */}
        {!studyMode && (
        <nav aria-label="Provinces of Sierra Leone" className="divide-y divide-slate-100">
          {provinces.map((prov) => {
            const isSelected = selectedProvinceId === prov.id;
            const layerMetric =
              activeLayer !== 'political' ? telemetryStore[prov.id][activeLayer] : null;
            const dotColor =
              activeLayer !== 'political' && layerMetric
                ? resolveChoroplethStyle(activeLayer, layerMetric.primaryScore, prov.dotColor)
                    .fillColor
                : prov.dotColor;

            return (
              <button
                key={prov.id}
                type="button"
                onClick={() => onSelectProvince(prov.id)}
                aria-pressed={isSelected}
                className={`w-full flex items-center justify-between py-2.5 px-2.5 rounded-xl text-left transition-colors group ${
                  isSelected
                    ? 'bg-slate-100/90 text-slate-950 font-semibold'
                    : 'hover:bg-slate-50 text-slate-800 font-semibold'
                }`}
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-2xs transition-colors"
                    style={{ backgroundColor: dotColor }}
                  />
                  <span className="text-[13.5px] truncate">{prov.name}</span>
                </span>
                <span className="flex items-center gap-2 shrink-0">
                  {layerMetric && (
                    <span className="text-[11.5px] font-mono tabular-nums text-slate-600 font-semibold">
                      {layerMetric.primaryScore.toFixed(1)}%
                    </span>
                  )}
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected
                        ? 'text-slate-900 translate-x-0.5'
                        : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </nav>
        )}

        {!studyMode && selectedProvinceId && (
          <section className="mt-2.5 pt-2.5 border-t border-slate-200/70" aria-label="Administrative areas">
            <div className="flex items-center justify-between px-2 mb-1.5">
              <h2 className="text-[13.5px] font-bold text-slate-900">
                {selectedDistrictName
                  ? `Local areas (${localAreas.length})`
                  : `${PROVINCES.find((province) => province.id === selectedProvinceId)?.shortName ?? 'Province'} districts`}
              </h2>
              {selectedDistrictName ? (
                <button
                  type="button"
                  onClick={() => onSelectDistrict(null)}
                  className="text-[11px] font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap"
                >
                  All districts
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelectProvince(selectedProvinceId)}
                  className="text-[11px] font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap"
                >
                  {selectedDistrictName ? 'All districts' : 'All regions'}
                </button>
              )}
            </div>
            <nav aria-label={selectedDistrictName ? 'Local areas' : 'Districts'} className="max-h-[190px] space-y-0.5 overflow-y-auto pr-1 custom-scrollbar">
              {selectedDistrictName ? (
                localAreasStatus === 'idle' || localAreasStatus === 'loading' ? (
                  <p className="px-2.5 py-3 text-xs text-slate-500">Loading local-area boundaries…</p>
                ) : localAreasStatus === 'error' ? (
                  <p className="px-2.5 py-3 text-xs text-rose-700">Local-area boundaries could not be loaded.</p>
                ) : localAreas.length === 0 ? (
                  <p className="px-2.5 py-3 text-xs text-slate-500">No local areas match this search.</p>
                ) : (
                  localAreas.map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => onSelectLocalArea(area.id)}
                      aria-pressed={selectedLocalAreaId === area.id}
                      className={`w-full rounded-xl px-2.5 py-2 text-left text-[13px] font-medium transition-colors ${
                        selectedLocalAreaId === area.id
                          ? 'bg-emerald-50 text-emerald-900'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {area.name}
                    </button>
                  ))
                )
              ) : (
                PROVINCES.find((province) => province.id === selectedProvinceId)?.districts
                  .filter((district) => !searchQuery.trim() || district.toLowerCase().includes(searchQuery.trim().toLowerCase()))
                  .map((district) => (
                    <button
                      key={district}
                      type="button"
                      onClick={() => onSelectDistrict(district)}
                      className="w-full rounded-xl px-2.5 py-2 text-left text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      {district}
                    </button>
                  ))
              )}
            </nav>
            {selectedDistrictName && (
              <p className="mt-1 px-2 text-[10px] leading-snug text-slate-500">
                Source: HDX Sierra Leone Subnational Administrative Boundaries (COD-AB).
              </p>
            )}
          </section>
        )}

        {studyMode ? (
        <section className="mt-2.5 pt-2.5 border-t border-slate-200/70" aria-label="Study materials">
          <div className="flex items-center justify-between px-2 mb-1.5">
            <h2 className="text-[13.5px] font-bold text-slate-900">
              {EDUCATION_TOPICS.find((topic) => topic.id === studyTopic)?.label ?? 'Study topics hidden'} ({studyItems.length})
            </h2>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-900">
              Prototype
            </span>
          </div>
          <div className="max-h-[55vh] space-y-0.5 overflow-y-auto pr-1 custom-scrollbar">
            {studyItems.length === 0 ? (
              <p className="px-2.5 py-3 text-xs text-slate-500">
                {studyTopic
                  ? 'No matching study items in this topic.'
                  : 'Select a topic above to show study items.'}
              </p>
            ) : (
              studyItems.map((item) => {
                const isActive = item.id === selectedStudyItemId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectStudyItem(item.id)}
                    aria-pressed={isActive}
                    className={`w-full rounded-xl px-2.5 py-2 text-left transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-slate-900 font-semibold'
                        : 'text-slate-700 font-medium hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${isActive ? 'bg-orange-500' : 'bg-emerald-700'}`} />
                      <span className="min-w-0">
                        <span className="block truncate text-[13px]">{item.name}</span>
                        <span className="block truncate text-[10px] font-normal text-slate-500">
                          {[item.district, item.regionId?.replace('-', ' ')].filter(Boolean).join(' · ') || item.status}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })
            )}
          </div>
          <p className="mt-2 px-2 text-[10px] leading-snug text-slate-500">
            Demonstration content; locations and examples may be approximate.
          </p>
        </section>
        ) : (
        <>
        {/* Major Cities Section */}
        <div className="mt-2.5 pt-2.5 border-t border-slate-200/70">
          <div className="flex items-center justify-between px-2 mb-1.5">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-700 stroke-[2.2]" />
              <h2 className="text-[13.5px] font-bold text-slate-900">
                {selectedProvinceId
                  ? `${provinces.find((p) => p.id === selectedProvinceId)?.shortName || 'Region'} Cities`
                  : showAllCities || searchQuery
                  ? `Cities (${cities.length})`
                  : 'Major Cities'}
              </h2>
            </div>
            {selectedProvinceId && (
              <button
                type="button"
                onClick={() => onSelectProvince(selectedProvinceId)}
                className="text-[11px] font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap"
              >
                {selectedDistrictName ? 'All districts' : 'All regions'}
              </button>
            )}
          </div>

          <div
            className={`space-y-0.5 ${
              showAllCities || searchQuery || selectedProvinceId
                ? 'max-h-[190px] overflow-y-auto pr-1 custom-scrollbar'
                : ''
            }`}
          >
            {cities.length === 0 ? (
              <p className="text-xs text-slate-400 px-2.5 py-3">
                No matching cities or towns found.
              </p>
            ) : (
              cities.map((city) => {
                const isActive = city.id === selectedCityId;
                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => onSelectCity(city.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-colors ${
                      isActive
                        ? 'bg-[#e8f1fb] text-slate-900 font-semibold'
                        : 'text-slate-700 font-medium hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          isActive ? 'bg-[#1565c0]' : 'bg-[#1e293b]'
                        }`}
                      />
                      <span className="text-[13.5px] truncate">{city.name}</span>
                    </span>
                    {(showAllCities || searchQuery) && (
                      <span className="text-[11px] text-slate-400 truncate ml-2">
                        {city.regionName.replace(' Province', '')}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Show all cities toggle button */}
          <button
            type="button"
            onClick={onToggleShowAllCities}
            className="mt-1 pt-2 border-t border-slate-100 w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors group"
          >
            <span className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-slate-600" />
              <span className="text-[13px] font-medium text-slate-700">
                {showAllCities ? 'Show major cities only' : `Show all cities`}
              </span>
            </span>
            <ChevronRight
              className={`w-4 h-4 text-slate-400 transition-transform ${
                showAllCities ? 'rotate-90 text-slate-700' : 'group-hover:translate-x-0.5'
              }`}
            />
          </button>
        </div>
        </>
        )}
      </div>

      {/* Bottom Africa Locator Inset Map Card */}
      <div className="mt-2 pt-1">
        <div className="rounded-2xl border border-slate-200/90 bg-[#f9f9fb] overflow-hidden shadow-2xs">
          <img
            src="/assets/africa-inset.png"
            alt="Locator map of Sierra Leone in West Africa with scale bar 0 to 150 km"
            referrerPolicy="no-referrer"
            className="w-full h-auto block object-contain"
          />
        </div>
      </div>
    </aside>
  );
};
