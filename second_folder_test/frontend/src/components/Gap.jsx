import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function VGap({w}) {
    return(
        <Col style={{width: w}}></Col>
    )
}

function HGap({h}) {
    return(
        <Row style={{height: h}}></Row>
    )
}

export { VGap, HGap }