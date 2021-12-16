console.log('dashbaord.js');
jQuery(document).ready(function ($) {
    'use strict';

    /**
     * Dismiss dashboard notices
     */
    $(document).on('click', '.burst-dismiss-warning', function(){
        console.log('click');
        var warning_id = $(this).data('warning_id');
        var btn = $(this);
        btn.prop('disabled', true);
        $.ajax({
            type: "POST",
            url: burst.ajaxurl,
            dataType: 'json',
            data: ({
                action: 'burst_dismiss_notice',
                id: warning_id,
            }),
            success: function (response) {
                btn.prop('disabled', false);;
                if (response.success) {
                    btn.closest('.burst-notice').remove();
                }
            }
        });
    });

    var intervalId = window.setInterval(function(){
        updateRealTimeVisits();
    }, 2000);

    let realTimeNumber = $('.real-time').find('.block__big-number__right h1');
    function updateRealTimeVisits(){
        $.ajax({
            type: "get",
            dataType: "json",
            url: burst.ajaxurl,
            data: {
                action: "burst_get_real_time_visitors",
            },
            success: function (response) {
                if (response.success) {
                    realTimeNumber.html(response.count);
                }
            }
        })
    }

    var intervalId = window.setInterval(function(){
        updateTodayStatistics();
    }, 10000);

    let todayBlock = $('.real-time').find('.burst-grid-content');
    function updateTodayStatistics(){
        $.ajax({
            type: "get",
            dataType: "json",
            url: burst.ajaxurl,
            data: {
                action: "burst_get_today_statistics_html",
            },
            success: function (response) {
                if (response.success) {
                    todayBlock.html(response.html);
                }
            }
        })
    }
});

