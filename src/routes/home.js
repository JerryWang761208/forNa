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

import GroupService from '../services/groupService';
import PeopleService from '../services/personService';
	//設定欄 放欄位篩選 例如：乾坤 大組 單位

export default class Home extends React.Component {
	constructor() {
	  super();
	  this.search = this.search.bind(this);
		this.state = {
			sex:'male',
			groups:[],
			searchGroups:[]
		}
 }

	componentDidMount() {
		GroupService.getGroups().then((res)=>{
			console.log(res);
			this.setState({
				groups: res
			})
		});


  }


	search(e) {
		console.log('search');
		let search = e.target.value;
		PeopleService.findPerson({name:search}).then((res)=>{
			console.log('people:',res);
			this.setState({
				searchGroups:res
			});
		},(error)=>{
			console.log(error);
		});

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
										<Radio inline defaultValue='male' defaultChecked name='inline-radio-options'>
											乾道
										</Radio>
										<Radio inline defaultValue='female'  name='inline-radio-options'>
											坤道
										</Radio>

									</div>
								</FormGroup>
							</Col>

							<Col xs={3}>
								<FormGroup controlId="dropdownselect">
									<ControlLabel>大組</ControlLabel>
									<FormControl componentClass="select" placeholder="select">
										<option value='第一組'>第一組</option>
										<option value='第二組'>第二組</option>
										<option value='第三組'>第三組</option>
										<option value='第四組'>第四組</option>
										<option value='第五組'>第五組</option>
										<option value='第六組'>第六組</option>
									</FormControl>
								</FormGroup>
							</Col>

							<Col xs={3}>
								<FormGroup controlId="dropdownselect">
									<ControlLabel>單位</ControlLabel>
									<FormControl componentClass="select" placeholder="select">
										{
											this.state.groups.map((group)=>{

												return (
													<option key={group._id}>{group.unit}</option>
												);
											})
										}

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
									<FormControl type='text' placeholder='請輸入關鍵字 ...' onChange={this.search}/>
									<InputGroup.Addon className='plain'>
										<Button onClick={this.search}>
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

								<th>姓名</th>
								<th>大組</th>
								<th>單位</th>
								<th>#</th>
								</tr>
							</thead>
							<tbody className="search-tbody">
								{
									this.state.searchGroups.map((person)=>{
										return (
											<tr key={person._id}>

												<td>{person.name}</td>
												<td>{person.group.group}</td>
												<td>{person.group.unit}</td>
												<td style={{textAlign:'center'}}>
													<Button bsStyle='green' rounded >
	  												<Icon glyph='icon-fontello-plus-3'/>
													</Button>
												</td>
											</tr>
										);
									})
								}
							</tbody>
							</Table>
					</Col>
	  			<Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
				</Row>
			</Grid>
		);
  }
}
