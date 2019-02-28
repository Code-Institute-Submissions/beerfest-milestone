queue()
        .defer(d3.json, "data/consumption.json")
        .await(makeGraphs);
    function makeGraphs(error, transactionsData) {
        
        var ndx = crossfilter(transactionsData);
        
        var name_dim = ndx.dimension(dc.pluck('name'));
        var total_spend_by_person = name_dim.group().reduceSum(dc.pluck('consumption'));
        var total_chart = dc.barChart('#bar-chart');
        total_chart
            .width(500)
            .height(300)
            .dimension(name_dim)
            .group(total_spend_by_person)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal);
            var ndx = crossfilter(transactionsData);
        
        var pub_dim = ndx.dimension(dc.pluck('pub'));
        var total_spend_by_pub = pub_dim.group().reduceSum(dc.pluck('consumption'));
        var total_chart = dc.barChart('#bar-chart2');
        total_chart
            .width(500)
            .height(300)
            .dimension(pub_dim)
            .group(total_spend_by_pub)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal);
            var ndx = crossfilter(transactionsData);
        
        var beer_dim = ndx.dimension(dc.pluck('beer'));
        var total_spend_by_beer = beer_dim.group().reduceSum(dc.pluck('consumption'));
        var total_chart = dc.barChart('#bar-chart3');
        total_chart
            .width(500)
            .height(300)
            .dimension(beer_dim)
            .group(total_spend_by_beer)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal);
        dc.renderAll();
    }
    