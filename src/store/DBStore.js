import { createContext, useEffect, useState } from "react";
import { db, storage } from "../config/firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const DBContext = createContext();

export const DBProvider = ({ children }) => {
  const [fragranceList, setFragranceList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [likesList, setLikesList] = useState([]);
  const [dislikesList, setDislikesList] = useState([]);
  const [userOrdersList, setUserOrdersList] = useState([]);

  const fragrancesCollectionRef = collection(db, "fragrances");
  const commentsCollectionRef = collection(db, "comments");
  const likesCollectionRef = collection(db, "likes");
  const dislikesCollectionRef = collection(db, "dislikes");
  const ordersCollectionRef = collection(db, "orders");

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

  const getLikesList = async () => {
    try {
      const data = await getDocs(likesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setLikesList(filteredData);
    } catch (err) {
      console.error("Error getting likes colelction from db: ", err);
    }
  };

  const getDislikesList = async () => {
    try {
      const data = await getDocs(dislikesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDislikesList(filteredData);
    } catch (err) {
      console.error("Error getting dislikes colelction from db: ", err);
    }
  };

  const getUserOrdersList = async (userId) => {
    try {
      const userOrdersQuery = query(
        ordersCollectionRef,
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(userOrdersQuery);

      const filteredData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUserOrdersList(filteredData);
    } catch (err) {
      console.error("Error getting user orders collection from db: ", err);
    }
  };

  useEffect(() => {
    getFragmentList();
    getCommentsList();
    getLikesList();
    getDislikesList();
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

  const addLike = async (
    userId,
    commentId,
    previousLike,
    previousDislike,
    previousLikeCount,
    previousDislikeCount
  ) => {
    try {
      let likeDocToUpdate = doc(likesCollectionRef, `${userId}_${commentId}`);

      let commentDocToUpdate = doc(commentsCollectionRef, commentId);
      if (previousLike) {
        await deleteDoc(likeDocToUpdate);
        await updateDoc(commentDocToUpdate, { likes: previousLikeCount - 1 });
      } else {
        await setDoc(likeDocToUpdate, {
          userId: userId,
          commentId: commentId,
        });
        await updateDoc(commentDocToUpdate, { likes: previousLikeCount + 1 });

        if (previousDislike) {
          let dislikeDocToUpdate = doc(
            dislikesCollectionRef,
            `${userId}_${commentId}`
          );
          await deleteDoc(dislikeDocToUpdate);
          await updateDoc(commentDocToUpdate, {
            dislikes: previousDislikeCount - 1,
          });
        }
      }

      getLikesList();
      getDislikesList();
      getCommentsList();
    } catch (err) {
      console.error("Error adding reaction to db: ", err);
    }
  };

  const addDislike = async (
    userId,
    commentId,
    previousLike,
    previousDislike,
    previousLikeCount,
    previousDislikeCount
  ) => {
    try {
      let dislikeDocToUpdate = doc(
        dislikesCollectionRef,
        `${userId}_${commentId}`
      );

      let commentDocToUpdate = doc(commentsCollectionRef, commentId);
      if (previousDislike) {
        await deleteDoc(dislikeDocToUpdate);
        await updateDoc(commentDocToUpdate, {
          dislike: previousDislikeCount - 1,
        });
      } else {
        await setDoc(dislikeDocToUpdate, {
          userId: userId,
          commentId: commentId,
        });
        await updateDoc(commentDocToUpdate, {
          dislikes: previousDislikeCount + 1,
        });

        if (previousLike) {
          let likeDocToUpdate = doc(
            likesCollectionRef,
            `${userId}_${commentId}`
          );
          await deleteDoc(likeDocToUpdate);
          await updateDoc(commentDocToUpdate, {
            likes: previousLikeCount - 1,
          });
        }
      }

      getLikesList();
      getDislikesList();
      getCommentsList();
    } catch (err) {
      console.error("Error adding reaction to db: ", err);
    }
  };

  const addOrder = async (order) => {
    try {
      await addDoc(ordersCollectionRef, order);
      getUserOrdersList(order.userId);
    } catch (err) {
      console.error("Error adding order to db: ", err);
    }
  };

  return (
    <DBContext.Provider
      value={{
        fragranceList,
        commentsList,
        likesList,
        dislikesList,
        userOrdersList,
        getUserOrdersList,
        addComment,
        addLike,
        addDislike,
        addOrder,
      }}
    >
      {children}
    </DBContext.Provider>
  );
};

export default DBContext;
