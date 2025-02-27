import { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";
import defaultImg from '/default.jpg'
import './HelpCard.css'
import { useIsAuthenticated } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addHelpToLesion } from '../../slices/helpsSlice';

interface helpProps {
  help_id: number,
  name: string,
  description: string,
  status: string,
  img_url: string,
  duration: number
}

export const HelpCard: FC<helpProps> = ({ help_id, name, img_url }) => {
  const dispatch = useDispatch<AppDispatch>()
  const isAuthenticated = useIsAuthenticated()

  const handleAdd = () => {
    dispatch(addHelpToLesion(help_id.toString()))
  }

  return (
    <Card border='primary' className='card'>
      <Card.Img variant="top" src={img_url || defaultImg} className='cardImg'/>
      <Card.Body>
        <Card.Title className='cardTitle'>{name}</Card.Title>
        {isAuthenticated && (<Button className='w-100 customButton' variant="dark" onClick={handleAdd}>Добавить</Button>)}
        <Link to={`${ROUTES.HELPS}/${help_id}`}>
          <Button className='w-100 customButton' variant="primary" style={{ ...(isAuthenticated && {marginTop: "5px"})}}>Подробнее</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}
export default HelpCard;