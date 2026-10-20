import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Compass,
  Hammer,
  Heart,
  Home,
  LogIn,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  MoreHorizontal,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  UserRound,
  Users,
  Wallet,
  Wrench,
  X,
  Zap,
  Plus,
  Paperclip,
  Smile,
  Image as ImageIcon,
  CalendarDays,
  Settings,
  LayoutDashboard,
  BadgeCheck,
  Phone,
  Mail,
  LockKeyhole,
  Building2,
  TrendingUp,
  ClipboardList,
  Handshake,
  Bot,
  CircleCheck,
  Map,
  Filter,
} from "lucide-react";
import "./style.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseKey && !supabaseUrl.includes("YOUR_PROJECT")
    ? createClient(supabaseUrl, supabaseKey)
    : null;
const categories = [
  ["Electrical", "⚡", "Electrician"],
  ["Plumbing", "🚿", "Plumber"],
  ["AC Repair", "❄️", "AC technician"],
  ["Hair & Beauty", "💇🏽", "Hair stylist"],
  ["Painting", "🖌️", "Painter"],
  ["Auto Repair", "🚘", "Mechanic"],
  ["Carpentry", "🪚", "Carpenter"],
  ["Cleaning", "🧹", "Cleaner"],
  ["Solar & Energy", "☀️", "Solar technician"],
  ["IT Services", "💻", "Web developer"],
  ["Phone Repair", "📱", "Phone repairer"],
  ["Tailoring", "🧵", "Tailor"],
  ["Appliances", "🧺", "Appliance technician"],
  ["Security", "📹", "CCTV installer"],
  ["Events", "📸", "Photographer"],
  ["Construction", "🧱", "Builder"],
  ["Elevators", "🛗", "Elevator technician"],
  ["Logistics", "🛵", "Delivery rider"],
];
const seedPros = [
  {
    id: 1,
    name: "Segun Electricals",
    job: "Electrician",
    location: "Lekki, Lagos",
    distance: "1.2 km",
    rating: 4.9,
    reviews: 124,
    price: 5000,
    experience: 7,
    completed: 254,
    response: 98,
    verified: true,
    available: true,
    avatar: "👨🏿‍🔧",
    color: "av-blue",
    skills: [
      "House Wiring",
      "Generator Installation",
      "Electrical Repairs",
      "Solar Installation",
    ],
    about:
      "Professional electrician with over 7 years of experience in residential and commercial projects. I specialize in house wiring, generator installation and electrical repairs.",
  },
  {
    id: 2,
    name: "Bright Spark Electric",
    job: "Electrician",
    location: "Yaba, Lagos",
    distance: "2.4 km",
    rating: 4.8,
    reviews: 96,
    price: 6000,
    experience: 5,
    completed: 182,
    response: 96,
    verified: true,
    available: true,
    avatar: "👨🏽‍🔧",
    color: "av-orange",
    skills: ["Fault Finding", "Wiring", "Lighting"],
    about:
      "Reliable electrical services for homes and small businesses. Clear quotes, neat work and friendly service.",
  },
  {
    id: 3,
    name: "PowerFix Solutions",
    job: "Generator Repair",
    location: "Ikeja, Lagos",
    distance: "3.1 km",
    rating: 4.7,
    reviews: 76,
    price: 7000,
    experience: 6,
    completed: 145,
    response: 94,
    verified: true,
    available: false,
    avatar: "👨🏾‍🔧",
    color: "av-green",
    skills: ["Generator Repair", "Servicing", "Installation"],
    about:
      "Generator and power solutions specialist. Diagnostics, maintenance and emergency repairs.",
  },
  {
    id: 4,
    name: "Amaka Beauty Studio",
    job: "Hair Stylist",
    location: "Surulere, Lagos",
    distance: "1.8 km",
    rating: 4.8,
    reviews: 88,
    price: 8000,
    experience: 8,
    completed: 310,
    response: 99,
    verified: true,
    available: true,
    avatar: "👩🏽‍🦱",
    color: "av-pink",
    skills: ["Braids", "Wigs", "Hair Treatment"],
    about:
      "Professional braider and stylist offering neat protective styles, wig installation and hair care.",
  },
  {
    id: 5,
    name: "Tunde Mechanic",
    job: "Mechanic",
    location: "Gbagada, Lagos",
    distance: "2.7 km",
    rating: 4.9,
    reviews: 63,
    price: 10000,
    experience: 9,
    completed: 207,
    response: 97,
    verified: true,
    available: true,
    avatar: "👨🏾‍🔧",
    color: "av-purple",
    skills: ["Engine Diagnostics", "Brakes", "Servicing"],
    about:
      "Experienced auto mechanic for diagnostics, routine servicing and dependable repairs.",
  },
  {
    id: 6,
    name: "Lola Paint & Decor",
    job: "Painter",
    location: "Ajah, Lagos",
    distance: "4.1 km",
    rating: 4.7,
    reviews: 51,
    price: 12000,
    experience: 6,
    completed: 102,
    response: 95,
    verified: false,
    available: true,
    avatar: "👩🏾‍🎨",
    color: "av-yellow",
    skills: ["Interior Painting", "Wall Finishing", "Decor"],
    about:
      "Residential and commercial painting with careful preparation and tidy finishing.",
  },
];
const seedJobs = [
  {
    id: 101,
    title: "AC Repair",
    description: "My AC starts but stops after about 5 minutes.",
    location: "Lekki, Lagos",
    budget: "₦10,000 – ₦20,000",
    urgency: "Today",
    status: "In Progress",
    date: "Today, 3:00 PM",
    professional: "Segun Electricals",
  },
  {
    id: 102,
    title: "Generator Repair",
    description: "Generator is making a strange sound.",
    location: "Yaba, Lagos",
    budget: "₦8,000 – ₦15,000",
    urgency: "Urgent",
    status: "Open",
    date: "Tomorrow",
    professional: "—",
  },
  {
    id: 103,
    title: "Car Service",
    description: "Routine service and brake inspection.",
    location: "Ikeja, Lagos",
    budget: "₦15,000 – ₦30,000",
    urgency: "Normal",
    status: "Completed",
    date: "Yesterday",
    professional: "Tunde Mechanic",
  },
];
const initialMessages = [
  {
    id: 1,
    person: "Segun Electricals",
    avatar: "👨🏿‍🔧",
    preview: "Yes, I can come around 3pm. Here is my quote for the job.",
    time: "10:34 AM",
    unread: 2,
    online: true,
    messages: [
      {
        from: "them",
        text: "Hi! Can you come today to fix my power issue?",
        time: "10:32 AM",
      },
      {
        from: "me",
        text: "Yes, I can come around 3pm. Here is my quote for the job.",
        time: "10:34 AM",
        quote: true,
      },
      {
        from: "them",
        text: "That works for me, thank you! 🙌🏽",
        time: "10:35 AM",
      },
    ],
  },
  {
    id: 2,
    person: "Amaka Beauty",
    avatar: "👩🏽‍🦱",
    preview: "Thank you! See you soon 💚",
    time: "09:12 AM",
    unread: 0,
    online: true,
    messages: [
      {
        from: "them",
        text: "Hello! How can I help with your hairstyle?",
        time: "09:10 AM",
      },
      {
        from: "me",
        text: "I would like knotless braids this weekend.",
        time: "09:11 AM",
      },
      { from: "them", text: "Thank you! See you soon 💚", time: "09:12 AM" },
    ],
  },
  {
    id: 3,
    person: "Tunde Mechanic",
    avatar: "👨🏾‍🔧",
    preview: "I can come tomorrow.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { from: "them", text: "I can come tomorrow.", time: "Yesterday" },
    ],
  },
  {
    id: 4,
    person: "Lola Painter",
    avatar: "👩🏾‍🎨",
    preview: "Let me send you some examples.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      {
        from: "them",
        text: "Let me send you some examples.",
        time: "Yesterday",
      },
    ],
  },
];
const money = (n) => "₦" + Number(n).toLocaleString("en-NG");
function getStored(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function Logo({ small = false }) {
  return (
    <div className={"brand " + (small ? "brand-small" : "")}>
      <span className="brand-mark">D</span>
      <span>DskillLink</span>
    </div>
  );
}
function Splash() {
  return (
    <div className="splash">
      <div className="splash-logo">
        <Logo />
      </div>
      <div className="splash-line">
        <i />
      </div>
      <p>Find skilled people near you. Get things done.</p>
      <span className="splash-dots">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
function App() {
  const [splash, setSplash] = useState(true);
  const [page, setPage] = useState("Home");
  const [theme, setTheme] = useState(() =>
    getStored(
      "dsl-theme",
      matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    ),
  );
  const [pros, setPros] = useState(() => getStored("dsl-pros", seedPros));
  const [jobs, setJobs] = useState(() => getStored("dsl-jobs", seedJobs));
  const [messages, setMessages] = useState(() =>
    getStored("dsl-messages", initialMessages),
  );
  const [saved, setSaved] = useState(() => getStored("dsl-saved", [1, 4]));
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Lagos, Nigeria");
  const [filter, setFilter] = useState("All");
  const [selectedPro, setSelectedPro] = useState(null);
  const [activeChat, setActiveChat] = useState(0);
  const [chatText, setChatText] = useState("");
  const [chatSearch, setChatSearch] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      from: "ai",
      text: "Hi! 👋 I'm DskillLink AI. Tell me what you need help with and I'll help you find the right service.",
    },
  ]);
  const [modal, setModal] = useState("");
  const [toast, setToast] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [user, setUser] = useState(() => getStored("dsl-user", null));
  const [authMode, setAuthMode] = useState("signup");
  const [authMethod, setAuthMethod] = useState("email");
  const [jobDraft, setJobDraft] = useState({
    title: "",
    description: "",
    location: "",
    budget: "",
    date: "",
    urgency: "Normal",
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [jobFilter, setJobFilter] = useState("All");
  const [showMap, setShowMap] = useState(false);
  const [profileTab, setProfileTab] = useState("About");
  const [adminTab, setAdminTab] = useState("Overview");
  const [quoteJob, setQuoteJob] = useState(null);
  const [quoteDraft, setQuoteDraft] = useState({
    labour: "8000",
    parts: "4000",
    duration: "2–3 hours",
    notes: "",
  });
  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 1600);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("dsl-theme", JSON.stringify(theme));
  }, [theme]);
  useEffect(
    () => localStorage.setItem("dsl-pros", JSON.stringify(pros)),
    [pros],
  );
  useEffect(
    () => localStorage.setItem("dsl-jobs", JSON.stringify(jobs)),
    [jobs],
  );
  useEffect(
    () => localStorage.setItem("dsl-messages", JSON.stringify(messages)),
    [messages],
  );
  useEffect(
    () => localStorage.setItem("dsl-saved", JSON.stringify(saved)),
    [saved],
  );
  useEffect(() => {
    if (user) localStorage.setItem("dsl-user", JSON.stringify(user));
    else localStorage.removeItem("dsl-user");
  }, [user]);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);
  const filteredPros = useMemo(
    () =>
      pros.filter(
        (p) =>
          [p.name, p.job, p.location, p.about, ...p.skills]
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (filter === "All" ||
            (filter === "Verified" && p.verified) ||
            (filter === "Available" && p.available) ||
            (filter === "Top rated" && p.rating >= 4.8)),
      ),
    [pros, query, filter],
  );
  const go = (p) => {
    setPage(p);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  function startChat(p) {
    let i = messages.findIndex((m) => m.person === p.name);
    if (i < 0) {
      const n = {
        id: Date.now(),
        person: p.name,
        avatar: p.avatar,
        preview: "Start a conversation",
        time: "Now",
        unread: 0,
        online: p.available,
        messages: [
          {
            from: "them",
            text: `Hi! I'm ${p.name}. How can I help you today?`,
            time: "Now",
          },
        ],
      };
      setMessages((old) => [n, ...old]);
      i = 0;
    }
    setActiveChat(i);
    go("Messages");
  }
  function sendMessage(text = chatText) {
    if (!text.trim()) return;
    const msg = {
      from: "me",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((old) =>
      old.map((m, i) =>
        i === activeChat
          ? {
              ...m,
              preview: msg.text,
              time: msg.time,
              unread: 0,
              messages: [...m.messages, msg],
            }
          : m,
      ),
    );
    setChatText("");
    setTimeout(() => {
      setMessages((old) =>
        old.map((m, i) =>
          i === activeChat
            ? {
                ...m,
                preview:
                  "Thanks for your message. I will get back to you shortly.",
                time: "Now",
                messages: [
                  ...m.messages,
                  {
                    from: "them",
                    text: "Thanks for your message. I will get back to you shortly. 😊",
                    time: "Now",
                  },
                ],
              }
            : m,
        ),
      );
    }, 1700);
  }
  function sendAI(text = aiInput) {
    if (!text.trim()) return;
    const userMsg = { from: "me", text: text.trim() };
    setAiMessages((old) => [...old, userMsg]);
    setAiInput("");
    setAiTyping(true);
    const q = text.toLowerCase();
    let answer =
      "I can help you find a suitable local professional. Tell me your service and area (for example, AC repair in Lekki).";
    let match = null;
    if (/fridge|refrigerator|not cold/.test(q)) {
      answer =
        "It sounds like you may need an appliance or refrigeration technician. I can help you compare local professionals. Would you like to browse matching technicians?";
      match = "Appliances";
    } else if (/ac |air condition|hot air|cooling/.test(q)) {
      answer =
        "You likely need an AC technician for diagnosis. Check the professional profile, reviews and quote before booking. Here are matching professionals.";
      match = "AC Repair";
    } else if (/paint/.test(q)) {
      answer =
        "A painter can help with your home. How many rooms need painting, and which area are you in? You can also browse available painters now.";
      match = "Painting";
    } else if (/electric|power|wiring|generator/.test(q)) {
      answer =
        "An electrician or generator technician may be right for this. Please describe the issue and area so you can compare suitable professionals.";
      match = "Electrical";
    } else if (/braid|hair|barber/.test(q)) {
      answer =
        "Hair & Beauty is the right category. Compare portfolios, reviews and starting prices before requesting a booking.";
      match = "Hair & Beauty";
    } else if (/post a job|create a job/.test(q)) {
      answer =
        "Absolutely — use “Post a Job” to describe the work, add your location, preferred date and budget. Matching professionals can then respond.";
      setTimeout(() => setModal("job"), 250);
    } else if (/book|payment/.test(q)) {
      answer =
        "To book, open a professional profile, choose Request Service, agree on a quote in chat, and confirm the booking. This demo does not process real payments yet.";
    } else if (/verify|verification/.test(q)) {
      answer =
        "Verification badges are assigned only after the platform reviews the relevant information. In this demo, sample badges are illustrative; configure an admin verification workflow before launch.";
    }
    setTimeout(() => {
      setAiTyping(false);
      setAiMessages((old) => [
        ...old,
        { from: "ai", text: answer, ...(match ? { action: match } : {}) },
      ]);
    }, 900);
  }
  async function authSubmit(e) {
    e.preventDefault();
    if (supabase) {
      try {
        if (authMode === "signup") {
          if (authMethod === "phone") {
            const { error } = await supabase.auth.signInWithOtp({
              phone: form.phone,
            });
            if (error) throw error;
            setToast(
              "OTP sent to your phone. Complete verification in your Supabase flow.",
            );
            return;
          }
          const { data, error } = await supabase.auth.signUp({
            email: form.email,
            password: form.password,
            options: { data: { full_name: form.name } },
          });
          if (error) throw error;
          if (data.user) {
            setUser({
              name: form.name || form.email.split("@")[0],
              email: form.email,
              role: "Customer",
            });
            setModal("");
            setToast(
              "Account created. Check your email if confirmation is enabled.",
            );
          }
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password,
          });
          if (error) throw error;
          setUser({
            name:
              data.user.user_metadata?.full_name || form.email.split("@")[0],
            email: form.email,
            role: "Customer",
          });
          setModal("");
          setToast("Welcome back!");
        }
      } catch (err) {
        setToast(err.message || "Authentication failed.");
      }
    } else {
      if (!form.name && !user && authMode === "signup") {
        setToast("Please enter your name.");
        return;
      }
      setUser({
        name:
          form.name || form.email?.split("@")[0] || form.phone || "Demo User",
        email: form.email,
        phone: form.phone,
        role: "Customer",
        demo: true,
      });
      setModal("");
      setToast(
        "Demo account ready. Connect Supabase for secure live authentication.",
      );
    }
  }
  async function oauth(provider) {
    if (!supabase) {
      setToast(`Add Supabase credentials to enable ${provider} sign-in.`);
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setToast(error.message);
  }
  function createJob(e) {
    e.preventDefault();
    if (!jobDraft.title || !jobDraft.description || !jobDraft.location) {
      setToast("Add a service, description and location first.");
      return;
    }
    const j = {
      ...jobDraft,
      id: Date.now(),
      budget: jobDraft.budget ? `₦${jobDraft.budget}` : "Budget open to quotes",
      status: "Open",
      date: jobDraft.date || "Flexible",
      professional: "—",
    };
    setJobs((old) => [j, ...old]);
    setJobDraft({
      title: "",
      description: "",
      location: "",
      budget: "",
      date: "",
      urgency: "Normal",
    });
    setModal("");
    setToast(
      "Your job has been posted! Matching professionals can now respond.",
    );
    go("Jobs");
  }
  function sendQuote(e) {
    e.preventDefault();
    setJobs((old) =>
      old.map((j) =>
        j.id === quoteJob.id
          ? {
              ...j,
              status: "Quote sent",
              quote: {
                labour: Number(quoteDraft.labour),
                parts: Number(quoteDraft.parts),
                duration: quoteDraft.duration,
                notes: quoteDraft.notes,
                professional: user?.name || "Your professional profile",
              },
            }
          : j,
      ),
    );
    setQuoteJob(null);
    setToast("Quote saved to the job in this demo.");
  }
  if (splash) return <Splash />;
  const currentChat = messages[activeChat] || messages[0];
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <button
            className="icon-btn mobile-only"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
          >
            <Menu size={21} />
          </button>
          <button className="brand-button" onClick={() => go("Home")}>
            <Logo />
          </button>
          <span className="tagline">
            Find Skilled People Near You. Get Things Done.
          </span>
          <div className="top-features">
            <span>
              <ShieldCheck />
              Verified
              <br />
              Professionals
            </span>
            <span>
              <Wallet />
              Secure
              <br />
              Payments
            </span>
            <span>
              <MessageCircle />
              Real-time
              <br />
              Chat
            </span>
            <span>
              <Sparkles />
              AI
              <br />
              Assistant
            </span>
            <span>
              <MapPin />
              Location
              <br />
              Based
            </span>
            <span>
              <Activity />
              PWA
              <br />
              Ready
            </span>
          </div>
          <div className="top-right">
            <span className="economy">
              Built for a better local economy <i />
            </span>
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            {user ? (
              <button className="user-chip" onClick={() => go("Profile")}>
                <span className="mini-avatar">
                  {user.name?.[0]?.toUpperCase() || "D"}
                </span>
                <span>{user.name}</span>
              </button>
            ) : (
              <button
                className="login-top"
                onClick={() => {
                  setAuthMode("signin");
                  setModal("auth");
                }}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </header>
      {mobileMenu && (
        <div className="mobile-drawer">
          <button className="drawer-close" onClick={() => setMobileMenu(false)}>
            <X />
          </button>
          {[
            "Home",
            "Search",
            "Jobs",
            "Messages",
            "Notifications",
            "Profile",
            "Admin Dashboard",
          ].map((p) => (
            <button key={p} onClick={() => go(p)}>
              {p}
            </button>
          ))}
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            Switch theme
          </button>
        </div>
      )}
      <main>
        {page === "Home" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span className="pulse-dot" /> YOUR TRUSTED LOCAL SERVICES
                  MARKETPLACE
                </div>
                <h1>
                  Find skilled people
                  <br />
                  near <span>you.</span>
                </h1>
                <p className="hero-sub">
                  Get trusted help for almost anything — from fixing repairs to
                  beauty, service and home projects.
                </p>
                <div className="hero-search">
                  <div className="hero-search-field">
                    <Search />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && go("Search")}
                      placeholder="What service do you need?"
                    />
                  </div>
                  <div className="hero-location">
                    <MapPin />
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      aria-label="Location"
                    />
                  </div>
                  <button className="btn-primary" onClick={() => go("Search")}>
                    Find Help <ArrowRight size={17} />
                  </button>
                </div>
                <div className="hero-proof">
                  <div className="avatar-stack">
                    <span>👨🏿‍🔧</span>
                    <span>👩🏽‍🦱</span>
                    <span>👨🏾‍🔧</span>
                    <span>👩🏾‍🎨</span>
                  </div>
                  <div>
                    <strong>Trusted by local communities</strong>
                    <small>
                      <Star size={13} fill="currentColor" /> 4.8/5 average
                      professional rating
                    </small>
                  </div>
                </div>
              </div>
              <div className="hero-art">
                <div className="hero-glow" />
                <div className="hero-image">
                  <img
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=85"
                    alt="Professional electrician working safely"
                  />
                  <div className="image-overlay" />
                  <div className="hero-image-caption">
                    <span className="verified-round">
                      <Check size={15} />
                    </span>
                    <div>
                      <strong>Skilled hands. Trusted work.</strong>
                      <small>Find the right person for the job.</small>
                    </div>
                  </div>
                </div>
                <div className="float-card float-card-one">
                  <span className="float-icon">⚡</span>
                  <div>
                    <strong>Electrical repair</strong>
                    <small>Available near you</small>
                  </div>
                  <span className="live-dot" />
                </div>
                <div className="float-card float-card-two">
                  <span className="float-icon green">✓</span>
                  <div>
                    <strong>Verified professional</strong>
                    <small>Identity checked</small>
                  </div>
                </div>
                <div className="float-sticker">✨</div>
              </div>
            </section>
            <section className="trust-strip">
              <div>
                <ShieldCheck />
                <span>
                  <strong>Verified professionals</strong>
                  <small>Trust before you hire</small>
                </span>
              </div>
              <div>
                <MapPin />
                <span>
                  <strong>Local discovery</strong>
                  <small>People in your area</small>
                </span>
              </div>
              <div>
                <MessageCircle />
                <span>
                  <strong>Chat before booking</strong>
                  <small>Agree on the details</small>
                </span>
              </div>
              <div>
                <Handshake />
                <span>
                  <strong>Work with confidence</strong>
                  <small>Clear job status</small>
                </span>
              </div>
            </section>
            <section className="section-block">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">FIND WHAT YOU NEED</span>
                  <h2>Popular services</h2>
                  <p>
                    From everyday fixes to specialist work, find help for it
                    here.
                  </p>
                </div>
                <button className="text-link" onClick={() => go("Search")}>
                  Explore all services <ArrowRight size={16} />
                </button>
              </div>
              <div className="category-grid">
                {categories.slice(0, 12).map((c, i) => (
                  <button
                    className="category-tile"
                    key={c[0]}
                    onClick={() => {
                      setQuery(c[2]);
                      go("Search");
                    }}
                  >
                    <span className={"category-emoji cat-" + (i % 6)}>
                      {c[1]}
                    </span>
                    <strong>{c[0]}</strong>
                    <small>
                      Find professionals <ChevronRight size={13} />
                    </small>
                  </button>
                ))}
              </div>
            </section>
            <section className="section-block pros-section">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">
                    GOOD PEOPLE, GREAT WORK
                  </span>
                  <h2>Professionals near you</h2>
                  <p>
                    Compare skills, ratings and availability before you make a
                    choice.
                  </p>
                </div>
                <button className="text-link" onClick={() => go("Search")}>
                  View all professionals <ArrowRight size={16} />
                </button>
              </div>
              <div className="professional-grid">
                {pros.slice(0, 3).map((p) => (
                  <ProCard
                    key={p.id}
                    p={p}
                    saved={saved.includes(p.id)}
                    onSave={() =>
                      setSaved((old) =>
                        old.includes(p.id)
                          ? old.filter((x) => x !== p.id)
                          : [...old, p.id],
                      )
                    }
                    onView={() => {
                      setSelectedPro(p);
                      setProfileTab("About");
                      go("Professional Profile");
                    }}
                    onMessage={() => startChat(p)}
                    onRequest={() => {
                      setSelectedPro(p);
                      setModal("request");
                    }}
                  />
                ))}
              </div>
            </section>
            <section className="how-section">
              <div className="section-heading centered">
                <div>
                  <span className="section-kicker">
                    SIMPLE FROM START TO FINISH
                  </span>
                  <h2>Getting help should feel easy.</h2>
                  <p>Three simple steps to get the job done.</p>
                </div>
              </div>
              <div className="steps-grid">
                <div className="step">
                  <span className="step-num">01</span>
                  <span className="step-icon">
                    <Search />
                  </span>
                  <h3>Find the right person</h3>
                  <p>
                    Search by service and location. Compare profiles, ratings
                    and portfolios.
                  </p>
                </div>
                <div className="step-connector">
                  <ArrowRight />
                </div>
                <div className="step">
                  <span className="step-num">02</span>
                  <span className="step-icon green-icon">
                    <MessageCircle />
                  </span>
                  <h3>Chat and agree</h3>
                  <p>
                    Discuss your needs, ask questions and review a quote before
                    confirming.
                  </p>
                </div>
                <div className="step-connector">
                  <ArrowRight />
                </div>
                <div className="step">
                  <span className="step-num">03</span>
                  <span className="step-icon">
                    <CircleCheck />
                  </span>
                  <h3>Get it done</h3>
                  <p>
                    Track the job, confirm completion and leave an honest
                    review.
                  </p>
                </div>
              </div>
            </section>
            <section className="pro-cta">
              <div className="cta-icon">
                <Wrench size={27} />
              </div>
              <div>
                <span className="section-kicker">ARE YOU SKILLED?</span>
                <h2>Turn your skill into opportunity.</h2>
                <p>
                  Build your professional profile, meet new customers and grow
                  your reputation.
                </p>
              </div>
              <button
                className="btn-white"
                onClick={() => {
                  setAuthMode("signup");
                  setModal("professional");
                }}
              >
                Become a professional <ArrowRight size={17} />
              </button>
              <div className="cta-orb" />
            </section>
            <section className="ai-banner">
              <div className="ai-orbit">
                <Bot size={40} />
                <span>✨</span>
              </div>
              <div>
                <span className="section-kicker">MEET YOUR SMART HELPER</span>
                <h2>Not sure who you need? Ask DskillLink AI.</h2>
                <p>
                  Describe the problem in your own words. Get help identifying a
                  service and choosing the next step.
                </p>
              </div>
              <button className="btn-primary" onClick={() => setAiOpen(true)}>
                Ask DskillLink AI <ArrowRight size={17} />
              </button>
            </section>
          </>
        )}
        {page === "Search" && (
          <section className="page-wrap">
            <PageHeader
              kicker="DISCOVER LOCAL TALENT"
              title="Find the right professional"
              subtitle="Search skills, services or describe what needs fixing."
            />
            <div className="search-toolbar">
              <div className="search-input-large">
                <Search />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try “AC repair” or “my fridge isn't cold”"
                />
                <button onClick={() => setQuery("")}>Clear</button>
              </div>
              <div className="search-location">
                <MapPin />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  aria-label="Search location"
                />
              </div>
              <button
                className="btn-primary"
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? <Users size={17} /> : <Map size={17} />}{" "}
                {showMap ? "List view" : "Map view"}
              </button>
            </div>
            <div className="filters-row">
              <SlidersHorizontal size={17} />
              {["All", "Verified", "Available", "Top rated"].map((f) => (
                <button
                  key={f}
                  className={"filter-pill " + (filter === f ? "active" : "")}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
              <span className="result-count">
                {filteredPros.length} professionals found
              </span>
            </div>
            {showMap && (
              <div className="map-panel">
                <div className="map-grid">
                  <span className="map-pin pin-a">
                    📍<small>Segun</small>
                  </span>
                  <span className="map-pin pin-b">
                    📍<small>Amaka</small>
                  </span>
                  <span className="map-pin pin-c">
                    📍<small>Bright Spark</small>
                  </span>
                  <span className="map-pin pin-d">
                    📍<small>Tunde</small>
                  </span>
                  <div className="map-road road-one" />
                  <div className="map-road road-two" />
                  <div className="map-label">{location} · Demo map preview</div>
                </div>
                <p className="map-note">
                  Map preview is illustrative. Connect a maps provider and
                  location permissions for live map coordinates.
                </p>
              </div>
            )}
            <div className="professional-grid search-results">
              {filteredPros.map((p) => (
                <ProCard
                  key={p.id}
                  p={p}
                  saved={saved.includes(p.id)}
                  onSave={() =>
                    setSaved((old) =>
                      old.includes(p.id)
                        ? old.filter((x) => x !== p.id)
                        : [...old, p.id],
                    )
                  }
                  onView={() => {
                    setSelectedPro(p);
                    go("Professional Profile");
                  }}
                  onMessage={() => startChat(p)}
                  onRequest={() => {
                    setSelectedPro(p);
                    setModal("request");
                  }}
                />
              ))}
              {!filteredPros.length && (
                <Empty
                  icon={<Search />}
                  title="No matching professionals yet"
                  body="Try another service name or remove a filter."
                  action={() => {
                    setQuery("");
                    setFilter("All");
                  }}
                  label="Reset search"
                />
              )}
            </div>
          </section>
        )}
        {page === "Professional Profile" && selectedPro && (
          <section className="page-wrap profile-page">
            <button className="back-link" onClick={() => go("Search")}>
              ← Back to search
            </button>
            <div className="profile-cover">
              <div className="profile-avatar-large">{selectedPro.avatar}</div>
              <div className="profile-main-info">
                <div className="profile-name-line">
                  <h1>{selectedPro.name}</h1>
                  {selectedPro.verified && (
                    <span className="verified-badge">
                      <BadgeCheck size={14} /> Verified
                    </span>
                  )}
                </div>
                <p>
                  {selectedPro.job} <span>·</span> <MapPin size={14} />
                  {selectedPro.location}
                </p>
                <div className="profile-stats-line">
                  <span>
                    <Star size={15} fill="currentColor" /> {selectedPro.rating}{" "}
                    ({selectedPro.reviews} reviews)
                  </span>
                  <span>
                    <BriefcaseBusiness size={15} />
                    {selectedPro.completed} jobs completed
                  </span>
                  <span>
                    <Clock3 size={15} />
                    {selectedPro.experience} years experience
                  </span>
                </div>
              </div>
              <div className="profile-actions">
                <button
                  className="btn-outline"
                  onClick={() => startChat(selectedPro)}
                >
                  <MessageCircle size={16} /> Message
                </button>
                <button
                  className="btn-primary"
                  onClick={() => setModal("request")}
                >
                  Request Service
                </button>
                <button
                  className={
                    "icon-btn " +
                    (saved.includes(selectedPro.id) ? "saved" : "")
                  }
                  onClick={() =>
                    setSaved((old) =>
                      old.includes(selectedPro.id)
                        ? old.filter((x) => x !== selectedPro.id)
                        : [...old, selectedPro.id],
                    )
                  }
                >
                  <Heart
                    fill={
                      saved.includes(selectedPro.id) ? "currentColor" : "none"
                    }
                  />
                </button>
              </div>
            </div>
            <div className="profile-layout">
              <div className="profile-content panel">
                <div className="tab-row">
                  {["About", "Services & skills", "Portfolio", "Reviews"].map(
                    (t) => (
                      <button
                        className={profileTab === t ? "active" : ""}
                        key={t}
                        onClick={() => setProfileTab(t)}
                      >
                        {t}
                      </button>
                    ),
                  )}
                </div>
                {profileTab === "About" && (
                  <>
                    <h3>About {selectedPro.name}</h3>
                    <p className="body-copy">{selectedPro.about}</p>
                    <h3>Professional skills</h3>
                    <div className="skill-tags">
                      {selectedPro.skills.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                    <h3>Why work with me?</h3>
                    <div className="profile-benefits">
                      <span>
                        <Check /> Clear communication
                      </span>
                      <span>
                        <Check /> Reliable scheduling
                      </span>
                      <span>
                        <Check /> Respectful service
                      </span>
                    </div>
                  </>
                )}
                {profileTab === "Services & skills" && (
                  <>
                    <h3>Services & starting prices</h3>
                    <div className="service-line">
                      <div>
                        <strong>{selectedPro.job}</strong>
                        <small>Assessment and service quote</small>
                      </div>
                      <strong>From {money(selectedPro.price)}</strong>
                      <button
                        className="btn-primary small"
                        onClick={() => setModal("request")}
                      >
                        Request
                      </button>
                    </div>
                    {selectedPro.skills.map((s) => (
                      <div className="service-line" key={s}>
                        <div>
                          <strong>{s}</strong>
                          <small>Price confirmed after job details</small>
                        </div>
                        <span className="muted">Quote required</span>
                      </div>
                    ))}
                  </>
                )}
                {profileTab === "Portfolio" && (
                  <>
                    <h3>Recent work</h3>
                    <div className="portfolio-grid">
                      <div>
                        🔧<strong>Home service project</strong>
                        <small>Completed successfully</small>
                      </div>
                      <div>
                        ⚡<strong>Installation project</strong>
                        <small>Quality workmanship</small>
                      </div>
                      <div>
                        🛠️<strong>Repair and maintenance</strong>
                        <small>Customer approved</small>
                      </div>
                    </div>
                    <p className="muted">
                      Demo portfolio cards. Real portfolio uploads are enabled
                      after backend storage is configured.
                    </p>
                  </>
                )}
                {profileTab === "Reviews" && (
                  <>
                    <h3>Customer reviews</h3>
                    <div className="review-card">
                      <span>👩🏽</span>
                      <div>
                        <strong>
                          Chioma N. <small>· Recent customer</small>
                        </strong>
                        <div className="stars">★★★★★</div>
                        <p>
                          Professional, punctual and explained the work clearly.
                          Would recommend.
                        </p>
                      </div>
                    </div>
                    <div className="review-card">
                      <span>👨🏿</span>
                      <div>
                        <strong>
                          John M. <small>· Recent customer</small>
                        </strong>
                        <div className="stars">★★★★★</div>
                        <p>
                          Good communication and the job was completed as
                          agreed.
                        </p>
                      </div>
                    </div>
                    <p className="muted">
                      Sample reviews for layout demonstration, not verified
                      customer testimonials.
                    </p>
                  </>
                )}
              </div>
              <aside className="profile-side panel">
                <span className="section-kicker">STARTING PRICE</span>
                <h2>
                  {money(selectedPro.price)}
                  <small> / service</small>
                </h2>
                <p>
                  <span className="live-dot" />{" "}
                  {selectedPro.available
                    ? "Available for requests"
                    : "Availability needs confirmation"}
                </p>
                <div className="side-separator" />
                <div className="side-stat">
                  <span>Response rate</span>
                  <strong>{selectedPro.response}%</strong>
                </div>
                <div className="side-stat">
                  <span>Completed jobs</span>
                  <strong>{selectedPro.completed}</strong>
                </div>
                <div className="side-stat">
                  <span>Location</span>
                  <strong>{selectedPro.location}</strong>
                </div>
                <button
                  className="btn-primary full"
                  onClick={() => setModal("request")}
                >
                  Request this service <ArrowRight size={16} />
                </button>
                <small className="muted">
                  Confirm final pricing and scope directly in chat before work
                  begins.
                </small>
              </aside>
            </div>
          </section>
        )}
        {page === "Jobs" && (
          <section className="page-wrap">
            <PageHeader
              kicker="KEEP WORK MOVING"
              title="Jobs & bookings"
              subtitle="Post a job, review requests and keep track of work in progress."
              action={
                <button className="btn-primary" onClick={() => setModal("job")}>
                  <Plus size={17} /> Post a Job
                </button>
              }
            />
            <div className="stat-grid four">
              <Stat
                icon={<ClipboardList />}
                label="All jobs"
                value={jobs.length}
                tone="blue"
              />
              <Stat
                icon={<Activity />}
                label="Active jobs"
                value={
                  jobs.filter((j) =>
                    ["In Progress", "Quote sent", "Accepted"].includes(
                      j.status,
                    ),
                  ).length
                }
                tone="green"
              />
              <Stat
                icon={<Clock3 />}
                label="Awaiting quotes"
                value={jobs.filter((j) => j.status === "Open").length}
                tone="orange"
              />
              <Stat
                icon={<CircleCheck />}
                label="Completed"
                value={jobs.filter((j) => j.status === "Completed").length}
                tone="purple"
              />
            </div>
            <div className="filters-row job-tabs">
              {["All", "Open", "In Progress", "Quote sent", "Completed"].map(
                (f) => (
                  <button
                    key={f}
                    className={
                      "filter-pill " + (jobFilter === f ? "active" : "")
                    }
                    onClick={() => setJobFilter(f)}
                  >
                    {f}
                  </button>
                ),
              )}
            </div>
            <div className="jobs-list">
              {jobs
                .filter((j) => jobFilter === "All" || j.status === jobFilter)
                .map((j) => (
                  <div className="job-card panel" key={j.id}>
                    <div className="job-icon">
                      <Wrench />
                    </div>
                    <div className="job-main">
                      <div className="job-title-line">
                        <h3>{j.title}</h3>
                        <Status value={j.status} />
                      </div>
                      <p>{j.description}</p>
                      <div className="job-meta">
                        <span>
                          <MapPin />
                          {j.location}
                        </span>
                        <span>
                          <CalendarDays />
                          {j.date}
                        </span>
                        <span>
                          <Wallet />
                          {j.budget}
                        </span>
                      </div>
                      <div className="job-footer">
                        <span className="muted">
                          Professional:{" "}
                          {j.professional || "Waiting for a match"}
                        </span>
                        <div>
                          {j.quote && (
                            <button
                              className="btn-outline small"
                              onClick={() =>
                                setToast(
                                  `Quote: ${money(j.quote.labour + j.quote.parts)} · ${j.quote.duration}`,
                                )
                              }
                            >
                              View quote
                            </button>
                          )}
                          <button
                            className="btn-outline small"
                            onClick={() => {
                              setQuoteJob(j);
                              setModal("quote");
                            }}
                          >
                            Send / edit quote
                          </button>
                          {j.status === "In Progress" && (
                            <button
                              className="btn-success small"
                              onClick={() => {
                                setJobs((old) =>
                                  old.map((x) =>
                                    x.id === j.id
                                      ? { ...x, status: "Completed" }
                                      : x,
                                  ),
                                );
                                setToast("Job marked completed in this demo.");
                              }}
                            >
                              Mark complete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {!jobs.length && (
                <Empty
                  icon={<ClipboardList />}
                  title="No jobs yet"
                  body="Post your first job and get matched with local professionals."
                  action={() => setModal("job")}
                  label="Post a job"
                />
              )}
            </div>
          </section>
        )}
        {page === "Messages" && (
          <section className="page-wrap messages-page">
            <PageHeader
              kicker="KEEP THE CONVERSATION GOING"
              title="Messages"
              subtitle="Discuss the work, clarify the details and agree on the next step."
            />
            <div className="messenger panel">
              <aside className="conversation-list">
                <div className="conversation-list-header">
                  <h3>Conversations</h3>
                  <button
                    className="icon-btn"
                    onClick={() =>
                      setToast(
                        "New conversations begin from a professional profile.",
                      )
                    }
                  >
                    <Plus size={17} />
                  </button>
                </div>
                <div className="conversation-search">
                  <Search />
                  <input
                    placeholder="Search messages"
                    value={chatSearch}
                    onChange={(e) => setChatSearch(e.target.value)}
                  />
                </div>
                {messages
                  .filter((m) =>
                    m.person.toLowerCase().includes(chatSearch.toLowerCase()),
                  )
                  .map((m, i) => (
                    <button
                      key={m.id}
                      className={
                        "conversation " +
                        (activeChat === messages.indexOf(m) ? "active" : "")
                      }
                      onClick={() => {
                        setActiveChat(messages.indexOf(m));
                        setMessages((old) =>
                          old.map((x) =>
                            x.id === m.id ? { ...x, unread: 0 } : x,
                          ),
                        );
                      }}
                    >
                      <span className="conversation-avatar">{m.avatar}</span>
                      <span className="conversation-info">
                        <strong>{m.person}</strong>
                        <small>{m.preview}</small>
                      </span>
                      <span className="conversation-right">
                        <small>{m.time}</small>
                        {m.unread > 0 && <i>{m.unread}</i>}
                      </span>
                    </button>
                  ))}
              </aside>
              <section className="chat-window">
                <div className="chat-header">
                  <span className="conversation-avatar">
                    {currentChat?.avatar || "👨🏿‍🔧"}
                  </span>
                  <div>
                    <strong>
                      {currentChat?.person || "Choose a conversation"}
                    </strong>
                    <small>
                      <i className="live-dot" />{" "}
                      {currentChat?.online
                        ? "Online now"
                        : "Replies when available"}
                    </small>
                  </div>
                  <button
                    className="icon-btn"
                    onClick={() =>
                      setToast(
                        "Conversation options: report, mute and block will be connected to the backend moderation service.",
                      )
                    }
                  >
                    <MoreHorizontal />
                  </button>
                </div>
                <div className="chat-context">
                  <span>
                    <ShieldCheck size={15} /> Keep payments and agreements clear
                  </span>
                  <button onClick={() => setModal("job")}>Post a job</button>
                </div>
                <div className="chat-messages">
                  {(currentChat?.messages || []).map((m, i) => (
                    <div
                      key={i}
                      className={
                        "message-row " + (m.from === "me" ? "mine" : "")
                      }
                    >
                      <div className="message-bubble">
                        {m.quote && (
                          <div className="quote-card">
                            <div>
                              <Wrench size={16} />
                              <strong>Electrical Repair</strong>
                            </div>
                            <p>Labour: ₦8,000 · Parts: ₦4,000</p>
                            <strong className="quote-total">
                              Total: ₦12,000
                            </strong>
                            <small>Estimated time: 2–3 hours</small>
                            <div className="quote-actions">
                              <button
                                onClick={() =>
                                  setToast("Quote accepted in demo mode.")
                                }
                              >
                                Accept quote
                              </button>
                              <button
                                onClick={() =>
                                  setToast(
                                    "You can ask the professional a question in chat.",
                                  )
                                }
                              >
                                Ask a question
                              </button>
                            </div>
                          </div>
                        )}
                        {m.text}
                        <div className="message-meta">
                          {m.time} {m.from === "me" && <CheckCheck size={13} />}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="sticker-row">
                    <button
                      title="Send a happy sticker"
                      onClick={() => sendMessage("🎉 Great work!")}
                    >
                      🎉
                    </button>
                    <button
                      title="Send a heart sticker"
                      onClick={() => sendMessage("💚")}
                    >
                      💚
                    </button>
                    <button
                      title="Send a celebration sticker"
                      onClick={() => sendMessage("🙌🏽 Thanks a lot!")}
                    >
                      🙌🏽
                    </button>
                    <button
                      title="Send a thumbs up sticker"
                      onClick={() => sendMessage("👍🏽 Sounds good!")}
                    >
                      👍🏽
                    </button>
                    <button
                      title="Send a sparkle sticker"
                      onClick={() => sendMessage("✨")}
                    >
                      ✨
                    </button>
                    <span>Send a little appreciation</span>
                  </div>
                </div>
                <form
                  className="chat-composer"
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                >
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() =>
                      setToast(
                        "File uploads need Supabase Storage configuration.",
                      )
                    }
                  >
                    <Paperclip size={18} />
                  </button>
                  <input
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                    placeholder="Type a message..."
                  />
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => sendMessage("😊")}
                  >
                    <Smile size={19} />
                  </button>
                  <button className="send-btn" aria-label="Send message">
                    <Send size={18} />
                  </button>
                </form>
              </section>
            </div>
          </section>
        )}
        {page === "Notifications" && (
          <section className="page-wrap">
            <PageHeader
              kicker="STAY IN THE LOOP"
              title="Notifications"
              subtitle="Updates about your jobs, messages and account."
            />
            <div className="notification-list panel">
              {[
                {
                  icon: <MessageCircle />,
                  title: "New message from Segun Electricals",
                  body: "Yes, I can come around 3pm.",
                  time: "10:34 AM",
                  tone: "blue",
                },
                {
                  icon: <ClipboardList />,
                  title: "Job status updated",
                  body: "Your AC Repair job is now in progress.",
                  time: "09:20 AM",
                  tone: "green",
                },
                {
                  icon: <Wallet />,
                  title: "Payment reminder",
                  body: "Confirm the final amount with your professional before paying.",
                  time: "Yesterday",
                  tone: "orange",
                },
                {
                  icon: <Star />,
                  title: "Leave a review",
                  body: "Share your experience after a completed job.",
                  time: "2 days ago",
                  tone: "purple",
                },
              ].map((n, i) => (
                <div className="notification-item" key={i}>
                  <span className={"stat-icon " + n.tone}>{n.icon}</span>
                  <div>
                    <strong>{n.title}</strong>
                    <p>{n.body}</p>
                    <small>{n.time}</small>
                  </div>
                  <button
                    className="icon-btn"
                    onClick={() => setToast("Notification marked as read.")}
                  >
                    <Check size={17} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
        {page === "Profile" && (
          <section className="page-wrap">
            <PageHeader
              kicker="YOUR ACCOUNT"
              title="My profile & settings"
              subtitle="Manage your DskillLink account and preferences."
            />
            <div className="settings-layout">
              <aside className="panel settings-profile">
                <div className="profile-avatar-large">
                  {user?.name?.[0]?.toUpperCase() || "D"}
                </div>
                <h2>{user?.name || "Guest User"}</h2>
                <p>{user?.email || "Sign in to personalise your profile"}</p>
                <span className="verified-badge">
                  {user ? "Customer account" : "Guest mode"}
                </span>
                <button
                  className="btn-primary full"
                  onClick={() =>
                    user
                      ? setToast(
                          "Profile editing will be persisted to your backend after setup.",
                        )
                      : (setAuthMode("signin"), setModal("auth"))
                  }
                >
                  {user ? "Edit profile" : "Sign in / Create account"}
                </button>
              </aside>
              <div className="settings-options">
                {[
                  {
                    icon: <UserRound />,
                    title: "Personal information",
                    body: "Name, email and phone number",
                  },
                  {
                    icon: <ShieldCheck />,
                    title: "Privacy & security",
                    body: "Password, login sessions and account safety",
                  },
                  {
                    icon: <Bell />,
                    title: "Notifications",
                    body: "Choose which updates you receive",
                  },
                  {
                    icon: <Moon />,
                    title: "Appearance",
                    body: "Switch between light and dark themes",
                  },
                  {
                    icon: <Wallet />,
                    title: "Payment methods",
                    body: "Payment options become active after gateway setup",
                  },
                ].map((x, i) => (
                  <button
                    className="setting-row panel"
                    key={x.title}
                    onClick={() =>
                      i === 3
                        ? setTheme(theme === "dark" ? "light" : "dark")
                        : setToast(
                            `${x.title}: configure your account settings after backend setup.`,
                          )
                    }
                  >
                    <span className="setting-icon">{x.icon}</span>
                    <span>
                      <strong>{x.title}</strong>
                      <small>{x.body}</small>
                    </span>
                    <ChevronRight />
                  </button>
                ))}
                {user && (
                  <button
                    className="btn-outline"
                    onClick={() => {
                      setUser(null);
                      setToast("Signed out of this device.");
                    }}
                  >
                    <LogIn size={16} /> Sign out
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
        {page === "Admin Dashboard" && (
          <section className="page-wrap admin-page">
            <PageHeader
              kicker="PLATFORM OPERATIONS"
              title="Admin dashboard"
              subtitle="Review platform activity and manage the marketplace demo."
              action={<span className="demo-label">DEMO DATA</span>}
            />
            <div className="admin-layout">
              <aside className="admin-nav panel">
                <Logo small />
                {[
                  "Overview",
                  "Users",
                  "Professionals",
                  "Verification",
                  "Jobs",
                  "Bookings",
                  "Payments",
                  "Messages",
                  "Reviews",
                  "Categories",
                  "Reports",
                  "Analytics",
                  "Settings",
                ].map((t, i) => (
                  <button
                    key={t}
                    className={adminTab === t ? "active" : ""}
                    onClick={() => setAdminTab(t)}
                  >
                    {
                      [
                        <LayoutDashboard />,
                        <Users />,
                        <Wrench />,
                        <ShieldCheck />,
                        <BriefcaseBusiness />,
                        <CalendarDays />,
                        <Wallet />,
                        <MessageCircle />,
                        <Star />,
                        <ClipboardList />,
                        <CircleHelp />,
                        <TrendingUp />,
                        <Settings />,
                      ][i]
                    }
                    {t}
                  </button>
                ))}
              </aside>
              <div className="admin-main">
                <div className="stat-grid four">
                  <Stat
                    icon={<Users />}
                    label="Total users"
                    value="12,842"
                    delta="12%"
                    tone="blue"
                  />
                  <Stat
                    icon={<Wrench />}
                    label="Professionals"
                    value={pros.length.toLocaleString()}
                    delta="8%"
                    tone="green"
                  />
                  <Stat
                    icon={<BriefcaseBusiness />}
                    label="Active jobs"
                    value={jobs.filter((j) => j.status !== "Completed").length}
                    delta="22%"
                    tone="orange"
                  />
                  <Stat
                    icon={<Wallet />}
                    label="Demo revenue"
                    value="₦4.82m"
                    delta="12%"
                    tone="purple"
                  />
                </div>
                <div className="admin-widgets">
                  <div className="panel admin-chart">
                    <div className="panel-heading">
                      <div>
                        <h3>
                          {adminTab === "Overview" ? "User growth" : adminTab}
                        </h3>
                        <small>Sample analytics · last 12 months</small>
                      </div>
                      <span className="chart-period">
                        Last 30 days <ChevronDown size={13} />
                      </span>
                    </div>
                    <div className="chart-bars">
                      {[26, 39, 33, 51, 44, 62, 55, 74, 66, 85, 72, 94].map(
                        (h, i) => (
                          <div key={i} style={{ height: h + "%" }}>
                            <span>
                              {
                                [
                                  "Jan",
                                  "Feb",
                                  "Mar",
                                  "Apr",
                                  "May",
                                  "Jun",
                                  "Jul",
                                  "Aug",
                                  "Sep",
                                  "Oct",
                                  "Nov",
                                  "Dec",
                                ][i]
                              }
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                    <div className="chart-legend">
                      <span>
                        <i /> User growth
                      </span>
                      <span>↗ 12.4% vs previous period</span>
                    </div>
                  </div>
                  <div className="panel pending-panel">
                    <div className="panel-heading">
                      <h3>Pending verification</h3>
                      <span className="count-badge">
                        {pros.filter((p) => !p.verified).length}
                      </span>
                    </div>
                    {pros
                      .filter((p) => !p.verified)
                      .map((p) => (
                        <div className="pending-row" key={p.id}>
                          <span className="conversation-avatar">
                            {p.avatar}
                          </span>
                          <div>
                            <strong>{p.name}</strong>
                            <small>{p.job}</small>
                          </div>
                          <button
                            className="btn-outline small"
                            onClick={() =>
                              setToast(
                                "Review identity and skill evidence before approving a real professional.",
                              )
                            }
                          >
                            Review
                          </button>
                          <button
                            className="btn-success small"
                            onClick={() => {
                              setPros((old) =>
                                old.map((x) =>
                                  x.id === p.id ? { ...x, verified: true } : x,
                                ),
                              );
                              setToast(
                                "Demo profile marked verified. In production, verify evidence first.",
                              );
                            }}
                          >
                            Approve
                          </button>
                        </div>
                      ))}
                    {!pros.some((p) => !p.verified) && (
                      <p className="muted">
                        No demo profiles waiting for review.
                      </p>
                    )}
                  </div>
                </div>
                <div className="panel admin-table">
                  <div className="panel-heading">
                    <h3>Recent jobs</h3>
                    <button className="text-link" onClick={() => go("Jobs")}>
                      View all <ArrowRight size={15} />
                    </button>
                  </div>
                  {jobs.slice(0, 5).map((j) => (
                    <div className="admin-job-row" key={j.id}>
                      <span className="job-icon">
                        <Wrench />
                      </span>
                      <div>
                        <strong>{j.title}</strong>
                        <small>
                          {j.location} · {j.date}
                        </small>
                      </div>
                      <strong>{j.budget}</strong>
                      <Status value={j.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <footer className="footer">
        <div className="footer-main">
          <div>
            <Logo />
            <p>Helping local skills meet real opportunities.</p>
            <div className="social-row">
              <button
                onClick={() =>
                  setToast(
                    "Social links can be added when official accounts are created.",
                  )
                }
              >
                in
              </button>
              <button
                onClick={() =>
                  setToast(
                    "Social links can be added when official accounts are created.",
                  )
                }
              >
                𝕏
              </button>
              <button
                onClick={() =>
                  setToast(
                    "Social links can be added when official accounts are created.",
                  )
                }
              >
                ◎
              </button>
            </div>
          </div>
          <div>
            <strong>Explore</strong>
            <button onClick={() => go("Search")}>Find Services</button>
            <button onClick={() => go("Jobs")}>Post a Job</button>
            <button
              onClick={() => {
                setAuthMode("signup");
                setModal("professional");
              }}
            >
              Become a Professional
            </button>
          </div>
          <div>
            <strong>Support</strong>
            <button onClick={() => setAiOpen(true)}>Help Center</button>
            <button
              onClick={() =>
                setToast(
                  "Safety: confirm scope and pricing in chat; never share passwords or OTPs.",
                )
              }
            >
              Safety tips
            </button>
            <button
              onClick={() =>
                setToast(
                  "Contact: support@dskilllink.example (demo placeholder).",
                )
              }
            >
              Contact us
            </button>
          </div>
          <div>
            <strong>Account</strong>
            <button onClick={() => go("Messages")}>Messages</button>
            <button onClick={() => go("Profile")}>Settings</button>
            <button onClick={() => go("Admin Dashboard")}>
              Admin dashboard
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DskillLink. Built for a better local economy.</span>
          <span>
            <ShieldCheck size={14} /> Trust • Skills • Opportunity
          </span>
        </div>
      </footer>
      <button
        className={"ai-fab " + (aiOpen ? "open" : "")}
        onClick={() => setAiOpen(!aiOpen)}
        aria-label="Open DskillLink AI"
      >
        {aiOpen ? (
          <X />
        ) : (
          <>
            <Bot />
            <span className="fab-sparkle">✦</span>
          </>
        )}
      </button>
      {aiOpen && (
        <section className="ai-window">
          <div className="ai-window-header">
            <span className="ai-avatar">
              <Bot />
            </span>
            <div>
              <strong>DskillLink AI</strong>
              <small>
                <i className="live-dot" /> Online · Service assistant
              </small>
            </div>
            <button className="icon-btn" onClick={() => setAiOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <div className="ai-welcome">
            <span className="ai-welcome-icon">✨</span>
            <strong>How can I help today?</strong>
            <p>
              Tell me what's wrong or what you need done. I'll help you find the
              right service.
            </p>
          </div>
          <div className="ai-quick-actions">
            <button onClick={() => sendAI("Help me find a professional")}>
              🔧 Find a professional
            </button>
            <button
              onClick={() => sendAI("Find services near me in " + location)}
            >
              📍 Find services near me
            </button>
            <button onClick={() => sendAI("Help me post a job")}>
              📝 Post a job
            </button>
            <button onClick={() => sendAI("How does DskillLink work?")}>
              💬 Get help
            </button>
          </div>
          <div className="ai-chat-feed">
            {aiMessages.map((m, i) => (
              <div className={"ai-msg " + m.from} key={i}>
                <span>{m.from === "ai" ? "🤖" : "🙂"}</span>
                <div>
                  {m.text}
                  {m.action && (
                    <button
                      className="ai-result-button"
                      onClick={() => {
                        setQuery(m.action);
                        setAiOpen(false);
                        go("Search");
                      }}
                    >
                      View matching professionals <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {aiTyping && (
              <div className="ai-msg ai">
                <span>🤖</span>
                <div className="typing-dots">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
          </div>
          <form
            className="ai-composer"
            onSubmit={(e) => {
              e.preventDefault();
              sendAI();
            }}
          >
            <input
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Describe what you need..."
            />
            <button aria-label="Send to AI">
              <Send size={17} />
            </button>
          </form>
          <small className="ai-disclaimer">
            AI suggestions are a starting point. Confirm service details with
            the professional.
          </small>
        </section>
      )}
      {modal && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => e.target === e.currentTarget && setModal("")}
        >
          <div className="modal panel">
            <div className="modal-head">
              <div>
                <span className="section-kicker">DSKILLLINK</span>
                <h2>
                  {modal === "auth"
                    ? authMode === "signin"
                      ? "Welcome back"
                      : "Create your account"
                    : modal === "professional"
                      ? "Become a professional"
                      : modal === "job"
                        ? "Post a job"
                        : modal === "quote"
                          ? "Send a quote"
                          : "Request a service"}
                </h2>
              </div>
              <button className="icon-btn" onClick={() => setModal("")}>
                <X />
              </button>
            </div>
            {modal === "auth" && (
              <>
                <div className="auth-switch">
                  <button
                    className={authMode === "signin" ? "active" : ""}
                    onClick={() => setAuthMode("signin")}
                  >
                    Sign in
                  </button>
                  <button
                    className={authMode === "signup" ? "active" : ""}
                    onClick={() => setAuthMode("signup")}
                  >
                    Create account
                  </button>
                </div>
                <div className="auth-methods">
                  <button
                    className={authMethod === "email" ? "active" : ""}
                    onClick={() => setAuthMethod("email")}
                  >
                    <Mail size={16} /> Email
                  </button>
                  <button
                    className={authMethod === "phone" ? "active" : ""}
                    onClick={() => setAuthMethod("phone")}
                  >
                    <Phone size={16} /> Phone
                  </button>
                </div>
                <form className="modal-form" onSubmit={authSubmit}>
                  {authMode === "signup" && (
                    <label>
                      Full name
                      <input
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Your full name"
                      />
                    </label>
                  )}
                  {authMethod === "email" ? (
                    <label>
                      Email address
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="you@example.com"
                      />
                    </label>
                  ) : (
                    <label>
                      Phone number
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        placeholder="+234 801 234 5678"
                      />
                    </label>
                  )}
                  {authMethod === "email" && (
                    <label>
                      Password
                      <input
                        required
                        minLength="6"
                        type="password"
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        placeholder="At least 6 characters"
                      />
                    </label>
                  )}
                  <button className="btn-primary full">
                    {authMode === "signin" ? "Sign in" : "Create account"}{" "}
                    <ArrowRight size={16} />
                  </button>
                </form>
                <div className="or-divider">
                  <span />
                  or continue with
                  <span />
                </div>
                <div className="oauth-row">
                  <button onClick={() => oauth("google")}>
                    <b>G</b> Google
                  </button>
                  <button onClick={() => oauth("azure")}>
                    <Building2 size={17} /> Microsoft
                  </button>
                </div>
                <p className="modal-footnote">
                  {supabase
                    ? "Secure authentication is configured for this environment."
                    : "Demo mode: accounts are stored on this device only. Add Supabase credentials for real authentication."}
                </p>
              </>
            )}
            {(modal === "job" || modal === "professional") && (
              <form
                className="modal-form"
                onSubmit={
                  modal === "job"
                    ? createJob
                    : (e) => {
                        e.preventDefault();
                        setModal("auth");
                        setAuthMode("signup");
                        setToast(
                          "Create your account to continue professional onboarding.",
                        );
                      }
                }
              >
                {modal === "professional" && (
                  <div className="onboarding-note">
                    <span>1 of 12</span>
                    <div>
                      <i />
                    </div>
                    <p>
                      Start with your account, then add skills, services,
                      service area, pricing and portfolio.
                    </p>
                  </div>
                )}
                <label>
                  Service needed
                  <input
                    required
                    value={jobDraft.title}
                    onChange={(e) =>
                      setJobDraft({ ...jobDraft, title: e.target.value })
                    }
                    placeholder="e.g. AC repair"
                  />
                </label>
                <label>
                  Describe the job
                  <textarea
                    required
                    rows="3"
                    value={jobDraft.description}
                    onChange={(e) =>
                      setJobDraft({ ...jobDraft, description: e.target.value })
                    }
                    placeholder="Tell professionals what you need..."
                  />
                </label>
                <div className="form-row">
                  <label>
                    Location
                    <input
                      required
                      value={jobDraft.location}
                      onChange={(e) =>
                        setJobDraft({ ...jobDraft, location: e.target.value })
                      }
                      placeholder="e.g. Rumuola, Port Harcourt"
                    />
                  </label>
                  <label>
                    Budget (₦)
                    <input
                      type="number"
                      min="0"
                      value={jobDraft.budget}
                      onChange={(e) =>
                        setJobDraft({ ...jobDraft, budget: e.target.value })
                      }
                      placeholder="Optional"
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Preferred date
                    <input
                      type="date"
                      value={jobDraft.date}
                      onChange={(e) =>
                        setJobDraft({ ...jobDraft, date: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Urgency
                    <select
                      value={jobDraft.urgency}
                      onChange={(e) =>
                        setJobDraft({ ...jobDraft, urgency: e.target.value })
                      }
                    >
                      <option>Normal</option>
                      <option>Today</option>
                      <option>Urgent</option>
                      <option>Emergency</option>
                    </select>
                  </label>
                </div>
                <button className="btn-primary full">
                  {modal === "job" ? "Post job" : "Continue onboarding"}{" "}
                  <ArrowRight size={16} />
                </button>
                <small className="muted">
                  Demo jobs are saved locally. Live notifications need the
                  configured backend.
                </small>
              </form>
            )}
            {modal === "quote" && (
              <form className="modal-form" onSubmit={sendQuote}>
                <div className="quote-job-summary">
                  <strong>{quoteJob?.title || "New service quote"}</strong>
                  <small>
                    {quoteJob?.location || "Customer location"} ·{" "}
                    {quoteJob?.budget || "Budget open"}
                  </small>
                </div>
                <div className="form-row">
                  <label>
                    Labour (₦)
                    <input
                      type="number"
                      min="0"
                      required
                      value={quoteDraft.labour}
                      onChange={(e) =>
                        setQuoteDraft({ ...quoteDraft, labour: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Parts (₦)
                    <input
                      type="number"
                      min="0"
                      required
                      value={quoteDraft.parts}
                      onChange={(e) =>
                        setQuoteDraft({ ...quoteDraft, parts: e.target.value })
                      }
                    />
                  </label>
                </div>
                <div className="quote-total-row">
                  <span>Total quote</span>
                  <strong>
                    {money(
                      Number(quoteDraft.labour || 0) +
                        Number(quoteDraft.parts || 0),
                    )}
                  </strong>
                </div>
                <label>
                  Estimated duration
                  <select
                    value={quoteDraft.duration}
                    onChange={(e) =>
                      setQuoteDraft({ ...quoteDraft, duration: e.target.value })
                    }
                  >
                    <option>1 hour</option>
                    <option>2–3 hours</option>
                    <option>Half day</option>
                    <option>1 day</option>
                    <option>2–3 days</option>
                  </select>
                </label>
                <label>
                  Additional notes
                  <textarea
                    rows="2"
                    value={quoteDraft.notes}
                    onChange={(e) =>
                      setQuoteDraft({ ...quoteDraft, notes: e.target.value })
                    }
                    placeholder="What is included in the quote?"
                  />
                </label>
                <button className="btn-primary full">
                  Save quote <ArrowRight size={16} />
                </button>
                <small className="muted">
                  This records a demo quote; it does not charge a customer.
                </small>
              </form>
            )}
            {modal === "request" && (
              <form
                className="modal-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const j = {
                    id: Date.now(),
                    title: selectedPro?.job || "Service request",
                    description:
                      jobDraft.description ||
                      "Customer requested a service. Please discuss details in chat.",
                    location: location,
                    budget: selectedPro
                      ? `From ${money(selectedPro.price)}`
                      : "To be agreed",
                    urgency: "Normal",
                    status: "Open",
                    date: "Flexible",
                    professional: selectedPro?.name || "Waiting for match",
                  };
                  setJobs((old) => [j, ...old]);
                  setModal("");
                  setToast(
                    "Service request created. Open Messages to discuss the details.",
                  );
                  if (selectedPro) startChat(selectedPro);
                  else go("Jobs");
                }}
              >
                <div className="request-prof">
                  <span className="profile-avatar-small">
                    {selectedPro?.avatar || "🧰"}
                  </span>
                  <div>
                    <strong>{selectedPro?.name || "Local professional"}</strong>
                    <small>
                      {selectedPro?.job || "Your requested service"} ·{" "}
                      {selectedPro
                        ? `from ${money(selectedPro.price)}`
                        : "Quote requested"}
                    </small>
                  </div>
                </div>
                <label>
                  What do you need done?
                  <textarea
                    rows="3"
                    value={jobDraft.description}
                    onChange={(e) =>
                      setJobDraft({ ...jobDraft, description: e.target.value })
                    }
                    placeholder="Describe the problem or work needed..."
                  />
                </label>
                <label>
                  Service location
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Preferred date
                  <input
                    type="date"
                    value={jobDraft.date}
                    onChange={(e) =>
                      setJobDraft({ ...jobDraft, date: e.target.value })
                    }
                  />
                </label>
                <button className="btn-primary full">
                  Send service request <ArrowRight size={16} />
                </button>
                <small className="muted">
                  Agree on scope, availability and final price before work
                  starts.
                </small>
              </form>
            )}
          </div>
        </div>
      )}
      {toast && (
        <div className="toast">
          <span>
            <Check size={16} />
          </span>
          {toast}
          <button onClick={() => setToast("")}>
            <X size={15} />
          </button>
        </div>
      )}
      <nav className="bottom-nav">
        {[
          { name: "Home", icon: <Home /> },
          { name: "Search", icon: <Search /> },
          { name: "Jobs", icon: <BriefcaseBusiness /> },
          { name: "Messages", icon: <MessageCircle /> },
          { name: "Profile", icon: <UserRound /> },
        ].map((n) => (
          <button
            key={n.name}
            className={page === n.name ? "active" : ""}
            onClick={() => go(n.name)}
          >
            {n.icon}
            <span>{n.name}</span>
            {n.name === "Messages" && messages.some((m) => m.unread > 0) && (
              <i />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
function ProCard({ p, saved, onSave, onView, onMessage, onRequest }) {
  return (
    <article className="pro-card panel">
      <div className="pro-card-top">
        <div className={"pro-avatar " + p.color}>{p.avatar}</div>
        <button
          className={"save-btn " + (saved ? "saved" : "")}
          onClick={onSave}
          aria-label={saved ? "Remove saved professional" : "Save professional"}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="pro-title">
        <div>
          <h3>{p.name}</h3>
          <p>{p.job}</p>
        </div>
        {p.verified && (
          <span className="verified-badge">
            <BadgeCheck size={13} /> Verified
          </span>
        )}
      </div>
      <div className="pro-meta">
        <span>
          <Star size={14} fill="currentColor" />
          {p.rating} <small>({p.reviews} reviews)</small>
        </span>
        <span>
          <MapPin size={14} />
          {p.distance} away
        </span>
      </div>
      <p className="pro-description">{p.about}</p>
      <div className="pro-skills">
        {p.skills.slice(0, 3).map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <div className="pro-card-bottom">
        <div>
          <strong>From {money(p.price)}</strong>
          <small className={p.available ? "availability" : "unavailable"}>
            <i /> {p.available ? "Available today" : "Check availability"}
          </small>
        </div>
        <button className="btn-primary small" onClick={onRequest}>
          Request
        </button>
      </div>
      <div className="pro-card-actions">
        <button className="btn-outline small" onClick={onView}>
          View profile
        </button>
        <button className="btn-outline small" onClick={onMessage}>
          <MessageCircle size={14} /> Message
        </button>
      </div>
    </article>
  );
}
function PageHeader({ kicker, title, subtitle, action }) {
  return (
    <div className="page-heading">
      <div>
        <span className="section-kicker">{kicker}</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action}
    </div>
  );
}
function Stat({ icon, label, value, delta, tone }) {
  return (
    <div className="stat-card panel">
      <span className={"stat-icon " + tone}>{icon}</span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        {delta && (
          <em>
            <ArrowUpRight size={12} />
            {delta}
          </em>
        )}
      </div>
      <MoreHorizontal className="stat-more" size={17} />
    </div>
  );
}
function Status({ value }) {
  let c =
    value === "Completed"
      ? "complete"
      : value === "In Progress"
        ? "progress"
        : value === "Quote sent"
          ? "quote"
          : value === "Open"
            ? "open"
            : "neutral";
  return (
    <span className={"status " + c}>
      <i />
      {value}
    </span>
  );
}
function Empty({ icon, title, body, action, label }) {
  return (
    <div className="empty-state">
      {icon}
      <h3>{title}</h3>
      <p>{body}</p>
      <button className="btn-outline" onClick={action}>
        {label}
      </button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
