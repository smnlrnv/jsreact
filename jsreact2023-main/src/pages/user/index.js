import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const User = () => {

  const navigate = useNavigate()
  const dispath = useDispatch()
  const store = useSelector(state => state)

  const [user, setUser] = useState(false);

  const getInitialData = () => {
    if (store.user.user.name != null) {
      setUser(store.user.user)
    } else {
      navigate("/")
    }
  }

  const logOut = () => {
    dispath(({ type: "delete" }));
    navigate("/")
  }

  useEffect(() => {
    getInitialData()
  }, [])

  return (
    <>
      <div className="main_layout">
        {user && <div className="user_info">
          <span className="user_text">Your Name: <b>{user.name}</b></span>
          <span className="user_text">Unique ID: <b>{user.id}</b></span>
          <button className="button_login" onClick={logOut}>Exit</button>
        </div>}
      </div>
    </>
  );
}

export default User;