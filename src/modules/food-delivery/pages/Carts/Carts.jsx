import { Navbar,Footer } from "../../components";
import { CartsContainer } from '../../containers';

const Carts = () => {
  return (
	<>
		<Navbar/>
		<div className='cart pt-20'>
			<CartsContainer/>
		</div>
		<Footer/>
	</>
  )
}

export default Carts