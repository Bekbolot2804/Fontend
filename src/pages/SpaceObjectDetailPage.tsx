import { FC, useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { SpaceObject, getSpaceObjectById } from "../modules/spaceobjectAPI.ts";
import "./SpaceObjectDetailPage.css";
import { BreadCrumbs } from "../components/BreadCrumbs";
import {ROUTE_LABELS, ROUTES} from "../Routes.tsx";
import defaultImage from "../assets/images/default_img.jpg"

const SpaceObjectDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем параметр id из URL
  const [spaceObject, setSpaceObject] = useState<SpaceObject | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpaceObject = async () => {
      setIsLoading(true);
      if (id) {
        try {
          const data = await getSpaceObjectById(id);
          if (data) {
            setSpaceObject(data);
          } else {
            console.error("Space object not found");
          }
        } catch (error) {
          console.error("Error fetching space object details:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchSpaceObject();
  }, [id]);

  // if (isLoading) {
  //   return <Spinner animation="border" variant="dark" />;
  // }

  if (!spaceObject) {
    return <p>Космический объект не найден</p>;
  }

  return (
    <div className="container">
      {/*<BreadCrumbs crumbs={[{ label: `${ROUTE_LABELS.SPACEOBJECTS} / ${spaceObject.name}` }]} />*/}
      <BreadCrumbs crumbs ={[
        {label:ROUTE_LABELS.SPACEOBJECTS, path: ROUTES.SPACEOBJECTS},
        {label: spaceObject.name || "Космический объект"},
      ]}
      >
      </BreadCrumbs>
      <Card className="card">
        <Card.Img
          className="cardImage"
          variant="top"
          src={spaceObject.image_url || defaultImage}
          height={100}
          width={100}
        />
        <Card.Body>
          <div className="textStyle">
            <Card.Title>{spaceObject.name}</Card.Title>
          </div>
          <div className="textStyle">
            <Card.Text>{spaceObject.description}</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SpaceObjectDetailPage;
