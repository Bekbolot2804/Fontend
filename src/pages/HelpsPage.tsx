import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import './HelpsPage.css';
import { mockHelps } from '../modules/mock.ts';
import { BreadCrumbs } from "../components/BreadCrumbs.tsx";
import { ROUTE_LABELS } from "../Routes.tsx";
import defaultImage from "../assets/images/default_img.jpg";

interface Help {
  id: number;
  name: string;
  description: string;
  image_url?: string;
}

const HelpsPage = () => {
  const [Helps, setHelps] = useState<Help[]>([]);
  const [allHelps, setAllHelps] = useState<Help[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchHelps = async () => {
      try {
        const response = await fetch(`/proxy/Helps/`);
        if (!response.ok) {
          console.error('Error fetching data:', response.status);
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAllHelps(data['helps'] || []);
        setHelps(data['helps'] || []);
      } catch (error) {
        console.error('.:Error fetching data:. -->> GET MOCK-OBJECT <<--', error);
        setAllHelps(mockHelps['helps'] || []);
        setHelps(mockHelps['helps'] || []);
      }
    };

    const initialQuery = searchParams.get('object_search');
    if (initialQuery) {
      setSearchQuery(initialQuery);
      handleSearch(initialQuery);
    } else {
      fetchHelps();
    }
  }, [searchParams]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setSearchParams({ object_search: query });
    if (!query) {
      setHelps(allHelps);
      return;
    }

    try {
      const response = await fetch(`/proxy/Helps/?object_search=${encodeURIComponent(query)}`);
      if (!response.ok) {
        console.error('Error fetching search results:', response.status);
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setHelps(data['helps'] || []);
    } catch (error) {
      console.error('.:Error fetching search results:', error);
      const filteredmockHelps = mockHelps['helps']
        ?.filter(object => object.name && object.name.toLowerCase().includes(query.toLowerCase())) || [];
      setHelps(filteredmockHelps);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const handleCardClick = (id: number) => {
    navigate(`/Helps/${id}/`);
  };

  return (
    <div className="container">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.HelpS }]} />
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            const newQuery = e.target.value;
            setSearchQuery(newQuery);
            if (!newQuery) {
              setHelps(allHelps);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Поиск"
        />
      </div>
      {/* Адаптивная сетка */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {Helps.map((object) => (
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

export default HelpsPage;