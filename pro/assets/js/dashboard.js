//@todo maybe usefull for pro experiment dashboard
jQuery(document).ready(function ($) {
    'use strict';

    function burstInitChartJS(date_start, date_end) {
        var useExperimentDate = typeof date_start === 'undefined';
        date_start = typeof date_start !== 'undefined' ? date_start : parseInt($('input[name=burst_experiment_start]').val());
        date_end = typeof date_end !== 'undefined' ? date_end : parseInt($('input[name=burst_experiment_end]').val());
        burstDisableStartStopBtns();

        var XscaleLabelDisplay = false;
        var YscaleLabelDisplay = true;
        var titleDisplay = false;
        var legend = true;
        window.config = {
            type: 'line',
            data: {
                labels: ['...', '...', '...', '...', '...', '...', '...'],
                datasets: [{
                    label: 'Loading...',
                    backgroundColor: 'rgb(41, 182, 246)',
                    borderColor: 'rgb(41, 182, 246)',
                    data: [
                        0, 0, 0, 0, 0, 0, 0,
                    ],
                    fill: false,
                },
                    {
                        label: 'Loading...',
                        backgroundColor: 'rgb(244, 191, 62)',
                        borderColor: 'rgb(244, 191, 62)',
                        data: [
                            0, 0, 0, 0, 0, 0, 0,
                        ],
                        fill: false,
                    }]
            },
            options: {
                legend: {
                    display: legend,
                },
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: titleDisplay,
                    text: 'Select an experiment'
                },
                tooltips: {
                    mode: 'index',
                    intersect: true,
                    enabled: true,
                    position: 'nearest',
                    callbacks: {
                        label: function (tooltipItems, data) {
                            var append = '';
                            if (metric == 'conversion_percentages') {
                                append = '%';
                            }
                            var index = tooltipItems.datasetIndex;

                            return data['datasets'][index]['label'] + ': ' + tooltipItems.yLabel + append;
                        }
                    }
                },
                hover: {
                    mode: 'index',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: XscaleLabelDisplay,
                        offset: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        display: YscaleLabelDisplay,
                        scaleLabel: {
                            display: true,
                            labelString: 'Loading...'
                        },
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            max: 10,
                            stepSize: 5
                        }
                    }],
                }
            }
        };

        var ctx = document.getElementsByClassName('burst-chartjs-stats');
        if (window.conversionGraph != undefined) {
            window.conversionGraph.destroy();
        }
        window.conversionGraph = new Chart(ctx, window.config);

        var experiment_id = $('select[name=burst_selected_experiment_id]').val();
        var metric = $('select[name=burst_selected_metric]').val();
        if (experiment_id > 0) {
            $.ajax({
                type: "get",
                dataType: "json",
                url: burst.ajaxurl,
                data: {
                    action: "burst_get_experiment_statistics",
                    experiment_id: experiment_id,
                    date_start: date_start,
                    date_end: date_end,
                    metric: metric,
                },
                success: function (response) {
                    if (response.success == true) {
                        console.log(response.data);
                        if (useExperimentDate) {
                            $('input[name=burst_experiment_start]').val(response.data.date_start);
                            $('input[name=burst_experiment_end]').val(response.data.date_end);
                            burstUpdateDate(moment.unix(response.data.date_start), moment.unix(response.data.date_end));
                        }
                        // if (response.options != "undefined"){
                        //     window.config.options = response.options;
                        // }


                        var i = 0;
                        response.data.datasets.forEach(function (dataset) {
                            if (window.config.data.datasets.hasOwnProperty(i)) {
                                window.config.data.datasets[i] = dataset;
                            } else {
                                var newDataset = dataset;
                                window.config.data.datasets.push(newDataset);
                            }

                            i++;
                        });

                        window.config.data.labels = response.data.labels;
                        window.config.options.title.text = response.title;
                        window.config.options.scales.yAxes[0].ticks.max = parseInt(response.data.max);
                        window.config.options.scales.yAxes[0].scaleLabel.labelString = response.options.scales.yAxes[0].scaleLabel;
                        window.conversionGraph.update();
                        burstEnableStartStopBtns();
                    } else {
                        alert("Your experiment data could not be loaded")
                    }
                }
            })
        }
    }


    /**
     * Start and stop experiment from the dashboard statistics overview
     */

    $(document).on('click', '.burst-statistics-action', function () {

        var type = $(this).data('experiment_action');
        var experiment_id = $('select[name=burst_selected_experiment_id]').val();
        burstDisableStartStopBtns();

        $.ajax({
            type: "POST",
            url: burst.ajaxurl,
            dataType: 'json',
            data: ({
                action: 'burst_experiment_action',
                type: type,
                experiment_id: experiment_id,
                token: burst.token
            }),
            success: function (response) {

                if (response.success) {
                    burstEnableStartStopBtns();
                    $('.burst-experiment-start').hide();
                    $('.burst-experiment-stop').hide();
                    if (type === 'start') {
                        $('.burst-experiment-stop').show();
                    } else {
                        $('.burst-experiment-start').show();
                    }

                }
            },
        });
    });

    function burstEnableStartStopBtns() {
        $('.burst-experiment-start button').prop('disabled', false);
        $('.burst-experiment-stop button').prop('disabled', false);
        $('.burst_selected_experiment_id_wrapper select').prop('disabled', false);
    }

    function burstDisableStartStopBtns() {
        $('.burst-experiment-start button').prop('disabled', true);
        $('.burst-experiment-stop button').prop('disabled', true);
        $('.burst_selected_experiment_id_wrapper select').prop('disabled', true);
    }

    $(document).on('change', 'select[name=burst_selected_experiment_id]', function(){
        burstInitChartJS();
        burstLoadGridBlocks();
    });

    burstLoadStatusInfo();
    function burstLoadStatusInfo(){
        var experiment_id = $('select[name=burst_selected_experiment_id]').val();

        // animate status
        if ( $('.burst-experiment-status').find('.loading').length == 0 ) {
            $('.burst-experiment-status .burst-bullet').removeClass().addClass('burst-bullet grey loading');
            $('.burst-experiment-status .burst-experiment-status__text').fadeOut(300, function() {
                $(this).html('Loading...').fadeIn(200);
            });
            $('.burst-experiment-stop').fadeOut();
            $('.burst-experiment-completed').fadeOut(200);

        };

        $.ajax({
            type: "get",
            dataType: "json",
            url: burst.ajaxurl,
            data: {
                action: "burst_load_status_info",
                experiment_id: experiment_id,
            },
            success: function (response) {
                if (response.success) {
                    $('.burst-experiment-status .burst-bullet').removeClass().addClass('burst-bullet ' + response.data.status.class);
                    $('.burst-experiment-status .burst-experiment-status__text').fadeOut(300, function() {
                        $(this).html(response.data.status.title).fadeIn(200);
                    });
                    $('.burst-experiment-stop').hide();
                    $('.burst-experiment-completed').hide();
                    if (response.data.status.title === 'Active') {
                        $('.burst-experiment-stop').show();
                    } else if(response.data.status.title === 'Completed'){
                        $('.burst-experiment-completed-text').html(response.data.date_end_text)
                        $('.burst-experiment-completed').show();
                    }
                }
            }
        })
    }

}