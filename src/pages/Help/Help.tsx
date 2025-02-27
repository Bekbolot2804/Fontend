import { FC, useEffect } from 'react'
import { Col, Container, Row, Image, Spinner, Table} from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { getHelpWithId } from '../../slices/helpSlice';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { ROUTE_LABELS, ROUTES } from '../../Routes';
import defaultImg from '/default.jpg'
import './Help.css'
import { useHelp, useHelpLoading } from '../../slices/helpSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

const HelpPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const helpContent = useHelp()
    const loading = useHelpLoading()
    const {helpId} = useParams();

    const loadContent = async () => {
        await dispatch(getHelpWithId(helpId!))
    }

    useEffect(() => {
        loadContent();
    }, [])

    return (
        <Container className='w-100 rootContainer'>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.ELEMENTS, path: ROUTES.ELEMENTS}, {label: helpContent?.name}]}/>

            {loading ? (
                <div  className='d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="dark" />
                </div>
            ) : (
                <>
                    <Row>
                        <Col md={2} xs={4}>
                            <Image src={helpContent?.img_url || defaultImg} fluid/>
                        </Col>
                        <Col md={10} xs={8}>
                            <h1 className='helpName'>{helpContent?.name}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <p className='helpDescription' dangerouslySetInnerHTML={{__html: helpContent?.description}}/>
                    </Row>
                    <Row>
                        <Col lg={{span: 6, offset: 3}} md={{span:8, offset: 2}} xs={12}>
                        <p className='helpAttributesLabel'>Атрибуты:</p>
                            <Table bordered className='border-dark helpAttributes'>
                                <tbody>
                                    {helpContent.attributes?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.attribute?.name}</td>
                                                <td dangerouslySetInnerHTML={{__html: item.value || ''}} />
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    )
}
export default HelpPage;