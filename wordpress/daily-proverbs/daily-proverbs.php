<?php
/**
 * Plugin Name: Daily Proverbs
 */

add_action( 'init', 'daily_proverbs_post_type' );
function daily_proverbs_post_type() {
	$labels = array(
		'name'               => _x( 'Daily Proverbs', 'post type general name', 'daily-proverbs' ),
		'singular_name'      => _x( 'Daily Proverb', 'post type singular name', 'daily-proverbs' ),
		'menu_name'          => _x( 'Daily Proverbs', 'admin menu', 'daily-proverbs' ),
		'name_admin_bar'     => _x( 'Daily Proverb', 'add new on admin bar', 'daily-proverbs' ),
		'add_new'            => __( 'Add New', 'daily-proverbs' ),
		'add_new_item'       => __( 'Add New Daily Proverb', 'daily-proverbs' ),
		'new_item'           => __( 'New Daily Proverb', 'daily-proverbs' ),
		'edit_item'          => __( 'Edit Daily Proverb', 'daily-proverbs' ),
		'view_item'          => __( 'View Daily Proverb', 'daily-proverbs' ),
		'all_items'          => __( 'All Daily Proverbs', 'daily-proverbs' ),
		'search_items'       => __( 'Search Daily Proverbs', 'daily-proverbs' ),
		'parent_item_colon'  => __( 'Parent Daily Proverbs:', 'daily-proverbs' ),
		'not_found'          => __( 'No Daily Proverbs found.', 'daily-proverbs' ),
		'not_found_in_trash' => __( 'No Daily Proverbs found in Trash.', 'daily-proverbs' )
	);

	$args = array(
		'labels'             => $labels,
		'description'        => __( 'Description.', 'daily-proverbs' ),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'daily-proverbs' ),
		'show_in_rest'       => true,
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' )
	);

	register_post_type( 'daily-proverbs', $args );

	$labels = array(
		'name'               => _x( 'Prayer Requests', 'post type general name', 'daily-proverbs' ),
		'singular_name'      => _x( 'Prayer Request', 'post type singular name', 'daily-proverbs' ),
		'menu_name'          => _x( 'Prayer Requests', 'admin menu', 'daily-proverbs' ),
		'name_admin_bar'     => _x( 'Prayer Request', 'add new on admin bar', 'daily-proverbs' ),
		'add_new'            => __( 'Add New', 'daily-proverbs' ),
		'add_new_item'       => __( 'Add New Prayer Request', 'daily-proverbs' ),
		'new_item'           => __( 'New Prayer Request', 'daily-proverbs' ),
		'edit_item'          => __( 'Edit Prayer Request', 'daily-proverbs' ),
		'view_item'          => __( 'View Prayer Request', 'daily-proverbs' ),
		'all_items'          => __( 'All Prayer Requests', 'daily-proverbs' ),
		'search_items'       => __( 'Search Prayer Requests', 'daily-proverbs' ),
		'parent_item_colon'  => __( 'Parent Prayer Requests:', 'daily-proverbs' ),
		'not_found'          => __( 'No Prayer Requests found.', 'daily-proverbs' ),
		'not_found_in_trash' => __( 'No Prayer Requests found in Trash.', 'daily-proverbs' )
	);

	$args = array(
		'labels'             => $labels,
		'description'        => __( 'Description.', 'daily-proverbs' ),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'prayer-reqs' ),
		'show_in_rest'       => true,
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'supports'           => array( 'title' )
	);

	register_post_type( 'prayer-reqs', $args );
}

add_action( 'wp_ajax_nopriv_add_prayer_request', function() {
	if ( ! isset( $_REQUEST['prayer'], $_REQUEST['device_id'] ) ) {
		return;
	}

	$post_id = wp_insert_post( [
		'post_title' => esc_html( esc_attr( $_REQUEST['prayer'] ) ),
		'post_type' => 'prayer-reqs',
		'post_status' => 'draft',
	] );

	update_post_meta( $post_id, 'from_device_id', esc_attr( esc_html( $_REQUEST['device_id'] ) ) );

	wp_send_json_success();
} );

