export interface Blog {
  id: string | null;
  title: string;
  summary: string;
  body: string;
  userId: string;
  createdAt: string;
  authorName: string;

  likes: string[]; // Array of userIds who liked the post
  comments: Comment[];
}


export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}