import { describe, it, expect, beforeEach } from "vitest";
import { applyDirectArabicColumns, applyTranslations, getContentLocale } from "./translations";

describe("translations query helper", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("applyDirectArabicColumns", () => {
    it("maps title_ar, description_ar, and full_content_ar onto base fields", () => {
      const project = {
        id: "p1",
        title: "Sofa Platform",
        title_ar: "منصة صوفا",
        description: "English description",
        description_ar: "وصف صوفا بالعربية",
        full_content: "English full content",
        full_content_ar: "محتوى تفصيلي بالعربية",
      };

      const result = applyDirectArabicColumns(project);
      expect(result.title).toBe("منصة صوفا");
      expect(result.description).toBe("وصف صوفا بالعربية");
      expect(result.full_content).toBe("محتوى تفصيلي بالعربية");
    });

    it("maps position_ar onto position for work experiences", () => {
      const exp = {
        id: "w1",
        position: "Senior Engineer",
        position_ar: "مهندس أول",
        company: "Tech Corp",
      };

      const result = applyDirectArabicColumns(exp);
      expect(result.position).toBe("مهندس أول");
      expect(result.company).toBe("Tech Corp");
    });

    it("leaves original field untouched if Arabic column is empty or whitespace", () => {
      const project = {
        id: "p2",
        title: "Solvera",
        title_ar: "   ",
        description: "Original description",
        description_ar: "",
      };

      const result = applyDirectArabicColumns(project);
      expect(result.title).toBe("Solvera");
      expect(result.description).toBe("Original description");
    });
  });

  describe("applyTranslations", () => {
    it("keeps base fields untouched in English mode", () => {
      const rows = [
        {
          id: "p1",
          title: "Sofa Platform",
          title_ar: "منصة صوفا",
          description: "English description",
          description_ar: "وصف عربي",
        },
      ];

      const result = applyTranslations(rows, [], "en");
      expect(result[0]?.title).toBe("Sofa Platform");
      expect(result[0]?.description).toBe("English description");
    });

    it("applies direct Arabic columns when locale is ar", () => {
      const rows = [
        {
          id: "p1",
          title: "Sofa Platform",
          title_ar: "منصة صوفا",
          description: "English description",
          description_ar: "وصف عربي",
        },
      ];

      const result = applyTranslations(rows, [], "ar");
      expect(result[0]?.title).toBe("منصة صوفا");
      expect(result[0]?.description).toBe("وصف عربي");
    });

    it("allows translations table overrides to take precedence if provided", () => {
      const rows = [
        {
          id: "p1",
          title: "Sofa Platform",
          title_ar: "منصة صوفا القديمة",
          description: "English description",
        },
      ];

      const overrides = [
        {
          rowId: "p1",
          field: "title" as const,
          value: "منصة صوفا المحدثة",
        },
      ];

      const result = applyTranslations(rows, overrides, "ar");
      expect(result[0]?.title).toBe("منصة صوفا المحدثة");
    });
  });

  describe("getContentLocale", () => {
    it("reads locale from localStorage when available", () => {
      localStorage.setItem("locale", "ar");
      expect(getContentLocale()).toBe("ar");

      localStorage.setItem("locale", "en");
      expect(getContentLocale()).toBe("en");
    });
  });
});
