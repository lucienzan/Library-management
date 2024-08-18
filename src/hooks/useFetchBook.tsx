import { useEffect, useState } from 'react'
import { Resources } from '../types/resources';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Response } from '../constant/errorMessages';

const FetchBooks = (collectionName:string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<Resources[] | null>([]);

  useEffect(() => {
    setLoading(true);
    // set db and collection name
    const ref = collection(db, collectionName);
    getDocs(ref).then(snapshot => {
      if (snapshot.empty) {
          setError(Response.message.somethingWrong);
      } else {
        const booksData: Resources[] = snapshot.docs.map(doc => {
          const data = doc.data() as Omit<Resources, 'id'>; // Exclude 'id' from the spread
            return { id: doc.id, ...data }; // Manually add the 'id' back
          });
        setData((booksData as unknown as Resources[]));
        setError("");
        setLoading(false);
      }
    }).catch(error => {
      setError(Response.message.fetchError.replace("{0}",error));
    });

  },[collectionName])
  return { data, error, loading };
}

export const BookRepository = {
  FetchBooks
};