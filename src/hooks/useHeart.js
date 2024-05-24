import { useCallback, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

export const useHeart = ({ fragranceId }) => {
  const [heartedFragrances, setHeartedFragrances] = useLocalStorage(
    "heartedFragrances",
    []
  );

  console.log(heartedFragrances);
  const fragranceHearted = useMemo(() => {
    return heartedFragrances.includes(fragranceId);
  }, [fragranceId, heartedFragrances]);
  console.log(fragranceHearted);

  const saveHeartedFragrance = useCallback(() => {
    if (!fragranceHearted) {
      setHeartedFragrances((prev) => [...prev, fragranceId]);
    } else {
      setHeartedFragrances((prev) => prev.filter((id) => id !== fragranceId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fragranceHearted, fragranceId]);

  return { fragranceHearted, saveHeartedFragrance };
};
