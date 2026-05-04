// import { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';

// export default function ResetPassword (){
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();

//     const token = searchParams.get('token');

//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [isLoding, setIsLoading] = useState(false);
//     const [isSuccess, setIsSuccess] = useState(false);

//     useEffect(() => {
//         if (!token) {
//             setMessage('invalid link');
//         }
//     }, [token]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (newPassword !== confirmPassword) {
//             setMessage('пароли не совпадают');
//             return;
//         }
//         if (newPassword.length < 6 ) {
//             setMessage('Пароль должен быть не менее 6 символов')
//         }

//         setIsLoading(true);
//         setMessage('');

//         try{
//             const response = await fetch('/api/resetPassword', {
//                 method: 'POST',
//                 headers: {
//                     'Content-type' : 'application/json',},
//                     body: JSON.stringify({ token, newPassword}),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setIsSuccess(true);
//                 setMessage('successed');
//                 setTimeout(() => {
//                     navigate('/login');
//                 }, 2000)
//             } else {
//                 setMessage(data.error || 'не удалось сменить пароль');
//             }
//         }catch (err){
//             console.error(err);
//             setMessage('network error');
//         }finally{
//             setIsLoading(false)
//         }
//     };
// }
// if (!token) {
//     return (
//       <div style={styles.container}>
//         <h2>Ошибка</h2>
//         <p>Ссылка для сброса пароля недействительна.</p>
//         <a href="/forgot-password">Запросить новую ссылку</a>
//       </div>
//     );
//   }

//   if (isSuccess) {
//     return (
//       <div style={styles.container}>
//         <h2>Готово!</h2>
//         <p>{message}</p>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <h2>Смена пароля</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <div style={styles.inputGroup}>
//           <label htmlFor="password">Новый пароль:</label>
//           <input
//             type="password"
//             id="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//             minLength={6}
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label htmlFor="confirmPassword">Подтвердите пароль:</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>

//         {message && <p style={message.includes('успешно') ? styles.success : styles.error}>{message}</p>}

//         <button type="submit" disabled={isLoading} style={styles.button}>
//           {isLoading ? 'Обработка...' : 'Сменить пароль'}
//         </button>
//       </form>
//     </div>
//   );
