<?php
/**
 * Wizhi Shortcode UI by shortcacke
 *
 */


// 显示页面内容
add_action( 'init', 'wizhi_shortcode_page_cont_ui' );

function wizhi_shortcode_page_cont_ui() {

    // 检测 Shortcake 插件功能是否存在
    if ( ! function_exists( 'shortcode_ui_register_for_shortcode' ) ) {
        return;
    }

    // 只有管理员可以使用
    if ( ! is_admin() ) {
        return;
    }


    // 显示按钮
    shortcode_ui_register_for_shortcode(
        'button',
        array(
            'label' => '按钮',
            'listItemImage' => 'dashicons-external',
            'attrs' => array(
                array(
                    'label' => __( '按钮颜色' ),
                    'attr'  => 'type',
                    'type'  => 'select',
                    'options' => array(
                        'ok' => '绿色',
                        'warning' => '黄色',
                        'error' => '红色',
                    ),
                ),
                array(
                    'label' => __( '按钮尺寸' ),
                    'attr'  => 'size',
                    'type'  => 'select',
                    'options' => array(
                        'small' => '小尺寸',
                        'large' => '大尺寸',
                        'xlarge' => '特大尺寸',
                    ),
                ),
                array(
                    'label' => __( '按钮文字' ),
                    'attr'  => 'text',
                    'type'  => 'text',
                    'value' => '链接文本',
                ),
                array(
                    'label' => __( '按钮连接' ),
                    'attr'  => 'url',
                    'type'  => 'url',
                    'value' => 'http://',
                ),
            ),
        )
    );


    // 显示分割线
    shortcode_ui_register_for_shortcode(
        'divider',
        array(
            'label' => '分割线',
            'listItemImage' => 'dashicons-minus',
            'attrs' => array(
                array(
                    'label' => __( '分割线类型' ),
                    'attr'  => 'type',
                    'type'  => 'select',
                    'options' => array(
                        'solid' => '实线',
                        'shadow' => '投影',
                    ),
                ),
            ),
        )
    );


    // 显示内容标题
    shortcode_ui_register_for_shortcode(
        'heading',
        array(
            'label' => '标题',
            'listItemImage' => 'dashicons-editor-bold',
            'attrs' => array(
                array(
                    'label' => __( '标题类型' ),
                    'attr'  => 'type',
                    'type'  => 'select',
                    'options' => array(
                        'background' => '背景',
                        'border' => '底部边框',
                    ),
                ),
                array(
                    'label' => __( '内容' ),
                    'attr'  => 'content',
                    'type'  => 'text',
                    'value' => '这是标题内容',
                )
            ),
        )

    );


    // 显示提示信息
    shortcode_ui_register_for_shortcode(
        'alert',
        array(
            'label' => '提示信息',
            'listItemImage' => 'dashicons-info',
            'attrs' => array(
                array(
                    'label' => __( '信息类型' ),
                    'attr'  => 'type',
                    'type'  => 'select',
                    'options' => array(
                        'success' => '成功提示（绿色））',
                        'warning' => '警告提示（黄色））',
                        'error' => '失败提示（红色））',
                    ),
                ),
                array(
                    'label' => __( '提示内容' ),
                    'attr'  => 'content',
                    'type'  => 'textarea',
                    'value' => '请输入提示信息内容',
                ),
            ),
        )
    );

    // 创建显示页面内容UI
    shortcode_ui_register_for_shortcode(
        'page_cont',
        array(
            'label' => '页面内容',
            'listItemImage' => 'dashicons-media-document',
            'attrs' => array(
                array(
                    'label' => __( '页面ID' ),
                    'attr'  => 'id',
                    'type' => 'post_select',
                    'query' => array( 'post_type' => 'page' ),
                ),
                array(
                    'label' => __( '内容字数' ),
                    'attr'  => 'cont',
                    'type'  => 'text',
                    'value' => '120',
                ),
                array(
                    'label' => __( '显示更多链接' ),
                    'attr'  => 'more',
                    'type'  => 'checkbox',
                    'value' => true,
                ),
            ),
        )
    );


    // 创建文章列表UI
    shortcode_ui_register_for_shortcode(
        'title_list',
        array(
            'label' => '文章标题列表',
            'listItemImage' => 'dashicons-media-text',
            'attrs' => array(
                array(
                    'label' => __( '文章类型' ),
                    'attr'  => 'type',
                    'type'  => 'text',
                    'value' => 'post',
                ),
                array(
                    'label' => __( '分类方法' ),
                    'attr'  => 'tax',
                    'type'  => 'text',
                    'value' => 'category',
                ),
                array(
                    'label' => __( '分类项目' ),
                    'attr'  => 'tag',
                    'type'  => 'text',
                    'value' => 'default',
                ),
                array(
                    'label' => __( '跳过文章数量' ),
                    'attr'  => 'offset',
                    'type'  => 'text',
                    'value' => '0',
                ),
                array(
                    'label' => __( '显示数量' ),
                    'attr'  => 'num',
                    'type'  => 'text',
                    'value' => '12',
                ),
                array(
                    'label' => __( '标题字数' ),
                    'attr'  => 'cut',
                    'type'  => 'text',
                    'value' => '14',
                ),
                array(
                    'label' => __( '显示分类名称作为标题' ),
                    'attr'  => 'heading',
                    'type'  => 'checkbox',
                    'value' => true,
                ),
                array(
                    'label' => __( '显示文章发布时间' ),
                    'attr'  => 'time',
                    'type'  => 'checkbox',
                    'value' => false,
                ),
            ),
        )
    );


	// 创建图片列表UI
    shortcode_ui_register_for_shortcode(
        'photo_list',
        array(
            'label' => '图文列表',
            'listItemImage' => 'dashicons-welcome-widgets-menus',
            'attrs' => array(
                array(
                    'label' => __( '文章类型' ),
                    'attr'  => 'type',
                    'type'  => 'text',
                    'value' => 'post',
                ),
                array(
                    'label' => __( '分类方法' ),
                    'attr'  => 'tax',
                    'type'  => 'text',
                    'value' => 'category',
                ),
                array(
                    'label' => __( '分类项目' ),
                    'attr'  => 'tag',
                    'type'  => 'text',
                    'value' => 'default',
                ),
                array(
                    'label' => __( '缩略图大小' ),
                    'attr'  => 'thumbs',
                    'type'  => 'text',
                    'value' => 'tumbnails',
                ),
                array(
                    'label' => __( '缩略图位置' ),
                    'attr'  => 'position',
                    'type'  => 'select',
                    'options' => array(
                            'left' => '左侧',
                            'top' => '上面',
                            'right' => '右边',
                        ),
                ),
                array(
                    'label' => __( '显示数量' ),
                    'attr'  => 'num',
                    'type'  => 'text',
                    'value' => '12',
                ),
                array(
                    'label' => __( '标题字数' ),
                    'attr'  => 'cut',
                    'type'  => 'text',
                    'value' => '10',
                ),
                array(
                    'label' => __( '内容字数' ),
                    'attr'  => 'content',
                    'type'  => 'text',
                    'value' => '200',
                ),
                array(
                    'label' => __( '显示分类名称作为标题' ),
                    'attr'  => 'heading',
                    'type'  => 'checkbox',
                    'value' => true,
                ),
                array(
                    'label' => __( '附加CSS类' ),
                    'attr'  => 'class',
                    'type'  => 'text',
                    'value' => '',
                ),
            ),
        )
    );


	// 创建幻灯UI
    shortcode_ui_register_for_shortcode(
        'slider',
        array(
            'label' => '幻灯',
            'listItemImage' => 'dashicons-slides',
            'attrs' => array(
                array(
                    'label' => __( '文章类型' ),
                    'attr'  => 'type',
                    'type'  => 'text',
                    'value' => 'post',
                ),
                array(
                    'label' => __( '分类方法' ),
                    'attr'  => 'tax',
                    'type'  => 'text',
                    'value' => 'category',
                ),
                array(
                    'label' => __( '分类项目' ),
                    'attr'  => 'tag',
                    'type'  => 'text',
                    'value' => 'default',
                ),
                array(
                    'label' => __( '缩略图大小' ),
                    'attr'  => 'thumbs',
                    'type'  => 'text',
                    'value' => 'tumbnails',
                ),
                array(
                    'label' => __( '显示数量' ),
                    'attr'  => 'num',
                    'type'  => 'text',
                    'value' => '4',
                ),
                array(
                    'label' => __( '标题字数' ),
                    'attr'  => 'cut',
                    'type'  => 'text',
                    'value' => '30',
                ),
                array(
                    'label' => __( '内容字数' ),
                    'attr'  => 'content',
                    'type'  => 'text',
                    'value' => '60',
                ),
                array(
                    'label' => __( '幻灯模式' ),
                    'attr'  => 'mode',
                    'type'  => 'text',
                    'value' => 'horizontal',
                ),
                array(
                    'label' => __( '切换速度' ),
                    'attr'  => 'speed',
                    'type'  => 'text',
                    'value' => '500',
                ),
                array(
                    'label' => __( '自动播放' ),
                    'attr'  => 'auto',
                    'type'  => 'checkbox',
                    'value' => true,
                ),
                array(
                    'label' => __( '鼠标滑过时暂停' ),
                    'attr'  => 'autohover',
                    'type'  => 'checkbox',
                    'value' => true,
                ),
                array(
                    'label' => __( '最少显示数量' ),
                    'attr'  => 'minslides',
                    'type'  => 'text',
                    'value' => '1',
                ),
                array(
                    'label' => __( '最多显示数量' ),
                    'attr'  => 'maxslides',
                    'type'  => 'text',
                    'value' => '1',
                ),
                array(
                    'label' => __( '图片宽度' ),
                    'attr'  => 'slidewidth',
                    'type'  => 'text',
                    'value' => '360',
                ),
                array(
                    'label' => __( '图片间距' ),
                    'attr'  => 'slidewargin',
                    'type'  => 'text',
                    'value' => '10',
                ),
                array(
                    'label' => __( '动画效果' ),
                    'attr'  => 'easing',
                    'type'  => 'text',
                    'value' => 'swing',
                ),
            ),
        )
    );

}