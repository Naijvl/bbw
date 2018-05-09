;(function () {

    if ('undefined' === typeof app.page.charts) {
        app.page.charts = { themes: {} };
    }


    app.page.charts.themes.dark = {
        "version": 1,
        "themeName": "dark",
        "theme": {
            "seriesCnt": "9",
            "backgroundColor": "#404a59",
            "titleColor": "#eeeeee",
            "subtitleColor": "#aaaaaa",
            "textColorShow": false,
            "textColor": "#333",
            "markTextColor": "#eeeeee",
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
            "borderColor": "#ccc",
            "borderWidth": 0,
            "visualMapColor": [
                "#f0a6ab",
                "#d97793",
                "#ae5378",
                "#a11e4d"
            ],
            "legendTextColor": "#eeeeee",
            "kColor": "#fd1050",
            "kColor0": "#0cf49b",
            "kBorderColor": "#fd1050",
            "kBorderColor0": "#0cf49b",
            "kBorderWidth": 1,
            "lineWidth": 2,
            "symbolSize": 4,
            "symbol": "circle",
            "symbolBorderWidth": 1,
            "lineSmooth": false,
            "graphLineWidth": 1,
            "graphLineColor": "#aaaaaa",
            "mapLabelColor": "#000000",
            "mapLabelColorE": "rgb(100,0,0)",
            "mapBorderColor": "#404a59",
            "mapBorderColorE": "#444444",
            "mapBorderWidth": "0.5",
            "mapBorderWidthE": 1,
            "mapAreaColor": "#323c48",
            "mapAreaColorE": "#2a333d",
            "axes": [
                {
                    "type": "all",
                    "name": "通用坐标轴",
                    "axisLineShow": true,
                    "axisLineColor": "#eeeeee",
                    "axisTickShow": true,
                    "axisTickColor": "#eeeeee",
                    "axisLabelShow": true,
                    "axisLabelColor": "#eeeeee",
                    "splitLineShow": true,
                    "splitLineColor": [
                        "#aaaaaa"
                    ],
                    "splitAreaShow": false,
                    "splitAreaColor": [
                        "#eeeeee"
                    ]
                },
                {
                    "type": "category",
                    "name": "类目坐标轴",
                    "axisLineShow": true,
                    "axisLineColor": "#333",
                    "axisTickShow": true,
                    "axisTickColor": "#333",
                    "axisLabelShow": true,
                    "axisLabelColor": "#333",
                    "splitLineShow": false,
                    "splitLineColor": [
                        "#ccc"
                    ],
                    "splitAreaShow": false,
                    "splitAreaColor": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                },
                {
                    "type": "value",
                    "name": "数值坐标轴",
                    "axisLineShow": true,
                    "axisLineColor": "#333",
                    "axisTickShow": true,
                    "axisTickColor": "#333",
                    "axisLabelShow": true,
                    "axisLabelColor": "#333",
                    "splitLineShow": true,
                    "splitLineColor": [
                        "#ccc"
                    ],
                    "splitAreaShow": false,
                    "splitAreaColor": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                },
                {
                    "type": "log",
                    "name": "对数坐标轴",
                    "axisLineShow": true,
                    "axisLineColor": "#333",
                    "axisTickShow": true,
                    "axisTickColor": "#333",
                    "axisLabelShow": true,
                    "axisLabelColor": "#333",
                    "splitLineShow": true,
                    "splitLineColor": [
                        "#ccc"
                    ],
                    "splitAreaShow": false,
                    "splitAreaColor": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                },
                {
                    "type": "time",
                    "name": "时间坐标轴",
                    "axisLineShow": true,
                    "axisLineColor": "#333",
                    "axisTickShow": true,
                    "axisTickColor": "#333",
                    "axisLabelShow": true,
                    "axisLabelColor": "#333",
                    "splitLineShow": true,
                    "splitLineColor": [
                        "#ccc"
                    ],
                    "splitAreaShow": false,
                    "splitAreaColor": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                }
            ],
            "axisSeperateSetting": false,
            "toolboxColor": "#999999",
            "toolboxEmpasisColor": "#666666",
            "tooltipAxisColor": "#eeeeee",
            "tooltipAxisWidth": "1",
            "timelineLineColor": "#eeeeee",
            "timelineLineWidth": 1,
            "timelineItemColor": "#dd6b66",
            "timelineItemColorE": "#a9334c",
            "timelineCheckColor": "#e43c59",
            "timelineCheckBorderColor": "rgba(194,53,49,0.5)",
            "timelineItemBorderWidth": 1,
            "timelineControlColor": "#eeeeee",
            "timelineControlBorderColor": "#eeeeee",
            "timelineControlBorderWidth": 0.5,
            "timelineLabelColor": "#eeeeee",
            "datazoomBackgroundColor": "rgba(47,69,84,0)",
            "datazoomDataColor": "rgba(255,255,255,0.3)",
            "datazoomFillColor": "rgba(167,183,204,0.4)",
            "datazoomHandleColor": "#a7b7cc",
            "datazoomHandleWidth": "100",
            "datazoomLabelColor": "#eeeeee"
        }
    };

})();
