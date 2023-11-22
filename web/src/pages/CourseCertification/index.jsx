import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@mui/material";
import "./index.css";
import { getCourseData, fetchUserInformation, fetchQrCode } from "./api";
import { useParams } from "react-router-dom";

const ComponentToPrint = React.forwardRef((props, ref) => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    getCourseData({ id: id })
      .then((data) => {
        setCourse(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchUserInformation()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchQrCode({ id: id })
      .then((data) => {
        setQrCode(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div ref={ref}>
      <div className="container pm-certificate-container">
        <div className="outer-border"></div>
        <div className="inner-border"></div>

        <div className="pm-certificate-border col-xs-12">
          <div className="row pm-certificate-header">
            <div className="pm-certificate-title cursive col-xs-12 text-center">
              <h2 style={{ textAlign: "center" }}>Fiudemy Academy</h2>
            </div>
          </div>

          <div className="row pm-certificate-body">
            <div className="pm-certificate-block">
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-certificate-name underline margin-0 col-xs-8 text-center">
                    <span className="pm-name-text bold">{course?.name}</span>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>

              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-earned col-xs-8 text-center">
                    <span className="pm-earned-text padding-0 block cursive">
                      {course?.description}
                    </span>
                  </div>
                  <div className="col-xs-2"></div>
                  <div className="col-xs-12"></div>
                </div>
              </div>

              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-certificate-footer col-xs-8 text-center">
                    <span className="pm-credits-text block cursive">
                      <b> Dictado Por: </b> {course?.teacher_name}
                    </span>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>

              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-course-title  col-xs-8 text-center">
                    <span className="pm-credits-text block bold sans"></span>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>
            </div>

            <div className="col-xs-12">
              <div className="row">
                <div className="pm-certificate-footer col-xs-8 text-center">
                  <span className="pm-credits-text block cursive">
                    <b>Otorgado a : </b> {user?.username}
                  </span>
                  <span className="pm-empty-space block underline"></span>
                </div>
                <div
                  className="col-xs-4"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "-50px",
                  }}
                >
                  {qrCode && (
                    <img src={qrCode} height={100} width={100} alt="QR Code" />
                  )}
                </div>
                <div className="col-xs-4 pm-certified col-xs-4 text-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
const CertificatePdfButton = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <ComponentToPrint ref={componentRef} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          style={{ margin: "20px" }}
          onClick={handlePrint}
        >
          Descargar Certificación
        </Button>
      </div>
    </>
  );
};

export default CertificatePdfButton;
