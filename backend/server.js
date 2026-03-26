import 'dotenv/config';

import express from 'express'
import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
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
  connectionLimit: 10,    // максимум 10 одновременных соединений
  queueLimit: 0,
});

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Подключение к MySQL успешно');
    conn.release();
  } catch (err) {
    console.error('❌ Ошибка подключения к MySQL:', err.message);
    process.exit(1);
  }
})();

/**
 * Создаёт JWT токен для пользователя
 * @param {number} userId - ID пользователя из БД
 * @returns {string} - подписанный JWT токен
 */
function createToken(userId) {
  return jwt.sign(
    { userId },                  // payload — что хранится в токене
    process.env.JWT_SECRET,      // секрет для подписи
    { expiresIn: '7d' }          // токен живёт 7 дней
  );
}

/**
 * Устанавливает JWT токен в HttpOnly cookie
 * HttpOnly = недоступен из JavaScript на клиенте (защита от XSS)
 * @param {object} res - объект ответа Express
 * @param {string} token - JWT токен
 */
function setTokenCookie(res, token) {
  res.cookie('token', token, {
    httpOnly:true,  // cookie недоступна через document.cookie
    secure: process.env.NODE_ENV === 'production', // HTTPS только на проде
    sameSite: 'none', // защита от CSRF атак
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/', // 7 дней в миллисекундах
  });
}

/**
 * Middleware для проверки авторизации
 * Читает JWT из cookie, проверяет подпись и добавляет userId в req
 */
function requireAuth(req, res, next) {
  const token = req.cookies.token; // берём токен из cookie

  if (!token) {
    // Токена нет — пользователь не авторизован
    return res.status(401).json({ ok: false, message: 'Не авторизован' });
  }

  try {
    // Проверяем подпись токена и извлекаем payload
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId; // добавляем userId в объект запроса
    next(); // передаём управление следующему обработчику
  } catch (err) {
    // Токен невалидный или просрочен
    return res.status(401).json({ ok: false, message: 'Токен недействителен' });
  }
}

// ────────────────────────────────────────────────────────────
// API ЭНДПОИНТЫ
// ────────────────────────────────────────────────────────────

// ── POST /api/register ──────────────────────────────────────
// Регистрация нового пользователя
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Валидация — проверяем что все поля заполнены
  if (!name || !email || !password) {
    return res.status(400).json({
      ok: false,
      message: 'Все поля обязательны для заполнения',
    });
  }

  // Проверяем минимальную длину пароля
  if (password.length < 6) {
    return res.status(400).json({
      ok: false,
      message: 'Пароль должен содержать минимум 6 символов',
    });
  }

  try {
    // Хешируем пароль с saltRounds=10 (достаточно безопасно и быстро)
    // bcrypt автоматически добавляет соль — каждый хеш уникален
    const passwordHash = await bcrypt.hash(password, 10);

    // Сохраняем пользователя в БД
    // Используем параметризованный запрос — защита от SQL инъекций
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name.trim(), email.toLowerCase().trim(), passwordHash]
    );

    console.log(`✅ Новый пользователь зарегистрирован: ${email}`);

    return res.status(201).json({
      ok: true,
      userId: result.insertId, // ID только что созданной записи
    });

  } catch (err) {
    // Код ER_DUP_ENTRY означает нарушение UNIQUE ограничения
    // то есть email уже существует в базе
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        ok: false,
        message: 'Пользователь с таким email уже существует',
      });
    }

    console.error('❌ Ошибка регистрации:', err);
    return res.status(500).json({
      ok: false,
      message: 'Ошибка сервера, попробуйте позже',
    });
  }
});

// ── POST /api/login ─────────────────────────────────────────
// Вход пользователя
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Валидация входных данных
  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      message: 'Email и пароль обязательны',
    });
  }

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

    // Сравниваем введённый пароль с хешем из БД
    // bcrypt.compare безопасно сравнивает, учитывая соль
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        ok: false,
        message: 'Неверный email или пароль',
      });
    }

    // Создаём JWT токен и сохраняем в cookie
    const token = createToken(user.id);
    setTokenCookie(res, token);

    console.log(`✅ Пользователь вошёл: ${email}`);

    // Возвращаем данные пользователя БЕЗ password_hash
    return res.json({
      ok: true,
      user: {
        id:    user.id,
        name:  user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error('❌ Ошибка входа:', err);
    return res.status(500).json({
      ok: false,
      message: 'Ошибка сервера, попробуйте позже',
    });
  }
});

// ── GET /api/me ─────────────────────────────────────────────
// Получение данных текущего авторизованного пользователя
// requireAuth — middleware проверяет токен перед обработчиком
app.get('/api/me', requireAuth, async (req, res) => {
  try {
    // req.userId установлен в middleware requireAuth
    const [rows] = await pool.execute(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [req.userId]
    );

    // Пользователь из токена не найден в БД (например, был удалён)
    if (rows.length === 0) {
      return res.status(401).json({
        ok: false,
        message: 'Пользователь не найден',
      });
    }

    return res.json({
      ok: true,
      user: rows[0], // password_hash не выбираем в SELECT
    });

  } catch (err) {
    console.error('❌ Ошибка /api/me:', err);
    return res.status(500).json({
      ok: false,
      message: 'Ошибка сервера',
    });
  }
});

// ── POST /api/logout ────────────────────────────────────────
// Выход пользователя — очищаем cookie с токеном
app.post('/api/logout', (req, res) => {
  // Очищаем cookie, передавая те же флаги что при установке
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  });

  console.log('✅ Пользователь вышел');

  return res.json({ ok: true });
});

// ────────────────────────────────────────────────────────────
// ЗАПУСК СЕРВЕРА
// ────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});