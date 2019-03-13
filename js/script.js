function maxValue(dataset, key) {
    var highestVal = dataset[0][key];
    for( var i = 0; i < dataset.length; i++ ){
        if( highestVal < dataset[i][key] ){
            highestVal = dataset[i][key];
        }
    }
    return highestVal;
}

var maxKills = maxValue(jamesBond, 'kills');

var svgContainer = d3.select('.graph');

var lines = svgContainer.selectAll('line')
.data(jamesBond, function(d) { return d ? d.name : this.id; })
    .enter()
    .append('line')
    .attr('x1', function(d, i){
        return 750 / jamesBond.length * i + 50;
    })
    .attr('y1', function(d, i){
        return 700 / maxKills * (maxKills - d.kills) + 100;
    })
    .attr('x2', function(d, i){
        return d.explicitly / d.slept * 750 + 50;
    })
    .attr('y2', 50)
    .style('stroke-width', 2)
    .style('stroke', function(d, i){
        return 'rgb('+(255/maxKills*d.kills+100)+',100,100)';
    });
    
var circles = svgContainer.selectAll('circle')
.data(jamesBond, function(d) { return d ? d.name : this.id; })
.enter()
.append('circle')
.attr('cx', function(d, i){
    return 750 / jamesBond.length * i + 50;
})
.attr('cy', function(d, i){
    return 700 / maxKills * (maxKills - d.kills) + 100;
})
.attr('r', 4)
.attr('data-kills', function(d, i){
    return d.kills;
})
.attr('data-year', function(d, i){
    return d.year;
})
.attr('data-explicit', function(d, i){
    return (d.explicitly / d.slept * 100).toFixed(0);
})
.style('fill', function(d, i){
    return 'rgb('+(255/maxKills*d.kills+100)+',100,100)';
});