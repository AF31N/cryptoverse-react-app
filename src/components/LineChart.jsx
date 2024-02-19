import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { useGetCryptoHistoryQuery } from '../services/cryptoApi';
import { Chart, CategoryScale } from 'chart.js/auto';

Chart.register(CategoryScale);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod }) => {
  const [coinPrice, setCoinPrice] = useState([]);
  const [coinTimestamp, setCoinTimestamp] = useState([]);

  useEffect(() => {
    if (coinHistory?.data?.history) {
      const prices = [];
      const timestamps = [];

      coinHistory.data.history.forEach(historyItem => {
        prices.push(historyItem.price);
        timestamps.push(new Date(historyItem.timestamp).toLocaleDateString());
      });

      setCoinPrice(prices);
      setCoinTimestamp(timestamps);
    }
  }, [coinHistory]);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart</Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
