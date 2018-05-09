(function (app) {


    if ('undefined' === typeof app) {
        window.app = {};
    }

    app.page = {
        map_chart: {},

        bar_chart: {},

        sankey_chart: {}
    };

    var theme = {
        'global': {
            "backgroundColor": "#404A59",
            "color": [
                "#80deea",
                "#4dd0e1",
                "#26c6da",
                "#00bcd4",
                "#d4e157",
                "#29b6f6",
                "#29b6f6",
                "#9ccc65",
                "#ffb74d"
            ],
            'title': {
                'textStyle': {
                    'color': "#eeeeee"
                }
            },
            "subtitleStyle": {
                'color': "#aaaaaa"
            },
            'textStyle': {
                'color': '#fff'
            },
            'legend': {
                'textStyle': {
                    'color': "#eeeeee"
                }
            },
            'geo': {
                'label': {
                    'color': "#000000"
                },
                'itemStyle': {
                    "areaColor": "#323c48",
                    "borderColor": "#404a59",
                    "borderWidth": "0.5"
                }

            }
        },

        'xAxis': {
            'axisLine': {
                'lineStyle': {
                    'color': '#eeeeee'
                }
            },
            'axisTick': {
                'lineStyle': {
                    'color': '#eeeeee'
                }
            },
            'axisLabel': {
                'lineStyle': {
                    'color': '#eeeeee'
                }
            },
            'splitLine': {
                'lineStyle': {
                    'color': ["#eeeeee"]
                }
            },
            'splitArea': {
                'areaStyle': {
                    'color': ["#eeeeee"]
                }
            }
        },

        'effectScatter': {
            itemStyle: {
                normal: {
                    color: '#eeeeee'
                }
            }

        }
    };

    var geoCoordMap = require('./coordinates');

    var DATA = require('./data.migration');

    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';


    var color = ['#00BCD4', '#ffa022', '#46bee9'];
    var legends = [];
    var sankey_data = {  };

    // 只统计这几个地市的数据，其他城市计入“其他”
    var FILTER = { '南宁': true, '玉林': true, '北海': true, '崇左': true, '钦州': true, '防城港': true };



    app.page.map_chart = {
        option: {
            backgroundColor: '#fff',
            color: ['#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '00BCD4'],
            title : {
                text: '人才流动',
                // subtext: '2017年',
                top: 20,
                left: 'center',
                textStyle : {
                    color: '#212121'
                }
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                top: 20,
                left: 30,
                data: legends,
                itemWidth: 10,
                inactiveColor: '#90A4AE',
                textStyle: {
                    color: '#00838F'
                },
                selectedMode: 'single'
            },
            geo: {
                map: '广西',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: false,
                center: [108.831, 23.755],
                boundingCoords: [ [105.688, 25.958], [112.192, 21.289] ],
                regions: [{
                    name: '广西',
                    selected: true,
                    itemStyle: {
                        areaColor: '#ECEFF1',
                        color: '#ECEFF1'
                    }
                }],
                itemStyle: {
                    normal: {
                        areaColor: '#fff',
                        borderColor: '#CFD8DC'
                    },
                    emphasis: {
                        areaColor: '#fafafa',
                        borderColor: '#B2EBF2'
                    }
                }
            },
            series: []
        }
    };



    app.page.sankey_chart = {
        option: {
            color: ['#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4',  '#D4E157', '#29B6F6', '#9CCC65', '#FFB74D'],
            backgroundColor: '#fdfdfd',
            title : {
                text: '流动情况',
                subtext: '',
                x:'center',
                y: 20
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c}"
            },
            series: {
                type: 'sankey',
                left: 'center',
                top: 'center',
                width: '60%',
                height: '60%',
                lineStyle: {
                    normal: {
                        color: 'target'
                    }
                },
                data: [],

                links: []
            }
        }
    };


    var EMPTY_SANKEY_DATA = JSON.stringify({
        nodes: [{name: '流入'}, {name: '流出'}, {name: '其他'}],
        links: [
            {source: '其他', target: '流入', value: 0},
            {source: '其他', target: '流出', value: 0}
        ]
    });


    function convertData(destination, data)
    {
        var res = [];

        for (var city in data) {
            var fromCoord = geoCoordMap[city];
            var toCoord = geoCoordMap[destination];

            if (fromCoord && toCoord) {
                res.push({
                    fromName: city,
                    toName: destination,
                    coords: [fromCoord, toCoord]
                });
            }
        }

        return res;
    }


    /**
     * to -> from = 人才流入，from -> to = 人才流出
     * '南宁' = [{ '玉林': 10}, ...] to = 南宁, from = '玉林'
     * @param from
     * @param to
     */
    app.page.sankey_chart.append = function (to, from)
    {
        if ('undefined' === typeof sankey_data[from]) {
            sankey_data[from] = JSON.parse(EMPTY_SANKEY_DATA);
        }

        if ('undefined' === typeof sankey_data[to]) {
            sankey_data[to] = JSON.parse(EMPTY_SANKEY_DATA);
        }

        if ('undefined' === typeof FILTER[from]) {
            // 如果不在 FILTER 中的地市则归入“其他”

            // 流入
            sankey_data[to].links[0].value += DATA.by_city[to][from];

            // 流出
            sankey_data[from].links[1].value += DATA.by_city[to][from];

        } else {

            sankey_data[to].nodes.push({ name: from });

            // 流出
            sankey_data[from].links[1].value += DATA.by_city[to][from];

            sankey_data[to].links.push({
                source: from,
                target: '流入',
                value: DATA.by_city[to][from]
            });

            sankey_data[from].links.push({
                source: to,
                target: '流出',
                value: DATA.by_city[to][from]
            });
        }
    };



    app.page.bar_chart.option = {
        backgroundColor: '#fff',

        legend: {
            data: ['流入', '流出', '留在本地']
        },

        color: ['#003366', '#006699', '#4cabce', '#e5323e'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        calculable: true
    };



    app.page.bar_chart.init = function (data) {
        var labelOption = {
            normal: {
                show: false,
                position: 'insideBottom',
                distance: 15,
                align: 'left',
                verticalAlign: 'middle',
                rotate: 90,
                formatter: '{c}  {name|{a}}',
                fontSize: 16,
                rich: {
                    name: {
                        textBorderColor: '#fff'
                    }
                }
            }
        };

        var option = app.page.bar_chart.option;

        option.xAxis = [
            {
                type: 'category',
                axisTick: {show: false},
                data: []
            }
        ];

        option.yAxis = [
            {
                type: 'value'
            }
        ];

        option.series = [
            {
                name: '流入',
                type: 'bar',
                barGap: 0,
                label: labelOption,
                data: []
            },
            {
                name: '流出',
                type: 'bar',
                label: labelOption,
                data: []
            },
            {
                name: '留在本地',
                type: 'bar',
                label: labelOption,
                data: []
            }
        ];

        for (var i in data) {
            option.xAxis[0].data.push(i);

            option.series[0].data.push(data[i].in);
            option.series[1].data.push(data[i].out);
            option.series[2].data.push(data[i].stay);
        }
    };



    app.page.initCharts = function (options)
    {
        var bar = {  };

        for (var dest in DATA.by_city) {
            var cities = [];

            legends.push(dest);
            sankey_data[dest] = JSON.parse(EMPTY_SANKEY_DATA);
            bar[dest] = { in: 0, out: 0, stay: 0 };

            for (var src in DATA.by_city[dest]) {
                var val = parseFloat((DATA.by_city[dest][src] / DATA.total[dest] * 100).toFixed(2));
                cities.push({name: src, value: geoCoordMap[src].concat(val)});

                bar[dest].in += DATA.by_city[dest][src];

                if ('undefined' === typeof bar[src]) {
                    bar[src] = { in: 0, out: 0, stay: 0};
                }

                bar[src].out = DATA.by_city[dest][src];


                if (dest === src) {
                    bar[dest].stay += DATA.by_city[dest][src];
                    continue;
                }

                app.page.sankey_chart.append(dest, src);
            }

            app.page.map_chart.option.series.push({
                    name: dest,
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.7,
                        color: '#fff',
                        symbolSize: 3
                    },
                    lineStyle: {
                        normal: {
                            color: color[0],
                            width: 0,
                            curveness: 0.2
                        }
                    },
                    data: convertData(dest, DATA.by_city[dest])
                },
                {
                    name: dest,
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['none', 'arrow'],
                    symbolSize: 10,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: planePath,
                        symbolSize: 15
                    },
                    lineStyle: {
                        normal: {
                            color: color[0],
                            width: 1,
                            opacity: 0.6,
                            curveness: 0.2
                        }
                    },
                    data: convertData(dest, DATA.by_city[dest])
                },
                {
                    name: dest,
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            fontSize: 16,
                            position: 'top',
                            formatter: '{b}'
                        }
                    },
                    symbolSize: function (val) {
                        return val[2];
                    },
                    itemStyle: {
                        normal: {
                            color: color[0]
                        }
                    },
                    data: cities
                });
        }

        app.page.bar_chart.init(bar);


        app.page.map_chart.holder = echarts.init(options['map']);
        app.page.sankey_chart.holder = echarts.init(options['sankey']);
        app.page.bar_chart.holder = echarts.init(options['bar']);
        app.page.bar_chart.holder.setOption(app.page.bar_chart.option);


        app.page.map_chart.holder.setOption(app.page.map_chart.option);

        app.page.map_chart.holder.on('legendselectchanged', function (params) {
            var pie_option = {
                series : {
                    type: 'sankey',
                    layout: 'none',
                    data: sankey_data[params.name].nodes,
                    links: sankey_data[params.name].links
                }
            };

            app.page.sankey_chart.holder.setOption(pie_option);
        });

        app.page.sankey_chart.option.series.data = sankey_data['南宁'].nodes;
        app.page.sankey_chart.option.series.links = sankey_data['南宁'].links;
        app.page.sankey_chart.holder.setOption(app.page.sankey_chart.option);

        app.page.map_chart.holder.dispatchAction({
            type: 'legendToggleSelect',
            name: '南宁'
        });

    };


    app.page.switchTheme = function () {
        app.page.map_chart.holder.setOption(theme.global);

        app.page.sankey_chart.holder.setOption({ series: { label: { color: '#fff'} } });
        app.page.sankey_chart.holder.setOption(theme.global);

        app.page.bar_chart.holder.setOption(theme.global);
    };


    app.page.resizeCharts = function () {
        app.page.sankey_chart.holder.resize('auto', 'auto', false);
        app.page.map_chart.holder.resize('auto', 'auto', false);
        app.page.bar_chart.holder.resize('auto', 'auto', false);
    };


})(window.app);
