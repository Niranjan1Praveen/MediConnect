# MediConnect – Rural Clinics Connected to Urban Care via Smart Telehealth Platform
![Landing Page Preview](designs/landing-page.png)

**Hackathon**: Hack4Health  
**Team Name**: CODE4CHANGE  

## Team Members
- Vaibhav Jain (Team Leader)
- Abhishek Chaubhey
- Debshata Choudhury
- Niranjan Praveen  
**Contact**: vaibavjain62@gmail.com  
**Live Demo**: [Link to be added]

## 🚀 Problem Statement
Rural healthcare in India suffers from a severe shortage of specialists, diagnostics, and care infrastructure. MediConnect aims to empower NGO-run village clinics by digitally connecting them to verified city doctors, diagnostic labs, and medicine providers—delivering smart, affordable care powered by real-time consultations and minimal-data diagnostics.

## 🧠 Project Overview
MediConnect is a full-stack rural health-tech platform that acts as a digital bridge between villagers and qualified urban healthcare providers. It transforms basic patient data into actionable, AI-guided care flows—teleconsultations, prescriptions, lab referrals, and medicine ordering.

**Built for low-resource environments**:
- Telemedicine consultations
- Smart e-prescriptions
- Diagnostic lab referrals
- Jan Aushadhi–based medicine ordering
- Personalized diet and care plans
- Emergency escalation
- CSR health analytics dashboards

## 🧩 Core Features
- **Real-Time Teleconsultation**  
  ![Live Conversation Preview](designs/live-conversation.png)  
  - Secure video/audio consultations between patients and doctors, coordinated by NGO clinic staff, ensuring seamless communication even in low-bandwidth settings.

- **Minimal-Data e-Prescription Engine**  
  ![Digi Prescription Preview](designs/digi-prescription.png)  
  ![Fitness Generator Preview](designs/fitness-generator.png)  
  ![Search Prescription Preview](designs/search-prescription.png)  
  - Converts basic symptoms, vitals, and patient history into structured prescriptions and personalized care plans, leveraging AI for accuracy and efficiency.

- **Smart Diagnostic Triaging**  
  - AI models analyze symptom clusters and prioritize severity to suggest relevant lab tests or specialist referrals, optimizing resource use in rural clinics.

- **Jan Aushadhi Medicine Ordering**  
  - Integrated ordering system connects clinics to low-cost government pharmacies or verified local vendors, ensuring affordable access to medicines.

- **Emergency Case Transfer**  
  - Single-click escalation to nearby government facilities with digital referral documentation for urgent cases, streamlining critical care transitions.

- **Health Data Tracker**  
  - Maintains longitudinal care records for patients with minimal digital overhead, enabling continuity of care in resource-constrained settings.

- **Role-Based Access Control**  
  - User-specific permissions for:  
    - **NGO Clinic Staff**: Capture vitals, patient history, and coordinate consultations.  
    - **Doctors**: Conduct teleconsultations and approve prescriptions.  
    - **Lab Partners**: Receive and process diagnostic referrals.  
    - **CSR/Admin Partners**: Monitor care delivery and fund operations via analytics dashboards.

- **Patient Records Management**  
  ![Patient Records Preview](designs/patient-records.png)  
  - Search and filter patient records by name.  
  - View detailed information (e.g., age, conditions, medications).  
  - Delete records as needed, with timestamps for record creation.

- **Digital Prescription System**  
  ![Digital Prescription Preview](designs/digital-prescription.png)  
  - Generate and manage digital prescriptions with patient and doctor details.  
  - Record medical assessments.  
  - Add new medications and save as PDF files.

- **Fitness Plan Generator**  
  ![Fitness Plan Preview](designs/fitness-plan.png)  
  - Create personalized diet plans with specific meal timings and food recommendations.  
  - Generate exercise schedules tailored to individual needs.

- **Live Conversation Capture**  
  ![Live Conversation Capture Preview](designs/live-conversation-capture.png)  
  - Facilitate real-time doctor-patient dialogue with voice or text input.  
  - Support language selection and a "Start Now" feature for consultations.

## 👥 User Roles
- **Clinic Assistant**: Captures vitals, patient history, and facilitates doctor connections.
- **Doctor**: Conducts consultations and approves AI-generated prescriptions.
- **Lab Partner**: Manages diagnostic test referrals.
- **CSR/Admin Partner**: Tracks care delivery and oversees funding operations.

## ☁️ AI & Cloud Integration
- **LLM-Powered Prescriptions**: Uses large language models to recommend treatments based on symptom and vital inputs.
- **Symptom Triager**: Maps symptoms to diagnostic tests using AI-driven clustering for efficient triaging.
- **Feedback Loop**: Continuously improves AI models with real-world feedback and care outcomes.

## 🧰 Technology Stack
- **Frontend**: Next.js, Tailwind CSS, ShadCN UI, Three.js, Magic UI
- **Backend**: Flask
- **Database**: Supabase
- **APIs**: Gemini API
- **Authentication**: KindeAuth
- **Deployment**: Vercel (Frontend), Render (Backend)

## 💻 Code Execution Instructions
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/YourOrg/medi-connect.git
   cd medi-connect
   ```
2. **Install Frontend Dependencies**  
   ```bash
   cd client
   npm install
   ```
3. **Install Backend Dependencies**  
   ```bash
   cd ../server
   npm install
   ```
4. **Start Development Servers**  
   **Frontend**  
   ```bash
   cd client
   npm run dev
   ```  
   **Backend**  
   ```bash
   cd ../server
   npm start
   ```
5. **Access the Application**  
   Open your browser and go to:  
   `http://localhost:3000`

## 💰 Scalability & Business Model
- **CSR-Funded Healthcare Delivery**: Leverages Section 135 of the Indian Companies Act for CSR healthcare projects. Corporate partners fund digital infrastructure and subsidize care delivery.
- **Revenue Streams**:
  - Consultation commissions
  - Diagnostic test referral margins
  - Affiliate income from medicine ordering
  - NGO SaaS subscription fees
  - CSR impact analytics dashboards

## 🧱 Modular Architecture
- Offline-first design for low-connectivity areas
- Multilingual UI (Hindi, English, Marathi)
- Seamless integration with PHC/government systems
- Expandable to mental health, maternal care, and chronic disease management

## 📌 Summary
MediConnect delivers smart diagnostics and structured care to rural India by connecting NGO-operated clinics with urban healthcare providers. It maximizes clinical value through minimal data, AI-powered tools, and low-bandwidth infrastructure—creating a scalable, inclusive health ecosystem.

Aligned with the Hack4Health theme of *Smart Diagnostics With Minimal Data*, MediConnect is built to democratize healthcare access for underserved populations.

**Let’s connect care—digitally.**