import * as React from 'react';
import {Container, Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import ClassName from 'classnames';

import Register from './Register';
import {Popover} from '../reusable/index';
import {CONTRACT_URL} from "../config/config";

const Style = require('./Header.scss');

const logo = require ('assets/images/logoTop.svg');


class RegisterNavItem extends React.Component<{register(s: string): void}, {showRegister: boolean}> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showRegister: false
        }
    }

    toggleRegister = () => {
        this.setState({
            showRegister: !this.state.showRegister
        });
    };

    render() {
        const {showRegister} = this.state;
        const {register} = this.props;
        return(
            <div>
                <NavLink id="register" href="#" onClick={this.toggleRegister}>
                    Register
                </NavLink>
                <Popover isOpen={showRegister} toggle={this.toggleRegister} target="register">
                    <Register onRegister={register}/>
                </Popover>
            </div>
        )
    }
}


type Props = {
    authenticated: boolean,
    showChat: boolean,
    toggleChat(show: boolean): void,
    authenticate(): void,
    register(username: string): void
}

type State = {
    isOpen: boolean,
    showRegister: boolean
}

class Header extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            isOpen: false,
            showRegister: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    onToggleChat = () => {
        const {showChat, toggleChat} = this.props;
        toggleChat(!showChat);
    };

    render () {
        const {authenticated, register, showChat} = this.props;
        const {isOpen} = this.state;

        const className = ClassName({
            'container-chat-open': showChat
        });

        // Hack to allow to prop!
        const NavbarBrandX: React.StatelessComponent<any> = NavbarBrand;
        const NavLinkX: React.StatelessComponent<any> = NavLink;

        return (
                <Navbar id="header" expand="md" dark color="dark">
                    <Container className={className}>
                        <NavbarBrandX tag={RRNavLink} to="/">
                                <img className={Style.brandImage} src={logo}/>
                        </NavbarBrandX>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={isOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLinkX to="/faq" tag={RRNavLink}>FAQ</NavLinkX>
                                </NavItem>
                                <NavItem>
                                    <NavLinkX to="/hallOfFame" tag={RRNavLink}>Hall of fame</NavLinkX>
                                </NavItem>
                                <NavItem>
                                    <NavLink target="_blank" href={CONTRACT_URL}>Contract</NavLink>
                                </NavItem>
                                <NavItem className="d-md-none">
                                    <NavLink href="#" onClick={this.onToggleChat}>Chat</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                {authenticated ? [
                                    <NavItem key="1">
                                        <NavLinkX tag={RRNavLink} to="/account">Account</NavLinkX>
                                    </NavItem>,
                                    <NavItem key="2">
                                        <NavLinkX tag={RRNavLink} to="/logout">Logout</NavLinkX>
                                    </NavItem>
                                ] : [
                                    <NavItem key="1">
                                        <RegisterNavItem register={register}/>
                                    </NavItem>,
                                    <NavItem key="2">
                                        <NavLink href="#" onClick={this.props.authenticate}>Login</NavLink>
                                    </NavItem>
                                ]}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
        );
    }
}

export default Header;
