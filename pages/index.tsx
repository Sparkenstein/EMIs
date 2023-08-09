import { Card, Stack, Slider, Text, Table, Title, Box } from "@mantine/core";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Interest", "Principal"],
  datasets: [
    {
      label: "Total paid",
      data: [12, 19],
      backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

const inter = Inter({ subsets: ["latin"] });

const MARKS = [
  { value: 50, label: "50L" },
  { value: 60, label: "60L" },
  { value: 70, label: "70L" },
  { value: 80, label: "80L" },
  { value: 90, label: "90L" },
  { value: 100, label: "1cr" },
  { value: 150, label: "1.5cr" },
  { value: 200, label: "2cr" },
  { value: 250, label: "2.5cr" },
  { value: 300, label: "3cr" },
  { value: 350, label: "3.5cr" },
  { value: 400, label: "4cr" },
  { value: 450, label: "4.5cr" },
  { value: 500, label: "5cr" },
];

export default function Home() {
  const [loanAmount, setLoanAmount] = useState(50);
  const [loanTenure, setLoanTenure] = useState(1);
  const [rateOfInterest, setRateOfInterest] = useState(8.5);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    // Calculate EMI
    // P x R x (1+R)^N / [(1+R)^N-1]
    const r = rateOfInterest / 12 / 100;
    const n = loanTenure * 12;
    const p = loanAmount;
    // const emi =
    //   (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const emi = p * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
    // Calculate how much interest is paid
    // Total paid - principal
    const interestPaid = emi * n - loanAmount;
    // Calculate how much principal is paid
    const principalPaid = loanAmount;
    console.log({ emi, interestPaid, principalPaid });
    setEmi(emi);
  }, [loanAmount, loanTenure, rateOfInterest]);

  return (
    <>
      <main className={inter.className}>
        <Card shadow="sm" padding="lg" radius="md" withBorder h="98vh">
          <h1>EMI calculator</h1>
          <Stack spacing={"xl"}>
            <Stack>
              <Text>Loan Amount</Text>
              <Slider
                value={loanAmount}
                onChange={setLoanAmount}
                step={10}
                min={50}
                max={500}
                label={(value) =>
                  MARKS.find((e) => e.value === value)?.label ||
                  `${value / 100}cr`
                }
                labelTransition="slide-up"
                labelTransitionDuration={150}
                labelTransitionTimingFunction="ease"
                marks={MARKS}
              />
            </Stack>
            <Stack>
              <Text>Loan Tenure</Text>
              <Slider
                value={loanTenure}
                onChange={setLoanTenure}
                step={1}
                min={1}
                max={30}
                label={(value) => `${value} years`}
                labelTransition="slide-up"
                labelTransitionDuration={150}
                labelTransitionTimingFunction="ease"
              />
            </Stack>
            <Stack>
              <Text>Rate of Interest</Text>
              <Slider
                value={rateOfInterest}
                onChange={setRateOfInterest}
                step={0.25}
                min={5}
                max={15}
                label={(value) => `${value}%`}
                labelTransition="slide-up"
                labelTransitionDuration={150}
                labelTransitionTimingFunction="ease"
              />
            </Stack>

            <Table withBorder withColumnBorders>
              <tbody>
                <tr>
                  <td>
                    <Title>
                      {MARKS.find((e) => e.value === loanAmount)?.label ||
                        `${loanAmount / 100}cr`}
                    </Title>
                    <Text>Loan Amount</Text>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                    rowSpan={3}
                  >
                    <Title>{formatRupee(Math.round(emi * 100000))}</Title>
                    <Text>EMI</Text>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Title>{loanTenure} years</Title>
                    <Text>Loan Tenure</Text>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Title>{rateOfInterest}%</Title>
                    <Text>Rate of Interest</Text>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Box h="100%" w="100%">
              <Doughnut
                data={data}
                height={400}
                width={400}
                options={{
                  maintainAspectRatio: false,
                  responsive: false,
                }}
              />
            </Box>
          </Stack>
        </Card>
      </main>
    </>
  );
}

function formatRupee(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}
