let dataset = [];
let avgPerPop;
let totalStates = 0;

(array, key) => array.reduce((acc, val) => newF.push(val.percentPop),0);

Highcharts.data({
    // googleSpreadsheetKey: '1DYbkiSg4vkG2OxBvTU6eYjyqHYHAeH0LgBXI2KOWkp8',
    // googleSpreadsheetWorksheet: 4,
    csv: document.getElementById('csv').innerHTML,
//   switchRowsAndColumns: true,
  parsed: function (columns) {
    for (let i = 1; i < columns.length; i++) {

        const state = columns[i][1].toLowerCase();
        const code = columns[i][0].toLowerCase();
        const stateAbv = columns[i][2];
        const percentPop = columns[i][3];
        totalStates ++;

      dataset.push({
        state,
        code,
        stateAbv,
        percentPop
      });
    }
    dataset.sort((a, b) => b.percentPop - a.percentPop);
    data = Object.values(dataset);
    console.log(data)
    console.log(dataset)
    avgPerPop = (dataset.reduce((acc, val) => val.percentPop + acc, 0)/totalStates);
    renderChart(data);
  },
});

function renderChart(data) {
    Highcharts.chart('container', {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Unaccompanied Minors as Percent of Population, Average 2017-2021*'
        },
        subtitle: {
            text: 'Source: US Office of Refugee Resettlement'
        },
        xAxis: [{
            categories: data.map((data) => data.state),
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value} %',
            },
            title: {
                text: 'Percent of Population',
            }
        }],
        tooltip: {
            shared: true
        },
        legend: {
            // layout: 'horizontal',
            // align: 'bottom',
            // // x: 120,
            // verticalAlign: 'bottom',
            // horizontalAlign: 'right',
            // // y: 100,
            // floating: true,
            // backgroundColor:
            //     Highcharts.defaultOptions.legend.backgroundColor || // theme
            //     'rgba(255,255,255,0.25)'
        },
        // colorAxis: {
        //     min: 0,
        //     max: .05,
        //     type: 'linear',
        //     minColor: '#EEEEFF',
        //     maxColor: '#000022'
        // },
        series: [{
            name: 'Average % of State Population',
            type: 'column',
            data: data.map((data) => data.percentPop),
            tooltip: {
                valueSuffix: '%'
            }

        }, {
            name: 'US-Wide Average % of Population',
            marker: {
              enabled: false
            },
            type: 'spline',
            data: data.map((data) => avgPerPop),
            tooltip: {
                valueSuffix: '%'
            }
        }]
    });
}

calculateColor = function(inputColor, min, max, value) {
    color = new Highcharts.Color(inputColor);
    interval = max - min;
    adjustedValue = value - min;
    alpha = adjustedValue / interval;
    return color.tweenTo(maxColor, alpha);
};