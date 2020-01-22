$(document).ready(function() {
    var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    var height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    var $scrollArea = $('.scroll-area'),
        bottomSpace = Math.floor(height*0.07),
        chartWidth = $scrollArea.width(),
        chartMargin = 0 - (chartWidth/2), //use this to center align the chart when it's position is set as fixed
        chartHeight = Math.floor(height);


    var chart1a, chart1b, chart2, chart3a, chart3b, chart3c, chart3d, chart4; 
    var clicked2, clicked3, clicked4, clicked5;
    var chart1Loaded, chart3Loaded, chart4Loaded;

    var labels = {};
    var dataNaturalized = [
        {name:"GenZ",y:3.3,color:"#FF9600"},
        {name:"Millennials",y:0},
        {name:"Generation X",y:0},
        {name:"Boomers",y:0},
        {name:"Hispanic average",y:0},
    ]; 
    var catNaturalized = [];
    for (var i = 0; i < dataNaturalized.length; i++){
        catNaturalized.push(dataNaturalized[i].name);
    }

    var dataLanguage = [
        {name:"Spanish", id:"Spanish", data:[61,0,0,0,0],color:"#F7DEBB"},
        {name:"English", id:"English", data:[38.6,0,0,0,0],color:"#FF9600"},
    ];
    var catLanguage = ["GenZ","Millennials","Generation X","Boomers","Hispanic average"];

    var dataGrowthNum = [
        [{name:"White", id:"White", data:[12.84,13.12,13.27,13.42,13.45,15.39,15.44,15.65,15.56,15.00,15.07,15.00,14.88,14.65,14.38,14.17,13.95],color:"#0089BD"}],
        [{name:"Black", id:"Black", data:[2.71,2.71,2.82,2.86,2.93,3.44,3.53,3.63,3.72,3.75,3.85,3.90,3.91,3.88,3.79,3.71,3.64],color:"#23C763"}],
        [{name:"Hispanic", id:"Hispanic", data:[2.43,2.52,2.61,2.66,2.58,2.97,3.08,3.25,3.48,4.01,4.32,4.51,4.67,4.75,4.86,4.91,5.01],color:"#FF9600"}],
        [{name:"Asian", id:"Asian", data:[0.50,0.53,0.61,0.62,0.65,0.78,0.77,0.77,0.76,0.90,0.88,0.91,0.93,0.96,0.99,0.99,1.03],color:"#E0B500"}],
    ];

    var dataGrowthNum2 = [
        [{name:"Total",id:"Total",data:[188.71,191.13,193.02,195.32,196.95,206.33,208.20,210.70,213.07,214.97,217.54,220.11,222.49,224.96,227.23,229.01,231.61],color:"#0089BD"}],
        [{name:"Hispanic",id:"Hispanic",data:[14.76,15.40,15.95,16.57,16.84,17.98,18.48,19.35,20.08,21.51,22.63,23.63,24.44,25.49,26.59,27.35,28.86],color:"#FF9600"}],
    ];

    var dataGrowthRate = [
        {name:"Total",id:"Total",y:22.73,color:"#0089BD"},
        {name:"Hispanic",id:"Hispanic",y:95.46,color:"#FF9600"},
    ];
    var catGrowthRate = [];
    for (var i = 0; i < dataGrowthRate.length; i++){
        catGrowthRate.push(dataGrowthRate[i].name);
    }

    var dataGrowthPct = [
        {name:"Others",id:"Others",data:[92.18,91.94,91.74,91.51,91.45,91.29,91.13,90.82,90.58,89.99,89.60,89.26,89.02,88.67,88.30,88.06,87.54],color:"#0089BD"},
        {name:"Hispanic",id:"Hispanic",data:[7.82,8.06,8.26,8.49,8.55,8.71,8.87,9.18,9.42,10.01,10.40,10.74,10.98,11.33,11.70,11.94,12.46],color:"#FF9600"},
    ];

    $(".scroll-text").css("padding-bottom", height);
    $(".chart-container").css({'width':chartWidth,'height':chartHeight});

    var stickyBox1 = new Waypoint.Sticky({
        element: $('#sticky-box-1')
    })
    var stickyBox2 = new Waypoint.Sticky({
        element: $('#sticky-box-2')
    })
    var stickyBox3 = new Waypoint.Sticky({
        element: $('#sticky-box-3')
    })    

    $("#scroll-text-1").waypoint(function(direction) {
        if (direction === "down") {
            $("#chart-wrapper-1").fadeTo(500, 1, makeChart1());
            chart1.get("naturalizedChart").points[0].update({dataLabels: labelstyle});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-2").waypoint(function(direction) {
        if (direction === "down") {
            chart1.get("naturalizedChart").points[1].update({y:12.1,dataLabels: labelstyle});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-3").waypoint(function(direction) {
        if (direction === "down") {
            chart1.get("naturalizedChart").points[2].update({y:33.1,dataLabels: labelstyle});
            chart1.get("naturalizedChart").points[3].update({y:41.3,dataLabels: labelstyle});
            chart1.get("naturalizedChart").points[4].update({y:22.9,dataLabels: labelstyle});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-4").waypoint(function(direction) {
        if (direction === "down") {
            stickyBox1.destroy();
            $("#sticky-box-1").addClass("is-bottom");
        } else {}
    }, {
        offset: "100%"
    });

    $("#scroll-text-5").waypoint(function(direction) {
        if (direction === "down") {
            $("#chart-wrapper-2").fadeTo(500, 1, makeChart2());
            chart2.get("English").points[0].update({dataLabels: labelstyle2});
            chart2.get("Spanish").points[0].update({dataLabels: labelstyle2});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-6").waypoint(function(direction) {
        if (direction === "down") {
            chart2.get("English").points[1].update({y:37.2,dataLabels: labelstyle2,color:"#0089BD"});
            chart2.get("Spanish").points[1].update({y:62.3,dataLabels: labelstyle2,color:"#B4D9EE"});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-7").waypoint(function(direction) {
        if (direction === "down") {
            chart2.get("English").points[2].update({y:30.4,dataLabels: labelstyle,color:"#0089BD"});
            chart2.get("Spanish").points[2].update({y:69.2,dataLabels: labelstyle,color:"#B4D9EE"});
            chart2.get("English").points[3].update({y:25.9,dataLabels: labelstyle,color:"#0089BD"});
            chart2.get("Spanish").points[3].update({y:73.5,dataLabels: labelstyle,color:"#B4D9EE"});
            chart2.get("English").points[4].update({y:32.7,dataLabels: labelstyle,color:"#0089BD"});
            chart2.get("Spanish").points[4].update({y:66.8,dataLabels: labelstyle,color:"#B4D9EE"});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-8").waypoint(function(direction) {
        if (direction === "down") {
            stickyBox2.destroy();
            $("#sticky-box-2").addClass("is-bottom");
        } else {}
    }, {
        offset: "100%"
    });

    $("#scroll-text-9").waypoint(function(direction) {
        if (direction === "down") {
            $("#chart-wrapper-3").fadeTo(500, 1, makeChart3a());
            chart3a.get("Total").points[0].update({dataLabels: labelstyle3});
            chart3a.get("Total").points[16].update({dataLabels: labelstyle4});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-10").waypoint(function(direction) {
        if (direction === "down") {
            chart3a.addSeries(dataGrowthNum2[1][0]);
            addLabel3a("Hispanic");
            chart3a.get("Hispanic").points[0].update({dataLabels: labelstyle5});
            chart3a.get("Hispanic").points[16].update({dataLabels: labelstyle6});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-11").waypoint(function(direction) {
        if (direction === "down") {
            chart3a.destroy();
            makeChart3b();
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-12").waypoint(function(direction) {
        if (direction === "down") {
            chart3b.destroy();
            makeChart3c();
            chart3c.get("Hispanic").points[0].update({dataLabels: labelstyle7});
            chart3c.get("Hispanic").points[16].update({dataLabels: labelstyle8});
            chart3c.get("Others").points[8].update({dataLabels: labelstyle9});
            chart3c.get("Hispanic").points[8].update({dataLabels: labelstyle10});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-13").waypoint(function(direction) {
        if (direction === "down") {
            chart3c.destroy();
            makeChart3d();
            chart3d.addSeries(dataGrowthNum[1][0]);
            addLabel3d("Black");
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-14").waypoint(function(direction) {
        if (direction === "down") {
            chart3d.addSeries(dataGrowthNum[2][0]);
            chart3d.addSeries(dataGrowthNum[3][0]);
            addLabel3d("Hispanic");
            addLabel3d("Asian");
            chart3d.get("Hispanic").graph.animate({"stroke-width":3});
        } else {}
    }, {
        offset: "50%"
    });


    $("#scroll-text-15").waypoint(function(direction) {
        if (direction === "down") {
            stickyBox3.destroy();
            $("#sticky-box-3").addClass("is-bottom");
        } else {}
    }, {
        offset: "100%"
    });

    var labelstyle ={
        enabled: true,
        allowOverlap: true,
        format: '{point.y}%',
        style:{
            fontSize: '14px',
            fontWeight: '600',
            color: '#333',
            textOutline: false,
        },
    };

    var labelstyle2 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{series.name}<br>{point.y}%',
        style:{
            fontSize: '14px',
            fontWeight: '600',
            color: '#333',
            textOutline: false,
            textAlign: "center",
        },
    };

    var labelstyle3 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.x}<br>{point.y:.1f}mil',
        y: 10,
        x:15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#B4D9EE',
        backgroundColor: '#fff',
        shape: 'callout',
        verticalAlign: 'top',
        style:{
            fontSize: '11px',
            fontWeight: '600',
            color: '#0089BD',
            textAlign: "center",
        },
    };

    var labelstyle4 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.x}<br>{point.y:.1f}mil',
        y: 10,
        x:-10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#B4D9EE',
        backgroundColor: '#fff',
        shape: 'callout',
        verticalAlign: 'top',
        style:{
            fontSize: '11px',
            fontWeight: '600',
            color: '#0089BD',
            textAlign: "center",
        },
    };

    var labelstyle5 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.y:.1f}mil',
        y: -10,
        x:15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#F7DEBB',
        backgroundColor: '#fff',
        shape: 'callout',
        style:{
            fontSize: '11px',
            fontWeight: '600',
            color: '#D17A00',
            textAlign: "center",
        },
    };

    var labelstyle6 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.y:.1f}mil',
        y: -10,
        x:-10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#F7DEBB',
        backgroundColor: '#fff',
        shape: 'callout',
        style:{
            fontSize: '11px',
            fontWeight: '600',
            color: '#D17A00',
            textAlign: "center",
        },
    };

    var labelstyle7 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.x}<br>{point.y:.1f}%',
        y: -10,
        x:15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#F7DEBB',
        backgroundColor: '#fff',
        shape: 'callout',
        style:{
            fontSize: '11px',
            fontWeight: '600',
            color: '#D17A00',
            textAlign: "center",
        },
    };

    var labelstyle8 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.x}<br>{point.y:.1f}%',
        y: -10,
        x:-10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#F7DEBB',
        backgroundColor: '#fff',
        shape: 'callout',
        style:{
            fontSize: '11px',
            fontWeight: '600',
            color: '#D17A00',
            textAlign: "center",
        },
    };

    var labelstyle9 ={
        enabled: true,
        allowOverlap: true,
        format: '{series.name}',
        y: 200,
        style:{
            fontSize: '12px',
            fontWeight: 'normal',
            color: '#333',
            textOutline: false,
        },
    };

    var labelstyle10 ={
        enabled: true,
        allowOverlap: true,
        format: '{series.name}',
        y: 25,
        style:{
            fontSize: '12px',
            fontWeight: 'normal',
            color: '#333',
            textOutline: false,
        },
    };

    function addLabel3a(id){
        var siri = chart3a.get(id);
        var length = siri.points.length;
        var point = siri.points[length-1];
        labels[id] = chart3a.renderer.text(siri.name, point.plotX + chart3a.plotLeft + 5,point.plotY + chart3a.plotTop + 5)
        .attr({zIndex: 5,})
        .add();
    }

    function addLabel3d(id){
        var siri = chart3d.get(id);
        var length = siri.points.length;
        var point = siri.points[length-1];
        labels[id] = chart3d.renderer.text(siri.name, point.plotX + chart3d.plotLeft + 5,point.plotY + chart3d.plotTop + 5)
        .attr({zIndex: 5,})
        .add();
    }

    function makeChart1() {
        chart1 = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-1',
                type: 'column',
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {
                categories: catNaturalized,
                labels: {style:{fontSize: '12px'}}
            },  
            yAxis: {
                title: {text: 'Percentage of eligible voters (in millions)'},
                endOnTick: false,
                max:50,
                labels: {style:{fontSize: '12px'}}
            },
            credits: {enabled: false},
            legend: {enabled: false},
            tooltip: {enabled: false},
            plotOptions: {
                series:{
                    borderWidth: 0,
                    groupPadding: 0.05,
                    pointPadding: 0,
                    stickyTracking: false,
                    dataLabels: {enabled: false},
                },
            },    
            series: [{
                name:"naturalizedChart",
                id:"naturalizedChart",
                color:"#0089BD",
                data: dataNaturalized
            }],
        });
    }

    function makeChart2() {
        chart2 = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-2',
                type: 'bar',
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {
                categories: catLanguage,
                labels: {style:{fontSize: '12px'}}
            },  
            yAxis: {
                title: {text: 'Percentage of eligible voters'},
                endOnTick: false,
                labels: {style:{fontSize: '12px'}}
            },
            credits: {enabled: false},
            legend: {enabled: false},
            tooltip: {enabled: false},
            plotOptions: {
                bar: {
                    stacking: 'normal',
                    dataLabels: {enabled: false}
                },
                series:{
                    borderWidth: 0,
                    groupPadding: 0.05,
                    pointPadding: 0,
                    stickyTracking: false,
                },
            },    
            series: dataLanguage
        });
    }

    function makeChart3a() {
        chart3a = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-3',
                type: 'line',
                marginRight: 70
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {
                endOnTick: false,
                labels: {style:{fontSize: '12px'}},
                tickPositions: [2005, 2010, 2015],
            },  
            yAxis: {
                title: {text: 'Number of eligible voters'},
                endOnTick: true,
                labels: {style:{fontSize: '12px'}},
                min: 0,
            },
            credits: {enabled: false},
            legend: {enabled: false},
            tooltip: {enabled: true},
            plotOptions: {
                series:{
                    dataLabels: {enabled: false},
                    pointStart: 2001,
                    marker: {enabled: false},
                },
            },    
            series: dataGrowthNum2[0]
        });
        addLabel3a('Total');
    }

    function makeChart3b() {
        chart3b = new Highcharts.Chart({
            chart: {
                height: 200,
                renderTo: 'chart-3',
                type: 'bar',
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {
                categories: catGrowthRate,
                labels: {style:{fontSize: '12px'}},
            },  
            yAxis: {
                title: {text: 'Growth rate'},
                endOnTick: false,
                labels: {style:{fontSize: '12px'}}
            },
            credits: {enabled: false},
            legend: {enabled: false},
            tooltip: {enabled: false},
            plotOptions: {
                series:{
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%',
                        style:{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            textOutline: false,
                        },
                    },
                    borderWidth: 0,
                    groupPadding: 0.05,
                    pointPadding: 0,
                    stickyTracking: false,
                },
            },    
            series: [{
                name:"growthRateChart",
                id:"growthRateChart",
                color:"#0089BD",
                data: dataGrowthRate
            }],
        });
    }

    function makeChart3c() {
        chart3c = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-3',
                type: 'area',
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {
                labels: {style:{fontSize: '12px'}},
                tickPositions: [2005, 2010, 2015],
            },  
            yAxis: {
                title: {text: 'Share of total voters'},
                endOnTick: false,
                labels: {style:{fontSize: '12px'}}
            },
            credits: {enabled: false},
            legend: {enabled: false},
            tooltip: {enabled: false},
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {enabled:false}
                },
                series:{
                    pointStart: 2001,
                    dataLabels: {enabled: false,},
                },
            },    
            series: dataGrowthPct,
        });
    }

    function makeChart3d() {
        chart3d = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-3',
                type: 'line',
                marginRight: 70
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {
                endOnTick: false,
                labels: {style:{fontSize: '12px'}},
                tickPositions: [2005, 2010, 2015],
            },  
            yAxis: {
                title: {text: 'Number of eligible voters'},
                endOnTick: true,
                labels: {style:{fontSize: '12px'}},
                min: 0,
            },
            credits: {enabled: false},
            legend: {enabled: false},
            tooltip: {enabled: true},
            plotOptions: {
                series:{
                    dataLabels: {enabled: false},
                    pointStart: 2001,
                    marker: {enabled: false},
                },
            },    
            series: dataGrowthNum[0]
        });
        addLabel3d('White');
    }
   
});     