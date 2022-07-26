<?php defined( 'ABSPATH' ) or die(); ?>
<a href="<?php echo admin_url( 'index.php?page=burst&burst-page=statistics' ); ?>" class="button button-primary">
	<?php _e( "View my statistics", "burst-statistics" ) ?>
</a>
<?php
$status = burst_get_tracking_status();
$tracking_statuses = array(
	'error'  => array(
		'label' => __( 'Tracking error', 'burst-statistics' ),
		'icon'  => 'error',
		'icon-status' => 'error',
	),
	'rest'   => array(
		'label' => __( 'Tracking with REST API', 'burst-statistics' ),
		'icon'  => 'warning',
		'icon-status' => 'warning',
	),
	'beacon' => array(
		'label'       => __( 'Tracking optimized', 'burst-statistics' ),
		'icon'        => 'circle-check',
		'icon-status' => 'success',
	),
);
$icon = $tracking_statuses[ $status ]['icon'];
$icon_status = $tracking_statuses[ $status ]['icon-status'];

?>

<div class="burst-legend burst-flex-push-right">
	<?php echo burst_icon( $icon, $icon_status ) ?>
    <span><?php echo $tracking_statuses[ $status ]['label'] ?></span>
</div>