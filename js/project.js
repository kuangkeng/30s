$(document).ready(function() {
    var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    var height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    var $scrollArea = $('.scroll-area'),
        bottomSpace = Math.floor(height*0.07),
        chartWidth = $scrollArea.width(),
        chartMargin = 0 - (chartWidth/2),
        chartHeight = Math.floor(height);


    var chart1, chart1b, chart2, chart3, chart4, chart5; 
    var clicked2, clicked3, clicked4, clicked5;
    var chart1Loaded, chart3Loaded, chart4Loaded;

    var labels = {};
    var dataNaturalized = [
        {name:"18-23",y:95.1,color:"#FF9600"},
        {name:"24-39",y:0,color:"#F7DEBB"},
        {name:"40-55",y:0,color:"#F7DEBB"},
        {name:"56-74",y:0,color:"#F7DEBB"},
    ]; 
    var catNaturalized = [];
    for (var i = 0; i < dataNaturalized.length; i++){
        catNaturalized.push(dataNaturalized[i].name);
    }

    var dataLanguage = [
        {name:"Spanish", id:"Spanish", data:[61,62.3,69.2,73.5],color:"#F7DEBB"},
        {name:"English", id:"English", data:[38.6,37.2,30.4,25.9],color:"#FF9600"},
    ];

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
        {name:"Latino",id:"Latino",data:[7.82,8.06,8.26,8.49,8.55,8.71,8.87,9.18,9.42,10.01,10.40,10.74,10.98,11.33,11.70,11.94,null,null,null,null],color:"#FF9600"},      
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

    var catAge = ["16-20","21-35","36-50","51-65","66-80","81-100"];
    var dataAge = [
        {name:"Latino",id:"Latino",data:[-14.1,-33.6,-23.9,-17.9,-8.2,-2.3],color:"#FF9600"},      
        {name:"National",id:"National",data:[8.5,25,22.6,24.4,15.1,4.4],color:"#0089BD"},  
    ];

    var dataTurnout = [
        {name:"National (presidential)",id:"National-presidential",color:"#78BBE0",
            data :[
                [Date.UTC(1996,0,1),58.4],
                [Date.UTC(2000,0,1),59.5],
                [Date.UTC(2004,0,1),63.8],
                [Date.UTC(2008,0,1),63.6],
                [Date.UTC(2012,0,1),61.8],
                [Date.UTC(2016,0,1),61.4],
                ]
        },
        {name:"National (midterm)",id:"National-midterm",color:"#0089BD",
            data :[
                [Date.UTC(1994,0,1),48.4],
                [Date.UTC(1998,0,1),45.3],
                [Date.UTC(2002,0,1),46.1],
                [Date.UTC(2006,0,1),47.8],
                [Date.UTC(2010,0,1),45.5],
                [Date.UTC(2014,0,1),41.9],
                [Date.UTC(2018,0,1),null],
                ]
        },

    ];
    var dataTurnoutLatino = [
        {name:"Latino (presidential)",id:"Latino-presidential",color:"#F7DEBB",
        data :[
            [Date.UTC(1996,0,1),44.0],
            [Date.UTC(2000,0,1),44.3],
            [Date.UTC(2004,0,1),47.2],
            [Date.UTC(2008,0,1),49.9],
            [Date.UTC(2012,0,1),48.0],
            [Date.UTC(2016,0,1),47.6],
            ]
    },
    {name:"Latino (midterm)",id:"Latino-midterm",color:"#FF9600",
        data :[
            [Date.UTC(1994,0,1),34.4],
            [Date.UTC(1998,0,1),32.8],
            [Date.UTC(2002,0,1),30.4],
            [Date.UTC(2006,0,1),32.3],
            [Date.UTC(2010,0,1),31.2],
            [Date.UTC(2014,0,1),27.0],
            [Date.UTC(2018,0,1),null],
            ]
    },
    ];

    $(".scroll-text").css("padding-bottom", height);
    $(".chart-container").css({'width':chartWidth,'height':chartHeight});

    var stickyBox1 = new Waypoint.Sticky({element: $('#sticky-box-1')});
    var stickyBox2 = new Waypoint.Sticky({element: $('#sticky-box-2')});
    var stickyBox4 = new Waypoint.Sticky({element: $('#sticky-box-4')}); 
    var stickyBox5 = new Waypoint.Sticky({element: $('#sticky-box-5')});  
    
    $("#scroll-text-1").waypoint(function(direction) {
        if (direction === "down") {
            $("#chart-wrapper-1").fadeTo(500, 1, makeChart1());
            chart1.get("Latino").points[15].update({dataLabels: labelstyle1_1});
            chart1.get("Black").points[15].update({dataLabels: labelstyle1_2});
            chart1.get("Asian").points[15].update({dataLabels: labelstyle1_3});
            chart1.get("White").points[15].update({dataLabels: labelstyle1_4});
        } else {}
    }, {
        offset: "50%"
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
            $("#chart-wrapper-1b").fadeTo(500, 1, makeChart1b());
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-5").waypoint(function(direction) {
        if (direction === "down") {
            $("#chart-wrapper-2").fadeTo(500, 1, makeChart2());
            chart2.get("naturalizedChart").points[0].update({dataLabels: labelstyle});
        } else {}
    }, {
        offset: "50%"
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

    $("#scroll-text-8").waypoint(function(direction) {
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
            $("#chart-wrapper-3").fadeTo(500, 1, makeChart3());
            chart3.get("English").points[0].update({dataLabels: labelstyle2});
            chart3.get("Spanish").points[0].update({dataLabels: labelstyle2});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-9").waypoint(function(direction) {
        if (direction === "down") {
            $("#chart-wrapper-4").fadeTo(500, 1, makeChart4());
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-10").waypoint(function(direction) {
        if (direction === "down") {
            chart4.get("latinoMap").points[43].update({borderWidth: 10,borderColor: '#FF9600'});
        } else {}
    }, {
        offset: "50%"
    });
    $("#scroll-text-11").waypoint(function(direction) {
        if (direction === "down") {
            chart4.get("latinoMap").points[43].update({borderWidth: 0});
            chart4.get("latinoMap").points[9].update({borderWidth: 10,borderColor: '#FF9600'});
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
            $("#legend-latino").fadeTo(500, 0);
            $("#legend-swing").fadeTo(500, 1);
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

    $("#scroll-text-15").waypoint(function(direction) {
        if (direction === "down") {
            $("#chart-wrapper-5").fadeTo(500, 1, makeChart5());
            chart5.get("National-presidential").points[5].update({dataLabels: labelstyle5});
            chart5.get("National-midterm").points[5].update({dataLabels: labelstyle5});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-16").waypoint(function(direction) {
        if (direction === "down") {
            chart5.addSeries(dataTurnoutLatino[0]);
            chart5.addSeries(dataTurnoutLatino[1]);
            chart5.get("Latino-presidential").points[5].update({dataLabels: labelstyle5});
            chart5.get("Latino-midterm").points[5].update({dataLabels: labelstyle5});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-17").waypoint(function(direction) {
        if (direction === "down") {
            chart5.get("National-midterm").points[5].update({dataLabels: {enabled: false}});
            chart5.get("Latino-midterm").points[5].update({dataLabels: {enabled: false}});
            chart5.get("National-midterm").points[6].update({y:53.4, dataLabels: labelstyle6});
            chart5.get("Latino-midterm").points[6].update({y:40.4,dataLabels: labelstyle6});
        } else {}
    }, {
        offset: "50%"
    });

    $("#scroll-text-18").waypoint(function(direction) {
        if (direction === "down") {
            $("#sticky-box-5").animate({opacity: 0},1000);
        } else {
            $("#sticky-box-5").animate({opacity: 1},1000);
        }
    }, {
        offset: "100%"
    });

    var labelstyle1_1 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{series.name}<br>{point.y:.1f}',
        x:-20,
        style:{fontSize: '11px',fontWeight: '600',color: '#333',textAlign: "right",},
    };

    var labelstyle1_2 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{series.name}<br>{point.y:.1f}',
        y:40,
        x:-20,
        style:{fontSize: '11px',fontWeight: '600',color: '#333',textAlign: "right",},
    };

    var labelstyle1_3 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{series.name} {point.y:.1f}',
        y: 17,
        x:-32,
        style:{fontSize: '11px',fontWeight: '600',color: '#333',textAlign: "right",},
    };

        var labelstyle1_4 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{series.name}<br>{point.y:.1f}',
        y: 110,
        x:-20,
        style:{fontSize: '11px',fontWeight: '600',color: '#333',textAlign: "right",},
    };

    var labelstyle1_6 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.y:.1f}',
        y: 40,
        x:-15,
        style:{fontSize: '11px',fontWeight: '600',color: '#333',textAlign: "right",},
    };

    var labelstyle1_7 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.y:.1f}',
        y: 17,
        x:-15,
        style:{fontSize: '11px',fontWeight: '600',color: '#333',textAlign: "right",},
    };

        var labelstyle1_8 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{point.y:.1f}',
        y: 110,
        x:-15,
        style:{fontSize: '11px',fontWeight: '600',color: '#333',textAlign: "right",},
    };


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

    var labelstyle3 ={color: '#d3d3d3'};
    var labelstyle4 ={color: '#fff'};


    var labelstyle5 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{series.name}<br>{point.y}%',
        x:20,
        style:{
            fontSize: '12px',
            fontWeight: '600',
            color: '#333',
            textOutline: false,
            textAlign: "center",
        },
    };

    var labelstyle6 ={
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        format: '{series.name}<br>{point.y}%',
        x:-20,
        style:{
            fontSize: '12px',
            fontWeight: '600',
            color: '#333',
            textOutline: false,
            textAlign: "right",
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
                type: 'area',
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
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {
                title: {text: 'Age groups'},
                categories: catNaturalized,
                labels: {style:{fontSize: '12px'}}
            },  
            yAxis: {
                title: {text: null},
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
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {
                title: {text: 'Age groups'},
                categories: catNaturalized,
                labels: {style:{fontSize: '12px'}}
            },  
            yAxis: {
                title: {text: null},
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
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {visible: false},
            yAxis: {visible: false},
            colorAxis: {
                dataClasses: [{
                    from: 0,
                    to: 5,
                    color: '#ffffb2',
                    name: '5% or less'
                }, {
                    from: 5.1,
                    to: 10,
                    color: '#fed976',
                    name: '5.1-10%'
                }, {
                    from: 10.1,
                    to: 15,
                    color: '#feb24c',
                    name: '10.1-15%'
                }, {
                    from: 15.1,
                    to: 20,
                    color: '#fd8d3c',
                    name: '15.1-20%'
                }, {
                    from: 20.1,
                    to: 25,
                    color: '#f03b20',
                    name: '20.1-25%'
                }, {
                    from: 25.1,
                    color: '#bd0026',
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
                            textOutline: false
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
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {year: '%Y'},
                tickInterval: 24 * 3600 * 1000 * 365 * 2,
                showLastLabel: true,          
                labels: {style:{fontSize: '12px'}},
            },  
            yAxis: {
                title: {text: null},
                endOnTick: false,
                labels: {style:{fontSize: '12px'}},
            },
            credits: {enabled: false},
            legend: {enabled: false},
            tooltip: {enabled: false},
            plotOptions: {
                series:{
                    dataLabels: {enabled: false},
                    marker: {enabled: false},
                    states: {hover: {enabled: false},inactive: {opacity: 1},},
                },
            },    
            series: dataTurnout,
        });
    }

    
   
});     