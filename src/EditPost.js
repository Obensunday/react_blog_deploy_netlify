import { Link, useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

const EditPost = () => {
    const {id} = useParams();
    const editPost = useStoreActions((actions) => actions.editPost);
    const getPostById = useStoreState((actions) => actions.getPostById);
    const post = getPostById(id);

    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle)
    const setEditBody = useStoreActions((actions) => actions.setEditBody)
    const navigate = useNavigate();

    useEffect(() => {
        if(post)
        {
        setEditTitle(post.title);
        setEditBody(post.body);
        }

    },[post,setEditTitle,setEditBody])

    const handleEdit = (id) => {
      const datetime = format(new Date(), "MMMM dd, yyyy pp");
      const updatedPost = { id, title: editTitle, datetime, body: editBody };
        editPost(updatedPost);
        navigate("/");
    };

  return (
    <main className="NewPost">
        {editTitle &&
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="postTitle">Title:</label>
              <input
                  id="postTitle"
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
              />
              <label htmlFor="postBody">Post:</label>
              <textarea
                  id="postBody"
                  required
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
              />
              <button type="submit"
              onClick={() => handleEdit(post.id)}
              >Submit</button>
          </form>
          </>
        }
        {!editTitle && 
              <>
                  <h2>Post not found</h2>
                  <p>Well, that's disappointing.</p>
                  <p>
                    <Link to='/'>Visit our Homepage</Link>
                  </p>
              </>
        }
      </main>
  )
}

export default EditPost