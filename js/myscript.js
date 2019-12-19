// API MESSAGES

    function getMessages() {

        const messages = document.getElementById('messages');

        fetch('https://inlupp-fa.azurewebsites.net/api/messages')
        .then(res => res.json())
        .then(data => {

            for(message of data) {
                messages.insertAdjacentHTML('beforeend', `
                <a class="dropdown-item preview-item">
                <div class="preview-thumbnail">
                  <img src="https://via.placeholder.com/36x36" alt="image" class="profile-pic">
                </div>
                <div class="preview-item-content flex-grow">
                  <h6 class="preview-subject ellipsis font-weight-normal" id="messages">${message.from}</h6>
                  <p class="font-weight-light small-text text-muted mb-0">${message.title}</p>
                </div>
                </a>
                `);
            }
        });
    }

    getMessages();

// API NOTIFICATIONS 

    function getNotifications() {

        const notifications = document.getElementById('notifications');

        fetch('https://inlupp-fa.azurewebsites.net/api/notifications')
        .then(res => res.json())
        .then(data => {

            for(notification of data) {
                notifications.insertAdjacentHTML('beforeend', `
                <a class="dropdown-item preview-item">
                    <div class="preview-thumbnail">
                      <div class="preview-icon bg-success">
                        <i class="mdi mdi-information mx-0"></i>
                      </div>
                    </div>
                    <div class="preview-item-content">
                      <h6 class="preview-subject font-weight-normal">${notification.title}</h6>
                      <p class="font-weight-light small-text mb-0 text-muted">${notification.subtitle}</p>
                    </div>
                  </a>
                `)
            }
        });
    }

    getNotifications();


// API TOTAL-SALES, TOTAL-PURCHASES, TOTAL-ORDERS, TOTAL-GROWTH

    function getTotalAll(id, url) {

        fetch(url)
        .then(res => res.json())
        .then(data => {

        document.getElementById(id).innerHTML = data.currency + data.amount
           
        });
    }

    getTotalAll('totalSales','https://inlupp-fa.azurewebsites.net/api/total-sales');
    getTotalAll('totalPurchases','https://inlupp-fa.azurewebsites.net/api/total-purchases');
    getTotalAll('totalOrders','https://inlupp-fa.azurewebsites.net/api/total-orders');
    getTotalAll('totalGrowth','https://inlupp-fa.azurewebsites.net/api/total-growth');

// API TOTAL-USERS

    function getTotalUsers() {

        fetch('https://inlupp-fa.azurewebsites.net/api/total-users')
        .then(res => res.json())
        .then(data => {

          document.getElementById('totalUsersUsers').innerHTML = data.users.toLocaleString()
          document.getElementById('totalUsersGrowth').innerHTML = '+' + data.growth + '%'

          if ($("#users-chart").length) {
            var areaData = {
              labels: data.dataset.labels,
              datasets: [{
                  data: data.dataset.data,
                  backgroundColor: [
                    '#e0fff4'
                  ],
                  borderWidth: 2,
                  borderColor: "#00c689",
                  fill: 'origin',
                  label: "purchases"
                }
              ]
            };
            var areaOptions = {
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                filler: {
                  propagate: false
                }
              },
              scales: {
                xAxes: [{
                  display: false,
                  ticks: {
                    display: true
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    color: 'transparent',
                    zeroLineColor: '#eeeeee'
                  }
                }],
                yAxes: [{
                  display: false,
                  ticks: {
                    display: true,
                    autoSkip: false,
                    maxRotation: 0,
                    stepSize: 100,
                    min: 0,
                    max: 300
                  },
                  gridLines: {
                    drawBorder: false
                  }
                }]
              },
              legend: {
                display: false
              },
              tooltips: {
                enabled: true
              },
              elements: {
                line: {
                  tension: .35
                },
                point: {
                  radius: 0
                }
              }
            }
            var salesChartCanvas = $("#users-chart").get(0).getContext("2d");
            var salesChart = new Chart(salesChartCanvas, {
              type: 'line',
              data: areaData,
              options: areaOptions
            });
          }
        })

    }

    getTotalUsers();

// API TOTAL-PROJECTS

    function getTotalProjects() {

        fetch('https://inlupp-fa.azurewebsites.net/api/total-projects')
        .then(res => res.json())
        .then(data => {

            document.getElementById('totalProjectsProjects').innerHTML = data.projects + '%'
            document.getElementById('totalProjectsGrowth').innerHTML = '+' + data.growth + '%'

            if ($("#projects-chart").length) {
                var areaData = {
                  labels: data.dataset.labels,
                  datasets: [{
                      data: data.dataset.data,
                      backgroundColor: [
                        '#e5f2ff'
                      ],
                      borderWidth: 2,
                      borderColor: "#3da5f4",
                      fill: 'origin',
                      label: "purchases"
                    }
                  ]
                };
                var areaOptions = {
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    filler: {
                      propagate: false
                    }
                  },
                  scales: {
                    xAxes: [{
                      display: false,
                      ticks: {
                        display: true
                      },
                      gridLines: {
                        display: false,
                        drawBorder: false,
                        color: 'transparent',
                        zeroLineColor: '#eeeeee'
                      }
                    }],
                    yAxes: [{
                      display: false,
                      ticks: {
                        display: true,
                        autoSkip: false,
                        maxRotation: 0,
                        stepSize: 100,
                        min: 0,
                        max: 300
                      },
                      gridLines: {
                        drawBorder: false
                      }
                    }]
                  },
                  legend: {
                    display: false
                  },
                  tooltips: {
                    enabled: true
                  },
                  elements: {
                    line: {
                      tension: .05
                    },
                    point: {
                      radius: 0
                    }
                  }
                }
                var salesChartCanvas = $("#projects-chart").get(0).getContext("2d");
                var salesChart = new Chart(salesChartCanvas, {
                  type: 'line',
                  data: areaData,
                  options: areaOptions
                });
              }
        })
    }

    getTotalProjects();


// API TOTAL-SALES-CHART

    function getTotalSalesChart() {
        
        fetch('https://inlupp-fa.azurewebsites.net/api/total-sales-chart')
        .then(res => res.json())
        .then(data => {

            document.getElementById('salesRevenue').innerHTML = data.revenue.toLocaleString()
            document.getElementById('salesReturns').innerHTML = data.returns.toLocaleString()
            document.getElementById('salesQueries').innerHTML = data.queries.toLocaleString()
            document.getElementById('salesInvoices').innerHTML = data.invoices.toLocaleString()

            if ($("#total-sales-chart").length) {
                var areaData = {
                  labels: data.labels,
                  datasets: [
                    {
                      data: data.datasets[0].data,
                      backgroundColor: [
                        'rgba(61, 165, 244, .0)'
                      ],
                      borderColor: [
                        'rgb(61, 165, 244)'
                      ],
                      borderWidth: 2,
                      fill: 'origin',
                      label: "services"
                    },
                    {
                      data: data.datasets[1].data,
                      backgroundColor: [
                        'rgba(241, 83, 110, .0)'
                      ],
                      borderColor: [
                        'rgb(241, 83, 110)'
                      ],
                      borderWidth: 2,
                      fill: 'origin',
                      label: "services"
                    }
                  ]
                };
                var areaOptions = {
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    filler: {
                      propagate: false
                    }
                  },
                  scales: {
                    xAxes: [{
                      display: true,
                      ticks: {
                        display: true,
                        padding: 20,
                        fontColor:"#000",
                        fontSize: 14
                      },
                      gridLines: {
                        display: false,
                        drawBorder: false,
                        color: 'transparent',
                        zeroLineColor: '#eeeeee'
                      }
                    }],
                    yAxes: [{
                      display: true,
                      ticks: {
                        display: true,
                        autoSkip: false,
                        maxRotation: 0,
                        stepSize: 100,
                        fontColor: "#000",
                        fontSize: 14,
                        padding: 18,
                        stepSize: 100000,
                        callback: function(value) {
                          var ranges = [
                              { divider: 1e6, suffix: 'M' },
                              { divider: 1e3, suffix: 'k' }
                          ];
                          function formatNumber(n) {
                              for (var i = 0; i < ranges.length; i++) {
                                if (n >= ranges[i].divider) {
                                    return (n / ranges[i].divider).toString() + ranges[i].suffix;
                                }
                              }
                              return n;
                          }
                          return formatNumber(value);
                        }
                      },
                      gridLines: {
                        drawBorder: false
                      }
                    }]
                  },
                  legend: {
                    display: false
                  },
                  tooltips: {
                    enabled: true
                  },
                  elements: {
                    line: {
                      tension: .37
                    },
                    point: {
                      radius: 0
                    }
                  }
                }
                var revenueChartCanvas = $("#total-sales-chart").get(0).getContext("2d");
                var revenueChart = new Chart(revenueChartCanvas, {
                  type: 'line',
                  data: areaData,
                  options: areaOptions
                });
              }
        })
    }

    getTotalSalesChart();


// API DOWNLOADS


    function getDownloads() {

        fetch('https://inlupp-fa.azurewebsites.net/api/downloads')
        .then(res => res.json())
        .then(data => {

            document.getElementById('amountOffline').innerHTML = data[0].offlineAmount.toLocaleString()
            document.getElementById('amountOnline').innerHTML = data[1].onlineAmount.toLocaleString()

            if ($('#offlineProgress').length) {
                var bar = new ProgressBar.Circle(offlineProgress, {
                  color: '#000',
                  // This has to be the same size as the maximum width to
                  // prevent clipping
                  strokeWidth: 6,
                  trailWidth: 6,
                  easing: 'easeInOut',
                  duration: 1400,
                  text: {
                    autoStyleContainer: true,
                    style : {
                      color : "#fff",
                      position: 'absolute',
                      left: '40%',
                      top: '50%'
                    }
                  },
                  svgStyle: {
                    width: '90%'
                  },
                  from: {
                    color: '#f1536e',
                    width: 6
                  },
                  to: {
                    color: '#f1536e',
                    width: 6
                  },
                  // Set default step function for all animate calls
                  step: function(state, circle) {
                    circle.path.setAttribute('stroke', state.color);
                    circle.path.setAttribute('stroke-width', state.width);
            
                    var value = Math.round(circle.value() * 100);
                    if (value === 0) {
                      circle.setText('');
                    } else {
                      circle.setText(value);
                    }
            
                  }
                });
            
                bar.text.style.fontSize = '1rem';
                bar.animate(data[0].circleValue); // Number from 0.0 to 1.0
              }

            if ($('#onlineProgress').length) {
                var bar = new ProgressBar.Circle(onlineProgress, {
                  color: '#000',
                  // This has to be the same size as the maximum width to
                  // prevent clipping
                  strokeWidth: 6,
                  trailWidth: 6,
                  easing: 'easeInOut',
                  duration: 1400,
                  text: {
                    autoStyleContainer: true,
                    style : {
                      color : "#fff",
                      position: 'absolute',
                      left: '40%',
                      top: '50%'
                    }
                  },
                  svgStyle: {
                    width: '90%'
                  },
                  from: {
                    color: '#fda006',
                    width: 6
                  },
                  to: {
                    color: '#fda006',
                    width: 6
                  },
                  // Set default step function for all animate calls
                  step: function(state, circle) {
                    circle.path.setAttribute('stroke', state.color);
                    circle.path.setAttribute('stroke-width', state.width);
            
                    var value = Math.round(circle.value() * 100);
                    if (value === 0) {
                      circle.setText('');
                    } else {
                      circle.setText(value);
                    }
            
                  }
                });
            
                bar.text.style.fontSize = '1rem';
                bar.animate(data[1].circleValue); // Number from 0.0 to 1.0
              }
        })
    }

    getDownloads();


// API USERS 

function getUsers(firstName, lastName) {

fetch(`https://inlupp-fa.azurewebsites.net/api/users?firstname=${firstName}&lastname=${lastName}`)
.then(res => res.text())
.then(data => { 

    let names = data.split('  ')

    document.getElementById('userFullName').innerHTML = names
    document.getElementById('welcomeMessages').innerHTML = 'Hi ' + firstName + ', Welcomeback!'


})

}

getUsers('Mathilda','Sollerhag');


    

   

