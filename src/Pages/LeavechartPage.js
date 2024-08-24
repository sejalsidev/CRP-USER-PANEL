import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';

const LeavechartPage = () => {
    const [leaveData, setLeaveData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:2000/leave/get");
            const leaveCounts = calculateMonthlyLeaveCounts(response.data.data);
            setLeaveData(leaveCounts);
        } catch (error) {
            console.log("Error Fetching Data", error);
        }
    };

    const calculateMonthlyLeaveCounts = (data) => {
        const months = Array(12).fill(0);

        data.forEach(leave => {
            const month = new Date(leave.startDate).getMonth();
            const leaveCount = leave.leaveType === 'Half leave' ? 0.5 : 1;
            months[month] += leaveCount;
        });

        return months;
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (leaveData.length > 0) {
            const options = {
                chart: {
                    height: 500,
                    width: '100%',
                    type: 'line',
                },
                series: [
                    {
                        name: 'Leave Count',
                        type: 'line',
                        data: leaveData,
                    },
                    {
                        name: 'Cumulative Leave Count',
                        type: 'line',
                        data: leaveData.reduce((acc, val) => {
                            // Calculate cumulative data
                            if (acc.length === 0) {
                                acc.push(val);
                            } else {
                                acc.push(acc[acc.length - 1] + val);
                            }
                            return acc;
                        }, [])
                    }
                ],
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yaxis: {
                    tickAmount: 20,
                    min: 0,
                    max: 10,
                    decimalsInFloat: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val.toFixed(1) + " days";
                        }
                    }
                },
                plotOptions: {
                    bar: {
                        colors: {
                            ranges: [
                                {
                                    from: 0,
                                    to: 0.5,
                                    color: '#33FF57'
                                },
                                {
                                    from: 0.5,
                                    to: 10,
                                    color: '#FF5733'
                                }
                            ]
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val.toFixed(1);
                    }
                }
            };

            const chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [leaveData]);

    return (
        <div id="chart" style={{ maxWidth: '100%', margin: 'auto' }}></div>
    );
};

export default LeavechartPage;
