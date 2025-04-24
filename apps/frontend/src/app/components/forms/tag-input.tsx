"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TagInputProps {
  placeholder?: string;
  disabled?: boolean;
  onTagsChange?: (tags: string[]) => void;
  defaultTags?: string[];
}

export function TagInput({
  placeholder = "Add tag...",
  disabled = false,
  onTagsChange,
  defaultTags = [],
}: TagInputProps) {
  const [tags, setTags] = React.useState<string[]>(defaultTags);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      const newTags = [...tags, trimmedValue];
      setTags(newTags);
      onTagsChange?.(newTags);
      setInputValue("");
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="px-2 py-1 text-sm">
            {tag}
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 h-4 w-4 rounded-full p-0 hover:bg-muted"
              onClick={() => removeTag(index)}
              disabled={disabled}
              aria-label={`Remove ${tag} tag`}
              type="button"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="flex-1"
        />
        <Button
          onClick={addTag}
          disabled={!inputValue.trim() || disabled}
          type="button"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
