export interface BranchGroup {
  category: string;
  branches: string[];
}

export const ENGINEERING_BRANCHES: BranchGroup[] = [
  {
    category: "1. Computing & Software Engineering",
    branches: [
      "Computer Science Engineering (CSE)",
      "Information Technology (IT)",
      "Artificial Intelligence (AI) & Machine Learning (ML)",
      "Data Science & Analytics Engineering",
      "Cybersecurity & Digital Forensics Engineering",
      "Cloud Computing & DevOps Engineering",
      "Software Engineering",
      "Computer Systems & Hardware Engineering",
      "Blockchain Engineering",
      "Virtual Reality (VR) & Augmented Reality (AR) Engineering",
      "Network Engineering"
    ]
  },
  {
    category: "2. Electrical, Electronics & Communication",
    branches: [
      "Electrical Engineering (EE)",
      "Electronics & Communication Engineering (ECE)",
      "VLSI Design & Semiconductor Engineering",
      "Instrumentation & Control Engineering",
      "Telecommunications Engineering",
      "Power Systems Engineering",
      "Microelectronics Engineering",
      "Optoelectronics & Photonics Engineering",
      "Signal Processing Engineering"
    ]
  },
  {
    category: "3. Mechanical, Aerospace & Automotive",
    branches: [
      "Mechanical Engineering (ME)",
      "Automotive/Automobile Engineering",
      "Aerospace Engineering",
      "Robotics & Automation Engineering",
      "Mechatronics Engineering",
      "Manufacturing & Production Engineering",
      "Industrial Engineering",
      "Marine Engineering & Naval Architecture",
      "Materials Science & Metallurgical Engineering",
      "Thermal Engineering"
    ]
  },
  {
    category: "4. Civil, Environmental & Process",
    branches: [
      "Civil Engineering",
      "Structural Engineering",
      "Geotechnical Engineering",
      "Transportation & Highway Engineering",
      "Water Resources Engineering",
      "Chemical Engineering",
      "Petroleum & Reservoir Engineering",
      "Mining & Mineral Engineering",
      "Environmental Engineering",
      "Nuclear Engineering",
      "Biomedical & Bioengineering",
      "Biotechnology Engineering",
      "Agricultural & Food Engineering",
      "Textile Engineering",
      "Ceramic Engineering",
      "Geomatics/Geospatial Engineering"
    ]
  },
  {
    category: "5. Emerging & Interdisciplinary Branches",
    branches: [
      "Quantum Engineering",
      "Nanotechnology Engineering",
      "Renewable & Green Energy Engineering",
      "Systems Engineering",
      "Financial Engineering",
      "Biomimetic Engineering"
    ]
  }
];
