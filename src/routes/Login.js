import React from 'react';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router';
import UserService from '../services/userService';
import {
  Row,
  Col,
  Icon,
  Grid,
  Form,
  Badge,
  Panel,
  Button,
  PanelBody,
  FormGroup,
  LoremIpsum,
  InputGroup,
  FormControl,
  ButtonGroup,
  ButtonToolbar,
  PanelContainer,
} from '@sketchpixy/rubix';

@withRouter
export default class Login extends React.Component {
  constructor(){
    super();
    this.back = this.back.bind(this);
    this.handleAccountChange = this.handleAccountChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      account:'',
      password:'',
      isLogin:false
    }

  }

  componentDidMount() {

		// this.setState({baseUrl:window.location.origin});
		UserService.getBaseUrl(window.location.origin);

  }


  back(e) {
    e.preventDefault();
    e.stopPropagation();
    // this.props.router.goBack();
    //go check account and password
    const post = {};
    post.account = this.state.account;
    post.password = this.state.password;    
    UserService.checkUsers(post).then((users)=>{
      // console.log(users);
      if(users.length > 0){
        console.log('login success');
        this.setState({
          isLogin:true
        })
      }else{
        alert('帳號或密碼有錯！');
        this.setState({
          isLogin:false
        })
      }
    });
  }
  handleAccountChange(e){
    
    this.setState({
      account:e.target.value
    });
  }

  handlePasswordChange(e){
    this.setState({
      password:e.target.value
    });
  }

  componentDidMount() {
    $('html').addClass('authentication');
  }

  componentWillUnmount() {
    $('html').removeClass('authentication');
  }

  getPath(path) {
    var dir = this.props.location.pathname.search('rtl') !== -1 ? 'rtl' : 'ltr';
    path = `/${dir}/${path}`;
    return path;
  }


  showLogin(){
    if(!this.state.isLogin){
      return (
        <Grid>
              <Row>
                <Col sm={4} smOffset={4} xs={10} xsOffset={1} collapseLeft collapseRight>
                  <PanelContainer controls={false}>
                    <Panel>
                      <PanelBody style={{padding: 0}}>
                        <div className='text-center bg-darkblue fg-white'>
                          <h3 style={{margin: 0, padding: 25}}>登入台南大學教師甄系統</h3>
                        </div>
                        
                        <div>
                          
                          <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                            <Form onSubmit={::this.back}>
                              <FormGroup controlId='emailaddress'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-mail' />
                                  </InputGroup.Addon>
                                  <FormControl autoFocus type='text' className='border-focus-blue' placeholder='account' value={this.state.account} onChange={this.handleAccountChange}/>
                                </InputGroup>
                              </FormGroup>
                              <FormGroup controlId='password'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-key' />
                                  </InputGroup.Addon>
                                  <FormControl type='password' className='border-focus-blue' placeholder='password' value={this.state.password} onChange={this.handlePasswordChange}/>
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <Grid>
                                  <Row>
                                    <Col xs={6} collapseLeft collapseRight style={{paddingTop: 10}}>
                                      
                                    </Col>
                                    <Col xs={6} collapseLeft collapseRight className='text-right'>
                                      <Button outlined lg type='submit' bsStyle='blue' onClick={::this.back}>登入</Button>
                                    </Col>
                                  </Row>
                                </Grid>
                              </FormGroup>
                              
                            </Form>
                          </div>
                        </div>
                      </PanelBody>
                    </Panel>
                  </PanelContainer>
                </Col>
              </Row>
            </Grid>
      )
    }
  }

  showVideo(){
    if(this.state.isLogin){
      return (
          <div>
              <iframe src="https://drive.google.com/file/d/0B9iJ0-m_E_GPdllSU1hSMW1EMFE/preview" width="640" height="480"></iframe>
          </div>
        )
    }else{
      return (
        <div>
          請登入！
        </div>
      )
    }
    
  }

  render() {
    return (
      <div id='auth-container' className='login'>
        <div id='auth-row'>
          <div id='auth-cell'>
            {this.showLogin()}
            
          </div>
        </div>
              <Row>
                <Col sm={12} xs={12}>
                  {this.showVideo()}
                </Col>  
              </Row>
      </div>
    );
  }
}
