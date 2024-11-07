import { useNavigate } from 'react-router-dom';
import {Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import { resetCart } from '../slices/cartSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart)
  const {userInfo} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
     try{
        await logoutApiCall().unwrap();
        dispatch(logout());
        dispatch(resetCart())
        navigate('/login');
     }catch(err){
        console.log(err);
     }
  }

  return (
   <header>
     <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="ProGadget" />
            ProGadget
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
             <Nav className='ms-auto'>
              <SearchBox />
             <LinkContainer as={Link} to="cart">
                <Nav.Link as={Link} to="/cart">
                  <FaShoppingCart />Cart
                  {
                    cartItems.length > 0 && (
                      <Badge pill bg="success" style={{ marginLeft:'5px'}}>
                        { cartItems.reduce((a, c) => a + c.qty, 0) }
                      </Badge>
                    )
                  }
                </Nav.Link>
                </LinkContainer>
                { userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                     <LinkContainer as={Link} to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                     </LinkContainer>
                     <NavDropdown.Item onClick={logoutHandler}>
                       Logout
                     </NavDropdown.Item>
                  </NavDropdown>
                ):(<LinkContainer as={Link} to="/login">
                   <Nav.Link as={Link} to="/login"><FaUser />Sign In</Nav.Link>
                </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id='adminmenu'>
                     <LinkContainer to="/admin/productlist">
                         <NavDropdown.Item>Products</NavDropdown.Item>
                     </LinkContainer>
                     <LinkContainer to="/admin/userlsist">
                         <NavDropdown.Item>Users</NavDropdown.Item>
                     </LinkContainer>
                     <LinkContainer to="/admin/orderlist">
                         <NavDropdown.Item>Orders</NavDropdown.Item>
                     </LinkContainer>
                  </NavDropdown>
                )}
             </Nav>
          </Navbar.Collapse>
        </Container>
     </Navbar>
   </header>
  )
}

export default Header