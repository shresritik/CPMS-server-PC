import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Navbars from "../components/Navbar";

const Views = () => {
  const [views, setViews] = useState();
  const [searchQuery, setSearchQuery] = useState(views);
  const [query, setQuery] = useState("");
  const fetchRequest = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/v1/");
    const res = await response.json();
    setViews(res);
  };
  const search = (data) => {
    return data?.filter((item) =>
      item.numberPlate.toLowerCase().includes(query)
    );
  };
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/delete/${id}`, {
        method: "DELETE",
      });
      fetchRequest();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <>
      <Navbars />
      <div className="container-fluid p-3">
        <div className="d-flex align-middle my-3 justify-content-center align-item-center">
          <h4 className="">
            Total Records: {search(views) && search(views).length}
          </h4>
          <div>
            <Form.Control
              type="text"
              className="w-auto ms-3"
              placeholder="Search by Number Plate"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>S.N</th>
              <th>Number Plate Image</th>
              <th>Number Plate</th>
              <th>Number of Passengers</th>
              <th>License Image</th>
              <th>Expiry Date</th>
              <th>Entry Date / Time</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {search(views) &&
              search(views).map((view, id) => (
                <tr className="text-center align-middle" key={view.id}>
                  <td>
                    <h6>{id + 1}</h6>
                  </td>
                  <td className="w-max">
                    {" "}
                    {/* <h6>{view.id}</h6> */}
                    <div className="w-max">
                      <img
                        className="w-max"
                        src={`data:image/jpeg;base64,${view.plateImg}`}
                      />
                    </div>
                  </td>

                  <td>
                    {" "}
                    <h6>{view.numberPlate}</h6>
                  </td>
                  <td>
                    {" "}
                    <h6>{view.numOfPass}</h6>
                  </td>
                  <td className=" w-max">
                    {" "}
                    <div className="w-max">
                      <img
                        className="w-max"
                        src={`http://localhost:8000${view.licenseImg}`}
                      />
                    </div>
                  </td>
                  <td>
                    {" "}
                    <h6>{view.expiry_date}</h6>
                  </td>
                  <td>
                    {" "}
                    <h6>
                      {view.createdAt.split("T")[0] +
                        " / " +
                        view.createdAt.split("T")[1].split(".")[0]}
                    </h6>
                  </td>
                  <td>
                    {" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(view.id)}
                    >
                      X
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Views;
