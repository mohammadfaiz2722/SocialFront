import React, { useState, useEffect } from 'react';
import './SocialMediaPage.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SocialMediaPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [comments, setComments] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    fetchPosts();
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://backend-8-p7kz.onrender.com/api/posts`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      } else {
        toast.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to fetch posts');
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;

    try {
      const response = await fetch(`https://backend-8-p7kz.onrender.com/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content: newPost })
      });
      const data = await response.json();
      if (response.ok) {
        setPosts([data, ...posts]);
        setNewPost('');
        toast.success('Post created successfully');
        fetchPosts();
      } else {
        toast.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    }
  };

 

  const handleUnlikePost = async (id) => {
    try {
      const response = await fetch(`https://backend-8-p7kz.onrender.com/api/posts/unlike/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const updatedPosts = posts.map(post =>
          post._id === id ? { ...post, likes: post.likes - 1, liked: false } : post
        );
        setPosts(updatedPosts);
      } else {
        toast.error('Failed to unlike post');
      }
    } catch (error) {
      console.error('Error unliking post:', error);
      toast.error('Failed to unlike post');
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`https://backend-8-p7kz.onrender.com/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        setPosts(posts.filter(post => post._id !== id));
        toast.success('Post deleted successfully');
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };
  const handleEditClick = (post) => {
    setEditingPost(post._id);
    setEditContent(post.content);
  };

  const handleUpdatePost = async (id) => {
    try {
      const response = await fetch(`https://backend-8-p7kz.onrender.com/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content: editContent })
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(posts.map(post => post._id === id ? updatedPost : post));
        setEditingPost(null);
        toast.success('Post updated successfully');
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || 'Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post');
    }
  };
  const handleToggleLike = async (id) => {
    try {
      const response = await fetch(`https://backend-8-p7kz.onrender.com/api/posts/togglelike/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const { likes, likeCount } = await response.json();
        setPosts(posts.map(post => 
          post._id === id ? { ...post, likes, likeCount } : post
        ));
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || 'Failed to update like');
      }
    } catch (error) {
      console.error('Error updating like:', error);
      toast.error('Failed to update like');
    }
  };
  const handleAddComment = async (postId) => {
    try {
      const response = await fetch(`https://backend-8-p7kz.onrender.com/api/posts/comment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ text: comments[postId] })
      });

      if (response.ok) {
        const updatedComments = await response.json();
        setPosts(posts.map(post => 
          post._id === postId ? { ...post, comments: updatedComments } : post
        ));
        setComments({ ...comments, [postId]: '' });
        toast.success('Comment added successfully');
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || 'Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const response = await fetch(`https://backend-8-p7kz.onrender.com/api/posts/comment/${postId}/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const updatedComments = await response.json();
        setPosts(posts.map(post => 
          post._id === postId ? { ...post, comments: updatedComments } : post
        ));
        toast.success('Comment deleted successfully');
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };
  return (
    <div className="social-media-page container">
    <ToastContainer />
    <div className="create-post">
      <textarea
        className="form-control"
        rows="3"
        placeholder="What's on your mind?"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={handleCreatePost}>Post</button>
    </div>
    <div className="posts mt-4">
      {posts.map(post => (
        <div key={post._id} className="card mb-3">
          <div className="card-body">
            {editingPost === post._id ? (
              <>
                <textarea
                  className="form-control mb-2"
                  rows="3"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button className="btn btn-success me-2" onClick={() => handleUpdatePost(post._id)}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setEditingPost(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="card-text">{post.content}</p>
                <button 
                  className={`btn ${post.likes.includes(userId) ? 'btn-primary' : 'btn-light'} me-2`} 
                  onClick={() => handleToggleLike(post._id)}
                >
                  {post.likes.includes(userId) ? 'Unlike' : 'Like'} ({post.likes.length})
                </button>
                <button className="btn btn-info me-2" onClick={() => handleEditClick(post)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDeletePost(post._id)}>
                  Delete
                </button>
              </>
            )}
            <div className="comments mt-3">
              <h6>Comments:</h6>
              {post.comments.map(comment => (
                <div key={comment._id} className="comment mb-2">
                  <p>{comment.text}</p>
                  {comment.user === userId && (
                    <button 
                      className="btn btn-sm btn-danger" 
                      onClick={() => handleDeleteComment(post._id, comment._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
              <div className="add-comment">
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Add a comment..."
                  value={comments[post._id] || ''}
                  onChange={(e) => setComments({...comments, [post._id]: e.target.value})}
                />
                <button 
                  className="btn btn-primary mt-2" 
                  onClick={() => handleAddComment(post._id)}
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default SocialMediaPage;
