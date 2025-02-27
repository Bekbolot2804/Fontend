import { FC } from 'react'
import { Button, Card, InputGroup, Form } from 'react-bootstrap'
import defaultImg from '/default.jpg'
import './HelpLesionCard.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { deleteHelpFromLesion, setLesionHelpQuantityAction, useLesionStatus } from '../../slices/lesionSlice';

interface help {
    help_id?: number;
    name: string;
    status?: string;
    img_url?: string | null;
  }

interface decayHelp {
    id?: number;
    help?: help;
    quantity?: string | null;
    remaining_quantity?: string | null;
    decay?: number;
}

export const HelpLesionCard: FC<decayHelp> = (decayHelp) => {
    const dispatch = useDispatch<AppDispatch>()
    const status = useLesionStatus()
    const handleDelete = async () => {
        await dispatch(deleteHelpFromLesion({helpId: decayHelp.help?.help_id!, decayId: decayHelp.decay!}))
    }

    return (
        <Card border='dark'>
            <Card.Body className='d-flex flex-column flex-md-row'>
                <Card.Img variant="top" src={decayHelp.help!.img_url || defaultImg} className='helpLesionImg pe-md-3 mx-auto mx-md-0'/>
                <div className='d-flex flex-column w-100 justify-content-between'>
                    <Card.Title className='decayCardTitle pt-2 pt-md-0 mx-auto mx-md-0'>{decayHelp.help?.name}</Card.Title>
                    <InputGroup>
                        <div className='d-flex flex-column flex-md-row w-100 align-items-start'>
                            <Form.Label className="decayText formLabel mx-auto mx-md-0 my-0 my-md-auto">Количество:</Form.Label>
                            <Form.Control className="decayText border-dark"
                                        value={decayHelp.quantity!}
                                        onChange={(e) => dispatch(setLesionHelpQuantityAction({ help_id: decayHelp.help?.help_id, quantity: e.target.value}))}
                                        required
                                        placeholder="Введите количество"
                                        {...status !== "draft" ? {readOnly: true} : {}}/>
                        </div>
                    </InputGroup>
                    {status === "draft" ? (
                        <Button className='customButton mt-3 mt-md-0' variant='outline-danger' onClick={handleDelete}>Удалить</Button>
                    ) : (
                        <Form.Label className='decayText formLabel mt-3 mt-md-0'>Оставшееся количество вещества: {decayHelp.remaining_quantity}</Form.Label>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}
export default HelpLesionCard;