import { motion } from 'framer-motion';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import { AnimatedDialog } from '@/components/common/animated-dialog';
import { useStacksManager } from '../utils/hooks/use-stacks-manager';
import { Skill } from '../queries';

const proficiencyColors = {
  beginner: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  intermediate: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  advanced: 'bg-green-500/20 text-green-400 border-green-500/30',
  expert: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const StacksManager = () => {
  const {
    activeCategory,
    setActiveCategory,
    isSkillFormOpen,
    setIsSkillFormOpen,
    isCategoryFormOpen,
    setIsCategoryFormOpen,
    editingSkill,
    editingCategory,
    skillForm,
    setSkillForm,
    categoryForm,
    setCategoryForm,
    handleCloseSkillForm,
    handleCloseCategoryForm,
    handleEditSkill,
    handleEditCategory,
    handleSubmitSkill,
    handleSubmitCategory,
    categories,
    categoriesLoading,
    skills,
    skillsLoading,
    skillMutation,
    deleteSkillMutation,
    toggleVisibilityMutation,
    categoryMutation,
    deleteCategoryMutation
  } = useStacksManager();

  const filteredSkills = activeCategory
    ? skills?.filter((s) => s.category_id === activeCategory)
    : skills || [];

  const activeCategoryData = categories?.find((c) => c.id === activeCategory);

  if (categoriesLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="i-ph:spinner w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-mono font-bold"><Trans>Skills & Stacks</Trans></h1>
        <button
          onClick={() => setIsCategoryFormOpen(true)}
          className="cyber-button flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <span className="i-ph:folder-plus w-4 h-4" />
          <Trans>Add Category</Trans>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-lg font-mono text-sm transition-all flex items-center gap-2 ${
            activeCategory === null
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
          }`}
        >
          <Trans>All</Trans>
          <span className="text-xs opacity-70">
            ({skills?.length || 0})
          </span>
        </button>
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all flex items-center gap-2 ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
            }`}
          >
            {category.name}
            <span className="text-xs opacity-70">
              ({skills?.filter((s) => s.category_id === category.id).length || 0})
            </span>
          </button>
        ))}
      </div>

      {/* Selected Category Content */}
      <motion.div
        key={activeCategory || 'all'}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-lg font-mono font-bold break-all">
              {activeCategory ? activeCategoryData?.name : t`All Skills`}
            </h2>
            {activeCategory && activeCategoryData && (
              <>
                <button
                  onClick={() => handleEditCategory(activeCategoryData)}
                  className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="i-ph:pencil w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(t`Delete category "${activeCategoryData?.name}" and all its skills?`)) {
                      deleteCategoryMutation.mutate(activeCategory);
                    }
                  }}
                  className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <span className="i-ph:trash w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
          {activeCategory && (
            <button
              onClick={() => setIsSkillFormOpen(true)}
              className="cyber-button-outline flex items-center justify-center gap-2 text-sm py-2 w-full sm:w-auto"
            >
              <span className="i-ph:plus w-4 h-4" />
              <Trans>Add Skill</Trans>
            </button>
          )}
        </div>

          {skillsLoading ? (
            <div className="flex items-center justify-center py-12">
              <span className="i-ph:spinner w-6 h-6 text-primary animate-spin" />
            </div>
          ) : (filteredSkills && filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  className={`glass-card p-4 transition-all ${
                    skill.is_visible ? '' : 'opacity-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {skill.logo_url ? (
                        <img
                          src={skill.logo_url}
                          alt={skill.name}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://cdn.simpleicons.org/javascript/666666';
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center text-muted-foreground">
                          📦
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-mono font-medium text-foreground truncate">{skill.name}</p>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-mono border ${
                            proficiencyColors[skill.proficiency]
                          }`}
                        >
                          {skill.proficiency}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-2">
                    <button
                      onClick={() =>
                        toggleVisibilityMutation.mutate({ id: skill.id, isVisible: skill.is_visible })
                      }
                      className="p-2 rounded-lg hover:bg-muted/30 text-muted-foreground transition-colors"
                    >
                      {skill.is_visible ? <span className="i-ph:eye w-4 h-4" /> : <span className="i-ph:eye-slash w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEditSkill(skill)}
                      className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <span className="i-ph:pencil w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(t`Delete skill "${skill.name}"?`)) {
                          deleteSkillMutation.mutate(skill.id);
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <span className="i-ph:trash w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
            <p className="text-muted-foreground font-mono mb-4"><Trans>No skills to display</Trans></p>
            {activeCategory && (
              <button onClick={() => setIsSkillFormOpen(true)} className="cyber-button-outline">
                <Trans>Add your first skill</Trans>
              </button>
            )}
          </div>
        ))}
      </motion.div>

      {/* Skill Form Modal */}
      <AnimatedDialog
        isOpen={isSkillFormOpen}
        onClose={handleCloseSkillForm}
        title={editingSkill ? t`Edit Skill` : t`Add Skill`}
        className="max-w-md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-muted-foreground mb-2">
              <Trans>Skill Name *</Trans>
            </label>
            <input
              type="text"
              value={skillForm.name}
              onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border/50 focus:border-primary/50 focus:outline-none font-mono"
              placeholder={t`e.g., React, Django, Docker`}
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-muted-foreground mb-2">
              <Trans>Logo URL</Trans>
            </label>
            <input
              type="text"
              value={skillForm.logo_url}
              onChange={(e) => setSkillForm({ ...skillForm, logo_url: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border/50 focus:border-primary/50 focus:outline-none font-mono text-sm"
              placeholder="https://cdn.simpleicons.org/react/61DAFB"
            />
            <p className="text-xs text-muted-foreground mt-1">
              <Trans>Use simpleicons.org: https://cdn.simpleicons.org/[icon]/[color]</Trans>
            </p>
          </div>

          <div>
            <label className="block text-sm font-mono text-muted-foreground mb-2">
              <Trans>Proficiency</Trans>
            </label>
            <select
              value={skillForm.proficiency}
              onChange={(e) =>
                setSkillForm({ ...skillForm, proficiency: e.target.value as Skill['proficiency'] })
              }
              className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border/50 focus:border-primary/50 focus:outline-none font-mono"
            >
              <option value="beginner">{t`Beginner`}</option>
              <option value="intermediate">{t`Intermediate`}</option>
              <option value="advanced">{t`Advanced`}</option>
              <option value="expert">{t`Expert`}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-mono text-muted-foreground mb-2">
              <Trans>Display Order</Trans>
            </label>
            <input
              type="number"
              value={skillForm.display_order}
              onChange={(e) =>
                setSkillForm({ ...skillForm, display_order: Number.parseInt(e.target.value) || 0 })
              }
              className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border/50 focus:border-primary/50 focus:outline-none font-mono"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <button
              onClick={handleCloseSkillForm}
              className="flex-1 px-4 py-3 rounded-lg border border-border/50 text-muted-foreground hover:bg-muted/30 font-mono w-full sm:w-auto"
            >
              <Trans>Cancel</Trans>
            </button>
            <button
              onClick={handleSubmitSkill}
              disabled={skillMutation.isPending}
              className="flex-1 cyber-button flex items-center justify-center gap-2"
            >
              {skillMutation.isPending && <span className="i-ph:spinner w-4 h-4 animate-spin" />}
              {editingSkill ? t`Update` : t`Add`} <Trans>Skill</Trans>
            </button>
          </div>
        </div>
      </AnimatedDialog>

      {/* Category Form Modal */}
      <AnimatedDialog
        isOpen={isCategoryFormOpen}
        onClose={handleCloseCategoryForm}
        title={editingCategory ? t`Edit Category` : t`Add Category`}
        className="max-w-md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-muted-foreground mb-2">
              <Trans>Category Name *</Trans>
            </label>
            <input
              type="text"
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border/50 focus:border-primary/50 focus:outline-none font-mono"
              placeholder={t`e.g., Frontend, Backend, DevOps`}
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-muted-foreground mb-2">
              <Trans>Display Order</Trans>
            </label>
            <input
              type="number"
              value={categoryForm.display_order}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, display_order: Number.parseInt(e.target.value) || 0 })
              }
              className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border/50 focus:border-primary/50 focus:outline-none font-mono"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <button
              onClick={handleCloseCategoryForm}
              className="flex-1 px-4 py-3 rounded-lg border border-border/50 text-muted-foreground hover:bg-muted/30 font-mono w-full sm:w-auto"
            >
              <Trans>Cancel</Trans>
            </button>
            <button
              onClick={handleSubmitCategory}
              disabled={categoryMutation.isPending}
              className="flex-1 cyber-button flex items-center justify-center gap-2"
            >
              {categoryMutation.isPending && <span className="i-ph:spinner w-4 h-4 animate-spin" />}
              {editingCategory ? t`Update` : t`Add`} <Trans>Category</Trans>
            </button>
          </div>
        </div>
      </AnimatedDialog>
    </div>
  );
};

export default StacksManager;
