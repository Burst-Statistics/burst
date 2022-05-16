jQuery(document).ready(function ($) {
    'use strict';

    let date_range = 'Last 7 days'; //default selected date range

    /**
     * Generate a ChartJS in the element canvas.
     * @param date_start
     * @param date_end
     */

    function burstInitChartJS(date_start, date_end) {
        date_start = parseInt($('input[name=burst_date_start]').val());
        date_end = parseInt($('input[name=burst_date_end]').val());
        let style = getComputedStyle(document.body);
        let pageviews_color = style.getPropertyValue('--rsp-yellow');
        let visitors_color = style.getPropertyValue('--rsp-blue');
        let text_color = style.getPropertyValue('--rsp-text-color');
        let chartExtraData = [];
        Chart.defaults.font.size = 12;
        Chart.defaults.color = style.getPropertyValue('--rsp-text-color');
        let titleDisplay = false;
        let legend = true;

        let insightsConfig = {
            type: 'line',
            beginAtZero: true,
            data: {
                datasets: [{
                    label: burstLocalizeString('Unique visitors'),
                    borderColor: visitors_color,
                    backgroundColor: visitors_color,

                },
                {
                    label: burstLocalizeString('Pageviews'),
                    borderColor: pageviews_color,
                    backgroundColor: pageviews_color,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cubicInterpolationMode: 'monotone',
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 13,
                                weight: 400,
                            },
                        },
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                let dates = chartExtraData.dates;
                                let number = context['0']['dataIndex'];
                                return dates[number];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            maxTicksLimit: 6,
                        }
                    },
                    x: {
                        ticks: {
                            maxTicksLimit: 8,
                        }
                    }
                },
                layout: {
                    padding: 0,
                }
            }
        };

        let ctx = document.getElementsByClassName('burst-chartjs-stats');
        if ( window.insightsGraph != undefined ) {
            window.insightsGraph.destroy();
        }
        window.insightsGraph = new Chart(ctx, insightsConfig);

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
                date_range: date_range,
            },
            success: function (response) {

                if (response.success == true) {

                    let i = 0;
                    response.data.datasets.forEach(function (dataset) {
                        if (insightsConfig.data.datasets.hasOwnProperty(i)) {
                            insightsConfig.data.datasets[i] = dataset;
                        } else {
                            let newDataset = dataset;
                            insightsConfig.data.datasets.push(newDataset);
                        }

                        i++;
                    });

                    insightsConfig.data.labels = response.data.labels;
                    chartExtraData.dates = response.data.dates;
                    window.insightsGraph.update();
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
        let yesterdayStart = moment().endOf('day').subtract(2, 'days').add(1, 'minutes');
        let yesterdayEnd = moment().endOf('day').subtract(1, 'days');
        let strYesterday = burstLocalizeString('Yesterday');
        let strLast7 = burstLocalizeString('Last 7 days');
        let strLast30 = burstLocalizeString('Last 30 days');
        let strLast90 = burstLocalizeString('Last 90 days');
        let strPreviousMonth = burstLocalizeString('Last Month') + ' (' +moment().subtract(1, 'month').format('MMMM') + ')';
        let ranges = {}
        ranges[strYesterday] = [yesterdayStart, yesterdayEnd];
        ranges[strLast7] = [moment(yesterdayEnd).subtract(6, 'days').startOf('day'), yesterdayEnd];
        ranges[strLast30] = [moment(yesterdayEnd).subtract(29, 'days').startOf('day'), yesterdayEnd];
        ranges[strLast90] = [moment(yesterdayEnd).subtract(89, 'days').startOf('day'), yesterdayEnd];
        ranges[strPreviousMonth] = [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')];

        // Default date range for the datepicker
        // This time still has a timezone and is needed to display the correct date in the datepicker
        let momentStart = moment(yesterdayEnd).subtract(6, 'days').startOf('day');
        let momentEnd = yesterdayEnd;

        $('.burst-compare-days-number').html(Math.abs(momentStart.diff(momentEnd, 'days'))+1);

        burstUpdateDate(momentStart, momentEnd);
        // We need the utc time instead of user time (with timezone offset)
        let startUnixUtc = momentStart.unix() + momentStart.utcOffset() * 60;
        let endUnixUtc = momentEnd.unix() + momentEnd.utcOffset() * 60;
        // On the server side we will adjust the time to the time + wordpress offset
        // This way on the front end the datepicker shows the correct date for the corresponding data
        // All the data will be shown in the wordpress timezone

        $('input[name=burst_date_start]').val(startUnixUtc);
        $('input[name=burst_date_end]').val(endUnixUtc);

        burstLoadGridBlocks();
        burstInitChartJS();
        $('.burst-date-container.burst-date-range').daterangepicker(
            {
                ranges: ranges,
                "locale": {
                    "format": burstLocalizeString("date_format"),
                    "separator": " - ",
                    "applyLabel": burstLocalizeString("Apply"),
                    "cancelLabel": burstLocalizeString("Cancel"),
                    "fromLabel": burstLocalizeString("From"),
                    "toLabel": burstLocalizeString("To"),
                    "customRangeLabel": burstLocalizeString("Custom"),
                    "weekLabel": burstLocalizeString("W"),
                    "daysOfWeek": [
                        burstLocalizeString("Su"),
                        burstLocalizeString("Mo"),
                        burstLocalizeString("Tu"),
                        burstLocalizeString("We"),
                        burstLocalizeString("Th"),
                        burstLocalizeString("Fr"),
                        burstLocalizeString("Sa"),
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
                startDate: momentStart,
                endDate: momentEnd,
                "opens": "left",
                maxDate: yesterdayEnd,
            }, function (momentStart, momentEnd, label) {
                date_range = burst_unLocalizeString(label);
                burstUpdateDate(momentStart, momentEnd);
                let startUnixUtc = momentStart.unix() + momentStart.utcOffset() * 60;
                let endUnixUtc = momentEnd.unix() + momentEnd.utcOffset() * 60;

                $('input[name=burst_date_start]').val(startUnixUtc);
                $('input[name=burst_date_end]').val(endUnixUtc);
                burstInitChartJS();
                $('.burst-compare-days-number').html(Math.abs(momentStart.diff(momentEnd, 'days'))+1);
                burstLoadGridBlocks();
                window.burstLoadAjaxTables();
            });
    }

    function burstLoadGridBlocks(){
        $('.burst-load-ajax').each(function(){
            let gridContainer = $(this);
            // if there is no skeleton add a skeleton
            if ( gridContainer.find('.burst-skeleton').length === 0 ) {
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
                    date_range: date_range,
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
        burstLocalizeString("date_format")
        $('.burst-date-container span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    /**
     * DataTables javascript
     */
    let burstDefaultRowCount = 10;
    let burstDefaultPagingType = 'simple_numbers';
    let lastSelectedPage = 0;
    $.fn.DataTable.ext.pager.numbers_length = 5;

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
                table.columns.adjust().draw();
            }
        });
    }

    /**
     * Ajax loading of tables
     */

    window.burstLoadAjaxTables = function() {
        $('.burst-grid-datatable').each(function(){
            let skeleton = $(this).find('.burst-skeleton');
            if (skeleton.css('display') === 'none') {
                $(this).find('.burst-datatable').fadeOut(200, function() {
                    skeleton.fadeIn(300);
                });
            }
            burstLoadDataTable( $(this), $(this).data('id'), 1, 0);
        });
    };

    window.burstLoadAjaxTables();
    
    function burstInitSingleDataTable(table, id) {
        let pageLength = burstDefaultRowCount;
        let pagingType = burstDefaultPagingType;

        table.DataTable({
            "id": id,
            "pageLength": pageLength,
            "pagingType": pagingType,
            "conditionalPaging": true,
            "autoWidth": true,
            "info": false,
            "lengthChange": true,
            "language": {
                "paginate": {
                    "previous": burstLocalizeString('Previous'),
                    "next": burstLocalizeString('Next'),
                },
                "sLengthMenu": "_MENU_",
                "searchPlaceholder": burstLocalizeString('Search'),
                "search": "",
                "zeroRecords": burstLocalizeString('No matching records found'),
                "emptyTable": burstLocalizeString('No data found'),
            },
            "order": [[ 1, "desc" ]],
        });



        table.on( 'page.dt', function () {
            let table = $(this).closest('table').DataTable();
            let info = table.page.info();
            lastSelectedPage = info.page;
        } );
    }


    function burstLoadDataTable(container, id, page, received){
        if(page===1) container.html(burst.skeleton);
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
                date_range: date_range,
                // token  : burst.token
            }),
            success: function (response) {
                //this only on first page of table
                if (page===1){

                    let table = container.find('table');

                    container.find('.burst-skeleton').fadeOut(300, function() {
                        table.hide().html(response.html).fadeIn(200);
                        table.DataTable().destroy();
                        container.find('.dataTables_filter').remove();
                        container.find('.dataTables_paginate').remove();
                        container.find('.dataTables_length').remove();

                        burstInitSingleDataTable(table, id);

                        container.find('.dataTables_filter').appendTo( container.find('.burst-grid-controls') );
                        container.find('.dataTables_paginate').appendTo( container.find('.burst-grid-footer') );
                        container.find('.dataTables_length').appendTo( container.find('.burst-grid-footer') );
                        container.find('.burst-datatable').css('display', 'block');

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