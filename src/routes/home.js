import React from 'react';
import { 
	Button, 
	Form, 
	FormGroup,
	InputGroup, 
	FormControl, 
	ControlLabel, 
	Icon, 
	Col, 
	Label, 
	Popover, 
	Grid, 
	Row, 
	Table,
	Checkbox,
	Radio 
} from '@sketchpixy/rubix';


	//設定欄 放欄位篩選 例如：乾坤 大組 單位

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
					<Col xs={12}>
						<Row className="show-grid">
							<Col xs={3}>
								<FormGroup>
									<ControlLabel>乾坤</ControlLabel>
									<div>
										<Radio inline defaultValue='option1' defaultChecked name='inline-radio-options'>
											乾道
										</Radio>
										<Radio inline defaultValue='option2'  name='inline-radio-options'>
											坤道
										</Radio>
										
									</div>
								</FormGroup>
							</Col>

							<Col xs={3}>
								<FormGroup controlId="dropdownselect">
									<ControlLabel>大組</ControlLabel>
									<FormControl componentClass="select" placeholder="select">
										<option value='1'>第一組</option>
										<option value='2'>第二組</option>
										<option value='3'>第三組</option>
										<option value='4'>第四組</option>
										<option value='5'>第五組</option>
										<option value='5'>第六組</option>
									</FormControl>
								</FormGroup>
							</Col>

							<Col xs={3}>
								<FormGroup controlId="dropdownselect">
									<ControlLabel>單位</ControlLabel>
									<FormControl componentClass="select" placeholder="select">
										<option value='1'>中邱</option>
										<option value='2'>第二組</option>
										<option value='3'>第三組</option>
										<option value='4'>第四組</option>
										<option value='5'>第五組</option>
										<option value='5'>第六組</option>
									</FormControl>
								</FormGroup>
							</Col>
						</Row>
						

						
					</Col>
				</Row>

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
								<th>姓名</th>
								<th>大組</th>
								<th>單位</th>
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


