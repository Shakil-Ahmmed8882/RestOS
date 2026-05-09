import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  onChange: (query: string) => void;
};

export function FoodSearchBar(props: Props) {
  const { value, onChange } = props;

  return (
    <div className="relative">
      <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        placeholder="Search foods..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
