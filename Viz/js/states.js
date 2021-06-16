let dataset = [];
let year = 2021;
let element;

Highcharts.data({
    googleSpreadsheetKey: '1DYbkiSg4vkG2OxBvTU6eYjyqHYHAeH0LgBXI2KOWkp8',
    googleSpreadsheetWorksheet: 3,
//   switchRowsAndColumns: true,
  parsed: function (columns) {
    for (let i = 1; i < columns.length; i++) {
        // console.log(columns[i]);
        // for (let j = )
        const state = columns[i][0];
        const fy21 = columns[i][1];
        const fy20 = columns[i][2];
        const fy19 = columns[i][3];
        const fy18 = columns[i][4];
        const fy17 = columns[i][5]
        const code = columns[i][6].toLowerCase();

      dataset.push({
        name: state,
        code,
        2021: fy21,
        2020: fy20,
        2019: fy19,
        2018: fy18,
        2017: fy17
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
      },
    },
    legend: {
      itemMarginBottom: 30,
    },
    colorAxis: {
        min: 1,
        max: 10000,
        type: 'logarithmic',
        minColor: '#EEEEFF',
        maxColor: '#000022',
        stops: [
            [0, '#EFEFFF'],
            [0.80, '#4444FF'],
            [1, '#000022']
        ]
    },
    credits: {
      enabled: true,
      href: false,
      text:
        "CSIS China Power Project <br/> Source: National Bureau of Statistics of China",
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
            return (
            `<span style="color:${this.color}"> </span> <b>${this.key}, ${year}</b>: ` + this.point[year]
            );
        },
        style: {
            fontFamily: "Roboto, Arial, sans-serif",
        }
    },
    // tooltip: {
    //   formatter: function () {
    //     return (
    //       `<span style="color:${this.color}">\u25CF </span> <b>${this.key}</b>:
    //   $` + Highcharts.numberFormat(this.point.options.value, 2, ".", ",")
    //     );
    //   },
    //   style: {
    //     fontFamily: "Roboto, Arial, sans-serif",
    //   },
    // },
    series: [
      {
        data: data,
        mapData: Highcharts.maps["countries/us/us-all"],
        borderColor: "white",
        joinBy: ["hc-key", "code"],
        nullColor: "#4E6D78",
      },
    ],
  }, function(chart){
      console.log(chart);
      for (i=2017; i<2022; i++){
        chart.renderer.button([i], 40, 50+(i-2016)*35)
            .attr({
                zIndex: 3,
                value: [i]
            })
            .on('click', function (e) {
                var target = e.target.parentNode;
                year = target.getAttribute("value");
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