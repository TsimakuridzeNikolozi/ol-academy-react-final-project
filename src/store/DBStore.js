import { createContext, useEffect, useState } from "react";
import { db, storage } from "../config/firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const DBContext = createContext();

export const DBProvider = ({ children }) => {
  const [fragranceList, setFragranceList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);

  const fragrancesCollectionRef = collection(db, "fragrances");
  const commentsCollectionRef = collection(db, "comments");

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
    } catch (err) {
      console.error("Error getting fragrances colelction from db: ", err);
    }
  };

  const getCommentsList = async () => {
    try {
      const data = await getDocs(commentsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setCommentsList(filteredData);
    } catch (err) {
      console.error("Error getting comments colelction from db: ", err);
    }
  };

  useEffect(() => {
    getFragmentList();
    getCommentsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addComment = async (comment) => {
    try {
      await addDoc(commentsCollectionRef, comment);
      getCommentsList();
    } catch (err) {
      console.error("Error adding comment to db: ", err);
    }
  };

  return (
    <DBContext.Provider
      value={{
        fragranceList,
        commentsList,
        getFragmentList,
        getCommentsList,
        addComment,
      }}
    >
      {children}
    </DBContext.Provider>
  );
};

export default DBContext;
