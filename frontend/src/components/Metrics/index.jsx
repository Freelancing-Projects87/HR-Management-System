import React, {useEffect,useState} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";
import {faker} from "@faker-js/faker";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Metrics for all Candidates",
    },
  },
};


export default function Metrics() {
    const [candidates,setCandidateData]=useState([])
    const labels = candidates?.map(candidate => candidate.firstname);

    const data = {
      labels,
      datasets: [
        {
          label: "For all Candidates",
          data: candidates.map((cand) =>cand.totalScore ),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        // {
        //   label: "For specific Business Case",
        //   data: labels.map(() => faker.datatype.number({min: 0, max: 100})),
        //   borderColor: "rgb(53, 162, 235)",
        //   backgroundColor: "rgba(53, 162, 235, 0.5)",
        // },
      ],
    };

  const getCandidates = () => {
    axios
      .get("http://localhost:8000/api/admin/getCandidates")
      .then(res => {
        if (res.status === 200) {
          setCandidateData(res.data?.data);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
          console.log(candidates, "candidates");

  useEffect(() => {

    getCandidates();
  }, []);
  return (
    <>
      <div className="h-[100vh] w-[83%] ml-auto flex items-center justify-center   ">
        <div className="w-11/12 bg-white">
          <Line options={options} data={data} />
        </div>
      </div>
    </>
  );
}
