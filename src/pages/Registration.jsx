import { NavLink } from "react-router-dom";
import "./login.css";

const Registration = () => {
    return ( 
        <section className="form" >
            <div className="container">
                
                <form className="form-body" id="login">
                    <h2>Вход</h2>
                    <div className="form-group">
                        <label htmlFor="userName">Usename</label>
                        <input type="text" id="userName" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="loginEmail">Email</label>
                        <input type="email" id="loginEmail" placeholder="your@mail.ru" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="login">Пароль</label>
                        <input type="password" id="login" placeholder="••••••••" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="loginReapet">Повторите пароль</label>
                        <input type="password" id="loginReapet" placeholder="••••••••" />
                    </div>
                <button className="btn btn-primary">Войти</button>
                <p>Уже есть аккаунт? <NavLink to="/Login">Войти</NavLink></p>
                </form>
            </div>
        </section>
     );
}
 
export default Registration;