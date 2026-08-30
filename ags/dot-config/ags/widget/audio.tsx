import AstalWp01 from "gi://AstalWp";
import { createBinding, createMemo } from "gnim";

export function Audio() {
  const { defaultSpeaker: speaker } = AstalWp01.get_default();

  return (
    <box>
      <image
        iconName={createBinding(speaker, "volumeIcon").as((x) => {
          return x === "audio-volume-muted-symbolic"
            ? x
            : speaker.volume > 0.33
              ? "audio-volume-high-symbolic"
              : speaker.volume > 0.1
                ? "audio-volume-medium-symbolic"
                : "audio-volume-low-symbolic";
        })}
      />
      <label
        label={createBinding(speaker, "volume").as(
          (x) => `${(x * 100).toFixed(1).padStart(4)}%`,
        )}
      />
    </box>
  );
}
