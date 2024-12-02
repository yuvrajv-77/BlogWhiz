export interface Blog {
  id: string;
  title: string;
  summary: string;
  body: string;
  userId: string;
  createdAt: string;
  authorName: string;

  likes: string[]; // Array of userIds who liked the post
  // comments: Comment[];
}