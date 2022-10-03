import { Link } from "react-router-dom"


function Nav() {

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        <Link to="/shop">Products</Link>
      </div>
    </nav>
  )
}

export default Nav