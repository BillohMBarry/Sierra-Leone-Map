import React from 'react';
import { BookOpen, ExternalLink, MapPin, X } from 'lucide-react';
import {
  EDUCATION_TOPICS,
  EducationStudyItem,
} from '../data/educationData';
import { PROVINCES } from '../data/sierraLeoneData';

interface EducationDetailPanelProps {
  item: EducationStudyItem | null;
  onClose: () => void;
}

export const EducationDetailPanel: React.FC<EducationDetailPanelProps> = ({
  item,
  onClose,
}) => (
  <aside
    aria-label="Study details"
    className="absolute inset-x-3 bottom-3 max-h-[45vh] w-auto bg-white rounded-[24px] shadow-xl border border-slate-200/80 flex flex-col z-20 overflow-hidden md:inset-x-auto md:right-4 md:top-5 md:bottom-5 md:w-[346px] md:max-h-none"
  >
    <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
      <div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-800">
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
          Study guide
        </div>
        <h2 className="mt-1 text-[21px] font-bold leading-tight tracking-tight text-slate-900">
          {item?.name ?? 'Choose a map feature'}
        </h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close study details"
        className="rounded-lg p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>

    {item ? (
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4 custom-scrollbar">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-900">
            {EDUCATION_TOPICS.find((topic) => topic.id === item.topicId)?.label}
          </span>
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-950">
            Prototype data
          </span>
        </div>

        <p className="text-[13px] leading-relaxed text-slate-700">{item.description}</p>

        {(item.district || item.regionId || item.relatedRegionIds?.length) && (
          <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" aria-hidden="true" />
            <div className="text-[12px] text-slate-700">
              <div className="font-semibold">
                {item.relatedRegionIds?.length ? 'River regions highlighted' : 'Related area'}
              </div>
              <div>
                {[
                  item.district,
                  ...(item.relatedRegionIds ?? []).map(
                    (regionId) => PROVINCES.find((region) => region.id === regionId)?.name
                  ),
                  ...(!item.relatedRegionIds?.length && item.regionId
                    ? [PROVINCES.find((region) => region.id === item.regionId)?.name]
                    : []),
                ]
                  .filter((name): name is string => Boolean(name))
                  .join(' · ')}
              </div>
              {item.relatedRegionIds?.length ? (
                <div className="mt-1 text-[10px] text-slate-500">
                  Highlighted from the approximate study river line.
                </div>
              ) : null}
            </div>
          </div>
        )}

        <div className="rounded-xl border border-indigo-100 bg-indigo-50/70 p-3">
          <div className="text-[11px] font-bold uppercase tracking-wide text-indigo-900">
            Think about it
          </div>
          <p className="mt-1 text-[12px] leading-relaxed text-indigo-950">
            {item.studyPrompt ?? 'What can this map feature tell you about Sierra Leone?'}
          </p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <div className="text-[11px] font-bold text-amber-950">{item.status}</div>
          <p className="mt-1 text-[10.5px] leading-snug text-amber-900">
            This entry is for an idea-stage demonstration and should not be treated as an authoritative boundary, measurement, or official classification.
          </p>
        </div>

        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-[11px] font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <span className="min-w-0">
            <span className="block text-slate-500">Reference for prototype context</span>
            <span className="block truncate">{item.sourceLabel}</span>
          </span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        </a>
      </div>
    ) : (
      <div className="px-5 py-4 text-[13px] text-slate-600">
        Select a study feature on the map or from the topic list to see its learning note.
      </div>
    )}
  </aside>
);
