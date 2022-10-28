import React from 'react';
import './Statistics.scss'
import CurrentDay from './CurrentDay';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

export const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        precision: 0
      }
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Goals at minut',
    },
  },
};

export const optionsPie = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Players bets',
    },
  },
};

function createLabels() {
  const labelsArray = []
  for (let i = 1; i <= 18; i++) {
    labelsArray.push(`${5 * (i - 1)}-${5 * i}`);
  }
  return labelsArray;
}

const labels = createLabels();

function createDataSets() {
  const dataArray = [];
  const backgroundColorArray = []
  for (let i = 1; i <= 18; i++) {

    dataArray.push(getRandomInt(7));
    backgroundColorArray.push(`rgba(${2 * i + 40}, ${5 * i + 30}, ${i + 100}, 0.5)`)
  }

  const obj = {
    label: `goals`,
    data: dataArray,
    backgroundColor: backgroundColorArray,
  }
  return obj;
}

const datasets = createDataSets();

const data = {
  labels,
  datasets: [datasets]

}


const config = {
  type: 'doughnut',
  data: data,
};

export const dataPie = {
  labels: ['Correct Score', 'Correct Winner', 'Wrong'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(20, 240, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 30, 30, 0.2)',
      ],
      borderColor: [
        'rgba(100, 240, 100, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 10, 10, 1)',
      ],
      borderWidth: 3,
    },
  ],
};

const Statistics = () => {
  return (
    <Container>
      <Row>
        <Col>
          <CurrentDay/>
          <Bar options={options} data={data} />
        </Col>
        <Col style={{width: '10rem'}}>
          <Doughnut 
          data={dataPie} 
          // width={"30%"}
          options={{...optionsPie,  maintainAspectRatio: false }}
          />
        </Col>
      </Row>
      <Row>
      </Row>
    </Container>
  )
}

export default Statistics