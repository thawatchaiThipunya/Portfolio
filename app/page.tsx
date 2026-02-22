import PortfolioClient from '@/app/portfolio/PortfolioClient';
import { mainProfileBackendService } from "@/backend/services/mainProfileService";
import { contractBackendService } from "@/backend/services/contractService";
import { hobbyBackendService } from "@/backend/services/hobbyService";
import { educationBackendService } from "@/backend/services/educationService";
import { softSkillBackendService } from "@/backend/services/softSkillService";
import { technicalBackendService } from "@/backend/services/technicalService";
import { projectBackendService } from "@/backend/services/projectService";

export default async function PortfolioPage() {
  // ดึงข้อมูลทั้งหมด
  const [
    profile, 
    contractsList, 
    hobbies, 
    educations, 
    softSkills, 
    technicals,
    projects 
  ] = await Promise.all([
    mainProfileBackendService.findFirst(),
    contractBackendService.findAll(),
    hobbyBackendService.findAll(),
    educationBackendService.findAll(),
    softSkillBackendService.findAll(),
    technicalBackendService.findAll(),
    projectBackendService.getAll(), // ใช้ getAll() ตามไฟล์ projectService.tsx
  ]);

  const contracts = contractsList && contractsList.length > 0 ? contractsList[0] : null;

  // สำหรับ Debug: ดูใน Terminal ว่าข้อมูลมาไหม
  console.log("Fetched Projects Count:", projects?.length);

  return (
    <PortfolioClient 
      profile={profile} 
      contracts={contracts} 
      hobbies={hobbies || []}
      educations={educations || []}
      softSkills={softSkills || []}
      technicals={technicals || []}
      projects={projects || []} 
    />
  );
}