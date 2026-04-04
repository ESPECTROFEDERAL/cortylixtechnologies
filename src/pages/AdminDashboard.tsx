import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, LogOut, FolderOpen, Wrench, Upload, X, GripVertical } from 'lucide-react';
import { validateImageFile, sanitizeInput, sanitizeUrl } from '@/lib/security';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Tables } from '@/integrations/supabase/types';

type Project = Tables<'projects'>;
type Service = Tables<'services'>;

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<'projects' | 'services'>('projects');

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectDialog, setProjectDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({ title: '', description: '', tag: '', link: '', image_url: '' });
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);

  // Services state
  const [services, setServices] = useState<Service[]>([]);
  const [serviceDialog, setServiceDialog] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', features: '', image_url: '' });
  const [serviceImageFile, setServiceImageFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    fetchProjects();
    fetchServices();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('display_order');
    if (data) setProjects(data);
  };

  const fetchServices = async () => {
    const { data } = await supabase.from('services').select('*').order('display_order');
    if (data) setServices(data);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const validationError = validateImageFile(file);
    if (validationError) {
      toast({ title: 'Invalid file', description: validationError, variant: 'destructive' });
      return null;
    }
    const ext = file.name.split('.').pop()?.toLowerCase();
    const safeName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from('project-images').upload(safeName, file);
    if (error) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
      return null;
    }
    const { data: { publicUrl } } = supabase.storage.from('project-images').getPublicUrl(safeName);
    return publicUrl;
  };

  // PROJECT CRUD
  const openProjectDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({ title: project.title, description: project.description, tag: project.tag, link: project.link || '', image_url: project.image_url || '' });
    } else {
      setEditingProject(null);
      setProjectForm({ title: '', description: '', tag: '', link: '', image_url: '' });
    }
    setProjectImageFile(null);
    setProjectDialog(true);
  };

  const saveProject = async () => {
    setUploading(true);
    let imageUrl = projectForm.image_url;
    if (projectImageFile) {
      const url = await uploadImage(projectImageFile);
      if (url) imageUrl = url;
    }

    const payload = {
      title: sanitizeInput(projectForm.title),
      description: sanitizeInput(projectForm.description),
      tag: sanitizeInput(projectForm.tag),
      link: projectForm.link ? sanitizeUrl(projectForm.link) : null,
      image_url: imageUrl || null,
      display_order: editingProject ? editingProject.display_order : projects.length,
    };

    if (editingProject) {
      const { error } = await supabase.from('projects').update(payload).eq('id', editingProject.id);
      if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
      else toast({ title: 'Project updated!' });
    } else {
      const { error } = await supabase.from('projects').insert(payload);
      if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
      else toast({ title: 'Project created!' });
    }

    setUploading(false);
    setProjectDialog(false);
    fetchProjects();
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await supabase.from('projects').delete().eq('id', id);
    toast({ title: 'Project deleted' });
    fetchProjects();
  };

  // SERVICE CRUD
  const openServiceDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setServiceForm({ title: service.title, description: service.description, features: service.features.join('\n'), image_url: service.image_url || '' });
    } else {
      setEditingService(null);
      setServiceForm({ title: '', description: '', features: '', image_url: '' });
    }
    setServiceImageFile(null);
    setServiceDialog(true);
  };

  const saveService = async () => {
    setUploading(true);
    let imageUrl = serviceForm.image_url;
    if (serviceImageFile) {
      const url = await uploadImage(serviceImageFile);
      if (url) imageUrl = url;
    }

    const features = serviceForm.features.split('\n').map(f => sanitizeInput(f)).filter(Boolean);
    const payload = {
      title: sanitizeInput(serviceForm.title),
      description: sanitizeInput(serviceForm.description),
      features,
      image_url: imageUrl || null,
      display_order: editingService ? editingService.display_order : services.length,
    };

    if (editingService) {
      const { error } = await supabase.from('services').update(payload).eq('id', editingService.id);
      if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
      else toast({ title: 'Service updated!' });
    } else {
      const { error } = await supabase.from('services').insert(payload);
      if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
      else toast({ title: 'Service created!' });
    }

    setUploading(false);
    setServiceDialog(false);
    fetchServices();
  };

  const deleteService = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    await supabase.from('services').delete().eq('id', id);
    toast({ title: 'Service deleted' });
    fetchServices();
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Loading...</div>;
  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/30 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground text-sm">C</div>
            <span className="font-display font-bold text-foreground">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
            <Button variant="outline" size="sm" onClick={() => { signOut(); navigate('/'); }} className="border-border/50">
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={tab === 'projects' ? 'default' : 'outline'}
            onClick={() => setTab('projects')}
            className={tab === 'projects' ? 'bg-secondary text-secondary-foreground' : 'border-border/50'}
          >
            <FolderOpen className="w-4 h-4 mr-2" /> Projects
          </Button>
          <Button
            variant={tab === 'services' ? 'default' : 'outline'}
            onClick={() => setTab('services')}
            className={tab === 'services' ? 'bg-secondary text-secondary-foreground' : 'border-border/50'}
          >
            <Wrench className="w-4 h-4 mr-2" /> Services
          </Button>
        </div>

        {/* Projects Tab */}
        {tab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold">Portfolio Projects</h2>
              <Button onClick={() => openProjectDialog()} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </div>

            {projects.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
                No projects yet. Click "Add Project" to create one.
              </div>
            ) : (
              <div className="grid gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="glass rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <GripVertical className="w-5 h-5 text-muted-foreground shrink-0 hidden sm:block" />
                    {project.image_url && (
                      <img src={project.image_url} alt={project.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{project.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{project.description}</p>
                      <span className="text-xs text-secondary">{project.tag}</span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => openProjectDialog(project)} className="border-border/50">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => deleteProject(project.id)} className="border-destructive/50 text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Services Tab */}
        {tab === 'services' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold">Services</h2>
              <Button onClick={() => openServiceDialog()} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Plus className="w-4 h-4 mr-2" /> Add Service
              </Button>
            </div>

            {services.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
                No services yet. Click "Add Service" to create one.
              </div>
            ) : (
              <div className="grid gap-4">
                {services.map((service) => (
                  <div key={service.id} className="glass rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <GripVertical className="w-5 h-5 text-muted-foreground shrink-0 hidden sm:block" />
                    {service.image_url && (
                      <img src={service.image_url} alt={service.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{service.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{service.description}</p>
                      <span className="text-xs text-secondary">{service.features.length} features</span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => openServiceDialog(service)} className="border-border/50">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => deleteService(service.id)} className="border-destructive/50 text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project Dialog */}
      <Dialog open={projectDialog} onOpenChange={setProjectDialog}>
        <DialogContent className="glass border-border/50 sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">{editingProject ? 'Edit Project' : 'New Project'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Title" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} className="bg-background/50 border-border/50" />
            <Textarea placeholder="Description" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} className="bg-background/50 border-border/50" />
            <Input placeholder="Tag (e.g., Web Development)" value={projectForm.tag} onChange={(e) => setProjectForm({ ...projectForm, tag: e.target.value })} className="bg-background/50 border-border/50" />
            <Input placeholder="Link (optional)" value={projectForm.link} onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })} className="bg-background/50 border-border/50" />

            {/* Image upload */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Project Image</label>
              {(projectForm.image_url || projectImageFile) && (
                <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3 border border-border/30">
                  <img
                    src={projectImageFile ? URL.createObjectURL(projectImageFile) : projectForm.image_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => { setProjectImageFile(null); setProjectForm({ ...projectForm, image_url: '' }); }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <label className="flex items-center gap-2 cursor-pointer px-4 py-3 rounded-xl border border-dashed border-border/50 hover:border-secondary/50 transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Choose image</span>
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(e) => {
                  if (e.target.files?.[0]) {
                    const err = validateImageFile(e.target.files[0]);
                    if (err) { toast({ title: 'Invalid file', description: err, variant: 'destructive' }); return; }
                    setProjectImageFile(e.target.files[0]);
                  }
                }} />
              </label>
            </div>

            <Button onClick={saveProject} disabled={uploading || !projectForm.title} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              {uploading ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Service Dialog */}
      <Dialog open={serviceDialog} onOpenChange={setServiceDialog}>
        <DialogContent className="glass border-border/50 sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">{editingService ? 'Edit Service' : 'New Service'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Title" value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} className="bg-background/50 border-border/50" />
            <Textarea placeholder="Description" value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} className="bg-background/50 border-border/50" />
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Features (one per line)</label>
              <Textarea placeholder="Feature 1&#10;Feature 2&#10;Feature 3" value={serviceForm.features} onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })} className="bg-background/50 border-border/50 min-h-[120px]" />
            </div>

            {/* Image upload */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Service Image</label>
              {(serviceForm.image_url || serviceImageFile) && (
                <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3 border border-border/30">
                  <img
                    src={serviceImageFile ? URL.createObjectURL(serviceImageFile) : serviceForm.image_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => { setServiceImageFile(null); setServiceForm({ ...serviceForm, image_url: '' }); }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <label className="flex items-center gap-2 cursor-pointer px-4 py-3 rounded-xl border border-dashed border-border/50 hover:border-secondary/50 transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Choose image</span>
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(e) => {
                  if (e.target.files?.[0]) {
                    const err = validateImageFile(e.target.files[0]);
                    if (err) { toast({ title: 'Invalid file', description: err, variant: 'destructive' }); return; }
                    setServiceImageFile(e.target.files[0]);
                  }
                }} />
              </label>
            </div>

            <Button onClick={saveService} disabled={uploading || !serviceForm.title} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              {uploading ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
