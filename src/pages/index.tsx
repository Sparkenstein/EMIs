import {
  Card,
  Stack,
  Slider,
  Text,
  Table,
  Title,
  Box,
  Group,
  Tabs,
} from "@mantine/core";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  registerables,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { EmiCard } from "../components/EMI";
import { DurationCard } from "../components/Duration";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  ...registerables
);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [activeTab, setActiveTab] = useState<string | null>("calc_emi");

  return (
    <>
      <main className={inter.className}>
        <Tabs value={activeTab} onTabChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="calc_emi">Calculate EMI</Tabs.Tab>
            <Tabs.Tab value="calc_duration">Calculate Time to pay</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="calc_emi" mt={"sm"}>
            <EmiCard />
          </Tabs.Panel>
          <Tabs.Panel value="calc_duration" mt={"sm"}>
            <DurationCard />
          </Tabs.Panel>
        </Tabs>
      </main>
    </>
  );
}

