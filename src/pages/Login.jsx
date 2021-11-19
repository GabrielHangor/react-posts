import React, { useContext } from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from './../components/UI/input/MyInput';
import { AuthContext } from './../context/context';

function Login() {
  const { setIsUserAuthorised } = useContext(AuthContext);
  const logIn = (e) => {
    e.preventDefault();
    setIsUserAuthorised(true);
    localStorage.setItem('auth', 'true');
  };

  return (
    <div>
      <h1>Страница для логина</h1>
      <form onSubmit={logIn}>
        <MyInput required type="text" placeholder="Введите логин" />
        <MyInput required type="password" placeholder="Введите пароль" />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  );
}

export default Login;
