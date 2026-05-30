import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Mail, Users, Phone, Briefcase, Calendar } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  created_at: string;
}

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

const Admin = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [activeTab, setActiveTab] = useState<"contacts" | "subscribers">("contacts");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setContacts(data.contacts);
        setSubscribers(data.subscribers);
        setAuthenticated(true);
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-8 h-8 text-secondary rotate-180" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Masira Consulting Ltd</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Admin Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {error && (
              <p className="text-destructive text-sm text-center">{error}</p>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary border-0 text-primary-foreground hover:opacity-90"
            >
              {loading ? "Verifying..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary py-6 px-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary-foreground">Admin Dashboard</h1>
          <p className="text-primary-foreground/70 text-sm">Masira Consulting Ltd</p>
        </div>
        <Button
          onClick={() => { setAuthenticated(false); setPassword(""); }}
          variant="outline"
          className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </div>

      {/* Stats */}
      <div className="container py-8">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{contacts.length}</p>
                <p className="text-muted-foreground text-sm">Total Inquiries</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{subscribers.length}</p>
                <p className="text-muted-foreground text-sm">Subscribers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "contacts"
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Contact Inquiries ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "subscribers"
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Newsletter Subscribers ({subscribers.length})
          </button>
        </div>

        {/* Contacts Table */}
        {activeTab === "contacts" && (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                No inquiries yet. They will appear here when clients contact you.
              </div>
            ) : (
              contacts.map((contact) => (
                <div key={contact.id} className="bg-card rounded-xl p-6 shadow-card">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="font-semibold text-foreground text-lg">{contact.name}</h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">
                          {contact.service || "General"}
                        </span>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4 shrink-0" />
                          <a href={`mailto:${contact.email}`} className="hover:text-secondary transition-colors truncate">
                            {contact.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4 shrink-0" />
                          <a href={`tel:${contact.phone}`} className="hover:text-secondary transition-colors">
                            {contact.phone || "Not provided"}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 shrink-0" />
                          {formatDate(contact.created_at)}
                        </div>
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Message</span>
                        </div>
                        <p className="text-foreground text-sm leading-relaxed">{contact.message}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 sm:flex-col">
                      <a href={`mailto:${contact.email}`}>
                        <Button size="sm" className="bg-gradient-primary border-0 text-primary-foreground hover:opacity-90 w-full">
                          Reply
                        </Button>
                      </a>
                      <a href={`https://wa.me/${contact.phone?.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${contact.name}, thank you for contacting Masira Consulting!`)}`} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline" className="w-full">
                          WhatsApp
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Subscribers Table */}
        {activeTab === "subscribers" && (
          <div className="bg-card rounded-xl shadow-card overflow-hidden">
            {subscribers.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                No subscribers yet.
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">#</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Subscribed On</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub, index) => (
                    <tr key={sub.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                      <td className="p-4 text-sm text-muted-foreground">{index + 1}</td>
                      <td className="p-4">
                        <a href={`mailto:${sub.email}`} className="text-sm text-foreground hover:text-secondary transition-colors">
                          {sub.email}
                        </a>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{formatDate(sub.subscribed_at)}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                          sub.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {sub.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;