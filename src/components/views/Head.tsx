import './Head.css'
import { ROUTES } from "../../Routes.tsx";
// 1. Импортируем модуль уведомлений
import { sendNotification } from '@tauri-apps/api/notification';

const Head = () => {
  // 2. Функция для показа уведомления
  const handleShowNotification = async () => {
    try {
      await sendNotification({
        title: 'Уведомление от Handbook',
        body: 'Добро пожаловать в приложение!'
      });
    } catch (error) {
      console.error('Ошибка уведомления:', error);
    }
  };

  return (
    <div className={'header'}>
      <nav>
        <a href={ROUTES.HOME}>Главная</a>
        {/* 3. Добавляем кнопку для уведомления */}
        <button 
          onClick={handleShowNotification}
          className="notification-btn"
        >
          Показать уведомление
        </button>
      </nav>
    </div>
  )
}

export default Head;