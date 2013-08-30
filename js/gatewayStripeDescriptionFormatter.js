function gatewayStripeDescriptionFormatter($order_id) {
	global $woocommerce;
	$order_id = str_replace("#", "", $order_id);
	$order = new WC_Order( $order_id );
	$formattedDescription = '';
	$bShowTotal = false;

	if (sizeof($order->get_items())>0) {
			foreach($order->get_items() as $item) {
				$_product = get_product( $item['variation_id'] ? $item['variation_id'] : $item['product_id'] );
				$formattedDescription = $item['name'] . ' (Order ' . $order->get_order_number() . ')';

				$item_meta = new WC_Order_Item_Meta( $item['item_meta'] );
				$LBFProducts = array('Daily Contribution', 'Daily Donation to LBF Operating Costs', 'Donation', 'Donation to LBF Operating Costs', 'Monthly Contribution');

				foreach ( $item_meta->meta as $meta_key => $meta_values ) {
					if (in_array($meta_key, $LBFProducts)) {
						//echo '<br />key: ' . $meta_key . ' and its val: ' . $meta_values[0];
						 $formattedDescription = $formattedDescription . ' - ' . $meta_key . ':' . $meta_values[0];
					}
				}
				if ($bShowTotal)
					$formattedDescription = $formattedDescription . ' - Total:' . $order->get_formatted_line_subtotal( $item );
			}
		}
	return $formattedDescription;
}