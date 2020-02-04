$(document).ready(function() {
    var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    var height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    var $scrollArea = $('.scroll-area'),
        chartWidth = $scrollArea.width(),
        chartHeight = Math.floor(height);

    var chart1, chart1b, chart2, chart3, chart4, chart5; 
    var chart1Loaded, chart1bLoaded, chart2Loaded, chart3Loaded, chart4Loaded, chart5Loaded;
    var labels = {};
    var dataNaturalized = [
        {name:"*15-20",y:95.1,color:"#FF9600"},
        {name:"21-36",y:0,color:"#F7DEBB"},
        {name:"37-52",y:0,color:"#F7DEBB"},
        {name:"53-71",y:0,color:"#F7DEBB"},
    ]; 
    var catNaturalized = [];
    for (var i = 0; i < dataNaturalized.length; i++){
        catNaturalized.push(dataNaturalized[i].name);
    }

    var dataLanguage = [
        {name:"Spanish", id:"Spanish", data:[61,62.3,69.2,73.5],color:"#F7DEBB"},
        {name:"English", id:"English", data:[38.6,37.2,30.4,25.9],color:"#FF9600"},
    ];

    var dataGrowthPct = [
        {name:"Latino",id:"Latino",data:[7.82,8.06,8.26,8.49,8.55,8.71,8.87,9.18,9.42,10.01,10.40,10.74,10.98,11.33,11.70,11.94,null,null,null,null],color:"#FF9600", fill:1},      
        {name:"Black",id:"Black",data:[11.24,11.29,11.40,11.44,11.50,11.86,11.91,11.99,12.07,12.20,12.27,12.30,12.36,12.44,12.46,12.47,null,null,null,null],color:"#23C763"},
        {name:"Asian",id:"Asian",data:[2.70,2.90,3.07,3.16,3.26,3.32,3.35,3.38,3.47,3.68,3.74,3.85,4.00,4.13,4.22,4.30,null,null,null,null],color:"#E0B500"},
        {name:"White",id:"White",data:[76.24,75.78,75.46,75.10,74.77,74.15,73.85,73.37,72.91,71.86,71.31,70.76,70.22,69.64,69.08,68.67,null,null,null,null],color:"#0089BD"},
    ];

    var dataGrowthPct2 = [
        [12.46,12.77,13.04,13.30],
        [12.47,12.50,12.50,12.50],
        [4.42,4.54,4.62,4.70],
        [67.95,67.42,67.06,66.70],
    ];

    var dataStatesNon = ["AL","AK","AR","CA","CO","CT","DE","DC","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MN","MS","MO","MT","NE","NJ","NY","NC","ND","OH","OK","OR","RI","SC","SD","TN","UT","VT","VA","WA","WV","WY"];
    var stateRed = ["TX","FL","PA","AZ","MI","WI"];
    var stateBlue = ["NM","NV","NH"];

    var catAge = ["*16-20","21-35","36-50","51-65","66-80","81-100"];
    var dataAge = [
        {name:"Latino voters",id:"Latino",data:[-14.1,-33.6,-23.9,-17.9,-8.2,-2.3],color:"#FF9600"},      
        {name:"All voters",id:"National",data:[8.5,25,22.6,24.4,15.1,4.4],color:"#0089BD"},  
    ];

    var dataTurnout = [
        {name:"Presidential",id:"National-presidential",color:"#78BBE0",
            data :[
                [Date.UTC(1996,0,1),58.4],
                [Date.UTC(2000,0,1),59.5],
                [Date.UTC(2004,0,1),63.8],
                [Date.UTC(2008,0,1),63.6],
                [Date.UTC(2012,0,1),61.8],
                [Date.UTC(2016,0,1),61.4],
                ]
        },
        {name:"Midterm",id:"National-midterm",color:"#0089BD",
            data :[
                [Date.UTC(1994,0,1),48.4],
                [Date.UTC(1998,0,1),45.3],
                [Date.UTC(2002,0,1),46.1],
                [Date.UTC(2006,0,1),47.8],
                [Date.UTC(2010,0,1),45.5],
                [Date.UTC(2014,0,1),41.9],
                [Date.UTC(2018,0,1),null],
                ],
            lineWidth:4,
        },
    ];
    var dataTurnoutLatino = [
        {name:"Presidential",id:"Latino-presidential",color:"#F7DEBB",
        data :[
            [Date.UTC(1996,0,1),44.0],
            [Date.UTC(2000,0,1),44.3],
            [Date.UTC(2004,0,1),47.2],
            [Date.UTC(2008,0,1),49.9],
            [Date.UTC(2012,0,1),48.0],
            [Date.UTC(2016,0,1),47.6],
            ]
    },
        {name:"Midterm",id:"Latino-midterm",color:"#FF9600",
        data :[
            [Date.UTC(1994,0,1),34.4],
            [Date.UTC(1998,0,1),32.8],
            [Date.UTC(2002,0,1),30.4],
            [Date.UTC(2006,0,1),32.3],
            [Date.UTC(2010,0,1),31.2],
            [Date.UTC(2014,0,1),27.0],
            [Date.UTC(2018,0,1),null],
            ],
            lineWidth:4,
        },
    ];

    $(".scroll-text").css("padding-bottom", height);
    $(".chart-container").css({'width':chartWidth,'height':chartHeight});

    var stickyBox1 = new Waypoint.Sticky({element: $('#sticky-box-1')});
    var stickyBox2 = new Waypoint.Sticky({element: $('#sticky-box-2')});
    var stickyBox4 = new Waypoint.Sticky({element: $('#sticky-box-4')}); 
    var stickyBox5 = new Waypoint.Sticky({element: $('#sticky-box-5')});  
    
    $("#start-text-1").waypoint(function(direction) {
        if (direction === "down") {
            if(chart1Loaded == 1){} else {
                $("#chart-wrapper-1").fadeTo(500, 1, makeChart1());
                chart1.get("Latino").points[15].update({dataLabels: labelstyle1_1});
                chart1.get("Black").points[15].update({dataLabels: labelstyle1_2});
                chart1.get("Asian").points[15].update({dataLabels: labelstyle1_3});
                chart1.get("White").points[15].update({dataLabels: labelstyle1_4});
                chart1.get("Latino").points[0].update({dataLabels: labelstyle2_1});
                chart1.get("Black").points[0].update({dataLabels: labelstyle2_2});
                chart1.get("Asian").points[0].update({dataLabels: labelstyle2_3});
                chart1.get("White").points[0].update({dataLabels: labelstyle2_4});
            }
            chart1Loaded = 1;
        } else {}
    });

    $("#scroll-text-2").waypoint(function(direction) {
        if (direction === "down") {
            for (i=0; i < 2; i += 1) {
                var num = 16+i;
                chart1.get("Latino").points[num].update({y:dataGrowthPct2[0][i]});
            }
            for (i=0; i < 2; i += 1) {
                var num = 16+i;
                chart1.get("Black").points[num].update({y:dataGrowthPct2[1][i]});
            }
            for (i=0; i < 2; i += 1) {
                var num = 16+i;
                chart1.get("Asian").points[num].update({y:dataGrowthPct2[2][i]});
            }
            for (i=0; i < 2; i += 1) {
                var num = 16+i;
                chart1.get("White").points[num].update({y:dataGrowthPct2[3][i]});
            }  
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-3").waypoint(function(direction) {
        if (direction === "down") {
            for (i=2; i < 4; i += 1) {
                var num = 16+i;
                chart1.get("Latino").points[num].update({y:dataGrowthPct2[0][i]});
            }
            for (i=2; i < 4; i += 1) {
                var num = 16+i;
                chart1.get("Black").points[num].update({y:dataGrowthPct2[1][i]});
            }
            for (i=2; i < 4; i += 1) {
                var num = 16+i;
                chart1.get("Asian").points[num].update({y:dataGrowthPct2[2][i]});
            }
            for (i=2; i < 4; i += 1) {
                var num = 16+i;
                chart1.get("White").points[num].update({y:dataGrowthPct2[3][i]});
            }
            chart1.get("Latino").points[19].update({dataLabels: labelstyle1_6});
            chart1.get("Black").points[19].update({dataLabels: labelstyle1_6});
            chart1.get("Asian").points[19].update({dataLabels: labelstyle1_7});
            chart1.get("White").points[19].update({dataLabels: labelstyle1_8});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-4").waypoint(function(direction) {
        if (direction === "down") {
            $("#sticky-box-1").animate({opacity: 0},1000);
        } else {
            $("#sticky-box-1").animate({opacity: 1},1000);
        }
    }, {
        offset: "100%"
    });

    $("#sticky-box-1b").waypoint(function(direction) {
        if (direction === "down") {
            if(chart1bLoaded == 1){} else {
                $("#chart-wrapper-1b").fadeTo(500, 1, makeChart1b());
            }
            chart1bLoaded = 1;
        } else {}
    }, {
        offset: "50%"
    });

    $("#start-text-5").waypoint(function(direction) {
        if (direction === "down") {
            if(chart5Loaded == 1){} else {
                $("#chart-wrapper-5").fadeTo(500, 1, makeChart5());
                addLabel("National-midterm","2014<br>Midterm",5);
                addLabel("National-presidential","2016<br>Presidential",5);
            }
            chart5Loaded = 1;
        } else {}
    });

    $("#scroll-text-16").waypoint(function(direction) {
        if (direction === "down") {
            chart5.addSeries(dataTurnoutLatino[0]);
            chart5.addSeries(dataTurnoutLatino[1]);
            addLabel("Latino-midterm","Midterm",5);
            addLabel("Latino-presidential","Presidential",5);
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-17").waypoint(function(direction) {
        if (direction === "down") {
            labels["National-midterm"].destroy();
            labels["Latino-midterm"].destroy();
            chart5.get("National-midterm").points[6].update({y:53.4});
            chart5.get("Latino-midterm").points[6].update({y:40.4});
            addLabel2("National-midterm",5);
            addLabel2("Latino-midterm",5);
            addLabel("National-midterm","Midterm",6);
            addLabel("Latino-midterm","Midterm",6);
            colorLabel("National-presidential");
            colorLabel("Latino-presidential");
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-8").waypoint(function(direction) {
        if (direction === "down") {
            $("#sticky-box-5").animate({opacity: 0},1000);
        } else {
            $("#sticky-box-5").animate({opacity: 1},1000);
        }
    }, {
        offset: "100%"
    });


    $("#start-text-15").waypoint(function(direction) {
        if (direction === "down") {
            if(chart2Loaded == 1){} else {
                $("#chart-wrapper-2").fadeTo(500, 1, makeChart2());
                chart2.get("naturalizedChart").points[0].update({dataLabels: labelstyle});
            }
            chart2Loaded = 1;
        } else {}
    });

    $("#scroll-text-6").waypoint(function(direction) {
        if (direction === "down") {
            chart2.get("naturalizedChart").points[1].update({y:86.0,dataLabels: labelstyle});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-7").waypoint(function(direction) {
        if (direction === "down") {
            chart2.get("naturalizedChart").points[2].update({y:65.2,dataLabels: labelstyle});
            chart2.get("naturalizedChart").points[3].update({y:57.2,dataLabels: labelstyle});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-18").waypoint(function(direction) {
        if (direction === "down") {
            $("#sticky-box-2").animate({opacity: 0},1000);
        } else {
            $("#sticky-box-2").animate({opacity: 1},1000);
        }
    }, {
        offset: "100%"
    });

    $("#sticky-box-3").waypoint(function(direction) {
        if (direction === "down") {
            if(chart3Loaded == 1){} else {
                $("#chart-wrapper-3").fadeTo(500, 1, makeChart3());
                chart3.get("English").points[0].update({dataLabels: labelstyle2});
                chart3.get("Spanish").points[0].update({dataLabels: labelstyle2});
            }
            chart3Loaded = 1;
        } else {}
    }, {
        offset: "50%"
    });

    $("#start-text-9").waypoint(function(direction) {
        if (direction === "down") {
            if(chart4Loaded == 1){} else {
                if (width<500){
                    $('#chart-4').css({"height":230,"margin-bottom":90});
                    $('#legend-latino').css("opacity",0);
                    $('#legend-latino-mobile').css("opacity",1);
                    $("#chart-wrapper-4").fadeTo(500, 1, makeChart4());
                    chart4.get("latinoMap").update({pointPadding: 0.5, borderWidth: 0, dataLabels: {style:{fontSize: '7px'}}});
                } else {
                    $("#chart-wrapper-4").fadeTo(500, 1, makeChart4());
                }
            }
            chart4Loaded = 1;
        } else {}
    });

    $("#scroll-text-9").waypoint(function(direction) {
        if (direction === "down") {
            chart4.get("latinoMap").points[4].update({color: '#9e9e9e',dataLabels: labelstyle4});
            chart4.get("latinoMap").points[9].update({color: '#9e9e9e',dataLabels: labelstyle4});
            chart4.get("latinoMap").points[2].update({color: '#9e9e9e',dataLabels: labelstyle4});
            chart4.get("latinoMap").points[32].update({color: '#9e9e9e',dataLabels: labelstyle4});
            chart4.get("latinoMap").points[43].update({color: '#9e9e9e',dataLabels: labelstyle4});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-10").waypoint(function(direction) {
        if (direction === "down") {
            chart4.get("latinoMap").points[4].update({color: '#9b4500',dataLabels: labelstyle5});
            chart4.get("latinoMap").points[9].update({color: '#b75c00',dataLabels: labelstyle5});
            chart4.get("latinoMap").points[2].update({color: '#b75c00',dataLabels: labelstyle5});
            chart4.get("latinoMap").points[32].update({color: '#f18a00',dataLabels: labelstyle5});
            chart4.get("latinoMap").points[43].update({color: '#9b4500',dataLabels: labelstyle5});
            chart4.get("latinoMap").points[31].update({color: '#9e9e9e',dataLabels: labelstyle4});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-12").waypoint(function(direction) {
        if (direction === "down") {
            chart4.get("latinoMap").points[9].update({borderWidth: 0});
            for (i=0; i < dataStatesNon.length; i += 1) {
                chart4.get(dataStatesNon[i]).update({color:"#fff", dataLabels: labelstyle3},true,false);
            }
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-13").waypoint(function(direction) {
        if (direction === "down") {
            for (i=0; i < stateRed.length; i += 1) {
                chart4.get(stateRed[i]).update({color:"#DE0100", dataLabels: labelstyle4});
            }
            for (i=0; i < stateBlue.length; i += 1) {
                chart4.get(stateBlue[i]).update({color:"#031BBB", dataLabels: labelstyle4});
            }  
            if (width<500){
                $("#legend-latino-mobile").fadeTo(500, 0);
            }else{
                $("#legend-latino").fadeTo(500, 0);
            }
            $("#legend-swing").fadeTo(500, 1);
            $("#chart-title-4").fadeOut(500,function() {
                $("#chart-title-4b").fadeIn();
            });
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-14").waypoint(function(direction) {
        if (direction === "down") {
            $("#sticky-box-4").animate({opacity: 0},1000);
        } else {
            $("#sticky-box-4").animate({opacity: 1},1000);
        }
    }, {
        offset: "100%"
    });

    var labelstyle1_1 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.y:.1f}',
        y: 30,
        x:-17,
        style:{fontSize: '14px',fontWeight: '600',color: '#333',textAlign: "right",},
    };
    var labelstyle1_2 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.y:.1f}',
        y: 30,
        x:-17,
        style:{fontSize: '14px',fontWeight: '600',color: '#333',textAlign: "right",},
    };
    var labelstyle1_3 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.y:.1f}',
        y: 19,
        x:-14,
        style:{fontSize: '14px',fontWeight: '600',color: '#333',textAlign: "right",},
    };
    var labelstyle1_4 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.y:.1f}',
        y: 110,
        x:-17,
        style:{fontSize: '14px',fontWeight: '600',color: '#333',textAlign: "right",},
    };
    var labelstyle2_1 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{series.name} {point.y:.1f}',
        y:-5,
        x:-10,
        style:{fontSize: '14px',fontWeight: '600',color: '#333',textAlign: "left",},
    };
    var labelstyle2_2 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{series.name} {point.y:.1f}',
        y:37,
        x:-10,
        style:{fontSize: '14px',fontWeight: '600',color: '#333',textAlign: "left",},
    };
    var labelstyle2_3 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{series.name} {point.y:.1f}',
        y: 19,
        x:-10,
        style:{fontSize: '14px',fontWeight: '600',color: '#333',textAlign: "left",},
    };
    var labelstyle2_4 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{series.name} {point.y:.1f}',
        y: 110,
        x:-10,
        style:{fontSize: '14px',fontWeight: '600',color: '#333',textAlign: "left",},
    };
    var labelstyle1_6 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.y:.1f}',
        y: 34,
        x:-15,
        style:{fontSize: '14px',fontWeight: '600',color: '#333',textAlign: "right",},
    };
    var labelstyle1_7 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.y:.1f}',
        y: 19,
        x:-15,
        style:{fontSize: '14px',fontWeight: '600',color: '#333',textAlign: "right",},
    };
    var labelstyle1_8 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.y:.1f}',
        y: 110,
        x:-15,
        style:{fontSize: '14px',fontWeight: '600',color: '#333',textAlign: "right",},
    };
    var labelstyle ={
        enabled: true,
        allowOverlap: true,
        format: '{point.y:.1f}',
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
        format: '{series.name}<br>{point.y:.1f}',
        style:{
            fontSize: '14px',
            fontWeight: '600',
            color: '#333',
            textOutline: false,
            textAlign: "center",
        },
    };
    var labelstyle3 ={color: '#d3d3d3'};
    var labelstyle4 ={color: '#fff'};
    var labelstyle5 ={color: '#333'};

    function addLabel(id,cat,num){
        var siri = chart5.get(id);
        var length = siri.points.length;
        var point = siri.points[num];
        labels[id] = chart5.renderer.text(cat + " " + point.y, point.plotX + chart5.plotLeft + 5,point.plotY + chart5.plotTop + 5)
        .attr({zIndex: 5,})
        .css({fontSize: '14px',fontWeight: '600'})
        .add();
    }

    function addLabel2(id,num){
        var siri = chart5.get(id);
        var length = siri.points.length;
        var point = siri.points[num];
        labels[id] = chart5.renderer.text(point.y, point.plotX + chart5.plotLeft - 10,point.plotY + chart5.plotTop + 15)
        .attr({zIndex: 5})
        .css({color: "#bababa"})
        .add();
    }

    function colorLabel(id){
        labels[id].css({color: "#bababa"}).attr({zIndex: 1,});
    }

    function makeChart1() {
        chart1 = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-1',
                type: 'area',
                animation: {easing:"linear"},
                style: {
                    color:"#333",
                    fontFamily: 'Source Sans Pro,Helvetica Neue,Helvetica,Arial,sans-serif',
                },
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {
                labels: {style:{fontSize: '12px'}},
                tickPositions: [2001,2010,2016,2020],
                max:2020,
                plotBands: [{
                    color: 'rgba(255,255,255,0.3)',
                    from: 2018,
                    to: 2020,
                    zIndex: 5,
                }],
                plotLines: [{
                    color: 'rgba(204, 214, 235,0.5)',
                    value: 2016,
                    width: 1,
                    zIndex: 5,
                  }]
            },  
            yAxis: {
                title: {text: 'Percentage'},
                endOnTick: false,
                labels: {style:{fontSize: '12px'}},
            },
            credits: {enabled: false},
            legend: {enabled: false},
            tooltip: {enabled: false},
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {enabled:false},
                    zoneAxis: 'x',
                    zones: [{
                        value: "2018",
                    },{
                        value: "2020",
                        
                        opacity:0.1,
                    }]
                },
                series:{
                    fillOpacity: 1,
                    lineWidth: 5,
                    pointStart: 2001,
                    dataLabels: {enabled: false,},
                    states: {hover: {enabled: false},inactive: {opacity: 1},},
                },
            },    
            series: dataGrowthPct,
        });
    }

    function makeChart1b() {
        chart1b = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-1b',
                type: 'bar',
                style: {
                    color:"#333",
                    fontFamily: 'Source Sans Pro,Helvetica Neue,Helvetica,Arial,sans-serif',
                },
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: [{
                title: {text: 'Age groups'},
                categories: catAge,
                reversed: false,
                labels: {
                    step: 1
                },
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: catAge,
                linkedTo: 0,
                labels: {
                    step: 1
                },
            }], 
            yAxis: {
                title: {text: null},
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) + '%';
                    },
                    style:{fontSize: '12px'}
                },
                max:40,
                min:-40,
            },
            credits: {enabled: false},
            legend: {enabled: true},
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1) + '%';
                }
            },
            plotOptions: {
                series:{
                    stacking: 'normal',
                    borderWidth: 0,
                    groupPadding: 0.05,
                    pointPadding: 0,
                    dataLabels: {enabled: false,},
                    states: {hover: {enabled: false},inactive: {opacity: 1},},
                },
            },    
            series: dataAge,
        });
    }

    function makeChart2() {
        chart2 = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-2',
                type: 'column',
                style: {
                    color:"#333",
                    fontFamily: 'Source Sans Pro,Helvetica Neue,Helvetica,Arial,sans-serif',
                },
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {
                title: {text: 'Age groups'},
                categories: catNaturalized,
                labels: {style:{fontSize: '12px'}}
            },  
            yAxis: {
                title: {text: 'Percentage'},
                endOnTick: false,
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
                data: dataNaturalized
            }],
        });
    }

    function makeChart3() {
        chart3 = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-3',
                type: 'bar',
                style: {
                    color:"#333",
                    fontFamily: 'Source Sans Pro,Helvetica Neue,Helvetica,Arial,sans-serif',
                },
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {
                title: {text: 'Age groups'},
                categories: catNaturalized,
                labels: {style:{fontSize: '12px'}}
            },  
            yAxis: {
                title: {text: 'Percentage'},
                endOnTick: false,
                labels: {style:{fontSize: '12px'}}
            },
            credits: {enabled: false},
            legend: {enabled: false},
            tooltip: {enabled: false},
            plotOptions: {
                bar: {
                    stacking: 'normal',
                    dataLabels: labelstyle,
                },
                series:{
                    borderWidth: 0,
                    groupPadding: 0.05,
                    pointPadding: 0,
                    states: {hover: {enabled: false},inactive: {opacity: 1},},
                },
            },    
            series: dataLanguage
        });
    }

    function makeChart4() {
        chart4 = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-4',
                type: 'tilemap',
                inverted: true,
                style: {
                    color:"#333",
                    fontFamily: 'Source Sans Pro,Helvetica Neue,Helvetica,Arial,sans-serif',
                },
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {visible: false},
            yAxis: {visible: false},
            colorAxis: {
                dataClasses: [{
                    from: 0,
                    to: 5,
                    color: '#ffcf4f',
                    name: '5% or less'
                }, {
                    from: 5.1,
                    to: 10,
                    color: '#ffaa23',
                    name: '5.1-10%'
                }, {
                    from: 10.1,
                    to: 15,
                    color: '#f18a00',
                    name: '10.1-15%'
                }, {
                    from: 15.1,
                    to: 20,
                    color: '#d37300',
                    name: '15.1-20%'
                }, {
                    from: 20.1,
                    to: 25,
                    color: '#b75c00',
                    name: '20.1-25%'
                }, {
                    from: 25.1,
                    color: '#9b4500',
                    name: '>25%'
                }]
            },
            credits: {enabled: false},
            legend: {
                enabled: false,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'bottom',
                floating: true,
            },
            tooltip: {enabled: false},
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.id}',
                        color: '#333',
                        style: {
                            textOutline: false,
                            fontSize: "14px",
                        }
                    }
                }
            },   
            series: [{
                // pointPadding: 0,
                borderWidth: 0.5,
                borderColor: "#d3d3d3",
                name: 'latinoMap',
                id: 'latinoMap',
                data: [{
                    'id': 'AL',
                    name: 'Alabama',
                    region: 'South',
                    x: 6,
                    y: 7,
                    value: 2.3
                }, {
                    'id': 'AK',
                    name: 'Alaska',
                    region: 'West',
                    x: 0,
                    y: 0,
                    value: 6.1
                }, {
                    'id': 'AZ',
                    name: 'Arizona',
                    region: 'West',
                    x: 5,
                    y: 3,
                    value: 24.2
                }, {
                    'id': 'AR',
                    name: 'Arkansas',
                    region: 'South',
                    x: 5,
                    y: 6,
                    value: 4.0
                }, {
                    'id': 'CA',
                    name: 'California',
                    region: 'West',
                    x: 5,
                    y: 2,
                    value: 31.2
                }, {
                    'id': 'CO',
                    name: 'Colorado',
                    region: 'West',
                    x: 4,
                    y: 3,
                    value: 16.4
                }, {
                    'id': 'CT',
                    name: 'Connecticut',
                    region: 'Northeast',
                    x: 3,
                    y: 11,
                    value: 12.6
                }, {
                    'id': 'DE',
                    name: 'Delaware',
                    region: 'South',
                    x: 4,
                    y: 9,
                    value: 5.7
                }, {
                    'id': 'DC',
                    name: 'District of Columbia',
                    region: 'South',
                    x: 4,
                    y: 10,
                    value: 7.1
                }, {
                    'id': 'FL',
                    name: 'Florida',
                    region: 'South',
                    x: 8,
                    y: 8,
                    value: 20.7
                }, {
                    'id': 'GA',
                    name: 'Georgia',
                    region: 'South',
                    x: 7,
                    y: 8,
                    value: 5.3
                }, {
                    'id': 'HI',
                    name: 'Hawaii',
                    region: 'West',
                    x: 8,
                    y: 0,
                    value: 9.0
                }, {
                    'id': 'ID',
                    name: 'Idaho',
                    region: 'West',
                    x: 3,
                    y: 2,
                    value: 8.4
                }, {
                    'id': 'IL',
                    name: 'Illinois',
                    region: 'Midwest',
                    x: 3,
                    y: 6,
                    value: 12.0
                }, {
                    'id': 'IN',
                    name: 'Indiana',
                    region: 'Midwest',
                    x: 3,
                    y: 7,
                    value: 4.3
                }, {
                    'id': 'IA',
                    name: 'Iowa',
                    region: 'Midwest',
                    x: 3,
                    y: 5,
                    value: 3.6
                }, {
                    'id': 'KS',
                    name: 'Kansas',
                    region: 'Midwest',
                    x: 5,
                    y: 5,
                    value: 7.3
                }, {
                    'id': 'KY',
                    name: 'Kentucky',
                    region: 'South',
                    x: 4,
                    y: 6,
                    value: 1.7
                }, {
                    'id': 'LA',
                    name: 'Louisiana',
                    region: 'South',
                    x: 6,
                    y: 5,
                    value: 3.1
                }, {
                    'id': 'ME',
                    name: 'Maine',
                    region: 'Northeast',
                    x: 0,
                    y: 11,
                    value: 1.5
                }, {
                    'id': 'MD',
                    name: 'Maryland',
                    region: 'South',
                    x: 4,
                    y: 8,
                    value: 6.0
                }, {
                    'id': 'MA',
                    name: 'Massachusetts',
                    region: 'Northeast',
                    x: 2,
                    y: 10,
                    value: 9.2
                }, {
                    'id': 'MI',
                    name: 'Michigan',
                    region: 'Midwest',
                    x: 2,
                    y: 7,
                    value: 3.6
                }, {
                    'id': 'MN',
                    name: 'Minnesota',
                    region: 'Midwest',
                    x: 2,
                    y: 4,
                    value: 3.3
                }, {
                    'id': 'MS',
                    name: 'Mississippi',
                    region: 'South',
                    x: 6,
                    y: 6,
                    value: 1.7
                }, {
                    'id': 'MO',
                    name: 'Missouri',
                    region: 'Midwest',
                    x: 4,
                    y: 5,
                    value: 2.8
                }, {
                    'id': 'MT',
                    name: 'Montana',
                    region: 'West',
                    x: 2,
                    y: 2,
                    value: 3.5
                }, {
                    'id': 'NE',
                    name: 'Nebraska',
                    region: 'Midwest',
                    x: 4,
                    y: 4,
                    value: 6.8
                }, {
                    'id': 'NV',
                    name: 'Nevada',
                    region: 'West',
                    x: 4,
                    y: 2,
                    value: 20.2
                }, {
                    'id': 'NH',
                    name: 'New Hampshire',
                    region: 'Northeast',
                    x: 1,
                    y: 11,
                    value: 2.9
                }, {
                    'id': 'NJ',
                    name: 'New Jersey',
                    region: 'Northeast',
                    x: 3,
                    y: 10,
                    value: 15.5
                }, {
                    'id': 'NM',
                    name: 'New Mexico',
                    region: 'West',
                    x: 6,
                    y: 3,
                    value: 43.3
                }, {
                    'id': 'NY',
                    name: 'New York',
                    region: 'Northeast',
                    x: 2,
                    y: 9,
                    value: 15.0
                }, {
                    'id': 'NC',
                    name: 'North Carolina',
                    region: 'South',
                    x: 5,
                    y: 9,
                    value: 4.7
                }, {
                    'id': 'ND',
                    name: 'North Dakota',
                    region: 'Midwest',
                    x: 2,
                    y: 3,
                    value: 3.1
                }, {
                    'id': 'OH',
                    name: 'Ohio',
                    region: 'Midwest',
                    x: 3,
                    y: 8,
                    value: 2.8
                }, {
                    'id': 'OK',
                    name: 'Oklahoma',
                    region: 'South',
                    x: 6,
                    y: 4,
                    value: 6.4
                }, {
                    'id': 'OR',
                    name: 'Oregon',
                    region: 'West',
                    x: 4,
                    y: 1,
                    value: 8.0
                }, {
                    'id': 'PA',
                    name: 'Pennsylvania',
                    region: 'Northeast',
                    x: 3,
                    y: 9,
                    value: 5.5
                }, {
                    'id': 'RI',
                    name: 'Rhode Island',
                    region: 'Northeast',
                    x: 2,
                    y: 11,
                    value: 11.7
                }, {
                    'id': 'SC',
                    name: 'South Carolina',
                    region: 'South',
                    x: 6,
                    y: 8,
                    value: 3.2
                }, {
                    'id': 'SD',
                    name: 'South Dakota',
                    region: 'Midwest',
                    x: 3,
                    y: 4,
                    value: 2.8
                }, {
                    'id': 'TN',
                    name: 'Tennessee',
                    region: 'South',
                    x: 5,
                    y: 7,
                    value: 2.6
                }, {
                    'id': 'TX',
                    name: 'Texas',
                    region: 'South',
                    x: 7,
                    y: 4,
                    value: 31.0
                }, {
                    'id': 'UT',
                    name: 'Utah',
                    region: 'West',
                    x: 5,
                    y: 4,
                    value: 9.4
                }, {
                    'id': 'VT',
                    name: 'Vermont',
                    region: 'Northeast',
                    x: 1,
                    y: 10,
                    value: 1.6
                }, {
                    'id': 'VA',
                    name: 'Virginia',
                    region: 'South',
                    x: 5,
                    y: 8,
                    value: 5.7
                }, {
                    'id': 'WA',
                    name: 'Washington',
                    region: 'West',
                    x: 2,
                    y: 1,
                    value: 8.0
                }, {
                    'id': 'WV',
                    name: 'West Virginia',
                    region: 'South',
                    x: 4,
                    y: 7,
                    value: 1.1
                }, {
                    'id': 'WI',
                    name: 'Wisconsin',
                    region: 'Midwest',
                    x: 2,
                    y: 5,
                    value: 4.3
                }, {
                    'id': 'WY',
                    name: 'Wyoming',
                    region: 'West',
                    x: 3,
                    y: 3,
                    value: 7.7
                }]
            }]
        });
    }

    function makeChart5() {
        chart5 = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-5',
                type: 'line',
                marginRight: 100,
                animation: {duration:2000},
                style: {
                    color:"#333",
                    fontFamily: 'Source Sans Pro,Helvetica Neue,Helvetica,Arial,sans-serif',
                },
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {year: '%Y'},
                tickInterval: 24 * 3600 * 1000 * 365 * 10,
                showLastLabel: true,          
                labels: {style:{fontSize: '12px'}},
                plotLines: [{
                    color: 'rgba(204, 214, 235,0.5)',
                    value: [Date.UTC(2014,0,1)],
                    width: 1,
                    label: {
                        text: '2014',
                        align: 'right',
                        verticalAlign: 'bottom',
                        x: -15,
                        y: -10,
                        style:{color: '#666'}
                    }
                  },
                  {
                    color: 'rgba(204, 214, 235,0.5)',
                    value: [Date.UTC(2018,0,1)],
                    width: 1,
                    label: {
                        text: '2018',
                        align: 'right',
                        verticalAlign: 'bottom',
                        x: 5,
                        y: -10,
                        style:{color: '#666'}
                    }
                  }],

            },  
            yAxis: {
                title: {text: 'Percentage'},
                endOnTick: false,
                labels: {style:{fontSize: '12px'}},
                min: 0,
            },
            credits: {enabled: false},
            legend: {enabled: false},
            tooltip: {
                enabled: true,
                headerFormat: '{point.key}<br>',
                pointFormat:'<b>{series.name} {point.y}</b>',
                
            },
            plotOptions: {
                series:{
                    stickyTracking: false,
                    dataLabels: {enabled: false},
                    marker: {enabled: false},
                    // states: {hover: {enabled: false},inactive: {opacity: 1},},
                },
            },    
            series: dataTurnout,
        });
    }
});     