import React, { useState, useRef } from 'react';
import { ExcelImporter } from './ExcelImporter';
import { Row, Col, Table, FormGroup, Input, Button } from 'reactstrap';

export const DisplayResults = () => {
    const [sheetData, setSheetData] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const searchTermRef = useRef();

    const handleFileUploaded = (e) => {
        e.sort((a, b) => (a['Years of Professional Experience'] < b['Years of Professional Experience'] ? 1 : (b['Years of Professional Experience'] < a['Years of Professional Experience'] ? -1 : 0)));
        setSheetData(e);
    };

    function handleSearch() {        
        let term = searchTermRef.current.value;
        term = term.toLowerCase();
        let skills;
        let results = [];
        sheetData.filter((val) =>
        {
            if (val.Skills == "") {
                return;
            }
            
            skills = val.Skills.toLowerCase().split(",");

            if (term == "") {
                return val;
            } else {
                for (let i = 0; i < skills.length; i++) {
                    if (term == skills[i].trim()) return val;
                }
                return;
            }
        }
        ).map((val, key) => {
            results.push(val);
        });
        setSearchResults(results);
    }

    return (
        <div>
            <Row>
                <Col md = {12}>
                    <h1>Resume Parser</h1>
                    <ExcelImporter onFileUploaded = {(e) => handleFileUploaded(e)} />
                    <FormGroup>
                        <Input innerRef={searchTermRef} type="text" placeholder="Type in the skill you want to search" />
                    </FormGroup>
                    <Button color="primary" onClick={handleSearch}>Search</Button>
                    <div>
                        <p></p>
                        {searchResults && (
                            <Row>
                                <Col md = {12}>
                                    <Table bordered striped responsive>
                                        <thead>
                                            <tr>
                                                <th scope="col">First Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone Number</th>
                                                <th scope="col">Skills</th>
                                                <th scope="col">Experience</th>
                                                <th scope="col">Years of Professional Experience</th>
                                                <th scope="col">Education</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {searchResults.map((r) => (
                                                <tr key = {r['First Name']}>
                                                    <td>{r['First Name']}</td>
                                                    <td>{r['Last Name']}</td>
                                                    <td>{r['Email']}</td>
                                                    <td>{r['Phone Number']}</td>
                                                    <td>{r['Skills']}</td>
                                                    <td>{r['Experience']}</td>
                                                    <td>{r['Years of Professional Experience']}</td>
                                                    <td>{r['Education']}</td>
                                                </tr>))
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>) 
                        }
                    </div>
                </Col>
            </Row>
        </div>
    );
};