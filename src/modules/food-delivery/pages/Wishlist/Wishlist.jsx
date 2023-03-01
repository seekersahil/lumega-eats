import { Navbar,Footer } from "../../components";
import { WishlistContainer } from '../../containers';

const Wishlist = () => {
  return (
	<>
		<Navbar/>
		<div className='cart pt-20'>
			<WishlistContainer/>
		</div>
		<Footer/>
	</>
  )
}

export default Wishlist