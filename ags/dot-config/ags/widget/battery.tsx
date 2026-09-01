import AstalBattery from "gi://AstalBattery";
import { createBinding } from "gnim";

export function Battery() {
  const battery = AstalBattery.get_default();

  return (
    <box>
      <image
        iconName={createBinding(battery, "iconName")}
      />
      <label
        label={createBinding(battery, "percentage").as(
          (x) => `${(x * 100).toFixed(0)}%`,
        )}
      />
    </box>
  );
}
