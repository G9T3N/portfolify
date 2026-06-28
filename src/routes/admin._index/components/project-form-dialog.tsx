import { Upload, Loader2, Plus, X } from "lucide-react";
import { AnimatedDialog } from "@/components/common/animated-dialog";
import { useImageUpload } from "@/utils/hooks/use-image-upload";
import { useProjectForm } from "../utils/hooks/use-project-form";

interface ProjectFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Record<string, unknown>;
}

const ProjectFormDialog = ({ isOpen, onClose, project }: ProjectFormDialogProps) => {
  const {
    form,
    techInput,
    isSubmitting,
    setTechInput,
    addTech,
    removeTech,
    handleTechKeyDown,
    onSubmit,
    setThumbnailUrl,
  } = useProjectForm(project, onClose);

  const {
    register,
    formState: { errors },
    watch,
  } = form;
  const currentThumbnailUrl = watch("thumbnail_url");
  const currentTechStack = watch("tech_stack") || [];

  const { uploadImage, isUploading } = useImageUpload("project-images");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const url = await uploadImage(file);
    if (url) {
      setThumbnailUrl(url);
    }
  };

  return (
    <AnimatedDialog
      isOpen={isOpen}
      onClose={onClose}
      title={project ? "Edit Project" : "Add New Project"}
    >
      {/* Form */}
      <form onSubmit={onSubmit} className="p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-mono text-muted-foreground mb-2">
            Title <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className={`w-full px-4 py-3 rounded-lg bg-muted/30 border ${errors.title ? "border-destructive/50 focus:ring-destructive/50 focus:border-destructive" : "border-border/50 focus:ring-primary/50 focus:border-primary"} font-mono text-sm focus:outline-none focus:ring-2`}
            placeholder="Project title"
          />
          {errors.title && <p className="text-destructive text-xs mt-1">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-mono text-muted-foreground mb-2">
            Short Description <span className="text-destructive">*</span>
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={2}
            className={`w-full px-4 py-3 rounded-lg bg-muted/30 border ${errors.description ? "border-destructive/50 focus:ring-destructive/50 focus:border-destructive" : "border-border/50 focus:ring-primary/50 focus:border-primary"} font-mono text-sm resize-none focus:outline-none focus:ring-2`}
            placeholder="Brief project description"
          />
          {errors.description && (
            <p className="text-destructive text-xs mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Full Content */}
        <div>
          <label className="block text-sm font-mono text-muted-foreground mb-2">Full Content</label>
          <textarea
            id="full_content"
            {...register("full_content")}
            rows={5}
            className={`w-full px-4 py-3 rounded-lg bg-muted/30 border ${errors.full_content ? "border-destructive/50 focus:ring-destructive/50 focus:border-destructive" : "border-border/50 focus:ring-primary/50 focus:border-primary"} font-mono text-sm resize-none focus:outline-none focus:ring-2`}
            placeholder="Detailed project description..."
          />
          {errors.full_content && (
            <p className="text-destructive text-xs mt-1">{errors.full_content.message}</p>
          )}
        </div>

        {/* Category & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-mono text-muted-foreground mb-2">Category</label>
            <select
              id="category"
              {...register("category")}
              className={`w-full px-4 py-3 rounded-lg bg-muted/30 border ${errors.category ? "border-destructive/50 focus:ring-destructive/50 focus:border-destructive" : "border-border/50 focus:ring-primary/50 focus:border-primary"} font-mono text-sm focus:outline-none focus:ring-2`}
            >
              <option value="web">Web App</option>
              <option value="mobile">Mobile App</option>
            </select>
            {errors.category && (
              <p className="text-destructive text-xs mt-1">{errors.category.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-mono text-muted-foreground mb-2">Status</label>
            <select
              id="status"
              {...register("status")}
              className={`w-full px-4 py-3 rounded-lg bg-muted/30 border ${errors.status ? "border-destructive/50 focus:ring-destructive/50 focus:border-destructive" : "border-border/50 focus:ring-primary/50 focus:border-primary"} font-mono text-sm focus:outline-none focus:ring-2`}
            >
              <option value="draft">Draft</option>
              <option value="live">Live</option>
            </select>
            {errors.status && (
              <p className="text-destructive text-xs mt-1">{errors.status.message}</p>
            )}
          </div>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-mono text-muted-foreground mb-2">Thumbnail</label>
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {currentThumbnailUrl && (
              <div className="w-24 h-16 rounded-lg overflow-hidden bg-muted/30">
                <img
                  src={currentThumbnailUrl}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <label className="flex items-center gap-2 px-4 py-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-mono text-muted-foreground">Upload image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-muted-foreground mt-1">Or paste URL below</p>
              <input
                type="url"
                id="thumbnail_url"
                {...register("thumbnail_url")}
                className={`w-full px-4 py-2 mt-2 rounded-lg bg-muted/30 border ${errors.thumbnail_url ? "border-destructive/50 focus:ring-destructive/50 focus:border-destructive" : "border-border/50 focus:ring-primary/50 focus:border-primary"} font-mono text-sm focus:outline-none focus:ring-2`}
                placeholder="https://..."
              />
              {errors.thumbnail_url && (
                <p className="text-destructive text-xs mt-1">{errors.thumbnail_url.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* URLs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-mono text-muted-foreground mb-2">
              Live Demo URL
            </label>
            <input
              type="url"
              id="live_url"
              {...register("live_url")}
              className={`w-full px-4 py-3 rounded-lg bg-muted/30 border ${errors.live_url ? "border-destructive/50 focus:ring-destructive/50 focus:border-destructive" : "border-border/50 focus:ring-primary/50 focus:border-primary"} font-mono text-sm focus:outline-none focus:ring-2`}
              placeholder="https://..."
            />
            {errors.live_url && (
              <p className="text-destructive text-xs mt-1">{errors.live_url.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-mono text-muted-foreground mb-2">
              Source Code URL
            </label>
            <input
              type="url"
              id="code_url"
              {...register("code_url")}
              className={`w-full px-4 py-3 rounded-lg bg-muted/30 border ${errors.code_url ? "border-destructive/50 focus:ring-destructive/50 focus:border-destructive" : "border-border/50 focus:ring-primary/50 focus:border-primary"} font-mono text-sm focus:outline-none focus:ring-2`}
              placeholder="https://github.com/..."
            />
            {errors.code_url && (
              <p className="text-destructive text-xs mt-1">{errors.code_url.message}</p>
            )}
          </div>
        </div>

        {/* Embed URL */}
        <div>
          <label className="block text-sm font-mono text-muted-foreground mb-2">
            Embed Preview URL
          </label>
          <input
            type="url"
            id="embed_url"
            {...register("embed_url")}
            className={`w-full px-4 py-3 rounded-lg bg-muted/30 border ${errors.embed_url ? "border-destructive/50 focus:ring-destructive/50 focus:border-destructive" : "border-border/50 focus:ring-primary/50 focus:border-primary"} font-mono text-sm focus:outline-none focus:ring-2`}
            placeholder="URL for iframe embed preview"
          />
          {errors.embed_url && (
            <p className="text-destructive text-xs mt-1">{errors.embed_url.message}</p>
          )}
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-mono text-muted-foreground mb-2">Tech Stack</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleTechKeyDown}
              className="flex-1 px-4 py-3 rounded-lg bg-muted/30 border border-border/50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Add technology..."
            />
            <button
              type="button"
              onClick={addTech}
              className="px-4 py-3 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentTechStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/30"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTech(tech)}
                  className="hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Display Order */}
        <div>
          <label className="block text-sm font-mono text-muted-foreground mb-2">
            Display Order
          </label>
          <input
            type="number"
            id="display_order"
            {...register("display_order")}
            className={`w-24 px-4 py-3 rounded-lg bg-muted/30 border ${errors.display_order ? "border-destructive/50 focus:ring-destructive/50 focus:border-destructive" : "border-border/50 focus:ring-primary/50 focus:border-primary"} font-mono text-sm focus:outline-none focus:ring-2`}
          />
          {errors.display_order && (
            <p className="text-destructive text-xs mt-1">{errors.display_order.message}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-border/50">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="w-full sm:w-auto cyber-button flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {(isSubmitting || isUploading) && <Loader2 className="w-4 h-4 animate-spin" />}
            {project ? "Save Changes" : "Create Project"}
          </button>
        </div>
      </form>
    </AnimatedDialog>
  );
};

export default ProjectFormDialog;
