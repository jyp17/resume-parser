import React, { useState } from 'react';
import { Row, Col, FormText, FormGroup, Input } from 'reactstrap';
import * as XLSX from 'xlsx';

export const ExcelImporter = (props) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [sheetData, setSheetData] = useState({});
    const acceptableFileName = ["xlsx", "xls"];

    const fileTypeChecker = (name) => {
        return acceptableFileName.includes(name.split(".").pop().toLowerCase());
    }

    const readData = (data) => {
        const wb = XLSX.read(data);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(ws);

        setSheetData(jsonData);

        return jsonData;
    };

    const handleFile = async (e) => { 
        const myFile = e.target.files[0];
        if (!myFile) return;
        if (!fileTypeChecker(myFile.name)) {
            alert("Invalid File Type");
            return;
        }
        setFileName(myFile.name);

        const data = await myFile.arrayBuffer();
        const mySheetData = readData(data);

        setFile(myFile);

        props.onFileUploaded(mySheetData);
    }

    return (
        <Row>
            <Col>
                <div>
                    <div>
                        {fileName && <FormText>Successfully uploaded!</FormText>}
                        {!fileName && <FormText>Please upload a file (.xlsx or .xls) of resumes. Properly formatted files will include First Name, Last Name, Email, Phone Number, Skills, Experience, Education, and Years of Professional Experience.
                         </FormText>}
                    </div>
                    <div>
                        <FormGroup>
                            <Input type = "file" accept = "xlsx, xls" multiple = {false} onChange = {(e) => handleFile(e)} />
                        </FormGroup>
                    </div>
                </div>
            </Col>
        </Row>
    );
};