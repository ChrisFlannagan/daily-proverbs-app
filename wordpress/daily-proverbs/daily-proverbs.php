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
}

