import { Astal, Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Accessor, onCleanup, With } from "gnim";
import { Stats } from "./stats";
import Gtk from "gi://Gtk?version=4.0";

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
      layer={Astal.Layer.OVERLAY}
      anchor={
        Astal.WindowAnchor.BOTTOM |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      application={app}
      heightRequest={500}
    >
      <With value={expanded}>
        {(x) =>
          x && (
            <centerbox valign={Gtk.Align.END}>
              <Stats expanded={expanded} />
            </centerbox>
          )
        }
      </With>
    </window>
  );
}
