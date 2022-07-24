import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useMoralisQuery } from "react-moralis";
import FileViewer from "react-file-viewer";
export default function UserFiles(props) {
  const [files, setFiles] = useState([]);
  const { fetch } = useMoralisQuery(
    "MintFiles",
    (query) => query.equalTo("minter_address", props.wallet),
    [],
    { autoFetch: false }
  );
  const getFiles = () => {
    fetch({
      onSuccess: (data) => {
        console.log("myFiles", data);
        setFiles(data);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };
  useEffect(() => {
    if (props.wallet) {
      getFiles();
    }
  }, [props]);
  return (
    <>
      <Row>
        {files &&
          files.map((item, index) => {
            return (
              <Col lg={4} className="my-2" key={index}>
                <Card className="h-100">
                  {item.get("contentType").split("/")[0] === "image" ? (
                    <Card.Img variant="top" src={item.get("url")} />
                  ) : (
                    <FileViewer
                      fileType={item.get("contentType").split("/").pop()}
                      filePath={item.get("url")}
                      
                    />
                  )}

                  <Card.Body>
                    <Card.Title>File Name : {item.get("fileName")}</Card.Title>
                    <Card.Text>Content Type : {item.get("contentType")}</Card.Text>
                    <Card.Text>
                      CID: {item.get("url").split("/").pop()}
                    </Card.Text>
                    <Card.Text>
                      File size: {item.get("fileSizeMB")} MB
                    </Card.Text>
                    <Card.Text>
                      Created At: {JSON.stringify(item.createdAt)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
}
