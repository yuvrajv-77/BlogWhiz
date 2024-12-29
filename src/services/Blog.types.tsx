export interface Blog {
  id: string | null;
  title: string;
  summary: string;
  body: string;
  userId: string;
  createdAt: string;
  authorName: string;
  imageUrl: string;
  likes: string[]; // Array of userIds who liked the post
  comments: BlogComment[];
}


export interface BlogComment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}