import { categoryOptions } from "~/constants/categoryOptions";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Star } from "lucide-react";

export const FilterSidebar = () => (
  <div className="m-4 mr-0 h-[900px] w-80 rounded-sm border border-black max-[700px]:hidden">
    <div className="border-b border-black p-4">Showing 1-14 of 14 products</div>
    <div className="space-y-4 border-b border-black p-4">
      <div>
        <span>Minimum Price</span>
        <div className="relative mt-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            Rp
          </div>
          <Input
            type="number"
            placeholder="0"
            className="h-10 rounded-sm border border-black pl-10"
          />
        </div>
      </div>
      <div>
        <span>Maximum Price</span>
        <div className="relative mt-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            Rp
          </div>
          <Input
            type="number"
            placeholder="0"
            className="h-10 rounded-sm border border-black pl-10"
          />
        </div>
      </div>
    </div>
    <div className="border-b border-black p-4">
      <span className="font-bold">Category</span>
      {categoryOptions.map((category) => (
        <div key={category.value} className="my-4 flex items-center gap-2">
          <Checkbox
          // checked={selectedCategories.includes(category.value)}
          // onCheckedChange={() =>
          //   handleCategoryChange(category.value)
          // }
          />
          <Label>{category.label}</Label>
        </div>
      ))}
    </div>
    <div className="p-4 pb-8">
      <span className="font-bold">Rating</span>
      <div className="flex flex-col items-start gap-2 pb-3">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div
            key={rating}
            className="my-1 flex w-full items-center justify-between  gap-2"
          >
            <button className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
              {[...Array(5 - rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current opacity-50" />
              ))}
            </button>
            <Checkbox id={`rating-${rating}`} />
          </div>
        ))}
      </div>
    </div>
  </div>
);
