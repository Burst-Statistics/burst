<div class="burst-section-content">

    <form class="burst-form" action="{page_url}" method="POST">
		<input type="hidden" value="{page}" name="wizard_type">
		<input type="hidden" value="{step}" name="step">
		<input type="hidden" value="{section}" name="section">
        <input type="hidden" value="{experiment_id}" name="experiment_id">
        <script type="text/javascript">
            document.addEventListener("DOMContentLoaded", function(event) {
                var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search + '&step={step}&section={section}';
                window.history.pushState({path:newurl},'',newurl);
            });
        </script>
		<?php wp_nonce_field( 'burst_save', 'burst_nonce' ); ?>

        <div class="burst-wizard-title burst-section-content-title-header">
            <div class="burst-section-content-title__titles"><h5>{experiment_title}</h5> {title}</div>
            <div class="burst-section-content-title-header__status">{status}</div></div>
        <div class="burst-wizard-title burst-section-content-notifications-header">
			<?php _e("Notifications", "burst")?>
		</div>
	    {intro}

		{fields}

        <div class="burst-section-footer">
            {previous_button}
            {save_button}
            {next_button}
        </div>

    </form>

</div>

