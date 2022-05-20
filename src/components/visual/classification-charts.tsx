import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export interface ClassificationChartsProps {
  transactions: any[]
}

const backgroundColors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
];

const borderColors = [
  'rgba(255, 99, 132, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];

const isDebitTransaction = (txn: any) => {
  return txn[3] && parseFloat(txn[3]) !== 0;
}

const getClassification = (txn: any): string => {
  return txn[6];
}

const prepareCreditDebitData = (txns: any[]) => {
  const data = [0, 0];
  txns.forEach((txn: any) => {
    if (isDebitTransaction(txn)) { // Debit Transaction
      data[0] += parseFloat(txn[3]);
    } else {
      data[1] += parseFloat(txn[4]); // Credit Transaction
    }
  });
  return {
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors.slice(0, 2),
        borderColor: borderColors.slice(0, 2),
        borderWidth: 1
      },
    ],
    labels: ['Debit', 'Credit']
  };
}

const prepareCreditData = (txns: any[]) => {
  const data: {[k: string]: number} = {};
  txns.forEach((txn: any) => {
    if (!isDebitTransaction(txn)) {
      const classification = getClassification(txn)
      if (!data[classification]) {
        data[classification] = parseFloat(txn[4]);
      }
      data[getClassification(txn)] += parseFloat(txn[4]);
    }
  });
  const keys = Object.keys(data).sort((a, b) => data[b] - data[a]);
  return {
    datasets: [
      {
        data: keys.map(key => data[key]),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      }
    ],
    labels: keys
  };
}

const prepareDebitData = (txns: any[], index: number, count: number) => {
  const data: {[k: string]: number} = {};
  txns.forEach((txn: any) => {
    if (isDebitTransaction(txn)) {
      const classification = getClassification(txn)
      if (!data[classification]) {
        data[classification] = parseFloat(txn[3]);
      }
      data[getClassification(txn)] += parseFloat(txn[3]);
    }
  });
  const keys = Object.keys(data).sort((a, b) => data[b] - data[a]);
  return {
    datasets: [
      {
        data: keys.map(key => data[key]).slice(index, index + count),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      }
    ],
    labels: keys.slice(index, index + count)
  };
}

const getDefaultOptions = (title: string): any => {
  return {
    plugins: {
      title: {
        display: true,
        font: {
          size: 20
        },
        text: title
      },
      legend: {
        position: "bottom"
      }
    }
  }
}

export const ClassificationCharts = (props: ClassificationChartsProps) => {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4">
          <Doughnut
            data={prepareCreditDebitData(props.transactions)}
            options={getDefaultOptions("Credit/Debit Analysis")}
          />
        </div>
        <div className="col-4">
          <Doughnut
            data={prepareCreditData(props.transactions)}
            options={getDefaultOptions("Credit Analysis")}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <Doughnut
            data={prepareDebitData(props.transactions, 0, 6)}
            options={getDefaultOptions("Debit Analysis (1-6)")}
          />
        </div>
        <div className="col-4">
          <Doughnut
            data={prepareDebitData(props.transactions, 6, 6)}
            options={getDefaultOptions("Debit Analysis (6-12)")}
          />
        </div>
      </div>
    </div>
  )
}