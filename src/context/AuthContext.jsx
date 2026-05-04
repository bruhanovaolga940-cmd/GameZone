import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${API_URL}/api/me`, {
          credentials: 'include', // отправляем cookies вместе с запросом
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user); // восстанавливаем пользователя из сессии
        }
        // Если 401 — просто оставляем user = null (не авторизован)
      } catch (err) {
        // Сервер недоступен — молча игнорируем, user останется null
        console.warn('Не удалось проверить сессию:', err.message);
      } finally {
        // В любом случае снимаем флаг загрузки
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // ── Функция регистрации ───────────────────────────────────
  /**
   * Регистрирует нового пользователя и автоматически логинит его
   * @param {string} name - имя пользователя
   * @param {string} email - email
   * @param {string} password - пароль
   * @throws {Error} - если регистрация не удалась (передаём в компонент)
   */
  const register = async (name, email, password, avatar) => {
    // Шаг 1: регистрируем пользователя
    const regRes = await fetch(`${API_URL}/api/register`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password, avatar}),
    });

    const regData = await regRes.json();

    if (!regData.ok) {
      // Пробрасываем ошибку наверх — компонент покажет её пользователю
      throw new Error(regData.message || 'Ошибка регистрации');
    }

    // Шаг 2: автоматически логиним после успешной регистрации
    await login(email, password);
  };

  // ── Функция входа ─────────────────────────────────────────
  /**
   * Авторизует пользователя
   * @param {string} email
   * @param {string} password
   * @throws {Error} - если вход не удался
   */
  const login = async (email, password, avatar) => {
    const res = await fetch(`${API_URL}/api/login`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // важно! иначе cookie не сохранится
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.ok) {
      throw new Error(data.message || 'Ошибка входа');
    }

    // Сохраняем пользователя в состояние
    setUser(data.user);

    // Перенаправляем на главную страницу после входа
    navigate('/');
  };

  // ── Функция выхода ────────────────────────────────────────
  /**
   * Выходит из системы — очищает cookie на сервере и сбрасывает состояние
   */
  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.warn('Ошибка при выходе:', err.message);
    } finally {
      // Сбрасываем пользователя в любом случае
      setUser(null);
      navigate('/login');
    }
  };

  // ── Значение контекста ────────────────────────────────────
  // Всё что передаём дочерним компонентам через useAuth()
  const value = {
    user,      // объект пользователя или null
    loading,   // true пока идёт проверка сессии
    register,  // функция регистрации
    login,     // функция входа
    logout,    // функция выхода
    isAuth: !!user, // удобный булев флаг: авторизован ли пользователь
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ────────────────────────────────────────────────────────────
// ХУК ДЛЯ ИСПОЛЬЗОВАНИЯ КОНТЕКСТА
// Использование: const { user, login, logout } = useAuth();
// ────────────────────────────────────────────────────────────
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    // Защита от использования хука вне AuthProvider
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }

  return context;
}
