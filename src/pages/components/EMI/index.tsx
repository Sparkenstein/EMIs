import { Card, Stack, Slider, Group, Table, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

type EmiCardProps = {
  loanAmount: number;
  loanTenure: number;
  rateOfInterest: number;
};

// {loanAmount, loanTenure, rateOfInterest}: EmiCardProps
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

const yearsMarks = [
  { value: 1, label: "1 year" },
  { value: 5, label: "5 years" },
  { value: 10, label: "10 years" },
  { value: 15, label: "15 years" },
  { value: 20, label: "20 years" },
  { value: 25, label: "25 years" },
  { value: 30, label: "30 years" },
];
const ratesMarks = [
  { value: 5, label: "5%" },
  { value: 10, label: "10%" },
  { value: 15, label: "15%" },
  { value: 20, label: "20%" },
  { value: 25, label: "25%" },
  { value: 30, label: "30%" },
];
export function EmiCard() {
  const [loanAmount, setLoanAmount] = useState(50);
  const [loanTenure, setLoanTenure] = useState(1);
  const [rateOfInterest, setRateOfInterest] = useState(8.5);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    // Calculate EMI
    // P x R x (1+R)^N / [(1+R)^N-1]
    let emi = calculateEmi(loanAmount, rateOfInterest, loanTenure);
    setEmi(emi);
  }, [loanAmount, loanTenure, rateOfInterest]);

  let data = [...Array(30)].map(
    (_, i) => calculateEmi(loanAmount, rateOfInterest, i + 1) * 100000
  );

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h="96vh">
      <h1>Calculate EMI </h1>
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
              MARKS.find((e) => e.value === value)?.label || `${value / 100}cr`
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
            marks={yearsMarks}
          />
        </Stack>
        <Stack>
          <Text>Rate of Interest</Text>
          <Slider
            value={rateOfInterest}
            onChange={setRateOfInterest}
            step={0.25}
            min={5}
            max={30}
            label={(value) => `${value}%`}
            labelTransition="slide-up"
            labelTransitionDuration={150}
            labelTransitionTimingFunction="ease"
            marks={ratesMarks}
          />
        </Stack>

        <Group noWrap grow>
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
          <Card shadow="sm" padding="lg" radius="md">
            <Title>EMIs in range</Title>
            <Bar
              data={{
                labels: [...Array(30)].map((_, i) => i + 1),
                datasets: [
                  {
                    data: data,
                    label: "EMI",
                  },
                ],
              }}
            />
          </Card>
        </Group>
      </Stack>
    </Card>
  );
}

function formatRupee(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

function calculateEmi(_p: number, _r: number, _n: number) {
  const r = _r / 12 / 100;
  const n = _n * 12;
  const p = _p;
  // const emi =
  //   (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const emi = p * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
  return emi;
}
