Highcharts.chart('hcContainer', {
    // Load Data in from Google Sheets
    data: {
      googleSpreadsheetKey: '1DYbkiSg4vkG2OxBvTU6eYjyqHYHAeH0LgBXI2KOWkp8',
      googleSpreadsheetWorksheet: 2
    },
    // General Chart Options
    chart: {
      zoomType: 'none',
      type: 'line'
    },
    // colors: ['#4D6E79', '#303D43', '#907561', '#781F30', '#EC382A', '#61884D', '#C9AC4D', '#52496D', '#5AA992', '#887295', '#2576CE', '#aa266a'],
    // Chart Title and Subtitle
    title: {
      text: "Unaccompanied Child Migrants at the US Border"
    },
    subtitle: {
      text: "Apprehensions and Resettlements 2017-2021*"
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Project Kai | Source: OFFICE OF REFUGEE RESETTLEMENT"
    },
    // Chart Legend
    legend: {
      title: {
        text: 'Data<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(**FY 2021 has not been completed, so numbers are current as of April)</span>'
      },
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    // Y Axis
    yAxis: {
      title: { 
        text: "Number of Minors"
      },
    },
    // Additional Plot Options
    plotOptions:
    {
      area: {
        // stacking: null, // Normal bar graph
        stacking: "normal", // Stacked bar graph
        marker: {
          enabled: false,
          symbol: "circle"
        }
      }
    }
})
