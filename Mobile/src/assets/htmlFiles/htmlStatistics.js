import moment from 'moment';

export const htmlStatistics = (
  statistics,
  selectedRestaurant,
  selectedUser,
  orderStart,
  orderEnd,
) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
          th, td {
            text-align: center;
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
          <span>PDF generated at:&nbsp&nbsp</span>
          <h4>${moment(Date.now()).format('DD-MM-YYYY')}</h4>
        </div>
        <div class="my-header">
          <span>Time period of the statistics (orders):&nbsp&nbsp</span>
          <h4>${orderStart} - ${orderEnd}</h4>
        </div>
        <div>Statistics realised for <strong>${selectedRestaurant}</strong> and <strong>${selectedUser}</strong>. Currency: <strong>RON</strong>. </div>
        <div style="clear:both"></div>
        <h3 style="text-align: center;">Restaurants Orders</h3>
        <table style="width:100%">
          <tr>
            <th>Restaurant</th>
            <th>Total Orders</th>
            <th>At restaurant</th>
            <th>At office</th>
            <th>Total office cost (RON)</th>
            <th>Total cost (RON)</th>
          </tr>
          ${Object.entries(statistics.restaurants)
            .map(
              restaurant =>
                `<tr>
                  <td>${restaurant[0]}</td>
                  <td>${restaurant[1].totalOrders}</td>
                  <td>${restaurant[1].totalRestaurantOrders}</td>
                  <td>${restaurant[1].totalTakeawayOrders}</td>
                  <td>${restaurant[1].totalTakeawayCost}</td>
                  <td>${restaurant[1].totalCost}</td>
                </tr>`,
            )
            .join('')}
        </table>
        <h3 style="text-align: center;">Users Orders</h3>
        <table style="width:100%">
          <tr>
            <th>User</th>
            <th>Restaurants</th>
          </tr>
          ${Object.entries(statistics.users)
            .map(
              user =>
                `<tr>
                <td>${user[0].split('(', 1)[0]}</br>(${
                  user[0].split('(')[1]
                }</td>
                <td>
                  <table style="width:100%;
                     border-collapse: collapse;
                     border-style: hidden;">
                    <tr>
                      <th>Restaurant</th>
                      <th>Total Orders</th>
                      <th>At restaurant</th>
                      <th>At office</th>
                      <th>Total office cost (RON)</th>
                      <th>Total cost (RON)</th>
                    </tr>
                    ${Object.entries(user[1])
                      .map(
                        restaurant =>
                          `<tr>
                            <td>${restaurant[0]}</td>
                            <td>${restaurant[1].totalOrders}</td>
                            <td>${restaurant[1].totalRestaurantOrders}</td>
                            <td>${restaurant[1].totalTakeawayOrders}</td>
                            <td>${restaurant[1].totalTakeawayCost}</td>
                            <td>${restaurant[1].totalCost}</td>
                          </tr>`,
                      )
                      .join('')}
                  </table>
                </td>
              </tr>`,
            )
            .join('')}
          </tbody>
        </table>
        </html>
        `;
};
