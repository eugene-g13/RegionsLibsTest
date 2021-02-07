import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LibraryData from "./LibraryData";
import Libraries from "./Libraries";
import { Layout } from "antd";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./App.css";

const { Header, Footer, Content } = Layout;

function App() {
  const [libs, setLibs] = useState<any[]>();

  useEffect(() => {
    fetch("data-20161110T1744.json")
      .then(res => {
        res.json().then(data => {
          setLibs(data);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Layout>
          <Header>Libraries</Header>
          <Content>
            <div className="layout-content">
              <Switch>
                <Route exact path="/">
                  <Libraries data={libs} />
                </Route>
                <Route path="/order/:id">
                  <LibraryData data={libs} />
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Samolet © 2020</Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
