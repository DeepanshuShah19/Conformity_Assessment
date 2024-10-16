import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { ArcElement, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../CSS/DataCharts.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ArcElement, PointElement);

export default class DataCharts extends Component {
    render() {
        const { complianceData } = this.props;

        // Calculate user metrics
        const userMetrics = complianceData.map(doc => {
            const { userID, compliance } = doc;

            const completed =
                (compliance.privacyTraining ? 1 : 0) +
                (compliance.amlCertification ? 1 : 0) +
                (compliance.codeOfConduct ? 1 : 0) +
                (compliance.securityTraining ? 1 : 0) +
                (compliance.riskManagementTraining ? 1 : 0) +
                (compliance.backgroundCheck ? 1 : 0);

            const pending =
                (!compliance.privacyTraining ? 1 : 0) +
                (!compliance.amlCertification ? 1 : 0) +
                (!compliance.codeOfConduct ? 1 : 0) +
                (!compliance.securityTraining ? 1 : 0) +
                (!compliance.riskManagementTraining ? 1 : 0) +
                (!compliance.backgroundCheck ? 1 : 0);

            const incidents = compliance.incidentReports;
            return { userID, completed, pending, incidents };
        });

        // Prepare data for the mixed chart
        const labels = userMetrics.map(user => user.userID);
        const completedCounts = userMetrics.map(user => user.completed);
        const totalMetrics = 6; // Total compliance metrics
        const compliancePercentages = completedCounts.map(count => (count / totalMetrics) * 100);

        // Calculate the average compliance percentage
        const averageCompliance = compliancePercentages.reduce((sum, value) => sum + value, 0) / compliancePercentages.length;

        // Initialize compliance metrics
        const metrics = {
            privacyTraining: { completed: 0, pending: 0 },
            amlCertification: { completed: 0, pending: 0 },
            codeOfConduct: { completed: 0, pending: 0 },
            securityTraining: { completed: 0, pending: 0 },
            riskManagementTraining: { completed: 0, pending: 0 },
            backgroundCheck: { completed: 0, pending: 0 }
        };

        // Calculate compliance metrics
        complianceData.forEach(doc => {
            const { compliance } = doc;

            if (compliance.privacyTraining) {
                metrics.privacyTraining.completed++;
            } else {
                metrics.privacyTraining.pending++;
            }

            if (compliance.amlCertification) {
                metrics.amlCertification.completed++;
            } else {
                metrics.amlCertification.pending++;
            }

            if (compliance.codeOfConduct) {
                metrics.codeOfConduct.completed++;
            } else {
                metrics.codeOfConduct.pending++;
            }

            if (compliance.securityTraining) {
                metrics.securityTraining.completed++;
            } else {
                metrics.securityTraining.pending++;
            }

            if (compliance.riskManagementTraining) {
                metrics.riskManagementTraining.completed++;
            } else {
                metrics.riskManagementTraining.pending++;
            }

            if (compliance.backgroundCheck) {
                metrics.backgroundCheck.completed++;
            } else {
                metrics.backgroundCheck.pending++;
            }
        });

        // Chart data for the mixed chart
        const chartData = {
            labels: labels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Compliance %',
                    data: compliancePercentages,
                    backgroundColor: 'rgba(141,186,1,0.9)',
                    borderColor: 'rgba(141,186,1,1)',
                    borderWidth: 1,
                },
                {
                    type: 'line',
                    label: 'Average Compliance %',
                    data: Array(labels.length).fill(averageCompliance),
                    backgroundColor: 'rgba(195,79,80,1)',
                    borderColor: 'rgba(195,79,80,1)',
                    borderWidth: 2,
                    fill: false,
                }
            ],
        };

        // Chart options
        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Compliance Percentage'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'User ID'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
        };

        const stackedLabels = Object.keys(metrics);
        const stackedCompletedCounts = stackedLabels.map(label => metrics[label].completed);
        const stackedPendingCounts = stackedLabels.map(label => metrics[label].pending);

        const stackedChartData = {
            labels: stackedLabels,
            datasets: [
                {
                    label: 'Completed',
                    data: stackedCompletedCounts,
                    backgroundColor: 'rgba(141,186,1,1)',
                    borderColor: 'rgba(141,186,1,1)',
                },
                {
                    label: 'Pending',
                    data: stackedPendingCounts,
                    backgroundColor: 'rgba(195,79,80,1)',
                    borderColor: 'rgba(195,79,80,255)',
                },
            ],
        };

        // Options for the stacked bar chart
        const stackedOptions = {
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Compliance Metrics',
                    },
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Users',
                    },
                },
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
        };

        // Prepare data for the line chart
        const incidentChartLabels = userMetrics.map(user => user.userID);
        const incidentChartData = userMetrics.map(user => user.incidents);

        // Chart data for the incident report line chart
        const incidentLineChartData = {
            labels: incidentChartLabels,
            datasets: [
                {
                    label: 'Incident Reports',
                    data: incidentChartData,
                    backgroundColor: 'rgba(195,79,80,1)',
                    borderColor: 'rgba(195,79,80,255)',
                    fill: true,
                },
            ],
        };

        // Options for the line chart
        const incidentLineChartOptions = {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Incidents',
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'User ID',
                    },
                },
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
        };

        // Chart data for the pie chart
        const pieChartData = {
            labels: ['Completed Tasks', 'Pending Tasks'],
            datasets: [
                {
                    label: 'Task Status',
                    data: [
                        metrics.privacyTraining.completed +
                        metrics.amlCertification.completed +
                        metrics.codeOfConduct.completed +
                        metrics.securityTraining.completed +
                        metrics.riskManagementTraining.completed +
                        metrics.backgroundCheck.completed,
                        metrics.privacyTraining.pending +
                        metrics.amlCertification.pending +
                        metrics.codeOfConduct.pending +
                        metrics.securityTraining.pending +
                        metrics.riskManagementTraining.pending +
                        metrics.backgroundCheck.pending,
                    ],
                    backgroundColor: [
                        'rgba(141,186,1,1)',
                        'rgba(195,79,80,1)',
                    ],
                },
            ],
        };

        return (
            <>
                <div className="dashboard">
                <div className="dashboard-container">
                        {/* chart for individual user compliance */}
                        <div className="table-container">
                            <h2>User Compliance Percentage</h2>
                            <Bar data={chartData} options={options} />
                        </div>

                        {/* chart to display compliances metrics */}
                        <div className="table-container">
                            <h2>Stacked Compliance Metrics</h2>
                            <Bar data={stackedChartData} options={stackedOptions} />
                        </div>
                    </div>

                    <div className="dashboard-container">
                        {/* chart to display number of incidents across users */}
                        <div className="table-container">
                            <h2>Incident Reports by User</h2>
                            <Line data={incidentLineChartData} options={incidentLineChartOptions} />
                        </div>

                        {/*chart to display total pending and completed tasks  */}
                        <div className="table-container pie-chart-container" style={{ height: '400px' }}>
                            <h2>Total Completed vs Pending Tasks</h2>
                            <Pie data={pieChartData} />
                        </div>
                    </div>

                    <div className="dashboard-container" style={{marginTop: '5%'}}>
                        {/* table to display user compliance metrics */}
                        <div className="table-container">
                            <h2>User Compliance Metrics</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Completed</th>
                                        <th>Pending</th>
                                        <th>Incidents</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userMetrics.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.userID}</td>
                                            <td>{user.completed}</td>
                                            <td>{user.pending}</td>
                                            <td>{user.incidents}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* table to display compliance metrics summary */}
                        <div className="table-container">
                            <h2>Compliance Metrics Summary</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Metric</th>
                                        <th>Completed</th>
                                        <th>Pending</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Privacy Training</td>
                                        <td>{metrics.privacyTraining.completed}</td>
                                        <td>{metrics.privacyTraining.pending}</td>
                                    </tr>
                                    <tr>
                                        <td>AML Certification</td>
                                        <td>{metrics.amlCertification.completed}</td>
                                        <td>{metrics.amlCertification.pending}</td>
                                    </tr>
                                    <tr>
                                        <td>Code of Conduct</td>
                                        <td>{metrics.codeOfConduct.completed}</td>
                                        <td>{metrics.codeOfConduct.pending}</td>
                                    </tr>
                                    <tr>
                                        <td>Security Training</td>
                                        <td>{metrics.securityTraining.completed}</td>
                                        <td>{metrics.securityTraining.pending}</td>
                                    </tr>
                                    <tr>
                                        <td>Risk Management Training</td>
                                        <td>{metrics.riskManagementTraining.completed}</td>
                                        <td>{metrics.riskManagementTraining.pending}</td>
                                    </tr>
                                    <tr>
                                        <td>Background Check</td>
                                        <td>{metrics.backgroundCheck.completed}</td>
                                        <td>{metrics.backgroundCheck.pending}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}