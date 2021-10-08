import React from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import {Menu, Icon} from 'antd';
import {connect} from 'react-redux'


function Nav(props) {

  var addWishlistToUser = () => {
    
  }

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="mail">
          <Link to="/screensource">
            <Icon type="home" />
            Sources
          </Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Link to="/screenmyarticles">
            <Icon type="read" />
            My Articles
          </Link>
        </Menu.Item>

        <Menu.Item key="app">
          <Link to="/" onClick={() => addWishlistToUser()}>
            <Icon type="logout" />
            Logout
          </Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
}

function mapStateToProps(state){
  return {myArticles: state.wishList}
}

export default connect(
  mapStateToProps,
  null
)(Nav);
