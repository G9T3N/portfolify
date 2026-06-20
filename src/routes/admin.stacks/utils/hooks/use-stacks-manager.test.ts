import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { Skill, SkillCategory } from "../../queries";

// Mock all query hooks so the hook can render without supabase
vi.mock("../../queries", () => ({
  useSkillCategories: vi.fn(() => ({ data: [], isLoading: false })),
  useSkills: vi.fn(() => ({ data: [], isLoading: false })),
  useSkillMutation: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useDeleteSkillMutation: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useToggleSkillVisibilityMutation: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useCategoryMutation: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useDeleteCategoryMutation: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
}));

// Mock toast
vi.mock("@/hooks/use-toast", () => ({
  toast: vi.fn(),
}));

import { useStacksManager } from "./use-stacks-manager";
import * as queries from "../../queries";
import { toast } from "@/hooks/use-toast";

const mockToast = vi.mocked(toast);

const sampleSkill: Skill = {
  id: "skill-1",
  category_id: "cat-1",
  name: "React",
  logo_url: "https://example.com/react.png",
  proficiency: "advanced",
  display_order: 1,
  is_visible: true,
  created_at: "2024-01-01",
};

const sampleCategory: SkillCategory = {
  id: "cat-1",
  name: "Frontend",
  display_order: 1,
  created_at: "2024-01-01",
};

describe("useStacksManager – PR change: categoryMutation now exported", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(queries.useSkillCategories).mockReturnValue({ data: [], isLoading: false } as ReturnType<typeof queries.useSkillCategories>);
    vi.mocked(queries.useSkills).mockReturnValue({ data: [], isLoading: false } as ReturnType<typeof queries.useSkills>);
    vi.mocked(queries.useSkillMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useSkillMutation>);
    vi.mocked(queries.useDeleteSkillMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useDeleteSkillMutation>);
    vi.mocked(queries.useToggleSkillVisibilityMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useToggleSkillVisibilityMutation>);
    vi.mocked(queries.useCategoryMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useCategoryMutation>);
    vi.mocked(queries.useDeleteCategoryMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useDeleteCategoryMutation>);
  });

  it("returns categoryMutation in the result object (new export added in this PR)", () => {
    const { result } = renderHook(() => useStacksManager());
    expect(result.current).toHaveProperty("categoryMutation");
  });

  it("categoryMutation is the object returned by useCategoryMutation()", () => {
    const fakeMutation = { mutate: vi.fn(), isPending: false };
    vi.mocked(queries.useCategoryMutation).mockReturnValue(fakeMutation as unknown as ReturnType<typeof queries.useCategoryMutation>);
    const { result } = renderHook(() => useStacksManager());
    expect(result.current.categoryMutation).toBe(fakeMutation);
  });

  it("initial activeCategory is null", () => {
    const { result } = renderHook(() => useStacksManager());
    expect(result.current.activeCategory).toBeNull();
  });

  it("setActiveCategory updates activeCategory", () => {
    const { result } = renderHook(() => useStacksManager());
    act(() => {
      result.current.setActiveCategory("cat-1");
    });
    expect(result.current.activeCategory).toBe("cat-1");
  });
});

describe("useStacksManager – handleSubmitSkill validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(queries.useSkillCategories).mockReturnValue({ data: [], isLoading: false } as ReturnType<typeof queries.useSkillCategories>);
    vi.mocked(queries.useSkills).mockReturnValue({ data: [], isLoading: false } as ReturnType<typeof queries.useSkills>);
    vi.mocked(queries.useSkillMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useSkillMutation>);
    vi.mocked(queries.useDeleteSkillMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useDeleteSkillMutation>);
    vi.mocked(queries.useToggleSkillVisibilityMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useToggleSkillVisibilityMutation>);
    vi.mocked(queries.useCategoryMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useCategoryMutation>);
    vi.mocked(queries.useDeleteCategoryMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useDeleteCategoryMutation>);
  });

  it("shows toast and does NOT mutate when skill name is empty", () => {
    const mutateFn = vi.fn();
    vi.mocked(queries.useSkillMutation).mockReturnValue({ mutate: mutateFn, isPending: false } as unknown as ReturnType<typeof queries.useSkillMutation>);

    const { result } = renderHook(() => useStacksManager());
    act(() => {
      result.current.handleSubmitSkill();
    });

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Please enter a skill name", variant: "destructive" })
    );
    expect(mutateFn).not.toHaveBeenCalled();
  });

  it("calls mutate with correct args when skill name is provided", () => {
    const mutateFn = vi.fn();
    vi.mocked(queries.useSkillMutation).mockReturnValue({ mutate: mutateFn, isPending: false } as unknown as ReturnType<typeof queries.useSkillMutation>);

    const { result } = renderHook(() => useStacksManager());

    act(() => {
      result.current.setSkillForm({
        name: "TypeScript",
        logo_url: "",
        proficiency: "advanced",
        display_order: 0,
      });
    });
    act(() => {
      result.current.handleSubmitSkill();
    });

    expect(mutateFn).toHaveBeenCalledWith({
      skill: expect.objectContaining({ name: "TypeScript" }),
      isEdit: false,
      skillId: undefined,
      categoryId: undefined,
    });
  });

  it("passes activeCategory as categoryId to mutate when a category is selected", () => {
    const mutateFn = vi.fn();
    vi.mocked(queries.useSkillMutation).mockReturnValue({ mutate: mutateFn, isPending: false } as unknown as ReturnType<typeof queries.useSkillMutation>);

    const { result } = renderHook(() => useStacksManager());

    act(() => {
      result.current.setActiveCategory("cat-1");
      result.current.setSkillForm({
        name: "TypeScript",
        logo_url: "",
        proficiency: "intermediate",
        display_order: 0,
      });
    });
    act(() => {
      result.current.handleSubmitSkill();
    });

    expect(mutateFn).toHaveBeenCalledWith(
      expect.objectContaining({ categoryId: "cat-1" })
    );
  });
});

describe("useStacksManager – handleSubmitCategory validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(queries.useSkillCategories).mockReturnValue({ data: [], isLoading: false } as ReturnType<typeof queries.useSkillCategories>);
    vi.mocked(queries.useSkills).mockReturnValue({ data: [], isLoading: false } as ReturnType<typeof queries.useSkills>);
    vi.mocked(queries.useSkillMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useSkillMutation>);
    vi.mocked(queries.useDeleteSkillMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useDeleteSkillMutation>);
    vi.mocked(queries.useToggleSkillVisibilityMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useToggleSkillVisibilityMutation>);
    vi.mocked(queries.useCategoryMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useCategoryMutation>);
    vi.mocked(queries.useDeleteCategoryMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useDeleteCategoryMutation>);
  });

  it("shows toast and does NOT mutate when category name is empty", () => {
    const mutateFn = vi.fn();
    vi.mocked(queries.useCategoryMutation).mockReturnValue({ mutate: mutateFn, isPending: false } as unknown as ReturnType<typeof queries.useCategoryMutation>);

    const { result } = renderHook(() => useStacksManager());
    act(() => {
      result.current.handleSubmitCategory();
    });

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Please enter a category name", variant: "destructive" })
    );
    expect(mutateFn).not.toHaveBeenCalled();
  });

  it("calls categoryMutation.mutate with correct args when category name is provided", () => {
    const mutateFn = vi.fn();
    vi.mocked(queries.useCategoryMutation).mockReturnValue({ mutate: mutateFn, isPending: false } as unknown as ReturnType<typeof queries.useCategoryMutation>);

    const { result } = renderHook(() => useStacksManager());

    act(() => {
      result.current.setCategoryForm({ name: "Backend", display_order: 2 });
    });
    act(() => {
      result.current.handleSubmitCategory();
    });

    expect(mutateFn).toHaveBeenCalledWith({
      category: expect.objectContaining({ name: "Backend" }),
      isEdit: false,
      categoryId: undefined,
    });
  });
});

describe("useStacksManager – handleCloseSkillForm and handleCloseCategoryForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(queries.useSkillCategories).mockReturnValue({ data: [], isLoading: false } as ReturnType<typeof queries.useSkillCategories>);
    vi.mocked(queries.useSkills).mockReturnValue({ data: [], isLoading: false } as ReturnType<typeof queries.useSkills>);
    vi.mocked(queries.useSkillMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useSkillMutation>);
    vi.mocked(queries.useDeleteSkillMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useDeleteSkillMutation>);
    vi.mocked(queries.useToggleSkillVisibilityMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useToggleSkillVisibilityMutation>);
    vi.mocked(queries.useCategoryMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useCategoryMutation>);
    vi.mocked(queries.useDeleteCategoryMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useDeleteCategoryMutation>);
  });

  it("handleCloseSkillForm resets isSkillFormOpen and skillForm", () => {
    const { result } = renderHook(() => useStacksManager());

    act(() => {
      result.current.setIsSkillFormOpen(true);
      result.current.setSkillForm({
        name: "Vue",
        logo_url: "url",
        proficiency: "beginner",
        display_order: 5,
      });
    });

    act(() => {
      result.current.handleCloseSkillForm();
    });

    expect(result.current.isSkillFormOpen).toBe(false);
    expect(result.current.skillForm).toEqual({
      name: "",
      logo_url: "",
      proficiency: "intermediate",
      display_order: 0,
    });
  });

  it("handleCloseCategoryForm resets isCategoryFormOpen and categoryForm", () => {
    const { result } = renderHook(() => useStacksManager());

    act(() => {
      result.current.setIsCategoryFormOpen(true);
      result.current.setCategoryForm({ name: "DevOps", display_order: 3 });
    });

    act(() => {
      result.current.handleCloseCategoryForm();
    });

    expect(result.current.isCategoryFormOpen).toBe(false);
    expect(result.current.categoryForm).toEqual({ name: "", display_order: 0 });
  });
});

describe("useStacksManager – handleEditSkill and handleEditCategory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(queries.useSkillCategories).mockReturnValue({ data: [], isLoading: false } as ReturnType<typeof queries.useSkillCategories>);
    vi.mocked(queries.useSkills).mockReturnValue({ data: [], isLoading: false } as ReturnType<typeof queries.useSkills>);
    vi.mocked(queries.useSkillMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useSkillMutation>);
    vi.mocked(queries.useDeleteSkillMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useDeleteSkillMutation>);
    vi.mocked(queries.useToggleSkillVisibilityMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useToggleSkillVisibilityMutation>);
    vi.mocked(queries.useCategoryMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useCategoryMutation>);
    vi.mocked(queries.useDeleteCategoryMutation).mockReturnValue({ mutate: vi.fn(), isPending: false } as unknown as ReturnType<typeof queries.useDeleteCategoryMutation>);
  });

  it("handleEditSkill populates skillForm from the skill and opens modal", () => {
    const { result } = renderHook(() => useStacksManager());

    act(() => {
      result.current.handleEditSkill(sampleSkill);
    });

    expect(result.current.isSkillFormOpen).toBe(true);
    expect(result.current.skillForm).toEqual({
      name: "React",
      logo_url: "https://example.com/react.png",
      proficiency: "advanced",
      display_order: 1,
    });
  });

  it("handleEditSkill uses empty string for null logo_url", () => {
    const { result } = renderHook(() => useStacksManager());

    act(() => {
      result.current.handleEditSkill({ ...sampleSkill, logo_url: null });
    });

    expect(result.current.skillForm.logo_url).toBe("");
  });

  it("handleEditCategory populates categoryForm from the category and opens modal", () => {
    const { result } = renderHook(() => useStacksManager());

    act(() => {
      result.current.handleEditCategory(sampleCategory);
    });

    expect(result.current.isCategoryFormOpen).toBe(true);
    expect(result.current.categoryForm).toEqual({
      name: "Frontend",
      display_order: 1,
    });
  });
});