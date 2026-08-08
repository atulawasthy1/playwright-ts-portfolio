import 'dotenv/config';

type EnvironmentConfig = Readonly<{
  baseURL: string;
  username: string;
  password: string;
  apiToken: string;
}>;

export const env: EnvironmentConfig = {
  baseURL: process.env.BASE_URL ?? 'https://community.openproject.org',
  username: process.env.OPENPROJECT_USERNAME ?? '',
  password: process.env.OPENPROJECT_PASSWORD ?? '',
  apiToken: process.env.OPENPROJECT_API_TOKEN ?? '',
};
