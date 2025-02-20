import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import './SpaceObjectsPage.css';
import { mockSpaceObjects } from '../modules/mock';
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTE_LABELS } from "../Routes.tsx";
import defaultImage from "../assets/images/default_img.jpg";

interface SpaceObject {
  id: number;
  name: string;
  description: string;
  image_url?: string;
}

const SpaceObjectsPage = () => {
  const [spaceObjects, setSpaceObjects] = useState<SpaceObject[]>([]);
  const [allSpaceObjects, setAllSpaceObjects] = useState<SpaceObject[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchSpaceObjects = async () => {
      try {
        const response = await fetch(`/proxy/spaceobjects/`);
        if (!response.ok) {
          console.error('Error fetching data:', response.status);
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAllSpaceObjects(data['space objects'] || []);
        setSpaceObjects(data['space objects'] || []);
      } catch (error) {
        console.error('.:Error fetching data:. -->> GET MOCK-OBJECT <<--', error);
        setAllSpaceObjects(mockSpaceObjects['space objects'] || []);
        setSpaceObjects(mockSpaceObjects['space objects'] || []);
      }
    };

    const initialQuery = searchParams.get('object_search');
    if (initialQuery) {
      setSearchQuery(initialQuery);
      handleSearch(initialQuery);
    } else {
      fetchSpaceObjects();
    }
  }, [searchParams]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setSearchParams({ object_search: query });
    if (!query) {
      setSpaceObjects(allSpaceObjects);
      return;
    }

    try {
      const response = await fetch(`/proxy/spaceobjects/?object_search=${encodeURIComponent(query)}`);
      if (!response.ok) {
        console.error('Error fetching search results:', response.status);
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSpaceObjects(data['space objects'] || []);
    } catch (error) {
      console.error('.:Error fetching search results:', error);
      const filteredMockSpaceObjects = mockSpaceObjects['space objects']
        ?.filter(object => object.name && object.name.toLowerCase().includes(query.toLowerCase())) || [];
      setSpaceObjects(filteredMockSpaceObjects);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const handleCardClick = (id: number) => {
    navigate(`/spaceobjects/${id}/`);
  };

  return (
    <div className="container">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.SPACEOBJECTS }]} />
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            const newQuery = e.target.value;
            setSearchQuery(newQuery);
            if (!newQuery) {
              setSpaceObjects(allSpaceObjects);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Поиск"
        />
      </div>
      <Row xs={4} md={4} className="g-4">
        {spaceObjects.map((object) => (
          <Col key={object.id}>
            <Card className="card text-start clickable-card" onClick={() => handleCardClick(object.id)}>
              <Card.Img variant="top" src={object.image_url && object.image_url.trim() !== '' ? object.image_url : defaultImage} />
              <Card.Body>
                <Card.Title>{object.name || 'Нет названия'}</Card.Title>
                <Card.Text>{object.description ? object.description.split(' ').slice(0, 16).join(' ') : 'Нет описания'}...</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SpaceObjectsPage;