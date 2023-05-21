export const workFormInterface = {
  workedTime: "00:00",
  workedTimeInMs: 0,
  constructionSite: "",
  personalTransportation: 0,
  companyTransportation: 0,
  material: "00:00",
  materialInMs: 0,
  notes: "",
  date: "",
  user: "",
};

export const ClockState = {
  Off: "off",
  Running: "running",
  Stopped: "stopped",
};

export const clockStateInterface = {
  status: ClockState.Off,
  pausedTimestamp: 0,
  startTimestamp: 0,
};

export const weekTotal = {
  totalWorkedTime: "00:00",
  totalOvertime: "00:00",
  totalCompanyTransportation: 0,
  totalPersonalTransportation: 0,
};
