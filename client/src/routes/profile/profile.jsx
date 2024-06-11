import { Suspense, useContext } from "react";
import "./profile.scss";
import List from "../../components/list/list";
import Chat from "../../components/chat/chat";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function Profile() {
  const navigate = useNavigate();

  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);

  async function handleLogout() {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      return null;
    }
  }
  return (
    <div className="profilePage">
      <div className="details">
        <div className="detailsWrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "/avatar.png"} />
            </span>
            <span>
              UserName : <b>{currentUser.username}</b>
            </span>
            <span>
              Email : <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/profile/newPost">
              <button>Create New Post</button>
            </Link>
          </div>

          <Suspense fallback={<p>...Loading</p>}>
            {/* Loading map using Suspense await */}
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading data</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>

          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>...Loading</p>}>
            {/* Loading  using Suspense await */}
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading data</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="chatContainerWrapper">
        <Suspense fallback={<p>...Loading</p>}>
            {/* Loading  using Suspense await */}
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
         
        </div>
      </div>
    </div>
  );
}

export default Profile;
