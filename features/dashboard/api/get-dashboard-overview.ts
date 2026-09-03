import {
  dashboardMock,
} from "../mocks/dashboard.mock";

import {
  dashboardOverviewSchema,
} from "../schemas/dashboard.schema";

import type {
  DashboardOverview,
} from "../types/dashboard.types";



export async function getDashboardOverview(): Promise<DashboardOverview> {
  return dashboardOverviewSchema.parse(
    dashboardMock,
  );
}