import { FC, FormEvent, useEffect } from "react";
import { Container, Form, Row, InputGroup, Button, Spinner } from "react-bootstrap";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useLesion, setLesionPassTimeAction, getLesionInformation, useLesionLoading, deleteLesion, saveQuantity, savePassTime, formLesion, useLesionStatus } from "../../slices/lesionSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import './Lesion.css'
import { useNavigate, useParams } from "react-router-dom";
import HelpLesionCard from "../../components/HelpLesionCard.tsx/HelpLesionCard";
import { useIsAuthenticated } from "../../slices/userSlice";

const LesionPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isAuthenticated = useIsAuthenticated()
    const decay = useLesion()
    const loading = useLesionLoading()
    const { decayId } = useParams()
    const navigate = useNavigate()
    const status = useLesionStatus()
    const saveFields = () => {
        dispatch(savePassTime({decayId: decay.decay_id!, passTime: decay.pass_time!}))
        decay.helps?.forEach((item, index) => {
            dispatch(saveQuantity({helpId: item.help?.help_id!, decayId: item.decay!, quantity: item.quantity!}))
        })
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        saveFields()
        setTimeout(() => {
            dispatch(formLesion(decay.decay_id!))
        }, 500)
        setTimeout(() => {
            navigate(ROUTES.ELEMENTS)
        }, 500)
    }

    const handleDelete = async () => {
        await dispatch(deleteLesion(decay.decay_id!))
        navigate(ROUTES.ELEMENTS)
    }

    const handleSave = () => {
        saveFields()
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(ROUTES.FORBIDDEN)
        }
        dispatch(getLesionInformation(decayId!))
    }, [])
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate(ROUTES.FORBIDDEN)
        }
    }, [isAuthenticated])

    return (
        <Container className="rootContainer w-100">
            {loading ? (
                <Row className='d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="dark" />
                </Row>
            ) : (
            <>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.DECAYS, path: ROUTES.DECAYS}, {label: `Распад №${decayId}`}]}/>
            
            <Form onSubmit={handleSubmit}>
                <div className="w-100 d-flex justify-content-center pb-3">
                    <div className="w-75 d-flex">
                        <div className="w-100 inGroup">
                            <InputGroup>
                                <Form.Label className="decayText my-auto formLabel">Прошло времени:</Form.Label>
                                <Form.Control className="decayText border-dark"
                                            value={decay.pass_time!}
                                            onChange={(e) => dispatch(setLesionPassTimeAction(e.target.value))}
                                            required
                                            placeholder="Введите время"
                                            {...status !== "draft" ? {readOnly: true} : {}}/>
                            </InputGroup>
                        </div>
                        {status === "draft" ? (
                            <div className="">
                                <Button variant="outline-success" className="customButton" onClick={handleSave}>Сохранить</Button>
                            </div>
                        ) : (<></>)}
                    </div>
                </div>

                {decay.helps && decay.helps!.map((item, index)=> (
                                        <div className="w-100 d-flex align-items justify-content-center">
                                            <div className="pb-3 w-75" >
                                                <HelpLesionCard {...item}/>
                                            </div>
                                        </div>
                                    ))}

                {status === "draft" ? (
                    <div className="d-flex flex-row justify-content-center gap-3">
                        { decay.helps!.length ? (
                            <>
                                <Button type="submit" variant="dark" className="customButton">Сформировать</Button>
                                <Button variant="danger" className="customButton" onClick={handleDelete}>Удалить</Button>
                            </>
                        ) : (
                            <h1 className="decayH1">В распаде нет элементов</h1>
                        )}
                    </div>
                ) : (<></>)}
            </Form>
            </>
            )}
        </Container>
    )
}
export default LesionPage