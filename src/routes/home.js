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
	Radio,
	Thumbnail,
	PanelContainer,
	Panel,
	PanelHeader,
	PanelBody,
	Alert
} from '@sketchpixy/rubix';

import GroupService from '../services/groupService';
import PeopleService from '../services/personService';
import CheckinService from '../services/checkinService';
	//設定欄 放欄位篩選 例如：乾坤 大組 單位

export default class Home extends React.Component {
	constructor() {
	  super();
	  this.search = this.search.bind(this);
	  this.checkinPerson = this.checkinPerson.bind(this);
		this.updateCheckin = this.updateCheckin.bind(this);
		this.getCounts = this.getCounts.bind(this);
		this.changeSex = this.changeSex.bind(this);
		this.state = {
			sex:'坤',
			groups:[],
			searchGroups:[],
			checkinPeople:[],
			maleCheckinPeople:[],
			femaleCheckinPeople:[],
			malePeopleCnt:0,
			femalePeopleCnt:0,
			maleCheckinCnt:0,
			femaleCheckinCnt:0,
			errorMsg:''
		}
 }

	componentDidMount() {
		GroupService.getGroups().then((res)=>{
			console.log(res);
			this.setState({
				groups: res
			})
		});
		// this.updateCheckin();
		this.getCounts();
  }
	changeSex(event){
		const sexSelected = event.currentTarget.value;
		this.setState({sex: sexSelected,searchGroups:[]});
		this.getCounts();
	}
	getCounts(){
			CheckinService.getCount({'person.sex':'乾'}).then((res)=>{

				if(res){
					let state = {
						maleCheckinCnt:res.length,
						maleCheckinPeople:res
					};
					if(this.state.sex == '乾'){
						state.checkinPeople = res;
					}
					this.setState(state);
				}else{
					let state = {maleCheckinCnt:0};
					if(this.state.sex == '乾'){
						state.checkinPeople = [];
					}
					this.setState(state);
				}
			});
			CheckinService.getCount({'person.sex':'坤'}).then((res)=>{
				if(res){
					let state = {
						femaleCheckinCnt:res.length,
						femaleCheckinPeople:res
					};
					if(this.state.sex == '坤'){
						state.checkinPeople = res;
					}
					this.setState(state);
				}else{
					let state = {femaleCheckinCnt:0};
					if(this.state.sex == '坤'){
						state.checkinPeople = [];
					}
					this.setState(state);
				}
			});
	}

	updateCheckin(){
		CheckinService.getCheckins().then((res)=>{
			console.log('updateCheckin::::',res);
			if(res){
				console.log('get');

				this.setState({
					checkinPeople: res
				})
			}else{
				this.setState({
					checkinPeople: []
				})
			}

		});
	}

//搜尋
	search(e) {
		console.log('search');
		let search = e.target.value;
		PeopleService.findPerson({name:search,sex:this.state.sex}).then((res)=>{
			console.log('searchPeople:',res);

			res.map((each)=>{
				CheckinService.getCount({'person._id':each._id}).then((checkRes)=>{
					if(checkRes && checkRes.length>0){//如果有簽到了
						each.order = checkRes[0].order;
					}
					this.setState({
						searchGroups:res
					});
				});
			});

			// this.setState({
			// 	searchGroups:res
			// });
		},(error)=>{
			console.log(error);
		});

	}

	//checkin
	checkinPerson(person){

		//先看有沒有已經簽到了
		CheckinService.getCount({'person._id':person._id}).then((res)=>{
			this.setState({errorMsg:''});
			if(res && res.length > 0){//has checkin
				console.log('has checked');

						this.setState({errorMsg:`${person.name} 已經簽到了`});


			}else{//new checkin
				CheckinService.getMaxCheckin({'person.sex':person.sex}).then((res)=>{
					if(res && res.length > 0){
						let maxOrder = res[0].order;
							CheckinService.addCheckin({
								order:maxOrder+1,
								person:person
							})
							.then((res)=>{
								console.log('checkinPerson:',res)
								// this.updateCheckin();
								this.getCounts();
							});
					}else{//都沒人時候
						CheckinService.addCheckin({
							order:1,
							person:person,
						})
						.then((res)=>{
							console.log('checkinPerson:',res)
							// this.updateCheckin();
							this.getCounts();
						});
					}
				},(error)=>{console.log('test',error)});
			}
		});
		//獲得最大order


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

								<FormGroup controlId="dropdownselect">
									<ControlLabel>乾坤</ControlLabel>
									<FormControl componentClass="select" placeholder="select" onChange={this.changeSex} value={this.state.sex}>
										<option value='乾'>乾道</option>
										<option value='坤'>坤道</option>
									</FormControl>
								</FormGroup>
							</Col>

							<Col xs={3}>
								<FormGroup controlId="dropdownselect">
									<ControlLabel>大組</ControlLabel>
									<FormControl componentClass="select" placeholder="select">
										<option value='不分組'>不分組</option>
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

							<Col xs={3}>
								<Alert danger>
								  <strong>{this.state.errorMsg}</strong>
								</Alert>
							</Col>
						</Row>



					</Col>
				</Row>

				<Row className="show-grid">
	  			<Col xs={12} md={8} style={{height:'500px',overflow:'scroll'}}>

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
							<tbody >
								{
									this.state.searchGroups.map((person)=>{
										return (

											<tr key={person._id}>
												<td>{person.name}</td>
												<td>{person.group.group}</td>
												<td>{person.group.unit}</td>



													{
														person.order?

																	<td style={{textAlign:'center'}}>
																		{person.order}
																	</td>


														:

																<td style={{textAlign:'center'}}>
																	<Button bsStyle='green' rounded onClick={()=>this.checkinPerson(person)}>
					  												<Icon glyph='icon-fontello-plus-3'/>
																	</Button>
																</td>
															

													}


											</tr>
										);
									})
								}
							</tbody>
							</Table>
					</Col>
	  			<Col xs={6} md={4} style={{height:'500px',overflow:'scroll'}}>

						<PanelContainer>
						<Panel>
						  <PanelHeader className='bg-green' style={{height:'51px'}}>
							<Grid>
							  <Row>
								<Col xs={12} className='fg-white'>
									<Form inline>
										<h4>
											<FormGroup controlId="formInlineName">
											  <ControlLabel>乾</ControlLabel>
											  {' '}
		 										<Label>{`${this.state.maleCheckinCnt}`}</Label>
											</FormGroup>
											{' '}
											<FormGroup controlId="formInlineEmail">
											  <ControlLabel>坤</ControlLabel>
											  {' '}
		 										<Label>{`${this.state.femaleCheckinCnt}`}</Label>
											</FormGroup>

											{'    '}
											<Button bsStyle="primary">
											  更新
											</Button>
										</h4>
								  </Form>
								</Col>
							  </Row>
							</Grid>
						  </PanelHeader>

						  <PanelBody>
							<Grid>
							  <Row>
								<Col xs={12} className="fg-white">
									<Table striped bordered condensed hover style={{color:'black'}}>
										<thead>
											<tr>
												<th>#</th>
												<th>姓名</th>
											</tr>
										</thead>
										<tbody >
											{
												this.state.checkinPeople.map((person)=>{
													return (
														<tr key={person._id}>

															<td style={{textAlign:'center'}}>{person.order}</td>
															<td>{person.person.name}</td>

														</tr>
													);
												})
											}
										</tbody>
									</Table>
								</Col>
							  </Row>
							</Grid>
						  </PanelBody>
						</Panel>
					  </PanelContainer>




	  			</Col>
				</Row>
			</Grid>
		);
  }
}
