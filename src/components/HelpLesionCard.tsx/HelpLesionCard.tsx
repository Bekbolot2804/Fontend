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

interface lesionHelp {
    id?: number;
    help?: help;
    comment?: string | null;
    lesion?: number;
}

export const HelpLesionCard: FC<lesionHelp> = (lesionHelp) => {
    const dispatch = useDispatch<AppDispatch>()
    const status = useLesionStatus()
    const handleDelete = async () => {
        await dispatch(deleteHelpFromLesion({helpId: lesionHelp.help?.help_id!, lesionId: lesionHelp.lesion!}))
    }

    return (
        <Card border='dark'>
            <Card.Body className='d-flex flex-column flex-md-row'>
                <Card.Img variant="top" src={lesionHelp.help!.img_url || defaultImg} className='helpLesionImg pe-md-3 mx-auto mx-md-0'/>
                <div className='d-flex flex-column w-100 justify-content-between'>
                    <Card.Title className='lesionCardTitle pt-2 pt-md-0 mx-auto mx-md-0'>{lesionHelp.help?.name}</Card.Title>
                    <InputGroup>
                        <div className='d-flex flex-column flex-md-row w-100 align-items-start'>
                            <Form.Label className="lesionText formLabel mx-auto mx-md-0 my-0 my-md-auto">Комментарий:</Form.Label>
                            <Form.Control className="lesionText border-dark"
                                        value={lesionHelp.comment!}
                                        onChange={(e) => dispatch(setLesionHelpQuantityAction({ help_id: lesionHelp.help?.help_id, quantity: e.target.value}))}
                                        required
                                        placeholder="Введите комментарий"
                                        {...status !== "draft" ? {readOnly: true} : {}}/>
                        </div>
                    </InputGroup>
                    {status === "draft" ? (
                        <Button className='customButton mt-3 mt-md-0' variant='outline-danger' onClick={handleDelete}>Удалить</Button>
                    ) : (
                        <Form.Label className='lesionText formLabel mt-3 mt-md-0'></Form.Label>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}
export default HelpLesionCard;