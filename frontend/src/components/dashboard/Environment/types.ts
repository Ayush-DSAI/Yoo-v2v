export interface EnvironmentData {
  temperature: string;
  condition: string;
  visibility: string;
  rain: string;
  wind: string;
  airQuality: string;
  riskLevel: string;
}

export interface EnvironmentProps {
  data?: EnvironmentData;
}
