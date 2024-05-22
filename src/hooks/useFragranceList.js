import { useEffect, useState } from "react";
import { db, storage } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const useFragranceList = () => {
  const [fragranceList, setFragranceList] = useState([]);

  const fragrancesCollectionRef = collection(db, "fragrances");

  useEffect(() => {
    const getFragmentList = async () => {
      try {
        const data = await getDocs(fragrancesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const updatedData = filteredData.map(async (fragrance) => {
          const updatedImageSources = fragrance.imageSources.map(
            async (imageSource) => {
              const imageRef = ref(storage, imageSource);
              const url = await getDownloadURL(imageRef);

              return url;
            }
          );

          return {
            ...fragrance,
            imageSources: await Promise.all(updatedImageSources),
          };
        });

        setFragranceList(await Promise.all(updatedData));
        console.log(fragranceList);
      } catch (err) {
        console.error("Error getting fragrances colelction from db: ", err);
      }
    };

    getFragmentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { fragranceList };
};

export default useFragranceList;
