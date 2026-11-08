import {
  EDUCATION_TOPICS,
  EducationStudyItem,
  EducationTopicId,
} from '../data/educationData';

export function filterEducationItems(
  items: EducationStudyItem[],
  topicId: EducationTopicId,
  searchQuery: string
): EducationStudyItem[] {
  const query = searchQuery.trim().toLowerCase();
  const topicLabel =
    EDUCATION_TOPICS.find((topic) => topic.id === topicId)?.label.toLowerCase() ?? '';

  return items.filter((item) => {
    if (item.topicId !== topicId) return false;
    if (!query) return true;

    return [
      item.name,
      topicLabel,
      item.description,
      item.district,
      item.regionId,
      item.studyPrompt,
      item.status,
    ].some((value) => value?.toLowerCase().includes(query));
  });
}
