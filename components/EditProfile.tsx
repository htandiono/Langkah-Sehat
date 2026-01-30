import React, { useState } from 'react';
import { UserStats } from '../types';
import { ChevronLeft, Camera, User, Briefcase, Mail, Save } from 'lucide-react';

interface EditProfileProps {
  user: UserStats;
  onBack: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onBack }) => {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [email, setEmail] = useState("rizky.fajar@company.com"); // Mock email

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto pt-8 relative overflow-y-auto no-scrollbar pb-24 bg-[#1e1e1e]">
      
      {/* Header */}
      <div className="flex items-center px-6 mb-8">
        <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-[#2a2a2a] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#333] transition-colors mr-4"
        >
            <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-white uppercase tracking-wide">Edit Profil</h1>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-10">
           <div className="relative group cursor-pointer">
               {/* Hex Avatar */}
               <div className="w-32 h-36 relative">
                   <div className="absolute inset-0 hex-clip bg-gradient-to-b from-[#0055FF] to-[#00AEEF] p-[4px] shadow-[0_0_30px_rgba(0,174,239,0.2)] group-hover:shadow-[0_0_40px_rgba(0,174,239,0.4)] transition-all">
                        <div className="w-full h-full bg-[#1e1e1e] hex-clip relative">
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                   </div>
               </div>
               
               {/* Camera Overlay */}
               <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                   <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                       <Camera size={18} />
                   </div>
               </div>

               {/* Edit Badge */}
               <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#00AEEF] text-white text-[10px] font-bold px-3 py-1 rounded-full border border-[#1e1e1e] shadow-lg">
                   UBAH FOTO
               </div>
           </div>
      </div>

      {/* Form Fields */}
      <div className="px-6 space-y-6">
          
          {/* Name Input */}
          <div className="group">
              <label className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2 group-focus-within:text-[#00AEEF] transition-colors">
                  <User size={12} /> Nama Lengkap
              </label>
              <div className="relative">
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#232323] border border-white/10 text-white font-semibold text-sm p-4 rounded-xl w-full focus:border-[#00AEEF] focus:outline-none focus:ring-1 focus:ring-[#00AEEF]/50 transition-all chamfer-clip-sm"
                  />
              </div>
          </div>

          {/* Role Input */}
          <div className="group">
              <label className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2 group-focus-within:text-[#00AEEF] transition-colors">
                  <Briefcase size={12} /> Divisi / Role
              </label>
              <div className="relative">
                  <input 
                    type="text" 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="bg-[#232323] border border-white/10 text-white font-semibold text-sm p-4 rounded-xl w-full focus:border-[#00AEEF] focus:outline-none focus:ring-1 focus:ring-[#00AEEF]/50 transition-all chamfer-clip-sm"
                  />
              </div>
          </div>

          {/* Email Input */}
          <div className="group">
              <label className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2 group-focus-within:text-[#00AEEF] transition-colors">
                  <Mail size={12} /> Email Perusahaan
              </label>
              <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#232323] border border-white/10 text-white font-semibold text-sm p-4 rounded-xl w-full focus:border-[#00AEEF] focus:outline-none focus:ring-1 focus:ring-[#00AEEF]/50 transition-all chamfer-clip-sm"
                  />
              </div>
          </div>

      </div>

      {/* Action Button */}
      <div className="px-6 mt-10">
          <button 
            onClick={onBack}
            className="w-full bg-gradient-to-r from-[#0055FF] to-[#00AEEF] text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(0,174,239,0.3)] hover:shadow-[0_0_30px_rgba(0,174,239,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 chamfer-clip-sm"
          >
              <Save size={18} />
              SIMPAN PERUBAHAN
          </button>
      </div>

    </div>
  );
};

export default EditProfile;
