import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./login.css";

const Login = () => {

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError]         = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Получаем функцию входа из контекста
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Базовая валидация
    if (!email.trim() || !password) {
      return setError('Введите email и пароль');
    }

    setIsLoading(true);

     try {
      // login из AuthContext: отправляет запрос и перенаправляет на /
      await login(email.trim(), password);
    } catch (err) {
      // Показываем ошибку сервера ("Неверный email или пароль")
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

    return ( 
        <section className="form" >
            <div className="container">
                
                <form className="form-body" id="login" onSubmit={handleSubmit}>
                    <h2>Вход</h2>
                    <div className="form-group">
                        <label htmlFor="loginEmail">Email</label>
                        <input type="email" id="loginEmail"
                         placeholder="your@mail.ru"
                         value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading} />
                    </div>


                    <div className="form-group">
                        <label htmlFor="loginPass">Пароль</label>
                        <input type="password" id="loginPass" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}/>
                    </div>

                    {error && (
                            <div
                            className="form-error"
                            style={{
                                color: '#e53e3e',
                                background: '#fff5f5',
                                border: '1px solid #fc8181',
                                borderRadius: '6px',
                                padding: '8px 12px',
                                marginBottom: '12px',
                                fontSize: '14px',
                            }}
                            >
                            {error}
                            </div>
                        )}


                <button className="btn btn-primary" type="submit" disabled={isLoading}>{isLoading ? 'Вход...' : 'Войти'}</button>
                <p>Нет аккаунта? <NavLink to="/Registration">Зарегистрируйтесь</NavLink></p>
                </form>
            </div>
        </section>
     );
}
 
export default Login;