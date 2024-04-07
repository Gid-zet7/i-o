import ProjectTables from "@/components/Dashboard/Teamlead";
import { Row, Col } from "reactstrap";

const Table = () => {
  return (
    <div className="px-5 lg:p-0">
      <Row>
        {/* --------------------------------------------------------------------------------*/}
        {/* table-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
    </div>
  );
};

export default Table;
