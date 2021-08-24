export const htmlStatistics = statistics => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
          th {
            text-align: center;
          }
         td{
           text-align:center;
          }
         .my-header h2 { 
           display: inline;
         }
         .my-header span { 
            float: left;
         }
        </style>
        <title>PDF Statistics</title>
        </head>
        <body style=" margin: 15px 15px 15px 15px;">
        <h3><p style="text-align: center;">Order Statistics</p></h3>
        <div class="my-header">
          <span>PDF Generate At:&nbsp&nbsp</span>
          <h4>02-02-2020</h4>
        </div>
        <div class="my-header">
          <span>Time period of the statistics (orders):&nbsp&nbsp</span>
          <h4>02-02-2020 - 03-09-2020</h4>
        </div>
        <div style="clear:both"></div>
        <table style="width:100%">
          <tr>
            <th>Restaurant </th>
            <th>Total Orders:</th>
            <th>Total restaurant orders:</th>
            <th>Total office orders: </th>
            <th>Total office cost:</th>
            <th>Total cost: </th>
          </tr>
          ${Object.entries(statistics.restaurants).map(
            restaurant =>
              `<tr>
                <td>${restaurant[0]}</td>
                <td>${restaurant[1].totalOrders}</td>
                <td>${restaurant[1].totalRestaurantOrders}</td>
                <td>${restaurant[1].totalTakeawayOrders}</td>
                <td>${restaurant[1].totalTakeawayCost}</td>
                <td>${restaurant[1].totalCost}</td>
            </tr>`,
          )}
        </table>
        </html>
        `;
};
