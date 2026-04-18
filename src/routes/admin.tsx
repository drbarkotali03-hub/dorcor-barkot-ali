
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useSiteData } from "@/hooks/use-site-data";
import { type SiteData } from "@/lib/data";
import {
  User, GraduationCap, Briefcase, Heart, MapPin, Phone, Settings,
  Save, RotateCcw, LogOut, Sun, Moon, ChevronLeft, Menu, X, Check,
  Award, Image as ImageIcon, Users, AlertCircle, Trash2
} from "lucide-react";
import {
  DoctorEditor, ListEditor, ChambersEditor, ContactEditor, SettingsEditor,
  GalleryEditor, PasswordField
} from "@/components/admin/AdminEditors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel - Dr. Barkot Ali" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function PatientsEditor() {
  const [patients, setPatients] = useState<any[]>([]);
  const [newPatientName, setNewPatientName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, 'patients'));
      const patientsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPatients(patientsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAddPatient = async () => {
    if (newPatientName.trim() === "") return;
    try {
      await addDoc(collection(db, 'patients'), { name: newPatientName.trim() });
      setNewPatientName("");
      fetchPatients(); // Refresh the list
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeletePatient = async (id: string) => {
    if (!confirm("Are you sure you want to delete this patient?")) return;
    try {
      await deleteDoc(doc(db, 'patients', id));
      fetchPatients(); // Refresh the list
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Manage Patients</h3>
      {error && <Alert variant="destructive" className="mb-4"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          value={newPatientName}
          onChange={(e) => setNewPatientName(e.target.value)}
          placeholder="Enter patient name"
          disabled={loading}
        />
        <Button onClick={handleAddPatient} disabled={loading}>Add Patient</Button>
      </div>
      {loading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => <div key={i} className="h-12 bg-muted/50 rounded-md animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-2">
          {patients.map((patient) => (
            <div key={patient.id} className="flex items-center justify-between p-2 border rounded-md bg-card-foreground/5">
              <span className="font-medium">{patient.name}</span>
              <Button variant="ghost" size="icon" onClick={() => handleDeletePatient(patient.id)} className="text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function AdminPage() {
  const { data, loading, error: siteDataError, refetch } = useSiteData();
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") === "true") {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPw = data?.settings?.adminPassword || "Barkot Ali";
    if (username === "admin" && password === adminPw) {
      setAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading site configuration...</div>;
  }

  if (siteDataError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Fatal Error</AlertTitle>
          <AlertDescription>
            <p>Failed to load site data. This is often caused by missing or incorrect Firebase credentials on the server.</p>
            <pre className="mt-2 whitespace-pre-wrap text-xs font-mono">{siteDataError.message}</pre>
            <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center hero-gradient px-4">
        <div className="glass-card w-full max-w-sm p-8">
          <div className="text-center mb-8">
            <img
              src="https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png"
              alt="Dr Barkot Ali Child Specialist Khulna"
              className="mx-auto h-16 w-16 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-bold text-foreground">Admin Login</h2>
            <p className="text-sm text-muted-foreground mt-1">Enter your credentials</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Username</label>
              <input className="admin-input mt-1" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            </div>
            <PasswordField label="Password" value={password} onChange={setPassword} placeholder="Password" />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button type="submit" className="btn-primary w-full justify-center">Sign In</button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-primary hover:underline">
              <ChevronLeft className="inline h-3 w-3" /> Back to website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => { setAuthenticated(false); sessionStorage.removeItem("admin_auth"); }} />;
}

type SectionKey = "doctor" | "qualifications" | "memberships" | "experience" | "services" | "gallery" | "chambers" | "contact" | "settings" | "patients";

const SECTIONS: { key: SectionKey; label: string; icon: React.ReactNode }[] = [
  { key: "doctor", label: "Doctor Info", icon: <User className="h-4 w-4" /> },
  { key: "qualifications", label: "Qualifications", icon: <GraduationCap className="h-4 w-4" /> },
  { key: "memberships", label: "Membership", icon: <Award className="h-4 w-4" /> },
  { key: "experience", label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
  { key: "services", label: "Services", icon: <Heart className="h-4 w-4" /> },
  { key: "gallery", label: "Gallery", icon: <ImageIcon className="h-4 w-4" /> },
  { key: "chambers", label: "Chambers", icon: <MapPin className="h-4 w-4" /> },
  { key: "contact", label: "Contact", icon: <Phone className="h-4 w-4" /> },
  { key: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  { key: "patients", label: "Patients", icon: <Users className="h-4 w-4" /> },
];

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { data: initialData, loading, error, refetch, saveData, resetData } = useSiteData();
  const [localData, setLocalData] = useState<SiteData>(initialData);
  const [active, setActive] = useState<SectionKey>("doctor");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setLocalData(initialData);
  }, [initialData]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await saveData(localData);
      if (!result.success) throw new Error(result.message);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      refetch(); // Refresh data from server
    } catch (err: any) {
      alert(`Error saving data: ${err.message}`);
    }
    setSaving(false);
  };

  const handleReset = async () => {
    if (confirm("Are you sure? This will reset all website content to the default values and cannot be undone.")) {
      try {
        const result = await resetData();
        if (!result.success) throw new Error(result.message);
        alert("Data reset successfully!");
        refetch(); // Refresh data from server
      } catch (err: any) {
        alert(`Error resetting data: ${err.message}`);
      }
    }
  };

  const updateField = <K extends keyof SiteData>(key: K, value: SiteData[K]) => {
    setLocalData(prev => ({ ...prev, [key]: value }));
  };

  if (loading && !localData) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div>Error loading dashboard: {error.message}</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar border-r border-sidebar-border transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-sidebar-border p-4">
            <img src={localData?.settings?.logo} alt="Dr Barkot Ali" className="h-9 w-9 rounded-full object-cover" />
            <div>
              <div className="text-sm font-bold text-sidebar-foreground">Admin Panel</div>
              <div className="text-xs text-muted-foreground">Dr. Barkot Ali</div>
            </div>
            <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}><X className="h-5 w-5 text-sidebar-foreground" /></button>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => { setActive(s.key); setSidebarOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active === s.key ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-sidebar-border p-3 space-y-2">
            <button onClick={() => setDark(!dark)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
            <Link to="/" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50">
              <ChevronLeft className="h-4 w-4" /> Back to Website
            </Link>
            <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu className="h-5 w-5" /></button>
            <h1 className="text-lg font-bold text-foreground">{SECTIONS.find((s) => s.key === active)?.label}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleReset} variant="destructive" className="text-sm py-2 px-3"><RotateCcw className="h-4 w-4 mr-1.5" /> Reset All</Button>
            <Button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2 px-3 min-w-[100px]">
              {saving ? "Saving..." : (saved ? <><Check className="h-4 w-4 mr-1.5" /> Saved!</> : <><Save className="h-4 w-4 mr-1.5" /> Save</>)}
            </Button>
          </div>
        </header>

        <div className="p-4 sm:p-6 max-w-4xl">
          {active === "doctor" && <DoctorEditor data={localData.doctor} onChange={(d) => updateField("doctor", d)} />}
          {active === "qualifications" && <ListEditor items={localData.qualifications} onChange={(v) => updateField("qualifications", v)} label="Qualification" />}
          {active === "memberships" && <ListEditor items={localData.memberships} onChange={(v) => updateField("memberships", v)} label="Membership" />}
          {active === "experience" && <ListEditor items={localData.experience} onChange={(v) => updateField("experience", v)} label="Experience" />}
          {active === "services" && <ListEditor items={localData.services} onChange={(v) => updateField("services", v)} label="Service" />}
          {active === "gallery" && <GalleryEditor items={localData.gallery} onChange={(v) => updateField("gallery", v)} />}
          {active === "chambers" && <ChambersEditor chambers={localData.chambers} onChange={(v) => updateField("chambers", v)} />}
          {active === "contact" && <ContactEditor contact={localData.contact} onChange={(v) => updateField("contact", v)} />}
          {active === "settings" && <SettingsEditor settings={localData.settings} onChange={(v) => updateField("settings", v)} />}
          {active === "patients" && <PatientsEditor />}
        </div>
      </div>
    </div>
  );
}
