queue()
        .defer(d3.json, "data/consumption.json")
        .await(makeGraphs);
    function makeGraphs(error, consumptionData) {
        var ndx = crossfilter(consumptionData);
        var parseDate = d3.time.format("%m/%d/%Y").parse;
        consumptionData.forEach(function(d){
            d.date = parseDate(d.date);
        });
        var date_dim = ndx.dimension(dc.pluck('date'));
        var minDate = date_dim.bottom(1)[0].date;
        var maxDate = date_dim.top(1)[0].date;
        function consumption_by_name(name) {
            return function(d) {
                if (d.name === name) {
                    return +d.consumption;
                } else {
                    return 0;
                }
            }
        }
        
        var ralphConsumptionByDay = date_dim.group().reduceSum(consumption_by_name('Ralph'));
        var jemmaConsumptionByDay = date_dim.group().reduceSum(consumption_by_name('Jemma'));
        var jamesConsumptionByDay = date_dim.group().reduceSum(consumption_by_name('James'));
        var lilyConsumptionByDay = date_dim.group().reduceSum(consumption_by_name('Lily'));
        var compositeChart = dc.compositeChart('#composite-chart');
        compositeChart
            .width(1700)
            .height(400)
            .dimension(date_dim)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .yAxisLabel("Consumption")
            .legend(dc.legend().x(80).y(12).itemHeight(13).gap(2))
            .renderHorizontalGridLines(true)
            
            .compose([
                dc.lineChart(compositeChart)
                    .colors('green')
                    .group(ralphConsumptionByDay, 'Ralph'),
                dc.lineChart(compositeChart)
                    .colors('red')
                    .group(jemmaConsumptionByDay, 'Jemma'),
                dc.lineChart(compositeChart)
                    .colors('blue')
                    .group(jamesConsumptionByDay, 'James'),
                dc.lineChart(compositeChart)
                    .colors('orange')
                    .group(lilyConsumptionByDay, 'Lily')
            ])
            .brushOn(false)
            .render();
        dc.renderAll();
    }