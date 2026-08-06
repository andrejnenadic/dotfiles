import { Astal, Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Accessor, onCleanup } from "gnim";

export function Dashboard({
  gdkmonitor,
  expanded,
}: {
  gdkmonitor: Gdk.Monitor;
  expanded: Accessor<boolean>;
}) {
  let win: Astal.Window = null!;
  onCleanup(() => {
    // Root components (windows) are not automatically destroyed.
    win?.destroy();
  });

  return (
    <window
      $={(self) => (win = self)}
      visible={expanded}
      name="dashboard"
      class="dashboard"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={
        Astal.WindowAnchor.BOTTOM |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      application={app}
      heightRequest={500}
    ></window>
  );
}
