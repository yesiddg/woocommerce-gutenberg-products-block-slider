/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { useContainerWidthContext } from '@woocommerce/base-context';
import Panel from '@woocommerce/base-components/panel';

/**
 * Internal dependencies
 */
import OrderSummaryItem from './order-summary-item.js';

const OrderSummary = ( { cartItems = [] } ) => {
	const { isLarge, hasContainerWidth } = useContainerWidthContext();

	if ( ! hasContainerWidth ) {
		return null;
	}

	return (
		<Panel
			className="wc-block-components-order-summary"
			initialOpen={ isLarge }
			title={
				<span className="wc-block-components-order-summary__button-text">
					{ __( 'Order summary', 'woo-gutenberg-products-block' ) }
				</span>
			}
			titleTag="h2"
		>
			<div className="wc-block-order-components-summary__content">
				{ cartItems.map( ( cartItem ) => {
					return (
						<OrderSummaryItem
							key={ cartItem.key }
							cartItem={ cartItem }
						/>
					);
				} ) }
			</div>
		</Panel>
	);
};

OrderSummary.propTypes = {
	cartItems: PropTypes.arrayOf(
		PropTypes.shape( { key: PropTypes.string.isRequired } )
	),
};

export default OrderSummary;