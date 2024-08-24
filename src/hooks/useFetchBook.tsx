import { useEffect, useState } from 'react'
import { Resources } from '../types/resources';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Response } from '../constant/errorMessages';

const collectionName = "books";
// fetch all books from firebase
const useFetchBooks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<Resources[] | null>([]);

  useEffect(() => {
    setLoading(true);
    // set db and collection name
    const ref = collection(db, collectionName);
    const q = query(ref, orderBy('date','desc'));
    getDocs(q).then(snapshot => {
      if (snapshot.empty) {
        setLoading(false);
      } else {
        const booksData: Resources[] = snapshot.docs.map(doc => {
          const data = doc.data() as Omit<Resources, 'id'>; // Exclude 'id' from the spread
            return { id: doc.id, ...data }; // Manually add the 'id' back
          });
        setData(booksData);
        setError("");
        setLoading(false);
      }
    }).catch(error => {
      setError(Response.message.fetchError.replace("{0}",error));
    });

  },[])
  return { data, error, loading };
}

// get specific book from firebase with id
const useGetBook = (id:string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<Resources | null>(null);

  useEffect(() => {
    setLoading(true);
    // set db, collection name and id
    const ref = doc(db, collectionName, id);
    getDoc(ref).then(snapshot => {
      if (!snapshot.exists()) {
        setError(Response.message.somethingWrong);
        setLoading(false);
      } else {
        const bookData: Resources = { id: snapshot.id, ...snapshot.data() as Omit<Resources, "id"> };
        setData(bookData);
        setError("");
        setLoading(false);
      }
    }).catch(error => {
      setError(Response.message.fetchError.replace("{0}",error));
    });

  },[id])
  return { data, error, loading };
}

// create book to store into firebase
const useCreateBook = () => {
  const [postData, setPostData] = useState<Resources | null>(null);

  useEffect(() => {
    if (postData != null) {
      const newPostData = {
        ...postData,
        date: serverTimestamp(), // Add the date field
      };

      const ref = collection(db, collectionName);
      addDoc(ref, newPostData);
    }

  },[postData])

  return {setPostData}
}

// delete a specific doc
const useDeleteBook = async (id: string): Promise<boolean> => {
  try {
    const ref = doc(db, collectionName, id);
    await deleteDoc(ref);
    console.log(`Document with ID ${id} deleted successfully.`);
    return true;
  } catch (error) {
    console.error("Error deleting document: ", error);
    return false;
  }
};

export const BookRepository = {
  useFetchBooks,
  useGetBook,
  useCreateBook,
  useDeleteBook
};