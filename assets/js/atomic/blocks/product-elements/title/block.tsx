/**
 * External dependencies
 */
import classnames from 'classnames';
import { HTMLAttributes } from 'react';
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@woocommerce/shared-context';
import { isFeaturePluginBuild } from '@woocommerce/block-settings';
import { withProductDataContext } from '@woocommerce/shared-hocs';
import ProductName from '@woocommerce/base-components/product-name';
import { useStoreEvents } from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import './style.scss';
import { Attributes } from './types';
import {
	useSpacingProps,
	useTypographyProps,
	useColorProps,
} from '../../../../hooks/style-attributes';

type Props = Attributes & HTMLAttributes< HTMLDivElement >;

interface TagNameProps extends HTMLAttributes< HTMLOrSVGElement > {
	headingLevel: number;
	elementType?: keyof JSX.IntrinsicElements;
}

const TagName = ( {
	children,
	headingLevel,
	elementType: ElementType = `h${ headingLevel }` as keyof JSX.IntrinsicElements,
	...props
}: TagNameProps ): JSX.Element => {
	return <ElementType { ...props }>{ children }</ElementType>;
};

/**
 * Product Title Block Component.
 *
 * @param {Object}  props                   Incoming props.
 * @param {string}  [props.className]       CSS Class name for the component.
 * @param {number}  [props.headingLevel]    Heading level (h1, h2 etc)
 * @param {boolean} [props.showProductLink] Whether or not to display a link to the product page.
 * @param {string}  [props.align]           Title alignment.
 * will be used if this is not provided.
 * @return {*} The component.
 */
export const Block = ( props: Props ): JSX.Element => {
	const {
		className,
		headingLevel = 2,
		showProductLink = true,
		align,
	} = props;

	const { parentClassName } = useInnerBlockLayoutContext();
	const { product } = useProductDataContext();
	const { dispatchStoreEvent } = useStoreEvents();

	const colorProps = useColorProps( props );
	const spacingProps = useSpacingProps( props );
	const typographyProps = useTypographyProps( props );

	if ( ! product.id ) {
		return (
			<TagName
				headingLevel={ headingLevel }
				className={ classnames(
					className,
					colorProps.className,
					'wc-block-components-product-title',
					{
						[ `${ parentClassName }__product-title` ]: parentClassName,
						[ `wc-block-components-product-title--align-${ align }` ]:
							align && isFeaturePluginBuild(),
					}
				) }
				style={
					isFeaturePluginBuild()
						? {
								...spacingProps.style,
								...typographyProps.style,
								...colorProps.style,
						  }
						: {}
				}
			/>
		);
	}

	return (
		<TagName
			headingLevel={ headingLevel }
			className={ classnames(
				className,
				colorProps.className,
				'wc-block-components-product-title',
				{
					[ `${ parentClassName }__product-title` ]: parentClassName,
					[ `wc-block-components-product-title--align-${ align }` ]:
						align && isFeaturePluginBuild(),
				}
			) }
			style={
				isFeaturePluginBuild()
					? {
							...spacingProps.style,
							...typographyProps.style,
							...colorProps.style,
					  }
					: {}
			}
		>
			<ProductName
				disabled={ ! showProductLink }
				name={ product.name }
				permalink={ product.permalink }
				rel={ showProductLink ? 'nofollow' : '' }
				onClick={ () => {
					dispatchStoreEvent( 'product-view-link', {
						product,
					} );
				} }
			/>
		</TagName>
	);
};

export default withProductDataContext( Block );
