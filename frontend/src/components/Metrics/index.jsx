import React, {useEffect, useState} from "react";
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
import { toast, ToastContainer } from "react-toastify";

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
  const [candidates, setCandidateData] = useState([]);
  const [candidateselected,setCandidate]=useState([])
  const labels = candidateselected?.map(candidate => candidate.firstname);
  console.log(candidateselected);
  
  const [businessCase, setBusinessCases] = useState([]);
  const [bcId, selectedBC] = useState(null);
  const businessLabel = businessCase?.map(bc => bc.bcTitle);
  console.log(bcId, "selectedBC");
  const data = {
    labels,
    datasets: [
      {
        label: " Candidate grade",
        data: candidateselected?.map(cand => cand.averageGrade),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
   const data2 = {
     labels,
     datasets: [
       {
         label: "For all Candidates",
         data: candidates?.map(cand => cand.totalScore),
         borderColor: "rgb(53, 162, 235)",
         backgroundColor: "rgba(53, 162, 235, 0.5)",
       },
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

  // get businessCase
  const getBusinessCase = () => {
    axios
      .get("http://localhost:8000/api/admin/getBusinessCase")
      .then(res => {
        if (res.status === 200) {
          console.log(res.data?.data, "business");
          setBusinessCases(res.data?.data.map(d => d));
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  // function to check how much we have candidate for specific businessCase
  function checkCandidateBC(id) {
    let FilteredBC = candidates?.filter(
      candidate => candidate.businessCaseId == id
    );
    setCandidate(FilteredBC);
    if(!FilteredBC.length<1){
     toast.success(
       `you have  ${FilteredBC?.length} candidates for this businessCase`,
       {position: "top-center", delay: 100}
     );
    }
    console.log(FilteredBC, "FilteredBC");
  }
  console.log(businessCase, "businessCase");
  useEffect(() => {
    checkCandidateBC(bcId);
     
  }, [bcId]);

  useEffect(() => {
    getCandidates();
    getBusinessCase();
  }, []);

  return (
    <>
      <div className="h-[100vh] w-[83%] ml-auto flex items-center justify-center   ">
        <ToastContainer/>
        <div className="w-11/12 bg-white relative">
          <select
            onChange={e => {
              selectedBC(e.target.value);
            }}
            className="bg-blue-100 border-2 border-gray-200 absolute right-0"
          >
            <option value="">Select business Case</option>
            {businessCase?.map(bc => (
              <option value={bc._id}>{bc.bcTitle}</option>
            ))}
          </select>
          <Line options={options} data={data} />
        </div>
      </div>
    </>
  );
}
