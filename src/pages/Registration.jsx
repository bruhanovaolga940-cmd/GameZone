import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { generateAvatar } from "../assets/utilites/RandomAvatar";
import "./login.css";

const Registration = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPass, setRepeatPass] = useState('');

    const [error, setError]= useState(''); 
    const [isLoading, setIsLoading]= useState(false);

    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

    // Валидация формы

    if (!name.trim()) {
        return setError('Введит имя пользователя')
    }
    if (!email.trim()) {
        return setError('Введит email')
    }
    if (password.length < 6) {
        return setError('Пароль должен содржать минимум 6 символов')
    }
    if (password !== repeatPass) {
        return setError('Пароли не совпадают')
    }

    // проверить
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    return setError('Некорректный email')}

    setIsLoading(true);

    try {
        const avatar = generateAvatar(email);
        await register(name.trim(), email.trim(), password, avatar);
    } catch (err) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
};


    return (    
        <section className="form" >
            <div className="container">
                
                <form className="form-body" id="login" onSubmit={handleSubmit}>
                    <h2>Регистрация</h2>

                    <div className="form-group">
                        <label htmlFor="userName">Usename</label>
                        <input type="text" 
                        id="userName" 
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                        required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="loginEmail">Email</label>
                        <input type="email" 
                        id="loginEmail" 
                        placeholder="your@mail.ru" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        required/>
                    </div>


                    <div className="form-group">
                        <label htmlFor="login">Пароль</label>
                        <input type="password" 
                        id="login" 
                        placeholder="Не менее 6 символов" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="loginReapet">Повторите пароль</label>
                        <input type="password" 
                        id="loginReapet" 
                        alue={repeatPass}
                        onChange={(e) => setRepeatPass(e.target.value)}
                        disabled={isLoading}
                        placeholder="******" />
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


                <button 
                className="btn btn-primary"
                type="submit"
                disabled={isLoading}>
                    {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
                <p>Уже есть аккаунт? <NavLink to="/Login">Войти</NavLink></p>
                </form>
            </div>
        </section>
     );
}
 
export default Registration;