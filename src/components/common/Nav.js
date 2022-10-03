import { Link } from "react-router-dom"


const Nav = () => {

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </div>
    </nav>
  )
}

export default Nav