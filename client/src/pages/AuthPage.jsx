import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/http.hooks";
import { useMessage } from "../hooks/message.hook";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const { request, loading, error, clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });
  const message = useMessage();
  
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-3">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field auth__input">
                <input
                  id="email"
                  type="text"
                  className="validate"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field auth__input">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              disabled={loading}
              onClick={loginHandler}
              className="btn yellow darken-4"
              style={{ marginRight: "10px" }}
            >
              Войти
            </button>
            <button
              disabled={loading}
              onClick={registerHandler}
              className="btn grey lighten-1 black-text"
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
