/**
 * Internal dependencies
 */
import { shopper } from '../../../utils';
import { SIMPLE_PRODUCT_NAME } from '../../../utils/constants';

const block = {
	name: 'Cart',
};

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );

describe( 'Shopper → Cart → Can proceed to checkout', () => {
	beforeEach( async () => {
		await shopper.block.emptyCart();
	} );

	afterAll( async () => {
		await shopper.block.emptyCart();
	} );

	it( 'allows customer to proceed to checkout', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_PRODUCT_NAME );
		await shopper.block.goToCart();

		// Click on "Proceed to Checkout" button
		await shopper.block.proceedToCheckout();

		// Verify that you see the Checkout Block page
		await expect( page ).toMatchElement( 'h1', { text: 'Checkout' } );
	} );
} );
