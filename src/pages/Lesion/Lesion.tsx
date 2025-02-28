import { FC, FormEvent, useEffect } from "react";
import { Container, Form, Row, InputGroup, Button, Spinner } from "react-bootstrap";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useLesion,  getLesionInformation, useLesionLoading, deleteLesion, saveComment, formLesion, useLesionStatus } from "../../slices/lesionSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import './Lesion.css'
import { useNavigate, useParams } from "react-router-dom";
import HelpLesionCard from "../../components/HelpLesionCard.tsx/HelpLesionCard";
import { useIsAuthenticated } from "../../slices/userSlice";

const LesionPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isAuthenticated = useIsAuthenticated()
    const lesion = useLesion()
    const loading = useLesionLoading()
    const { lesionId } = useParams()
    const navigate = useNavigate()
    const status = useLesionStatus()

    const saveFields = () => {
        lesion.helps?.forEach((item, index) => {
            dispatch(saveComment({helpId: item.help?.help_id!, lesionId: item.lesion!, comment: item.comment!}))
        })
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        saveFields()
        setTimeout(() => {
            dispatch(formLesion(lesion.lesion_id!))
        }, 500)
        setTimeout(() => {
            navigate(ROUTES.HELPS)
        }, 500)
    }

    const handleDelete = async () => {
        await dispatch(deleteLesion(lesion.lesion_id!))
        navigate(ROUTES.HELPS)
    }

    const handleSave = () => {
        saveFields()
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(ROUTES.FORBIDDEN)
        }
        dispatch(getLesionInformation(lesionId!))
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
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.LESIONS, path: ROUTES.LESIONS}, {label: `Поражение №${lesionId}`}]}/>
            
            <Form onSubmit={handleSubmit}>
                <div className="w-100 d-flex justify-content-center pb-3">
                        {status === "draft" ? (
                            <div className="">
                                <Button variant="outline-success" className="customButton" onClick={handleSave}>Сохранить</Button>
                            </div>
                        ) : (
                            <div>
                                <Form.Label className='lesionText formLabel'>Требуемое время: {lesion.sum_duration}</Form.Label>
                            </div>
                        )}
                </div>

                {lesion.helps && lesion.helps!.map((item, index)=> (
                                        <div className="w-100 d-flex align-items justify-content-center">
                                            <div className="pb-3 w-75" >
                                                <HelpLesionCard {...item}/>
                                            </div>
                                        </div>
                                    ))}

                {status === "draft" ? (
                    <div className="d-flex flex-row justify-content-center gap-3">
                        { lesion.helps!.length ? (
                            <>
                                <Button type="submit" variant="primary" className="customButton">Сформировать</Button>
                                <Button variant="danger" className="customButton" onClick={handleDelete}>Удалить</Button>
                            </>
                        ) : (
                            <h1 className="lesionH1">В поражениее нет Протоколов</h1>
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