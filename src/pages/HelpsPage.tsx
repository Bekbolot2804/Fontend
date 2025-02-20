import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import './HelpsPage.css';
import { mockHelps } from '../modules/mock.ts';
import { BreadCrumbs } from "../components/BreadCrumbs.tsx";
import { ROUTE_LABELS } from "../Routes.tsx";
import defaultImage from "../assets/images/default_img.jpg"

const HelpsPage = () => {
  const [Helps, setHelps] = useState([]);
  const [allHelps, setAllHelps] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchHelps = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/proxy/Helps/`);
        const data = await response.json();
        setAllHelps(data['helps']);
        setHelps(data['helps']);
      } catch (error) {
        console.error('.:Error fetching data:. -->> GET MOCK-OBJECT <<--', error);
        setAllHelps(mockHelps['helps']);
        setHelps(mockHelps['helps']);
      } finally {
        setIsLoading(false);
      }
    };

    const initialQuery = searchParams.get('object_search');
    if (initialQuery) {
      setSearchQuery(initialQuery);
      handleSearch(initialQuery); // загрузить результаты при загрузке страницы, если есть query
    } else {
      fetchHelps();
    }
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setSearchParams({ object_search: query });

    if (!query) {
      setHelps(allHelps);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/proxy/Helps/?object_search=${encodeURIComponent(query)}`);
      const data = await response.json();
      setHelps(data['helps']);
    } catch (error) {
      console.error('.:Error fetching search results:', error);
      const filteredmockHelps = mockHelps['helps'].filter(object =>
          object.name.toLowerCase().includes(query.toLowerCase())
      );
      setHelps(filteredmockHelps);
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return <Spinner animation="border" variant="dark" />;
  }

  return (
    <div className="container">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.HelpS }]} />

      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Поиск"
        />

      </div>

      <Row xs={4} md={4} className="g-4">
        {Helps.map((object) => (
          <Col key={object.id}>
            <Card className="card text-start clickable-card" onClick={() => handleCardClick(object.id)}>
              <Card.Img variant="top" src={object.image_url || defaultImage} />
              <Card.Body>
                <Card.Title>{object.name}</Card.Title>
                <Card.Text>{object.description.split(' ').slice(0, 16).join(' ')}...</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HelpsPage;
