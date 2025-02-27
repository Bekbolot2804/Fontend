import { FC, useEffect } from 'react'
import { Row, Col, Spinner, Container } from 'react-bootstrap';
import HelpCard from '../../components/HelpCard/HelpCard';
import "./Helps.css"
import { ROUTE_LABELS, ROUTES } from '../../Routes';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import InputField from '../../components/InputField/InputField';
import { useDispatch } from 'react-redux';
import { setNameAction, useSearchName, useHelps, useHelpsLoading } from '../../slices/helpsSlice';
import { getHelpsWithSearch } from '../../slices/helpsSlice';
import { AppDispatch } from '../../store';
import { useLesionInf, useIsAuthenticated } from '../../slices/userSlice';
import lesionLogo from '/icon-192x192.png';
import { Link } from 'react-router-dom';

const HelpsPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const searchName = useSearchName()
    const helps = useHelps()
    const loading = useHelpsLoading()
    const isAuthenticated = useIsAuthenticated()
    const lesionInf = useLesionInf()

    const handleSearch = () => {
        dispatch(getHelpsWithSearch(searchName))
    }

    useEffect(() => {
        handleSearch()
    }, [])

    useEffect(() => {
        handleSearch()
    }, [isAuthenticated])

    return (
        <Container className='w-100 rootContainer'>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.HELPS}]}/>
            <Row>
                <Col md={12}>
                    <div className='inputField'>
                        <InputField
                            value={searchName}
                            setValue={(value: string) => dispatch(setNameAction(value))}
                            placeholder='Введите название первой помощи'
                            buttonText='Найти'
                            onSubmit={handleSearch}
                        />
                    </div>
                </Col>
            </Row>

            {loading ? (
                <Row className='d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="dark" />
                </Row>
            ): (
                <Row className="g-4">
                    {helps.filter(item => item.status === '1').map((item, index)=> (
                        <Col lg = {3} md={4} xs={6} key={index}>
                            <HelpCard {...item}/>
                        </Col>
                    ))}
                </Row>
            )}

            {lesionInf.lesion_id && lesionInf.lesion_helps_count && isAuthenticated ? (
                <>
                    <Link to={`${ROUTES.LESIONS}/${lesionInf.lesion_id}`}>
                        <img src={lesionLogo} className='draftLesionLogo'/>
                        <span className='draftLesionLogoCount d-flex justify-content-center align-items-center'>{lesionInf.lesion_helps_count}</span>
                    </Link>
                </>
            ) : (
                <img src={lesionLogo} className='draftLesionLogo blackNWhiteLogo'/>
            )}
            
        </Container>
    )
}

export default HelpsPage