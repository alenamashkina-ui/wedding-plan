import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Calendar, Clock, Users, DollarSign, CheckSquare, 
  Plus, Trash2, Download, ChevronLeft, Heart, 
  MapPin, X, ArrowRight, CalendarDays, Menu, 
  FileText, FileSpreadsheet, File, PieChart, Settings, 
  Archive, LogOut, Lock, User, Crown, Key, Loader2, Users as UsersIcon, Link as LinkIcon, Edit3, Save, XCircle, Shield, Copy
} from 'lucide-react';

// --- КОНФИГУРАЦИЯ ---

const SITE_URL = 'https://wedding-plan.vercel.app'; // Ссылка на демо

const COLORS = {
  primary: '#936142',
  secondary: '#AC8A69',
  accent: '#C58970',
  neutral: '#CCBBA9',
  dark: '#414942',
  white: '#FFFFFF',
  bg: '#F9F7F5'
};

const INITIAL_EXPENSES = [
  { category: 'Декор', name: 'Декор и флористика', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Площадка', name: 'Аренда мебели', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Полиграфия', name: 'Свадебная полиграфия', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Digital', name: 'Создание сайта', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Фото и Видео', name: 'Предсвадебная съемка', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Фото и Видео', name: 'Фотограф', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Фото и Видео', name: 'Фотокнига', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Фото и Видео', name: 'Видеограф', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Фото и Видео', name: 'Монтаж SDE-ролика', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Фото и Видео', name: 'Мобильный видеомейкер', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Программа', name: 'Ведущий + диджей', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Техническое обеспечение', name: 'Техническое обеспечение', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Техническое обеспечение', name: 'Спецэффекты', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Образ', name: 'Стилист', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Образ', name: 'Стилист для гостей', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Программа', name: 'Кавер-группа', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Программа', name: 'Бытовой райдер артистов', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Логистика', name: 'Размещение иногородних гостей', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Программа', name: 'Постановка свадебного танца', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Логистика', name: 'Аренда автомобиля', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Логистика', name: 'Автобусы для гостей', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Логистика', name: 'Вечерняя развозка', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Детям', name: 'Аниматор для детей/няня', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Банкет', name: 'Торт', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Банкет', name: 'Напитки', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Банкет', name: 'Комплименты для гостей', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Финал', name: 'Фейерверк', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Команда', name: 'Организация и координация свадьбы', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Банкет', name: 'Свадебный ужин', plan: 0, fact: 0, paid: 0, note: '' },
  { category: 'Прочее', name: 'Непредвиденные расходы', plan: 0, fact: 0, paid: 0, note: '' },
];

const INITIAL_TIMING = [
  { time: '09:00', event: 'Пробуждение' },
  { time: '09:30', event: 'Завтрак' },
  { time: '10:00', event: 'Приезд стилиста' },
  { time: '11:00', event: 'Начало работы фотографа и видеооператора' },
  { time: '12:30', event: 'Подача автомобиля' },
  { time: '13:00', event: 'Фотосессия' },
  { time: '16:00', event: 'Сбор гостей' },
  { time: '17:00', event: 'Начало ужина' },
  { time: '23:00', event: 'Окончание' },
];

const TASK_TEMPLATES = [
  { text: 'Определить бюджет свадьбы', pos: 0.00 },
  { text: 'Составить список гостей', pos: 0.01 },
  { text: 'Заполнить анкету', pos: 0.02 },
  { text: 'Выбрать дату регистрации', pos: 0.03 },
  { text: 'Выбрать день свадьбы', pos: 0.04 },
  { text: 'Составить тайминг свадебного дня', pos: 0.05 },
  { text: 'Подать заявления в ЗАГС', pos: 0.06 },
  { text: 'Утвердить концепцию свадьбы', pos: 0.10 },
  { text: 'Выбрать место проведения свадьбы', pos: 0.12 },
  { text: 'Продумать план Б на случай непогоды', pos: 0.15 },
  { text: 'Утвердить текст для приглашений', pos: 0.18 },
  { text: 'Заказать приглашения', pos: 0.20 },
  { text: 'Выбрать фотографа', pos: 0.22 },
  { text: 'Выбрать видеооператора', pos: 0.22 },
  { text: 'Выбрать ведущего', pos: 0.23 },
  { text: 'Выбрать стилиста', pos: 0.25 },
  { text: 'Запланировать репетицию образа', pos: 0.26 },
  { text: 'Выбрать стилиста для мам и подружек', pos: 0.27 },
  { text: 'Забронировать автомобиль с водителем', pos: 0.30 },
  { text: 'Выбрать артистов для шоу-программы', pos: 0.32 },
  { text: 'Выбрать студию декора', pos: 0.35 },
  { text: 'Утвердить стилистику и цветовую палитру свадьбы', pos: 0.36 },
  { text: 'Утвердить с декоратором смету по декору', pos: 0.40 },
  { text: 'Утвердить маршрут и локации для фотосессии', pos: 0.42 },
  { text: 'Заказать звуковое, световое, видеооборудование и спецэффекты', pos: 0.45 },
  { text: 'Заказать комплименты для гостей', pos: 0.50 },
  { text: 'Утвердить меню', pos: 0.55 },
  { text: 'Утвердить программу с ведущим', pos: 0.56 },
  { text: 'Купить свадебное платье', pos: 0.60 },
  { text: 'Купить костюм для жениха', pos: 0.61 },
  { text: 'Купить обручальные кольца', pos: 0.62 },
  { text: 'Выбрать парфюм для свадьбы', pos: 0.65 },
  { text: 'Выбрать кондитера, утвердить дизайн и начинки для свадебного торта', pos: 0.70 },
  { text: 'Заказать напитки', pos: 0.72 },
  { text: 'Организовать девичник', pos: 0.75 },
  { text: 'Организовать мальчишник', pos: 0.75 },
  { text: 'Продумать образы на сборы в день свадьбы', pos: 0.80 },
  { text: 'Выбрать школу танцев, музыкальную композицию и разучить свадебный танец', pos: 0.82 },
  { text: 'Провести опрос гостей (присутствие, еда, автобус)', pos: 0.85 },
  { text: 'Забронировать отель для приезжих гостей', pos: 0.88 },
  { text: 'Забронировать автобусы для гостей', pos: 0.89 },
  { text: 'Забронировать автобус для вечерней развозки гостей', pos: 0.90 },
  { text: 'Составить план рассадки гостей', pos: 0.92 },
  { text: 'Заказать питание для команды', pos: 0.93 },
  { text: 'Составить плейлист для ди-джея', pos: 0.95 },
];

const INITIAL_FORM_STATE = {
  organizerName: '',
  organizerId: '',
  groomName: '',
  brideName: '',
  date: '',
  guestsCount: '',
  prepLocation: 'home',
  registrationType: 'official',
  venueName: '',
  venueAddress: '',
  clientPassword: ''
};

// --- UTILS ---

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString('ru-RU', options);
};

const toInputDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toISOString().split('T')[0];
};

const getDaysUntil = (dateStr) => {
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const formatCurrency = (val) => {
  if (val === undefined || val === null) return '0';
  return new Intl.NumberFormat('ru-RU', { style: 'decimal', maximumFractionDigits: 0 }).format(val);
};

const downloadCSV = (data, filename) => {
  const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
    + data.map(e => e.join(";")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- UI COMPONENTS ---

const Card = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-2xl shadow-sm border border-[#EBE5E0] ${className} ${onClick ? 'cursor-pointer hover:border-[#AC8A69] hover:shadow-md transition-all active:scale-[0.99]' : ''}`}
  >
    {children}
  </div>
);

const Button = ({ children, onClick, variant = 'primary', className = "", disabled, ...props }) => {
  const baseStyle = "px-6 py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 select-none";
  const variants = {
    primary: `bg-[${COLORS.primary}] text-white hover:bg-[#7D5238] shadow-lg shadow-[${COLORS.primary}]/20 disabled:bg-gray-400 disabled:shadow-none`,
    secondary: `bg-[${COLORS.neutral}]/20 text-[${COLORS.dark}] hover:bg-[${COLORS.neutral}]/30`,
    outline: `border border-[${COLORS.secondary}] text-[${COLORS.primary}] hover:bg-[${COLORS.secondary}]/5`,
    ghost: `text-[${COLORS.primary}] hover:bg-[${COLORS.secondary}]/10`,
    danger: `bg-red-50 text-red-600 hover:bg-red-100`
  };
    
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed transform-none' : ''}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ label, onKeyDown, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-xs font-semibold text-[#AC8A69] uppercase tracking-wider mb-2 ml-1">{label}</label>}
    <input 
      onKeyDown={onKeyDown}
      className="w-full bg-[#F9F7F5] border-none rounded-xl p-4 text-[#414942] placeholder-[#CCBBA9] focus:ring-2 focus:ring-[#936142]/20 transition-all outline-none"
      {...props}
    />
  </div>
);

const MoneyInput = ({ value, onChange, className }) => {
  const [isFocused, setIsFocused] = useState(false);
  const displayValue = isFocused ? (value === 0 ? '' : value) : formatCurrency(value);
  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\s/g, '');
    if (rawValue === '') onChange(0);
    else if (!isNaN(rawValue)) onChange(parseInt(rawValue, 10));
  };
  return (
    <input
      type="text"
      className={`${className} outline-none bg-transparent`}
      value={displayValue}
      onChange={handleChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder="0"
    />
  );
};

const AutoHeightTextarea = ({ value, onChange, className, placeholder }) => {
  const textareaRef = useRef(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  useEffect(() => {
     adjustHeight();
     const timer = setTimeout(adjustHeight, 10);
     return () => clearTimeout(timer);
  }, [adjustHeight]);

  return (
    <textarea
      ref={textareaRef}
      className={`${className} resize-none overflow-hidden block`}
      value={value}
      onChange={(e) => {
          onChange(e);
      }}
      rows={1}
      placeholder={placeholder}
    />
  );
};

const Checkbox = ({ checked, onChange }) => (
  <div 
    onClick={(e) => { e.stopPropagation(); onChange(!checked); }}
    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-colors duration-300 flex-shrink-0 print:border-[#414942] ${checked ? `bg-[${COLORS.primary}] border-[${COLORS.primary}] print:bg-[#414942]` : `border-[${COLORS.neutral}] bg-transparent`}`}
  >
    {checked && <CheckSquare size={14} color="white" />}
  </div>
);

const DownloadMenu = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative print:hidden">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
        <Download size={18} />
      </Button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-[#EBE5E0] z-20 w-48 overflow-hidden animate-fadeIn">
            {['excel', 'csv', 'pdf'].map(type => (
              <button key={type} onClick={() => { onSelect(type); setIsOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-[#F9F7F5] text-[#414942] text-sm font-medium flex items-center gap-3 transition-colors uppercase">
                {type}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- UI VIEWS ---

const OrganizersView = ({ team, onAdd, onDelete, onBack }) => {
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPass, setNewPass] = useState('');

    return (
        <div className="min-h-screen bg-[#F9F7F5] font-[Montserrat]">
            <nav className="p-6 flex items-center gap-4">
                <button onClick={onBack} className="flex items-center gap-2 text-[#AC8A69] hover:text-[#936142]"><ChevronLeft size={20}/> <span className="font-bold text-lg">Назад</span></button>
            </nav>
            <div className="p-6 md:p-12 max-w-4xl mx-auto animate-fadeIn">
                <h2 className="text-3xl font-bold text-[#414942] mb-8">Команда</h2>
                <Card className="p-6 mb-8 bg-white border-[#EBE5E0]">
                    <h3 className="font-bold text-[#936142] mb-4">Добавить организатора</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                        <input className="bg-[#F9F7F5] border-none rounded-xl p-3 outline-none" placeholder="Имя" value={newName} onChange={e => setNewName(e.target.value)} />
                        <input className="bg-[#F9F7F5] border-none rounded-xl p-3 outline-none" placeholder="Email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
                        <input className="bg-[#F9F7F5] border-none rounded-xl p-3 outline-none" placeholder="Пароль" value={newPass} onChange={e => setNewPass(e.target.value)} />
                    </div>
                    <Button onClick={() => { onAdd({ id: Date.now(), name: newName, email: newEmail, password: newPass }); setNewName(''); setNewEmail(''); setNewPass(''); }} className="mt-4 w-full md:w-auto">Добавить</Button>
                </Card>
                <div className="grid gap-4">
                    {team.map(org => (
                        <div key={org.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-[#EBE5E0]">
                            <div>
                                <p className="font-bold text-[#414942]">{org.name}</p>
                                <p className="text-xs text-[#AC8A69]">{org.email} | Пароль: {org.password}</p>
                            </div>
                            <button onClick={() => onDelete(org.id)} className="text-red-300 hover:text-red-500 p-2"><Trash2 size={18}/></button>
                        </div>
                    ))}
                    {team.length === 0 && <p className="text-center text-[#CCBBA9]">В команде пока никого нет.</p>}
                </div>
            </div>
        </div>
    );
};

const SettingsModal = ({ project, onClose, onSave, onDelete, onArchive }) => {
  const [data, setData] = useState({ ...project });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#414942]/50 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative flex flex-col max-h-[90vh] my-auto">
        <div className="p-6 border-b border-[#EBE5E0] flex justify-between items-center shrink-0">
          <h3 className="text-xl font-bold text-[#414942]">Настройки проекта</h3>
          <button onClick={onClose} className="p-2 hover:bg-[#F9F7F5] rounded-full text-[#AC8A69]"><X size={20} /></button>
        </div>
        
        <div className="p-6 overflow-y-auto custom-scrollbar">
           {/* Блок доступа клиента */}
           <div className="bg-[#936142] p-5 rounded-2xl mb-6 text-white shadow-lg shadow-[#936142]/20">
              <div className="flex justify-between items-start mb-2">
                 <p className="text-xs font-bold uppercase tracking-widest opacity-80">Доступ для клиента</p>
                 <LinkIcon size={16} className="opacity-80"/>
              </div>
              <div className="flex gap-2 items-center bg-white/10 p-2 rounded-xl border border-white/20 mb-3">
                 <input className="bg-transparent text-sm w-full outline-none text-white placeholder-white/50" value={`${SITE_URL}?id=${project.id}`} readOnly />
                 <button onClick={() => alert('Ссылка скопирована (демо)')}><Copy size={16}/></button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <p className="text-[10px] uppercase opacity-60 mb-1">Пароль клиента</p>
                    <input className="bg-transparent text-xl font-bold w-full outline-none" value={data.clientPassword || '1234'} onChange={e => setData({...data, clientPassword: e.target.value})} />
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <Input label="Жених" value={data.groomName} onChange={e => setData({...data, groomName: e.target.value})} />
              <Input label="Невеста" value={data.brideName} onChange={e => setData({...data, brideName: e.target.value})} />
           </div>
           <Input label="Организатор" value={data.organizerName} onChange={e => setData({...data, organizerName: e.target.value})} />
           <div className="grid grid-cols-2 gap-4">
              <Input label="Дата" type="date" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
              <Input label="Гостей" type="number" value={data.guestsCount} onChange={e => setData({...data, guestsCount: e.target.value})} />
           </div>
           <Input label="Локация" value={data.venueName} onChange={e => setData({...data, venueName: e.target.value})} />
           <Input label="Адрес" value={data.venueAddress} onChange={e => setData({...data, venueAddress: e.target.value})} />
        </div>

        <div className="p-6 border-t border-[#EBE5E0] bg-[#F9F7F5] shrink-0 rounded-b-3xl space-y-3">
           <Button className="w-full" onClick={() => onSave(data)}><Save size={18} /> Сохранить изменения</Button>
           <div className="flex gap-3 pt-2">
             <Button variant="outline" className="flex-1" onClick={() => onArchive(project.id)}><Archive size={18} /> {project.isArchived ? 'Вернуть' : 'В архив'}</Button>
             <Button variant="danger" className="flex-1" onClick={() => onDelete(project.id)}><Trash2 size={18} /> Удалить</Button>
           </div>
        </div>
      </div>
    </div>
  );
};

const ProfileModal = ({ user, onClose, onSave }) => {
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [secret, setSecret] = useState(user?.secret || '');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#414942]/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-[#AC8A69]"><X size={20} /></button>
                <h3 className="text-xl font-bold text-[#414942] mb-6">Ваш профиль</h3>
                <Input label="Имя" value={name} onChange={e => setName(e.target.value)} />
                <Input label="Email для входа" value={email} onChange={e => setEmail(e.target.value)} />
                <div className="bg-[#F9F7F5] p-3 rounded-xl border border-[#AC8A69]/30 mb-6">
                    <label className="block text-[10px] font-bold text-[#AC8A69] uppercase tracking-wider mb-2">Секретное слово (для сброса)</label>
                    <input className="bg-transparent w-full text-[#414942] outline-none" placeholder="Придумайте слово" value={secret} onChange={e => setSecret(e.target.value)} />
                </div>
                <Button className="w-full" onClick={() => onSave({ ...user, name, email, secret })}>Сохранить изменения</Button>
            </div>
        </div>
    );
};

// --- MAIN APPLICATION ---

export default function App() {
  const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem('wedding_projects') || '[]'));
  const [team, setTeam] = useState(() => JSON.parse(localStorage.getItem('wedding_team') || '[]'));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('wedding_user') || '{"name":"Владелец","email":"owner@wed.control","role":"owner"}'));
  
  const [currentProject, setCurrentProject] = useState(null);
  const [view, setView] = useState('dashboard'); // 'dashboard', 'create', 'project', 'team'
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardTab, setDashboardTab] = useState('active'); // 'active' | 'archived'
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => localStorage.setItem('wedding_projects', JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem('wedding_team', JSON.stringify(team)), [team]);
  useEffect(() => localStorage.setItem('wedding_user', JSON.stringify(user)), [user]);

  const createProject = () => {
    const creationDate = new Date();
    const weddingDate = new Date(formData.date);
    const totalTime = weddingDate - creationDate;

    let projectTasks = TASK_TEMPLATES.map(t => {
      const deadline = new Date(creationDate.getTime() + totalTime * t.pos);
      return { id: Math.random().toString(36).substr(2, 9), text: t.text, deadline: deadline.toISOString(), done: false };
    });

    let projectExpenses = [...INITIAL_EXPENSES];
    if (formData.prepLocation === 'hotel') {
        projectTasks.push({ id: 'hotel_1', text: 'Забронировать номер', deadline: new Date().toISOString(), done: false });
        projectExpenses.push({ category: 'Логистика', name: 'Номер в отеле', plan: 0, fact: 0, paid: 0, note: '' });
    }
    if (formData.registrationType === 'offsite') {
        projectTasks.push({ id: 'reg_1', text: 'Выбрать регистратора', deadline: new Date().toISOString(), done: false });
        projectExpenses.push({ category: 'Программа', name: 'Регистратор', plan: 0, fact: 0, paid: 0, note: '' });
    }

    projectTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    
    // Assign organizer name
    let orgName = user.name;
    if (formData.organizerId && formData.organizerId !== 'owner') {
        const member = team.find(m => m.id.toString() === formData.organizerId);
        if (member) orgName = member.name;
    }

    const newProject = {
      id: Date.now(),
      ...formData,
      organizerName: orgName,
      clientPassword: Math.floor(1000 + Math.random() * 9000).toString(),
      isArchived: false,
      tasks: projectTasks,
      expenses: projectExpenses,
      timing: INITIAL_TIMING.map(t => ({...t, id: Math.random().toString(36).substr(2,9)})),
      guests: [],
      notes: ''
    };

    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
    setView('project');
    setActiveTab('overview');
  };

  const updateProjectData = (field, value) => {
    setCurrentProject(prev => {
      const updated = { ...prev, [field]: value };
      setProjects(list => list.map(p => p.id === updated.id ? updated : p));
      return updated;
    });
  };

  const saveSettings = (updatedData) => {
    setCurrentProject(updatedData);
    setProjects(list => list.map(p => p.id === updatedData.id ? updatedData : p));
    setIsSettingsOpen(false);
  };

  const deleteProject = (id) => {
    if(window.confirm('Удалить проект?')) {
        setProjects(list => list.filter(p => p.id !== id));
        setIsSettingsOpen(false);
        setView('dashboard');
    }
  };

  const toggleArchive = (id) => {
    const p = projects.find(x => x.id === id);
    p.isArchived = !p.isArchived;
    setProjects([...projects]);
    setIsSettingsOpen(false);
    setView('dashboard');
  };

  const sortedProjects = projects
    .filter(p => dashboardTab === 'active' ? !p.isArchived : p.isArchived)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // --- SUB-VIEWS RENDERERS ---
  const TasksViewRenderer = ({ tasks, updateProject }) => (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 print:hidden">
        <h2 className="text-2xl font-serif text-[#414942]">Список задач</h2>
        <div className="flex gap-2 w-full md:w-auto">
           <Button variant="primary" onClick={() => updateProject('tasks', [...tasks, { id: Date.now(), text: 'Новая задача', deadline: new Date().toISOString(), done: false }])} className="flex-1 md:flex-none"><Plus size={18}/> Добавить</Button>
           <DownloadMenu onSelect={(t) => downloadCSV([['Задача','Статус'], ...tasks.map(x=>[x.text, x.done?'+':'-'])], 'tasks.csv')} />
        </div>
      </div>
      <div className="grid gap-4">
        {tasks.sort((a,b) => (a.done === b.done ? 0 : a.done ? 1 : -1)).map((task, i) => (
            <div key={task.id} className="group flex flex-col md:flex-row md:items-start p-4 bg-white rounded-xl border border-[#EBE5E0]">
              <div className="flex items-start flex-1 gap-4 pt-1">
                <Checkbox checked={task.done} onChange={(c) => { const n = [...tasks]; n.find(x=>x.id===task.id).done = c; updateProject('tasks', n); }} />
                <div className="flex-1 min-w-0">
                  <AutoHeightTextarea className={`w-full font-medium text-base md:text-lg bg-transparent outline-none ${task.done ? 'line-through text-[#CCBBA9]' : 'text-[#414942]'}`} value={task.text} onChange={(e) => { const n = [...tasks]; n.find(x=>x.id===task.id).text = e.target.value; updateProject('tasks', n); }} placeholder="Текст задачи" />
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-4 pl-10 md:pl-0 w-full md:w-auto pt-1">
                <div className="flex items-center gap-2 text-[#AC8A69] bg-[#F9F7F5] px-3 py-1.5 rounded-lg w-full md:w-[160px]">
                    <CalendarDays size={14}/><input type="date" className="bg-transparent outline-none text-sm w-full cursor-pointer" value={toInputDate(task.deadline)} onChange={(e) => { const n = [...tasks]; n.find(x=>x.id===task.id).deadline = e.target.value; updateProject('tasks', n); }} />
                </div>
                <button onClick={() => updateProject('tasks', tasks.filter(x=>x.id!==task.id))} className="text-[#CCBBA9] hover:text-red-400 p-2"><Trash2 size={18} /></button>
              </div>
            </div>
        ))}
      </div>
    </div>
  );

  const BudgetViewRenderer = ({ expenses, updateProject }) => {
      const totals = expenses.reduce((acc, item) => ({ plan: acc.plan + Number(item.plan), fact: acc.fact + Number(item.fact), paid: acc.paid + Number(item.paid) }), { plan: 0, fact: 0, paid: 0 });
      return (
        <div className="animate-fadeIn pb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {['План', 'Факт', 'Внесено', 'Остаток'].map((label, i) => (
                <Card key={label} className={`p-4 md:p-6 text-center ${i===3 ? 'bg-[#414942] text-white' : ''}`}>
                    <p className={`${i===3 ? 'text-white/60' : 'text-[#AC8A69]'} text-[10px] md:text-xs uppercase tracking-widest mb-2`}>{label}</p>
                    <p className={`text-lg md:text-2xl font-medium ${i===3 ? 'text-white' : i===2 ? 'text-[#936142]' : 'text-[#414942]'}`}>
                        {formatCurrency(i===0?totals.plan:i===1?totals.fact:i===2?totals.paid:totals.fact-totals.paid)}
                    </p>
                </Card>
            ))}
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-[#EBE5E0] overflow-hidden">
              <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead><tr className="bg-[#F9F7F5] text-[#936142] text-xs md:text-sm uppercase tracking-wider"><th className="p-4 w-[200px]">Статья</th><th className="p-4 w-[120px]">План</th><th className="p-4 w-[120px]">Факт</th><th className="p-4 w-[120px]">Внесено</th><th className="p-4 w-[120px]">Остаток</th><th className="p-4 w-[200px]">Комментарии</th><th className="p-4 w-10"></th></tr></thead>
                      <tbody className="divide-y divide-[#EBE5E0]">
                      {expenses.map((item, idx) => (
                          <tr key={idx} className="hover:bg-[#F9F7F5]/50 group">
                          <td className="p-4 align-top"><AutoHeightTextarea className="w-full bg-transparent outline-none font-medium text-[#414942] text-sm md:text-base" value={item.name} onChange={(e) => { const n=[...expenses]; n[idx].name=e.target.value; updateProject('expenses', n); }} /></td>
                          <td className="p-4 align-top"><MoneyInput value={item.plan} onChange={(v) => { const n=[...expenses]; n[idx].plan=v; updateProject('expenses', n); }} className="w-full text-[#414942]" /></td>
                          <td className="p-4 align-top"><MoneyInput value={item.fact} onChange={(v) => { const n=[...expenses]; n[idx].fact=v; updateProject('expenses', n); }} className="w-full text-[#414942]" /></td>
                          <td className="p-4 align-top"><MoneyInput value={item.paid} onChange={(v) => { const n=[...expenses]; n[idx].paid=v; updateProject('expenses', n); }} className="w-full text-[#414942]" /></td>
                          <td className="p-4 align-top text-[#AC8A69]">{formatCurrency(item.fact - item.paid)}</td>
                          <td className="p-4 align-top"><AutoHeightTextarea className="w-full bg-transparent outline-none text-xs text-[#AC8A69]" placeholder="..." value={item.note || ''} onChange={(e) => { const n=[...expenses]; n[idx].note=e.target.value; updateProject('expenses', n); }} /></td>
                          <td className="p-4 align-top"><button onClick={() => { const n=[...expenses]; n.splice(idx,1); updateProject('expenses', n); }} className="text-red-300 hover:text-red-500"><Trash2 size={16} /></button></td>
                          </tr>
                      ))}
                      </tbody>
                  </table>
              </div>
          </div>
          <div className="flex items-center gap-2 mt-6"><Button onClick={() => updateProject('expenses', [...expenses, { name: '', plan: 0, fact: 0, paid: 0 }])} variant="primary"><Plus size={18}/> Добавить статью</Button></div>
        </div>
      );
  };

  const GuestsViewRenderer = ({ guests, updateProject }) => (
      <div className="animate-fadeIn pb-24">
          <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-serif text-[#414942]">Список гостей ({guests.length})</h2><Button onClick={() => updateProject('guests', [...guests, { id: Date.now(), name: '', table: '' }])} variant="primary"><Plus size={18}/> Добавить</Button></div>
          <div className="grid gap-4">
              {guests.map((guest, idx) => (
                  <Card key={guest.id} className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                          <div className="flex items-center justify-between w-full md:w-auto md:col-span-1"><span className="w-8 h-8 rounded-full bg-[#CCBBA9]/30 text-[#936142] flex items-center justify-center font-bold text-sm">{idx + 1}</span><button onClick={() => updateProject('guests', guests.filter(g=>g.id!==guest.id))} className="md:hidden text-red-400"><Trash2 size={18}/></button></div>
                          <div className="w-full md:col-span-3"><label className="text-[10px] text-[#CCBBA9] font-bold">ФИО</label><input className="w-full text-lg font-medium text-[#414942] bg-transparent border-b border-transparent focus:border-[#AC8A69] outline-none" placeholder="Имя гостя" value={guest.name} onChange={(e) => { const n=[...guests]; n[idx].name=e.target.value; updateProject('guests', n); }} /></div>
                          <div className="w-1/2 md:w-full md:col-span-2"><label className="text-[10px] text-[#CCBBA9] font-bold">Стол №</label><input className="w-full bg-transparent border-b border-[#EBE5E0] focus:border-[#AC8A69] outline-none" value={guest.table} onChange={(e) => { const n=[...guests]; n[idx].table=e.target.value; updateProject('guests', n); }} /></div>
                          <div className="w-full md:col-span-3"><label className="text-[10px] text-[#CCBBA9] font-bold">Пожелания</label><input className="w-full text-sm bg-transparent border-b border-[#EBE5E0] outline-none" placeholder="Еда..." value={guest.food} onChange={(e) => { const n=[...guests]; n[idx].food=e.target.value; updateProject('guests', n); }} /></div>
                          <div className="hidden md:flex md:col-span-1 justify-end pt-4"><button onClick={() => updateProject('guests', guests.filter(g=>g.id!==guest.id))} className="text-[#CCBBA9] hover:text-red-400"><Trash2 size={18}/></button></div>
                      </div>
                  </Card>
              ))}
          </div>
      </div>
  );

  const TimingViewRenderer = ({ timing, updateProject }) => (
    <div className="animate-fadeIn max-w-2xl mx-auto pb-24">
        <div className="relative border-l border-[#EBE5E0] ml-4 md:ml-6 space-y-6">
            {timing.sort((a,b)=>a.time.localeCompare(b.time)).map((item, idx) => (
                <div key={item.id} className="relative pl-6 group">
                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#AC8A69]"></div>
                    <div className="flex items-baseline gap-4">
                          <input className="w-16 text-lg font-bold text-[#936142] bg-transparent outline-none text-right" value={item.time} onChange={(e) => { const n=[...timing]; n[idx].time=e.target.value; updateProject('timing', n); }} />
                          <input className="flex-1 text-base text-[#414942] bg-transparent outline-none border-b border-transparent focus:border-[#AC8A69]" value={item.event} onChange={(e) => { const n=[...timing]; n[idx].event=e.target.value; updateProject('timing', n); }} />
                          <button onClick={() => updateProject('timing', timing.filter(t=>t.id!==item.id))} className="opacity-0 group-hover:opacity-100 text-[#CCBBA9] hover:text-red-400"><X size={14}/></button>
                    </div>
                </div>
            ))}
            <div className="pl-6 pt-2"><button onClick={() => updateProject('timing', [...timing, { id: Date.now(), time: '00:00', event: '' }])} className="flex items-center gap-2 text-[#AC8A69] text-xs font-medium"><Plus size={10}/> Добавить этап</button></div>
        </div>
    </div>
  );

  // --- RENDER APP ---

  if (view === 'team') {
      return <OrganizersView team={team} onBack={() => setView('dashboard')} onAdd={(m) => setTeam([...team, m])} onDelete={(id) => setTeam(team.filter(t => t.id !== id))} />;
  }

  if (view === 'dashboard') {
    const filteredProjects = projects.filter(p => dashboardTab === 'active' ? !p.isArchived : p.isArchived);
    return (
      <div className="min-h-screen bg-[#F9F7F5] p-6 md:p-12 pb-32 font-[Montserrat]">
        <div className="max-w-6xl mx-auto">
          {isProfileOpen && <ProfileModal user={user} onClose={() => setIsProfileOpen(false)} onSave={(u) => { setUser(u); setIsProfileOpen(false); }} />}
          
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div>
                <h1 className="text-4xl md:text-5xl font-bold text-[#414942] tracking-tight">Wed.Control</h1>
                <button onClick={() => setIsProfileOpen(true)} className="text-[#AC8A69] mt-2 hover:text-[#936142] flex items-center gap-2">Кабинет: {user.name} <Edit3 size={14}/></button>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <Button onClick={() => { setFormData(INITIAL_FORM_STATE); setView('create'); }}><Plus size={20}/> Новый проект</Button>
                <Button variant="secondary" onClick={() => setView('team')}><UsersIcon size={20}/> Команда</Button>
            </div>
          </header>

          <div className="flex gap-4 mb-8 border-b border-[#EBE5E0]">
             <button onClick={() => setDashboardTab('active')} className={`pb-3 px-1 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${dashboardTab === 'active' ? 'border-[#936142] text-[#936142]' : 'border-transparent text-[#CCBBA9]'}`}>Активные</button>
             <button onClick={() => setDashboardTab('archived')} className={`pb-3 px-1 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${dashboardTab === 'archived' ? 'border-[#936142] text-[#936142]' : 'border-transparent text-[#CCBBA9]'}`}>Архив</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProjects.map(p => (
              <div key={p.id} onClick={() => { setCurrentProject(p); setView('project'); setActiveTab('overview'); }} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group border border-[#EBE5E0] hover:border-[#AC8A69]/30 relative overflow-hidden">
                <Heart size={64} className="absolute top-4 right-4 text-[#936142] opacity-10 group-hover:opacity-20 transition-opacity"/>
                <div className="relative z-10">
                    <p className="text-xs font-bold text-[#AC8A69] uppercase tracking-widest mb-3">{formatDate(p.date)}</p>
                    <h3 className="text-2xl font-serif text-[#414942] mb-1">{p.groomName} <span className="text-[#AC8A69]">&</span> {p.brideName}</h3>
                    <p className="text-[#CCBBA9] text-sm mb-6">{p.venueName || 'Локация не выбрана'}</p>
                    <div className="flex items-center justify-between mt-8 border-t border-[#F9F7F5] pt-4">
                        <div><p className="text-[10px] text-[#CCBBA9] uppercase">Организатор</p><p className="text-xs text-[#AC8A69] font-bold">{p.organizerName || 'Владелец'}</p></div>
                        <span className="text-[#936142] group-hover:translate-x-1 transition-transform"><ArrowRight size={20}/></span>
                    </div>
                </div>
              </div>
            ))}
            {filteredProjects.length === 0 && <div className="col-span-full text-center py-20 text-[#CCBBA9]"><p className="text-xl">Здесь пока пусто.</p></div>}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'create') {
    return (
      <div className="min-h-screen bg-[#F9F7F5] flex items-center justify-center p-6 font-[Montserrat] pb-32">
        {/* FIX: Убрали жесткое центрирование, добавили my-auto для больших экранов */}
        <div className="w-full max-w-2xl flex flex-col justify-center min-h-min">
            <Card className="p-8 md:p-12 animate-slideUp">
                <div className="flex items-center mb-8"><button onClick={() => setView('dashboard')} className="mr-4 text-[#AC8A69] hover:text-[#936142]"><ChevronLeft size={24}/></button><h2 className="text-3xl font-bold text-[#414942]">Создание истории</h2></div>
                <div className="space-y-6">
                    <div className="p-6 bg-[#F9F7F5] rounded-xl space-y-6">
                        <p className="text-[#936142] font-semibold text-sm uppercase tracking-wider mb-4 border-b border-[#CCBBA9]/20 pb-2">О паре</p>
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-[#AC8A69] uppercase tracking-wider mb-2 ml-1">Ответственный организатор</label>
                            <select className="w-full bg-white border-none rounded-xl p-4 text-[#414942] outline-none" value={formData.organizerId} onChange={e => setFormData({...formData, organizerId: e.target.value})}>
                                <option value="owner">Владелец (Я)</option>
                                {team.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Input label="Жених" placeholder="Имя" value={formData.groomName} onChange={e => setFormData({...formData, groomName: e.target.value})} /><Input label="Невеста" placeholder="Имя" value={formData.brideName} onChange={e => setFormData({...formData, brideName: e.target.value})} /></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Input label="Дата свадьбы" type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} /><Input label="Гостей" type="number" placeholder="50" value={formData.guestsCount} onChange={e => setFormData({...formData, guestsCount: e.target.value})} /></div>
                    </div>
                    <div className="space-y-4"><label className="block text-xs font-semibold text-[#AC8A69] uppercase tracking-wider ml-1">Детали дня</label><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><select className="w-full bg-white border border-[#EBE5E0] rounded-xl p-4 text-[#414942] outline-none focus:border-[#AC8A69]" value={formData.prepLocation} onChange={e => setFormData({...formData, prepLocation: e.target.value})}><option value="home">Сборы дома</option><option value="hotel">Сборы в отеле</option></select><select className="w-full bg-white border border-[#EBE5E0] rounded-xl p-4 text-[#414942] outline-none focus:border-[#AC8A69]" value={formData.registrationType} onChange={e => setFormData({...formData, registrationType: e.target.value})}><option value="official">ЗАГС</option><option value="offsite">Выездная регистрация</option></select></div></div>
                    <div className="grid grid-cols-1 gap-4"><Input label="Локация" placeholder="Название ресторана / отеля" value={formData.venueName} onChange={e => setFormData({...formData, venueName: e.target.value})} /><Input label="Адрес" placeholder="Улица, дом" value={formData.venueAddress} onChange={e => setFormData({...formData, venueAddress: e.target.value})} /></div>
                    <div className="bg-[#F9F7F5] p-4 rounded-xl flex items-center gap-3 border border border-[#AC8A69]/20"><Key className="text-[#936142]" /><div className="flex-1"><p className="text-xs font-bold text-[#AC8A69] uppercase">Пароль для клиента (авто)</p><div className="flex gap-2"><input className="bg-transparent font-mono text-xl font-bold text-[#414942] outline-none w-full" value={formData.clientPassword} onChange={e => setFormData({...formData, clientPassword: e.target.value})} /><button onClick={() => setFormData({...formData, clientPassword: Math.floor(1000 + Math.random() * 9000).toString()})} className="text-[#AC8A69] hover:text-[#936142]"><Edit3 size={16}/></button></div></div></div>
                    <Button onClick={createProject} className="w-full mt-8">Создать проект</Button>
                </div>
            </Card>
        </div>
      </div>
    );
  }

  if (view === 'project' && currentProject) {
    const expensesSum = currentProject.expenses.reduce((acc, i) => ({ plan: acc.plan + Number(i.plan), fact: acc.fact + Number(i.fact), paid: acc.paid + Number(i.paid) }), { plan: 0, fact: 0, paid: 0 });
    
    return (
      <div className="min-h-screen bg-[#F9F7F5] font-[Montserrat]">
        {isSettingsOpen && <SettingsModal project={currentProject} onClose={() => setIsSettingsOpen(false)} onSave={saveSettings} onDelete={deleteProject} onArchive={toggleArchive} />}

        <nav className="sticky top-0 bg-white/90 backdrop-blur border-b border-[#EBE5E0] z-50 px-4 md:px-6 h-16 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 md:gap-4"><button onClick={() => setView('dashboard')} className="p-2 hover:bg-[#F9F7F5] rounded-full transition-colors text-[#AC8A69]"><ChevronLeft /></button><span className="text-lg md:text-xl font-bold text-[#936142] tracking-tight whitespace-nowrap">Wed.Control</span></div>
          <div className="hidden md:flex gap-1 bg-[#F9F7F5] p-1 rounded-xl">
              {['overview', 'tasks', 'budget', 'guests', 'timing', 'notes'].map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-white text-[#936142] shadow-sm' : 'text-[#CCBBA9] hover:text-[#414942]'}`}>{tab === 'overview' ? 'Обзор' : tab === 'tasks' ? 'Задачи' : tab === 'budget' ? 'Смета' : tab === 'guests' ? 'Гости' : tab === 'timing' ? 'Тайминг' : 'Заметки'}</button>))}
          </div>
          <div className="flex items-center gap-4"><div className="text-right hidden md:block"><p className="font-serif text-[#414942] font-medium text-sm md:text-base">{currentProject.groomName} & {currentProject.brideName}</p><p className="text-[10px] md:text-xs text-[#AC8A69]">{formatDate(currentProject.date)}</p></div><button onClick={() => setIsSettingsOpen(true)} className="p-2 text-[#AC8A69] hover:text-[#936142] hover:bg-[#F9F7F5] rounded-full transition-colors"><Settings size={20} /></button></div>
        </nav>
        
        {/* Mobile Nav */}
        <div className="md:hidden overflow-x-auto whitespace-nowrap px-6 pb-2 pt-2 scrollbar-hide border-b border-[#EBE5E0] bg-white/50 backdrop-blur-sm print:hidden">
             {['overview', 'tasks', 'budget', 'guests', 'timing', 'notes'].map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all inline-block mr-2 ${activeTab === tab ? 'bg-white text-[#936142] shadow-sm ring-1 ring-[#936142]/10' : 'text-[#CCBBA9]'}`}>{tab === 'overview' ? 'Обзор' : tab === 'tasks' ? 'Задачи' : tab === 'budget' ? 'Смета' : tab === 'guests' ? 'Гости' : tab === 'timing' ? 'Тайминг' : 'Заметки'}</button>))}
        </div>

        <main className="max-w-7xl mx-auto p-4 md:p-12 pb-32 print:p-0">
          {activeTab === 'overview' && (
            <div className="space-y-6 md:space-y-8 pb-10">
                <div className="relative rounded-[2rem] overflow-hidden bg-[#936142] text-white p-8 md:p-12 text-center md:text-left shadow-2xl shadow-[#936142]/30">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div><h1 className="text-3xl md:text-6xl font-serif mb-4">{currentProject.groomName} <span className="text-[#C58970]">&</span> {currentProject.brideName}</h1><div className="flex items-center justify-center md:justify-start gap-4 text-[#EBE5E0]"><MapPin size={18}/><span className="text-base md:text-lg tracking-wide">{currentProject.venueName || 'Локация не выбрана'}</span></div></div>
                        <div className="text-center md:text-right"><div className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">{getDaysUntil(currentProject.date)}</div><div className="text-[10px] md:text-sm uppercase tracking-[0.2em] opacity-80 mt-2">Дней до свадьбы</div></div>
                    </div>
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#AC8A69] rounded-full mix-blend-overlay opacity-50 blur-3xl"></div><div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#C58970] rounded-full mix-blend-overlay opacity-50 blur-3xl"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <Card className="p-4 md:p-6 flex flex-col justify-between h-32 md:h-40" onClick={() => setActiveTab('tasks')}><CheckSquare className="text-[#936142] mb-2 md:mb-4" size={24} md:size={32}/><div><p className="text-2xl md:text-3xl font-bold text-[#414942]">{currentProject.tasks.filter(t => !t.done).length}</p><p className="text-[10px] md:text-xs text-[#AC8A69] uppercase mt-1">Активных задач</p></div></Card>
                    <Card className="p-4 md:p-6 flex flex-col justify-between h-32 md:h-40" onClick={() => setActiveTab('budget')}><PieChart className="text-[#936142] mb-2 md:mb-4" size={24} md:size={32}/><div><p className="text-lg md:text-xl font-bold text-[#414942]">{Math.round((expensesSum.paid / (expensesSum.fact || 1)) * 100)}%</p><p className="text-[10px] md:text-xs text-[#AC8A69] uppercase mt-1">Бюджет оплачен</p></div></Card>
                    <Card className="p-4 md:p-6 flex flex-col justify-between h-32 md:h-40" onClick={() => setActiveTab('guests')}><Users className="text-[#936142] mb-2 md:mb-4" size={24} md:size={32}/><div><p className="text-2xl md:text-3xl font-bold text-[#414942]">{currentProject.guests.length}</p><p className="text-[10px] md:text-xs text-[#AC8A69] uppercase mt-1">Гостей</p></div></Card>
                    <Card className="p-4 md:p-6 flex flex-col justify-between h-32 md:h-40" onClick={() => setActiveTab('timing')}><Clock className="text-[#936142] mb-2 md:mb-4" size={24} md:size={32}/><div><p className="text-lg md:text-xl font-bold text-[#414942]">{currentProject.timing[0]?.time || '09:00'}</p><p className="text-[10px] md:text-xs text-[#AC8A69] uppercase mt-1">Начало дня</p></div></Card>
                </div>
                <div><h3 className="text-lg md:text-xl font-serif text-[#414942] mb-4 md:mb-6">Ближайшие дедлайны</h3><div className="grid gap-3 md:gap-4">{currentProject.tasks.filter(t => !t.done).sort((a,b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 3).map(task => (<div key={task.id} className="flex items-center justify-between p-4 md:p-5 bg-white rounded-2xl shadow-sm border border-[#EBE5E0]"><div className="flex items-center gap-4"><div className="w-1.5 md:w-2 h-10 md:h-12 bg-[#C58970] rounded-full"></div><div><p className="font-medium text-sm md:text-base text-[#414942]">{task.text}</p><p className="text-xs md:text-sm text-[#AC8A69]">{formatDate(task.deadline)}</p></div></div><Button variant="ghost" onClick={() => setActiveTab('tasks')} className="p-2"><ArrowRight size={18} md:size={20}/></Button></div>))}</div></div>
            </div>
          )}
          {activeTab === 'tasks' && <TasksViewRenderer tasks={currentProject.tasks} updateProject={updateProjectData} formatDate={formatDate} />}
          {activeTab === 'budget' && <BudgetViewRenderer expenses={currentProject.expenses} updateProject={updateProjectData} downloadCSV={downloadCSV} />}
          {activeTab === 'guests' && <GuestsViewRenderer guests={currentProject.guests} updateProject={updateProjectData} downloadCSV={downloadCSV} />}
          {activeTab === 'timing' && <TimingViewRenderer timing={currentProject.timing} updateProject={updateProjectData} downloadCSV={downloadCSV} />}
          {activeTab === 'notes' && <NotesView notes={currentProject.notes} updateProject={updateProjectData} />}
        </main>
      </div>
    );
  }
  return null;
}