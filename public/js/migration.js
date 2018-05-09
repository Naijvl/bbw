/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ({

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(38);


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

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
            "color": ["#80deea", "#4dd0e1", "#26c6da", "#00bcd4", "#d4e157", "#29b6f6", "#29b6f6", "#9ccc65", "#ffb74d"],
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

    var geoCoordMap = __webpack_require__(39);

    var DATA = __webpack_require__(40);

    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

    var color = ['#00BCD4', '#ffa022', '#46bee9'];
    var legends = [];
    var sankey_data = {};

    // 只统计这几个地市的数据，其他城市计入“其他”
    var FILTER = { '南宁': true, '玉林': true, '北海': true, '崇左': true, '钦州': true, '防城港': true };

    app.page.map_chart = {
        option: {
            backgroundColor: '#fff',
            color: ['#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '00BCD4'],
            title: {
                text: '人才流动',
                // subtext: '2017年',
                top: 20,
                left: 'center',
                textStyle: {
                    color: '#212121'
                }
            },
            tooltip: {
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
                boundingCoords: [[105.688, 25.958], [112.192, 21.289]],
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
            color: ['#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4', '#D4E157', '#29B6F6', '#9CCC65', '#FFB74D'],
            backgroundColor: '#fdfdfd',
            title: {
                text: '流动情况',
                subtext: '',
                x: 'center',
                y: 20
            },
            tooltip: {
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
        nodes: [{ name: '流入' }, { name: '流出' }, { name: '其他' }],
        links: [{ source: '其他', target: '流入', value: 0 }, { source: '其他', target: '流出', value: 0 }]
    });

    function convertData(destination, data) {
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
    app.page.sankey_chart.append = function (to, from) {
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

        option.xAxis = [{
            type: 'category',
            axisTick: { show: false },
            data: []
        }];

        option.yAxis = [{
            type: 'value'
        }];

        option.series = [{
            name: '流入',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            data: []
        }, {
            name: '流出',
            type: 'bar',
            label: labelOption,
            data: []
        }, {
            name: '留在本地',
            type: 'bar',
            label: labelOption,
            data: []
        }];

        for (var i in data) {
            option.xAxis[0].data.push(i);

            option.series[0].data.push(data[i].in);
            option.series[1].data.push(data[i].out);
            option.series[2].data.push(data[i].stay);
        }
    };

    app.page.initCharts = function (options) {
        var bar = {};

        for (var dest in DATA.by_city) {
            var cities = [];

            legends.push(dest);
            sankey_data[dest] = JSON.parse(EMPTY_SANKEY_DATA);
            bar[dest] = { in: 0, out: 0, stay: 0 };

            for (var src in DATA.by_city[dest]) {
                var val = parseFloat((DATA.by_city[dest][src] / DATA.total[dest] * 100).toFixed(2));
                cities.push({ name: src, value: geoCoordMap[src].concat(val) });

                bar[dest].in += DATA.by_city[dest][src];

                if ('undefined' === typeof bar[src]) {
                    bar[src] = { in: 0, out: 0, stay: 0 };
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
            }, {
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
            }, {
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
                symbolSize: function symbolSize(val) {
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
                series: {
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

        app.page.sankey_chart.holder.setOption({ series: { label: { color: '#fff' } } });
        app.page.sankey_chart.holder.setOption(theme.global);

        app.page.bar_chart.holder.setOption(theme.global);
    };

    app.page.resizeCharts = function () {
        app.page.sankey_chart.holder.resize('auto', 'auto', false);
        app.page.map_chart.holder.resize('auto', 'auto', false);
        app.page.bar_chart.holder.resize('auto', 'auto', false);
    };
})(window.app);

/***/ }),

/***/ 39:
/***/ (function(module, exports) {

;(function () {

    var data = {
        '北流': [110.3502, 22.7066],
        '北海': [109.1205, 21.4811],
        '崇左': [107.3651, 22.3772],
        '南宁': [108.3664, 22.8161],
        '合山': [108.8790, 23.8143],
        '宜州': [108.6397, 24.5015],
        '柳州': [109.4284, 24.3262],
        '来宾': [109.2213, 23.7503],
        '桂平': [110.1166, 23.6500],
        '桂林': [110.1799, 25.2344],
        '梧州': [111.2788, 23.4771],
        '河池': [108.0852, 24.6929],
        '贺州': [111.3252, 24.2459],
        '玉林': [110.1811, 22.6540],
        '百色': [106.6182, 23.9025],
        '贵港': [109.5987, 23.1115],
        '赁祥': [106.7318, 22.1098],
        '钦州': [108.6540, 21.9800],
        '防城港': [108.3538, 21.6868]
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = data;
    }
})();

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

;(function () {

    var data = {
        total: {
            '梧州': 2176,
            '钦州': 2945,
            '贵港': 1978,
            '河池': 1374,
            '南宁': 61679,
            '贺州': 522,
            '桂林': 6758,
            '防城港': 2264,
            '柳州': 10402,
            '北海': 1487,
            '崇左': 932,
            '百色': 2038,
            '来宾': 1717,
            '玉林': 2415
        },

        by_city: {
            '梧州': {
                '梧州': 447,
                '钦州': 20,
                '河池': 10,
                '南宁': 479,
                '贺州': 36,
                '桂林': 221,
                '柳州': 65,
                '北海': 9,
                '崇左': 30,
                '百色': 25,
                '来宾': 3,
                '玉林': 53
            },

            '钦州': {
                '梧州': 30,
                '钦州': 562,
                '河池': 23,
                '南宁': 737,
                '贺州': 15,
                '桂林': 232,
                '柳州': 103,
                '北海': 25,
                '崇左': 66,
                '百色': 42,
                '来宾': 9,
                '玉林': 39
            },

            '贺州': {
                '梧州': 9,
                '钦州': 4,
                '河池': 3,
                '南宁': 154,
                '贺州': 70,
                '桂林': 65,
                '柳州': 17,
                '北海': 3,
                '崇左': 9,
                '百色': 8,
                '来宾': 2,
                '玉林': 11
            },

            '河池': {
                '梧州': 15,
                '钦州': 9,
                '河池': 147,
                '南宁': 396,
                '贺州': 5,
                '桂林': 135,
                '柳州': 62,
                '北海': 6,
                '崇左': 31,
                '百色': 32,
                '来宾': 8,
                '玉林': 15
            },

            '南宁': {
                '梧州': 440,
                '钦州': 525,
                '河池': 376,
                '南宁': 29612,
                '贺州': 196,
                '桂林': 4577,
                '柳州': 1477,
                '北海': 191,
                '崇左': 1069,
                '百色': 715,
                '来宾': 84,
                '玉林': 425
            },

            '贵港': {
                '梧州': 38,
                '钦州': 27,
                '河池': 27,
                '南宁': 524,
                '贺州': 17,
                '桂林': 202,
                '柳州': 114,
                '北海': 18,
                '崇左': 56,
                '百色': 48,
                '来宾': 13,
                '玉林': 52
            },

            '桂林': {
                '梧州': 48,
                '钦州': 50,
                '河池': 45,
                '南宁': 1342,
                '贺州': 39,
                '桂林': 2218,
                '柳州': 183,
                '北海': 15,
                '崇左': 79,
                '百色': 50,
                '来宾': 5,
                '玉林': 67
            },

            '防城港': {
                '梧州': 23,
                '钦州': 49,
                '河池': 18,
                '南宁': 767,
                '贺州': 12,
                '桂林': 201,
                '柳州': 78,
                '北海': 4,
                '崇左': 42,
                '百色': 39,
                '来宾': 2,
                '玉林': 23
            },

            '柳州': {
                '梧州': 71,
                '钦州': 87,
                '河池': 78,
                '南宁': 2041,
                '贺州': 31,
                '桂林': 857,
                '柳州': 2500,
                '北海': 23,
                '崇左': 113,
                '百色': 67,
                '来宾': 39,
                '玉林': 71
            },

            '北海': {
                '梧州': 16,
                '钦州': 30,
                '河池': 12,
                '南宁': 397,
                '贺州': 9,
                '桂林': 185,
                '柳州': 56,
                '北海': 59,
                '崇左': 33,
                '百色': 26,
                '来宾': 2,
                '玉林': 35
            },

            '崇左': {
                '梧州': 9,
                '钦州': 11,
                '河池': 6,
                '南宁': 206,
                '贺州': 5,
                '桂林': 122,
                '柳州': 22,
                '北海': 1,
                '崇左': 232,
                '百色': 9,
                '玉林': 12
            },

            '百色': {
                '梧州': 16,
                '钦州': 16,
                '河池': 16,
                '南宁': 561,
                '贺州': 8,
                '桂林': 186,
                '柳州': 88,
                '北海': 10,
                '崇左': 60,
                '百色': 392,
                '来宾': 5,
                '玉林': 25
            },

            '来宾': {
                '梧州': 30,
                '钦州': 28,
                '河池': 31,
                '南宁': 453,
                '贺州': 15,
                '桂林': 187,
                '柳州': 75,
                '北海': 4,
                '崇左': 34,
                '百色': 25,
                '来宾': 74,
                '玉林': 19
            },

            '玉林': {
                '梧州': 41,
                '钦州': 24,
                '河池': 22,
                '南宁': 657,
                '贺州': 12,
                '桂林': 257,
                '柳州': 123,
                '北海': 11,
                '崇左': 43,
                '百色': 28,
                '来宾': 4,
                '玉林': 361
            }
        }
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = data;
    }
})();

/***/ })

/******/ });