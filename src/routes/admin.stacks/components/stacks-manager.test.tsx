import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { Skill, SkillCategory } from "../queries";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...rest }: React.PropsWithChildren<object>) => (
      <div {...rest}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<object>) => <>{children}</>,
}));

// Mock AnimatedDialog
vi.mock("@/components/common/animated-dialog", () => ({
  AnimatedDialog: ({
    isOpen,
    children,
    title,
  }: {
    isOpen: boolean;
    children: React.ReactNode;
    title: string;
  }) =>
    isOpen ? (
      <div role="dialog" aria-label={title}>
        {children}
      </div>
    ) : null,
}));

// Mock lucide icons to avoid SVG rendering issues
vi.mock("lucide-react", () => ({
  Plus: () => <span>Plus</span>,
  Pencil: () => <span>Pencil</span>,
  Trash2: () => <span>Trash2</span>,
  Eye: () => <span>Eye</span>,
  EyeOff: () => <span>EyeOff</span>,
  Loader2: () => <span>Loader2</span>,
  FolderPlus: () => <span>FolderPlus</span>,
}));

// Mock useStacksManager
const mockSetActiveCategory = vi.fn();
const mockSetIsSkillFormOpen = vi.fn();
const mockSetIsCategoryFormOpen = vi.fn();
const mockHandleEditSkill = vi.fn();
const mockHandleEditCategory = vi.fn();
const mockHandleSubmitSkill = vi.fn();
const mockHandleSubmitCategory = vi.fn();
const mockHandleCloseSkillForm = vi.fn();
const mockHandleCloseCategoryForm = vi.fn();
const mockDeleteCategoryMutation = { mutate: vi.fn(), isPending: false };
const mockDeleteSkillMutation = { mutate: vi.fn(), isPending: false };
const mockToggleVisibilityMutation = { mutate: vi.fn(), isPending: false };
const mockSkillMutation = { mutate: vi.fn(), isPending: false };
const mockCategoryMutation = { mutate: vi.fn(), isPending: false };

const defaultHookState = {
  activeCategory: null as string | null,
  setActiveCategory: mockSetActiveCategory,
  isSkillFormOpen: false,
  setIsSkillFormOpen: mockSetIsSkillFormOpen,
  isCategoryFormOpen: false,
  setIsCategoryFormOpen: mockSetIsCategoryFormOpen,
  editingSkill: null,
  editingCategory: null,
  skillForm: { name: "", logo_url: "", proficiency: "intermediate" as const, display_order: 0 },
  setSkillForm: vi.fn(),
  categoryForm: { name: "", display_order: 0 },
  setCategoryForm: vi.fn(),
  handleCloseSkillForm: mockHandleCloseSkillForm,
  handleCloseCategoryForm: mockHandleCloseCategoryForm,
  handleEditSkill: mockHandleEditSkill,
  handleEditCategory: mockHandleEditCategory,
  handleSubmitSkill: mockHandleSubmitSkill,
  handleSubmitCategory: mockHandleSubmitCategory,
  categories: [] as SkillCategory[],
  categoriesLoading: false,
  skills: [] as Skill[],
  skillsLoading: false,
  skillMutation: mockSkillMutation,
  deleteSkillMutation: mockDeleteSkillMutation,
  toggleVisibilityMutation: mockToggleVisibilityMutation,
  categoryMutation: mockCategoryMutation,
  deleteCategoryMutation: mockDeleteCategoryMutation,
};

let hookState = { ...defaultHookState };

vi.mock("../utils/hooks/use-stacks-manager", () => ({
  useStacksManager: () => hookState,
}));

import StacksManager from "./stacks-manager";

const sampleCategories: SkillCategory[] = [
  { id: "cat-1", name: "Frontend", display_order: 1, created_at: "2024-01-01" },
  { id: "cat-2", name: "Backend", display_order: 2, created_at: "2024-01-01" },
];

const sampleSkills: Skill[] = [
  {
    id: "s1",
    category_id: "cat-1",
    name: "React",
    logo_url: null,
    proficiency: "advanced",
    display_order: 1,
    is_visible: true,
    created_at: "2024-01-01",
  },
  {
    id: "s2",
    category_id: "cat-1",
    name: "Vue",
    logo_url: null,
    proficiency: "intermediate",
    display_order: 2,
    is_visible: false,
    created_at: "2024-01-01",
  },
  {
    id: "s3",
    category_id: "cat-2",
    name: "Django",
    logo_url: null,
    proficiency: "expert",
    display_order: 1,
    is_visible: true,
    created_at: "2024-01-01",
  },
];

describe("StacksManager – 'All' tab (new in this PR)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    hookState = { ...defaultHookState };
  });

  it("renders an 'All' button tab", () => {
    hookState = { ...defaultHookState, categories: sampleCategories, skills: sampleSkills };
    render(<StacksManager />);
    expect(screen.getByRole("button", { name: /All/i })).toBeInTheDocument();
  });

  it("'All' tab shows total skill count", () => {
    hookState = { ...defaultHookState, categories: sampleCategories, skills: sampleSkills };
    render(<StacksManager />);
    // Should show "(3)" next to All
    expect(screen.getByText("(3)")).toBeInTheDocument();
  });

  it("'All' tab is active (primary style) when activeCategory is null", () => {
    hookState = {
      ...defaultHookState,
      activeCategory: null,
      categories: sampleCategories,
      skills: sampleSkills,
    };
    render(<StacksManager />);

    const allButton = screen.getByRole("button", { name: /All/i });
    expect(allButton.className).toContain("bg-primary");
  });

  it("clicking 'All' tab calls setActiveCategory(null)", () => {
    hookState = {
      ...defaultHookState,
      activeCategory: "cat-1",
      categories: sampleCategories,
      skills: sampleSkills,
    };
    render(<StacksManager />);

    const allButton = screen.getByRole("button", { name: /All/i });
    fireEvent.click(allButton);
    expect(mockSetActiveCategory).toHaveBeenCalledWith(null);
  });

  it("'All' tab is NOT active when a category is selected", () => {
    hookState = {
      ...defaultHookState,
      activeCategory: "cat-1",
      categories: sampleCategories,
      skills: sampleSkills,
    };
    render(<StacksManager />);

    const allButton = screen.getByRole("button", { name: /All/i });
    expect(allButton.className).not.toContain("bg-primary");
  });
});

describe("StacksManager – filteredSkills behavior (PR fix: null -> empty array)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    hookState = { ...defaultHookState };
  });

  it("shows all skills when activeCategory is null (was empty array before PR)", () => {
    hookState = {
      ...defaultHookState,
      activeCategory: null,
      categories: sampleCategories,
      skills: sampleSkills,
    };
    render(<StacksManager />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
    expect(screen.getByText("Django")).toBeInTheDocument();
  });

  it("shows only filtered skills when a specific category is active", () => {
    // When activeCategory = "cat-1", filteredSkills should only contain cat-1 skills
    const filteredSkills = sampleSkills.filter((s) => s.category_id === "cat-1");
    hookState = {
      ...defaultHookState,
      activeCategory: "cat-1",
      categories: sampleCategories,
      skills: sampleSkills,
      // The component computes filteredSkills internally so we only need to provide skills + activeCategory
    };
    render(<StacksManager />);

    // React and Vue are in cat-1
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
    // Django is in cat-2 - should NOT appear
    expect(screen.queryByText("Django")).not.toBeInTheDocument();
  });

  it("displays 'All Skills' heading when activeCategory is null", () => {
    hookState = {
      ...defaultHookState,
      activeCategory: null,
      categories: sampleCategories,
      skills: sampleSkills,
    };
    render(<StacksManager />);
    expect(screen.getByText("All Skills")).toBeInTheDocument();
  });

  it("displays category name heading when a category is selected", () => {
    hookState = {
      ...defaultHookState,
      activeCategory: "cat-1",
      categories: sampleCategories,
      skills: sampleSkills,
    };
    render(<StacksManager />);
    // "Frontend" appears both in the tab button and in the h2 heading
    const instances = screen.getAllByText("Frontend");
    expect(instances.length).toBeGreaterThanOrEqual(1);
    // The h2 heading should contain it
    const heading = document.querySelector("h2");
    expect(heading?.textContent).toContain("Frontend");
  });

  it("does NOT show 'Add Skill' button in header when activeCategory is null", () => {
    hookState = {
      ...defaultHookState,
      activeCategory: null,
      categories: sampleCategories,
      skills: sampleSkills,
    };
    render(<StacksManager />);
    expect(screen.queryByText("Add Skill")).not.toBeInTheDocument();
  });

  it("shows 'Add Skill' button in header when a category is active", () => {
    hookState = {
      ...defaultHookState,
      activeCategory: "cat-1",
      categories: sampleCategories,
      skills: sampleSkills,
    };
    render(<StacksManager />);
    expect(screen.getByText("Add Skill")).toBeInTheDocument();
  });

  it("shows empty state without 'Add your first skill' button when activeCategory is null and no skills", () => {
    hookState = {
      ...defaultHookState,
      activeCategory: null,
      categories: sampleCategories,
      skills: [],
    };
    render(<StacksManager />);
    expect(screen.getByText("No skills to display")).toBeInTheDocument();
    expect(screen.queryByText("Add your first skill")).not.toBeInTheDocument();
  });

  it("shows 'Add your first skill' button in empty state when a category is active", () => {
    hookState = {
      ...defaultHookState,
      activeCategory: "cat-1",
      categories: sampleCategories,
      skills: [],
    };
    render(<StacksManager />);
    expect(screen.getByText("Add your first skill")).toBeInTheDocument();
  });
});

describe("StacksManager – loading state", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    hookState = { ...defaultHookState };
  });

  it("shows loading spinner when categoriesLoading is true", () => {
    hookState = { ...defaultHookState, categoriesLoading: true };
    render(<StacksManager />);
    expect(screen.getByText("Loader2")).toBeInTheDocument();
    expect(screen.queryByText("Skills & Stacks")).not.toBeInTheDocument();
  });

  it("renders full UI when categoriesLoading is false", () => {
    hookState = { ...defaultHookState, categoriesLoading: false };
    render(<StacksManager />);
    expect(screen.getByText("Skills & Stacks")).toBeInTheDocument();
  });
});

describe("StacksManager – categoryMutation integration (PR: now destructured)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    hookState = { ...defaultHookState };
  });

  it("shows 'Add Category' button that opens category form", () => {
    hookState = { ...defaultHookState };
    render(<StacksManager />);
    const addCatButton = screen.getByText("Add Category");
    fireEvent.click(addCatButton);
    expect(mockSetIsCategoryFormOpen).toHaveBeenCalledWith(true);
  });

  it("category form modal is shown when isCategoryFormOpen is true", () => {
    hookState = { ...defaultHookState, isCategoryFormOpen: true };
    render(<StacksManager />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
