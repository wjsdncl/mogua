import { useInfiniteQuery } from "@tanstack/react-query";
import {
  type UserPageSection,
  type MyReviewTab,
  type StudyType,
} from "@/types/user-page";
import { fetchItems } from "@/utils/userPage";

interface UseInfiniteMeetingsProps {
  tab: UserPageSection;
  studyType: StudyType;
  reviewTab?: MyReviewTab;
}

export const useInfiniteMeetings = ({
  tab,
  studyType,
  reviewTab,
}: UseInfiniteMeetingsProps) => {
  return useInfiniteQuery({
    queryKey: ["meetings", tab, studyType, reviewTab],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchItems({
        tab,
        studyType,
        reviewTab,
        page: pageParam,
      });
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.isLast) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};
