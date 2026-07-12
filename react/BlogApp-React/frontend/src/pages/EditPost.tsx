import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api";

interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  // created_at: Date;
}

const EditPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const numericPostId = Number(postId);

  const [post, setPost] = useState<Post | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  useEffect( () => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postRes = await api.get(`/api/post/${numericPostId}/`);
        setPost(postRes.data)
      } catch (err) {
          setError(err.message || "Something went wrong.")
      } finally {
          setLoading(false)
      }
    };
    fetchData();
  }, []);

  return (
    <div>EditPost</div>
  )
}

export default EditPost