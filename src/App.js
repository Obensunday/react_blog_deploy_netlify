import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from './EditPost'
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import { Routes, Route} from "react-router-dom";
import { useEffect } from "react";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";

function App() {
  const setPosts = useStoreActions((actions)  =>  actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );


  useEffect(() => {
    setPosts(data);
  }, [data,setPosts]);

  return (
    <div className="App">
        <Header title="React Js Blog" />
        <Nav/>
        <Routes>
          <Route path="/" element={<Home fetchError={fetchError} isLoading={isLoading}/>} />
          <Route path="/post" Component={NewPost} />
          <Route path="/edit/:id" Component={EditPost} />
          <Route path="/post/:id" Component={PostPage} />
          <Route path="/about" Component={About} />
          <Route path="*" Component={Missing} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
