export interface IPost {
  _id: string;
  _createdAt: string;
  userId: string;
  avatar: string;
  username: string;
  content: string;
  image: string;
}

export interface IComment {
  _id: string;
  _createdAt: string;
  userId: string;
  avatar: string;
  username: string;
  content: string;
}

export interface ILike {
  _id: string;
  postId: string;
  userId: string;
}
