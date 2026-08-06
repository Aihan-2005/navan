"use client";

import { useState } from "react";

import { WritingWorkspace } from "../../../../features/writing/components/workspace/writing-workspace";
import { WritingCategorySelector } from "../../../../features/writing/components/workspace/writing-category-selector";

export default function WritingNewPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!selectedCategory) {
    return (
      <WritingCategorySelector
        onCategorySelect={setSelectedCategory}
      />
    );
  }

  return (
    <WritingWorkspace
      mode="free"
      exercise={undefined}
      draft={undefined}
      category={selectedCategory}
    />
  );
}
