import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Award, 
  Play, 
  Clock, 
  BookOpen 
} from 'lucide-react';

interface AcademyProps {
  onAddActivity: (activity: string, module: string) => void;
}

export const GlaceAcademyModule: React.FC<AcademyProps> = ({ onAddActivity }) => {
  const [courses, setCourses] = useState([
    { id: 'CRS-01', title: 'Advanced PLC Programming & IEC 61131-3', category: 'Automation', progress: 100, lessons: '12 / 12 lessons', certificate: 'Certified Professional', status: 'Completed' },
    { id: 'CRS-02', title: 'SCADA Wonderware & Ignition AI Integration', category: 'I&C Engineering', progress: 75, lessons: '9 / 12 lessons', certificate: 'In Progress', status: 'In Progress' },
    { id: 'CRS-03', title: 'BIM Level 2 for MEP Engineering & Clash Detection', category: 'Civil & Mechanical', progress: 40, lessons: '4 / 10 lessons', certificate: 'In Progress', status: 'In Progress' },
  ]);

  const handleCompleteLesson = (courseTitle: string) => {
    onAddActivity(`Completed course module: ${courseTitle}`, 'Glace Academy');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Glace Academy</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pelatihan AI untuk insinyur: SCADA, PLC, BIM, dan sertifikasi keahlian profesional berstandar global.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((c) => (
          <div key={c.id} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                  {c.category}
                </span>
                <span className="text-xs font-mono text-slate-400">{c.lessons}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                {c.title}
              </h3>
              
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Progress</span>
                  <span className="font-semibold text-slate-700">{c.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${c.progress}%` }}></div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-[11px] font-medium flex items-center gap-1 ${
                c.progress === 100 ? 'text-emerald-600' : 'text-slate-500'
              }`}>
                {c.progress === 100 ? <Award className="w-3.5 h-3.5 text-emerald-600" /> : <Clock className="w-3.5 h-3.5" />}
                {c.certificate}
              </span>
              <button
                onClick={() => handleCompleteLesson(c.title)}
                className="text-xs font-medium text-purple-600 hover:text-purple-700 hover:underline flex items-center gap-1"
              >
                <span>{c.progress === 100 ? 'Review' : 'Lanjut Belajar'}</span>
                <Play className="w-3 h-3 fill-current" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

