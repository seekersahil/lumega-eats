import { Navbar,Footer } from "../../components";
import { CartContainer } from '../../containers';

const Cart = () => {
  return (
	<>
		<Navbar/>
		<div className='cart pt-20'>
			<CartContainer/>
		</div>
		<Footer/>
	</>
  )
}

export default Cart