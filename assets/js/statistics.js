jQuery(document).ready(function ($) {
    'use strict';

    /**
     * Generate a ChartJS in the element canvas.
     * @param date_start
     * @param date_end
     */

    function burstInitChartJS(date_start, date_end) {
        let useExperimentDate = typeof date_start === 'undefined';
        date_start = typeof date_start !== 'undefined' ? date_start : parseInt($('input[name=burst_date_start]').val());
        date_end = typeof date_end !== 'undefined' ? date_end : parseInt($('input[name=burst_date_end]').val());

        let XscaleLabelDisplay = true;
        let YscaleLabelDisplay = true;
        let titleDisplay = false;
        let legend = true;
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
                    text: 'Select'
                },
                tooltips: {
                    mode: 'index',
                    intersect: true,
                    enabled: true,
                    position: 'nearest',
                    // callbacks: {
                    //     label: function(tooltipItems, data) {
                    //         let append = '';
                    //         if (metric == 'conversion_percentages'){
                    //             append = '%';
                    //         }
                    //         let index = tooltipItems.datasetIndex;
                    //
                    //         return data['datasets'][index]['label'] + ': ' + tooltipItems.yLabel + append;
                    //     }
                    // }
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
                            display: false,
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

        let ctx = document.getElementsByClassName('burst-chartjs-stats');
        if ( window.conversionGraph != undefined ) {
            window.conversionGraph.destroy();
        }
        window.conversionGraph = new Chart(ctx, window.config);

        let metrics = JSON.parse($('input[name=burst_chartjs_metrics]').val());
        $.ajax({
            type: "get",
            dataType: "json",
            url: burst.ajaxurl,
            data: {
                action: "burst_get_chart_statistics",
                date_start: date_start,
                date_end: date_end,
                metrics: metrics,
            },
            success: function (response) {

                if (response.success == true) {
                    // if (useExperimentDate) {
                    //     $('input[name=burst_date_start]').val(response.data.date_start);
                    //     $('input[name=burst_date_end]').val(response.data.date_end);
                    //     burstUpdateDate(moment.unix(response.data.date_start), moment.unix(response.data.date_end));
                    // }


                    let i = 0;
                    response.data.datasets.forEach(function (dataset) {
                        if (window.config.data.datasets.hasOwnProperty(i)) {
                            window.config.data.datasets[i] = dataset;
                        } else {
                            let newDataset = dataset;
                            window.config.data.datasets.push(newDataset);
                        }

                        i++;
                    });

                    window.config.data.labels = response.data.labels;
                    window.config.data.dates = response.data.dates;
                    window.config.options.title.text = response.title;
                    window.config.options.scales.yAxes[0].ticks.max = parseInt(response.data.max);
                    window.config.options.scales.yAxes[0].scaleLabel.labelString = response.options.scales.yAxes[0].scaleLabel;
                    window.conversionGraph.update();
                } else {
                    alert("Your data could not be loaded")
                }
            },
            error: function (response) {
                console.log(response);
            }
        })
    }

    initDatePicker();
    function initDatePicker() {

        let todayStart = moment().endOf('day').subtract(1, 'days').add(1, 'minutes');
        let todayEnd = moment().endOf('day');
        let yesterdayStart = moment().endOf('day').subtract(2, 'days').add(1, 'minutes');

        let yesterdayEnd = moment().endOf('day').subtract(1, 'days');

        // let strToday = burstLocalizeString('Today');
        let strYesterday = burstLocalizeString('Yesterday');
        let strLast7 = burstLocalizeString('Previous 7 days');
        let strLast30 = burstLocalizeString('Previous 30 days');
        let strLast90 = burstLocalizeString('Previous 90 days');
        let strPreviousMonth = burstLocalizeString('Previous Month') + ' (' +moment().subtract(1, 'month').format('MMMM') + ')';
        //let strExperiment = burstLocalizeString('Experiment duration');

        let ranges = {}
        // ranges[strToday] = [todayStart, todayEnd];
        ranges[strYesterday] = [yesterdayStart, yesterdayEnd];
        ranges[strLast7] = [moment().subtract(8, 'days'), yesterdayEnd];
        ranges[strLast30] = [moment().subtract(32, 'days'), yesterdayEnd];
        ranges[strLast90] = [moment().subtract(92, 'days'), yesterdayEnd];
        ranges[strPreviousMonth] = [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')];

        let unixStart = parseInt($('input[name=burst_date_start]').val());
        let unixEnd = parseInt($('input[name=burst_date_end]').val());

        if (unixStart === null || unixEnd === null) {
            unixStart = moment().endOf('day').subtract(8, 'days').unix();
            unixEnd = moment().endOf('day').subtract(1, 'day').unix();
        }

        unixStart = parseInt(unixStart);
        unixEnd = parseInt(unixEnd);
        //ranges[strExperiment] = [moment.unix(unixStart), moment.unix(unixEnd)];
        burstUpdateDate(moment.unix(unixStart), moment.unix(unixEnd));
        burstInitChartJS();


        $('.burst-date-container.burst-date-range').daterangepicker(
            {
                ranges: ranges,
                "locale": {
                    "format": burstLocalizeString("date_format", "burst"),
                    "separator": " - ",
                    "applyLabel": burstLocalizeString("Apply", "burst"),
                    "cancelLabel": burstLocalizeString("Cancel", "burst"),
                    "fromLabel": burstLocalizeString("From", "burst"),
                    "toLabel": burstLocalizeString("To", "burst"),
                    "customRangeLabel": burstLocalizeString("Custom", "burst"),
                    "weekLabel": burstLocalizeString("W", "burst"),
                    "daysOfWeek": [
                        burstLocalizeString("Su", "burst"),
                        burstLocalizeString("Mo", "burst"),
                        burstLocalizeString("Tu", "burst"),
                        burstLocalizeString("We", "burst"),
                        burstLocalizeString("Th", "burst"),
                        burstLocalizeString("Fr", "burst"),
                        burstLocalizeString("Sa", "burst"),
                    ],
                    "monthNames": [
                        burstLocalizeString("January"),
                        burstLocalizeString("February"),
                        burstLocalizeString("March"),
                        burstLocalizeString("April"),
                        burstLocalizeString("May"),
                        burstLocalizeString("June"),
                        burstLocalizeString("July"),
                        burstLocalizeString("August"),
                        burstLocalizeString("September"),
                        burstLocalizeString("October"),
                        burstLocalizeString("November"),
                        burstLocalizeString("December")
                    ],
                    "firstDay": 1
                },
                "alwaysShowCalendars": true,
                startDate: moment.unix(unixStart),
                endDate: moment.unix(unixEnd),
                "opens": "left",
                maxDate: todayEnd,
            }, function (start, end, label) {
                burstUpdateDate(start, end);
                burstInitChartJS(start.unix(), end.unix());
                $('input[name=burst_date_start]').val(start.unix());
                $('input[name=burst_date_end]').val(end.unix());
                burstLoadGridBlocks();
                window.burstLoadAjaxTables();
            });
    }

    $(document).on('change', 'select[name=burst_selected_metric]', function(){
        let datepickerData = $('.burst-date-container.burst-date-range').data('daterangepicker');
        let startDate = moment(datepickerData.startDate);
        let endDate = moment(datepickerData.endDate);
        burstInitChartJS(startDate.unix(), endDate.unix());
    });

    burstLoadGridBlocks();
    function burstLoadGridBlocks(){

        //let experiment_id = $('select[name=burst_selected_experiment_id]').val() ? $('select[name=burst_selected_experiment_id]').val() : 0 ;


        $('.burst-load-ajax').each(function(){
            let gridContainer = $(this);
            // if there is no skeleton add a skeleton
            if (gridContainer.find('.burst-skeleton').length == 0) {
                gridContainer.find('.burst-grid-content').fadeOut(200, function() {
                    $(this).html('<div class="burst-skeleton"></div>').fadeIn(300);
                });
            }

            let type = gridContainer.data('block_type');
            let date_start = parseInt($('input[name=burst_date_start]').val());
            let date_end = parseInt($('input[name=burst_date_end]').val());
            $.ajax({
                type: "get",
                dataType: "json",
                url: burst.ajaxurl,
                data: {
                    action: "burst_load_grid_block",
                    type:type,
                    date_start: date_start,
                    date_end: date_end,
                },
                success: function (response) {
                    if (response.success) {
                        gridContainer.find('.burst-grid-content').fadeOut(300, function() {
                            $(this).html(response.html).fadeIn(200);
                        })
                    }
                }
            })
        });
    }

    function burstUpdateDate(start, end) {
        $('.burst-date-container span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    /**
     * DataTables javascript
     */
    let burstDefaultRowCount = 10;
    let burstDefaultPagingType = 'simple_numbers';
    let lastSelectedPage = 0;

    $(window).on('resize', function(){
        burst_resize_datatables();
    });

    /**
     * Hide columns based on screen size, and redraw
     */
    function burst_resize_datatables() {
        $('.burst-grid-container').each(function () {
            if ($(this).hasClass('burst-load-ajax-datatable')) {
                var table = $(this).find('table').DataTable();
                var column = table.column(2);
                var win = $(window);
                if (win.width() > wpsiScreensizeHideColumn) {
                    if (!column.visible()) column.visible(true);
                } else {
                    column.visible(false);
                }
                table.columns.adjust().draw();
            }
        });
    }

    /**
     * Hide columns based on screen size, and redraw
     */
    function burst_resize_datatables() {
        return true;
    }

    /**
     * Ajax loading of tables
     */

    window.burstLoadAjaxTables = function() {
        $('.burst-grid-datatable').each(function(){
            if ($(this).find('.burst-skeleton').length == 0) {
                $(this).find('.burst-grid-content').fadeOut(200, function() {
                    $(this).html('<div class="burst-skeleton"></div>').fadeIn(300);
                });
            }
            burstLoadDataTable( $(this), $(this).data('id'), 1, 0);
        });
    };

    window.burstLoadAjaxTables();

    let initiliasedDatatables  = array();
    function burstInitSingleDataTable(table, id) {
        let win = $(window);
        let pageLength = burstDefaultRowCount;
        let pagingType = burstDefaultPagingType;

        table.DataTable({
            "id": id,
            "pageLength": pageLength,
            "pagingType": pagingType,
            "conditionalPaging": true,
            // "stateSave": true, // Saves the state in browser
            "columns": [
                { "width": "75%" },
                { "width": "25%" },
            ],
            "language": {
                "paginate": {
                    "previous": burstLocalizeString('Previous'),
                    "next": burstLocalizeString('Next'),
                },
                "searchPlaceholder": burstLocalizeString('Search'),
                "search": "",
                "emptyTable": burstLocalizeString('No data available'),
            },
            "order": [[ 1, "desc" ]],
        });



        table.on( 'page.dt', function () {
            let table = $(this).closest('table').DataTable();
            let info = table.page.info();
            lastSelectedPage = info.page;
        } );
    }


    function localize_html(str) {
        let strings = burst.localize;
        for (let k in strings) {
            if (strings.hasOwnProperty(k)) {
                if ( k === str ) return strings[k];
            }
        }
        return str;
    }


    function burstLoadDataTable(container, id, page, received){
        if(page===1) container.html(burst.skeleton);
        // let unixStart = localStorage.getItem('burst_range_start');
        // let unixEnd = localStorage.getItem('burst_range_end');
        // if (unixStart === null || unixEnd === null ) {
        //     unixStart = moment().subtract(100, 'week').unix();
        //     unixEnd = moment().unix();
        //     localStorage.setItem('burst_range_start', unixStart);
        //     localStorage.setItem('burst_range_end', unixEnd);
        // }
        let unixStart = parseInt($('input[name=burst_date_start]').val())
        let unixEnd = parseInt($('input[name=burst_date_end]').val())
        let type = container.data('block_type');

        $.ajax({
            type: "GET",
            url: burst.ajaxurl,
            dataType: 'json',
            data: ({
                action      : 'burst_get_datatable',
                start       : unixStart,
                end         : unixEnd,
                page        : page,
                type        : type,
                // token  : burst.token
            }),
            success: function (response) {
                //this only on first page of table
                if (page===1){
                    let table = container.find('table');

                    container.find('.burst-skeleton').fadeOut(300, function() {
                        table.hide().html(response.html).fadeIn(200);
                        table.DataTable().destroy();
                        container.find('.dataTables_length').remove();
                        container.find('.dataTables_filter').remove();
                        container.find('.dataTables_info').remove();
                        container.find('.dataTables_paginate').remove();

                        burstInitSingleDataTable(table, id);

                        container.find('.dataTables_length').appendTo( container.find('.burst-grid-controls') );
                        container.find('.dataTables_filter').appendTo( container.find('.burst-grid-controls') );
                        container.find('.dataTables_info').appendTo( container.find('.burst-grid-footer') );
                        container.find('.dataTables_paginate').appendTo( container.find('.burst-grid-footer') );
                    });

                } else {
                    let table = container.find('table').DataTable();
                    let rowCount = response.html.length;
                    for (let key in response.html) {
                        if (response.html.hasOwnProperty(key)) {
                            let row = $(response.html[key]);
                            //only redraw on last row
                            if (parseInt(key) >= (rowCount-1) ) {
                                table.row.add(row).draw();
                                table.page( lastSelectedPage ).draw( false )

                            } else {
                                table.row.add(row);
                            }
                        }
                    }
                }

                received += response.batch;
                if (response.total_rows > received) {
                    page++;
                    burstLoadDataTable(container, page , received);
                } else {
                    page = 1;
                }
            }
        });
    }

});