import React from 'react';
import PersonService from '../services/personService';
var $ = require("jquery");
var promise = require("es6-promise");
var baseUrl = '';
var resourceUrl = baseUrl + "/api/csv2json";
import {
  Row,
  Col,
  Nav,
  Tab,
  Icon,
  Grid,
  Panel,
  NavItem,
  MenuItem,
  PanelLeft,
  PanelBody,
  LoremIpsum,
  PanelRight,
  PanelHeader,
  PanelFooter,
  NavDropdown,
  PanelContainer,
  PanelTabContainer,
  Button
} from '@sketchpixy/rubix';

//匯入匯出
class ImportCSV extends React.Component {
  constructor(){
    super();
    this.importCSV = this.importCSV.bind(this);
  }
  componentDidMount() {
    baseUrl = window.location.origin;
  }

  importCSV(){
    var Promise = promise.Promise;
    var app = {
      getJson: function(){
        return new Promise(function (resolve, reject) {
            $.ajax({
                crossOrigin: true,
                url: resourceUrl,
                method: "GET",
                dataType: "json",
                success: resolve,
                error: reject
            });
        });
      }
    };
    app.getJson().then((res)=>{
      //get json
      console.log('getJson:',res);
      //write into database
      let _res = res;
      const length = _res.length;
      let results = [];

      const saveAll = function(){
        let doc = _res.pop();

        if(doc){
          PersonService.addPerson(doc).then((output)=>{
            // console.log('success import each');
            results.push(output);
            if(results.length <= length){
              saveAll();
            }
          });
        }else{
          console.log('success import all');
          alert('匯入完畢');
        }
      }
      saveAll();

      // res.map((person)=>{
      //   PersonService.addPerson(person).then((output)=>{
      //     console.log('success import');
      //   });
      // });

    });
  }
  render(){
    return (
      <div>
        <Row>
          <Col xs={2}>
            <h3>
            匯入CSV
            </h3>
          </Col>
          <Col xs={2}>
            <h3>
            <Button bsStyle="primary" onClick={this.importCSV}>匯入</Button>
            </h3>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
          etes
          </Col>
        </Row>




      </div>
    );
  }
}


class PanelBodyHeaderFooterNormalTabs extends React.Component {
  render() {
    return (
      <PanelTabContainer id='panel-body-header-footer-normal-tab' defaultActiveKey="home">
        <Panel>
          <PanelHeader className='bg-grayishcyan fg-white'>
            <Nav bsStyle="tabs">
              <NavItem eventKey="home">
                <Icon bundle='fontello' glyph='home'/>
              </NavItem>
              <NavItem eventKey="user">
                <Icon bundle='fontello' glyph='user'/>
              </NavItem>
              <NavItem eventKey="cog">
                <Icon bundle='fontello' glyph='cog'/>
              </NavItem>
            </Nav>
          </PanelHeader>
          <PanelBody>
            <Grid>
              <Row>
                <Col xs={12}>
                  <Tab.Content animation={false}>
                    <Tab.Pane eventKey="home">

                      <ImportCSV />
                    </Tab.Pane>
                    <Tab.Pane eventKey="user">
                      <h3>User (header)</h3>
                      <p><LoremIpsum query='4s'/></p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="cog">
                      <h3>Cog (header)</h3>
                      <p><LoremIpsum query='4s'/></p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="home-1">
                      <h3>Home (footer)</h3>
                      <p><LoremIpsum query='4s'/></p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="user-1">
                      <h3>User (footer)</h3>
                      <p><LoremIpsum query='4s'/></p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="cog-1">
                      <h3>Cog (footer)</h3>
                      <p><LoremIpsum query='4s'/></p>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Grid>
          </PanelBody>
          <PanelFooter className='bg-darkcyan fg-white'>
            <Nav bsStyle="tabs">
              <NavItem eventKey="home-1">
                <Icon bundle='fontello' glyph='th'/>
              </NavItem>
              <NavItem eventKey="user-1">
                <Icon bundle='fontello' glyph='archive'/>
              </NavItem>
              <NavItem eventKey="cog-1">
                <Icon bundle='fontello' glyph='docs-landscape'/>
              </NavItem>
            </Nav>
          </PanelFooter>
        </Panel>
      </PanelTabContainer>
    );
  }
}


export default class Manage extends React.Component {
  render() {
    return (
      <div>

        <Row>
          <Col sm={12}>
            <PanelBodyHeaderFooterNormalTabs />
          </Col>
        </Row>

      </div>
    );
  }
}
