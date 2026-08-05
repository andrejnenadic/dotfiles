import app from "ags/gtk4/app";
import style from "./style.scss";
import { Bar } from "./widget/bar";
import { createBinding, For, This } from "gnim";
import Gdk from "gi://Gdk?version=4.0";

app.start({
  css: style,
  gtkTheme: "Adwaita",
  main() {
    const monitors = createBinding(app, "monitors");

    return (
      <For each={monitors}>
        {(monitor) => (
          <This this={app}>
            <Bar gdkmonitor={monitor as unknown as Gdk.Monitor} />
          </This>
        )}
      </For>
    );
  },
});
