import AstalBrightness from "gi://AstalBrightness"
import { createBinding } from "gnim";

export function Brightness() {
  const brightness = AstalBrightness.get_default()

  return (
    <box>
      <image
        iconName={createBinding(brightness, "screen", "brightness").as(
          (x) => x > 0.3 ? "weather-clear" : "weather-clear-night"
        )}
      />
      <label
        label={createBinding(brightness, "screen", "brightness").as(
          (x) => `${(x * 100).toFixed(0)}%`,
        )}
      />
    </box>
  );
}
