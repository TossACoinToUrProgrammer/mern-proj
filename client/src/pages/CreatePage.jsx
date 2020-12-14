import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hooks";
import { AuthContext } from "../context/authContext";

const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");

  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "api/link/generate",
          "POST",
          { from: link },
          { Authorization: "Bearer " + auth.token }
        );
        history.push("/detail/" + data.link._id);
      } catch (error) {}
    }
  };
  return (
    <div>
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            type="text"
            id="link"
            onChange={(e) => setLink(e.target.value)}
            value={link}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
