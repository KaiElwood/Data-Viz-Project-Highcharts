let dataset = [];
let year = 2021;
let yearCent = '21cent';

Highcharts.data({
    googleSpreadsheetKey: '1DYbkiSg4vkG2OxBvTU6eYjyqHYHAeH0LgBXI2KOWkp8',
    googleSpreadsheetWorksheet: 3,
//   switchRowsAndColumns: true,
  parsed: function (columns) {
    for (let i = 1; i < columns.length; i++) {
        // console.log(columns[i]);
        // for (let j = )
        const state = columns[i][0];
        const fy21 = columns[i][1] > 0 ? columns[i][1] : .5;
        const fy20 = columns[i][2] > 0 ? columns[i][2] : .5;
        const fy19 = columns[i][3] > 0 ? columns[i][3] : .5;
        const fy18 = columns[i][4] > 0 ? columns[i][4] : .5;
        const fy17 = columns[i][5] > 0 ? columns[i][5] : .5;
        const code = columns[i][6].toLowerCase();
        const fy21cent = columns[i][10] + 1;
        const fy20cent = columns[i][11] + 1;
        const fy19cent = columns[i][12] + 1;
        const fy18cent = columns[i][13] + 1;
        const fy17cent = columns[i][14] + 1;

      dataset.push({
        name: state,
        code,
        2021: fy21,
        2020: fy20,
        2019: fy19,
        2018: fy18,
        2017: fy17,
        '21cent': fy21cent,
        '20cent': fy20cent,
        '19cent': fy19cent,
        '18cent': fy18cent,
        '17cent': fy17cent
      });
      data = Object.values(dataset);
    }
    console.log(data)
    renderChart(data);
  },
});

function renderChart(data) {
    Highcharts.mapChart("hcContainer2", {
    title: {
      text: "Most Common Refugee Resettlement States, Adjusted by Population Size",
      style: {
        fontFamily: "Roboto, Arial, sans-serif",
      },
    },
    subtitle: {
        text: `Fiscal Year ${year}`,
        style: {
            fontFamily: "Roboto, Arial, sans-serif",
        }
    },
    legend: {
      itemMarginBottom: 30,
    },
    colorAxis: {
        min: 1,
        max: 1.1,
        type: 'logarithmic',
        minColor: '#EEEEFF',
        maxColor: '#000022',
        stops: [
            [0, '#EFEFFF'],
            [0.30, '#4444FF'],
            [1, '#000022']
        ]
    },
    credits: {
      enabled: true,
      href: false,
      text:
        "CSIS Kai Project <br/> Source: National Bureau of Statistics of China",
      position: {
        y: -15,
      },
      style: {
        fontFamily: "Roboto, Arial, sans-serif",
      },
    },
    tooltip: {
        valueSuffix: ' people',
        formatter: function () {
            // console.log(this.point[2021]);
            var point = this.point[year] >= 1 ? this.point[year] : 0;
            return (
            `<span style="color:${this.color}"> </span> <b>${this.key}, ${year}</b>: ` + point
            );
        },
        style: {
            fontFamily: "Roboto, Arial, sans-serif",
        }
    },
    series: [
      {
        data: data,
        mapData: Highcharts.maps["countries/us/us-all"],
        borderColor: "white",
        colorKey: `${yearCent}`,
        joinBy: ["hc-key", "code"],
        nullColor: "#fff",
      },
    ],
  }, function(chart){
      for (i=2017; i<2022; i++){
        chart.renderer.button([i], 40, 50+(i-2016)*35)
            .attr({
                zIndex: 3,
                value: [i]
            })
            .on('click', function (e) {
                var target = e.target.parentNode;
                year = target.getAttribute("value");
                yearCent = year.slice(2) + "cent";
                document.getElementsByClassName('highcharts-subtitle')[1].innerHTML = 'Fiscal Year ' + year;
                chart.series[0].data[0].update({
                    colorKey: `${yearCent}`
                })
                // chart.series.colorKey = `${yearCent}`;
                // console.log(chart.series.colorKey);
                // chart.redraw();
                // element = target;
                // console.log(target.getAttribute())
                // renderChart(dataset);
            })
            .add();
      }
      
  });
//     renderer.rect(10, 10, 100, 50, 5)
//         .attr({
//             fill: '#FFFFEF',
//             stroke: 'gray',
//             'stroke-width': 1,
//             zIndex: 4
//         })
//         .add();
//   var point = chart.series[0].data[8],
//         text = chart.renderer.text(
//             'Max',
//             point.plotX + chart.plotLeft + 10,
//             point.plotY + chart.plotTop - 10
//         ).attr({
//             zIndex: 5
//         }).add(),
//         box = text.getBBox();

//     chart.renderer.rect(box.x - 5, box.y - 5, box.width + 10, box.height + 10, 5)
//         .attr({
//             fill: '#FFFFEF',
//             stroke: 'gray',
//             'stroke-width': 1,
//             zIndex: 4
//         })
//         .add();
}

// Highcharts.mapChart('hcContainer2', {
//     chart: {
//         map: 'countries/us/us-all',
//         borderWidth: 1
//     },

//     title: {
//         text: 'Most Common Refugee Resettlement States, Adjusted by Population Size'
//     },

//     exporting: {
//         sourceWidth: 600,
//         sourceHeight: 500
//     },

//     legend: {
//         layout: 'horizontal',
//         borderWidth: 0,
//         backgroundColor: 'rgba(255,255,255,0.85)',
//         floating: true,
//         verticalAlign: 'top',
//         y: 25
//     },

//     mapNavigation: {
//         enabled: true
//     },

//     colorAxis: {
//         min: 1,
//         type: 'logarithmic',
//         minColor: '#EEEEFF',
//         maxColor: '#000022',
//         stops: [
//             [0, '#EFEFFF'],
//             [0.67, '#4444FF'],
//             [1, '#000022']
//         ]
//     },

//     series: [{
//         animation: {
//             duration: 1000
//         },
//         data: {
//             googleSpreadsheetKey: '1DYbkiSg4vkG2OxBvTU6eYjyqHYHAeH0LgBXI2KOWkp8',
//             googleSpreadsheetWorksheet: 3
//         },
//         joinBy: ['state'],
//         dataLabels: {
//             enabled: true,
//             color: '#FFFFFF',
//             format: '{point.state}'
//         },
//         name: 'Population density',
//         tooltip: {
//             pointFormat: '{point.code}: {point.value}/km²'
//         }
//     }]
// });

// Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/us-population-density.json', function (data) {

//   // Make codes uppercase to match the map data
//   data.forEach(function (p) {
//     p.code = p.code.toUpperCase();
//   });

//   // Instantiate the map
//   Highcharts.mapChart('hcContainer2', {

//     chart: {
//       map: 'countries/us/us-all',
//       borderWidth: 1
//     },

//     title: {
//       text: 'US population density (/km²)'
//     },

//     exporting: {
//       sourceWidth: 600,
//       sourceHeight: 500
//     },

//     legend: {
//       layout: 'horizontal',
//       borderWidth: 0,
//       backgroundColor: 'rgba(255,255,255,0.85)',
//       floating: true,
//       verticalAlign: 'top',
//       y: 25
//     },

//     mapNavigation: {
//       enabled: true
//     },

//     colorAxis: {
//       min: 1,
//       type: 'logarithmic',
//       minColor: '#EEEEFF',
//       maxColor: '#000022',
//       stops: [
//         [0, '#EFEFFF'],
//         [0.67, '#4444FF'],
//         [1, '#000022']
//       ]
//     },

//     series: [{
//       animation: {
//         duration: 1000
//       },
//       data: data,
//       joinBy: ['postal-code', 'code'],
//       dataLabels: {
//         enabled: true,
//         color: '#FFFFFF',
//         format: '{point.code}'
//       },
//       name: 'Population density',
//       tooltip: {
//         pointFormat: '{point.code}: {point.value}/km²'
//       }
//     }]
//   });
// });