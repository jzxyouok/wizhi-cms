<?php
	/**
	 * 导航菜单适配 pure 的菜单
	 */


	// 添加 'styleselect' 菜单到 $buttons 数组
	function wizhi_mce_buttons_2( $buttons ) {
		array_unshift( $buttons, 'styleselect' );

		return $buttons;
	}

	add_filter( 'mce_buttons_2', 'wizhi_mce_buttons_2' );

	// 添加下拉菜单
	function wizhi_mce_before_init_insert_list_formats( $init_array ) {
		$style_formats               = array(
			array(
				'title'    => '正确列表',
				'selector' => 'ul',
				'classes'  => 'el-list el-list-success',
			),
			array(
				'title'    => '信息列表',
				'selector' => 'ul',
				'classes'  => 'el-list el-list-warning',
			),
			array(
				'title'    => '错误列表',
				'selector' => 'ul',
				'classes'  => 'el-list el-list-error',
			),
		);
		$init_array['style_formats'] = json_encode( $style_formats );

		return $init_array;
	}

	add_filter( 'tiny_mce_before_init', 'wizhi_mce_before_init_insert_list_formats' );