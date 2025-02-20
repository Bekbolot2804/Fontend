import { mockHelps } from './mock.ts'

export interface Help {
  id: number;
  name: string;
  description: string;
  image_url: string;
}
export interface HelpResult {
  resultCount: number;
  results: Help[];
}

export const getHelpById = async (
  id: number | string
): Promise<Help | null> => {
  try {
    const response = await fetch(`/proxy/Helps/${id}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching space object.  -->> GET MOCK-OBJECT <<--:', error.message);

    // Приводим id к числу для сравнения
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;

    // Возвращаем mock-объект, если произошла ошибка
    return mockHelps['helps'].find(obj => obj.id === numericId) || null;
  }
};