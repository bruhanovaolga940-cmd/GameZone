import { NavLink } from "react-router-dom";

import "./login.css";

const Login = () => {
    return ( 
        <section className="form" >
            <div className="container">
                
                <form id="login">
                    <h2>Вход</h2>
                    <div className="form-group">
                        <label htmlFor="loginEmail">Email</label>
                        <input type="email" id="loginEmail" placeholder="your@mail.ru" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="loginPass">Пароль</label>
                        <input type="password" id="loginPass" placeholder="••••••••" />
                    </div>
                <button className="btn btn-primary">Войти</button>
                <p>Нет аккаунта? <NavLink to="/Registration">Зарегистрируйтесь</NavLink></p>
                </form>
            </div>
        </section>
     );
}
 
export default Login;