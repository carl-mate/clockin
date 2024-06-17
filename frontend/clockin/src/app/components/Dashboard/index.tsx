"use client";

import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  SvgIcon,
  Stack,
} from "@mui/material";
import { useHooks } from "./hooks";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import {
  Timer,
  PieChart,
  TrendingUp,
  History,
  FormatListNumbered,
} from "@mui/icons-material";
import Link from "next/link";

Chart.register(...registerables);

export default function Dashboard() {
  const { chartData, pieData, trendData, totalTime, totalCheckIns } =
    useHooks();

  return (
    <Container maxWidth="lg">
      <Box my={4} textAlign="left">
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          See your top five activities and how you spend your time. Click{" "}
          <Link href="/checkins" passHref>
            here
          </Link>{" "}
          for a more detailed look.
        </Typography>
      </Box>
      <Grid container spacing={6}>
        {/* Stacked Charts */}
        <Grid item xs={12} md={4}>
          <Stack direction="column" spacing={2}>
            <Card sx={{ width: "100%", boxShadow: 3, borderRadius: 2, mb: 2 }}>
              <CardHeader
                title={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <SvgIcon
                      component={Timer}
                      fontSize="large"
                      color="primary"
                    />
                    <Typography variant="h6" component="div" align="center">
                      Total Time Invested
                    </Typography>
                  </Stack>
                }
              />
              <CardContent>
                <Typography variant="h4" align="center">
                  {totalTime} hrs
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: "100%", boxShadow: 3, borderRadius: 2 }}>
              <CardHeader
                title={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <SvgIcon
                      component={FormatListNumbered}
                      fontSize="large"
                      color="primary"
                    />
                    <Typography variant="h6" component="div" align="center">
                      Total Number of Checkins
                    </Typography>
                  </Stack>
                }
              />
              <CardContent>
                <Typography variant="h4" align="center">
                  {totalCheckIns} checkins
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        {/* Pie Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardHeader
              title={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <SvgIcon
                    component={PieChart}
                    fontSize="large"
                    color="primary"
                  />
                  <Typography variant="h6" component="div" align="center">
                    Time Allocation
                  </Typography>
                </Stack>
              }
            />
            <CardContent sx={{ height: 250 }}>
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </CardContent>
          </Card>
        </Grid>
        {/* Bottom Charts */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardHeader
              title={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <SvgIcon component={History} fontSize="large" color="info" />
                  <Typography variant="h6" component="div" align="center">
                    Top Time Investments
                  </Typography>
                </Stack>
              }
            />
            <CardContent>
              <Box height={300}>
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardHeader
              title={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <SvgIcon
                    component={TrendingUp}
                    fontSize="large"
                    color="primary"
                  />
                  <Typography variant="h6" component="div" align="center">
                    Time Trends
                  </Typography>
                </Stack>
              }
            />
            <CardContent>
              <Box height={300}>
                <Line
                  data={trendData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
