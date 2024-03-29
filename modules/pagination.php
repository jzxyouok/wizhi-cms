<?php
/**
 * display pagination
 *
 * @Author: kriesi
 * @Link  : http://www.kriesi.at/archives/how-to-build-a-wordpress-post-pagination-without-plugin
 *
 * @uses  get_pagenum_link
 *
 * @since wizhi 1.0
 */

if( !function_exists( 'wizhi_pagination' ) ):

    // pure分页导航
    function wizhi_pagination( $query = '', $pages = '', $range = 5 ) {
        $showitems = ( $range * 2 ) + 1;

        global $paged;
        if( empty( $paged ) ) {
            $paged = 1;
        }

        if( !$query ) {
            global $wp_query;
            $wizhi_query = $wp_query;
        } else {
            $wizhi_query = $query;
        }

        if( $pages == '' ) {
            $pages = $wizhi_query->max_num_pages;
            if( !$pages ) {
                $pages = 1;
            }
        }

        if( 1 != $pages ) {
            echo '<ul class="ui-paginator"><li><span class="pure-button">页 ' . $paged . ' / ' . $pages . '</span></li>';
            if( $paged > 2 && $paged > $range + 1 && $showitems < $pages ) {
                echo '<li><a class="pure-button prev" href="' . get_pagenum_link( 1 ) . '">首页</a></li>';
            }
            if( $paged > 1 && $showitems < $pages ) {
                echo '<li><a class="pure-button next" href="' . get_pagenum_link( $paged - 1 ) . '"> < </a></li>';
            }

            for ( $i = 1; $i <= $pages; $i++ ) {
                if( 1 != $pages && ( !( $i >= $paged + $range + 1 || $i <= $paged - $range - 1 ) || $pages <= $showitems ) ) {
                    if( $paged == $i ) {
                        echo '<li><span class="pure-button pure-button-active">' . $i . '</span></li>';
                    } else {
                        echo '<li><a class="pure-button inactive" href="' . get_pagenum_link( $i ) . '">' . $i . '</a></li>';
                    }
                }
            }

            if( $paged < $pages ) {
                echo '<li><a class="pure-button next" href="' . get_pagenum_link( $paged + 1 ) . '">></a></li>';
            }
            if( $paged < $pages - 1 && $paged + $range - 1 < $pages && $showitems < $pages ) {
                echo '<a class="pure-button" href="' . get_pagenum_link( $pages ) . '">尾页</a>';
            }
            echo '</ul>';
        }
    }
endif;


//bootstrap 分页导航
if( !function_exists( 'wizhi_bootstrap_pagination' ) ):

    function wizhi_bootstrap_pagination( $query = '', $pages = '', $range = 5 ) {
        $showitems = ( $range * 2 ) + 1;

        global $paged;
        if( empty( $paged ) ) {
            $paged = 1;
        }

        if( !$query ) {
            global $wp_query;
            $wizhi_query = $wp_query;
        } else {
            $wizhi_query = $query;
        }

        if( $pages == '' ) {
            $pages = $wizhi_query->max_num_pages;
            if( !$pages ) {
                $pages = 1;
            }
        }

        if( 1 != $pages ) {
            echo '<ul class="pagination">';
            if( $paged > 2 && $paged > $range + 1 && $showitems < $pages ) {
                echo '<li><a aria-label="Previous" href="' . get_pagenum_link( 1 ) . '"><span aria-hidden="true">«</span></a></li>';
            }
            if( $paged > 1 && $showitems < $pages ) {
                echo '<li><a aria-label="Previous" href="' . get_pagenum_link( $paged - 1 ) . '"> < </a></li>';
            }

            for ( $i = 1; $i <= $pages; $i++ ) {
                if( 1 != $pages && ( !( $i >= $paged + $range + 1 || $i <= $paged - $range - 1 ) || $pages <= $showitems ) ) {
                    if( $paged == $i ) {
                        echo '<li class="active"><a href="#">' . $i . '</a></li>';
                    } else {
                        echo '<li><a href="' . get_pagenum_link( $i ) . '">' . $i . '</a></li>';
                    }
                }
            }

            if( $paged < $pages ) {
                echo '<li><a class="nextpostslink" aria-label="Next" href="' . get_pagenum_link( $paged + 1 ) . '"><span aria-hidden="true">></span></a></li>';
            }
            if( $paged < $pages - 1 && $paged + $range - 1 < $pages && $showitems < $pages ) {
                echo '<li><a class="nextpostslink" aria-label="Next" href="' . get_pagenum_link( $pages ) . '"><span aria-hidden="true">»</span></a></li>';
            }
            echo '</ul>';
        }
    }
endif;

?>