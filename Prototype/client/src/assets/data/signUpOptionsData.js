const signUpOptionsData = [
  {
    id: "01",
    color: "green",
    title: "Doctor",
    img: "/assets/images/signupOptions/doctor.jpeg",
    catchPhrase: "healers",
    description:
      "Consult rural patients from anywhere. Use smart tools, earn per session, and become a lifeline to remote communities.",
    cta: "Join as a Doctor",
    className: "md:col-span-2 lg:col-span-1",
    to: "/register/doctor",
    features: [
      "Flexible remote consultations",
      "Verified cases from NGO clinics",
      "Smart e-prescriptions & notes",
      "Timely payouts per session",
      "Real impact, real patients, real care",
    ],
  },
  {
    id: "02",
    color: "teal",
    title: "NGO / Clinic",
    img: "/assets/images/signupOptions/ngo.jpeg",
    catchPhrase: "bridges",
    description:
      "Connect your existing clinic to verified city doctors. Enable diagnostics, prescriptions, and referrals — digitally.",
    cta: "Partner as NGO Clinic",
    className: "md:col-span-2 lg:col-span-1",
    to: "/register/ngo",
    features: [
      "Free onboarding & support",
      "Connect to city doctors remotely",
      "Access tests, referrals, and e-Rx",
      "Eligible for CSR infra partnerships",
      "Improve trust & care in your community",
    ],
  },
  {
    id: "03",
    color: "blue",
    title: "Corporate (CSR)",
    img: "/assets/images/signupOptions/corporate.jpeg",
    catchPhrase: "backers",
    description:
      "Fund rural clinics, enable access, and track every outcome — all while meeting CSR mandates under Section 135.",
    cta: "Join as CSR Partner",
    className:
      "md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-auto",
    to: "/register/corporate",
    features: [
      "CSR compliance & ESG-aligned reporting",
      "Clinic & doctor impact dashboards",
      "Transparent fund utilization",
      "Branded stories & PR visibility",
      "Scalable last-mile healthcare delivery",
    ],
  },
];

export default signUpOptionsData;
