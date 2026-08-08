import type {
  APIRequestContext,
  APIResponse,
} from '@playwright/test';
import { env } from '../config/env';

export class OpenProjectApiClient {
  constructor(
    private readonly request: APIRequestContext,
  ) {}

  private readonly headers = {
    Authorization: `Bearer ${env.apiToken}`,
    Accept: 'application/hal+json',
  };

  async getCurrentUser(): Promise<APIResponse> {
    return this.request.get(
      `${env.baseURL}/api/v3/users/me`,
      {
        headers: this.headers,
      },
    );
  }
  async getProjects(): Promise<APIResponse> {
  return this.request.get(
    `${env.baseURL}/api/v3/projects`,
    {
      headers: this.headers,
    },
  );
}
  async createProject(
  name: string,
  identifier: string,
): Promise<APIResponse> {
  return this.request.post(
    `${env.baseURL}/api/v3/projects`,
    {
      headers: {
        ...this.headers,
        'Content-Type': 'application/json',
      },
      data: {
        name,
        identifier,
      },
    },
  );
}
  async getProjectById(projectId: number): Promise<APIResponse> {
  return this.request.get(
    `${env.baseURL}/api/v3/projects/${projectId}`,
    {
      headers: this.headers,
    },
  );
}
  async updateProject(
  projectId: number,
  name: string,
): Promise<APIResponse> {
  return this.request.patch(
    `${env.baseURL}/api/v3/projects/${projectId}`,
    {
      headers: {
        ...this.headers,
        'Content-Type': 'application/json',
      },
      data: {
        name,
      },
    },
  );
}
  async deleteProject(projectId: number): Promise<APIResponse> {
  return this.request.delete(
    `${env.baseURL}/api/v3/projects/${projectId}`,
    {
      headers: this.headers,
    },
  );
}
}
