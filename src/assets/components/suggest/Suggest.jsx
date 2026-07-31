import useForm from "../../utilities/UseForm.jsx";
import "./Suggest.css";

const Suggest = () => {

  const { formData, status, handleChange, handleSubmit } = useForm();

    return ( 
        <div class="container suggest-section">
            <div class="suggest-inner">
                <div class="suggest-info">
                    <div class="hero-eyebrow"> Обратная связь</div>
                    <h2>Знаешь клуб,<br />которого нет в списке?</h2>
                    <p>Помоги нам сделать базу полной. Заполни форму, и мы добавим
                        новое место после проверки. Это бесплатно и займёт пару минут.</p>
                    <ul class="suggest-features">
                        <li><span class="dot"></span> Быстрое рассмотрение заявки</li>
                        <li><span class="dot"></span> Ручная проверка данных</li>
                        <li><span class="dot"></span> Публикация в течение 24 часов</li>
                    </ul>
                </div>
                <div class="suggest-form-card">
                    <h3>Предложить место</h3>
                    <form class="suggest-form" onSubmit={handleSubmit}>
                        <div class="form-group">

                            <label htmlFor="club_name">Название клуба *</label>
                            <input 
                            type="text" 
                            id="club_name"
                            name="club_name"
                            value={formData.club_name}
                            onChange={handleChange} 
                            placeholder="Например: ProGamer Club" required />

                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label htmlFor="address">Адрес *</label>
                                <input 
                                type="text" 
                                id="address" 
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="ул. Ленина, 1" required />
                            </div>
                            <div class="form-group">
                                <label htmlFor="phone">Телефон</label>
                                <input 
                                type="tel" 
                                id="phone" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+7 (___) ___-__-__" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label htmlFor="description">Описание</label>
                            <textarea id="description" 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Расскажи о клубе: оборудование, атмосфера, особенности..." rows="3"></textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label htmlFor="email">Ваш email</label>
                                <input 
                                type="email" 
                                id="email" 
                                name="email"
                                value={formData.email}
                            onChange={handleChange}
                                placeholder="Для обратной связи" />
                            </div>
                            <div class="form-group">
                                <label htmlFor="site">Сайт / соц. сеть</label>
                                <input 
                                type="text"
                                name="site" 
                                id="site" 
                                value={formData.site}
                            onChange={handleChange}
                                placeholder="vk.com/club..." />
                            </div>
                        </div>
                        <button type="submit" 
                        disabled={status.loading}
                        class="btn btn-primary">{status.loading ? "Отправка..." : "Отправить"}</button>

                        {status.success && (
                        <p className="success">
                            ✅ Спасибо! Место успешно отправлено!
                        </p>
                        )}
                        {status.error && (
                        <p className="error">
                            ❌ Ошибка отправки. Попробуйте снова
                        </p>
                        )
                        }

                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Suggest;