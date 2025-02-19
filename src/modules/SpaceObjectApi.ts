import { mockSpaceObjects } from './mock.ts'

export interface SpaceObject {
  id: number;
  name: string;
  description: string;
  image_url: string;
}
export interface SpaceObjectResult {
  resultCount: number;
  results: SpaceObject[];
}

export const getSpaceObjectById = async (
  id: number | string
): Promise<SpaceObject | null> => {
  try {
    const response = await fetch(`/proxy/spaceobjects/${id}/`);
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
    return mockSpaceObjects['space objects'].find(obj => obj.id === numericId) || null;
  }
};