import { FC, useEffect } from "react";
import { Button, Container, Row, Spinner, Table } from "react-bootstrap";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS, ROUTES } from "../../Routes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getHelpsWithSearch, useHelps, useHelpsLoading } from "../../slices/helpsSlice";
import './HelpsTable.css'
import { Link, useNavigate } from "react-router-dom";
import { deleteHelp } from "../../slices/helpSlice";
import { useIsModerator } from "../../slices/userSlice";

const HelpsTablePage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const isModerator = useIsModerator()
    const helps = useHelps()
    const loading = useHelpsLoading()

    useEffect(() => {
        if (!isModerator) {
            navigate(ROUTES.FORBIDDEN)
        }
        dispatch(getHelpsWithSearch(''))
    }, [])

    useEffect(() => {
        if (!isModerator) {
            navigate(ROUTES.FORBIDDEN)
        }
    }, [isModerator])

    const statusFormat = (status: string) => {
        const statusMap: Record<string, string> = {
            "active": "Активный",
            "deleted": "Удаленный",
        };
    
        return statusMap[status]
    };

    const handleDelete = async (helpId: string) => {
        await dispatch(deleteHelp(helpId))
        await dispatch(getHelpsWithSearch(''))
    }

    return (
        <Container className="w-100 rootContainer">
            {loading ? (
                <Row className='d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="dark" />
                </Row>
            ) : (
                <>
                <BreadCrumbs crumbs={[{path: ROUTES.ELEMENTS, label: ROUTE_LABELS.ELEMENTS}, {label: ROUTE_LABELS.ELEMENTS_TABLE}]}/>
                <Link to={ROUTES.ADDEDITELEMENT}>
                    <Button variant="outline-dark" className="createHelpButton">Создать</Button>
                </Link>
                <div className="w-100" style={{overflowX: 'auto'}}>
                    <Table className="tableStyle">
                        <thead>
                            <tr>
                                <th>ID Элемента</th>
                                <th>Название</th>
                                <th>Статус</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {helps.slice().sort((a, b) => a.help_id! - b.help_id!)
                                .map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.help_id}</td>
                                    <td>{item.name}</td>
                                    <td>{statusFormat(item.status)}</td>
                                    <td>
                                        <Link to={`${ROUTES.ADDEDITELEMENT}/${item.help_id}`}>
                                            <Button variant="warning">Редактировать</Button>
                                        </Link>
                                    </td>
                                    {item.status === 'active' ? (
                                        <td><Button variant="danger" onClick={() => handleDelete(item.help_id.toString())}>Удалить</Button></td>
                                    ): (
                                        <td></td>
                                    )}
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
                </>
            )}
        </Container>
    )
}
export default HelpsTablePage