import { collection, addDoc, getDocs, query, where, doc, getDoc, deleteDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Blog } from './Blog.types';



export const getBlogsFromFirestore = async () => {

  try {
    const blogCollectionRef = collection(db, 'blogs');
    const querySnapshot = await getDocs(blogCollectionRef);
    const allBlogs = querySnapshot.docs.map(doc => (  // dont use forEach
      // console.log(doc.id, doc.data())
      {
        id: doc.id,
        title: doc.data().title,
        summary: doc.data().summary,
        body: doc.data().body,
        userId: doc.data().userId,
        createdAt: doc.data().createdAt,
        authorName: doc.data().authorName,
        likes: doc.data().likes,
      }
      // {
      //   id: doc.id, 
      //   ...doc.data()
      // }

    ));
    return allBlogs;

  } catch (e) {
    console.error('Error getting blogs: ', e);
  }
}

export const addBlogToFirestore = async (blogData: Blog) => {
  try {
    const blogCollectionRef = collection(db, 'blogs');
    const docRef = await addDoc(blogCollectionRef, {
      ...blogData

    });
    console.log('Blog added with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding blog: ', e);
  }
};

export const getUserBlogsFromFirestore = async (userId: string) => {
  try {
    const blogCollectionRef = collection(db, 'blogs');
    const userBlogsQuery = query(blogCollectionRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(userBlogsQuery);
    const myBlogs = querySnapshot.docs.map(doc => (  // dont use forEach
      // console.log(doc.id, doc.data())
      {
        id: doc.id,
        ...doc.data()
      }

    ));
    return myBlogs;

  } catch (e) {
    console.error('Error getting blogs: ', e);
  }
};

export const getBlogById = async (blogId: string) => {
  const blogRef = doc(db, 'blogs', blogId);
  const blogSnap = await getDoc(blogRef);

  if (blogSnap.exists()) {
    return { id: blogSnap.id, ...blogSnap.data() };
  }
  return null;
}

export const deleteBlogFromFirestore = async (blogId: string) => {
  try {
    const blogRef = doc(db, 'blogs', blogId);
    await deleteDoc(blogRef);
    console.log('Blog deleted successfully');
  } catch (e) {
    console.error('Error deleting blog: ', e);
  }
};

export const toggleLike = async (blogId: string, userId: string) => {
  const blogRef = doc(db, 'blogs', blogId);
  const blog = await getBlogById(blogId);

  if (blog.likes.includes(userId)) {
    await updateDoc(blogRef, {
      likes: arrayRemove(userId)
    });
  } else {
    await updateDoc(blogRef, {
      likes: arrayUnion(userId)
    });
  }
}