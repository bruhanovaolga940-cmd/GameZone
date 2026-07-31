import 'dotenv/config';

import express from 'express'
import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express();

app.use(cors({
  origin: process.env.FRONT_URL, 
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,  
});

// Проверка подключения 
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('Подключение к MySQL успешно');
    conn.release();
  } catch (err) {
    console.error('Ошибка подключения к MySQL:', err.message);
    process.exit(1);
  }
})();

const COOKIE_OPTIONS = {
  httpOnly: true,  // недоступен через JS на клиенте
  secure: process.env.NODE_ENV === 'production',
  sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  path:'/',
};


/**
 * Создаёт JWT токен для пользователя
 * @param {number} userId - ID пользователя из БД
 * @returns {string} - подписанный JWT токен
 */


function createToken(userId) {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' } 
  );
}


function setTokenCookie(res, token) {
  res.cookie('token', token, {
    ...COOKIE_OPTIONS,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}
function clearTokenCookie(res) {
  res.cookie('token', '', {
    ...COOKIE_OPTIONS,
    maxAge: 0, // немедленно удаляем
  });
}



// мидлвэтр

function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ ok: false, message: 'Не авторизован' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    clearTokenCookie(res);
    return res.status(401).json({ 
      ok: false, 
      message: 'сессия истекла, войдите снова',
     });
  }
}

// маршруты

// Регистрация нового пользователя
app.post('/api/register', async (req, res) => {
  const { name, email, password, avatar } = req.body;

  // Валидация  
  if (!name || !email || !password) {
    return res.status(400).json({
      ok: false,
      message: 'Все поля обязательны для заполнения',
    });
  }
  try {

    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name.trim(), email.toLowerCase().trim(), passwordHash]
    );

    console.log(`Новый пользователь зарегистрирован: ${email}`);

    const token = createToken(result.insertId);
    setTokenCookie(res, token);

    return res.status(201).json({
      ok: true,
      user: {
        id: result.insertId,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        avatar: avatar,
      }
    });

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        ok: false,
        message: 'Пользователь с таким email уже существует',
      });
    }

    console.error('Ошибка регистрации:', err);
    return res.status(500).json({
      ok: false,
      message: 'Ошибка сервера, попробуйте позже',
    });
  }
});

// Вход 

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;


  try {
    // Ищем пользователя по email
    // Приводим email к нижнему регистру для единообразия
    const [rows] = await pool.execute(
      'SELECT id, name, email, password_hash FROM users WHERE email = ?',
      [email.toLowerCase().trim()]
    );

    // Если пользователь не найден
    if (rows.length === 0) {
      // Важно: не уточняем что именно неверно — email или пароль
      // Это предотвращает перебор существующих аккаунтов
      return res.status(401).json({
        ok: false,
        message: 'Неверный email или пароль',
      });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        ok: false,
        message: 'Неверный email или пароль',
      });
    }

    const token = createToken(user.id);
    setTokenCookie(res, token);

    console.log(`Пользователь вошёл: ${email}`);

    return res.json({
      ok: true,
      user: {
        id:    user.id,
        name:  user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error(' Ошибка входа:', err);
    return res.status(500).json({
      ok: false,
      message: 'Ошибка сервера, попробуйте позже',
    });
  }
});

// Получение данных текущего авторизованного пользователя
app.get('/api/me', requireAuth, async (req, res) => {
  try {

    const [rows] = await pool.execute(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [req.userId]
    );

    if (rows.length === 0) {
      clearTokenCookie(res);
      return res.status(401).json({
        ok: false,
        message: 'Пользователь не найден',
      });
    }

    return res.json({
      ok: true,
      user: rows[0],
    });

  } catch (err) {
    console.error('Ошибка /api/me:', err);
    return res.status(500).json({
      ok: false,
      message: 'Ошибка сервера',
    });
  }
});

// Выход пользователя — очищаем cookie с токеном
app.post('/api/logout', (req, res) => {
clearTokenCookie(res);
  return res.json({ ok: true });
});


// ────────────────────────────────────────────────────────────
// ЗАПУСК СЕРВЕРА
// ────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Сервер запущен на http://localhost:${PORT}`);
});