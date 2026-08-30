import AstalHyprland01 from "gi://AstalHyprland";
import { createBinding } from "gnim";

export function Workspace() {
  const hypr = AstalHyprland01.get_default();

  return (
    <box>
      <label
        label={createBinding(hypr, "focusedWorkspace", "name").as(
          (x) => `w/${x}`,
        )}
      />
    </box>
  );
}
