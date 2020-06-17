import React, {Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import '../style/Header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return(
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="/images/logo.png" height="30" width="41" alt="Logo" />                        
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" exact to="/">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                {/* <NavItem>
                                    <NavLink className="nav-link" to="/players/list">
                                        <span className="fa fa-info fa-lg"></span> Players
                                    </NavLink>
                                </NavItem> */}
                                <NavItem>
                                    <NavLink className="nav-link" to="/players/create">
                                        <span className="fa fa-list fa-lg"></span> Create Player
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/players/updateList">
                                        <span className="fa fa-list fa-lg"></span> Update Player
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>CricPlay</h1>
                                <p>Create, Update and Manage players of a cricket team and play matches against team Hampshire in an all dynamic environment.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </>
        );
    }
}

export default Header;