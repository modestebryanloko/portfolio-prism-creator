import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, CheckCircle, XCircle, Clock, Mail, Building2, ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type DocumentRequest = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  organization_name: string;
  organization_type: string;
  position: string | null;
  sector: string | null;
  reason: string;
  status: string;
  created_at: string;
};

const AdminDashboard = () => {
  const [requests, setRequests] = useState<DocumentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchRequests();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }
  };

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("document_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      toast.error("Erreur lors du chargement des demandes");
    } else {
      setRequests((data as DocumentRequest[]) || []);
    }
    setLoading(false);
  };

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setActionLoading(id);
    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/document-chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({ action, requestId: id }),
      });

      if (!resp.ok) throw new Error("Failed");
      toast.success(action === "approve" ? "Demande approuvée !" : "Demande rejetée.");
      fetchRequests();
    } catch {
      toast.error("Erreur lors du traitement");
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-yellow-500 border-yellow-500/30"><Clock className="w-3 h-3 mr-1" /> En attente</Badge>;
      case "approved":
        return <Badge variant="outline" className="text-green-500 border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" /> Approuvée</Badge>;
      case "rejected":
        return <Badge variant="outline" className="text-red-500 border-red-500/30"><XCircle className="w-3 h-3 mr-1" /> Rejetée</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-semibold">Dashboard Admin</h1>
              <p className="text-xs text-muted-foreground">Gestion des demandes d'accès</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "En attente", count: requests.filter((r) => r.status === "pending").length, color: "text-yellow-500" },
            { label: "Approuvées", count: requests.filter((r) => r.status === "approved").length, color: "text-green-500" },
            { label: "Rejetées", count: requests.filter((r) => r.status === "rejected").length, color: "text-red-500" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Requests List */}
        {loading ? (
          <p className="text-center text-muted-foreground">Chargement...</p>
        ) : requests.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground/50" />
            <p className="text-muted-foreground">Aucune demande pour le moment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="glass-card rounded-xl p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{req.full_name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      {req.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="w-3 h-3" />
                      {req.organization_name} ({req.organization_type})
                    </div>
                  </div>
                  {statusBadge(req.status)}
                </div>

                {req.position && (
                  <p className="text-sm"><span className="text-muted-foreground">Poste :</span> {req.position}</p>
                )}
                {req.sector && (
                  <p className="text-sm"><span className="text-muted-foreground">Secteur :</span> {req.sector}</p>
                )}
                <p className="text-sm"><span className="text-muted-foreground">Motif :</span> {req.reason}</p>
                <p className="text-xs text-muted-foreground">
                  Reçue le {new Date(req.created_at).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {req.status === "pending" && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => handleAction(req.id, "approve")}
                      disabled={actionLoading === req.id}
                      className="rounded-full bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approuver
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(req.id, "reject")}
                      disabled={actionLoading === req.id}
                      className="rounded-full text-red-500 border-red-500/30 hover:bg-red-500/10"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Rejeter
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
