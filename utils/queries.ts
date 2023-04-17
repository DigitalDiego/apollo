export const getPosts = () => {
  const query = `*[_type == "post"] | order(_createdAt desc) {
        _id,
        _createdAt,
        userId,
        avatar,
        username,
        content,
        image,
    }`;
  return query;
};

export const getPost = (id: any) => {
  const query = `*[_type == "post" && _id == "${id}"] {
    _id,
    _createdAt,
    userId,
    avatar,
    username,
    content,
    image
  }`;
  return query;
};

export const getPostComments = (id: any) => {
  const query = `*[_type == "comment" && postId == "${id}"] | order(_createdAt desc) {
    _id,
    _createdAt,
    userId,
    avatar,
    username,
    content
  }`;
  return query;
};

export const getUserPosts = (id: any) => {
  const query = `*[_type == "post" && userId == "${id}"] | order(_createdAt desc){
    _id,
    _createdAt,
    userId,
    avatar,
    username,
    content,
    image
  }`;
  return query;
};

export const getLikes = () => {
  const query = `*[_type == "like"] {
    _id,
    postId,
    userId
  }`;
  return query;
};

export const getPostLikes = (id: any) => {
  const query = `*[_type == "like" && postId == "${id}"] {
    _id,
    postId,
    userId
  }`;
  return query;
};
