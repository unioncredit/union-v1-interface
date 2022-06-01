import { Badge } from "@unioncredit/ui";

export function Health({ health, isOverdue }) {
  const fillColor = isOverdue
    ? "purple"
    : health >= 66
    ? "green"
    : health >= 33
    ? "yellow"
    : "red";

  const label = isOverdue ? "Overdue" : "Healthy";

  return <Badge color={fillColor} label={label} />;
}
