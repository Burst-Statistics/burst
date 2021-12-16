<?php

/**
 * Get icon from predefined list
 * https://material.io/resources/icons/?search=sync&icon=sync_disabled&style=outline
 * @param string $icon_name
 * @param string $status
 * @param string $tooltip (optional)
 * @param int $size (optional)
 *
 * @return string
 */
function burst_icon( $icon_name, $status, $tooltip = '', $size = 14, $classes = '' ) {
    $vb = $size + 8;

    $icons = array(
        'sync' => array(
            'success' => array(
                'type' => 'svg',
                'icon'    => '<svg xmlns="http://www.w3.org/2000/svg" height="' . $size . '" viewBox="0 0 ' . $vb . ' ' . $vb . '" width="' . $size . '"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>',
                'tooltip' =>__( 'Document is kept up to date by Burst', 'burst' ),
            ),
            'error' => array(
                'type' => 'svg',
                'icon'    => '<svg xmlns="http://www.w3.org/2000/svg" height="' . $size . '" viewBox="0 0 ' . $vb . ' ' . $vb . '" width="' . $size . '"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>',
                'tooltip' =>__( 'Document is kept up to date by Burst', 'burst' ),
            ),
            'disabled' => array(
                'type' => 'svg',
                'icon'    => '<svg xmlns="http://www.w3.org/2000/svg" height="' . $size . '" viewBox="0 0 ' . $vb . ' ' . $vb . '" width="' . $size . '"><path d="M10 6.35V4.26c-.8.21-1.55.54-2.23.96l1.46 1.46c.25-.12.5-.24.77-.33zm-7.14-.94l2.36 2.36C4.45 8.99 4 10.44 4 12c0 2.21.91 4.2 2.36 5.64L4 20h6v-6l-2.24 2.24C6.68 15.15 6 13.66 6 12c0-1 .25-1.94.68-2.77l8.08 8.08c-.25.13-.5.25-.77.34v2.09c.8-.21 1.55-.54 2.23-.96l2.36 2.36 1.27-1.27L4.14 4.14 2.86 5.41zM20 4h-6v6l2.24-2.24C17.32 8.85 18 10.34 18 12c0 1-.25 1.94-.68 2.77l1.46 1.46C19.55 15.01 20 13.56 20 12c0-2.21-.91-4.2-2.36-5.64L20 4z"/></svg>',
                'tooltip' => __( 'Document is not kept up to date by Burst', 'burst' )
            )
        ),
		'uplift' => array(
			'down' => array(
				'type' => 'svg',
                'icon'    => '<svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.77145 10.0647C8.37147 10.5496 7.62853 10.5496 7.22854 10.0647L0.689329 2.13629C0.15137 1.48405 0.615315 0.500004 1.46078 0.500004L14.5392 0.500003C15.3847 0.500003 15.8486 1.48405 15.3107 2.13629L8.77145 10.0647Z" fill="var(--rsp-red)"/>
</svg>',
			),
            'up' => array(
                'type' => 'svg',
                'icon'    => '<svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.22855 0.935339C7.62853 0.450386 8.37147 0.450386 8.77145 0.93534L15.3107 8.86372C15.8486 9.51596 15.3847 10.5 14.5392 10.5L1.46078 10.5C0.615316 10.5 0.151372 9.51595 0.68933 8.86371L7.22855 0.935339Z" fill="var(--rsp-green)"/>
</svg>',
            ),
		),
        'shortcode' => array(
            'success' => array(
                'type' => 'dashicons',
                'icon'    => 'dashicons-admin-page',
            ),
            'disabled' => array(
                'type' => 'dashicons',
                'icon'    => 'dashicons-admin-page',
            )
        ),
        'bullet' => array(
            'success' => array(
                'type' => 'css',
                'icon' => 'bullet',
            ),
            'completed' => array(
                'type' => 'css',
                'icon' => 'bullet',
            ),
            'disabled' => array(
                'type' => 'css',
                'icon' => 'bullet',
            ),
            'warning' => array(
                'type' => 'css',
                'icon' => 'bullet',
            )
        ),
        'check' => array(
            'success' => array(
                'type' => 'svg',
                'icon' => '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"/></svg>',
            ),
            'green' => array(
                'type' => 'svg',
                'icon' => '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"/></svg>',
            ),
            'prefilled' => array(
                'type' => 'svg',
                'icon' => '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"/></svg>',
            ),
            'error' => array(
                'type' => 'svg',
                'icon' => '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>',
            ),
            'failed' => array(
                'type' => 'svg',
                'icon' => '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>',
            ),
            'empty' => array(
                'type' => 'svg',
                'icon' => '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"/></svg>',
            ),
        ),
        'arrow-right' => array(
            'success' => array(
                'type' => 'dashicons',
                'icon'    => 'dashicons-arrow-right-alt2',
            ),
        ),
        'arrow-left' => array(
            'success' => array(
                'type' => 'dashicons',
                'icon'    => 'dashicons-arrow-left-alt2',
            ),
        ),
//        'sync' => array(
//            'success' => array(
//                'type' => 'dashicons',
//                'icon' => 'dashicons-update',
//            ),
//            'error' => array(
//                'type' => 'dashicons',
//                'icon' => 'dashicons-update',
//            ),
//            'disabled' => array(
//                'type' => 'dashicons',
//                'icon' => 'dashicons-update',
//            ),
        // ),
        'file' => array(
            'success' => array(
                'type' => 'dashicons',
                'icon' => 'dashicons-media-default',
            ),
            'disabled' => array(
                'type' => 'dashicons',
                'icon' => 'dashicons-media-default',
            ),
        ),
        'calendar' => array(
            'success' => array(
                'type' => 'svg',
                'icon' => '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-check" class="svg-inline--fa fa-calendar-check fa-w-' . $size . '" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M436 160H12c-6.627 0-12-5.373-12-12v-36c0-26.51 21.49-48 48-48h48V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h128V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h48c26.51 0 48 21.49 48 48v36c0 6.627-5.373 12-12 12zM12 192h424c6.627 0 12 5.373 12 12v260c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V204c0-6.627 5.373-12 12-12zm333.296 95.947l-28.169-28.398c-4.667-4.705-12.265-4.736-16.97-.068L194.12 364.665l-45.98-46.352c-4.667-4.705-12.266-4.736-16.971-.068l-28.397 28.17c-4.705 4.667-4.736 12.265-.068 16.97l82.601 83.269c4.667 4.705 12.265 4.736 16.97.068l142.953-141.805c4.705-4.667 4.736-12.265.068-16.97z"></path></svg>',
            ),
            'error' => array(
                'type' => 'svg',
                'icon' => '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-times" class="svg-inline--fa fa-calendar-times fa-w-' . $size . '" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M436 160H12c-6.6 0-12-5.4-12-12v-36c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48v36c0 6.6-5.4 12-12 12zM12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm257.3 160l48.1-48.1c4.7-4.7 4.7-12.3 0-17l-28.3-28.3c-4.7-4.7-12.3-4.7-17 0L224 306.7l-48.1-48.1c-4.7-4.7-12.3-4.7-17 0l-28.3 28.3c-4.7 4.7-4.7 12.3 0 17l48.1 48.1-48.1 48.1c-4.7 4.7-4.7 12.3 0 17l28.3 28.3c4.7 4.7 12.3 4.7 17 0l48.1-48.1 48.1 48.1c4.7 4.7 12.3 4.7 17 0l28.3-28.3c4.7-4.7 4.7-12.3 0-17L269.3 352z"></path></svg>',
            ),
        ),
        'help' => array(
            'normal' => array(
                'type' => 'dashicons',
                'icon' => 'dashicons-editor-help',
            ),
        ),
        'conclusion' => array(
            'loading' => array(
                'type' => 'svg',
                'icon' => '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" class="svg-inline--fa fa-spinner fa-w-' . $size . '" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>',
            ),
            'error' => array(
                'type' => 'svg',
                'icon' => '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" class="svg-inline--fa fa-exclamation-triangle fa-w-' . $size . '" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>',
            ),
            'warning' => array(
                'type' => 'svg',
                'icon' => '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-circle" class="svg-inline--fa fa-exclamation-circle fa-w-' . $size . '" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>',
            ),
            'success' => array(
                'type' => 'svg',
                'icon' => '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-' . $size . '" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path></svg>',
            ),
        ),
    );

    if ( !empty($tooltip) ) {
        $tooltip =  'burst-tooltip="' . $tooltip . '" flow="up" tabindex="0" role="button" aria-pressed="false"';
    } else if ( isset($icons[$icon_name][$status]['tooltip']) ) {
        $tooltip =  'burst-tooltip="' . $icons[$icon_name][$status]['tooltip'] . '" flow="up" tabindex="0" role="button" aria-pressed="false"';
    }

    $icon = $icons[$icon_name][$status]['icon'];
    $type = $icons[$icon_name][$status]['type'];

    if ( $type === 'svg' ){
        $html = '<div class="burst-tooltip-icon dashicons-before burst-icon '. $classes .' burst-' . esc_attr( $status ) . ' ' . esc_attr($icon_name) . '" >' . $icon . '</div>';
    } else if ( $type === 'dashicons' ) {
        $html = '<div class="burst-tooltip-icon dashicons-before burst-icon burst-' . esc_attr( $status ) . ' ' . esc_attr($icon_name) . ' ' . $icon . '" ></div>';
    } else {
        $html = '<div class="burst-icon burst-bullet burst-' . esc_attr( $status ) . ' ' . esc_attr($icon_name) . ' ' . $icon . '" ></div>';
    }

    return '<span '.$tooltip.'>'.$html.'</span>';
}
