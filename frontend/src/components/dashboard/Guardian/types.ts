export interface GuardianMember {
  id: number;
  name: string;
  avatarUrl: string;
  status: string;
  distance: string;
  lastUpdated: string;
}

export interface GuardianProps {
  guardians?: GuardianMember[];
}
