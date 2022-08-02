<?php defined( 'ABSPATH' ) or die(); ?>
<a href="<?php echo admin_url( 'index.php?page=burst&burst-page=statistics' ); ?>" class="button button-primary">
	<?php _e( "View my statistics", "burst-statistics" ) ?>
</a>
<?php
$tracking_status = burst_get_tracking_status() === 'error' ? 'error' : 'success';
$tracking_type = burst_get_tracking_type();
$tracking_statuses = array(
	'error'   => array(
		'label'       => __( 'Tracking error', 'burst-statistics' ),
		'icon'        => 'error',
		'icon-status' => 'error',
	),
	'success' => array(
		'label'       => __( 'Tracking enabled', 'burst-statistics' ),
		'icon'        => 'circle-check',
		'icon-status' => 'success',
	),
	'rest'    => array(
		'label'       => __( 'Tracking with REST API', 'burst-statistics' ),
		'icon'        => 'warning',
		'icon-status' => 'warning',
	),
	'beacon'  => array(
		'label'       => __( 'Endpoint enabled', 'burst-statistics' ),
		'icon'        => 'circle-check',
		'icon-status' => 'success',
	),
);
?>

<div class="burst-legend burst-flex-push-right">
	<?php echo burst_icon(
        $tracking_statuses[ $tracking_status ][ 'icon' ],
		$tracking_statuses[ $tracking_status ][ 'icon-status' ],
    ) ?>
    <span><?php echo $tracking_statuses[ $tracking_status ]['label'] ?></span>
</div>
<?php // if there is a tracking error only show one legend
if ( $tracking_status !== 'error' ) { ?>
    <div class="burst-legend">
		<?php echo burst_icon(
			$tracking_statuses[ $tracking_type ]['icon'],
			$tracking_statuses[ $tracking_type ]['icon-status'],
		) ?>
        <span><?php echo $tracking_statuses[ $tracking_type ]['label'] ?></span>
    </div>
<?php } ?>