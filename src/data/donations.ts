export interface Donation {
  id: number;
  name: string;
  mobile: string;
  email?: string;
  address: string;
  amount: number;
  purpose: string;
  date: string;
  status: "confirmed" | "pending";
}

export const donations: Donation[] = [
  {
    id: 1,
    name: "Ramesh Kumar Singh",
    mobile: "9876543210",
    email: "ramesh@example.com",
    address: "Bettiah, West Champaran, Bihar",
    amount: 5000,
    purpose: "Vivah Seva",
    date: "2024-12-15",
    status: "confirmed",
  },
  {
    id: 2,
    name: "Sunita Devi",
    mobile: "9765432109",
    email: "",
    address: "Motihari, East Champaran, Bihar",
    amount: 1000,
    purpose: "Vrikshaaropan",
    date: "2024-12-10",
    status: "confirmed",
  },
  {
    id: 3,
    name: "Arvind Prasad",
    mobile: "9654321098",
    email: "arvind@example.com",
    address: "Muzaffarpur, Bihar",
    amount: 2000,
    purpose: "Garib Sahayata",
    date: "2024-12-08",
    status: "confirmed",
  },
  {
    id: 4,
    name: "Kavita Sharma",
    mobile: "9543210987",
    email: "kavita@example.com",
    address: "Patna, Bihar",
    amount: 500,
    purpose: "Education Support",
    date: "2024-12-05",
    status: "confirmed",
  },
  {
    id: 5,
    name: "Manoj Kumar",
    mobile: "9432109876",
    email: "",
    address: "Bettiah, West Champaran",
    amount: 10000,
    purpose: "Annual Fund",
    date: "2024-11-30",
    status: "confirmed",
  },
  {
    id: 6,
    name: "Priya Gupta",
    mobile: "9321098765",
    email: "priya@example.com",
    address: "Sitamarhi, Bihar",
    amount: 2000,
    purpose: "Swasthya Seva",
    date: "2024-11-25",
    status: "confirmed",
  },
  {
    id: 7,
    name: "Deepak Mishra",
    mobile: "9210987654",
    email: "deepak@example.com",
    address: "Gopalganj, Bihar",
    amount: 1500,
    purpose: "Vivah Seva",
    date: "2024-11-20",
    status: "confirmed",
  },
  {
    id: 8,
    name: "Anita Singh",
    mobile: "9109876543",
    email: "",
    address: "Bagaha, West Champaran",
    amount: 500,
    purpose: "Vrikshaaropan",
    date: "2024-11-15",
    status: "pending",
  },
];
