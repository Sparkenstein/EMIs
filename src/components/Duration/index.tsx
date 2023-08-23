import { Card, Stack, Slider, Text } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

const MARKS = [
  { value: 10000, label: "10k" },
  { value: 50000, label: "50k" },
  { value: 100000, label: "1L" },
  { value: 500000, label: "5L" },
  { value: 1000000, label: "10L" },
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

const loanAmountMarks = [
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

const ratesMarks = [
  { value: 5, label: "5%" },
  { value: 10, label: "10%" },
  { value: 15, label: "15%" },
  { value: 20, label: "20%" },
  { value: 25, label: "25%" },
  { value: 30, label: "30%" },
];

function calculateTenure(
  emi: number,
  loanAmount: number,
  rateOfInterest: number
) {
  const r = rateOfInterest / 1200;
  const n = Math.log(emi / (emi - loanAmount * r)) / Math.log(1 + r);
  // console.log(n, "N");
  return Math.round(n);
  // P x R x (1+R)^N / [(1+R)^N-1]
}

export function DurationCard() {
  const [desiredEmi, setDesiredEmi] = useState(10000);
  const [loanAmount, setLoanAmount] = useState(1);
  const [rateOfInterest, setRateOfInterest] = useState(8.5);
  const [tenure, setTenure] = useState(1);

  useEffect(() => {
    // console.log({ desiredEmi, loanAmount, rateOfInterest });
    const t = calculateTenure(desiredEmi, loanAmount * 100000, rateOfInterest);
    // console.log(t, "Tenute");
    setTenure(t);
  }, [desiredEmi, loanAmount, rateOfInterest]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h="96vh">
      <h1>Calculate EMI </h1>
      <Stack spacing={"xl"}>
        <Stack>
          <Text>How much EMI you are willing to pay?</Text>
          <Slider
            value={desiredEmi}
            onChange={setDesiredEmi}
            step={1000}
            min={10000}
            max={1000000}
            label={(value) => formatRupee(value)}
            labelTransition="slide-up"
            labelTransitionDuration={150}
            labelTransitionTimingFunction="ease"
            marks={MARKS}
          />
        </Stack>
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
            marks={loanAmountMarks}
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

        <h1>
          Tenure: {tenure} Months or {(tenure / 12).toFixed(2)} Years
        </h1>
      </Stack>
    </Card>
  );
}

function formatRupee(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    compactDisplay: "short",
  }).format(amount);
}
