import { FC, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Help, getHelpById } from "../modules/HelpApi.ts";
import "./HelpDetailPage.css";
import { BreadCrumbs } from "../components/BreadCrumbs.tsx";
import { ROUTE_LABELS, ROUTES } from "../Routes.tsx";
import defaultImage from "../assets/images/default_img.jpg";


const HelpDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [Help, setHelp] = useState<Help | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHelp = async () => {
      setIsLoading(true);
      if (id) {
        try {
          const data = await getHelpById(id);
          if (data) {
            setHelp(data);
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
    fetchHelp();
  }, [id]);

  if (isLoading) {
    return <p>Загрузка...</p>; // Используйте спиннер или текст загрузки
  }

  if (!Help) {
    return <p>Космический объект не найден</p>;
  }

  return (
    <div className="container">
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.HelpS, path: ROUTES.HelpS },
          { label: Help.name || "Космический объект" },
        ]}
      />
      <Card className="card">
        <Card.Img
          className="cardImage"
          variant="top"
          src={Help.image_url && Help.image_url.trim() !== '' ? Help.image_url : defaultImage}
          height="100px"
          width="100px"
        />
        <Card.Body>
          <div className="textStyle">
            <Card.Title>{Help.name || "Нет названия"}</Card.Title>
          </div>
          <div className="textStyle">
            <Card.Text>{Help.description || "Нет описания"}</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default HelpDetailPage;