import React from 'react';
import { Button, Form, FormGroup, InputGroup, FormControl, ControlLabel, Icon, Col, Label, Popover, Grid, Row, Table } from '@sketchpixy/rubix';

export default class Home extends React.Component {

	search() {
		console.log(this);
	}

  render() {
    // return (
    //   // <div>Hello World!</div>
    // );
    return (
			<Grid>
				<Row className="show-grid">
	  			<Col xs={12} md={8}>

						<FormGroup controlId='searchbtnicon'>
							
							<Col sm={12}>
								<InputGroup>
									<FormControl type='text' placeholder='請輸入關鍵字 ...' onChange={this.search.bind(this)}/>
									<InputGroup.Addon className='plain'>
										<Button onClick={this.search.bind(this)}>
											<span>搜尋 </span>
											<Icon bundle='fontello' glyph='search' />
										</Button>
									</InputGroup.Addon>
								</InputGroup>
							</Col>
					</FormGroup>

						<Table striped bordered condensed hover>
							<thead>
								<tr>
								<th>#</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Username</th>
								</tr>
							</thead>
							<tbody>
								<tr>
								<td>1</td>
								<td>Mark</td>
								<td>Otto</td>
								<td>@mdo</td>
								</tr>
								<tr>
								<td>2</td>
								<td>Jacob</td>
								<td>Thornton</td>
								<td>@fat</td>
								</tr>
								<tr>
								<td>3</td>
								<td colSpan="2">Larry the Bird</td>
								<td>@twitter</td>
								</tr>
							</tbody>
							</Table>
					</Col>
	  			<Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
				</Row>
			</Grid>
		);
  }
}


