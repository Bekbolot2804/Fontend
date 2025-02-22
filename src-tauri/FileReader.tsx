import { invoke } from '@tauri-apps/api';

function FileReader() {
  const [content, setContent] = useState('');

  const handleReadFile = async () => {
    try {
      const text = await invoke('read_file', { path: 'C:/example.txt' });
      setContent(text as string);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div>
      <button onClick={handleReadFile}>Прочитать файл</button>
      <p>Содержимое: {content}</p>
    </div>
  );
}