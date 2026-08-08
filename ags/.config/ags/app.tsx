import app from "ags/gtk4/app";
import style from "./style.css";
import { Bar } from "./widget/bar";
import { createBinding, For, This, createState } from "gnim";
import Gdk from "gi://Gdk?version=4.0";
import { Dashboard } from "./widget/dashboard";
import { readFile } from "ags/file";

export const scripts = {
  stats: readFile("./scripts/stats.sh"),
};

app.start({
  css: style,
  gtkTheme: "Adwaita",

  main() {
    const monitors = createBinding(app, "monitors");

    const [expanded, setExpanded] = createState(false);
    app.connect("request", (app, [cmd], response) => {
      if (cmd === "toggle-expanded") {
        setExpanded((x) => !x);
        response("ok");
      }
      response("unknown command");
    });

    return (
      <For each={monitors}>
        {(monitor) => (
          <This this={app}>
            <Bar
              gdkmonitor={monitor as unknown as Gdk.Monitor}
              expanded={expanded}
            />
            <Dashboard
              gdkmonitor={monitor as unknown as Gdk.Monitor}
              expanded={expanded}
            />
          </This>
        )}
      </For>
    );
  },
});
