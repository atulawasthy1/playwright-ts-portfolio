import 'dotenv/config';

type EnvironmentConfig = Readonly<{
  baseURL: string;
  username: string;
  password: string;
}>;

export const env: EnvironmentConfig = {
  baseURL: process.env.BASE_URL ?? 'https://community.openproject.org',
  username: process.env.OPENPROJECT_USERNAME ?? '',
  password: process.env.OPENPROJECT_PASSWORD ?? '',
};
