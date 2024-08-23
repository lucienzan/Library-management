import { useEffect, useState } from 'react'
import { Resources } from '../types/resources';
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Response } from '../constant/errorMessages';

// fetch all books from firebase
const FetchBooks = (collectionName:string) => {
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
        setError(Response.message.somethingWrong);
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

  },[collectionName])
  return { data, error, loading };
}

// get specific book from firebase with id
const GetBook = (collectionName:string, id:string) => {
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

  },[collectionName,id])
  return { data, error, loading };
}

// create book to store into firebase
const CreateBook = (collectionName:string) => {
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

  },[postData, collectionName])

  return {setPostData}
}

export const BookRepository = {
  FetchBooks,
  GetBook,
  CreateBook
};