// prettier-ignore
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
         td div, th div{
          page-break-inside: avoid;
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
              </tr>`
          )}
        </table></br>
        <table style="width:100%">
          <tr>
            <th>User</th>
            <th>Restaurants</th>
          </tr>
          ${Object.entries(statistics.users).map(
            user =>
              `<tr>
                <td><div>${user[0]}</div></td>
                <td><div>
                  <table style="width:100%;
                     border-collapse: collapse;
                     border-style: hidden;">
                    <tr>
                      <th><div>Restaurant </div></th>
                      <th><div>Total Orders:</div></th>
                      <th><div>Total restaurant orders:</div></th>
                      <th><div>Total office orders: </div></th>
                      <th><div>Total office cost:</div></th>
                      <th><div>Total cost:</div> </th>
                    </tr>
                    ${Object.entries(user[1]).map(
                      restaurant =>
                        `<tr>
                        <td><div>${restaurant[0]}</div></td>
                        <td><div>${restaurant[1].totalOrders}</div></td>
                        <td><div>${restaurant[1].totalRestaurantOrders}</div></td>
                        <td><div>${restaurant[1].totalTakeawayOrders}</div></td>
                        <td><div>${restaurant[1].totalTakeawayCost}</div></td>
                        <td><div>${restaurant[1].totalCost}</div></td>
                      </tr>`
                    )}
                  </table>
                  </div>
                </td>
              </tr>`
          )}
        </table>
        </html>
        `;
};
