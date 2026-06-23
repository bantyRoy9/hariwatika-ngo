export interface Member {
  id: number;
  name: string;
  designation: string;
  initials: string;
  phone?: string;
}

export const members: Member[] = [
  { id: 1, name: "Ramanand Yadav", designation: "Director", initials: "RY" },
  { id: 2, name: "Nandlal Yadav", designation: "Chairman", initials: "NY" },
  { id: 3, name: "Jitendra Kumar Mishra", designation: "Secretary", initials: "JM" },
  { id: 4, name: "Ram Vinay Pandey", designation: "Coordinator", initials: "RP" },
  { id: 5, name: "Nand Kishor", designation: "Treasurer", initials: "NK" },
  { id: 6, name: "Pintu Srivastava", designation: "Executive President", initials: "PS" },
  { id: 7, name: "Bhikhari Sah", designation: "Vice Treasurer", initials: "BS" },
  { id: 8, name: "Madhusudan Shrivastava", designation: "Auditor", initials: "MS" },
  { id: 9, name: "Ramakant Mahto", designation: "General Secretary", initials: "RM" },
  { id: 10, name: "Adarsh Srivastava", designation: "Legal Advisor", initials: "AS" },
  { id: 11, name: "Ajay Srivastava", designation: "Media Reporter", initials: "AJ" },
  { id: 12, name: "Piyush Yadav", designation: "Member", initials: "PY" },
  { id: 13, name: "Vikas Yadav", designation: "Member", initials: "VY" },
  { id: 14, name: "Umesh Prasad", designation: "Member", initials: "UP" },
  { id: 15, name: "Binod Prasad", designation: "Member", initials: "BP" },
  { id: 16, name: "Sandip Kumar", designation: "Member", initials: "SK" },
  { id: 17, name: "Masum Raja", designation: "Member", initials: "MR" },
  { id: 18, name: "Shambhu Pandit", designation: "Member", initials: "SP" },
];
