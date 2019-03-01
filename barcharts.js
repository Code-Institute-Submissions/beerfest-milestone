queue()
        .defer(d3.json, "data/consumption.json")
        .await(makeGraphs);
    function makeGraphs(error, consumptionData) {
        
        var ndx = crossfilter(consumptionData);
        
        var name_dim = ndx.dimension(dc.pluck('name'));
        var consumption_by_person = name_dim.group().reduceSum(dc.pluck('consumption'));
        var total_chart = dc.barChart('#personal-chart');
        total_chart
            .width(500)
            .height(300)
            .dimension(name_dim)
            .group(consumption_by_person)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal);
        
        var ndx = crossfilter(consumptionData);
        var pub_dim = ndx.dimension(dc.pluck('pub'));
        var consumption_by_pub = pub_dim.group().reduceSum(dc.pluck('consumption'));
        var total_chart = dc.barChart('#pub-chart');
        total_chart
            .width(500)
            .height(300)
            .dimension(pub_dim)
            .group(consumption_by_pub)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal);
        
        var ndx = crossfilter(consumptionData);
        var beer_dim = ndx.dimension(dc.pluck('beer'));
        var consumption_by_beer = beer_dim.group().reduceSum(dc.pluck('consumption'));
        var total_chart = dc.barChart('#beer-chart');
        total_chart
            .width(500)
            .height(300)
            .dimension(beer_dim)
            .group(consumption_by_beer)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal);
            
        
        dc.renderAll();
    }
    