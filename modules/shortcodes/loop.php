<?php
/**
 * Wizhi Shortcode
 * Wizhi CMS 插件使用的简码
 */

/* 根据自定义分类显示文章
 * 输出标题文章列表时实现，默认带标题
 * 使用方法：[page_cont id="1" count="200" thumbs="thumbnail" more="true"]
 * todo：可以实现更多的参数控制
*/

if ( ! function_exists( 'wizhi_shortcode_page_cont' ) ) {
	function wizhi_shortcode_page_cont( $atts ) {
		$default = [
			'id'     => 1,
			'cont'   => 200,
			'thumbs' => 'thumbnail',
			'more'   => false,
		];
		extract( shortcode_atts( $default, $atts ) );

		$page = get_post( $id );

		// 输出
		$retour = '';

		$retour .= '<a target="_blank" href="' . get_page_link( $id ) . '">';
		$retour .= get_the_post_thumbnail( $id, $thumbs );
		$retour .= '</a>';

		if ( $cont == 0 ) {
			$retour .= $page->post_content;
		} else {
			$retour .= wp_trim_words( $page->post_content, $cont, "..." );
		}

		if ( $more == true ) {
			$retour .= '<a target="_blank" href="' . get_page_link( $id ) . '">更多>></a>';
		} else {
			$retour .= '';
		}

		wp_reset_postdata();
		wp_reset_query();

		return $retour;

	}
}
add_shortcode( 'page_cont', 'wizhi_shortcode_page_cont' );


/* 根据自定义分类显示文章
 * 输出标题文章列表时实现，默认带标题
 * 使用方法：[wizhi_loop type="home" tax="home_tag" tag="yxdt" num="6" tp="content" offset="0"]
 * todo：可以实现更多的参数控制
*/
if ( ! function_exists( 'wizhi_shortcode_loop' ) ) {

	function wizhi_shortcode_loop( $atts ) {

		$default = [
			'type'   => 'post',
			'tax'    => 'category',
			'tag'    => 'default',
			'tp'     => 'lists',
			'offset' => 0,
			'num'    => 8, // 数量: 显示文章数量，-1为全部显示
		];

		extract( shortcode_atts( $default, $atts ) );

		// 判断是否查询分类
		if ( empty( $tax ) ) {
			$tax_query = '';
		} else {
			$tax_query = [
				[
					'taxonomy' => $tax,
					'field'    => 'slug',
					'terms'    => $tag,
				],
			];
		}

		// 构建文章查询数组
		$args = [
			'post_type'      => $type,
			'orderby'        => 'post_date',
			'order'          => 'DESC',
			'posts_per_page' => $num,
			'offset'         => $offset,
			'tax_query'      => $tax_query,
		];

		// 输出
		$the_query = new WP_Query( $args );

		while ( $the_query->have_posts() ) : $the_query->the_post();
			wz_get_template_part( 'content', $tp );
		endwhile;

		wp_reset_postdata();
		wp_reset_query();

	}
}

add_shortcode( 'wizhi_loop', 'wizhi_shortcode_loop' );


/* 根据自定义分类显示文章
 * 输出标题文章列表时实现，默认带标题
 * 使用方法：[title_list type="home" tax="home_tag" tag="yxdt" num="6" cut="26" heading="false" time="true" sticky="true"]
 * todo：可以实现更多的参数控制
*/
if ( ! function_exists( 'wizhi_shortcode_title_list' ) ) {

	function wizhi_shortcode_title_list( $atts ) {

		$default = [
			'type'    => 'post',
			'tax'     => 'category',
			'tag'     => 'default',
			'offset'  => 0,
			'num'     => 8, // 数量: 显示文章数量，-1为全部显示
			'heading' => true,
		];

		extract( shortcode_atts( $default, $atts ) );

		// 判断是否查询分类
		if ( empty( $tax ) ) {
			$tax_query = '';
		} else {
			$tax_query = [
				[
					'taxonomy' => $tax,
					'field'    => 'slug',
					'terms'    => $tag,
				],
			];
		}

		// 构建文章查询数组
		$args = [
			'post_type'      => $type,
			'orderby'        => 'post_date',
			'order'          => 'DESC',
			'posts_per_page' => $num,
			'offset'         => $offset,
			'tax_query'      => $tax_query,
		];

		// get term archive name and link
		$cat = get_term_by( 'slug', $tag, $tax );

		if ( $cat ) {
			$cat_name = $cat->name;
			$cat_link = get_term_link( $tag, $tax );
		}

		// 输出
		global $post;
		$the_query = new WP_Query( $args );

		$retour = '';
		if ( $heading == false || empty( $tax ) ) {
			$retour .= '<div class="ui-list-' . $type . $tag . '">';
			$retour .= '<ul class="ui-list">';

			while ( $the_query->have_posts() ) : $the_query->the_post();
				wz_get_template_part( 'content', 'title_list' );
			endwhile;

			$retour .= '</ul>';
			$retour .= '</div>';
		} else {
			$retour .= '<div class="ui-box ' . $type . $tag . '">';
			$retour .= '<div class="ui-box-head">';
			$retour .= '<h3 class="ui-box-head-title"><a href="' . $cat_link . '">' . $cat_name . '</a></h3>';
			$retour .= '<a class="ui-box-head-more" href="' . $cat_link . '" target="_blank">更多></a>';
			$retour .= '</div>';
			$retour .= '<div class="ui-box-container"><ul class="ui-list ui-list-' . $tag . '">';

			while ( $the_query->have_posts() ) : $the_query->the_post();
				wz_get_template_part( 'content', 'title_list' );
			endwhile;

			$retour .= '</ul></div></div>';
		}

		wp_reset_postdata();
		wp_reset_query();

		return $retour;

	}
}
add_shortcode( 'title_list', 'wizhi_shortcode_title_list' );


/* 图文混排样式简码
 * 需要的参数：文章类型，分类法，分类，缩略图别名，标题字数，是否显示时间，内容字数
 * 使用方法：<?php echo do_shortcode('[photo_list type="home" tax="home_tag" tag="yxdt" num="6" cut="26" heading="false" time="true" thumbs="maintain" cut="6" sticky="true" class="pure-u-1-5"]'); ?>
 */
if ( ! function_exists( 'wizhi_shortcode_photo_list' ) ) {

	function wizhi_shortcode_photo_list( $atts ) {
		$default = [
			'type'    => 'post',
			'tax'     => 'category',
			'tag'     => 'default',
			'num'     => '4',
			'paged'   => '1',
			'heading' => true,
		];

		extract( shortcode_atts( $default, $atts ) );

		// 判断是否查询分类
		if ( empty( $tax ) ) {
			$tax_query = '';
		} else {
			$tax_query = [
				[
					'taxonomy' => $tax,
					'field'    => 'slug',
					'terms'    => $tag,
				],
			];
		}

		$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;

		// 根据分类别名获取分类ID
		$args = [
			'post_type'      => $type,
			'orderby'        => 'post_date',
			'order'          => 'DESC',
			'posts_per_page' => $num,
			'paged'          => $paged,
			'tax_query'      => $tax_query,
		];

		$cat = get_term_by( 'slug', $tag, $tax );

		if ( $cat ) {
			$cat_name = $cat->name;
			$cat_link = get_term_link( $tag, $tax );
		}

		// 输出
		global $post;
		$wp_query = new WP_Query( $args );
		$retour   = '';

		if ( $heading == false || empty( $tax ) ) {
			$retour .= '<div class="medias media-' . $type . $tag . '">';
			while ( $wp_query->have_posts() ) : $wp_query->the_post();

				wz_get_template_part( 'content', 'title_list' );

			endwhile;
			$retour .= '</div>';

		} else {
			$retour .= '<div class="ui-box ' . $type . $tag . '">';
			$retour .= '<div class="ui-box-head">';
			$retour .= '<h3 class="ui-box-head-title"><a href="' . $cat_link . '">' . $cat_name . '</a></h3>';
			$retour .= '<a class="ui-box-head-more" href="' . $cat_link . '" target="_blank">更多></a>';
			$retour .= '</div>';
			$retour .= '<div class="ui-box-container">';
			$retour .= '<div class="ui-box-content">';

			$retour .= '<div class="medias media-' . $tag . '">';

			while ( $wp_query->have_posts() ) : $wp_query->the_post();
				wz_get_template_part( 'content', 'title_list' );
			endwhile;

			$retour .= '</div>';

			$retour .= '</div>';
			$retour .= '</div>';
			$retour .= '</div>';

		}

		wp_reset_postdata();
		wp_reset_query();

		return $retour;

	}
}
add_shortcode( 'photo_list', 'wizhi_shortcode_photo_list' );


/* 分类自适应幻灯
 * 替代方案为上面的slider幻灯，在性能上比较好
 * 存在显示上的一些问题
 * 使用方法：<?php echo do_shortcode('[slider type="post" tax="category" tag="jingcai" speed="1000" num="4" thumbs="full" cut="46"]'); ?>
 */

if ( ! function_exists( 'wizhi_shortcode_slider' ) ) {

	function wizhi_shortcode_slider( $atts ) {
		$default = [
			'type'        => 'post',
			'tax'         => 'category',
			'tag'         => 'default',
			'num'         => 8,
			'mode'        => 'horizontal',
			'speed'       => 500,
			'auto'        => true,
			'autohover'   => true,
			'minslides'   => 1,
			'maxslides'   => 1,
			'slidewidth'  => 360,
			'slidewargin' => 10,
			'easing'      => 'swing',
		];

		extract( shortcode_atts( $default, $atts ) );

		// 生成 $options 数组
		$id = $tax . '-' . $tag;

		$options = [
			'tax'         => $tax,
			'mode'        => $mode,
			'speed'       => $speed,
			'auto'        => $auto,
			'autohover'   => $autohover,
			'minslides'   => $minslides,
			'maxslides'   => $maxslides,
			'slidewidth'  => $slidewidth,
			'slidemargin' => $slidewargin,
			'easing'      => $easing,
		];

		// 判断是否查询分类
		if ( empty( $tax ) ) {
			$tax_query = '';
		} else {
			$tax_query = [
				[
					'taxonomy' => $tax,
					'field'    => 'slug',
					'terms'    => $tag,
				],
			];
		}

		// 生成文章查询参数
		$args = [
			'post_type'      => $type,
			'posts_per_page' => $num,
			'orderby'        => 'post_date',
			'order'          => 'DESC',
			'no_found_rows'  => true,
			'tax_query'      => $tax_query,
		];

		// 输出
		global $post;
		$wp_query = new WP_Query( $args );

		$retour = '<div class="bx-box">';
		$retour .= '<ul class="bxslider" id="bxslider-' . $id . '">';

		while ( $wp_query->have_posts() ) : $wp_query->the_post();
			wz_get_template_part( 'content', 'slider' );
		endwhile;

		$retour .= '</ul></div>';

		wizhi_slider_js( $id, $options );

		wp_reset_postdata();
		wp_reset_query();

		return $retour;

	}
}
add_shortcode( 'slider', 'wizhi_shortcode_slider' );


/**-----------------------------------------------------------------------------------*/
/* Slider Javascript
/* Jquery Cycle 幻灯所需的JS
/* -----------------------------------------------------------------------------------
*/

if ( ! function_exists( 'wizhi_slider_js' ) ) {
	function wizhi_slider_js( $id, $options ) {

		if ( $options[ "maxslides" ] == 1 ) : ?>

			<script>
				jQuery(document).ready(function ($) {
					$('#bxslider-<?php echo $id ?>').bxSlider({
						mode: 'fade',
						captions: true,
						auto: <?php echo $options[ "auto" ] ?>
					});
				});
			</script>

		<?php else : ?>

			<script>
				jQuery(document).ready(function ($) {
					$('#bxslider-<?php echo $id ?>').bxSlider({
						minSlides: <?php echo $options[ "minslides" ] ?>,
						maxSlides: <?php echo $options[ "maxslides" ] ?>,
						slideWidth: <?php echo $options[ "slidewidth" ] ?>,
						slideMargin: <?php echo $options[ "slidemargin" ] ?>,
						infiniteLoop: true,
						hideControlOnEnd: true,
						auto: <?php echo $options[ "auto" ] ?>
					});
				});
			</script>

		<?php endif;

	}
}