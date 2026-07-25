import { dashboardMock } from "../mocks/dashboard.mock";
import { dashboardOverviewSchema } from "../schemas/dashboard.schema";
import type { DashboardOverview } from "../types/dashboard.types";

const DASHBOARD_OVERVIEW_PATH = "/api/v1/dashboard/overview";

function shouldUseMockData(): boolean {
  return process.env.USE_MOCKS !== "false";
}

function getApiBaseUrl(): string {
  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error(
      "API_BASE_URL is required when USE_MOCKS is disabled.",
    );
  }

  return apiBaseUrl;
}

export async function getDashboardOverview(): Promise<DashboardOverview> {
  if (shouldUseMockData()) {
    return dashboardMock;
  }

  const requestUrl = new URL(
    DASHBOARD_OVERVIEW_PATH,
    getApiBaseUrl(),
  );

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Dashboard overview request failed with status ${response.status}.`,
    );
  }

  const payload: unknown = await response.json();

  return dashboardOverviewSchema.parse(payload);
}